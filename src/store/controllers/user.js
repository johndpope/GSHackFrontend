//libraries
import Vue from 'vue'
import axios from 'axios'
import { db } from '@/main'

let resource = 'user'
let resource_name = 'usuario'
let resource_name_plural = 'usuarios'

let state = {

}

//Usuario

state[resource + 's'] = []

//functions receive state
let getters = {

}

//functions receive context and params
let actions = {
  async all ({ commit }, params) {
    try {
      commit('setItems', [])
      await db.collection('users').onSnapshot((snapshot) => {
        let users = []
        snapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data()
          })
        })
        commit('setItems', users)
      })
    } catch (e) {
      commit('setItems', [])
      console.error(e)
    }
  },
  async get ({ commit }, params) {
    await db.collection('users').doc(params.id).get().then(doc => {
      if (!doc.exists) {
        if(params.callback) params.callback({error: `No se econtró el ${resource_name}.`})
      } else {
        if(params.callback) params.callback({
          id: doc.id,
          data: doc.data()
        })
      }
    }).catch((e) => {
      console.log('Error getting user.', e)
      params.callback({error: `Error obteniendo informacion de ${resource_name}.`})
    })
  },
  async create ({ commit }, params) {

    await db.collection('users').add({ value: {
        name: params.name,
        telephone: params.phone,
        address: params.address,
      }
    }).then((response) => {
      if (response) {
        if(params.callback) params.callback(response)
      } else {
        if(params.callback) params.callback({error: `Error creando ${resource_name}.`})
      }
    }).catch((e) => {
      console.error(e)
      if(params.callback) params.callback({error: `Ocurrió un error creando ${resource_name}.`})
    })
  },
  async update ({ commit }, params) {
    await db.collection('users').doc(params.id).update({
      name: params.name,
      telephone: params.telephone,
      address: params.address,
    }).catch((e) => {
      console.log('Error getting user.', e)
      params.callback({error: `Error obteniendo informacion de ${resource_name}.`})
    })
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
  },
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
