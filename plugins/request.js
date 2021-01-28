import axios from 'axios'
const Cookie = process.client ? require('js-cookie') : undefined

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});

export default ({ store }) => {
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  request.interceptors.response.use(function (response) {
    if (response.status === 200) {
      return response
    } else {
      return Promise.reject(response)
    }
  }, function (error) {
    if (error.response.status === 401) {
      Cookie.remove(`${window.location.origin}/user`)
      window.location.replace('/Login')
    }
  });
}