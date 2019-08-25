//libraries
import Vue from 'vue'
import axios from 'axios'
import { db } from '@/main'

let resource = 'product'
let resource_name = 'producto'
let resource_name_plural = 'productos'

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
      await db.collection('orders').onSnapshot((snapshot) => {
        let orders = []
        snapshot.forEach((doc) => {
          orders.push({
            id: doc.id,
            user: doc.data().user,
            status: doc.data().status,
            items: doc.data().items,
          })
        })
        commit('setItems', orders)
      })
    } catch (e) {
      commit('setItems', [])
      console.error(e)
    }
  },
  async get ({ commit }, params) {
    console.log(params)
    await db.collection('products').doc(params.file).get().then(doc => {
      if (!doc.exists) {
        if(params.callback) params.callback({error: `No se econtró el ${resource_name}.`})
      } else {
        if(params.callback) params.callback(doc.data())
      }
    }).catch((e) => {
      console.log('Error getting user.', e)
      params.callback({error: `Error obteniendo informacion de ${resource_name}.`})
    })
  },
  async create ({ commit }, params) {
    await db.collection('orders').add({
      name: params.name,
      telephone: params.phone,
      address: params.address,
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
    console.log(params)
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
