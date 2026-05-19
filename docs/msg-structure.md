# Msg 结构
### 基础字段

| 字段        | 类型    | 说明                     |
|-------------|---------|--------------------------|
| type        | int     | 消息类型                 |
| content     | String  | 消息正文                 |
| talker      | String  | 会话 ID（群/好友 wxid）|
| isSend      | int     | 消息方向，1=自己发送，0=对方发送 |
| msgId       | long    | 本地消息 ID              |
| createTime  | long    | 时间戳（毫秒）|
| rawContent  | String  | 原始消息内容             |
| sendTalker  | String  | 发送者 wxid              |
| imgPath     | String  | 图片本地路径             |
| msgSvrId    | long    | 服务端消息 ID            |
| status      | int     | 消息状态                 |
| lvbuffer    | byte\[\]  | 附加数据                 |

### 增强字段

| 字段        | 类型     | 说明                     |
|-------------|----------|--------------------------|
| atList      | List\&lt;String&gt; | 艾特用户列表             |
| isAtMe      | boolean  | 是否艾特我               |
| isAtAll     | boolean  | 是否艾特全体             |
| isAnnounce  | boolean  | 是否为群公告             |

### 辅助判断方法

| 方法          | 返回值  | 说明                     |
|---------------|---------|--------------------------|
| isGroupChat() | boolean | 是否群聊                 |
| isChatRoom()  | boolean | 是否群聊（同前）|
| isPrivateChat()| boolean| 是否单聊                 |
| isSend()      | boolean | 是否自己发送             |
| isText()      | boolean | 是否文本消息             |
| isImage()     | boolean | 是否图片消息             |
| isPic()       | boolean | 是否图片（同前）|
| isVoice()     | boolean | 是否语音消息             |
| isVideo()     | boolean | 是否视频消息             |
| isEmoji()     | boolean | 是否表情消息             |
| isGif()       | boolean | 是否 GIF 表情            |
| isLocation()  | boolean | 是否位置消息             |
| isFile()      | boolean | 是否文件消息             |
| isCard()      | boolean | 是否名片/卡片消息        |
| isSystem()    | boolean | 是否系统消息             |
| isRevoke()    | boolean | 是否撤回消息             |
| isTransfer()  | boolean | 是否转账                 |
| isRedPacket() | boolean | 是否红包                 |
| isReply()     | boolean | 是否回复消息             |
| isQuote()     | boolean | 是否引用回复（同前）|
| isNotify()    | boolean| 是否通知类消息           |
| isAtMe()      | boolean | 是否被艾特               |
| isAtAll()     | boolean | 是否艾特全体             |
| isAnnounce()  | boolean | 是否群公告               |

## 使用示例

```java
// 完整的消息处理示例
void onMsg(Object msg) {
    // 基础信息
    log("消息类型: " + msg.type);
    log("内容: " + msg.content);
    log("发送者: " + msg.talker);
    log("是否自己: " + msg.isSend());
    log("消息ID: " + msg.msgId);
    log("时间戳: " + msg.createTime);
    
    // 使用判断方法
    if (msg.isText()) {
        log("这是文本消息");
        handleText(msg);
    }
    
    if (msg.isImage()) {
        log("这是图片消息");
        log("图片路径: " + msg.imgPath);
        handleImage(msg);
    }
    
    if (msg.isVoice()) {
        log("这是语音消息");
    }
    
    if (msg.isVideo()) {
        log("这是视频消息");
    }
    
    if (msg.isEmoji()) {
        log("这是表情消息");
    }
    
    if (msg.isFile()) {
        log("这是文件消息");
    }
    
    if (msg.isLocation()) {
        log("这是位置消息");
    }
    
    // 群聊和@判断
    if (msg.isGroupChat() || msg.isChatRoom()) {
        log("来自群聊");
        if (msg.isAtMe()) {
            log("有人@我！");
            sendText(msg.talker, "收到@，请吩咐！");
        }
        if (msg.isAtAll()) {
            log("有人@全体");
        }
        if (msg.isAnnounce()) {
            log("这是群公告");
        }
    }
    
    if (msg.isPrivateChat()) {
        log("来自私聊");
    }
    
    // 其他类型
    if (msg.isSystem()) {
        log("这是系统消息");
    }
    
    if (msg.isRevoke()) {
        log("这是撤回消息");
    }
    
    if (msg.isTransfer()) {
        log("这是转账消息");
    }
    
    if (msg.isRedPacket()) {
        log("这是红包消息");
    }
    
    if (msg.isReply() || msg.isQuote()) {
        log("这是回复/引用消息");
    }
    
    if (msg.isNotify()) {
        log("这是通知类消息");
    }
}

// 处理文本消息
void handleText(Object msg) {
    String content = msg.content;
    String talker = msg.talker;
    
    // 简单的关键词回复
    if (content.equals("你好")) {
        sendText(talker, "你好！");
    }
}

// 处理图片消息
void handleImage(Object msg) {
    // 可以获取图片路径做进一步处理
    log("图片已保存到: " + msg.imgPath);
}
```
