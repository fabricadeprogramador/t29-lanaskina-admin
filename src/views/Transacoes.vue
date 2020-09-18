<template>
    <transacoes :movimentacao_empresa="todasEmpresas"></transacoes>
</template>

<script>
import transacoes from "../components/Transações";

export default {
  components: {
    transacoes,
  }, 
  data: () => {
      todasEmpresas: []
  },
  created() {
    this.initialize();
  },
  methods:{
      initialize(){
          this.todasEmpresas = [
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
            id: 1,
            nome: "Espetinho Gordo",
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
            id: 2,
            nome: "Gato Assado",
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
          id: 4,
          ativo: true,
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
            id: 3,
            nome: "Espetinho de Gato",
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
          id: 5,
          ativo: false,
          cliente: {
            id: 5,
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
            id: 4,
            nome: "João do Espeto",
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
      }
  }
};
</script>

<style>
</style>