<template>
  <div class="bar" :class="`bar--${stage_key}`">
    <!-- 标题栏：始终可见，点击展开 -->
    <button class="bar__head" type="button" :aria-expanded="expanded" @click="expanded = !expanded">
      <RopeIndicator class="bar__rope" />

      <div class="bar__headline">
        <div class="bar__name-line">
          <span class="bar__name">晖城</span>
          <CrisisStage />
        </div>
        <p class="bar__relation">{{ headline }}</p>
      </div>

      <span class="bar__chevron" :class="{ 'bar__chevron--open': expanded }" aria-hidden="true">
        <i class="fa-solid fa-chevron-down"></i>
      </span>
    </button>

    <!-- 展开区：三个页签 -->
    <div v-show="expanded" class="bar__body">
      <TabNav v-model="active_tab" :tabs="TABS" />

      <div class="bar__pane">
        <PlayerPanel v-if="active_tab === 'player'" />
        <CharacterPanel v-else-if="active_tab === 'chars'" />
        <WorldPanel v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CharacterPanel from './components/CharacterPanel.vue';
import CrisisStage from './components/CrisisStage.vue';
import PlayerPanel from './components/PlayerPanel.vue';
import RopeIndicator from './components/RopeIndicator.vue';
import TabNav from './components/TabNav.vue';
import WorldPanel from './components/WorldPanel.vue';
import { useDataStore } from './store';

const store = useDataStore();

const expanded = useLocalStorage('status_bar:expanded', false);
const active_tab = useLocalStorage('status_bar:tab', 'chars');

const TABS = [
  { id: 'player', label: '玩家' },
  { id: 'chars', label: '角色' },
  { id: 'world', label: '世界' },
];

const stage_key = computed(
  () => ({ 征兆期: 'calm', 频发期: 'warning', 爆发期: 'accent' })[store.data.世界.危机阶段] ?? 'calm',
);

// 标题栏摘要：玩家姓名填入后显示玩家，否则回落到林敬亭的关系状态
const headline = computed(() => {
  const playerName = store.data.玩家.姓名;
  if (playerName) return `${playerName} · ${store.data.世界.当前区域}`;
  return store.data.林敬亭.关系状态;
});
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
  border-top: 1px solid var(--c-border);
}

.bar__pane {
  padding: 12px;
  animation: unfold 0.3s ease;
}

@keyframes unfold {
  from {
    opacity: 0;
    transform: translateY(-3px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar__pane {
    animation: none;
  }
}
</style>
