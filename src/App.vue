<template>
  <!-- Tag raiz do projeto -->
  <v-app id="inspire">
    <!-- Barra de navegação -->
    <v-navigation-drawer v-model="drawer" app>
      <!-- Lista de rotas -->
      <v-list dense>
        <v-list-item
          v-for="(rota, index) in rotas"
          :key="index"
          :to="rota.rota"
          link
        >
          <v-list-item-action>
            <v-icon>{{ rota.icone }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ rota.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Barra superior -->
    <v-app-bar app color="brown lighten-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
    </v-app-bar>

    <!-- Área principal de conteúdo -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Rodapé -->
    <v-footer color="brown lighten-1" app>
      <span class="white--text"
        >&copy; {{ rodape }} {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data:()=>({
    drawer: null,
    titulo: "Lanaskina Admin",
    rodape: "Fábrica de Programador - High Tech Cursos -",
    rotas: [
      {
        icone: "mdi-home",
        titulo: "Home",
        rota: "/",
      },
      {
        icone: "mdi-account",
        titulo: "Usuários",
        rota: "/usuarios",
      },
      {
        icone: "mdi-domain",
        titulo: "Empresas",
        rota: "/empresas",
      },
      {
        icone: "mdi-account-group",
        titulo: "Clientes",
        rota: "/clientes",
      },
      {
        icone: "mdi-cash-register",
        titulo: "Transações",
        rota: "/transacoes",
      },
      {
        icone: "mdi-finance",
        titulo: "Relatórios",
        rota: "/relatorios",
      },
    ],
  }),
};
</script>
