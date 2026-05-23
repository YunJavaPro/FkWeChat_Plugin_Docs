# DexKit 动态查找

FkWeChat 内置了强大的 `DexKit` 引擎，并将其封装为流式查找 API 直接暴露给脚本环境。
通过 `DexKitApi`，插件开发者无需硬编码混淆后的类名、方法名或字段名，即可在运行时动态、精准地定位微信内部的任何目标元素。

---

## 核心设计与优势

1. **全局直接调用**：查找函数（如 `findClass`）已作为全局函数注入到 BeanShell 环境中，脚本内无需编写任何 `import`。
2. **高速缓存复用**：引擎底层采用了 `DexKitCacheBridge` 配合 `FastKV` 存储。任何特征首次查询成功后都会被**自动缓存**，后续的脚本加载和重复执行将在几毫秒内瞬时完成。
3. **内存自动托管**：底层 C++ 引擎在闲置超过 15 秒后会**全自动释放** Native 内存，开发者在脚本中**无需（也切勿）手动调用 close 释放资源**。
4. **精准异常熔断**：若查找失败，API 会直接抛出 `RuntimeException` 异常。BeanShell 会自动截获该异常并将其包装为 `TargetError`，从而在日志中**精准打印出您脚本中的具体文件名和出错行号**。

---

## 类查找器 ClassFinder

通过 `findClass()` 启动。支持通过父类、包路径、特征字符串等混合定位目标类。

### 常用构建链方法

| 方法签名 | 描述 |
| :--- | :--- |
| `pkg(String... pkgs)` | 指定检索的包路径（用于缩短检索时间） |
| `notPkg(String... pkgs)` | 排除检索的包路径 |
| `superClass(String className)` | 限制目标的父类名 |
| `interfaces(String interfaceName)` | 限制目标实现的接口名 |
| `usingStrings(String... strings)` | 限制目标类的方法或静态块中包含指定的字符串常量（最常用） |
| `get()` | 执行检索并返回一个 `Class<?>` 对象。若失败则直接抛出异常。 |

### 示例代码

```java
// 定位微信本地配置逻辑类
Class configLogic = findClass()
    .usingStrings("MicroMsg.ConfigStorageLogic", "mmcore has not ready")
    .get();

print("定位成功: " + configLogic.getName());
```

---

## 方法查找器 MethodFinder

通过 `findMethod()` 启动。支持通过所在类、参数特征、返回类型、包含数值或字符串等特征定位目标方法或构造函数。

### 常用构建链方法

| 方法签名 | 描述 |
| :--- | :--- |
| `inClass(String className)` / `inClass(Class<?> cls)` | 限制目标方法所在的类 |
| `name(String name)` | 限制方法名称（若方法未混淆或已知） |
| `paramCount(int count)` | 限制方法参数个数 |
| `params(String... paramTypes)` | 限制具体的参数类型列表（如 `"java.lang.String"`, `"int"`） |
| `returnType(String typeName)` | 限制方法返回值类型 |
| `usingStrings(String... strings)` | 限制方法体中包含指定的字符串常量 |
| `usingNumbers(Number... numbers)` | 限制方法体中包含指定的数值常量 |
| `get()` | 执行检索并返回一个 `java.lang.reflect.Method`。若失败抛出异常。 |
| `getConstructor()` | 执行检索并返回一个 `java.lang.reflect.Constructor<?>`。 |
| `getParams(int index)` | 检索出目标方法，并返回其指定索引位置处的参数类型 `Class<?>`。 |

### 示例代码

```java
// 查找并调用微信获取自我 Wxid 的方法
java.lang.reflect.Method getSelfWxidMethod = findMethod()
    .inClass("com.tencent.mm.modelbase.ConfigStorageLogic")
    .returnType("java.lang.String")
    .paramCount(0)
    .usingNumbers(2)
    .get();

String myWxid = (String) getSelfWxidMethod.invoke(null);
print("获取到当前 Wxid: " + myWxid);
```

```java
// 动态获取微信发送图片方法中的复杂参数类
Class sceneParamsClass = findMethod()
    .inClass("com.tencent.mm.modelbase.NetSceneUploadMsgImg") // 示例
    .paramCount(5)
    .getParams(4); // 获取第 5 个参数的 Class 类型

print("提取复杂内部类成功: " + sceneParamsClass.getName());
```

---

## 字段查找器 FieldFinder

通过 `findField()` 启动。用于定位混淆后的成员变量或静态变量。

### 常用构建链方法

| 方法签名 | 描述 |
| :--- | :--- |
| `inClass(String className)` / `inClass(Class<?> cls)` | 限制目标字段所在的类 |
| `type(String typeName)` | 限制字段的类型（如 `"android.widget.TextView"`） |
| `name(String name)` | 限制字段名称 |
| `modifiers(int modifiers)` | 限制字段的修饰符（如 `Modifier.PUBLIC`） |
| `get()` | 执行检索并返回满足条件的第一个 `java.lang.reflect.Field`。 |
| `get(int index)` | 当有多处匹配时，获取满足条件的第 `index` 个 `Field`。若越界或失败抛出异常。 |

### 示例代码

```java
// 提取聊天布局 ViewHolder 中被混淆的 TextView 字段
java.lang.reflect.Field tvNickField = findField()
    .inClass("com.tencent.mm.ui.chatting.viewitems.ChattingItemAvatar")
    .type("android.widget.TextView")
    .get(4); // 提取符合条件的第 5 个 TextView 字段

print("定位到混淆字段名称: " + tvNickField.getName());
```

---

## 调试与报错信息

当您的脚本执行 `get()` 链条发生错误时，BeanShell 运行日志中会呈现如下内容。您可以根据最下方的行号直接回溯到脚本的代码源：

```text
bsh.TargetError: Method Invocation findClass().get() : 
Target exception: java.lang.RuntimeException: [Not Found] Class. Key: Implicit | Caller: bsh.Reflect.invokeMethod(Reflect.java:142)
    : at Line: 8 : in file: main.java
```