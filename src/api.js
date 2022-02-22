import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://localhost/Conte-tecnologia/santa-carga/api/public/api'
    baseURL: 'https://santacarga.contetecnologia.com.br/api/public/api'
})

export default api