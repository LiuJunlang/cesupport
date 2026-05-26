# A2DP 音频问题

## Q1：A2DP 连接后无声

**排查步骤**：

1. 确认 A2DP 连接已建立（HCI 日志中查看 AVDTP 信令）
2. 检查 Stream Endpoint (SEP) 是否正确 Configured
3. 验证 SBC/AAC 编解码器协商参数

**标准回复模板**：

> 请提供 HCI 日志和 A2DP 抓包（btsnoop）。
> 重点关注 AVDTP `Set Configuration` 和 `Open` 命令流程，
> 确认 SEP ID 和编解码器参数匹配双方能力。

---

## Q2：音频卡顿 / 断续

**常见原因**：

| 原因 | 表现 | 解决方案 |
|------|------|----------|
| 编解码器码率过高 | SBC Bitpool > 53 | 降低 Bitpool 至 45-51 |
| ACL 丢包 | 吞吐率不稳定 | 检查 RF 环境，调整 Connection Interval |
| 主机侧 buffer underrun | 音频数据供给不足 | 增加主机端 buffer 大小 |

---

## Q3：编解码器不匹配

**症状**：能连接 A2DP 但音质很差或无声。

**排查**：

1. 查看 AVDTP `Get Capabilities` 响应中的编解码器列表
2. 确认双方选择的编解码器一致
3. 常见不匹配：主机选 AAC，设备只支持 SBC

---

> **添加新 FAQ**：编辑 `docs/faq/audio.md` 并提交。
