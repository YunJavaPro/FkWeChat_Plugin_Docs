# 加载函数
以下为宿主提供的动态加载函数，可在 BeanShell 脚本中直接调用，用于动态加载不同类型的模块或资源。

## 函数列表

| 函数 | 描述 |
| :--- | :--- |
| `loadDex(String path)` | 加载 Dex 文件（.dex） |
| `loadJar(String path)` | 加载 Jar 文件（.jar） |
| `loadJava(String path)` | 加载 Java 脚本文件（.java） |
| `loadAar(String path)` | 加载 Aar 文件（.aar） |

## 使用示例

```java
// 插件加载时初始化
void onLoad() {
    // 加载同目录下的其他 Java 模块
    loadJava("utils"); // 加载 utils.java
    loadJava("database"); // 加载 database.java
    
    log("所有模块加载完成");
}

// 加载不同类型文件示例
void loadExternalFiles() {
    String pluginDir = pluginPath;
    
    // 加载 Java 脚本
    loadJava(pluginDir + "module1.java");
    loadJava(pluginDir + "module2"); // 可以省略扩展名
    
    // 加载其他格式
    // loadDex(pluginDir + "library.dex");
    // loadJar(pluginDir + "library.jar");
    // loadAar(pluginDir + "library.aar");
    
    log("外部文件加载完成");
}
```
