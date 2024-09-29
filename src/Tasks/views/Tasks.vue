<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ITarefa from "../interfaces/ITarefa";
import Formulario from "../../common/components/Formulario.vue";
import Box from "../../common/components/Box.vue";
import Tarefa from "../components/Tarefa.vue";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Box,
    Tarefa,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
</style>
