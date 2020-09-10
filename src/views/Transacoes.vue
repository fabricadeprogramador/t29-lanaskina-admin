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
        <span style="color:green;">R$ {{item.valor.toFixed(2)}}</span>
      </template>

      <template v-slot:item.acoes="{ item }">
        <v-icon small class="mr-2" @click="abrirDIalog(item)" color="primary">mdi-file-find</v-icon>
        <v-icon small @click="ativarInativar(item)" v-if="item.ativo" color="green">mdi-check-bold</v-icon>
        <v-icon small @click="ativarInativar(item)" v-else color="red">mdi-cancel</v-icon>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status =='Concluido' " color="primary">{{item.status}}</v-chip>
        <v-chip v-else-if="item.status =='Aberto' " color="yellow">{{item.status}}</v-chip>
        <v-chip v-else color="red">{{item.status}}</v-chip>
      </template>

      <template v-slot:footer>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-toolbar-title>Valor Total: {{testeSoma()}}</v-toolbar-title>
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
      },
    ],

    transacoes: [],

    clientes: [],
    ativo: null,
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
            nome: "Jão da Silva",
            username: "jao01",
            senha: "123",
            role: "ADMIN",
            ativo: true,
          },
          dataTransacoes: "11/01/2020",
          valor: 100.0324,
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
              nome: "Espetinho Completo",
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
          dataTransacoes: "11/01/2020",
          valor: 100.9536,
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
          id: 3,
          ativo: true,
          cliente: {
            id: 3,
            nome: "Jão da Silva",
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
              nome: "Espetinho Completo",
            },
          ],
          status: "Concluido",
        },

        {
          id: 4,
          ativo: false,
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

    abrirDIalog(cliente) {
      this.clienteCorrente = Object.assign({}, cliente);
      this.isDialogOpen = true;
    },

    testeSoma() {
      if (this.transacoes.length <= 0) {
        return 0;
      }
      return this.transacoes.reduce( (contador, elemento)=> contador+elemento.valor, 0).toFixed(2);
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
        dataNacimento: "",
        cpf: "",
        telefone: "",
        sexo: "",
        email: "",
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