# MCP 大模型工具注册

FkWeChat 内置了对大模型上下文协议 (Model Context Protocol, MCP) 的原生支持。通过 `McpApi`，插件开发者可以动态地在脚本内**直接向大模型暴露任意自定义函数**。

当大模型客户端（如 Cursor, Claude Desktop, Windsurf 等）连接到 FkWeChat 的 MCP 服务端时，便可以自主识别并调用您编写的脚本。

::: warning ⚠️ 使用前提
在脚本中注册的 MCP 工具要能够被大模型正常识别和调用，**您必须在手机微信中开启模块自带的 MCP 服务功能**。

* **开启路径**：微信右上角加号 `+` -> **插件管理** -> 开启 **「MCP 服务」** 开关。
* **默认端口**：`8888`（可根据需要自定义）。
* **连接地址**：`http://手机局域网IP:8888/mcp` （若使用 USB 转发则为 `http://127.0.0.1:8888/mcp`）。
:::

---

## 零样板设计与自动销毁

1. **零样板设计（Method Reflection）**：您只需要像写普通 Java 函数一样声明一个方法，然后将其方法名注册到 `McpApi`。系统会自动通过反射**提取形参的名称和数量生成完美的 JSON Schema**，并自动分发入参。无需编写任何 JSON 协议。
2. **生命周期自动托管**：由脚本注册的自定义大模型工具，会在**插件重新加载、卸载或禁用时自动进行清理与销毁**，从根本上防止孤儿回调和内存泄露。

---

## 方法说明

### registerMcpTool

直接将脚本中定义的方法（Method）快速注册为 MCP 大模型工具。

* **方法签名**: 
  * `void registerMcpTool(String methodName, String description)`
  * `void registerMcpTool(String toolName, String methodName, String description)`
* **参数说明**:
  * `toolName`: 暴露给大模型的英文工具名（默认与方法名相同）。
  * `methodName`: 您在脚本中已声明的方法（函数）名称。
  * `description`: 工具的逻辑用途描述。**大模型将根据此描述来判断是否调用该工具，因此请尽量写得详细清晰。**

---

## 脚本示例

您只需在 `main.java` 脚本顶层定义普通的方法函数，并在 `onLoad` 中调用一行代码注册，即可实现大模型和微信底层的互通。

### 示例 A：代发微信消息

```java
// 1. 像写常规方法一样定义，系统会自动识别参数 "target_id" 与 "message_content"
send_wechat_msg(String target_id, String message_content) {
    sendText(target_id, message_content);
    return "消息已成功发送至：" + target_id;
}

onLoad() {
    // 2. 直接注册此方法。大模型在调用时会按照对应形参自动分发参数值
    registerMcpTool("send_wechat_msg", "通过我当前的微信向指定好友的 wxid 或群聊 ID 发送文本消息");
}
```

### 示例 B：快速查询好友备注

```java
// 定义普通函数
query_friend_remark(String friend_wxid) {
    String remark = getUserRemark(friend_wxid);
    return remark != null ? "该好友的备注是：" + remark : "未查到备注或不是好友";
}

onLoad() {
    // 一行代码直接注册
    registerMcpTool("query_friend_remark", "根据传入的微信号(wxid)查询该好友在当前微信中的备注名字");
}
```

### 示例 C：执行数据库统计

```java
// 定义函数
get_today_msg_count(String talker) {
    // 获取今天零点时间戳
    java.util.Calendar cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR_OF_DAY, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    long todayStart = cal.getTimeInMillis();
    
    // 执行 SQL 统计
    String sql = "SELECT COUNT(*) as cnt FROM message WHERE talker = '" + talker + "' AND createTime >= " + todayStart;
    List rows = executeQuery(sql);
    
    if (rows != null && !rows.isEmpty()) {
        Map firstRow = (Map) rows.get(0);
        long count = (Long) firstRow.get("cnt");
        return "该聊天群组今日目前共有 " + count + " 条新消息";
    }
    return "未查询到聊天活跃数据";
}

onLoad() {
    registerMcpTool("get_today_msg_count", "获取并统计指定的群聊或单聊中，今天零点至今产生的消息总数");
}
```