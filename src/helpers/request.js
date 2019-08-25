import Vue from 'vue'
import axios from 'axios'
import store from '../store/store'
import router from '../router'
import { validAccess } from "./path-manager";

const instance = axios.create({
  baseURL: 'https://evil-tiger-94.localtunnel.me/api/v1/'//process.env.VUE_APP_API
})

instance.interceptors.request.use( async config => {
  Vue.prototype.$Progress.start()
  //store.commit('loader/addRequest')

  /*if (await validAccess(config.url) == false) {
    console.log('%c not pass', 'color : #ff0000')
    throw new axios.Cancel('You shall not pass!.');
  }*/

  if (Vue.prototype.$auth.isAuthenticated()) {
    config.headers['Authorization'] = [
      Vue.prototype.$auth.options.tokenType, Vue.prototype.$auth.getToken()
    ].join(' ')
  } else {
    delete config.headers['Authorization']
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {

  Vue.prototype.$auth.setToken(response)
  return response
}, error => {

  if (error instanceof axios.Cancel) {
    router.push({name: 'root'})
  }

  store.commit('loader/subtractRequest')
  if (!store.getters['loader/isAxiosLoading']) {
    Vue.prototype.$Progress.fail()
  }

  if (error.response && error.response.status === 401) {
    router.push({name: 'logout'})
  }

  return Promise.reject(error)
})

export default {
  install(Vue, options) {
    Vue.request = instance
    Vue.prototype.$request = instance
  }
}
