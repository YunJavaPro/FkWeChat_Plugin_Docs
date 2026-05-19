# FkWeChat 插件开发文档

欢迎使用 FkWeChat 插件开发文档！

## 快速开始

### 创建你的第一个插件

1. 在 `/storage/emulated/0/Android/media/com.tencent.mm/FkWeChat/Plugin/` 目录下创建一个新文件夹
2. 创建 `info.prop` 文件，包含插件基本信息
3. 创建 `main.java` 文件，编写插件逻辑

### 插件文件结构

```
MyPlugin/
├── info.prop    # 插件信息文件
└── main.java    # 主程序文件（BeanShell 脚本）
```

### info.prop 配置示例

```properties
name=我的第一个插件
author=开发者
version=1.0.0
desc=这是一个示例插件
```

### main.java 基础模板

```java
// 插件加载时触发
void onLoad() {
    log("插件已加载！");
    toast("欢迎使用我的插件！");
}

// 插件卸载时触发
void onUnload() {
    log("插件已卸载");
}

// 收到消息时触发
void onMsg(Object msg) {
    log("收到消息: " + msg.content);
}
```

## 常见使用模式

### 自动回复消息

```java
void onMsg(Object msg) {
    // 只处理文本消息，忽略自己发送的
    if (msg.isText() && !msg.isSend()) {
        String talker = msg.talker;
        
        if (msg.content.equals("你好")) {
            sendText(talker, "你好！我是自动回复机器人");
        }
        if (msg.content.equals("发图")) {
            sendImage(talker, "/sdcard/test.jpg");
        }
    }
}
```

### 使用存储功能

```java
void onLoad() {
    // 读取配置
    int count = getInt("msg_count", 0);
    log("已收到 " + count + " 条消息");
}

void onMsg(Object msg) {
    // 更新计数
    int count = getInt("msg_count", 0);
    setInt("msg_count", count + 1);
}
```

### 群聊管理

```java
void onMsg(Object msg) {
    // 如果是群聊
    if (msg.isGroupChat()) {
        String groupId = msg.talker;
        
        // 检查是否被@
        if (msg.isAtMe()) {
            sendText(groupId, "有人@我！");
        }
    }
}
```

## 开发技巧

1. 善用 `log()` 函数输出调试信息
2. 使用 `toast()` 函数显示提示消息
3. 消息结构中的 `isXxx()` 方法可以方便判断消息类型
4. 存储数据使用 setXxx/getXxx 函数对
5. 多查看示例代码和 API 文档

## 注意事项

- 插件需要放在指定的 Plugin 目录下才能被识别
- 注意文件路径的正确性
- 谨慎操作群成员管理功能
- 妥善保管用户隐私数据

## 项目地址

- **插件仓库**: [FkWeChat_Plugin](https://github.com/YunJavaPro/FkWeChat_Plugin)
- **XP 模块**: [me.yun.fkwechat](https://github.com/Xposed-Modules-Repo/me.yun.fkwechat)
