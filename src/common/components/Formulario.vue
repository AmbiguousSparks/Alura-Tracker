<script setup lang="ts">
import { computed, ref, defineEmits } from "vue";
import { key, useStore } from "@/store";
import { NotificationType } from "@/Notifications/models/notification";
import useNotifier from "@/common/hooks/notifier";
import Task from "@/Tasks/interfaces/Task";
import Temporizador from "@/common/components/Temporizador.vue";

const descricao = ref("");
const idProject = ref("");

const emits = defineEmits<{
  aoSalvarTarefa: (tarefa: Task) => void;
}>();

const store = useStore(key);
const notifier = useNotifier();

const projects = computed(() => store.state.projectsModule.projects);

const finalizarTarefa = (tempoDecorrido: number): void => {
  if (!idProject.value) {
    notifier.notify({
      message: "A tarefa precisa de um projeto vinculado",
      title: "Erro ao finalizar tarefa",
      type: NotificationType.Danger,
    });

    return;
  }
  emits("aoSalvarTarefa", {
    duration: tempoDecorrido,
    description: descricao.value,
    project: projects.value.find((p) => p.id === idProject.value),
  });
  descricao.value = "";
};
</script>

<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option value="">Selecione o projeto</option>
            <option
              v-for="project of projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
