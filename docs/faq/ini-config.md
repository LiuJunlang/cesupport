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

## Q2：<待填充>

<!--

**排查方向**：

1. 
2. 
3. 

**参考信息**：

> 

-->

---

## Q3：<待填充>

<!--

**排查方向**：

1. 
2. 
3. 

-->

---

## 配置项参考

| 配置项 | 适用项目 | 说明 | 可选值 |
|--------|----------|------|--------|
| `rcu_pattern` | — | 配置唤醒 | bit 0: AB 格式 / bit 1: 广电格式 |
|        |      |        |          |
|        |      |        |          |

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


