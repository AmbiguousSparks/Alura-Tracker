<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import Task from "../interfaces/Task";
import { useStore } from "@/store";
import { ProjectActions, TaskActions } from "@/store/actions";
import Formulario from "@/common/components/Formulario.vue";
import Tarefa from "@/Tasks/components/Tarefa.vue";
import Box from "@/common/components/Box.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch(TaskActions.GET_TASKS);
  await store.dispatch(ProjectActions.GET_PROJECTS);
});

const filter = ref("");

const tasks = computed(() => store.state.tasksModule.tasks);

watchEffect(() => {
  store.dispatch(TaskActions.GET_TASKS, filter.value);
});

const listaEstaVazia = () =>
  computed(() => store.state.tasksModule.tasks.length == 0);

const salvarTarefa = async (tarefa: Task) => {
  await store.dispatch(TaskActions.CREATE_TASK, tarefa);
};
</script>

<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Procurar"
          v-model="filter"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa v-for="(tarefa, index) in tasks" :key="index" :tarefa="tarefa" />
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :(</Box>
  </div>
</template>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
</style>
