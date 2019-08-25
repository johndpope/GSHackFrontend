//libraries
import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../../router'

const request = axios.create({
  baseURL: 'https://qaenterprise.botlers.io/'//process.env.VUE_APP_API
})

const state = {

}

//functions receive state
const getters = {

}

//functions receive context and params
const actions = {
  async upload_file ({ commit }, params) {
    try {
      let res = await request.post(`upload/file`, params)
      if(res.data.success && params.callback) {
        params.callback(res.data)
      } else if (params.callback) {
        params.callback({error: `Error cargando archivos`})
      }
    } catch (e) {
      if(params.callback)
        params.callback({error: `Ocurrió un error cargando archivos`})
      console.error(e)
    }
  }
}

//functions receive state
const mutations = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
