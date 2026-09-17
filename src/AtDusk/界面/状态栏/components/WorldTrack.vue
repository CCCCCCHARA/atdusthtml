<template>
  <section class="track">
    <h3 class="track__title">晖城</h3>

    <dl class="field">
      <dt class="field__key">时间</dt>
      <dd class="field__value field__value--mono">{{ store.data.世界.当前时间 }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">所在地</dt>
      <dd class="field__value">{{ store.data.世界.当前区域 }}</dd>
    </dl>

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
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const affairs = computed(() => Object.entries(store.data.世界.近期事务 ?? {}));
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
  color: var(--c-primary);
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

.field__value--mono {
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
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
</style>
