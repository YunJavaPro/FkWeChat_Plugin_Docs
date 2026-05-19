# 数据查询
**`executeQuery(String sql)`**
- **描述**：执行自定义 SQL 查询
- **参数**：
  `sql` (str)：SQL 语句
- **返回值**：
  `List<Map<String, Object>>`：查询结果列表

**`getFriendList()`**
- **描述**：获取好友列表
- **返回值**：
  `List<Map<String, Object>>`：好友信息列表

**`getGroupList()`**
- **描述**：获取群聊列表
- **返回值**：
  `List<Map<String, Object>>`：群聊信息列表

**`getGroupMemberList(String talker)`**
- **描述**：获取群成员列表
- **参数**：
  `talker` (str)：群会话 ID
- **返回值**：
  `List<String>`：群成员 wxid 列表

**`getAvatarUrl(String talker)`**
- **描述**：获取头像链接
- **参数**：
  `talker` (str)：用户/群 ID
- **返回值**：
  `String`：头像 URL

**`getUserRemark(String talker)`**
- **描述**：获取联系人备注昵称
- **参数**：
  `talker` (str)：会话 ID
- **返回值**：
  `String`：备注名称，无返回默认名称

**`getUserName(String talker)`**
- **描述**：获取用户昵称
- **参数**：
  `talker` (str)：用户 ID
- **返回值**：
  `String`：用户昵称

**`getUserName(String groupId, String talker)`**
- **描述**：获取群内成员备注/昵称
- **参数**：
  `groupId` (str)：群 ID
  `talker` (str)：群成员 ID
- **返回值**：
  `String`：群内昵称/备注

**`getGroupNotice(String talker)`**
- **描述**：获取群公告
- **参数**：
  `talker` (str)：群 ID
- **返回值**：
  `String`：群公告内容

**`getMsg(String talker, long msgId)`**
- **描述**：根据消息 ID 获取单条消息
- **参数**：
  `talker` (str)：会话 ID
  `msgId` (number)：消息 ID
- **返回值**：
  `Map<String, Object>`：单条消息信息

**`getEmojiInfo(String md5)`**
- **描述**：获取表情信息
- **参数**：
  `md5` (str)：表情 MD5
- **返回值**：
  `Map<String, Object>`：表情详情信息

**`getEmojiUrl(String md5)`**
- **描述**：获取表情链接
- **参数**：
  `md5` (str)：表情 MD5
- **返回值**：
  `String`：表情 URL

**`getMsgCount(String talker)`**
- **描述**：获取会话消息总数
- **参数**：
  `talker` (str)：会话 ID
- **返回值**：
  `long`：消息总数

**`getMsgs(String talker, long startTime)`**
- **描述**：按起始时间获取历史消息
- **参数**：
  `talker` (str)：会话 ID
  `startTime` (number)：起始时间戳
- **返回值**：
  `List<Map<String, Object>>`：消息列表

**`getContact(String keyword)`**
- **描述**：根据关键词搜索联系人
- **参数**：
  `keyword` (str)：搜索关键词
- **返回值**：
  `List<Map<String, Object>>`：联系人列表

## 使用示例

```java
// 查询好友列表
void listFriends() {
    List friends = getFriendList();
    log("好友数量: " + friends.size());
    for (int i = 0; i < friends.size(); i++) {
        Map friend = (Map) friends.get(i);
        log("好友: " + friend.get("name"));
    }
}

// 查询群聊列表
void listGroups() {
    List groups = getGroupList();
    log("群聊数量: " + groups.size());
}

// 获取群成员
void getGroupMembers(String groupId) {
    List members = getGroupMemberList(groupId);
    log("群成员数: " + members.size());
}

// 获取用户信息
void getUserInfo(String wxid) {
    String nickname = getUserName(wxid);
    String remark = getUserRemark(wxid);
    String avatar = getAvatarUrl(wxid);
    log("昵称: " + nickname);
    log("备注: " + remark);
    log("头像: " + avatar);
}

// 消息回调中的使用
void onMsg(Object msg) {
    if (msg.isText() && !msg.isSend()) {
        if (msg.content.equals("查询群成员")) {
            if (msg.isGroupChat()) {
                List members = getGroupMemberList(msg.talker);
                sendText(msg.talker, "本群共有 " + members.size() + " 人");
            }
        }
        
        if (msg.content.equals("获取群公告")) {
            String notice = getGroupNotice(msg.talker);
            sendText(msg.talker, notice);
        }
    }
}
```
