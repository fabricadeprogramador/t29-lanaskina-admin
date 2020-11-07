<template>
  <div>
    <!-- inicio dialog nova empresa -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="isDialogEmpresa" persistent max-width="600px">
          <!-- <v-dialog v-model="isDialogEmpresa" persistent max-width="600px"> -->

          <v-card>
            <v-row justify="center">
              <v-col sm="9">
                <v-slide-y-transition>
                  <v-alert
                    class="mt-3"
                    type="warning"
                    v-if="validacaoDialog != ''"
                    >{{ validacaoDialog }}</v-alert
                  >
                </v-slide-y-transition>
              </v-col>
            </v-row>
            <v-card-title>
              <span class="headline">{{
                edicao ? "Edição Empresa" : "Nova Empresa"
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Nome da Empresa*"
                      required
                      v-model="novaOuEdicaoEmpresa.nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="CNPJ"
                      hint="CNPJ da empresa"
                      v-model="novaOuEdicaoEmpresa.cnpj"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Email"
                      hint="Email da empresa"
                      v-model="novaOuEdicaoEmpresa.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Tel"
                      hint="Número Telefônico da Empresa"
                      v-model="novaOuEdicaoEmpresa.tel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Rua"
                      hint="Logradouro"
                      v-model="novaOuEdicaoEmpresa.endereco.rua"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Número"
                      hint="Número da Sede"
                      v-model="novaOuEdicaoEmpresa.endereco.numero"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Bairro"
                      hint="Bairro onde se encontra a empresa"
                      v-model="novaOuEdicaoEmpresa.endereco.bairro"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Campo Obrigatórios</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="limparEFecharEmpresaNova"
                >Cancelar</v-btn
              >
              <v-btn
                v-if="edicao"
                color="blue darken-1"
                text
                @click="atualizarEmpresa"
                >Atualizar</v-btn
              >
              <v-btn v-else color="blue darken-1" text @click="salvarEmpresa"
                >Salvar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- final dialog nova empresa -->

    <!-- Inicio mensagem de salvo com sucesso -->
    <template >
      <v-row  >
        <v-dialog v-model="isDialogSalvoComSucesso" max-width="400" >
          <v-row class="mx-0 ">
            <v-col cols="12"  >
              <v-alert dense type="success" class="mx-0 my-0">
                <strong>{{ msgSalvoComSucesso }}</strong>
              </v-alert>
            </v-col>
          </v-row>
        </v-dialog>
      </v-row>
    </template>
    <!-- Final mensagem de salvo com sucesso -->

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

    <!-- inicio select de empresa -->
    <v-row class="mb-2 ma-5">
      <v-col cols="4" sm="3" class="ma-0 ml-4 pa-0">
        <v-select
          :items="nomesEmpresas"
          label="Empresas"
          outlined
          item-text="nome"
          item-value="_id"
          v-model="selectIdEmpresa"
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" sm="3" class="ma-0 ml-4 pa-0">
        <v-btn color="green" @click="buscarDadosEmpresa">Buscar</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3" sm="3" class="ma-0 pa-0">
        <v-btn color="success" @click="isDialogEmpresa = !isDialogEmpresa"
          >Nova Empresa</v-btn
        >
      </v-col>
    </v-row>
    <!-- fim select empresa -->

    <!-- inicio Data-table da empresa -->
    <v-card class="pt-0 mt-0">
      <v-card-text>
        <v-card elevation="5">
          <v-card-title class="headline ">Dados da Empresa</v-card-title>
          <v-card-text class="text-center" v-if="empresa.nome == undefined">
            Nenhuma empresa selecionada
          </v-card-text>
          <v-row v-else>
            <v-col cols="12" sm="2">
              <v-card-text>
                <strong>Nome: </strong>
                {{ empresa.nome }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="3">
              <v-card-text>
                <strong>Cnpj: </strong>{{ empresa.cnpj }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="3">
              <v-card-text>
                <strong>Contato: </strong>
                {{ empresa.tel }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-card-text>
                <strong>Status: </strong
                >{{ empresa.status ? "Ativo" : "Inativo" }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn small color="warning" class="mt-2" @click="editarEmpresa()"
                >Editar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <hr />
        <v-card elevation="5">
          <v-row>
            <v-col cols="12" sm="10">
              <v-card-title class="headline"
                >Produtos Cadastrados:</v-card-title
              >
            </v-col>

            <v-col cols="12" sm="2" class="mt-2">
              <v-btn
                :Disabled="empresa.nome === undefined ? true : false"
                color="success"
                small
                class="mt-2"
                @click="isDialogProduto = !isDialogProduto"
                >Novo Produto</v-btn
              >
            </v-col>
          </v-row>

          <!-- Inicio Cadastro/Edição produtos -->
          <template>
            <v-row>
              <v-dialog v-model="isDialogProduto" max-width="600px" persistent>
                <v-card>
                  <v-row justify="center" class="mx-0 my-0 ">
                    <v-col sm="7">
                      <v-slide-y-transition leave-absolute>
                        <v-alert
                          class="mt-3"
                          type="warning"
                          v-if="validacaoDialog != ''"
                          >{{ validacaoDialog }}</v-alert
                        >
                      </v-slide-y-transition>
                    </v-col>
                  </v-row>
                  <v-card-title class="mb-0 pb-0">{{
                    edicao ? "Edição Produto" : "Novo Produto"
                  }}</v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="8">
                          <v-text-field
                            label="Nome"
                            hint="Nome do produto"
                            v-model="novoOuEdicaoProduto.nome"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            label="Valor"
                            type="number"
                            hint="Valor do produto (R$)"
                            v-model="novoOuEdicaoProduto.valor"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-textarea
                            v-model="novoOuEdicaoProduto.descricao"
                            label="Descrição do Produto"
                            hint="Informe os detalhes do produto"
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mt-5">
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="cancelarCadastroProduto"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          v-if="edicao"
                          @click="atualizarProduto"
                          >Atualizar</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          v-else
                          @click="salvarProduto()"
                          >Salvar</v-btn
                        >
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-row>
          </template>

          <v-data-table
            :headers="cabecalhoProduto"
            :items="empresa.produtos"
            sort-by="nome"
            class="elevation-1"
          >
            <template v-slot:item.acao="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editarProduto(item)"
                color="primary"
              >
                mdi-pencil</v-icon
              >
              <v-icon
                small
                @click="ativarInativarProduto(item)"
                v-if="item.status"
                color="green"
                >mdi-check-bold</v-icon
              >
              <v-icon
                small
                @click="ativarInativarProduto(item)"
                v-else
                color="red"
                >mdi-cancel</v-icon
              >
            </template>
            <template v-slot:item.valor="{ item }">
              <span> R$ {{ item.valor.toFixed(2) }} </span>
            </template>
            <template v-slot:no-data>
              <v-card-text color="black"
                >Nenhuma produto cadastrado</v-card-text
              >
            </template>
          </v-data-table>
        </v-card>
        <hr />
        <v-card elevation="5">
          <transacoes
            :movimentacao_empresa="transacoesPorEmpresa"
            :isViewsTransacoes="false"
          ></transacoes>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import transacoes from "../components/Transações";
import EmpresaHttp from "@/http/EmpresaHttp";
//import { config } from 'vue/types/umd';

export default {
  components: {
    transacoes
  },
  data: () => ({
    cabecalhoEmpresas: [
      {
        text: "Nome",
        value: "nome"
      },
      {
        text: "Contato",
        value: "tel"
      },
      {
        text: "Cnpj",
        value: "cnpj"
      },
      {
        text: "Ações",
        value: "acoes"
      }
    ],
    cabecalhoProduto: [
      {
        text: "Nome",
        value: "nome"
      },
      {
        text: "Descrição",
        value: "descricao"
      },
      {
        text: "Valor",
        value: "valor"
      },
      {
        text: "Ação",
        value: "acao"
      }
    ],
    empresa: {},
    selectIdEmpresa: "",
    validacao: "",
    validacaoDialog: "",
    msgSalvoComSucesso: "",
    transacoesPorEmpresa: [],
    isDialogEmpresa: false,
    isDialogProduto: false,
    isDialogSalvoComSucesso: false,
    edicao: false,
    novoOuEdicaoProduto: {},
    novaOuEdicaoEmpresa: {
      endereco: {},
      produto: []
    },
    nomesEmpresas: []
  }),
  created() {
    this.buscarNomesDasEmpresas();
  },

  methods: {
    async buscarNomesDasEmpresas() {
      let resposta = await EmpresaHttp.buscarTodosNomes();      
      if (resposta.status === 200) {
        this.nomesEmpresas = resposta.data;
      }
    },
    async buscarDadosEmpresa() {
     // console.log("chamou")
      if (this.selectIdEmpresa === "") {
        this.validacao = "Selecione uma empresa";
        return;
      }
      this.validacao = "";

      //Limpa o array, para quando trocar de empresa sem transações nao mostrar nada
      this.transacoesPorEmpresa.splice(0, this.transacoesPorEmpresa.length);
      let empresa = await EmpresaHttp.buscaPorId(this.selectIdEmpresa);
     
      if (empresa.status === 200) {
        this.empresa = empresa.data;
        if (empresa.data.transacoes.length > 0) {
          for (let i = 0; i < empresa.data.transacoes.length; i++) {
            this.transacoesPorEmpresa.push(empresa.data.transacoes[i]);
          }
        }
      }
    },
    async salvarEmpresa() {
      //  Validação de todos os campos antes de mandar para o back-end
      if (
        this.novaOuEdicaoEmpresa.nome === undefined || this.novaOuEdicaoEmpresa.nome === ""||
        this.novaOuEdicaoEmpresa.cnpj === undefined || this.novaOuEdicaoEmpresa.cnpj === ""||
        this.novaOuEdicaoEmpresa.email === undefined ||this.novaOuEdicaoEmpresa.email === ""||
        this.novaOuEdicaoEmpresa.tel === undefined ||this.novaOuEdicaoEmpresa.tel === ""||
        this.novaOuEdicaoEmpresa.endereco.rua === undefined ||this.novaOuEdicaoEmpresa.endereco.rua ===  ""||
        this.novaOuEdicaoEmpresa.endereco.numero === undefined ||this.novaOuEdicaoEmpresa.endereco.numero ===  ""||
        this.novaOuEdicaoEmpresa.endereco.bairro === undefined || this.novaOuEdicaoEmpresa.endereco.bairro ===  ""
      ) {
        this.validacaoDialog = "Preencher todos os campos *Obrigatório";
        return;
      }
      this.validacaoDialog = "";

      let resposta = await EmpresaHttp.adicionar(this.novaOuEdicaoEmpresa);
      if (resposta.status === 200) {
        this.buscarNomesDasEmpresas();
        
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Empresa criada com sucesso!";

        setTimeout(() => {
          this.limparEFecharEmpresaNova();
          this.msgSalvoComSucesso = "";
          this.isDialogSalvoComSucesso = false;
        }, 1500);
      }
    },

    editarEmpresa() {
      this.edicao = true;
      this.isDialogEmpresa = true;
      this.novaOuEdicaoEmpresa = JSON.parse(JSON.stringify(this.empresa));
    },
    async atualizarEmpresa() {

     //  Validação de todos os campos antes de mandar para o back-end
      if (
        this.novaOuEdicaoEmpresa.nome === undefined || this.novaOuEdicaoEmpresa.nome === ""||
        this.novaOuEdicaoEmpresa.cnpj === undefined || this.novaOuEdicaoEmpresa.cnpj === ""||
        this.novaOuEdicaoEmpresa.email === undefined ||this.novaOuEdicaoEmpresa.email === ""||
        this.novaOuEdicaoEmpresa.tel === undefined ||this.novaOuEdicaoEmpresa.tel === ""||
        this.novaOuEdicaoEmpresa.endereco.rua === undefined ||this.novaOuEdicaoEmpresa.endereco.rua ===  ""||
        this.novaOuEdicaoEmpresa.endereco.numero === undefined ||this.novaOuEdicaoEmpresa.endereco.numero ===  ""||
        this.novaOuEdicaoEmpresa.endereco.bairro === undefined || this.novaOuEdicaoEmpresa.endereco.bairro ===  ""
      ) {
        this.validacaoDialog = "Preencher todos os campos *Obrigatório";
        return;
      }
      this.validacaoDialog = "";

      let resposta = await EmpresaHttp.editar(
        this.selectIdEmpresa,
        this.novaOuEdicaoEmpresa
      );
      this.empresa = resposta.data;
      this.buscarNomesDasEmpresas();
      
      this.isDialogSalvoComSucesso = true;
      this.msgSalvoComSucesso = "Empresa atualizada com sucesso!";

      setTimeout(() => {
        this.limparEFecharEmpresaNova();
        this.msgSalvoComSucesso = "";
        this.isDialogSalvoComSucesso = false;
      }, 1500);
    },
    limparEFecharEmpresaNova() {
      this.novaOuEdicaoEmpresa = {
        endereco: {},
        produtos: []
      };
      this.isDialogEmpresa = false;
      this.edicao = false;
      this.validacaoDialog = "";
    },

    cancelarCadastroProduto() {
      this.edicao = false;
      this.novoOuEdicaoProduto = {};
      this.isDialogProduto = false;
      this.validacaoDialog = "";
    },
    async salvarProduto() {
      //validação dos campos antes de mandar para o back-end
      if (
        this.novoOuEdicaoProduto.nome == undefined ||this.novoOuEdicaoProduto.nome == ""||
        this.novoOuEdicaoProduto.valor == undefined ||this.novoOuEdicaoProduto.valor == ""||
        this.novoOuEdicaoProduto.descricao == undefined ||this.novoOuEdicaoProduto.descricao == ""
      )
        return (this.validacaoDialog = "Preencher todos os campos");
      this.validacaoDialog = "";

      let resposta = await EmpresaHttp.adicionarProduto(
        this.selectIdEmpresa,
        this.novoOuEdicaoProduto
      );
      if (resposta.status == 200) {
        this.empresa = this.empresa = resposta.data;
        
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Produto cadastrado com sucesso!";

        setTimeout(() => {
          this.cancelarCadastroProduto();
          this.msgSalvoComSucesso = "";
          this.isDialogSalvoComSucesso = false;
        }, 1500);
      } else {        
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Erro ao salvar produto!";

        setTimeout(() => {
          this.cancelarCadastroProduto();
          this.msgSalvoComSucesso = "";
          this.isDialogSalvoComSucesso = false;
        }, 1500);
      }
    },
    editarProduto(produto) {
      //alert(JSON.stringify(produto))
      this.isDialogProduto = true;
      this.edicao = true;
      this.novoOuEdicaoProduto = Object.assign({}, produto);
    },
    async atualizarProduto() {
       //validação dos campos antes de mandar para o back-end
      if (
        this.novoOuEdicaoProduto.nome == undefined ||this.novoOuEdicaoProduto.nome == ""||
        this.novoOuEdicaoProduto.valor == undefined ||this.novoOuEdicaoProduto.valor == ""||
        this.novoOuEdicaoProduto.descricao == undefined ||this.novoOuEdicaoProduto.descricao == ""
      )
        return (this.validacaoDialog = "Preencher todos os campos");
      this.validacaoDialog = "";

      let resposta = await EmpresaHttp.editarProduto(
        this.selectIdEmpresa,
        this.novoOuEdicaoProduto
      );
      if (resposta.status == 200) {
        this.empresa = this.empresa = resposta.data;
        
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Produto Atualizado com sucesso!";

        setTimeout(() => {
          this.cancelarCadastroProduto();
          this.msgSalvoComSucesso = "";
          this.isDialogSalvoComSucesso = false;
        }, 1500);
      } else {
        
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Erro ao Atualizar produto!";

        setTimeout(() => {
          this.cancelarCadastroProduto();
          this.msgSalvoComSucesso = "";
          this.isDialogSalvoComSucesso = false;
        }, 1500);
      }
    },
    async ativarInativarProduto(produto) {
     
     let produtoatualizado = produto;
     produtoatualizado.status = !produtoatualizado.status
    
    //  this.novoOuEdicaoProduto.status = !this.novoOuEdicaoProduto.status;

      let resposta = await EmpresaHttp.editarProduto(
        this.selectIdEmpresa,
        produtoatualizado
      );
      if (resposta.status == 200) {
        this.empresa = this.empresa = resposta.data;
        
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Produto Atualizado com sucesso!";

        setTimeout(() => {
          this.cancelarCadastroProduto();
          this.msgSalvoComSucesso = "";
          this.isDialogSalvoComSucesso = false;
        }, 1500);
      } else {
        
        this.isDialogSalvoComSucesso = true;
        this.msgSalvoComSucesso = "Erro ao Atualizar produto!";

        setTimeout(() => {
          this.cancelarCadastroProduto();
          this.msgSalvoComSucesso = "";
          this.isDialogSalvoComSucesso = false;
        }, 1500);
      }



    }
  }
};
</script>

<style></style>
