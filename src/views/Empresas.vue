<template>
  <div>
    <v-row justify="center">
      <v-col sm="9">
        <v-slide-y-transition leave-absolute>
          <v-alert class="mt-3" type="warning" v-if="validacao != ''">{{validacao}}</v-alert>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <v-row fluid>
      <v-col cols="8" sm="3" class="ma-3">
        <v-select
          :items="transacoesGeral"
          label="Empresas"
          outlined
          item-text="empresa.nome"
          item-value="empresa.nome"
          v-model="selectEmpresa"
          dense
        ></v-select>
      </v-col>      
      <v-col cols="6" sm="3" class="ma-3 mt-3">
        <v-btn color="green" @click="buscarTransacaoDaEmpresa">Buscar</v-btn>
      </v-col>
    </v-row>
    <transacoes :movimentacao_empresa="transacoesPorEmpresa" :isViewsTransacoes="false"></transacoes>
  </div>
</template>

<script>
import transacoes from "../components/Transações";

export default {
  components: {
    transacoes,
  },
  data: () => ({
    transacoesGeral: [],
    selectEmpresa: "",
    validacao: "",
    transacoesPorEmpresa: [],
  }),
  created() {
    this.initTransacoesDasEmpresas();
  },
  methods: {
    initTransacoesDasEmpresas() {
      this.transacoesGeral = [
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
          valor: 48.5,
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
              id: 0,
              nome: "Espetinho Simples",
              valor: 8.0,
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 10.5,
            },
            {
              id: 1,
              nome: "Espetinho com Completo",
              valor: 30.0,
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
              id: 0,
              nome: "Espetinho Completo",
              valor: 50.0324,
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 50.3,
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
          valor: 22.5,
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
              id: 0,
              nome: "Espetinho simples",
              valor: 12.0,
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 10.5,
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
              id: 0,
              nome: "Espetinho Completo",
              valor: 60.0,
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 40.0,
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
          valor: 48.5,
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
              id: 0,
              nome: "Espetinho Completo",
              valor: 48.5,
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
              id: 0,
              nome: "Espetinho Completo",
              valor: 75.5,
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 24.5,
            },
          ],
          status: "Aberto",
        },
      ];
    },
    buscarTransacaoDaEmpresa() {
      //alert(this.empresaSelecionada)
      if (this.selectEmpresa == "") {
        this.validacao = "Selecione uma empresa";
        return;
      }
      this.validacao = "";

      this.transacoesPorEmpresa.splice(0, this.transacoesPorEmpresa.length);

      for (let i = 0; i < this.transacoesGeral.length; i++) {
        if (this.transacoesGeral[i].empresa.nome == this.selectEmpresa) {
          this.transacoesPorEmpresa.push(this.transacoesGeral[i]);
        }
      }
    },
  },
};
</script>

<style>
</style>