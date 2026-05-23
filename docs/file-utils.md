# 文件工具

插件系统提供了静态全局类 `FileUtils`，帮助您无需处理复杂的流逻辑，一行代码即可实现本地文件与目录的读写、复制、删除等基础 IO 操作。

---

## 文本与数据读写

以下方法底层强制采用 **`UTF-8`** 编码，无需担忧乱码问题。方法均支持传入 `File` 对象或直传 `String` 路径。

### readText

* **方法签名**: 
  * `String readText(File file)`
  * `String readText(String path)`
* **描述**: 读取并返回目标文件的全部文本内容。若文件不存在则会抛出异常。
* **示例**:
  ```java
  String config = readText(pluginPath + "config.json");
  print(config);
  ```

### writeText

* **方法签名**: 
  * `void writeText(File file, String content)`
  * `void writeText(String path, String content)`
* **描述**: 向目标文件写入文本。此操作为**覆盖写入**，如父级目录不存在会自动创建。
* **示例**:
  ```java
  writeText(pluginPath + "cache.txt", "Hello World");
  ```

### appendText

* **方法签名**: 
  * `void appendText(File file, String content)`
  * `void appendText(String path, String content)`
* **描述**: 在目标文件末尾**追加写入**文本。如父级目录不存在会自动创建。
* **示例**:
  ```java
  appendText(pluginPath + "log.txt", "[INFO] 触发消息回调\n");
  ```

### readBytes

* **方法签名**: 
  * `byte[] readBytes(File file)`
  * `byte[] readBytes(String path)`
* **描述**: 读取并返回目标文件的全部字节数组。
* **示例**:
  ```java
  byte[] imgData = readBytes(pluginPath + "image.jpg");
  ```

### writeBytes

* **方法签名**: 
  * `void writeBytes(File file, byte[] bytes)`
  * `void writeBytes(String path, byte[] bytes)`
* **描述**: 将字节数组写入到目标文件中。此操作为**覆盖写入**。
* **示例**:
  ```java
  byte[] data = ...;
  writeBytes(pluginPath + "output.bin", data);
  ```

---

## 文件与目录管理

### copyFile

* **方法签名**: 
  * `void copyFile(File src, File dest)`
  * `void copyFile(String srcPath, String destPath)`
* **描述**: 复制单个文件，如果目标文件夹不存在则会自动创建。

### createFile

* **方法签名**: `boolean createFile(String filePath)`
* **描述**: 安全创建单个空白文件。如果文件或父目录已存在则直接返回 `true`。

### copyDir

* **方法签名**: `void copyDir(File srcDir, File destDir)`
* **描述**: 递归复制整个目录（含子文件与子目录）。

### deleteFile

* **方法签名**: `boolean deleteFile(File file)`
* **描述**: 递归删除文件或整个目录，返回操作是否成功。

```java
// 删除目录
deleteFile(new File("/sdcard/test"));

// 复制文件
copyFile("/sdcard/a.jpg", "/sdcard/temp/a.jpg");

// 创建新文件
createFile("/sdcard/log/record.txt");
```