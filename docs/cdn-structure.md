# Cdn 结构

### CdnDownload 结构

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| methodName | str | 方法名 |
| fileKey | str | 文件标识 |
| argInfo | str | 参数信息 |
| debugIP | str | 调试IP |
| url | str | 下载链接 |
| host | str | 主机 |
| referer | str | 来源页 |
| savePath | str | 保存路径 |
| statePath | str | 状态文件路径 |
| aeskey | str | 加密密钥 |
| initialIV | str | 初始向量 |
| fileid | str | 文件ID |
| netflowTag | str | 流量标签 |
| expectFileMD5 | str | 预期文件MD5 |
| msgExtra | str | 消息扩展字段 |
| bigfileSignature | str | 大文件签名 |
| requestVideoFlag | str | 视频请求标识 |
| hlsVideoFlag | str | HLS视频标识 |
| finderByPass | str | 发现页旁路标识 |
| snsCipherKey | str | SNS加密密钥 |
| signalQuality | str | 信号质量 |
| snsScene | str | SNS场景 |
| customHeader | str | 自定义请求头 |
| fakeBigfileSignature | str | 伪大文件签名 |
| fakeBigfileSignatureAeskey | str | 伪大文件签名密钥 |
| bakup_url | str | 备用下载地址 |
| serialized_verify_headers | str | 序列化校验头 |
| feedId | str | 流ID |
| httpMethod | str | HTTP请求方法 |
| snsVideoStragegy | str | SNS视频策略 |
| clientTag | str | 客户端标识 |
| taskGroupKey | str | 任务组标识 |
| fileType | int | 文件类型 |
| bizid | int | 业务ID |
| apptype | int | 应用类型 |
| queueTimeoutSeconds | int | 队列超时秒数 |
| transforTimeoutSeconds | int | 传输超时秒数 |
| downloadMode | int | 下载模式 |
| chatType | int | 会话类型 |
| downloadBehavior | int | 下载行为 |
| requestVideoFormat | int | 请求视频格式 |
| videoflagPolicy | int | 视频标识策略 |
| preloadRatio | int | 预加载比例 |
| msgType | int | 消息类型 |
| concurrentCount | int | 并发数 |
| maxHttpRedirectCount | int | 最大重定向次数 |
| connectionCount | int | 连接数 |
| certificateVerifyPolicy | int | 证书校验策略 |
| pcdnAppID | int | PCDN应用ID |
| videoDownloadMode | int | 视频下载模式 |
| statefileKeepHours | int | 状态文件保留时长 |
| taskGroupCapacity | int | 任务组容量 |
| resolveHostPriority | int | 域名解析优先级 |
| resolveHostFlags | int | 解析标记 |
| maxPCDNConnections | int | 最大PCDN连接数 |
| expectFileSize | long | 预期文件大小 |
| preloadMinSize | long | 预加载最小大小 |
| taskStartTime | long | 任务开始时间 |
| maxFileSize | long | 最大文件大小 |
| isSilentTask | bool | 是否静默任务 |
| isStorageMode | bool | 是否存储模式 |
| isSmallVideo | bool | 是否小视频 |
| isLargeSVideo | bool | 是否大SNS视频 |
| isAutoStart | bool | 是否自动开始 |
| isColdSnsData | bool | 是否冷启动SNS数据 |
| isHotSnsVideo | bool | 是否热SNS视频 |
| isHLSVideo | bool | 是否HLS视频 |
| treatAsVideoFile | bool | 是否按视频文件处理 |
| preAllocStorage | bool | 是否预分配存储空间 |
| allow_mobile_net_download | bool | 是否允许移动网络下载 |
| is_resume_task | bool | 是否断点续传任务 |
| wifiAutoStart | bool | WIFI下自动开始 |
| useNewdns | bool | 是否使用新DNS |
| tryRealtimeTransportProtocol | bool | 是否尝试实时传输协议 |
| reportDetailPacketTransInfo | bool | 是否上报详细传输信息 |
| bizReqPayLoad | byte[] | 业务请求载荷 |
| finderMediaCdnInfo | byte[] | 发现页媒体CDN信息 |
| supportFormats | int[] | 支持的格式列表 |

