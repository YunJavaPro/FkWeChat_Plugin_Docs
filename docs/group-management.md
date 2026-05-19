# 群聊管理
**`deleteGroupMember(String talker, String wxid)`**
- **描述**：移除群成员（单个）
- **参数**：
  `talker` (str)：群会话ID
  `wxid` (str)：要移除的用户ID

**`deleteGroupMember(String talker, List list)`**
- **描述**：批量移除群成员
- **参数**：
  `talker` (str)：群会话ID
  `list` (list)：要移除的用户ID列表

**`addGroupMember(String talker, String wxid)`**
- **描述**：添加群成员（单个）
- **参数**：
  `talker` (str)：群会话ID
  `wxid` (str)：要添加的用户ID

**`addGroupMember(String talker, List list)`**
- **描述**：批量添加群成员
- **参数**：
  `talker` (str)：群会话ID
  `list` (list)：要添加的用户ID列表

**`inviteGroupMember(String talker, String wxid)`**
- **描述**：邀请群成员（单个）
- **参数**：
  `talker` (str)：群会话ID
  `wxid` (str)：被邀请用户ID

**`inviteGroupMember(String talker, List list)`**
- **描述**：批量邀请群成员
- **参数**：
  `talker` (str)：群会话ID
  `list` (list)：被邀请用户ID列表

**`createGroup(String topic, List list)`**
- **描述**：创建群聊
- **参数**：
  `topic` (str)：群名称
  `list` (list)：初始群成员ID列表

**`dismissGroup(String talker)`**
- **描述**：解散群聊
- **参数**：
  `talker` (str)：群会话ID

## 使用示例

```java
// 管理群成员示例
void manageGroup(String groupId) {
    // 添加单个成员
    addGroupMember(groupId, "wxid_123456");
    
    // 批量添加成员
    List members = new ArrayList();
    members.add("wxid_1");
    members.add("wxid_2");
    members.add("wxid_3");
    addGroupMember(groupId, members);
    
    // 邀请成员
    inviteGroupMember(groupId, "wxid_789");
    
    // 移除单个成员
    deleteGroupMember(groupId, "wxid_000");
}

// 创建新群聊示例
void createNewGroup() {
    String topic = "我的新群聊";
    List members = new ArrayList();
    members.add("wxid_1");
    members.add("wxid_2");
    members.add("wxid_3");
    createGroup(topic, members);
}

// 消息回调中的群管理
void onMsg(Object msg) {
    if (msg.isGroupChat()) {
        String groupId = msg.talker;
        
        if (msg.content.equals("踢人") && msg.isSend()) {
            // 假设 sendTalker 是发送者，需要逻辑获取
            // deleteGroupMember(groupId, "target_wxid");
        }
        
        if (msg.content.equals("邀请人")) {
            inviteGroupMember(groupId, "friend_wxid");
        }
    }
}
```
