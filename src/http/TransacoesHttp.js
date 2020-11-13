const axios = require("axios");

//const API_HOST = "http://localhost:3000/transacoes"
const API_HOST = "https://t29-lanaskina-api.herokuapp.com/transacoes"

export default {
    async buscarTodos(){
      return  axios.get(API_HOST).then((resposta)=> resposta)
    },   
}