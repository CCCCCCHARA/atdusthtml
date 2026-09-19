<template>
  <section class="world">
    <!-- 当前状态（来自变量） -->
    <dl class="field">
      <dt class="field__key">时间</dt>
      <dd class="field__value field__value--mono">{{ store.data.世界.当前时间 }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">地点</dt>
      <dd class="field__value">{{ store.data.世界.当前区域 }}</dd>
    </dl>

    <div class="stage" :class="`stage--${stage_key}`">
      <span class="field__key">危机</span>
      <div class="stage__body">
        <span class="stage__label">{{ store.data.世界.危机阶段 }}</span>
        <div class="stage__bars">
          <span
            v-for="level in 3"
            :key="level"
            class="stage__bar"
            :class="{ 'stage__bar--lit': level <= stage_level }"
          ></span>
        </div>
      </div>
    </div>

    <div class="affairs">
      <span class="field__key">在办</span>
      <ul v-if="affairs.length" class="affairs__list">
        <li v-for="[name, progress] in affairs" :key="name" class="affairs__item">
          <span class="affairs__name">{{ name }}</span>
          <span class="affairs__progress">{{ progress }}</span>
        </li>
      </ul>
      <span v-else class="affairs__empty">没有在办的事</span>
    </div>

    <!-- 世界观要点（随剧情不变的静态设定） -->
    <h4 class="world__heading">晖城</h4>
    <ul class="world__list">
      <li v-for="item in LORE" :key="item" class="world__item">{{ item }}</li>
    </ul>

    <h4 class="world__heading">沉区</h4>
    <p class="world__note">{{ SINKHOLE }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const STAGES = ['征兆期', '频发期', '爆发期'] as const;

const stage_level = computed(() => STAGES.indexOf(store.data.世界.危机阶段 as (typeof STAGES)[number]) + 1);
const stage_key = computed(() => ['calm', 'warning', 'accent'][stage_level.value - 1] ?? 'calm');

const affairs = computed(() => Object.entries(store.data.世界.近期事务 ?? {}));

// 世界观要点为界面展示用的精简副本；世界书条目仍是完整事实来源
const LORE = [
  '魔法已公开，但原理、获得方式、触发条件均未解明；能力因人而异，没有可传授的通用法门。',
  '异种是人类的亚种分支。绝大部分人携带异种基因，只有少数显性。',
  '概念是由词语凝结成的抽象实体。有人声称获得过概念的力量，但无法证实。',
  '魔法、异种、概念、危机相互独立，不存在谁引发谁、谁解释谁的关系。',
];

// 沉区内部可见度随危机阶段变化，故此处随阶段渲染
const SINKHOLE = computed(() => {
  if (store.data.世界.危机阶段 === '爆发期') {
    return '沉区正在扩张，边界不再稳定。内部可见度上升，肉眼能看到里面的东西，但依然无法理解。';
  }
  if (store.data.世界.危机阶段 === '频发期') {
    return '沉区内部仍然看不到，仪器读数已经稳定不下来。全城异常事件频率上升，沉区以外也开始出现异常。';
  }
  return '封锁是公开的，从外面能看到多层隔离栏、检查站与照明塔。内部一片漆黑，肉眼完全不可见，只能依靠仪器检测。';
}).value;
</script>

<style lang="scss" scoped>
.world {
  display: flex;
  flex-direction: column;
  gap: 7px;
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

.field__value--mono {
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}

.stage {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stage__body {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stage__label {
  font-size: 12px;
  color: var(--c-text);
}

.stage__bars {
  display: flex;
  gap: 3px;
}

.stage__bar {
  width: 4px;
  height: 12px;
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

.affairs {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.affairs__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.affairs__item {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-left: 7px;
  border-left: 1px solid var(--c-border);
}

.affairs__name {
  font-size: 12px;
  color: var(--c-text);
}

.affairs__progress {
  font-size: 11px;
  color: var(--c-text-muted);
  overflow-wrap: anywhere;
}

.affairs__empty {
  font-size: 12px;
  color: var(--c-text-muted);
}

.world__heading {
  margin-top: 5px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--c-border);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--c-primary);
}

.world__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 14px;
}

.world__item {
  font-size: 11px;
  line-height: 1.55;
  color: var(--c-text-muted);
}

.world__note {
  font-size: 11px;
  line-height: 1.55;
  color: var(--c-text-muted);
}
</style>
