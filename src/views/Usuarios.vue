<template>
  <div>
    <!-- Formulário de Cadastro -->
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuarioCorrente.nome"
              :rules="nameRules"
              :counter="10"
              label="Nome"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuarioCorrente.username"
              :rules="nameRules"
              :counter="10"
              label="Username"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuarioCorrente.senha"
              :rules="nameRules"
              :counter="10"
              label="Senha"
              type="password"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="usuarioCorrente.tipo"
              :rules="nameRules"
              :counter="10"
              label="Tipo"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="">
          Salvar
        </v-btn>
        <v-btn color="warning" class="mr-4" @click="">
          Cancelar
        </v-btn>
      </v-container>
    </v-form>

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
          <v-btn color="success" @click="abrirFormCadastro">Novo Usuário</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
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
    usuarios: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    usuarioCorrente: {
      nome: "",
      username: "",
      senha: "",
      role: "",
    },
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    abrirFormCadastro() {
      alert("Chamou abrir cadastro");
    },

    initialize() {
      this.usuarios = [
        {
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
        },
        {
          nome: "Maria da Silva",
          username: "mariaa",
          senha: "123",
          role: "ADMIN",
        },
        {
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
        },
        {
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
        },
        {
          nome: "Jão da Silva",
          username: "jao01",
          senha: "123",
          role: "ADMIN",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>