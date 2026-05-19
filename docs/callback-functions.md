# 回调函数
**`onLoad()`**
- **描述**：插件初始化加载完成后调用

**`onUnload()`**
- **描述**：插件被卸载销毁时调用

**`onMsg(Object msg)`**
- **描述**：收到或发送消息时调用
- **参数**：
  `msg`：具体使用参考 [Msg 结构](./msg-structure)

**`onMsgMenu(Object msg)`**
- **描述**：长按消息弹出菜单前触发
- **参数**：
  `msg`：具体使用参考 [Msg 结构](./msg-structure)

**`onCgiRequ(Object data)`**
- **描述**：发送 CGI 请求时触发
- **参数**：
  `data`：具体使用参考 [Cgi 结构](./cgi-structure)

**`onCgiResp(Object data)`**
- **描述**：接收 CGI 响应时触发
- **参数**：
  `data`：具体使用参考 [Cgi 结构](./cgi-structure)

**`onCdnDownload(Object info)`**
- **描述**：CDN 下载任务触发时调用
- **参数**：
  `info`：具体使用参考 [Cdn 结构](./cdn-structure)

**`onCdnUpload(Object info)`**
- **描述**：CDN 上传任务触发时调用
- **参数**：
  `info`：具体使用参考 [Cdn 结构](./cdn-structure)

---

## 菜单扩展

**`addMenuItem(String title, String path, Runnable action)`**
- **描述**：添加自定义长按消息菜单项
- **参数**：
`title` (str)：菜单显示文字
`path` (str)：图标资源路径，为空默认图标
`action` (func)：点击菜单触发执行回调

## 使用示例

```java
// 插件加载时执行
void onLoad() {
    log("插件已加载，版本: " + pluginVersion);
    log("宿主版本: " + hostVerName);
    log("我的wxid: " + myWxId);
    toast("插件已启动！");
    
    // 初始化配置
    initPlugin();
}

// 插件卸载时执行
void onUnload() {
    log("插件正在卸载...");
    toast("插件已关闭");
    // 清理工作
}

// 收到消息回调
void onMsg(Object msg) {
    if (!msg.isSend()) {
        log("收到新消息: " + msg.content);
    }
}

// 消息菜单回调（长按消息时）
void onMsgMenu(Object msg) {
    // 添加自定义菜单项
    addMenuItem("复制内容", "", new Runnable() {
        public void run() {
            log("复制: " + msg.content);
            toast("已复制");
        }
    });
    
    addMenuItem("保存图片", "icon.png", new Runnable() {
        public void run() {
            if (msg.isImage()) {
                log("保存图片: " + msg.imgPath);
            }
        }
    });
}

// CGI请求回调
void onCgiRequ(Object data) {
    log("发送CGI请求:");
    log("URI: " + data.uri);
    log("类型: " + data.type);
    log("数据: " + data.json);
}

// CGI响应回调
void onCgiResp(Object data) {
    log("收到CGI响应:");
    log("URI: " + data.uri);
    log("类型: " + data.type);
    log("数据: " + data.json);
}

// CDN下载回调
void onCdnDownload(Object info) {
    log("CDN下载任务:");
    log("URL: " + info.url);
    log("保存路径: " + info.savePath);
    log("文件大小: " + info.expectFileSize);
}

// CDN上传回调
void onCdnUpload(Object info) {
    log("CDN上传任务:");
    log("目标: " + info.toUser);
    log("文件路径: " + info.filePath);
    log("文件MD5: " + info.filemd5);
}

// 初始化插件
void initPlugin() {
    setBoolean("plugin_active", true);
    log("插件初始化完成");
}
```
