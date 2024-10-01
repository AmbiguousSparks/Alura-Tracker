<script setup lang="ts">
import { computed, defineProps } from "vue";

const tempoDecorrido = computed(() =>
  new Date(props.tempoEmSegundos * 1000).toISOString().substr(11, 8),
);

const props = defineProps({
  tempoEmSegundos: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <section>
    <strong class="display">
      {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<style scoped>
.display {
  color: var(--texto-primario);
}
</style>
