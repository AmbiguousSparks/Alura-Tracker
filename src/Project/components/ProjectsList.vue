<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "@/store";
import { ProjectActions } from "@/store/actions";

const store = useStore();

const projects = computed(() => store.state.projectsModule.projects);

onMounted(async () => {
  await store.dispatch(ProjectActions.GET_PROJECTS);
});
</script>

<template>
  <section>
    <div class="panel">
      <RouterLink to="/new" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus-circle"></i>
        </span>
      </RouterLink>
    </div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p of projects" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td class="actions">
            <RouterLink :to="'/edit/' + p.id">
              <button class="button">
                <i class="fas fa-edit"></i>
              </button>
            </RouterLink>
            <button
              class="button is-danger"
              @click="store.dispatch(ProjectActions.DELETE_PROJECT, p.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
