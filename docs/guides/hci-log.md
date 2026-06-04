# HCI 日志抓取以及简单分析

## 抓取 btsnoop 日志

### Android 设备

1. 开启「开发者选项」→ 启用「启用蓝牙 HCI 信息收集日志」 这个是系统的hci 日志
2. setprop persist.bluetooth.btsnoopenable true 
3. setprop persist.bluetooth.btsnooppath /data/misc/bluedroid/bt_snoop.cfa
4. setprop persist.vendor.btsnoop.enable true 
5. setprop persist.vendor.btsnoopsavelog true 
6. 重启设备。上面的配置设置一次之后永久生效。
7. 复现问题后，adb pull 出 /data/misc/bluedroid/ 这个目录即可
8. 每次复现新的问题，建议重启一下设备。


### 其他平台

不同平台启用方式各异，请参考对应平台的开发者文档。

---

## 日志分析流程

### 第一步：概览分析

使用 [btsnoop-hci-overview](/guides/hci-log#) 工具查看：
- 文件大小、包数量
- HCI Command / Event / ACL 分布
- 错误事件计数

### 第二步：关注关键事件

| 事件类型 | 关注点 |
|---------|--------|
| Disconnect Complete | 断开原因码（Reason Code） |
| LE Connection Complete | 连接参数（Interval、Latency、Timeout） |
| Hardware Error | 硬件异常，需立即关注 |
| Command Status / Complete | 返回状态是否成功 |

### 第三步：ACL 数据流分析

- 关注 ACL 吞吐率和丢包情况
- 检查 L2CAP PDU 序列号连续性

---

## 常用断开原因码速查

| Code | 含义 | 常见场景 |
|------|------|----------|
| 0x08 | Connection Timeout | 距离过远、干扰严重 |
| 0x13 | Remote User Terminated | 对方主动断开 |
| 0x16 | Connection Terminated by Local Host | 本机主动断开 |
| 0x3E | Connection Failed to be Established | 建连失败 |

完整断开原因码列表请参考 BT Core Spec Vol 2 Part D。

---

> 如果日志分析结果不确定，可提供 btsnoop 文件给团队进一步分析。
