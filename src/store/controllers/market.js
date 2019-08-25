//libraries
import Vue from 'vue'
import axios from 'axios'

let resource = 'market'
let resource_name = 'tienda'
let resource_name_plural = 'tiendas'

let state = {

}

state[resource + 's'] = []

//functions receive state
let getters = {

}

//functions receive context and params
let actions = {
  async all ({ commit }, params) {
    try {
      commit('setItems', [])
      let res = await Vue.request.get(`${resource}`, {params: params.params || {}})
      if(res.data.success) {
        commit('setItems', res.data.resource)
        if(params.callback)
          params.callback(res.data)
      } else {
        if(params.callback)
          params.callback({error: `Error obteniendo ${resource_name_plural}.`})
      }
    } catch (e) {
      if(params.callback)
        params.callback({error: `Ocurrió un error obteniendo ${resource_name_plural}.`})
      console.error(e)
    }
  },
  async get ({ commit }, params) {
    try {
      let res = await Vue.request.get(`${resource}/${params[resource + '_id']}`, {params: params.params || {}})
      if(res.data.success && params.callback) {
        params.callback(res.data)
      } else if (params.callback) {
        params.callback({error: `Error obteniendo ${resource_name}.`})
      }
    } catch (e) {
      if(params.callback)
        params.callback({error: `Ocurrió un error obteniendo ${resource_name}.`})
      console.error(e)
    }
  },
  async create ({ commit }, params) {
    try {
      let res = await Vue.request.post(`${resource}`, params)
      if(res.data.success && params.callback) {
        params.callback(res.data)
      } else if (params.callback) {
        params.callback({error: `Error creando ${resource_name}.`})
      }
    } catch (e) {
      if(params.callback)
        params.callback({error: `Ocurrió un error creando ${resource_name}.`})
      console.error(e)
    }
  },
  async update ({ commit }, params) {
    try {
      let res = await Vue.request.patch(`${resource}/${params[resource + '_id']}`, params)
      if(res.data.success && params.callback) {
        params.callback(res.data)
      } else if (params.callback) {
        params.callback({error: `Error actualizando ${resource_name}.`})
      }
    } catch (e) {
      if(params.callback)
        params.callback({error: `Ocurrió un error actualizando ${resource_name}.`})
      console.error(e)
    }
  },
  async destroy ({ commit }, params) {
    try {
      let res = await Vue.request.delete(`${resource}/${params[resource + '_id']}`, {data: params})
      if(res.data.success && params.callback) {
        params.callback(res.data)
      } else if (params.callback) {
        params.callback({error: `Error eliminando ${resource_name}.`})
      }
    } catch (e) {
      if(params.callback)
        params.callback({error: `Ocurrió un error eliminando ${resource_name}.`})
      console.error(e)
    }
  }
}

//functions receive state
let mutations = {
  setItems (state, items) {
    state[resource + 's'] = items
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