### CdnUpload 结构

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| methodName | str | 方法名 |
| fileKey | str | 文件标识 |
| toUser | str | 接收方ID |
| debugIP | str | 调试IP |
| netflowTag | str | 流量标签 |
| forwardFileid | str | 转发文件ID |
| forwardAeskey | str | 转发加密密钥 |
| bigfileSignature | str | 大文件签名 |
| host | str | 上传主机 |
| filemd5 | str | 文件MD5 |
| filePath | str | 上传文件路径 |
| midimgPath | str | 中等缩略图路径 |
| thumbfilePath | str | 缩略图路径 |
| fakeBigfileSignature | str | 伪大文件签名 |
| fakeBigfileSignatureAeskey | str | 伪大文件签名密钥 |
| statePath | str | 状态文件路径 |
| uri | str | 上传接口URI |
| emojiExtinfo | str | 表情扩展信息 |
| customHeader | str | 自定义请求头 |
| clientTag | str | 客户端标识 |
| serverGroupKey | str | 服务端分组标识 |
| queueTimeoutSeconds | int | 队列超时秒数 |
| transforTimeoutSeconds | int | 传输超时秒数 |
| isLargeSVideo | int | 是否大SNS视频 |
| videoSource | int | 视频来源 |
| chatType | int | 会话类型 |
| fileType | int | 文件类型 |
| fileFormat | int | 文件格式 |
| midFormat | int | 中等图格式 |
| thumbFileType | int | 缩略图文件类型 |
| concurrentCount | int | 并发数 |
| bizid | int | 业务ID |
| apptype | int | 应用类型 |
| uploadFrom | int | 上传来源 |
| sendmsgFromCDN | bool | 是否从CDN直接发消息 |
| checkExistOnly | bool | 仅检查文件是否存在 |
| isSmallVideo | bool | 是否小视频 |
| isSnsAdVideo | bool | 是否SNS广告视频 |
| isStorageMode | bool | 是否存储模式 |
| forceNoSafeCdn | bool | 强制不使用安全CDN |
| trySafeCdn | bool | 尝试使用安全CDN |
| enableHitCheck | bool | 启用文件命中检查 |
| tryRealtimeTransportProtocol | bool | 尝试实时传输协议 |
| bizSnsPreUpload | bool | SNS业务预上传 |
| bizReqPayLoad | byte[] | 业务请求载荷 |
| fileBuffer | byte[] | 文件二进制数据 |
| thumbnailBuffer | byte[] | 缩略图二进制数据 |

## 使用示例

```java
// 下载回调
void onCdnDownload(data) {
    String msg = "\n[ CDN 下载 ]\n";
    msg += "方法: " + data.methodName + "\n";
    msg += "业务: " + getFileTypeName(data.fileType) + " (" + data.fileType + ")\n";
    msg += "链接: " + data.url + "\n";
    msg += "路径: " + data.savePath + "\n";
    if (!data.aeskey.equals("")) {
        msg += "AES密钥: " + data.aeskey + "\n";
    }
    if (!data.snsCipherKey.equals("")) {
        msg += "SNS密钥: " + data.snsCipherKey + "\n";
    }
    if (!data.feedId.equals("")) {
        msg += "来源: 视频号(FeedId: " + data.feedId + ")\n";
    }
    
    String chatInfo = data.chatType == 1 ? "私聊" : (data.chatType == 2 ? "群聊" : "其他");
    msg += "场景: " + chatInfo + " | 预期大小: " + formatSize(data.expectFileSize) + "\n";
    
    if (data.isSilentTask)
        msg += "状态: 系统静默预加载\n";
    if (data.is_resume_task)
        msg += "状态: 断点续传中\n";
    
    msg += "---------------------------------";
    log(msg);
}

// 上传回调
void onCdnUpload(data) {
    String msg = "\n[ CDN 上传 ]\n";
    msg += "方法: " + data.methodName + "\n";
    msg += "类型: " + getFileTypeName(data.fileType) + "\n";
    msg += "目标: " + data.toUser + "\n";
    msg += "路径: " + data.filePath + "\n";
    if (!data.thumbfilePath.equals("")) {
        msg += "缩略图: " + data.thumbfilePath + "\n";
    }
    msg += "文件MD5: " + data.filemd5 + "\n";
    
    if (!data.forwardFileid.equals("")) {
        msg += "转发识别: 该任务为转发/秒传\n";
        msg += "转发ID: " + data.forwardFileid + "\n";
        msg += "转发Key: " + data.forwardAeskey + "\n";
    }
    if (data.trySafeCdn)
        msg += "安全: 已开启 SafeCDN 模式\n";
    if (data.bizSnsPreUpload)
        msg += "状态: 朋友圈资源预上传\n";
    
    msg += "---------------------------------";
    log(msg);
}

String getFileTypeName(int type) {
    switch (type) {
        case 1: return "高清图";
        case 2: return "普通图";
        case 3: return "缩略图";
        case 4: return "视频";
        case 5: return "通用文件";
        case 6: return "小视频";
        case 15: return "聊天语音";
        case 20201: return "视频号图片";
        case 20202: return "朋友圈视频";
        case 20302: return "视频号视频";
        case 20303: return "APP文件";
        default: return "未知类型";
    }
}

String formatSize(long size) {
    if (size <= 0) return "未知";
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024) + " KB";
    return String.format("%.2f MB", (double)size / (1024 * 1024));
}
```