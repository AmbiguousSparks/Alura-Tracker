<script setup lang="ts">
import { onMounted, Ref, ref, defineProps } from "vue";
import Project from "@/Project/models/project";
import { useStore } from "@/store";
import { cloneObject } from "@/common/utils/object-utils";
import { useRouter } from "vue-router";
import { ADD_PROJECT, UPDATE_PROJECT } from "@/store/mutations";
import { NotificationType } from "@/Notifications/models/notification";
import useNotifier from "@/common/hooks/notifier";

const router = useRouter();

const project: Ref<Project> = ref({});
const props = defineProps<{
  id?: string;
}>();
const store = useStore();

const isEditMode = ref(false);

const notifier = useNotifier();

onMounted(() => {
  isEditMode.value = !!props.id;
  if (isEditMode.value) {
    project.value = store.getters.getProject(props.id);
  }
});

const createProject = () => {
  project.value.id = new Date().toISOString();

  store.commit(ADD_PROJECT, cloneObject(project.value));

  notifier.notify({
    title: "Sucesso",
    message: `Projeto ${project.value.name} criado com sucesso`,
    type: NotificationType.Success,
  });

  router.push("/Projects");

  project.value = {};
};

const editProject = () => {
  store.commit(UPDATE_PROJECT, {
    id: props.id,
    project: cloneObject(project.value),
  });

  notifier.notify({
    title: "Sucesso",
    message: `Projeto ${project.value.name} alterado com sucesso`,
    type: NotificationType.Success,
  });

  project.value = {};

  router.push("/Projects");
};

const save = () => {
  if (isEditMode.value) {
    return editProject();
  }

  return createProject();
};
</script>

<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="name" class="label"> Nome do Projeto </label>
        <input type="text" class="input" v-model="project.name" id="name" />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>
