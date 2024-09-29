<template>
  <header>
    <h1>
      <img src="../../assets/logo.png" alt="" />
    </h1>
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
    <nav class="panel mt-5">
      <ul>
        <li v-for="rota of rotas" :key="rota.name">
          <RouterLink :to="rota.link" class="link">
            <i :class="rota.icon"></i>
            {{ rota.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuroAtivo: false,
      rotas: [
        {
          name: "Tarefas",
          link: "/",
          icon: "fas fa-tasks",
        },
        {
          name: "Projetos",
          link: "/projects",
          icon: "fas fa-project-diagram",
        },
      ],
    };
  },
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return "Desativar modo escuro";
      }
      return "Ativar modo escuro";
    },
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
</style>
