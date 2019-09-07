import axios from 'axios'

const api = axios.create({
    baseURL: "https://projetorotten-api.herokuapp.com"
})

export default api;