# 其他函数
**`toast(String text)`**
- **描述**：弹出 Toast 提示
- **参数**：
  `text` (str)：要显示的字符串

**`getAppLoader(String pkg)`**
- **描述**：获取指定包名第三方 App 的类加载器
- **参数**：
  `pkg` (str)：软件包名

**`log(String text)`**
- **描述**：输出日志信息，可在日志文件中查看
- **参数**：
  `text` (str)：要输出的字符串

**`print(Object args...)`**
- **描述**：输出日志信息，可在日志文件中查看
- **参数**：
  `args (obj...)`：要输出的字符串

**`getMyWxId()`**
- **描述**：获取当前登录的微信ID
- **返回值**：
  `String`：微信ID

**`getMyUserInfo()`**
- **描述**：获取当前登录用户的信息映射表（包含昵称、头像等）
- **返回值**：
  `Map`：用户信息表

**`getTopActivity()`**
- **描述**：获取当前前台最顶层运行的 Activity 页面
- **返回值**：
  `Activity`：成功返回顶层页面实例，失败null

## 使用示例

```java
// 日志输出示例
void logDemo() {
    log("这是一条普通日志");
    log("插件名称: " + pluginName);
    log("作者: " + pluginAuthor);
    log("版本: " + pluginVersion);
    
    print("print", "也可以输出", "多个参数");
}

// Toast 提示示例
void toastDemo() {
    toast("欢迎使用插件！");
}

// 获取个人信息示例
void getMyInfo() {
    String wxid = getMyWxId();
    log("我的wxid: " + wxid);
    
    Map userInfo = getMyUserInfo();
    log("用户信息:");
    log(userInfo);
}

// 获取当前 Activity
void checkActivity() {
    Object activity = getTopActivity();
    if (activity != null) {
        log("当前 Activity: " + activity.getClass().getName());
    } else {
        log("无法获取 Activity");
    }
}

// 组合使用示例
void onMsg(Object msg) {
    if (!msg.isSend() && msg.isText()) {
        // 记录到日志
        log("收到消息: " + msg.content);
        
        // 提示用户
        toast("收到新消息");
    }
}

// 插件启动时的完整示例
void onLoad() {
    log("=== 插件启动 ===");
    log("插件: " + pluginName);
    log("作者: " + pluginAuthor);
    log("宿主版本: " + hostVerName);
    log("我的wxid: " + myWxId);
    
    toast("插件已启动！");
}
```
