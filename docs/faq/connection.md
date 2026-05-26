# 蓝牙连接问题

## Q1：设备配对失败，手机端搜索不到设备

**可能原因及排查步骤**：

1. 检查设备是否处于广播/可发现模式
2. 确认未超过最大配对设备数限制
3. 查看 HCI 日志中是否有 `LE Set Advertising Enable` 命令及相关事件

**标准回复模板**：

> 请确认设备处于可发现模式。如果使用 LE，请确认 Advertising 已启用。
> 可使用 HCI 日志（btsnoop）验证：搜索 `LE Set Advertising Enable` 命令，
> 确认 Status 参数为 Success (0x00)。

---

## Q2：回连速度慢，从睡眠唤醒后 3-5 秒才能连接

**排查方向**：

1. 主机端 `Connection Interval` 参数是否合理
2. 是否存在不必要的 Service Discovery 流程
3. 固件侧的唤醒延迟

**参考信息**：

> 建议：Connection Interval Min 设置 ≥ 15ms，避免主机策略冲突。
> 具体参数见项目固件配置文件。

---

## Q3：连接距离短，超过 5 米就断连

**排查方向**：

1. 确认使用的 PHY 类型（1M / 2M / Coded）
2. 检查 Tx Power 设置
3. 验证天线匹配是否正常
4. 找硬件同事确认阻抗匹配问题。

---

> **添加新 FAQ**：编辑 `docs/faq/connection.md`，提交到仓库即可自动更新网站。
