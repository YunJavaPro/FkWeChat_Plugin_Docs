# 存储函数
**`setBoolean(String key, boolean value)`**
- **描述**：存储布尔值
- **参数**：
  `key` (str)：键名
  `value` (bool)：布尔值

**`getBoolean(String key, boolean def)`**
- **描述**：获取布尔值
- **参数**：
  `key` (str)：键名
  `def` (bool)：默认值
- **返回值**：
  `bool`：布尔值或默认值

**`setString(String key, String value)`**
- **描述**：存储字符串
- **参数**：
  `key` (str)：键名
  `value` (str)：字符串

**`getString(String key, String def)`**
- **描述**：获取字符串
- **参数**：
  `key` (str)：键名
  `def` (str)：默认值
- **返回值**：
  `str`：字符串或默认值

**`setInt(String key, int value)`**
- **描述**：存储整数
- **参数**：
  `key` (str)：键名
  `value` (number)：整数

**`getInt(String key, int def)`**
- **描述**：获取整数
- **参数**：
  `key` (str)：键名
  `def` (number)：默认值
- **返回值**：
  `number`：整数或默认值

**`setFloat(String key, float value)`**
- **描述**：存储浮点数
- **参数**：
  `key` (str)：键名
  `value` (number)：浮点数

**`getFloat(String key, float def)`**
- **描述**：获取浮点数
- **参数**：
  `key` (str)：键名
  `def` (number)：默认值
- **返回值**：
  `number`：浮点数或默认值

**`setLong(String key, long value)`**
- **描述**：存储长整数
- **参数**：
  `key` (string)：键名
  `value` (number)：长整数

**`getLong(String key, long def)`**
- **描述**：获取长整数
- **参数**：
  `key` (str)：键名
  `def` (number)：默认值
- **返回值**：
  `number`：长整数或默认值

**`contains(String key)`**
- **描述**：检查键是否存在
- **参数**：
  `key` (str)：键名
- **返回值**：
  `bool`：是否存在

**`remove(String key)`**
- **描述**：删除键值对
- **参数**：
  `key` (str)：键名

**`clear()`**
- **描述**：清空所有存储数据

## 使用示例

```java
// 存储配置示例
void saveSettings() {
    setBoolean("auto_reply", true);
    setString("nickname", "张三");
    setInt("reply_count", 100);
    setFloat("score", 98.5f);
    setLong("last_updated", System.currentTimeMillis());
}

// 读取配置示例
void loadSettings() {
    boolean autoReply = getBoolean("auto_reply", false);
    String nickname = getString("nickname", "匿名");
    int replyCount = getInt("reply_count", 0);
    float score = getFloat("score", 0.0f);
    long lastUpdated = getLong("last_updated", 0L);
    
    log("自动回复：" + autoReply);
    log("昵称：" + nickname);
    log("回复次数：" + replyCount);
}

// 完整使用示例
void onMsg(Object msg) {
    if (!msg.isSend() && msg.isText()) {
        // 增加回复计数
        int count = getInt("reply_count", 0);
        setInt("reply_count", count + 1);
        
        // 检查是否启用自动回复
        if (getBoolean("auto_reply", false)) {
            sendText(msg.talker, "已收到你的消息，这是自动回复！");
        }
    }
}

// 管理配置
void manageConfig() {
    // 检查配置是否存在
    if (contains("auto_reply")) {
        log("配置已存在");
    }
    
    // 删除某个配置
    remove("temp_config");
    
    // 清空所有配置
    // clear(); // 谨慎使用！
}
```
