<template>
  <div class="bar" :class="`bar--${stage_key}`">
    <!-- 标题栏：始终可见，点击展开 -->
    <button class="bar__head" type="button" :aria-expanded="expanded" @click="expanded = !expanded">
      <RopeIndicator class="bar__rope" />

      <div class="bar__headline">
        <div class="bar__name-line">
          <span class="bar__name">林敬亭</span>
          <CrisisStage />
        </div>
        <p class="bar__relation">{{ store.data.林敬亭.关系状态 }}</p>
      </div>

      <span class="bar__chevron" :class="{ 'bar__chevron--open': expanded }" aria-hidden="true">
        <i class="fa-solid fa-chevron-down"></i>
      </span>
    </button>

    <!-- 展开区：世界轨 / 她轨 -->
    <div v-show="expanded" class="bar__body">
      <WorldTrack />
      <HerTrack />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CrisisStage from './components/CrisisStage.vue';
import HerTrack from './components/HerTrack.vue';
import RopeIndicator from './components/RopeIndicator.vue';
import WorldTrack from './components/WorldTrack.vue';
import { useDataStore } from './store';

const store = useDataStore();

const expanded = useLocalStorage('status_bar:expanded', false);

const stage_key = computed(
  () => ({ 征兆期: 'calm', 频发期: 'warning', 爆发期: 'accent' })[store.data.世界.危机阶段] ?? 'calm',
);
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-left-width: 3px;
  border-left-color: var(--c-calm);
  font-family: var(--font-ui);
  color: var(--c-text);
  transition:
    border-left-color 0.8s ease,
    background 0.8s ease;
}

.bar--warning {
  border-left-color: var(--c-warning);
}

.bar--accent {
  border-left-color: var(--c-accent);
  background: #0b1114;
}

.bar__head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: none;
  font-family: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.bar__head:focus-visible {
  outline: 1px solid var(--c-primary);
  outline-offset: -2px;
}

.bar__rope {
  flex: none;
}

.bar__headline {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bar__name-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.bar__name {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.bar__relation {
  font-size: 11px;
  color: var(--c-text-muted);
  overflow-wrap: anywhere;
}

.bar__chevron {
  flex: none;
  font-size: 10px;
  color: var(--c-text-muted);
  transition: transform 0.3s ease;
}

.bar__chevron--open {
  transform: rotate(180deg);
}

.bar__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 12px;
  border-top: 1px solid var(--c-border);
  animation: unfold 0.35s ease;
}

@keyframes unfold {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 420px) {
  .bar__body {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar__body {
    animation: none;
  }
}
</style>
