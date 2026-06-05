# UART RX 溢出与 RTS/CTS 硬件流控排查指南

> 适用场景：Host 端 UART RX 出现溢出，怀疑与蓝牙 Controller 之间的硬件流控（RTS/CTS）有关。

---

## 1. 核心结论

**Host UART RX 溢出 ≠ 简单归责于 Host，但也不能断言"开了流控就一定不溢出"。**

溢出发生的本质是：**Host 侧没有及时把 UART FIFO / ring buffer 中的数据读走**。背后的原因可能多种多样，需要从 Host、Controller、接线、配置四个维度综合排查。

---

## 2. RX 溢出的常见根因

| 原因 | 说明 |
|------|------|
| Host CPU 忙或被抢占 | 中断处理或底半部（tasklet / workqueue）未能及时执行 |
| 波特率过高 | Host 来不及处理连续到达的数据 |
| 接收 buffer 过小 | 突发流量直接撑爆 ring buffer |
| **未开启硬件流控** | 对端 Controller 持续发送，Host 无法反压 |
| **流控已开启但无效** | 接线错误、驱动配置错误、RTS 拉高时机太晚 |

---

## 3. RTS/CTS 硬件流控原理

硬件流控通过 RTS（Request To Send）和 CTS（Clear To Send）两根线实现收发双方的速率协商。

### 3.1 信号方向（以 Controller 为视角）

| 信号 | 方向（相对 Controller） | 含义 |
|------|------------------------|------|
| **RTS** | Controller **输出** | "我可以接收数据，请 Host 继续发送" |
| **CTS** | Controller **输入** | "Host 允许我发送数据" |

### 3.2 典型交叉接线

```text
Host (AP/MCU)              Controller (蓝牙芯片)
  TX  ───────────────────────→  RX
  RX  ←───────────────────────  TX
  RTS ───────────────────────→  CTS
  CTS ←───────────────────────  RTS
```

**关键注意**：同一根信号线，两端叫法不同。
- Host 的 RTS，接到 Controller 的 CTS。
- Controller 的 RTS，接到 Host 的 CTS。

### 3.3 流控反压时序

```text
Host buffer 快满了
       │
       ▼
Host 的 RTS 拉高 ──────────────→ Controller 的 CTS 变高
                                       │
                                       ▼
                          Controller 停止发送 TX
```

---

## 4. 开了流控为什么还会溢出？

即使硬件流控已启用，以下情况仍可能导致 RX 溢出：

### 4.1 RTS 响应太晚

Host 检测到 buffer 将满后才拉高 RTS，但**此时已有字节在传输线路上**，无法撤回。

### 4.2 Controller 不遵守 CTS

某些芯片或固件实现存在缺陷，在有数据待发时会忽略 CTS 状态，继续发送。

### 4.3 波特率设置过高

即便立即反压，当前正在传输的字符仍会继续进入 Host FIFO。

### 4.4 接线交叉错误

例如 Host 的 RTS 错误接到了 Controller 的 RTS 上，而不是 CTS 上，导致流控信号完全失效。

### 4.5 驱动或芯片配置问题

- UART IP 未使能硬件流控模式
- 使用的是软件流控（XON/XOFF）但实现有 bug
- GPIO/RTS 引脚功能复用配置错误

---

## 5. 波形分析要点

使用逻辑分析仪抓取 UART 信号时，注意以下几点：

1. **确认探头位置**
   - 探头点在 Controller 侧：黄色通道对应 Controller 的 **RTS**
   - 探头点在 Host 侧：黄色通道对应 Host 的 **RTS**（即 Controller 的 CTS）

2. **判断信号驱动方向**
   - 与 TX 数据包对齐拉低的脉冲，通常是一方的 **输出型** 流控信号
   - 持续低电平的信号，表示该侧始终允许接收

3. **标签很可能标反**
   - 如果黄色通道在 TX 发送之前被拉低，那它更可能是 **RTS** 而非 CTS

---

## 6. 排查 checklist

- [ ] 确认 Host UART 驱动已使能硬件流控（HW flow control）
- [ ] 确认 Controller 端同样配置为硬件流控
- [ ] 用万用表/示波器确认 RTS/CTS 物理接线交叉正确
- [ ] 用逻辑分析仪抓波形，观察 RX 溢出前 RTS 是否及时拉高
- [ ] 如果 RTS 已拉高但 Controller 仍继续发 TX，问题在 Controller 侧
- [ ] 如果 RTS 未拉高或拉高太晚，问题在 Host 驱动或 buffer 配置
- [ ] 临时降低波特率，验证是否是 Host 处理能力不足
- [ ] 检查 Host CPU 负载、中断延迟、UART 中断优先级

---

## 7. 最佳实践

1. **始终保持 RTS 的提前量**：在 buffer 剩余容量达到安全阈值时即拉高 RTS，不要等到快满。
2. **合理设置 buffer 大小**：在保证内存占用的前提下，为突发流量预留足够空间。
3. **确认双方流控模式一致**：Host 和 Controller 必须同时开启硬件流控。
4. **降低波特率作为验证手段**：如果降速后溢出不复现，说明 Host 处理能力是瓶颈。

---

## 8. 总结

| 现象 | 可能原因 | 排查重点 |
|------|---------|---------|
| Host RX 溢出，RTS 未拉高 | Host 流控未使能 / 驱动 bug | 驱动配置、GPIO 复用 |
| Host RX 溢出，RTS 已拉高但 TX 不停 | Controller 不守 CTS | Controller 固件、时序 |
| 降低波特率后正常 | Host 处理能力不足 | CPU 负载、中断延迟 |
| 流控线无变化 | 接线错误或芯片未配置 | 物理连接、寄存器配置 |
