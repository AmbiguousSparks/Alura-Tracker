<template>
  <Box>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.project?.name || "Tarefa sem projeto" }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duration" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "../../common/components/Cronometro.vue";
import Task from "../interfaces/Task";
import Box from "../../common/components/Box.vue";

export default defineComponent({
  name: "Tarefa",
  components: {
    Cronometro,
    Box,
  },
  props: {
    tarefa: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
});
</script>
