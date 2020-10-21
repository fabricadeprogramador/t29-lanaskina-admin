<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Relatórios</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form>
      <v-container fluid>
        <v-card>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Clientes"
                value="200"
                hint="Quantidade total clientes cadastrados."
                v-model="totalClientes"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Clientes último mês"
                value="67"
                hint="Quantidade clientes cadastrados últimos 30 dias."
                v-model="clientesUltimoMes"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Gastos Mês"
                value="R$2.356,80"
                hint="Total pedidos no ultimo mês"
                v-model="gastosMes"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Empresas"
                value="20"
                hint="Quantidade total de empresas cadastradas"
                v-model="totalEmpresas"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Empresas Ultimo Mês"
                value="5"
                hint="Quantidade empresas cadastradas últimos 30 dias"
                v-model="EmpresasUltimoMes"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Receita Mês"
                value="R$2.356,80"
                hint="Receita gerada pelas empresas no mês"
                v-model="receitaMes"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Receita Anual"
                value="R$10.000,00"
                hint="Receita total no útimo ano"
                v-model="receitaAnual"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="empresa"
                item-text="nome"
                item-value="nome"
                label="Empresa"
                v-model="selectEmpresa"
                dense
                solo
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn color="green" @click="buscarEmpresa">Buscar</v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col sm="9">
              <v-slide-y-transition leave-absolute>
                <v-alert class="mt-3" type="warning" v-if="validacao != ''">{{
                  validacao
                }}</v-alert>
              </v-slide-y-transition>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Transações"
                value="empresa.totalTransacoes"
                item-text="empresa.totalTransacoes"
                hint="Todas transações da empresa selecionada"
                v-model="totalTransacoes"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Lanaskina"
                value="empresa.totalLanaskina"
                item-text="empresa.totalLaskina"
                hint="Total mensalidade Lanaskina"
                v-model="totalLanaskina"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Comissão Lanaskina"
                value="empresa.comissao"
                hint="Comissão vendas Lanaskina"
                v-model="comissao"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    empresa: [],
    validacao: "",
    selectEmpresa: "",
    totalTransacoes: "",
    totalLanaskina: "",
    comissao: "",
    receitaAnual: "",
    receitaMes: "",
    gastosMes: "",
    EmpresasUltimoMes: "",
    totalEmpresas: "",
    totalClientes: "",
    clientesUltimoMes: "",
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.empresa = [
        {
          id: 0,
          nome: "Petisco de Gato",
          totalTransacoes: 4000,
          totalLanaskina: 210,
          comissao: 220,
          clientes: 43,
          clientesNovosUltimoMes: 5,
        },

        {
          id: 1,
          nome: "Espetinho João",
          totalTransacoes: 9000,
          totalLanaskina: 210,
          comissao: 120,
          clientes: 19,
          clientesNovosUltimoMes: 2,
        },

        {
          id: 2,
          nome: "Masseria Fradelli",
          totalTransacoes: 5000,
          totalLanaskina: 210,
          comissao: 320,
          clientes: 19,
          clientesNovosUltimoMes: 2,
        },

        {
          id: 3,
          nome: "Feijoca do Zé",
          totalTransacoes: 7000,
          totalLanaskina: 210,
          comissao: 420,
          clientes: 19,
          clientesNovosUltimoMes: 2,
        },

        {
          id: 4,
          nome: "Tapiocaria Plinio",
          totalTransacoes: 12000,
          totalLanaskina: 210,
          comissao: 120,
          clientes: 19,
          clientesNovosUltimoMes: 2,
        },

        {
          id: 5,
          nome: "Bar do Almeida",
          totalTransacoes: 22000,
          totalLanaskina: 210,
          comissao: 220,
          clientes: 19,
          clientesNovosUltimoMes: 2,
        },
      ];

      this.totalEmpresas = this.empresa.length;
      this.EmpresasUltimoMes = 3;

      for (let i = 0; i < this.empresa.length; i++) {
        this.receitaAnual =  parseFloat( this.receitaAnual +
          this.empresa[i].totalLanaskina + this.empresa[i].comissao
        );
        this.receitaMes = parseFloat( this.receitaMes +
          this.empresa[i].totalLanaskina + this.empresa[i].comissao
        );
        this.gastosMes = parseFloat(this.gastosMes + this.empresa[i].totalTransacoes);
        this.totalClientes = parseFloat(this.totalClientes + this.empresa[i].clientes);
        this.clientesUltimoMes = parseFloat(this.clientesUltimoMes +
          this.empresa[i].clientesNovosUltimoMes
        );

        console.log(this.receitaAnual);
        console.log(this.receitaMes);
        console.log(this.gastosMes);
        console.log(this.totalClientes);
        console.log(this.clientesUltimoMes);
      }
    },
    buscarEmpresa() {
      if (this.selectEmpresa == "") {
        this.validacao = "Selecione uma empresa";
      }
      for (let i = 0; i < this.empresa.length; i++) {
        if (this.empresa[i].nome == this.selectEmpresa) {
          this.totalTransacoes = this.empresa[i].totalTransacoes;
          this.totalLanaskina = this.empresa[i].totalLanaskina;
          this.comissao = this.empresa[i].comissao;
        }
      }

      this.validacao = "";
    },
  },
};
</script>

<style>
</style>