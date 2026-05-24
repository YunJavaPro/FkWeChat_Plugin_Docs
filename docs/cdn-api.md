# CDN 媒体下载

FkWeChat 提供了独立的 `CdnDownApi` 接口供脚本调用。它与微信底层的 C++ mars cdn 引擎深度连通，支持多线程分片传输、断点续传以及**自动 AES 密钥解密**。

通过此接口下载落盘的媒体文件均为**直接解密完成、可立即被系统相册、播放器正常打开的源文件**。

---

## 统一无感下载函数

### downMsgMedia

* **方法签名**:
  * `void downMsgMedia(MsgInfo msg)`
  * `void downMsgMedia(MsgInfo msg, CdnCallback callback)`
* **描述**: 
  **大一统多媒体下载函数**。您只需直接向该方法传入在消息回调 `onMsg` 中拿到的 `MsgInfo` 对象，系统会自动完成：
  1. 根据 `msg.type` 智能识别媒体分类（图片、视频、语音、普通附件等）。
  2. 自动从 `msg` 挂载的数据模型中提取解密密钥与远程 FileId（免去手动解析 XML 的麻烦）。
  3. 自动对齐微信底层的期望物理保存路径。
  4. 触发异步下载。**下载成功后，微信聊天界面内该消息的红点/气泡会自动更新为已加载状态。**
* **示例**:
  ```java
  // 在消息监听回调中，实现静默自动下载所有收到的图片等
  onMsg(msg) {
      if (msg.isImage() || msg.isVideo()) {
          downMsgMedia(msg, new CdnCallback() {
              onComplete(errCode, path) {
                  if (errCode == 0) {
                      print("静默下载解密成功，落盘路径：" + path);
                  } else {
                      print("下载失败，底层错误码：" + errCode);
                  }
              }
              onProgress(finished, total) {
                  // 可以在这里获取实时下载进度
              }
          });
      }
  }
  ```

---

## 极简业务重载方法

底层会自动为您维护任务队列的唯一 `fileKey` 标识，并自动对齐媒体分类常数。

### downImage

* **方法签名**:
  * `void downImage(String fileId, String aesKey, String savePath)`
  * `void downImage(String fileId, String aesKey, String savePath, CdnCallback callback)`
* **描述**: 根据传入的 `fileId`（即 XML 中的 `cdnbigimgurl`）与 `aesKey` 异步下载并解密图片。

### downVideo

* **方法签名**:
  * `void downVideo(String fileId, String aesKey, String savePath)`
  * `void downVideo(String fileId, String aesKey, String savePath, CdnCallback callback)`
* **描述**: 根据传入的 `fileId`（即 XML 中的 `cdnvideourl`）与 `aesKey` 异步下载并解密视频小视频。

### downVoice

* **方法签名**:
  * `void downVoice(String fileId, String aesKey, String savePath)`
  * `void downVoice(String fileId, String aesKey, String savePath, CdnCallback callback)`
* **描述**: 根据传入的 `fileId`（即 XML 中的 `cdnvoiceurl`）与 `aesKey` 异步下载并解密语音。

### downFile

* **方法签名**:
  * `void downFile(String fileId, String aesKey, String savePath)`
  * `void downFile(String fileId, String aesKey, String savePath, CdnCallback callback)`
* **描述**: 根据传入的 `fileId`（即 XML 中的 `cdnattachurl`）与 `aesKey` 异步下载并解密附件文件。

---

## 底层核心方法

### downCdn

* **方法签名**:
  `void downCdn(String fileKey, String fileId, String aesKey, int fileType, String savePath, CdnCallback callback)`
* **描述**: 微信底层最基础的 CDN 下载方法。支持手动指定任务去重 `fileKey`、文件标识 `fileId`、密钥 `aesKey`、多媒体业务常数 `fileType`、落盘路径 `savePath` 以及进度回调。

---

## 异步状态监听 CdnCallback

当您在以上下载方法中传入 `CdnCallback` 时，可以通过覆写以下方法实时在脚本中处理进度和结果：

```java
new CdnCallback() {
    /**
     * 下载任务结束回调（在微信底层网络工作线程中异步执行）
     * 
     * @param errCode  错误码。0 表示成功且已通过 aeskey 安全解密；非 0 表示下载失败
     * @param savePath 文件解密落盘的绝对路径
     */
    onComplete(int errCode, String savePath) {
        if (errCode == 0) {
            print("下载落盘成功: " + savePath);
        }
    }

    /**
     * 下载进度变更回调
     * 
     * @param finished 已完成传输的字节数
     * @param total    文件总字节数
     */
    onProgress(long finished, long total) {
        int rate = (int) ((finished * 100.0) / total);
        print("当前下载进度: " + rate + "%");
    }
}
```