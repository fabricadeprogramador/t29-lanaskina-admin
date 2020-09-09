<template>
  <div>
    <v-data-table
      :headers="cabecalhoTransacoes"
      :items="transacoes"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Transações</v-toolbar-title>
        </v-toolbar>
      </template>
      <!-- Início abertura/fechamento Dialog e ativar/inativar clientes -->
      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" color="primary" @click="abrirDialog(item)"
          >mdi-file-find</v-icon
        >
        <v-icon small color="green" @click="">mdi-check-bold</v-icon>
        <v-row justify="center">
          <v-dialog v-model="isDialogOpen" width="600px">
            <v-card>
              <v-card-title class="headline"
                >Informações de Transação</v-card-title
              >
              <v-card-text elevation="5">
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-card elevation="3" class="pa-3">
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            v-model="transacaoCorrente.cliente.id"
                            label="ID:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="transacaoCorrente.cliente.nome"
                            label="NOME:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="transacaoCorrente.cliente.username"
                            label="USERNAME:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="transacaoCorrente.empresa.endereco.rua"
                            label="RUA/AV:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            v-model="transacaoCorrente.empresa.endereco.numero"
                            label="nº:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="transacaoCorrente.empresa.endereco.bairro"
                            label="nº:"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="transacaoCorrente.dataTransacoes"
                            label="Data Compra"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="transacaoCorrente.valor"
                            label="Valor Compra"
                            prefix="R$"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            v-model="transacaoCorrente.empresa.id"
                            label="ID Empresa"
                            outlined
                            :disabled="isDisable"
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            v-model="transacaoCorrente.empresa.nome"
                            label="Nome Empresa"
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
            </v-card>
          </v-dialog>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-toolbar-title>Valor Total:</v-toolbar-title>
        </v-toolbar>
      </template>
      <!-- Fim abertura/fechamento Dialog e ativar/inativar clientes -->
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    cabecalhoTransacoes: [
      {
        text: "Nome",
        value: "cliente.nome",
      },
      {
        text: "Data",
        value: "dataTransacoes",
      },
      {
        text: "Valor",
        value: "valor",
      },
      {
        text: "Status",
        value: "status",
      },
      {
        text: "Ações",
        value: "acoes",
        sortable: false,
      },
    ],
    isDialogOpen: false,
    isDisable: true,
    transacoes: [],
    transacaoCorrente: {
      cliente: {
        id: "",
        nome: "",
        username: "",
        // endereco: {
        //   rua: "",
        //   numero: "",
        //   bairro: "",
        // },
      },
      dataTransacoes: "",
      valor: 0,
      empresa: {
        id: "",
        nome: "",
        endereco: {
          rua: "",
          numero: "",
          bairro: "",
        },
      },
      ativo: null,
    },
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.transacoes = [
        {
          cliente: {
            id: 0,
            nome: "Jão da Silva",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          dataTransacoes: "11/01/2020",
          valor: 100,
          empresa: {
            id: 0,
            nome: "Petisco de Gato",
            endereco: {
              rua: "Esquina do gato",
              numero: 15,
              bairro: "Gato Preto",
            },
          },
          produtos: [
            {
              nome: "Espetinho Completo",
            },
          ],
          status: "Concluido",
        },
        {
          cliente: {
            id: 1,
            nome: "Maria da Silva",
            username: "mariaa",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          dataTransacoes: "11/01/2020",
          valor: 100,
          empresa: {
            id: 0,
            nome: "Petisco de Gato",
            endereco: {
              rua: "Esquina do gato",
              numero: 15,
              bairro: "Gato Preto",
            },
          },
          produtos: [
            {
              nome: "Espetinho Completo",
            },
          ],
          status: "Aberto",
        },
        {
          cliente: {
            id: 2,
            nome: "Jão da Silva",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          dataTransacoes: "11/01/2020",
          valor: 100,
          empresa: {
            id: 0,
            nome: "Petisco de Gato",
            endereco: {
              rua: "Esquina do gato",
              numero: 15,
              bairro: "Gato Preto",
            },
          },
          produtos: [
            {
              nome: "Espetinho Completo",
            },
          ],
          status: "Cancelado",
        },
        {
          cliente: {
            id: 3,
            nome: "Jão da Silva",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          dataTransacoes: "11/01/2020",
          valor: 100,
          empresa: {
            id: 0,
            nome: "Petisco de Gato",
            endereco: {
              rua: "Esquina do gato",
              numero: 15,
              bairro: "Gato Preto",
            },
          },
          produtos: [
            {
              nome: "Espetinho Completo",
            },
          ],
          status: "Concluido",
        },
        {
          cliente: {
            id: 4,
            nome: "Jão da Silva",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          dataTransacoes: "11/01/2020",
          valor: 100,
          empresa: {
            id: 0,
            nome: "Petisco de Gato",
            endereco: {
              rua: "Esquina do gato",
              numero: 15,
              bairro: "Gato Preto",
            },
          },
          produtos: [
            {
              nome: "Espetinho Completo",
            },
          ],
          status: "Aberto",
        },
      ];
    },

    abrirDialog(transacoes) {
      console.log(transacoes);
      this.transacaoCorrente = Object.assign({}, transacoes);
      this.transacaoCorrente.valor = transacoes.valor.toFixed(2);
      this.isDialogOpen = true;
    },
    fecharDialog() {
      this.isDialogOpen = false;
      this.isDisable = true;
      this.transacaoCorrente = {
        id: "",
        nome: "",
        username: "",
        endereco: {
          rua: "",
          numero: "",
          bairro: "",
        },
        dataTransacoes: "",
        valor: "",
        empresa: {
          id: "",
          nome: "",
          endereco: {
            rua: "",
            numero: "",
            bairro: "",
          },
        },
        ativo: null,
      };
    },
  },
};
</script>

<style>
</style>