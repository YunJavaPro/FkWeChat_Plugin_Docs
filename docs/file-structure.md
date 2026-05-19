# 文件结构
**插件由两个核心文件组成：main.java 和 info.prop。**
**插件加载时，宿主会读取 info.prop 获取元数据，并执行 main.java 中的脚本。**

插件目录：
```
/storage/emulated/0/Android/media/com.tencent.mm/FkWeChat/Plugin/
```
## main.java
主脚本文件，插件的入口点。插件加载时会执行此文件中的代码。
可以在其中编写主要逻辑。
使用 loadJava 函数加载其他 Java 模块，实现代码拆分。
本环境为魔改 bsh 引擎，额外支持：
- 字符串模板
- 自动分号插入 (ASI)
```java
// main.java 示例
loadJava("test"); // 加载同目录下的 test.java
```
## info.prop
插件信息配置文件，采用 key=value 格式。插件管理器会读取此文件以获取元数据。

| 字段    | 类型 | 必填 | 说明                     |
|---------|------|------|--------------------------|
| name    | str  | 是   | 名称                 |
| author  | str  | 是   | 作者                     |
| version | str  | 是   | 版本号，如 1.0.0         |
| desc    | str  | 否   | 描述                 |

```properties
name=test
author=雲上升
version=1.0.0
desc=测试
```