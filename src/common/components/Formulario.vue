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

<script lang="ts">
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import { key, useStore } from "@/store";
import { NotificationType } from "@/Notifications/models/notification";
import { NotificationService } from "@/Notifications/services/notification-service";
import useNotifier from "@/common/hooks/notifier";

export default defineComponent({
  name: "Formulário",
  emits: ["aoSalvarTarefa"],
  components: {
    Temporizador,
  },
  data() {
    return {
      descricao: "",
      idProject: "",
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      if (!this.idProject) {
        this.notifier.notify({
          message: "A tarefa precisa de um projeto vinculado",
          title: "Erro ao finalizar tarefa",
          type: NotificationType.Danger,
        });

        return;
      }
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        project: this.projects.find((p) => p.id === this.idProject),
      });
      this.descricao = "";
    },
  },
  setup() {
    const store = useStore(key);
    const notifier = useNotifier();
    return {
      projects: computed(() => store.state.projects),
      store,
      notifier,
    };
  },
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
