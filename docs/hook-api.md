# Hook & 反射 API 参考

在插件脚本环境中，底层的反射工具类 `ReflectUtils` 与 `HookEngine` 的所有公共静态方法已直接映射为了脚本环境中的全局函数。

由于 Kotlin 编译为 JVM 字节码的静态翻译规则，所有针对类、实例的**扩展函数在脚本中调用时，被扩展的对象（Receiver）必须作为方法的第一个参数传入**。

---

## 一、 反射工具类 (ReflectUtils) API

### 1. 类加载器相关 (Class Loaders)

*   **`Class findClass(String className, ClassLoader classLoader)`**
    *   **描述**：使用指定 ClassLoader 加载 Class。找不到时抛出 `ClassNotFoundException`。
*   **`Class findClassOrNull(String className, ClassLoader classLoader)`**
    *   **描述**：加载 Class。找不到时安全返回 `null`，不抛出异常。

---

### 2. 内存安全附加属性 (Meta-Tag 机制)
允许在不污染原类结构的前提下，为任意 Java 对象实例安全绑定临时属性：

*   **`void setAdditionalField(Object obj, String key, Object value)`**
    *   **描述**：为指定对象实例绑定一个临时的 K-V 属性值（传入 `null` 执行清除）。
*   **`Object getAdditionalField(Object obj, String key)`**
    *   **描述**：读取指定对象实例上绑定的临时属性值。

---

### 3. 对象成员字段读操作 (Field Getters)
支持强行读取实例中的任意私有（private）变量：

*   **`Object getObjectField(Object obj, String fieldName)`**
    *   **描述**：读取任意对象类型的成员字段值。
*   **`String getStringField(Object obj, String fieldName)`**
    *   **描述**：读取 String 类型的成员字段值。
*   **`int getIntField(Object obj, String fieldName)`**
    *   **描述**：读取 int 类型的成员字段值。
*   **`long getLongField(Object obj, String fieldName)`**
    *   **描述**：读取 long 类型的成员字段值。
*   **`boolean getBooleanField(Object obj, String fieldName)`**
    *   **描述**：读取 boolean 类型的成员字段值。
*   **`float getFloatField(Object obj, String fieldName)`**
    *   **描述**：读取 float 类型的成员字段值。
*   **`double getDoubleField(Object obj, String fieldName)`**
    *   **描述**：读取 double 类型的成员字段值。
*   **`byte getByteField(Object obj, String fieldName)`**
    *   **描述**：读取 byte 类型的成员字段值。

---

### 4. 对象成员字段写操作 (Field Setters)
支持强行修改实例中的任意私有（private）变量：

*   **`void setObjectField(Object obj, String fieldName, Object value)`**
    *   **描述**：强行向成员字段写入任意对象值。
*   **`void setIntField(Object obj, String fieldName, int value)`**
    *   **描述**：强行向成员字段写入 int 值。
*   **`void setLongField(Object obj, String fieldName, long value)`**
    *   **描述**：强行向成员字段写入 long 值。
*   **`void setBooleanField(Object obj, String fieldName, boolean value)`**
    *   **描述**：强行向成员字段写入 boolean 值。
*   **`void setDoubleField(Object obj, String fieldName, double value)`**
    *   **描述**：强行向成员字段写入 double 值。
*   **`void setFloatField(Object obj, String fieldName, float value)`**
    *   **描述**：强行向成员字段写入 float 值。

---

### 5. 静态（Static）字段读写操作
支持读写类的静态私有变量（首参需传入 `Class<?>` 对象）：

*   **`Object getStaticObjectField(Class clazz, String fieldName)`**
    *   **描述**：读取静态对象类型的字段值。
*   **`int getStaticIntField(Class clazz, String fieldName)`**
    *   **描述**：读取静态 int 类型的字段值。
*   **`long getStaticLongField(Class clazz, String fieldName)`**
    *   **描述** : 读取静态 long 类型的字段值。
*   **`boolean getStaticBooleanField(Class clazz, String fieldName)`**
    *   **描述**：读取静态 boolean 类型的字段值。
*   **`void setStaticObjectField(Class clazz, String fieldName, Object value)`**
    *   **描述**：向静态对象类型的字段写入新值。

---

### 6. 反射寻找器 (Finders)
*   **`Field findField(Class clazz, String fieldName)`**
    *   **描述**：在类及其父类中深度检索对应的 `Field` 字段实例。
*   **`Field findFirstFieldByType(Class clazz, Class type)`**
    *   **描述**：在类中按类型检索首个匹配的 `Field` 字段。
*   **`List<Field> getAllFields(Class clazz)`**
    *   **描述**：获取当前类声明的所有字段列表，并自动设置为可访问。
*   **`Method findMethodExact(Class clazz, String methodName, Class[] paramTypes)`**
    *   **描述**：根据方法名和精确的参数签名类型检索匹配的 `Method`。
