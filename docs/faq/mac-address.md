# MAC 地址设置

## 背景

芯片出厂时已烧录 EFUSE 蓝牙地址，默认无需额外配置。部分客户需要自定义 MAC 地址时，可通过 Vendor HCI Command 完成设置。

> Vendor HCI Command 的具体格式见下方说明，操作前请确认固件版本是否支持该 Vendor Cmd。

---

## Q1：如何通过 Vendor HCI Command 设置 MAC 地址？

**Vendor Command**：`0xFC65` — Set BD_ADDR

将指定的 6 字节蓝牙设备地址写入芯片固件。

### HCI Command 格式

| 偏移 | 长度 (byte) | 栏位 | 值 | 说明 |
|---|---|---|---|---|
| 0 | 1 | HCI Packet Type | `0x01` | HCI Command 包类型 |
| 1 | 2 | Opcode | 大端 `0xFC65`，小端 `0x65, 0xFC` | Vendor Command Opcode |
| 3 | 1 | Parameter Total Length | `0x06` | 参数长度，固定为 6 |
| 4–9 | 6 | BD_ADDR (LSB first) | 例: `11 22 33 44 55 66` | 6 字节蓝牙地址，小端序发送 |

**完整发送字节序列**（以地址 `11:22:33:44:55:66` 为例）：

```
01 65 FC 06 11 22 33 44 55 66
```

### HCI Command Complete Event 格式（芯片返回）

| 偏移 | 长度 (byte) | 栏位 | 值 | 说明 |
|---|---|---|---|---|
| 0 | 1 | Event Code | `0x0E` | HCI Command Complete |
| 1 | 1 | Parameter Total Length | `0x04` | 后续 4 字节 |
| 2 | 1 | Num HCI Command Packets | `0x01` | 可继续发送的 cmd 数 |
| 3 | 2 | Command Opcode | `0xFC65`（小端: `0x65, 0xFC`） | 对应的命令 Opcode |
| 5 | 1 | Status | `0x00` = 成功，否则失败 | 命令执行状态 |

**完整返回字节序列**（成功时）：

```
0E 04 01 65 FC 00
```

### 关键说明

- **字节序**：Opcode 和 BD_ADDR 均使用小端序（Little Endian），符合蓝牙 HCI 标准格式。
- **BD_ADDR 顺序**：地址 `AA:BB:CC:DD:EE:FF` 对应的发送字节序为 `AA BB CC DD EE FF`，即第一个字节先发，与字符串显示顺序一致。

**标准回复模板**：

> 请使用 Vendor Command `0xFC65` 设置自定义 BD_ADDR。发送格式：
> `01 65 FC 06 XX XX XX XX XX XX`（后 6 字节为目标地址，LSB first）。
> 设置后需执行 HCI Reset 使新地址生效。

---

> **添加新 FAQ**：编辑 `docs/faq/mac-address.md`，提交到仓库即可自动更新网站。
