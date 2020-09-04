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
        <v-toolbar-title>
          Transações
        </v-toolbar-title>
      </v-toolbar>
    </template>

     <template v-slot:item.acoes>
       <v-icon small class="mr-2" color="primary" @click="">mdi-file-find</v-icon>
       <v-icon small color="green" @click="">mdi-check-bold</v-icon>
    </template>

    <template v-slot:footer>
      <v-toolbar flat color="white">
       <v-spacer></v-spacer>
        <v-toolbar-title>
          Valor Total:
        </v-toolbar-title>
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
    transacoes: [
      {
        cliente: {
          id: 0,
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
        status:'Concluido'
      },
      {
        cliente: {
          id: 1,
          nome: "Maria da Silva",
          username: "mariaa",
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
        status:'Aberto'
      },
      {
        cliente: {
          id: 2,
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
        status:'Cancelado'
      },
      {
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
        status:'Concluido'
      },
      {
        cliente: {
          id: 4,
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
        status:'Aberto'
      },
    ],
  }),
};
</script>

<style>
</style>