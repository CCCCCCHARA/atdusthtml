// AtDusk MVU 变量结构
// 世界：随剧情推进而变化的世界状态；林敬亭：角色自身的魔法与关系状态
// 增量更新：每个字段都带 prefault，单字段缺失或整个子对象被 JSON Patch remove 时回落到初始语义
export const Schema = z.object({
  // ── 世界 ──
  世界: z
    .object({
      // 当前场景时间，格式 YYYY/MM/DD-HH:MM（格式由变量更新规则约束，此处不做严格校验，避免一次格式偏差丢弃整轮更新）
      当前时间: z.string().prefault('2026/09/17-19:30'),
      // 角色当前所在区域；场景条目的 EJS 用 includes 匹配区域名，故保留为自由字符串
      当前区域: z.string().prefault('大学城'),
      // 危机推进阶段，取值与「阶段指导」条目的三段 EJS 条件精确对应
      危机阶段: z.enum(['征兆期', '频发期', '爆发期']).prefault('征兆期'),
      // 进行中的事件标记：键为事务名、值为该事务的当前进度；无进行中事务时为空对象
      近期事务: z
        .record(z.string().describe('事务名'), z.string().describe('该事务的当前进度'))
        .prefault({}),
    })
    .prefault({}),

  // ── 林敬亭 ──
  林敬亭: z
    .object({
      // 累积经历的心灵震颤次数，0 表示从未经历；只增不减
      心灵震颤次数: z.coerce.number().prefault(0),
      // 最近一次心灵震颤的走向，决定心灵震颤机制作用于她的方向
      震颤倾向: z.enum(['未定', '美德', '折磨']).prefault('未定'),
      // 她是否已走向魔法；初始为「无」
      魔法状态: z.enum(['无', '已觉醒']).prefault('无'),
      // 与 <user> 的关系状态，随剧情推进的记述性内容，不做枚举约束
      关系状态: z.string().prefault('青梅竹马，关系暧昧未明'),
    })
    .prefault({}),
});

export type Schema = z.output<typeof Schema>;
