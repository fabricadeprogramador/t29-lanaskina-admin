<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Relatórios</v-toolbar-title>
    </v-toolbar>

    <!-- inicio msg de validação Select -->
    <v-row justify="center">
      <v-col sm="9" class="py-0">
        <v-slide-y-transition leave-absolute>
          <v-alert class="mt-3" type="warning" v-if="validacao != ''">{{
            validacao
          }}</v-alert>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <!-- Fim msg de validação Select-->
    
    <!-- mensagem informativa  -->
    <v-dialog v-model="isInfo" max-width="400">
      <v-row class="mx-0 ">
        <v-col cols="12">
          <v-alert
             dense         
            type="warning"
            class="mx-0 my-0"
          >
            <strong>{{ msgInformativa }}</strong>
          </v-alert>
        </v-col>
      </v-row>
    </v-dialog>
    <!--Fim mensagem informativa  -->

    <v-container class="mx-0 pt-0">
      <v-card>
        <v-card-title class="headline ">Informações por Empresa </v-card-title>
        <v-card-text>
          <v-row no-gutters justify="space-between">
            <v-col class="d-flex mt-3" cols="12" sm="5">
              <v-select
                :items="nomesEmpresas"
                item-text="nome"
                item-value="_id"
                label="Empresa"
                v-model="selectEmpresa"
                solo
              ></v-select>
              
              <v-btn class="mx-3" large color="green" @click="buscarEmpresa"
                >Buscar</v-btn
              >
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-row >
                <v-col>
                  <v-text-field
                    label="Total Transação "
                    item-text="empresa.totalTransacoes"
                    hint="Quantidade de transações da empresa no APP"
                    v-model="totalizadoresPorEmpresa.totalTransacoes"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Total movimentado (R$)"
                    item-text="empresa.totalLaskina"
                    hint="Total em reais movimentado no APP"
                    v-model="'R$ '+totalizadoresPorEmpresa.movimentacao.toFixed(2)"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Comissão Lanaskina (R$)"
                    hint="Comissão por vendas para o APP"
                    v-model="'R$ ' + totalizadoresPorEmpresa.receita.toFixed(2)"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>              
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title class="headline ">Informações do Mês</v-card-title>
            <v-card-text>
              <v-row no-gutters justify="space-between">
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Novos Clientes"
                    hint="Quantidade clientes cadastrados no mês"
                    v-model="totalizadores.totalMes.clientes"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-text-field
                    label="Movimentação do mês (R$)"
                    hint="Total pedidos no ultimo mês"
                    v-model="
                      'R$ ' + totalizadores.totalMes.movimentacao.toFixed(2)
                    "
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Novas Empresas"
                    hint="Quantidade empresas cadastradas no mês"
                    v-model="totalizadores.totalMes.empresas"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-text-field
                    label="Receita do mês"
                    hint="Receita gerada pelas empresas no mês"
                    v-model="'R$ ' + totalizadores.totalMes.receita.toFixed(2)"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title class="headline ">Totalizadores </v-card-title>
            <v-card-text>
              <v-row no-gutters justify="space-between">
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Total Clientes"
                    hint="Quantidade total clientes cadastrados."
                    v-model="totalizadores.totalAtual.clientes"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-text-field
                    label="Total Movimentação "
                    hint="Receita total até o mês"
                    v-model="
                      'R$ ' + totalizadores.totalAtual.movimentacao.toFixed(2)
                    "
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Total Empresas"
                    hint="Quantidade total de empresas cadastradas"
                    v-model="totalizadores.totalAtual.empresas"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-text-field
                    label="Total Receita  "
                    hint="Receita total até o mês"
                    v-model="
                      'R$ ' + totalizadores.totalAtual.receita.toFixed(2)
                    "
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EmpresaHttp from "@/http/EmpresaHttp";

export default {
  data: () => ({
    totalizadores: {
      totalAtual: {},
      totalMes: {}
    },
    totalizadoresPorEmpresa: {
      totalTransacoes:0,
      receita:0,
      movimentacao:0
    },
    isInfo:false,
    msgInformativa:'',
    nomesEmpresas: [],
    validacao: "",
    selectEmpresa: ""
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let respostaNomes = await EmpresaHttp.buscarTodosNomes();
      if (respostaNomes.status === 200) {
        this.nomesEmpresas = respostaNomes.data;
      }

      let respostaTotalizadores = await EmpresaHttp.buscarTotalizadores();

      if (respostaTotalizadores.status === 200) {
        this.totalizadores = respostaTotalizadores.data;
      }
    },
    formatValor(valor){
      return `R$ ${valor}`
    },
    async buscarEmpresa() {
      if (this.selectEmpresa == "") {
        return (this.validacao = "Selecione uma empresa");
      }
      this.validacao = "";

      let resposta = await EmpresaHttp.buscarTotalizadoresPorEmpresa(this.selectEmpresa);

      if (resposta.status === 200) {
        this.totalizadoresPorEmpresa = resposta.data;

        if(this.totalizadoresPorEmpresa.totalTransacoes == 0){
             this.isInfo=true
             this.msgInformativa='Não existe transações nessa empresa'

             setTimeout(()=>{
                this.isInfo=false
                this.msgInformativa=''
             },2300)
        }
      }
    }
  }
};
</script>

<style>
</style>