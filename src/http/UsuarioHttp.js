const axios = require("axios");

const API_HOST = "https://t29-lanaskina-api.herokuapp.com/convidados";
//const API_HOST = "http://localhost:3000/usuarios"

export default {
    async ativarInativar(id){
       
       return  axios.post(`${API_HOST}/${id}`).then((resposta) => resposta);
    },

    async buscarTodos(){
        return axios.get(API_HOST).then((resposta) => resposta)
    },
    async adicionar(usuario)    {
        return axios.post(API_HOST, usuario).then((resposta)=> resposta)
    },
    async editar(usuario)    {
        return axios.put(API_HOST, usuario).then((resposta)=> resposta)
    }
}