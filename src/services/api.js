import axios from 'axios'

const api = axios.create({
  baseURL: 'https://service-order-manager.onrender.com/api'
})

export default api
