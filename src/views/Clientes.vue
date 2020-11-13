<template>
  <div>

    <!-- mensagem informativa  -->
    <v-dialog v-model="isDialogSalvoComSucesso" max-width="400">
      <v-row class="mx-0 ">
        <v-col cols="12">
          <v-alert
             dense         
            type="success"
            class="mx-0 my-0"
          >
            <strong>{{ msgSalvoComSucesso }}</strong>
          </v-alert>
        </v-col>
      </v-row>
    </v-dialog>
    <!-- Listagem de clientes cadastrados -->
    <v-data-table
      :headers="cabecalhoCliente"
      :items="clientes"
      :search="search"
      sort-by="nome"
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
      <!-- Início abertura/fechamento Dialog e ativar/inativar clientes -->
      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" @click="abrirDIalog(item)" color="primary"
          >mdi-file-find</v-icon
        >
        <v-icon
          small
          @click="ativarInativar(item)"
          v-if="item.usuario.ativo"
          color="green"
          >mdi-check-bold</v-icon
        >
        <v-icon small @click="ativarInativar(item)" v-else color="red"
          >mdi-cancel</v-icon
        >

        <!-- inicio CARD DO DIALOG  -->
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
                <v-btn color="red" text @click="fecharDIalog">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- fim CARD DO DIALOG  -->
      </template>
      <!-- Fim abertura/fechamento Dialog e ativar/inativar clientes -->
      <template v-slot:no-data>
        <v-subheader>Nenhum cliente cadastro.</v-subheader>
      </template>
    </v-data-table>
  </div>
</template>
  
  
<script>
import ClienteHttp from "@/http/ClienteHttp";
import UsuarioHttp from "@/http/UsuarioHttp";

export default {
  data: () => ({
    search: "",
    cabecalhoCliente: [
      {
        text: "Nome",
        value: "nome"
      },
      {
        text: "CPF",
        value: "cpf"
      },
      ,
      {
        text: "E-mail",
        value: "email"
      },
      { text: "Ações", value: "acoes", sortable: false }
    ],
    isDialogSalvoComSucesso: false,
    msgSalvoComSucesso: "",
    isDialogOpen: false,
    isDisable: true,
    clientes: [],
    clienteCorrente: {
      id: "",
      nome: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: ""
      },
      dataNacimento: "",
      cpf: "",
      telefone: "",
      sexo: "",
      email: "",
      ativo: null
    }
  }),

  created() {
    this.buscarTodos();
  },

  methods: {
    async buscarTodos() {
      let resposta = await ClienteHttp.buscarTodos();

      if (resposta.status === 200) {
        this.clientes = resposta.data;
      }
    },

    abrirDIalog(cliente) {
      this.clienteCorrente = Object.assign({}, cliente);
      this.isDialogOpen = true;
    },
    fecharDIalog() {
      this.isDialogOpen = false;
      this.isDisable = true;
      this.clienteCorrente = {
        id: "",
        nome: "",
        endereco: {
          rua: "",
          numero: "",
          bairro: ""
        },
        dataNacimento: "",
        cpf: "",
        telefone: "",
        sexo: "",
        email: "",
        ativo: null
      };
    },
    // testeEdit() {
    //   this.isDisable = false;
    // },
    async ativarInativar(cliente) {
      //console.log(cliente)
      let resposta = await UsuarioHttp.ativarInativar(cliente.usuario._id);

      if (resposta.status === 200) {
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Cliente atualizado com sucesso!";
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