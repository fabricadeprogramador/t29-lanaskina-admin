<template>
  <div>
    <v-row>
      <v-col cols="3" class="font-italic">
        <h2 class="mx-7 mt-7">BEM VINDO</h2>
      </v-col>
      <v-col cols="9">
        <img src="./../assets/logo.png" alt="Logo lanaskina" />
      </v-col>
      <v-col cols="8"> </v-col>
    </v-row>

    <!-- <v-btn @click="adicionar">Adicionar</v-btn>
    <v-btn @click="deletar">Deletar</v-btn>
    <v-btn @click="editar">Editar</v-btn>

    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item v-for="convidado in convidados" :key="convidado._id">{{
            convidado.nome
          }}</v-list-item>
        </v-list>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import ConvidadoHttp from "@/http/ConvidadoHttp";

export default {
  name: "Home",
  data() {
    return {
      convidados: [],
    };
  },
  created() {
    this.buscarConvidados();
  },
  methods: {
    async buscarConvidados() {
      let resposta = await ConvidadoHttp.buscarTodos();
      if (resposta.status == 200) {
        this.convidados = resposta.data;
        console.log(JSON.stringify(this.convidados));
      }
    },

    async adicionar() {
      let convidado = {
        nome: "TESTE AXIOS",
        idade: 55,
        sexo: "M",
      };

      let resposta = await ConvidadoHttp.adicionar(convidado);
      if (resposta.status == 200) {
        this.convidados.push(resposta.data);
      }
    },

    async deletar() {
      let convidadoId = "5f8f8468e038576ccc5a2ca7";

      let resposta = await ConvidadoHttp.deletar(convidadoId);
      if (resposta.status == 200) {
        this.buscarConvidados();
      }
    },

    async editar() {
      let convidado = {
        _id: "5f8f829de038576ccc5a2ca5",
        nome: "EDITADO",
        idade: 155,
        sexo: "F",
      };

      let resposta = await ConvidadoHttp.editar(convidado);
      if (resposta.status == 200) {
        this.buscarConvidados();
      }
    },
  },
};
</script>
