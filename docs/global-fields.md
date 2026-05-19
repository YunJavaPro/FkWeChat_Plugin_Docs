# 全局字段
## 字段列表

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `pluginName` | str | 插件名称 |
| `pluginPath` | str | 插件路径 |
| `pluginAuthor` | str | 插件作者 |
| `pluginVersion` | str | 插件版本号 |
| `hostVerCode` | number | 宿主版本号 |
| `hostVerName` | str | 宿主版本名 |
| `hostLoader` | obj | 宿主类加载 |
| `hostContext` | obj | 宿主的上下文（Context） |
| `myWxId` | str | 宿主的WxId |

## 使用示例

#### 示例1：在插件加载时输出调试信息

```java
log("插件名称：" + pluginName);
log("插件路径：" + pluginPath);
log("插件作者：" + pluginAuthor);
log("插件版本：" + pluginVersion);
log("微信版本：" + hostVerName);
```

#### 示例2：根据微信版本执行不同逻辑

```java
// 如果微信版本大于，执行新逻辑
if (hostVerCode > 3040) {
    // 新版处理
}
```