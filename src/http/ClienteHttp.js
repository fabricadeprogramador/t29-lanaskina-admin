const axios = require("axios");

//const API_HOST = "https://t29-lanaskina-api.herokuapp.com/convidados";
const API_HOST = "http://localhost:3000/clientes"

export default {
    async buscarTodos(){
       return  axios.get(API_HOST).then((resposta) => resposta);
    },
    // async ativarInativar(cliente){
    //     return axios.put(API_HOST, cliente).then((resposta)=>resposta);
    // }
}