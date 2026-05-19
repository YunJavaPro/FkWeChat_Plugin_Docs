# 媒体路径
**`getAvatarPath(talker)`**
- **描述**：获取好友/群聊头像本地缓存绝对路径
- **参数**：
  `talker` (str)：联系人wxid
- **返回值**：`String`：成功返回本地路径，失败null

**`getVideoPath(md5)`**
- **描述**：获取微信视频缓存本地路径
- **参数**：
  `md5` (str)：视频资源MD5标识
- **返回值**：`String`：成功返回本地路径，失败null

**`getVoicePath(md5)`**
- **描述**：获取微信语音Silk文件本地缓存路径
- **参数**：
  `md5` (str)：语音资源MD5标识
- **返回值**：`String`：成功返回本地路径，失败null

**`getImagePath(md5)`**
- **描述**：获取聊天图片原图缓存本地路径
- **参数**：
  `md5` (str)：图片资源MD5标识
- **返回值**：`String`：成功返回本地路径，失败null

**`getMediaPath(msg)`**
- **描述**：根据消息对象自动匹配获取对应媒体资源路径
- **参数**：
  `msg` (obj)：消息实体MsgInfo对象
- **返回值**：`String`：成功返回本地路径，失败null

**`getMediaPath(type, md5)`**
- **描述**：根据媒体类型+MD5统一获取媒体缓存路径
- **参数**：
  `type` (number)：媒体资源类型
  `md5` (str)：资源MD5标识
- **返回值**：`String`：成功返回本地路径，失败null

## 使用示例

```java
onMsg(msg) {
    // 获取对方头像路径
    String avatar = getAvatarPath(msg.talker);
    // 获取当前消息图片路径
    String img = getMediaPath(msg);
}
```