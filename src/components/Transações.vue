<template>
  <div>
    <v-data-table
      :headers="cabecalhoTransacoes"
      :items="transacoes"
      sort-by="dataTransacoes"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Transações</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.valor="{ item }">
        <span style="color:green;" v-if="item.status== 'Concluido'">R$ {{item.valor.toFixed(2)}}</span>
        <span style="color:blue;" v-else-if="item.status== 'Aberto'">R$ {{item.valor.toFixed(2)}}</span>
        <span style="color:red;" v-else>
          R$
          <strike>{{item.valor.toFixed(2)}}</strike>
        </span>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status =='Concluido' " color="green" text-color="white">{{item.status}}</v-chip>
        <v-chip v-else-if="item.status =='Aberto' " color="blue" text-color="white">{{item.status}}</v-chip>
        <v-chip v-else color="red" text-color="white">{{item.status}}</v-chip>
      </template>
      <!-- Início abertura/fechamento Dialog e ativar/inativar clientes -->
      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" color="primary" @click="abrirDialog(item)">mdi-file-find</v-icon>
        <v-row justify="center">
          <v-dialog v-model="isDialogOpen" width="600px">
            <v-card>
              <v-card-title class="headline">Informações de Transação</v-card-title>
              <v-card-text elevation="5">
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-card elevation="3" class="pa-3">
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-card class="px-5" flat>
                            Cliente:
                            <v-row style="height: 60px;">
                              <v-col cols="12" sm="2">
                                <v-text-field
                                  v-model="transacaoCorrente.cliente.id"
                                  label="ID"
                                  outlined
                                  :disabled="isDisable"
                                  dense
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="7">
                                <v-text-field
                                  v-model="transacaoCorrente.cliente.nome"
                                  label="NOME:"
                                  outlined
                                  :disabled="isDisable"
                                  dense
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm>
                                <v-text-field
                                  v-model="transacaoCorrente.cliente.ativo?'Ativo':'Inativo'"
                                  label="STATUS:"
                                  outlined
                                  :disabled="isDisable"
                                  dense
                                ></v-text-field>
                              </v-col>
                            </v-row>Empresa:
                            <v-row>
                              <v-col cols="12" sm="2">
                                <v-text-field
                                  v-model="transacaoCorrente.empresa.id"
                                  label="ID"
                                  outlined
                                  :disabled="isDisable"
                                  dense
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="7">
                                <v-text-field
                                  v-model="transacaoCorrente.empresa.nome"
                                  label="Nome Empresa"
                                  outlined
                                  :disabled="isDisable"
                                  dense
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="3">
                                <v-text-field
                                  v-model="transacaoCorrente.empresa.endereco.bairro"
                                  label="Bairro"
                                  outlined
                                  :disabled="isDisable"
                                  dense
                                ></v-text-field>
                              </v-col>
                            </v-row>Histórico:
                            <v-row style="height: 60px;">
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
                                  v-model="transacaoCorrente.valor.toFixed(2)"
                                  label="Valor Compra"
                                  prefix="R$"
                                  outlined
                                  :disabled="isDisable"
                                  dense
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-list>
                              <v-list-item-title color="red">Lista de produtos:</v-list-item-title>
                              <v-list-item-content>
                                <v-list-item-title
                                  v-for="(produto, index) in transacaoCorrente.produtos"
                                  :key="index"
                                >
                                  <v-chip outlined text-color="blue">
                                    {{index+1}}-Produto:
                                    <v-chip label color="white">{{produto.nome}}</v-chip>- Sub-Total:
                                    <v-chip label color="white">R$ {{produto.valor.toFixed(2)}}</v-chip>
                                  </v-chip>
                                </v-list-item-title>

                                <v-list-item-subtitle v-text="item.sub"></v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list>
                          </v-card>
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
          <v-toolbar-title>
            <v-chip outlined color="green" class="ma-5">
              Valor Total:
              <v-chip color="white" x-large>R$ {{testeSoma().toFixed(2)}}</v-chip>
            </v-chip>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
              <v-card-text color="black">Nenhuma transação realizada</v-card-text>
       </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    movimentacao_empresa: {
      type: Array,
    },
    isViewsTransacoes: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    cabecalhoTransacoes: [
      {
        text: "Cliente",
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
      },
      idTransacoes: "",
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
     // console.log(this.isViewsTransacoes);
      if (this.isViewsTransacoes) {
        this.cabecalhoTransacoes.splice(1, 0, {
          text: "Empresa",
          value: "empresa.nome",
        });
      }

      this.transacoes = this.movimentacao_empresa;
    },

    abrirDialog(transacoes) {
      console.log(transacoes);
      this.transacaoCorrente = Object.assign({}, transacoes);
      this.isDialogOpen = true;
    },

    testeSoma() {
      if (this.transacoes.length <= 0) {
        return 0;
      }
      // return this.transacoes.reduce( (contador, elemento)=> contador+elemento.valor, 0).toFixed(2);

      let soma = 0;
      for (let i = 0; i < this.transacoes.length; i++) {
        if (this.transacoes[i].status != "Cancelado") {
          soma += this.transacoes[i].valor;
        }
      }

      return soma;
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
          bairro: "",
        },
        idTransacoes: "",
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

    ativarInativar(cliente) {
      let achou = false;
      let i = 0;
      while (i < this.transacoes.length && achou == false) {
        if (this.transacoes[i].id == cliente.id) {
          this.transacoes[i].ativo = !this.transacoes[i].ativo;
          achou = true;
        }
        i++;
      }
    },
  },
};
</script>

<style>
</style>