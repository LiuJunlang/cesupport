# INI 配置

## Q1：EMU2 / EMU 天线模式如何配置？

芯片支持两天线和三天线方案。**EMU2 项目**需要配置 `ant_mode` 和 `coex_ant_mode` 两个变量，**EMU 项目**仅需配置 `coex_ant_mode` 一个变量。

### EMU2 项目

| 天线方案 | `ant_mode` | `coex_ant_mode` |
|----------|:----------:|:---------------:|
| 三天线 | 0 | 0 |
| 两天线（内部 Switch） | 1 | 2 |
| 两天线（外部 Switch） | 1 | 1 |
| 一天线（内部 Switch） | 2 | 2 |
| 一天线（外部 Switch） | 2 | 1 |

```ini
# EMU2 天线配置示例：两天线内部 Switch
ant_mode=1
coex_ant_mode=2
```

### EMU 项目

| 天线方案 | `coex_ant_mode` |
|----------|:---------------:|
| 三天线 | 0 |
| 两天线（外部 Switch） | 1 |
| 两天线（内部 Switch） | 2 |

> **注意**：配置为 `coex_ant_mode=2`（两天线内部 Switch）时，软件会自动关闭 DBDC 功能。

```ini
# EMU 天线配置示例：两天线内部 Switch
coex_ant_mode=2
```

---

## Q2：`ps_mode` 低功耗模式如何配置？

`ps_mode` 是一个 **bitmask 配置项**，每个 bit 控制一个电源域的低功耗模式开关。值为各 bit 的十进制和。

| Bit | 值 | 控制项 | 说明 |
|-----|:--:|--------|------|
| bit0 | 1 | WiFi IP Sleep | WiFi IP 核进入 sleep 模式 |
| bit1 | 2 | WSYS Deep Sleep | 无线子系统进入深度睡眠 |
| bit2 | 4 | BSYS Deep Sleep | 蓝牙子系统进入深度睡眠 |
| bit3 | 8 | DTOP Deep Sleep | 数字 Top 域进入深度睡眠 |

### 配置示例

```ini
# 全部启用（1+2+4+8=15）
ps_mode=15
```

```ini
# 仅启用 WSYS + BSYS + DTOP 深度睡眠，WiFi IP 保持正常（2+4+8=14）
ps_mode=14
```

```ini
# 全部关闭
ps_mode=0
```

> **注意**：`ps_mode` 的实际生效取决于对应子系统的固件是否支持该级别的睡眠模式。配置为 15（`0b1111`）即请求全部电源域进入低功耗。

---

## Q3：WiFi 发射功率如何通过 INI 调节？

通过以下两个配置项可以启用并设置 WiFi 的发射功率：

| 配置项 | 说明 |
|--------|------|
| `coex_wifi_pwr_adj_en` | WiFi 发射功率调节开关。`1` = 开启，`0` = 关闭 |
| `coex_wifi_pwr_adj_value` | WiFi 发射功率目标值，单位为 dBm |

### 配置示例

```ini
# 开启 WiFi 发射功率调节，设置为 18 dBm
coex_wifi_pwr_adj_en=1
coex_wifi_pwr_adj_value=18
```

> **注意**：`coex_wifi_pwr_adj_en=0` 时，`coex_wifi_pwr_adj_value` 不生效，WiFi 使用默认发射功率。

---

## 配置项参考

| 配置项 | 适用项目 | 说明 | 可选值 |
|--------|----------|------|--------|
| `rcu_pattern` | — | 配置唤醒 | bit 0: AB 格式 / bit 1: 广电格式 |
| `ps_mode` | — | 低功耗模式 (bitmask) | bit 0: WiFi IP Sleep / bit 1: WSYS Deep Sleep / bit 2: BSYS Deep Sleep / bit 3: DTOP Deep Sleep |
| `coex_wifi_pwr_adj_en` | — | WiFi 发射功率调节开关 | `0` = 关闭 / `1` = 开启 |
| `coex_wifi_pwr_adj_value` | — | WiFi 发射功率目标值 | 单位 dBm，如 `18` |

---

## 配置示例

```ini
[section]
; 示例配置
; key = value
; rcu_pattern=3
; hci_mode=h5
; hci_uart_flowctrl=1
; hci_uart_baudrate=2000000
; sco_over_hci=0
; bt_keepalive_en=1
```

---


