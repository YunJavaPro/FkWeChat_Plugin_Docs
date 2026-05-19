# Cgi 结构

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| type | number | CGI 请求/响应类型 |
| uri | str | 接口地址 |
| json | str | 数据包 JSON 内容 |

## 使用示例

```java
// 响应回调
onCgiResp(data) {
    log("响应\nUri: ${data.uri}\nType: ${data.type}\nJson: ${data.json}")
}

// 请求回调
onCgiRequ(data) {
    log("请求\nUri: ${data.uri}\nType: ${data.type}\nJson: ${data.json}")
}
```