# Feature 支持情况

不同芯片平台对 BLE 各项 Feature 的支持情况汇总。

## 芯片对比

| Feature | 平台A | 平台B | 平台C | 备注 |
|---------|-------|-------|-------|------|
| LE 1M PHY | ✔️ | ✔️ | ✔️ | |
| LE 2M PHY | ✔️ | ✔️ | ❌ | 平台C 不支持 |
| LE Coded PHY (S=2) | ✔️ | ❌ | ❌ | |
| LE Coded PHY (S=8) | ✔️ | ❌ | ❌ | |
| Extended Advertising | ✔️ | ✔️ | ❌ | |
| Periodic Advertising | ✔️ | ❌ | ❌ | |
| LE Audio (ISO) | ✔️ | ❌ | ❌ | |
| Channel Selection #2 | ✔️ | ✔️ | ✔️ | |
| LE Power Control | ✔️ | ❌ | ❌ | |
| PAwR | ❌ | ❌ | ❌ | 均不支持 |

## 连接参数

| 参数 | 平台A | 平台B | 平台C |
|------|-------|-------|-------|
| 最小 Connection Interval | 7.5ms | 7.5ms | 15ms |
| 最大 Connection Interval | 4s | 4s | 2s |
| 最大 MTU | 247 | 247 | 128 |
| 最大 Tx Power | +6 dBm | +10 dBm | 0 dBm |

---

> **说明**：以上数据基于当前量产固件版本，如有更新请以实际测试为准。
> 如需添加新的 Feature 或平台，请编辑 `docs/faq/feature.md`。
