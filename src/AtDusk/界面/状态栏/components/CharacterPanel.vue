<template>
  <section class="chars">
    <!-- 角色选择 -->
    <div class="chars__pick">
      <button
        v-for="c in ROSTER"
        :key="c.key"
        class="chars__chip"
        :class="{ 'chars__chip--active': c.key === picked }"
        type="button"
        :style="c.key === picked ? { borderColor: c.color, color: c.color } : undefined"
        @click="picked = c.key"
      >
        {{ c.name }}
      </button>
    </div>

    <!-- 基础档案（随剧情不变的静态信息） -->
    <dl class="field">
      <dt class="field__key">身份</dt>
      <dd class="field__value">{{ current.identity }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">档案</dt>
      <dd class="field__value">{{ current.registry }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">关系</dt>
      <dd class="field__value">{{ relation }}</dd>
    </dl>

    <!-- 只在她/他参与剧情后才出现的状态 -->
    <template v-if="hasMagicTrack">
      <div class="tremor" :class="`tremor--${tendency_key}`">
        <div class="tremor__head">
          <span class="field__key">心灵震颤</span>
          <span v-if="tremorCount > 0" class="tremor__count">{{ tremorCount }} 次</span>
        </div>

        <template v-if="tremorCount > 0">
          <div class="tremor__tendency">
            <span class="tremor__dot"></span>
            <span class="tremor__label">{{ tendency_label }}</span>
          </div>
          <p class="tremor__note">{{ tendency_note }}</p>
        </template>

        <p v-else class="tremor__note">还没有经历过</p>
      </div>
    </template>

    <!-- 徐梦专属：恶魔形态被谁见过 -->
    <dl v-if="picked === '徐梦'" class="field">
      <dt class="field__key">形态</dt>
      <dd class="field__value" :class="{ 'field__value--exposed': exposed }">{{ exposeLabel }}</dd>
    </dl>

    <!-- 林敬亭专属：魔法状态（她本不会魔法，这一栏是那个悬置的钩子） -->
    <dl v-if="picked === '林敬亭'" class="field">
      <dt class="field__key">魔法</dt>
      <dd class="field__value" :class="{ 'field__value--awakened': linAwakened }">
        {{ linAwakened ? '已觉醒' : '无' }}
      </dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

// 基础档案为界面展示用的精简副本；世界书条目仍是完整事实来源
const ROSTER = [
  {
    key: '林敬亭',
    name: '林敬亭',
    color: 'var(--c-accent)',
    identity: '大学生，港口贸易家族出身，普通人',
    registry: '不在特管局档案内',
  },
  {
    key: '徐梦',
    name: '徐梦',
    color: 'var(--c-warning)',
    identity: '大学生，恶魔类型异种，<user> 的表妹',
    registry: '合规登记，定期复检',
  },
  {
    key: '周予安',
    name: '周予安',
    color: 'var(--c-primary)',
    identity: '人类，天生目盲，拥有魔法',
    registry: '被特管局知悉并归档',
  },
] as const;

const picked = ref<string>('林敬亭');

const current = computed(() => ROSTER.find(c => c.key === picked.value) ?? ROSTER[0]);

const TENDENCY: Record<string, { key: string; label: string; note: string }> = {
  未定: { key: 'undecided', label: '走向未定', note: '这一次还没显出方向。' },
  美德: { key: 'virtue', label: '美德向', note: '能力增强了，更愿意承担风险与代价。' },
  折磨: { key: 'affliction', label: '折磨向', note: '能力增强了，更倾向自保与索取。' },
};

type Tracked = { 关系状态: string; 心灵震颤次数: number; 震颤倾向: string };

const tracked = computed<Tracked>(() => {
  const d = store.data;
  if (picked.value === '徐梦') return d.徐梦 as unknown as Tracked;
  if (picked.value === '周予安') return d.周予安 as unknown as Tracked;
  return d.林敬亭 as unknown as Tracked;
});

const relation = computed(() => tracked.value.关系状态);
const tremorCount = computed(() => tracked.value.心灵震颤次数);
const hasMagicTrack = computed(() => true);

const tendency_key = computed(() => TENDENCY[tracked.value.震颤倾向]?.key ?? 'undecided');
const tendency_label = computed(() => TENDENCY[tracked.value.震颤倾向]?.label ?? '走向未定');
const tendency_note = computed(() => TENDENCY[tracked.value.震颤倾向]?.note ?? '');

const linAwakened = computed(() => store.data.林敬亭.魔法状态 === '已觉醒');

const EXPOSE: Record<string, string> = {
  未暴露: '未暴露',
  '仅<user>知道': '只有 <user> 见过',
  已公开: '已公开',
};

const exposed = computed(() => store.data.徐梦.恶魔形态暴露度 !== '未暴露');
const exposeLabel = computed(() => EXPOSE[store.data.徐梦.恶魔形态暴露度] ?? '未暴露');
</script>

<style lang="scss" scoped>
.chars {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.chars__pick {
  display: flex;
  gap: 4px;
  margin-bottom: 2px;
}

.chars__chip {
  flex: 1;
  padding: 5px 2px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  font-family: inherit;
  font-size: 11px;
  color: var(--c-text-muted);
  cursor: pointer;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.chars__chip:hover {
  color: var(--c-text);
}

.chars__chip--active {
  font-weight: 600;
}

.field {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.field__key {
  flex: none;
  width: 32px;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--c-text-muted);
}

.field__value {
  font-size: 12px;
  color: var(--c-text);
  overflow-wrap: anywhere;
}

.field__value--awakened {
  color: var(--c-accent);
  font-weight: 600;
}

.field__value--exposed {
  color: var(--c-warning);
}

.tremor {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 2px;
  padding: 7px 9px;
  background: var(--c-surface-raised);
  border-left: 2px solid var(--c-border);
  transition: border-color 0.8s ease;
}

.tremor--virtue {
  border-left-color: var(--c-primary);
}

.tremor--affliction {
  border-left-color: var(--c-warning);
}

.tremor__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.tremor__count {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text);
}

.tremor__tendency {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tremor__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--c-text-muted);
  transition: background 0.8s ease;
}

.tremor--virtue .tremor__dot {
  background: var(--c-primary);
  box-shadow: 0 0 5px var(--c-primary);
}

.tremor--affliction .tremor__dot {
  background: var(--c-warning);
  box-shadow: 0 0 5px var(--c-warning);
}

.tremor__label {
  font-size: 12px;
  color: var(--c-text);
}

.tremor__note {
  font-size: 11px;
  line-height: 1.5;
  color: var(--c-text-muted);
}
</style>
