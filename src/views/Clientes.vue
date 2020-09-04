<template>
  <div>
    <!-- Listagem de clientes cadastrados -->
    <v-data-table
      :headers="cabecalhoCliente"
      :items="clientes"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Clientes Cadastrados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" @click="abrirDIalog(item)" color="primary"
          >mdi-file-find</v-icon
        >
        <v-icon
          small
          @click="ativarInativar(item)"
          v-if="item.ativo"
          color="green"
          >mdi-check-bold</v-icon
        >
        <v-icon small @click="ativarInativar(item)" v-else color="red"
          >mdi-cancel</v-icon
        >
        <v-row justify="center">
          <v-dialog v-model="isDialogOpen" width="600px" persistent>
            <v-card>
              <v-card-title class="headline"
                >Informações do Cliente</v-card-title
              >
              <v-card-text elevation="5">
                <!-- <v-row >
                  <v-col cols="12" sm="2"  >
                    <v-text-field :value="item.id" label="ID:" outlined disabled ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="10">
                    <v-text-field :value="item.nome" label="NOME:" outlined disabled ></v-text-field>
                  </v-col>
                </v-row>-->

                <v-row>
                  <v-col cols="12" sm="12">
                    <v-card elevation="3" class="pa-3">
                      <v-row style="height: 60px;">
                        <v-col cols="12" sm="2">
                          <v-text-field
                            :value="clienteCorrente.id"
                            label="ID:"
                            outlined
                            disabled
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            :value="clienteCorrente.nome"
                            label="NOME:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            :value="clienteCorrente.sexo"
                            label="Sexo"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row style="height: 60px;">
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :value="clienteCorrente.dataNacimento"
                            label="Data Nascimento"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :value="clienteCorrente.cpf"
                            label="CPF"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row style="height: 60px;">
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :value="clienteCorrente.telefone"
                            label="Telefone"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :value="clienteCorrente.email"
                            label="E-mail"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row style="height: 60px;">
                        <v-col cols="12">
                          <v-text-field
                            :value="clienteCorrente.endereco.rua"
                            label="RUA/AV:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row style="height: 60px;">
                        <v-col cols="12" sm="10">
                          <v-text-field
                            :value="clienteCorrente.endereco.bairro"
                            label="BAIRRO:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            :value="clienteCorrente.endereco.numero"
                            label="Nº:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn color="green darken-1" text @click="testeEdit"
                  >Editar</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="isDialogOpen = false"
                  >Fechar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>

      <template v-slot:no-data>
        <v-subheader>Nenhum cliente cadastro.</v-subheader>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
    cabecalhoCliente: [
      {
        text: "Nome",
        value: "nome",
      },
      {
        text: "CPF",
        value: "cpf",
      },
      ,
      {
        text: "E-mail",
        value: "email",
      },
      { text: "Ações", value: "acoes", sortable: false },
    ],
    isDialogOpen: false,
    isDisable: true,
    clientes: [],
    clienteCorrente: {
      id: "",
      nome: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
      },
      dataNacimento: "",
      cpf: "",
      telefone: "",
      sexo: "",
      email: "",
      ativo: null,
    },
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.clientes = [
        {
          id: 0,
          nome: "Jão da Silva",
          endereco: {
            rua: "livino",
            numero: 11,
            bairro: "Nova Lima",
          },
          dataNacimento: "11/09/1985",
          cpf: "123456789",
          telefone: 9999999,
          sexo: "M",
          email: "testeEmail@teste.com",
          ativo: false,
        },
        {
          id: 1,
          nome: "Maria da Silva",
          endereco: {
            rua: "Afonso Pena",
            numero: 4,
            bairro: "Centro",
          },
          dataNacimento: "11/09/1980",
          cpf: "11122266685",
          telefone: 679955887744,
          sexo: "F",
          email: "emailFulano@teste.com",
          ativo: true,
        },
        {
          id: 2,
          nome: "Fulano da Silva",
          endereco: {
            rua: "esquina",
            numero: 11,
            bairro: "bairro livre",
          },
          dataNacimento: "11/09/1998",
          cpf: "2255887744",
          telefone: 9963258741,
          sexo: "F",
          email: "teste@teste.com",
          ativo: true,
        },
      ];
    },

    abrirDIalog(cliente) {
      this.clienteCorrente = Object.assign({}, cliente);
      this.isDialogOpen = true;
    },
    testeEdit() {
      this.isDisable = false;
    },
    ativarInativar(cliente) {
      let achou = false;
      let contador = 0;
      while (contador <= this.clientes.length && achou == false) {
        if (this.clientes[contador].id == cliente.id) {
          this.clientes[contador].ativo = !this.clientes[contador].ativo;
          achou = true;
        }
        contador++;
      }
    },
  },
};
</script>