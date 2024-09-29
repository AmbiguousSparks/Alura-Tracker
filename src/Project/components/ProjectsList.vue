<script setup lang="ts">
import { computed, onBeforeMount, Ref, ref } from "vue";
import { ApplicationState, useStore } from "@/store";
import { Store } from "vuex";
import { DELETE_PROJECT } from "@/store/mutations";

const store: Ref<Store<ApplicationState>> = ref();

const projects = computed(() => store.value?.state.projects);

onBeforeMount(() => {
  store.value = useStore();
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
              @click="store.commit(DELETE_PROJECT, p.id)"
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
