<template>
  <nav class="tabs" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tabs__item"
      :class="{ 'tabs__item--active': tab.id === modelValue }"
      type="button"
      role="tab"
      :aria-selected="tab.id === modelValue"
      @click="emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  tabs: { id: string; label: string }[];
  modelValue: string;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  border-bottom: 1px solid var(--c-border);
}

.tabs__item {
  flex: 1;
  padding: 7px 4px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--c-text-muted);
  cursor: pointer;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.tabs__item:hover {
  color: var(--c-text);
}

.tabs__item--active {
  color: var(--c-primary);
  border-bottom-color: var(--c-primary);
}

.tabs__item:focus-visible {
  outline: 1px solid var(--c-primary);
  outline-offset: -2px;
}
</style>
