import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

import user from './controllers/user'
import order from './controllers/order'
import product from './controllers/product'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user: {
      namespaced: true,
      ...user
    },
    order: {
      namespaced: true,
      ...order
    },
    product: {
      namespaced: true,
      ...product
    }
  }
})
