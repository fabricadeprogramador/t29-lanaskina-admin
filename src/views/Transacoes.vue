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
        <span style="color:red;" v-else>R$ <strike>{{item.valor.toFixed(2)}}</strike> </span>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status =='Concluido' " color="green">{{item.status}}</v-chip>
        <v-chip v-else-if="item.status =='Aberto' " color="blue" text-color="white">{{item.status}}</v-chip>
        <v-chip v-else color="red" >{{item.status}}</v-chip>
      </template>
      <!-- Início abertura/fechamento Dialog e ativar/inativar clientes -->
      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" color="primary" @click="abrirDialog(item)">mdi-file-find</v-icon>
        <v-icon small color="green" @click>mdi-check-bold</v-icon>
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
                                  v-model="transacaoCorrente.idTransacoes"
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
                            </v-row>
                            Empresa:
                            <v-row >
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
                            </v-row>
                            Histórico:
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
                          ><v-chip outlined text-color="blue">{{index+1}}-Produto: <v-chip label color="white">{{produto.nome}}</v-chip>  - Sub-Total:<v-chip label color="white">R$ {{produto.valor.toFixed(2)}}</v-chip>  </v-chip></v-list-item-title>

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
          <v-toolbar-title>Valor Total: R$ {{testeSoma()}}</v-toolbar-title>
        </v-toolbar>
      </template>
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
      this.transacoes = [
        {
          id: 0,
          ativo: true,
          cliente: {
            id: 0,
            nome: "Carlos Francisco Chaves",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          idTransacoes: 0,
          dataTransacoes: "11/01/2020",
          valor: 48.50,
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
              id:0,
              nome: "Espetinho Simples",
              valor: 8.00
            },
            {
              id:1,
              nome: "Espetinho com mandioca",
              valor: 10.50
            },
            {
              id:1,
              nome: "Espetinho com Completo",
              valor: 30.00
            },
          ],
          status: "Concluido",
        },

        {
          id: 1,
          ativo: false,
          cliente: {
            id: 1,
            nome: "Maria da Silva",
            username: "mariaa",
            senha: "123",
            role: "ADMIN",
            ativo: true,
          },
          idTransacoes: 1,
          dataTransacoes: "11/01/2020",
          valor: 100.3456,
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
              id:0,
              nome: "Espetinho Completo",
              valor: 50.0324
            },
            {
              id:1,
              nome: "Espetinho com mandioca",
              valor: 50.30
            },
          ],
          status: "Aberto",
        },

        {
          id: 2,
          ativo: true,
          cliente: {
            id: 2,
            nome: "Jão da Silva",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: true,
          },
          idTransacoes: 2,
          dataTransacoes: "11/01/2020",
          valor: 22.50,
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
              id:0,
              nome: "Espetinho simples",
              valor: 12.00
            },
            {
              id:1,
              nome: "Espetinho com mandioca",
              valor: 10.50
            },
          ],
          status: "Cancelado",
        },

        {
          id: 3,
          ativo: true,
          cliente: {
            id: 3,
            nome: "Jão Pedro Souza",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: true,
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
              id:0,
              nome: "Espetinho Completo",
              valor: 60.00
            },
            {
              id:1,
              nome: "Espetinho com mandioca",
              valor: 40.00
            },
          ],
          status: "Concluido",
        },
        {
          cliente: {
            id: 4,
            nome: "Amarildo Duarte",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          idTransacoes: 3,
          dataTransacoes: "11/01/2020",
          valor: 48.50,
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
              id:0,
              nome: "Espetinho Completo",
              valor: 48.50              
            },          
          ],
          status: "Concluido",
        },

        {
          id: 4,
          ativo: false,
          cliente: {
            id: 4,
            nome: "Silvana da Costa",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: false,
          },
          idTransacoes: 4,
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
              id:0,
              nome: "Espetinho Completo",
              valor: 75.50
            },
            {
              id:1,
              nome: "Espetinho com mandioca",
              valor: 24.50
            },
          ],
          status: "Aberto",
        },
      ];
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