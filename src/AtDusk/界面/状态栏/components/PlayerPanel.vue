<template>
  <section class="player">
    <dl class="field">
      <dt class="field__key">姓名</dt>
      <dd class="field__value" :class="{ 'field__value--empty': !name }">{{ name || '未填入' }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">性别</dt>
      <dd class="field__value" :class="{ 'field__value--empty': !gender }">{{ gender || '未填入' }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">年龄</dt>
      <dd class="field__value" :class="{ 'field__value--empty': !age }">{{ age || '未填入' }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">身份</dt>
      <dd class="field__value" :class="{ 'field__value--empty': !identity }">{{ identity || '未填入' }}</dd>
    </dl>

    <dl class="field">
      <dt class="field__key">魔法</dt>
      <dd class="field__value" :class="{ 'field__value--awakened': awakened }">
        {{ awakened ? '已觉醒' : '无' }}
      </dd>
    </dl>

    <p v-if="isBlank" class="player__hint">这些字段由你在游玩中填入，或由所挂角色卡决定。</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const name = computed(() => store.data.玩家.姓名);
const gender = computed(() => store.data.玩家.性别);
const age = computed(() => store.data.玩家.年龄);
const identity = computed(() => store.data.玩家.身份);
const awakened = computed(() => store.data.玩家.魔法状态 === '已觉醒');

const isBlank = computed(() => !name.value && !gender.value && !age.value && !identity.value);
</script>

<style lang="scss" scoped>
.player {
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

.field__value--empty {
  color: var(--c-border);
}

.field__value--awakened {
  color: var(--c-accent);
  font-weight: 600;
}

.player__hint {
  margin-top: 2px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--c-text-muted);
}
</style>
