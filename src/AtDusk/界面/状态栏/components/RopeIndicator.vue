<template>
  <div class="rope" :class="{ 'rope--stirred': stirred }" :title="hint">
    <span class="rope__knot"></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

// 她想事情、想到 <user> 而 <user> 不在、不安的时候会碰那根红绳。
// 界面只在「她已经历过震颤」或「她已经走向魔法」时让它显形，
// 因为这两件事都会让她更需要那根绳子。
const stirred = computed(() => store.data.林敬亭.心灵震颤次数 > 0 || store.data.林敬亭.魔法状态 === '已觉醒');

const hint = computed(() => (stirred.value ? '她碰了碰手腕上的红绳' : ''));
</script>

<style lang="scss" scoped>
.rope {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  opacity: 0;
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.rope--stirred {
  opacity: 1;
}

.rope__knot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-accent);
  box-shadow: 0 0 5px var(--c-accent);
  animation: rope-pulse 3.2s ease-in-out infinite;
}

@keyframes rope-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.75;
  }

  50% {
    transform: scale(1.18);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rope__knot {
    animation: none;
  }
}
</style>
