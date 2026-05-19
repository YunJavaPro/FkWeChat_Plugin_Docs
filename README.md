# FkWeChat 插件开发文档

这是 FkWeChat 插件的开发文档，使用 VitePress 构建。

## 项目介绍

FkWeChat 是一款基于 Xposed 框架的微信增强模块，提供了丰富的插件系统，允许开发者使用 BeanShell 脚本扩展微信功能。

## 相关项目

- **插件仓库**: [FkWeChat_Plugin](https://github.com/YunJavaPro/FkWeChat_Plugin) - 官方插件集合
- **XP 模块**: [me.yun.fkwechat](https://github.com/Xposed-Modules-Repo/me.yun.fkwechat) - 主模块，提供插件运行环境

## 功能特点

- **插件系统**: 支持 BeanShell 脚本编写插件
- **消息处理**: 支持接收、发送各类消息
- **群聊管理**: 支持群成员管理、群聊创建等操作
- **数据查询**: 支持好友列表、群聊列表查询
- **存储功能**: 支持数据持久化存储
- **媒体处理**: 支持图片、音频等媒体文件处理

## 快速开始

### 开发环境

插件使用 **BeanShell** 脚本语言开发，这是一种 Java 语法兼容的脚本语言。

### 创建插件

1. 在 `/storage/emulated/0/Android/media/com.tencent.mm/FkWeChat/Plugin/` 目录下创建插件文件夹
2. 创建 `info.prop` 配置文件
3. 创建 `main.java` 脚本文件

### info.prop 示例

```properties
name=我的插件
author=开发者
version=1.0.0
desc=插件描述
```

### main.java 示例

```java
void onLoad() {
    log("插件已加载");
    toast("欢迎使用！");
}

void onMsg(Object msg) {
    if (msg.isText() && !msg.isSend()) {
        sendText(msg.talker, "收到消息: " + msg.content);
    }
}
```

## 文档结构

```
docs/
├── index.md              # 首页
├── file-structure.md     # 文件结构
├── global-fields.md      # 全局字段
├── send-functions.md     # 发送函数
├── load-functions.md     # 加载函数
├── group-management.md   # 群聊管理
├── data-query.md         # 数据查询
├── storage-functions.md  # 存储函数
├── media-path.md         # 媒体路径
├── file-utils.md         # 文件工具
├── audio-convert.md      # 音频转换
├── other-functions.md    # 其他函数
├── callback-functions.md # 回调函数
├── msg-structure.md      # Msg 结构
├── cgi-structure.md      # Cgi 结构
└── cdn-structure.md      # Cdn 结构
```

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 部署

文档使用 GitHub Pages 自动部署，每次推送代码后会自动构建并部署。

## 许可证

MIT License

## 作者

[YunJavaPro](https://github.com/YunJavaPro)
