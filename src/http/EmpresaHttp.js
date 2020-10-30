const axios = require("axios");

const API_HOST = "http://localhost:3000/empresas"

export default {
    async buscarTodos(){
        axios.get(API_HOST).then((resposta)=> resposta)
    },
    async buscarTodosNomes(){
     return   axios.get(`${API_HOST}/nomes`).then((resposta)=> resposta )
    },
    async buscaPorId(id){
        return   axios.get(`${API_HOST}/${id}`).then((resposta)=> resposta )
    },
    async editar(id, empresa){
        return   axios.put(`${API_HOST}/${id}`, empresa).then((resposta)=> resposta )
    },
    async adicionar(empresa){
        return   axios.post(`${API_HOST}`, empresa).then((resposta)=> resposta )
    }
}