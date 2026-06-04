# Feature 支持情况

> Profile 是上层协议栈的范畴，作为芯片厂商，我们支持所有标准 Bluetooth Profile。

---

## Profile 支持列表

### Classic (BR/EDR) Profile

| Profile | 说明 | 支持 |
|---------|------|:----:|
| GAP | Generic Access Profile | ✔️ |
| SDAP | Service Discovery Application Profile | ✔️ |
| SPP | Serial Port Profile | ✔️ |
| HID | Human Interface Device Profile | ✔️ |
| A2DP | Advanced Audio Distribution Profile | ✔️ |
| AVRCP | Audio/Video Remote Control Profile | ✔️ |
| HFP | Hands-Free Profile | ✔️ |
| HSP | Headset Profile | ✔️ |
| DUN | Dial-Up Networking Profile | ✔️ |
| PAN | Personal Area Networking Profile | ✔️ |
| PBAP | Phone Book Access Profile | ✔️ |
| MAP | Message Access Profile | ✔️ |
| OPP | Object Push Profile | ✔️ |
| FTP | File Transfer Profile | ✔️ |
| BIP | Basic Imaging Profile | ✔️ |
| BPP | Basic Printing Profile | ✔️ |
| GAVDP | Generic Audio/Video Distribution Profile | ✔️ |
| GOEP | Generic Object Exchange Profile | ✔️ |
| HCRP | Hardcopy Cable Replacement Profile | ✔️ |
| SAP | SIM Access Profile | ✔️ |
| VDP | Video Distribution Profile | ✔️ |
| WAPB | Wireless Application Protocol Bearer | ✔️ |
| SyncML | Synchronization Profile | ✔️ |
| CTP | Cordless Telephony Profile | ✔️ |
| ICP | Intercom Profile | ✔️ |

### BLE Profile

| Profile | 说明 | 支持 |
|---------|------|:----:|
| HOGP | HID over GATT Profile | ✔️ |
| HRP | Heart Rate Profile | ✔️ |
| BLP | Blood Pressure Profile | ✔️ |
| GLP | Glucose Profile | ✔️ |
| TIP | Time Profile | ✔️ |
| PXP | Proximity Profile | ✔️ |
| FMP | Find Me Profile | ✔️ |
| ANP | Alert Notification Profile | ✔️ |
| PASP | Phone Alert Status Profile | ✔️ |
| BAS | Battery Service | ✔️ |
| CSCP | Cycling Speed and Cadence Profile | ✔️ |
| RSCP | Running Speed and Cadence Profile | ✔️ |
| ESP | Environmental Sensing Profile | ✔️ |
| WSP | Weight Scale Profile | ✔️ |
| LNP | Location and Navigation Profile | ✔️ |

---

## BLE Controller Feature 支持

| Feature | 平台A | 平台B | 平台C | 备注 |
|---------|:-----:|:-----:|:-----:|------|
| LE 1M PHY | ✔️ | ✔️ | ✔️ | |
| LE 2M PHY | ✔️ | ✔️ | ❌ | |
| LE Coded PHY (S=2) | ✔️ | ❌ | ❌ | |
| LE Coded PHY (S=8) | ✔️ | ❌ | ❌ | |
| Extended Advertising | ✔️ | ✔️ | ❌ | |
| Periodic Advertising | ✔️ | ❌ | ❌ | Auracast 广播依赖 |
| Periodic Advertising Sync | ✔️ | ❌ | ❌ | Auracast 接收依赖 |
| LE Audio (ISO) | ✔️ | ❌ | ❌ | |
| Channel Selection #2 | ✔️ | ✔️ | ✔️ | |
| LE Power Control | ✔️ | ❌ | ❌ | |
| PAwR | ❌ | ❌ | ❌ | |

## 连接参数

| 参数 | 平台A | 平台B | 平台C |
|------|:-----:|:-----:|:-----:|
| 最小 Connection Interval | 7.5ms | 7.5ms | 15ms |
| 最大 Connection Interval | 4s | 4s | 2s |
| 最大 MTU | 247 | 247 | 128 |
| 最大 Tx Power | +6 dBm | +10 dBm | 0 dBm |

---

> **说明**：Profile 是上层协议栈范畴，芯片侧全部支持。BLE Controller Feature 部分取决于硬件能力。
> 以上数据基于当前量产固件版本，如有更新请以实际测试为准。
