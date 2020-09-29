<template>
  <div>
    <!-- inicio dialog nova empresa -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="isDialogOpen" max-width="600px">
          <!-- <v-dialog v-model="isDialogOpen" persistent max-width="600px"> -->
          <v-card>
            <v-card-title>
              <span class="headline">{{edicao?"Edição Empresa":"Nova Empresa"}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Nome da Empresa*"
                      required
                      v-model="novaEmpresa.nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="CNPJ"
                      hint="CNPJ da empresa"
                      v-model="novaEmpresa.cnpj"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Email"
                      hint="Email da empresa"
                      v-model="novaEmpresa.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Tel"
                      hint="Número Telefônico da Empresa"
                      v-model="novaEmpresa.tel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Rua"
                      hint="Logradouro"
                      v-model="novaEmpresa.endereco.rua"
                    ></v-text-field>
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
              <v-btn
                color="blue darken-1"
                text
                @click="limparEFecharEmpresaNova"
                >Fechar</v-btn
              >
              <v-btn v-if="edicao" color="blue darken-1" text @click="atualizarEmpresa"
                >Atualizar</v-btn
              >
              <v-btn v-else color="blue darken-1" text @click="salvarNovaEmpresa"
                >Salvar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- final dialog nova empresa -->

    <!-- inicio msg de validação -->
    <v-row justify="center">
      <v-col sm="9">
        <v-slide-y-transition leave-absolute>
          <v-alert class="mt-3" type="warning" v-if="validacao != ''">{{
            validacao
          }}</v-alert>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <!-- Fim msg de validação -->

    <!-- inicio select de empresa -->
    <v-row class="mb-2 ma-5">
      <v-col cols="4" sm="3" class="ma-0 ml-4 pa-0">
        <v-select
          :items="empresas"
          label="Empresas"
          outlined
          item-text="nome"
          item-value="nome"
          v-model="selectEmpresa"
          dense
        ></v-select>
      </v-col>
      <v-col cols="3" sm="3" class="ma-0 ml-4 pa-0">
        <v-btn color="green" @click="buscarTransacaoDaEmpresa">Buscar</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3" sm="3" class="ma-0 pa-0">
        <v-btn color="success" @click="openDialog()">Nova Empresa</v-btn>
      </v-col>
    </v-row>
    <!-- fim select empresa -->

    <!-- inicio Data-table da empresa -->
    <v-card class="pt-0 mt-0">
      <v-card-text>
        <v-card elevation="5">
          
          <v-card-title class="headline ">Dados da Empresa</v-card-title>
           <v-card-text class="text-center" v-if="selectEmpresa ==''">         
               Nenhuma empresa selecionada
          </v-card-text>
          <v-row v-else>
            <v-col cols="12" sm="3">
              <v-card-text>
                <strong>Nome: </strong>
                {{ empresaSelecionada.nome }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-card-text>
                <strong>Cnpj: </strong
                >{{ empresaSelecionada.cnpj }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="3">
              <v-card-text>
                <strong>Contato: </strong>
                {{ empresaSelecionada.tel }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-card-text v-if="empresaSelecionada.status != null">
                <strong>Status: </strong
                >{{
                  empresaSelecionada.status ? "Ativo" : "Inativo"
                }}</v-card-text
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn small color="warning" class="mt-2" @click="editarEmpresa(empresaSelecionada)">Editar </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <hr />
        <v-card elevation="5">
          <v-row>
            <v-col cols="12" sm="10">
              <v-card-title class="headline "
                >Produtos Cadastrados:</v-card-title
              >
            </v-col>

            <v-col cols="12" sm="2" class="mt-2">
              <v-btn :Disabled="selectEmpresa==''?true:false" color="success" small class="mt-2" @click="clickNovoProduto">Novo Produto</v-btn>
            </v-col>
          </v-row>

          <!-- Inicio Cadastro/Edição produtos -->
          <template>
           <v-row>
             <v-dialog v-model= "isDialogProduto" max-width="600px">
               <v-card>
                 <v-card-title class="mb-0 pb-0">{{edicaoProduto?"Edição Produto":"Novo Produto"}}</v-card-title>
                <v-card-text>
                   <v-container>
                   <v-row>
                     <v-col cols="12" sm="8">
                       <v-text-field
                        label="Nome"
                        hint="Nome do produto"
                        v-model="novoProduto.nome">                         
                       </v-text-field>
                     </v-col>
                      <v-col cols="12" sm="4">
                       <v-text-field
                        label="Valor"  
                        type="number"                      
                        hint="Valor do produto (R$)"
                        v-model="novoProduto.valor">                         
                       </v-text-field>
                     </v-col>
                   </v-row>
                   <v-row>
                     <v-col>
                       <v-textarea    
                       v-model="novoProduto.descricao"                  
                       label="Descrição do Produto"  
                       hint="Informe os detalhes do produto"                     
                      >                       
                     </v-textarea>
                     </v-col>
                   </v-row>
                   <v-row justify="center" class="mt-5">
                     <v-btn  color="blue darken-1" text @click="cancelar">Cancelar</v-btn>
                     <v-btn  color="blue darken-1" text v-if="edicaoProduto">Atualizar</v-btn>
                     <v-btn  color="blue darken-1" text v-else>Salvar</v-btn>
                   </v-row>
                 </v-container>
                </v-card-text>
               </v-card>
             </v-dialog>
           </v-row>
          </template>

          <v-data-table
            :headers="cabecalhoProduto"
            :items="empresaSelecionada.produtos"
            sort-by="nome"
            class="elevation-1"
          >
            <template v-slot:item.acao="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editarProduto(item)"
                color="primary"
                > mdi-pencil</v-icon
              >
              <v-icon
                small
                @click="ativarInativarProduto(item)"
                v-if="item.ativo"
                color="green"
                >mdi-check-bold</v-icon
              >
              <v-icon small @click="ativarInativarProduto(item)" v-else color="red"
                >mdi-cancel</v-icon
              >
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
//import { config } from 'vue/types/umd';

export default {
  components: {
    transacoes
  },
  data: () => ({    
    edicaoProduto: false,
    edicao: false,
    novoProduto: {},
    empresaSelecionada: {
      endereco:{},
      produtos: []
    },
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
    transacoesGeral: [],
    selectEmpresa: "",
    validacao: "",
    transacoesPorEmpresa: [],

    isDialogOpen: false,
    isDialogProduto: false,
    novaEmpresa: {
      // id: "",
      // nome: "",
      // cnpj: "",
      // email: "",
      // status: true,
      // tel: "",
      endereco: {
        // rua: "",
        // numero: "",
        // bairro: ""
      },
      produtos: []
    },
    empresas: [],
    geradorId: 6,
    
  }),
  created() {
    this.initTransacoesDasEmpresas();
  },

  methods: {
    buscarTransacaoDaEmpresa() {
      if (this.selectEmpresa == "") {
        this.validacao = "Selecione uma empresa";
        return;
      }
      this.validacao = "";

      this.transacoesPorEmpresa.splice(0, this.transacoesPorEmpresa.length);
      //this.empresaSelecionada.splice(0, this.empresaSelecionada.length);

      for (let i = 0; i < this.transacoesGeral.length; i++) {
        if (this.transacoesGeral[i].empresa.nome == this.selectEmpresa) {
          this.transacoesPorEmpresa.push(this.transacoesGeral[i]);
        }
      }
      for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i].nome == this.selectEmpresa) {
          this.empresaSelecionada = Object.assign({}, this.empresas[i]);
        }
      }
    },

    openDialog(empresa) {
      this.limparEFecharEmpresaNova();
      this.isDialogOpen = !this.isDialogOpen;
      this.validacao = "";
      
    },

    limparEFecharEmpresaNova() {
      // this.novaEmpresa = {
      //   endereco:{}
      // }
      this.novaEmpresa.id = "";
      this.novaEmpresa.nome = "";
      this.novaEmpresa.cnpj = "";
      this.novaEmpresa.email = "";
      this.novaEmpresa.tel = "";
      this.novaEmpresa.endereco.rua = "";
      this.novaEmpresa.endereco.numero = "";
      this.novaEmpresa.endereco.bairro = "";
      this.novaEmpresa.produtos  = [];
      this.isDialogOpen = false;
      this.edicao = false;
      //console.log(this.empresas)
    },
    editarEmpresa(empresa){
     //console.log(empresa)
     if((empresa.id === undefined || empresa.id === "") && (empresa.nome === undefined || empresa.nome === ""))return this.validacao = "Selecione uma empresa e click em 'Buscar'"

      this.validacao = ""
      this.edicao = true;
      this.isDialogOpen = !this.isDialogOpen;
      this.novaEmpresa = Object.assign({}, empresa);
      //console.log("atribuido "+JSON.stringify(this.novaEmpresa))
      //console.log(empresa)
    },
    cancelar(){
      this.edicaoProduto= false;
      this.novoProduto = {};
      this.isDialogProduto= false;
    },
    atualizarEmpresa(){
       
        let achou = false;
        let i = 0;
        while(i < this.empresas.length && achou == false){
          if(this.novaEmpresa.id == this.empresas[i].id){
           // console.log(empresa)
            Object.assign(this.empresas[i], this.novaEmpresa);
            console.log("empresas", this.empresas)
            achou = true;
            this.empresaSelecionada = this.novaEmpresa
            this.isDialogOpen = false;
            this.edicao = false;
            this.novaEmpresa =  {
              endereco:{},
              produtos:[]
            }
            
          }
          i++
        }
       // this.limparEFecharEmpresaNova();
        
    },
    editarProduto(produto){
      alert(JSON.stringify(produto))
    },
    ativarInativarProduto(){
      alert("ativarInativar")
    },
    clickNovoProduto(){
     this.isDialogProduto=true;
    },

    initTransacoesDasEmpresas() {
      this.empresas = [
        {
          id: 0,
          nome: "Petisco de Gato",
          cnpj: "001.002.003",
          email: "lalala@gmail.com",
          status: false,
          tel: "67981234567",
          endereco: {
            rua: "Esquina do gato",
            numero: 15,
            bairro: "Gato Preto"
          },
          produtos: [
            {
              id: 0,
              ativo: true,
              nome: "Espetinho simples",
              descricao: "Espetinho de carne,frango ou linguiça 100g",
              valor: 8
            },
            {
              id: 1,
              ativo: false,
              nome: "Espetinho completo",
              descricao:
                "Espetinho de carne,frango ou linguiça 100g com mandioca e vinagrete",
              valor: 18
            },
            {
              id: 2,
              ativo: true,
              nome: "Espetinho com mandioca",
              descricao:
                "Espetinho de carne,frango ou linguiça 100g com mandioca ",
              valor: 12
            }
          ]
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
            bairro: "Gato Preto"
          },
          produtos: [
            {
              id: 0,
              ativo: true,
              nome: "Espetinho simples",
              descricao: "Espetinho de carne ou frango ou linguiça 100g",
              valor: 8
            },
            {
              id: 1,
              ativo: true,
              nome: "Espetinho completo",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca e vinagrete",
              valor: 18
            },
            {
              id: 2,
              ativo: true,
              nome: "Espetinho com mandioca",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca ",
              valor: 12
            }
          ]
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
            bairro: "Gato Preto"
          },
          produtos: [
            {
              id: 0,
              ativo: true,
              nome: "Espetinho simples",
              descricao: "Espetinho de carne ou frango ou linguiça 100g",
              valor: 8
            },
            {
              id: 1,
              ativo: true,
              nome: "Espetinho completo",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca e vinagrete",
              valor: 18
            },
            {
              id: 2,
              ativo: false,
              nome: "Espetinho com mandioca",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca ",
              valor: 12
            }
          ]
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
            bairro: "Gato Preto"
          },
          produtos: [
            {
              id: 0,
              ativo: true,
              nome: "Espetinho simples",
              descricao: "Espetinho de carne ou frango ou linguiça 100g",
              valor: 8
            },
            {
              id: 1,
              ativo: false,
              nome: "Espetinho completo",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca e vinagrete",
              valor: 18
            },
            {
              id: 2,
              ativo: true,
              nome: "Espetinho com mandioca",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca ",
              valor: 12
            }
          ]
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
            bairro: "Gato Preto"
          },
          produtos: [
            {
              id: 0,
              ativo: false,
              nome: "Espetinho simples",
              descricao: "Espetinho de carne ou frango ou linguiça 100g",
              valor: 8
            },
            {
              id: 1,
              ativo: true,
              nome: "Espetinho completo",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca e vinagrete",
              valor: 18
            },
            {
              id: 2,
              ativo: true,
              nome: "Espetinho com mandioca",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca ",
              valor: 12
            }
          ]
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
            bairro: "Gato Preto"
          },
          produtos: [
            {
              id: 0,
              ativo: true,
              nome: "Espetinho simples",
              descricao: "Espetinho de carne ou frango ou linguiça 100g",
              valor: 8
            },
            {
              id: 1,
              ativo: true,
              nome: "Espetinho completo",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca e vinagrete",
              valor: 18
            },
            {
              id: 2,
              ativo: false,
              nome: "Espetinho com mandioca",
              descricao:
                "Espetinho de carne ou frango ou linguiça 100g com mandioca ",
              valor: 12
            }
          ]
        }
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
            ativo: false
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
              bairro: "Gato Preto"
            }
          },
          produtos: [
            {
              id: 0,
              nome: "Espetinho Simples",
              valor: 8.0
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 10.5
            },
            {
              id: 1,
              nome: "Espetinho com Completo",
              valor: 30.0
            }
          ],
          status: "Concluido"
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
            ativo: true
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
              bairro: "Gato Preto"
            }
          },
          produtos: [
            {
              id: 0,
              nome: "Espetinho Completo",
              valor: 50.0324
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 50.3
            }
          ],
          status: "Aberto"
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
            ativo: true
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
              bairro: "Gato Preto"
            }
          },
          produtos: [
            {
              id: 0,
              nome: "Espetinho simples",
              valor: 12.0
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 10.5
            }
          ],
          status: "Cancelado"
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
            ativo: true
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
              bairro: "Gato Preto"
            }
          },
          produtos: [
            {
              id: 0,
              nome: "Espetinho Completo",
              valor: 60.0
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 40.0
            }
          ],
          status: "Concluido"
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
            ativo: false
          },
          idTransacoes: 3,
          dataTransacoes: "11/01/2020",
          valor: 48.5,
          empresa: {
            id: 4,
            nome: "Tapiocaria Plinio",
            cnpj: "001.002.003",
            email: "lalala@gmail.com",
            status: true,
            tel: "67981234567",
            endereco: {
              rua: "Esquina do gato",
              numero: 15,
              bairro: "Gato Preto"
            }
          },
          produtos: [
            {
              id: 0,
              nome: "Espetinho Completo",
              valor: 48.5
            }
          ],
          status: "Concluido"
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
            ativo: false
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
              bairro: "Gato Preto"
            }
          },
          produtos: [
            {
              id: 0,
              nome: "Espetinho Completo",
              valor: 75.5
            },
            {
              id: 1,
              nome: "Espetinho com mandioca",
              valor: 24.5
            }
          ],
          status: "Aberto"
        }
      ];
    },

    salvarNovaEmpresa() {
      
      this.novaEmpresa.id = this.geradorId;
      this.geradorId++;
      var empresaSalvando = Object.assign({}, this.novaEmpresa);
      //console.log('empresasalvando',empresaSalvando)
      this.empresas.push(empresaSalvando);
      this.isDialogOpen = !this.isDialogOpen;
    }
  }
};
</script>

<style>
</style>