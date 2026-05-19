# 音频转换
**`getFileType(filePath)`**
- **描述**：识别音频文件真实格式类型
- **参数**：
`filePath` (str)：音频文件本地绝对路径
- **返回值**：
`int`：0=未知 1=Silk 2=MP3 3=WAV 4=FLAC 5=OGG 6=PCM 7=M4A

**`mp3ToSilk(mp3Path, silkPath, hz)`**
- **描述**：MP3 音频转微信 Silk 语音格式
- **参数**：
`mp3Path` (str)：MP3源文件路径
`silkPath` (str)：输出Silk保存路径
`hz` (number)：目标采样率
- **返回值**：`int` 状态错误码

**`wavToSilk(wavPath, silkPath, hz)`**
- **描述**：WAV 音频转微信 Silk 语音格式
- **参数**：
`wavPath` (str)：WAV源文件路径
`silkPath` (str)：输出Silk保存路径
`hz` (number)：目标采样率
- **返回值**：`int` 状态错误码

**`flacToSilk(flacPath, silkPath, hz)`**
- **描述**：FLAC 无损音频转微信 Silk 语音格式
- **参数**：
`flacPath` (str)：FLAC源文件路径
`silkPath` (str)：输出Silk保存路径
`hz` (number)：目标采样率
- **返回值**：`int` 状态错误码

**`oggToSilk(oggPath, silkPath, hz)`**
- **描述**：OGG 音频转微信 Silk 语音格式
- **参数**：
`oggPath` (str)：OGG源文件路径
`silkPath` (str)：输出Silk保存路径
`hz` (number)：目标采样率
- **返回值**：`int` 状态错误码

**`pcmToSilk(pcmPath, silkPath, hz, pcmHz, channels)`**
- **描述**：原始PCM裸音频流转微信Silk语音格式
- **参数**：
`pcmPath` (str)：PCM源文件路径
`silkPath` (str)：输出Silk保存路径
`hz` (number)：目标采样率
`pcmHz` (number)：PCM原始采样率
`channels` (number)：音频声道数量
- **返回值**：`int` 状态错误码

**`autoToSilk(audioPath, silkPath, hz)`**
- **描述**：自动识别任意音频格式一键转为Silk语音
- **参数**：
`audioPath` (str)：任意音频源文件路径
`silkPath` (str)：输出Silk保存路径
`hz` (number)：目标采样率
- **返回值**：`int` 状态错误码

**`silkToMp3(silkPath, mp3Path, hz)`**
- **描述**：微信Silk语音解码导出MP3音频
- **参数**：
`silkPath` (str)：Silk语音文件路径
`mp3Path` (str)：输出MP3保存路径
`hz` (number)：采样率
- **返回值**：`int` 状态错误码

**`mp3ToPcm(mp3Path, pcmPath)`**
- **描述**：MP3音频转为原始PCM裸音频流
- **参数**：
`mp3Path` (str)：MP3源文件路径
`pcmPath` (str)：输出PCM保存路径
- **返回值**：`int` 状态错误码

**`wavToPcm(wavPath, pcmPath)`**
- **描述**：WAV音频转为原始PCM裸音频流
- **参数**：
`wavPath` (str)：WAV源文件路径
`pcmPath` (str)：输出PCM保存路径
- **返回值**：`int` 状态错误码

**`flacToPcm(flacPath, pcmPath)`**
- **描述**：FLAC音频转为原始PCM裸音频流
- **参数**：
`flacPath` (str)：FLAC源文件路径
`pcmPath` (str)：输出PCM保存路径
- **返回值**：`int` 状态错误码

**`oggToPcm(oggPath, pcmPath)`**
- **描述**：OGG音频转为原始PCM裸音频流
- **参数**：
`oggPath` (str)：OGG源文件路径
`pcmPath` (str)：输出PCM保存路径
- **返回值**：`int` 状态错误码

**`autoToPcm(audioPath, pcmPath)`**
- **描述**：任意音频自动识别转为原始PCM裸音频流
- **参数**：
`audioPath` (str)：任意音频源文件路径
`pcmPath` (str)：输出PCM保存路径
- **返回值**：`int` 状态错误码

**`getDuration(filePath)`**
- **描述**：获取音频原始时长
- **参数**：
`filePath` (str)：音频文件本地绝对路径
- **返回值**：
`long`：音频时长（毫秒），未知返回0

**`getDurations(filePath)`**
- **描述**：获取音频时长并限制最大60000毫秒
- **参数**：
`filePath` (str)：音频文件本地绝对路径
- **返回值**：
`List<Map<String, Object>>`：时长结构化数据列表

## 返回错误码

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| -1 | 无法获取文件扩展名 |
| -2 | 不支持的音频格式 |
| -3 | PCM 转 Silk 需要额外参数，请使用 pcmToSilk |
| -4 | 输入已是 PCM 格式 |
| -5 | 输入已是 Silk 格式，无需转换 |
| -6 | Silk 转 PCM 请使用 silkToPcm |
| -10 | 输出必须是 .silk 或 .slk |
| -11 | 输出必须是 .mp3 |
| -12 | 输出必须是 .pcm 或 .raw |
| -201 ~ -202 | Silk 转 MP3 文件错误 |
| -301 ~ -302 | MP3 解码/文件错误 |
| -401 ~ -402 | OGG 解码/文件错误 |
| -501 ~ -502 | WAV 解码/文件错误 |
| -601 ~ -602 | FLAC 解码/文件错误 |
| -701 ~ -703 | PCM 参数/文件错误 |

## 使用示例

```java
// 自动任意音频一键转为微信Silk语音
onMsg(msg) {
    talker = msg.talker;
    int code = autoToSilk("/sdcard/test.mp3", "/sdcard/voice.silk", 24000);
    long time = getDuration("/sdcard/voice.silk");
}
```