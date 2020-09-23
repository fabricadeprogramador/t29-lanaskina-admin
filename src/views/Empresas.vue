<template>
  <div>
    <!-- inicio dialog nova empresa -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="isDialogOpen" max-width="600px">
          <!-- <v-dialog v-model="isDialogOpen" persistent max-width="600px"> -->
          <v-card>
            <v-card-title>
              <span class="headline">Nova Empresa</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nome da Empresa*" required v-model="novaEmpresa.nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="CNPJ" hint="CNPJ da empresa" v-model="novaEmpresa.cnpj"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Email" hint="Email da empresa" v-model="novaEmpresa.email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Tel"
                      hint="Número Telefônico da Empresa"
                      v-model="novaEmpresa.tel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Rua" hint="Logradouro" v-model="novaEmpresa.endereco.rua"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Número"
                      hint="Número da Sede"
                      v-model="novaEmpresa.endereco.numero"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Bairro"
                      hint="Bairro onde se encontra a empresa"
                      v-model="novaEmpresa.endereco.bairro"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Campo Obrigatórios</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="limparEFecharEmpresaNova">Fechar</v-btn>
              <v-btn color="blue darken-1" text @click="salvarNovaEmpresa">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- final dialog nova empresa -->

    <v-row justify="center">
      <v-col sm="9">
        <v-slide-y-transition leave-absolute>
          <v-alert class="mt-3" type="warning" v-if="validacao != ''">{{validacao}}</v-alert>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <v-row class="mb-10">
      <v-col cols="4" sm="3" class="ma-0 ml-4 pa-0">
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
      <v-col cols="3" sm="3" class="ma-0 ml-4 pa-0">
        <v-btn color="green" @click="buscarTransacaoDaEmpresa">Buscar</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3" sm="3" class="ma-0 pa-0">
        <v-btn color="primary" @click="openDialog()">Nova Empresa</v-btn>
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

    isDialogOpen: false,
    novaEmpresa: {
      id: "",
      nome: "",
      cnpj: "",
      email: "",
      status: true,
      tel: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
      },
    },
    empresas: [],
    geradorId: 6,
  }),
  created() {
    this.initTransacoesDasEmpresas();
  },

  methods: {
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

    openDialog(empresa) {
      this.isDialogOpen = !this.isDialogOpen;
    },

    limparEFecharEmpresaNova() {
      this.novaEmpresa.id = "";
      this.novaEmpresa.nome = "";
      this.novaEmpresa.cnpj = "";
      this.novaEmpresa.email = "";
      this.novaEmpresa.tel = "";
      this.novaEmpresa.endereco.rua = "";
      this.novaEmpresa.endereco.numero = "";
      this.novaEmpresa.endereco.bairro = "";
      this.isDialogOpen = false;
    },

    initTransacoesDasEmpresas() {
      this.empresas = [
        {
          id: 0,
          nome: "Petisco de Gato",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
          endereco: {
            rua: "Esquina do gato",
            numero: 15,
            bairro: "Gato Preto",
          },
        },

        {
          id: 1,
          nome: "Espetinho João",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
          endereco: {
            rua: "Esquina do gato",
            numero: 15,
            bairro: "Gato Preto",
          },
        },

        {
          id: 2,
          nome: "Masseria Fradelli",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
          endereco: {
            rua: "Esquina do gato",
            numero: 15,
            bairro: "Gato Preto",
          },
        },

        {
          id: 3,
          nome: "Feijoca do Zé",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
          endereco: {
            rua: "Esquina do gato",
            numero: 15,
            bairro: "Gato Preto",
          },
        },

        {
          id: 4,
          nome: "Tapiocaria Plinio",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
          endereco: {
            rua: "Esquina do gato",
            numero: 15,
            bairro: "Gato Preto",
          },
        },

        {
          id: 5,
          nome: "Bar do Almeida",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
          endereco: {
            rua: "Esquina do gato",
            numero: 15,
            bairro: "Gato Preto",
          },
        },
      ];

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
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
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
          nome: "Espetinho João",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
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
          id: 2,
          nome: "Masseria Fradelli",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
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
          id: 3,
          nome: "Feijoca do Zé",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
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
          empresa:{
          id: 4,
          nome: "Tapiocaria Plinio",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
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
          id: 5,
          nome: "Bar do Almeida",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: true,
          tel: "67981234567",
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

    salvarNovaEmpresa() {
      this.novaEmpresa.id = this.geradorId;
      this.geradorId++;
      var empresaSalvando = Object.assign({}, this.novaEmpresa);
      this.empresas.push(empresaSalvando);
      console.log(this.empresas);
    },

    // limparBusca() {
    //   if(this.selectEmpresa != this.transacoesPorEmpresa.nome){
    //     this.transacoesPorEmpresa = [];
    //   }
    // },

  },
};
</script>

<style>
</style>