<template>
  <section class="track">
    <h3 class="track__title">林敬亭</h3>

    <dl class="field">
      <dt class="field__key">关系</dt>
      <dd class="field__value">{{ store.data.林敬亭.关系状态 }}</dd>
    </dl>

    <!-- 心灵震颤：不是数值条，而是「次数 + 当前走向」 -->
    <div class="tremor" :class="`tremor--${tendency_key}`">
      <div class="tremor__head">
        <span class="field__key">心灵震颤</span>
        <span v-if="count > 0" class="tremor__count">{{ count }} 次</span>
      </div>

      <template v-if="count > 0">
        <div class="tremor__tendency">
          <span class="tremor__dot"></span>
          <span class="tremor__label">{{ tendency_label }}</span>
        </div>
        <p class="tremor__note">{{ tendency_note }}</p>
      </template>

      <p v-else class="tremor__note tremor__note--empty">还没有经历过</p>
    </div>

    <dl class="field">
      <dt class="field__key">魔法</dt>
      <dd class="field__value" :class="{ 'field__value--awakened': awakened }">
        {{ awakened ? '已觉醒' : '无' }}
      </dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const count = computed(() => store.data.林敬亭.心灵震颤次数);
const tendency = computed(() => store.data.林敬亭.震颤倾向);
const awakened = computed(() => store.data.林敬亭.魔法状态 === '已觉醒');

const TENDENCY: Record<string, { key: string; label: string; note: string }> = {
  未定: { key: 'undecided', label: '走向未定', note: '这一次还没显出方向。' },
  美德: { key: 'virtue', label: '美德向', note: '能力增强了，她更愿意承担风险与代价。' },
  折磨: { key: 'affliction', label: '折磨向', note: '能力增强了，她更倾向自保与索取。' },
};

const tendency_key = computed(() => TENDENCY[tendency.value]?.key ?? 'undecided');
const tendency_label = computed(() => TENDENCY[tendency.value]?.label ?? '走向未定');
const tendency_note = computed(() => TENDENCY[tendency.value]?.note ?? '');
</script>

<style lang="scss" scoped>
.track {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
}

.track__title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--c-accent);
  padding-bottom: 5px;
  border-bottom: 1px solid var(--c-border);
}

.field {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.field__key {
  flex: none;
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

.tremor {
  display: flex;
  flex-direction: column;
  gap: 5px;
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

.tremor__note--empty {
  font-style: normal;
}
</style>
