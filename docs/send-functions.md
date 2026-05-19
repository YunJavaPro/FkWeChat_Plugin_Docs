# 发送函数
**`sendText(String wxid, String text)`**
- **描述**：发送文本消息
- **参数**：
  `wxid` (str)：目标会话ID
  `text` (str)：发送的文本内容

**`sendImage(String talker, String path)`**
- **描述**：发送图片消息, 原图发送
- **参数**：
  `talker` (str)：目标会话ID
  `path` (str)：图片本地绝对路径

**`sendImage(String talker, String path, boolean isRaw)`**
- **描述**：发送图片，可选是否原图无压缩
- **参数**：
  `talker` (str)：目标会话ID
  `path` (str)：图片本地绝对路径
  `isRaw` (bool)：true=原图 false=压缩

**`sendNetScene(Object netScene)`**
- **描述**：发送微信商城/小程序/网络场景卡片
- **参数**：
  `netScene` (obj)：场景卡片封装对象

**`sendFile(String wxid, String path)`**
- **描述**：发送文件消息
- **参数**：
  `wxid` (str)：目标会话ID
  `path` (str)：文件本地绝对路径

**`sendEmoji(String wxid, String md5)`**
- **描述**：发送表情包
- **参数**：
  `wxid` (str)：目标会话ID
  `md5` (str)：表情MD5或资源标识

**`sendCard(String wxid, String xml)`**
- **描述**：发送卡片
- **参数**：
  `wxid` (str)：目标会话ID
  `xml` (str)：要分享的卡片

**`sendXml(String wxid, String xml, int type)`**
- **描述**：发送XML
- **参数**：
  `wxid` (str)：目标会话ID
  `xml` (str)：XML内容
  `type` (number)：消息类型标识

**`sendMusic(String wxid, String title, String desc, String musicUrl, String thumbPath, String lyric)`**
- **描述**：发送音乐分享
- **参数**：
  `wxid` (str)：目标会话ID
  `title` (str)：音乐标题
  `desc` (str)：音乐描述
  `musicUrl` (str)：音乐链接
  `thumbPath` (str)：封面图片路径
  `lyric` (str)：歌词内容

**`sendMedia(String wxid, Object mediaObj, String appId)`**
- **描述**：发送媒体消息
- **参数**：
  `wxid` (str)：目标会话ID
  `mediaObj` (obj)：媒体对象
  `appId` (str)：应用标识

## 使用示例

```java
// 消息回调自动回复
void onMsg(Object msg) {
    String content = msg.content;
    String talker = msg.talker;
    
    if (msg.isText() && !msg.isSend()) {
        if (content.equals("早上好")) {
            sendText(talker, "早上好！");
        }
        if (content.equals("发图")) {
            sendImage(talker, "/sdcard/test.jpg");
        }
        if (content.equals("发文件")) {
            sendFile(talker, "/sdcard/document.pdf");
        }
        if (content.equals("发表情")) {
            sendEmoji(talker, "表情MD5");
        }
    }
}

// 发送音乐分享示例
void shareMusic() {
    sendMusic(
        myWxId,           // 接收人
        "歌曲名称",        // 音乐标题
        "歌手名称",        // 音乐描述
        "https://music.url", // 音乐链接
        "/sdcard/thumb.jpg", // 封面图片
        "歌词内容"        // 歌词
    );
}
```
