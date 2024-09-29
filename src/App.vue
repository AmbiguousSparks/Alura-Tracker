<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notification />
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./common/components/BarraLateral.vue";
import Notification from "@/Notifications/components/Notification.vue";

export default defineComponent({
  name: "App",
  components: {
    Notification,
    BarraLateral,
  },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>
<style scoped>
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