*   **`Method findMethodBestMatch(Class clazz, String methodName, Object[] args)`**
    *   **描述**：**智能匹配定位**：自动对比参数数量，并智能兼容 null、类型向上转型、基本类型拆装箱，返回最佳匹配方法。
*   **`List<Method> findMethodsByReturnType(Class clazz, Class returnType)`**
    *   **描述**：检索当前类中所有返回值为 `returnType` 的方法列表。
*   **`Constructor findConstructorExact(Class clazz, Class[] paramTypes)`**
    *   **描述**：根据精确的参数签名类型检索匹配的 `Constructor` 构造器。

---

### 7. 动态方法执行 (Invocations)
*   **`Object callMethod(Object obj, String methodName, Object[] args)`**
    *   **描述**：通过智能参数自动匹配，执行实例对象中的指定方法。
*   **`Object callMethodExact(Object obj, String methodName, Class[] paramTypes, Object[] args)`**
    *   **描述**：精确指定参数类型签名，执行实例对象中的指定方法。
*   **`Object callStaticMethod(Class clazz, String methodName, Object[] args)`**
    *   **描述**：通过智能参数自动匹配，执行类中的指定静态方法。
*   **`Object callStaticMethodExact(Class clazz, String methodName, Class[] paramTypes, Object[] args)`**
    *   **描述**：精确指定参数类型签名，执行类中的指定静态方法。

---

### 8. 实例化与数组辅助 (Instantiation & Helpers)
*   **`Object newInstance(Class clazz, Object[] args)`**
    *   **描述**：**智能实例化**：自动检索与传入实参最匹配的构造器并创建新实例。
*   **`Object newInstanceExact(Class clazz, Class[] paramTypes, Object[] args)`**
    *   **描述**：精确指定构造器类型签名，并实例化创建对象。
*   **`Object getEnumConstant(Class clazz, String name)`**
    *   **描述**：安全获取指定 Enum 类中名为 `name` 的枚举常量值。
*   **`Object[] newArray(Class clazz, int length)`**
    *   **描述**：创建指定 Class 类型的、长度为 `length` 的新数组。

---

## 二、 拦截引擎类 (HookEngine) API

### 1. 基础物理 Member 拦截

*   **`HookHandle hookBefore(Member member, JavaHookCallback callback)`**
    *   **描述**：在目标 Member（Method 或 Constructor）执行前拦截。
*   **`HookHandle hookBefore(Member member, String id, JavaHookCallback callback)`**
    *   **描述**：在执行前拦截，并将其注册绑定到指定唯一 String ID。
*   **`HookHandle hookAfter(Member member, JavaHookCallback callback)`**
    *   **描述**：在目标 Member 执行完毕（即将返回）时拦截。
*   **`HookHandle hookAfter(Member member, String id, JavaHookCallback callback)`**
    *   **描述**：在执行后拦截，并将其注册绑定到指定唯一 String ID。
*   **`HookHandle hookReplace(Member member, JavaHookCallback callback)`**
    *   **描述**：完全替换/接管目标 Member 的执行体，原逻辑将不再执行。
*   **`HookHandle hookReplace(Member member, String id, JavaHookCallback callback)`**
    *   **描述**：完全替换目标 Member 的执行体，并绑定到指定唯一 String ID。

---

### 2. 热重载与卸载 (Hot Reload)
*   **`void replaceHook(String id, JavaHookCallback callback)`**
    *   **描述**：**在线热重载**：无需解除通道绑定重建，直接将已有 ID 上的拦截逻辑覆盖更新为新的回调内容。
*   **`void unhook(String id)`**
    *   **描述**：根据唯一 ID 安全卸载并清除对应的 Hook 拦截通道。

---

### 3. 高层快速名拦截 (Shortcuts)
*   **`HookHandle hookMethodBefore(Class clazz, String methodName, JavaHookCallback callback)`**
    *   **描述**：自动寻找目标类中首个匹配 `methodName` 的方法并在其执行前拦截。
*   **`HookHandle hookMethodAfter(Class clazz, String methodName, JavaHookCallback callback)`**
    *   **描述**：自动寻找目标类中首个匹配 `methodName` 的方法并在其执行后拦截。
*   **`void hookAllMethodsBefore(Class clazz, String methodName, JavaHookCallback callback)`**
    *   **描述**：**批量重载拦截**：拦截当前类下所有名为 `methodName` 的同名重载方法的前置执行。
*   **`void hookAllMethodsAfter(Class clazz, String methodName, JavaHookCallback callback)`**
    *   **描述**：**批量重载拦截**：在当前类下所有名为 `methodName` 的同名重载方法执行后拦截。
*   **`void hookAllConstructorsBefore(Class clazz, JavaHookCallback callback)`**
    *   **描述**：批量在当前类的所有构造器执行前执行拦截。

