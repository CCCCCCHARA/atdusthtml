<template>
  <div class="stage" :class="`stage--${stage_key}`">
    <span class="stage__label">{{ stage }}</span>
    <div class="stage__bars">
      <span v-for="level in 3" :key="level" class="stage__bar" :class="{ 'stage__bar--lit': level <= stage_level }"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const STAGES = ['征兆期', '频发期', '爆发期'] as const;

const stage = computed(() => store.data.世界.危机阶段);

const stage_level = computed(() => STAGES.indexOf(stage.value as (typeof STAGES)[number]) + 1);

const stage_key = computed(() => ['calm', 'warning', 'accent'][stage_level.value - 1] ?? 'calm');
</script>

<style lang="scss" scoped>
.stage {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stage__label {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
  white-space: nowrap;
}

/* 三格封锁线：亮起的格数即当前阶段，颜色随强度推进 */
.stage__bars {
  display: flex;
  gap: 3px;
}

.stage__bar {
  width: 4px;
  height: 13px;
  background: var(--c-border);
  transition: background 0.6s ease;
}

.stage--calm .stage__bar--lit {
  background: var(--c-calm);
}

.stage--warning .stage__bar--lit {
  background: var(--c-warning);
}

.stage--accent .stage__bar--lit {
  background: var(--c-accent);
}
</style>
