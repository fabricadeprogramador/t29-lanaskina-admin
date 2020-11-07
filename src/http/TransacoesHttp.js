const axios = require("axios");

const API_HOST = "http://localhost:3000/transacoes"

export default {
    async buscarTodos(){
      return  axios.get(API_HOST).then((resposta)=> resposta)
    },
   
}