---

## 三、 回调上下文 `HookParam` 接口

在拦截回调函数的 `param`（类型为 `HookParam`）中，您拥有对当前拦截点的全权访问：

*   **`Object getThisObject()`**
    *   **描述**：获取当前方法执行所属的实例对象（静态方法拦截时返回 `null`）。
*   **`Object[] getArgs()`**
    *   **描述**：获取方法的全部输入参数数组。
*   **`Object arg(int index)`**
    *   **描述**：获取指定索引处的入参（会自动进行强转）。
*   **`void setArg(int index, Object value)`**
    *   **描述**：篡改指定索引处的入参。
*   **`Object getResult()`**
    *   **描述**：获取方法的返回值（在 `After` 时机或已被 skip 时有效）。
*   **`void setResult(Object value)`**
    *   **描述**：篡改/重写当前方法的返回值。
*   **`void skipWith(Object value)`**
    *   **描述**：**短路原方法**：在 `Before` 阶段阻断原逻辑执行，并使调用者直接收到该值。
*   **`boolean getHasThrowable()`**
    *   **描述**：原逻辑执行是否抛出了异常。
*   **`Throwable getThrowable()`**
    *   **描述**：获取原方法执行时产生的真实异常对象。
*   **`void setThrowable(Throwable t)`**
    *   **描述**：强行篡改或覆盖产生的异常（传入 `null` 可吞掉异常，阻止系统崩溃）。

---

## 四、 实战场景演练示例

### 示例 1：利用 `newInstance` 与反射进行链式调用
在脚本中通过反射创建 Java 内置类，并在控制台打印其最终结果：

```java
onLoad() {
    try {
        // 1. 获取 Class 对象
        Class listClass = findClass("java.util.ArrayList", hostLoader);

        // 2. 调用 newInstance 实例化
        Object listInstance = newInstance(listClass, new Object[0]);

        // 3. 动态调用实例方法
        callMethod(listInstance, "add", new Object[] { "FkWeChat" });
        callMethod(listInstance, "add", new Object[] { "Comprehensive" });
        callMethod(listInstance, "add", new Object[] { "API" });

        // 4. 调用 getIntField 获取私有元素统计 (假设要读底层私有大小，以 size 为例)
        int size = callMethod(listInstance, "size", new Object[0]);
        log("列表元素数量: " + size);
        log("最终结果: " + listInstance.toString());

    } catch (Throwable t) {
        log("反射实例化链路异常: " + t.getMessage());
    }
}
```

### 示例 2：利用 `setArg` 深度篡改参数与字段窥探
拦截特定数据库插入，并窥探或强行干预插入数据：

```java
onLoad() {
    try {
        Class sqliteClass = findClass("com.tencent.wcdb.database.SQLiteDatabase", hostLoader);
        java.lang.reflect.Method insertMethod = findMethodExact(sqliteClass, "insertWithOnConflict",
                new Class[] { String.class, String.class, android.content.ContentValues.class, int.class });

        hookBefore(insertMethod, param -> {
            String table = param.arg(0);
            if ("message".equals(table)) {
                Object values = param.arg(2);
                if (values != null) {
                    // 读取私有字段 mValues Map 集合
                    java.util.Map map = (java.util.Map) getObjectField(values, "mValues");
                    String talker = map.get("talker");
                    int type = map.get("type");
                    log("[数据库监视] 准备写入 -> 目标: " + talker + ", 类型: " + type);

                    // 演示：如果符合特定条件，可以利用 setArg 篡改传入的 ContentValues
                    // param.setArg(2, customValues);
                }
            }
        });
    } catch (Throwable t) {
        log("数据库拦截设置失败: " + t.getMessage());
    }
}
```

### 示例 3：利用 `skipWith` 安全绕过与 Meta-Tag 绑定

```java
onLoad() {
    try {
        Class launcherCls = findClass("com.tencent.mm.ui.LauncherUI", hostLoader);
        java.lang.reflect.Method onResumeMethod = findMethodExact(launcherCls, "onResume", new Class[0]);

        hookAfter(onResumeMethod, param -> {
            Object currentActivity = param.getThisObject();
            if (currentActivity == null) return;

            // 1. 动态为该 LauncherUI 实例打上自定义标记
            setAdditionalField(currentActivity, "fk_tag_is_ready", true);
            log("[标签机制] 已安全为 LauncherUI 实例绑定了自定义状态标记");

            // 2. 检查标记是否成功
            boolean isReady = (boolean) getAdditionalField(currentActivity, "fk_tag_is_ready");
            if (isReady) {
                log("[标签机制] 属性取出核对成功！此过程不会破坏任何内存结构。");
            }
        });
    } catch (Throwable t) {
        log("拦截设置失败: " + t.getMessage());
    }
}
```