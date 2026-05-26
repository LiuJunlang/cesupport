# 断连排查流程

## 快速定位步骤

### 1. 确定断开方向

从 HCI `Disconnect Complete` 事件中确认：

- **Reason Code 0x13**：远端（手机/主机）主动断开
- **Reason Code 0x16**：本机主动断开
- **Reason Code 0x08**：链路超时（物理层问题）

### 2. 远端断开 → 排查主机侧

如果是手机/主机主动断开：

1. 确认是否因为超时断开
2. 检查主机侧蓝牙协议栈日志（如 Android bluedroid stack 日志）
3. 常见原因：服务发现超时、GATT 操作无响应

### 3. 本机断开 → 排查设备侧

如果是设备主动断开：

1. 查看断开前最后的 HCI Command
2. 检查是否为软件逻辑触发（如超时保护、异常检测）
3. 检查电源管理相关逻辑

### 4. 链路超时 → 排查 RF 环境

1. 检查 Connection Interval 是否合理
2. 验证 Supervision Timeout 设置
3. 排查 2.4GHz 干扰（Wi-Fi、其他蓝牙设备等）

---

## 工具推荐

- **btsnoop HCI 分析器**：适用于抓包文件的深度解析
- **Ellisys / Frontline**：空口抓包，可查看 RF 层细节
- **Android bluedroid 日志**：主机端协议栈行为分析

---

## 排查检查清单 ✅

- [ ] 确定断开方向（远端 / 本机 / 链路超时）
- [ ] 查看 Disconnect Reason Code
- [ ] 检查断开前的 HCI 命令序列
- [ ] 确认 Connection Parameters 合理性
- [ ] 排除 RF 环境干扰
- [ ] 如果是特定平台/手机，确认兼容性问题
