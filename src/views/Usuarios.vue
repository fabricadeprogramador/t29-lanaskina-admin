<template>
  <div>
    <!-- Formulário de Cadastro -->
    <v-card max-width="50%" class="mx-auto" v-show="isFormOpen">
      <v-btn
        color="red"
        dark
        small
        absolute
        top
        right
        fab
        @click="isFormOpen = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-form v-model="valid">
        <v-container fluid class="my-6">
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="usuarioCorrente.nome"
                :rules="nomeRules"
                label="Nome"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="usuarioCorrente.username"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="usuarioCorrente.senha"
                :rules="senhaRules"
                label="Senha"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="confirmarSenha"
                label="Confirmar Senha"
                :rules="senhaRules"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-switch
                v-model="usuarioCorrente.ativo"
                :label="`Ativo?`"
              ></v-switch>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="salvar"
            >
              Salvar
            </v-btn>
            <v-btn color="warning" class="mr-4" @click="cancelar">
              Cancelar
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <!-- Listagem de usuários cadastrados -->
    <v-data-table
      :headers="cabecalho"
      :items="usuarios"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Usuários Cadastrados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="isFormOpen = true" v-show="!isFormOpen"
            >Novo Usuário</v-btn
          >
        </v-toolbar>
      </template>

      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" @click="editar(item)" color="primary">
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="ativarInativar(item)"
          v-if="item.ativo"
          color="green"
        >
          mdi-check-bold
        </v-icon>
        <v-icon small @click="ativarInativar(item)" v-else color="red">
          mdi-cancel
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-subheader>Nenhum usuário cadastro.</v-subheader>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    cabecalho: [
      {
        text: "Nome",
        value: "nome",
      },
      { text: "Username", value: "username" },
      { text: "Tipo", value: "role" },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    geradorId: 5,
    isFormOpen: false,
    confirmarSenha: "",
    usuarios: [],
    usuarioCorrente: {
      nome: "",
      username: "",
      senha: "",
      role: "ADMIN",
      ativo: true,
    },
    isEdicao: false,
    valid: false,
    nomeRules: [
      (v) => !!v || "Nome é obrigatório",
      (v) =>
        (v.length >= 10 && v.length <= 30) ||
        "Nome precisa ter entre 10 e 30 caracteres",
    ],
    usernameRules: [
      (v) => !!v || "Username é obrigatório",
      (v) =>
        (v.length >= 3 && v.length <= 15) ||
        "Username precisa ter entre 3 e 15 caracteres",
    ],
    senhaRules: [
      (v) => !!v || "Senha é obrigatório",
      (v) =>
        (v.length >= 8 && v.length <= 12) ||
        "Senha precisa ter entre 8 e 12 caracteres",
    ],
  }),

  created() {
    this.initialize();
  },

  methods: {
    cancelar() {
      this.usuarioCorrente = {
        nome: "",
        username: "",
        senha: "",
        role: "ADMIN",
      };
      this.confirmarSenha = "";
      this.isEdicao = false;
    },

    initialize() {
      this.usuarios = [
        {
          id: 0,
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
          ativo: true,
        },
        {
          id: 1,
          nome: "Maria da Silva",
          username: "mariaa",
          senha: "123",
          role: "ADMIN",
          ativo: true,
        },
        {
          id: 2,
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
          ativo: true,
        },
        {
          id: 3,
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
          ativo: true,
        },
        {
          id: 4,
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
          ativo: true,
        },
      ];
    },

    salvar() {
      if (this.usuarioCorrente.senha != this.confirmarSenha) {
        alert("Senhas não conferem!");
      } else {
        if (!this.isEdicao) {
          this.adicionar();
        } else {
          this.salvarEdicao();
        }

        this.isFormOpen = false;
        this.cancelar();
      }
    },

    salvarEdicao() {
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarioCorrente.id == this.usuarios[i].id) {
          Object.assign(this.usuarios[i], this.usuarioCorrente);
          break;
        }
      }
    },

    editar(usuario) {
      Object.assign(this.usuarioCorrente, usuario);
      this.isEdicao = true;
      this.isFormOpen = true;
    },

    adicionar() {
      this.usuarioCorrente.id = this.geradorId;
      this.geradorId++;
      this.usuarios.push(this.usuarioCorrente);
    },

    ativarInativar(usuario) {
      for (let i = 0; i < this.usuarios.length; i++) {
        if (usuario.id == this.usuarios[i].id) {
          this.usuarios[i].ativo = !this.usuarios[i].ativo;
          break;
        }
      }
    },
  },
};
</script>