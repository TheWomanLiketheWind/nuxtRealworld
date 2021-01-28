import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
  headers: { 'Content-Type': 'application/json' }
});


export default instance