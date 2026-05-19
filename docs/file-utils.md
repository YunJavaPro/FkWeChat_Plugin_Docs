# 文件工具
**`deleteFile(file)`**
- **描述**：递归删除文件或整个文件夹目录
- **参数**：
  `file` (File)：待删除文件/目录对象
- **返回值**：
  `boolean`：成功true，失败false

**`copyDirectory(srcDir, destDir)`**
- **描述**：递归完整复制整个文件夹及内部所有子文件
- **参数**：
  `srcDir` (File)：源文件夹对象
  `destDir` (File)：目标存放文件夹对象
- **异常抛出**：IOException 文件读写异常

**`createFile(filePath)`**
- **描述**：创建空白文件，自动逐级生成父文件夹
- **参数**：
  `filePath` (str)：文件本地绝对路径
- **返回值**：
  `boolean`：已存在/创建成功返回true
- **异常抛出**：IOException 文件创建异常

**`copyFile(srcPath, destPath)`**
- **描述**：通过路径字符串复制单个文件
- **参数**：
  `srcPath` (str)：源文件绝对路径
  `destPath` (str)：目标保存绝对路径
- **异常抛出**：IOException 文件读写异常

**`copyFile(src, dest)`**
- **描述**：通过File对象高效复制单个文件
- **参数**：
  `src` (File)：源文件对象
  `dest` (File)：目标文件对象
- **异常抛出**：IOException 文件不存在/读写异常

## 使用示例

```java
// 删除目录
deleteFile(new File("/sdcard/test"));

// 复制文件
copyFile("/sdcard/a.jpg", "/sdcard/temp/a.jpg");

// 创建新文件
createFile("/sdcard/log/record.txt");
```