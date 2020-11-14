<template>
  
  <div>
   
    <v-toolbar flat color="white" >
      <v-toolbar-title>Relatórios</v-toolbar-title>
    </v-toolbar>  

     <!-- inicio msg de validação Select -->    
      <v-row justify="center">
      <v-col sm="9">
        <v-slide-y-transition leave-absolute>
          <v-alert class="mt-3" type="warning" v-if="validacao != ''">{{
            validacao
          }}</v-alert>
        </v-slide-y-transition>
      </v-col>
    </v-row>    
    <!-- Fim msg de validação Select-->  
    
    <v-form>
      <v-container fluid>
        <v-card>
          <v-card>
            <v-card-title class="headline "
              >Informações por Empresa
            </v-card-title>
            <v-card-text>
              <v-row no-gutters justify="space-between">
                <v-col class="d-flex mt-3" cols="12" sm="5">
                  <v-select
                    :items="empresa"
                    item-text="nome"
                    item-value="nome"
                    label="Empresa"
                    v-model="selectEmpresa"
                    solo
                  ></v-select>
                  <v-btn class="mx-3" large color="green" @click="buscarEmpresa"
                    >Buscar</v-btn
                  >
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Total Transação "
                        value="empresa.totalTransacoes"
                        item-text="empresa.totalTransacoes"
                        hint="Quantidade de transações da empresa no APP"
                        v-model="totalTransacoes"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Total movimentado (R$)"
                        value="empresa.totalLanaskina"
                        item-text="empresa.totalLaskina"
                        hint="Total em reais movimentado no APP"
                        v-model="totalLanaskina"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Comissão Lanaskina (R$)"
                        value="empresa.comissao"
                        hint="Comissão por vendas para o APP"
                        v-model="comissao"
                        outlined
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <hr />
          <v-card>
            <v-card-title class="headline ">Informações do Mês</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="3">
                  <v-text-field
                    label="Novos Clientes"
                    value="67"
                    hint="Quantidade clientes cadastrados no mês"
                    v-model="clientesUltimoMes"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    label="Novas Empresas"
                    value="5"
                    hint="Quantidade empresas cadastradas no mês"
                    v-model="EmpresasUltimoMes"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    label="Movimentação do mês (R$)"
                    value="R$2.356,80"
                    hint="Total pedidos no ultimo mês"
                    v-model="gastosMes"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    label="Receita do mês"
                    value="R$2.356,80"
                    hint="Receita gerada pelas empresas no mês"
                    v-model="receitaMes"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <hr />
          <v-card>
            <v-card-title class="headline ">Totalizadores </v-card-title>
            <v-card-text>
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
                    label="Total Movimentação "
                    value="R$10.000,00"
                    hint="Receita total até o mês"
                    v-model="receitaAnual"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    label="Total Receita  "
                    value="R$10.000,00"
                    hint="Receita total até o mês"
                    v-model="receitaAnual"
                    outlined
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
    clientesUltimoMes: ""
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
          clientesNovosUltimoMes: 5
        },

        {
          id: 1,
          nome: "Espetinho João",
          totalTransacoes: 9000,
          totalLanaskina: 210,
          comissao: 120,
          clientes: 19,
          clientesNovosUltimoMes: 2
        },

        {
          id: 2,
          nome: "Masseria Fradelli",
          totalTransacoes: 5000,
          totalLanaskina: 210,
          comissao: 320,
          clientes: 19,
          clientesNovosUltimoMes: 2
        },

        {
          id: 3,
          nome: "Feijoca do Zé",
          totalTransacoes: 7000,
          totalLanaskina: 210,
          comissao: 420,
          clientes: 19,
          clientesNovosUltimoMes: 2
        },

        {
          id: 4,
          nome: "Tapiocaria Plinio",
          totalTransacoes: 12000,
          totalLanaskina: 210,
          comissao: 120,
          clientes: 19,
          clientesNovosUltimoMes: 2
        },

        {
          id: 5,
          nome: "Bar do Almeida",
          totalTransacoes: 22000,
          totalLanaskina: 210,
          comissao: 220,
          clientes: 19,
          clientesNovosUltimoMes: 2
        }
      ];

      this.totalEmpresas = this.empresa.length;
      this.EmpresasUltimoMes = 3;

      for (let i = 0; i < this.empresa.length; i++) {
        this.receitaAnual = parseFloat(
          this.receitaAnual +
            this.empresa[i].totalLanaskina +
            this.empresa[i].comissao
        );
        this.receitaMes = parseFloat(
          this.receitaMes +
            this.empresa[i].totalLanaskina +
            this.empresa[i].comissao
        );
        this.gastosMes = parseFloat(
          this.gastosMes + this.empresa[i].totalTransacoes
        );
        this.totalClientes = parseFloat(
          this.totalClientes + this.empresa[i].clientes
        );
        this.clientesUltimoMes = parseFloat(
          this.clientesUltimoMes + this.empresa[i].clientesNovosUltimoMes
        );
      }
    },
    buscarEmpresa() {
      if (this.selectEmpresa == "") {         
       return  this.validacao = "Selecione uma empresa";
      }
      this.validacao = "";
    }
  }
};
</script>

<style>
</style>