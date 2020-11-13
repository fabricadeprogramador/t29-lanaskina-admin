<template>
  <div>
    <!-- mensagem informativa  -->
    <v-dialog v-model="isDialogSalvoComSucesso" max-width="400">
      <v-row class="mx-0 ">
        <v-col cols="12">
          <v-alert dense type="success" class="mx-0 my-0">
            <strong>{{ msgSalvoComSucesso }}</strong>
          </v-alert>
        </v-col>
      </v-row>
    </v-dialog>
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
        @click="fechaCadastroUsuario"
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
              v-if="isEdicao"
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="atualizar"
            >
              Atualizar
            </v-btn>
            <v-btn
              v-else
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
    <!-- Formulário de Cadastro -->

    <!-- Listagem de usuários cadastrados -->
    <v-data-table
      :headers="cabecalho"
      :items="usuarios"
      sort-by="nome"
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
import UsuarioHttp from "@/http/UsuarioHttp";

export default {
  data: () => ({
    cabecalho: [
      {
        text: "Nome",
        value: "nome"
      },
      { text: "Username", value: "username" },
      { text: "Tipo", value: "role" },
      { text: "Ações", value: "acoes", sortable: false }
    ],
    isDialogSalvoComSucesso: false,
    msgSalvoComSucesso: "",
    isFormOpen: false,
    confirmarSenha: "",
    usuarios: [],
    usuarioCorrente: {
      nome: "",
      username: "",
      senha: "",
      role: "ADMIN",
      ativo: true
    },
    isEdicao: false,
    valid: false,
    nomeRules: [
      v => !!v || "Nome é obrigatório",
      v =>
        (v.length >= 10 && v.length <= 30) ||
        "Nome precisa ter entre 10 e 30 caracteres"
    ],
    usernameRules: [
      v => !!v || "Username é obrigatório",
      v =>
        (v.length >= 3 && v.length <= 15) ||
        "Username precisa ter entre 3 e 15 caracteres"
    ],
    senhaRules: [
      v => !!v || "Senha é obrigatório",
      v =>
        (v.length >= 8 && v.length <= 12) ||
        "Senha precisa ter entre 8 e 12 caracteres"
    ]
  }),

  created() {
    this.buscarTodos();
  },

  methods: {
    fechaCadastroUsuario() {
      this.isFormOpen = false;
      this.cancelar();
    },

    cancelar() {
      this.usuarioCorrente = {
        nome: "",
        username: "",
        senha: "",
        role: "ADMIN"
      };
      this.confirmarSenha = "";
      this.isEdicao = false;
    },

    async buscarTodos() {
      let resposta = await UsuarioHttp.buscarTodos();

      if (resposta.status === 200) {
        this.usuarios = resposta.data;
      }
    },

    async salvar() {
      if (this.usuarioCorrente.senha != this.confirmarSenha) {
        alert("Senhas não conferem!");
      }

      let resposta = await UsuarioHttp.adicionar(this.usuarioCorrente);
      if (resposta.status === 200) {
        this.fechaCadastroUsuario();
        this.buscarTodos();

        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Usuário criado com sucesso";

        setTimeout(() => {
          this.isDialogSalvoComSucesso = false;
          this.msgSalvoComSucesso = "";
        }, 1500);
      }
    },

    async atualizar() {
      if (this.usuarioCorrente.senha != this.confirmarSenha) {
        alert("Senhas não conferem!");
      }
      
      let resposta = await UsuarioHttp.editar(this.usuarioCorrente);

      if(resposta.status === 200){
        this.fechaCadastroUsuario();
        this.buscarTodos();

        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Usuário atualizado com sucesso";

        setTimeout(() => {
          this.isDialogSalvoComSucesso = false;
          this.msgSalvoComSucesso = "";
        }, 1500);
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

    async ativarInativar(usuario) {
      let resposta = await UsuarioHttp.ativarInativar(usuario._id);

      if (resposta.status === 200) {
        this.buscarTodos();
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Usuário atualizado com sucesso!";
        this.buscarTodos();

        setTimeout(() => {
          this.isDialogSalvoComSucesso = false;
          this.msgSalvoComSucesso = "";
        }, 1500);
      }
    }
  }
};
</script>