import Vue from 'vue'
import axios from 'axios'
import store from '../store/store'
import router from '../router'

const instance = axios.create({
  baseURL: process.env.VUE_APP_SAM
})

instance.interceptors.request.use(config => {
  Vue.prototype.$Progress.start()
  store.commit('loader/addRequest')

  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  store.commit('loader/subtractRequest')
  if (!store.getters['loader/isAxiosLoading']) {
    Vue.prototype.$Progress.finish()
  }

  return response
}, error => {
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
    Vue.request_sam = instance
    Vue.prototype.$request_sam = instance
  }
}
