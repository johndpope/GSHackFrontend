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
  async addProduct ({ commit }, params) {
    try {
      console.log('imagen', params.imagen)
      let res = await Vue.request.post(`product`, params.imagen)
      if(res.data.success) {
        console.log(res)
        console.log('Id', res.data.product.Id)
        console.log('idOrder', params.idOrder)
        let info = {
          value :
          {
            IdProduct: res.data.product.Id,
            idOrder: params.idOrder
          }
        }
        let product = await Vue.request.post('addProducto', info)
        console.log(product)
        if(product.data.success && params.callback) params.callback(res.data)
      } else if (params.callback) {
        params.callback({error: `Error agregando ${resource_name}.`})
      }
    } catch (e) {
      if(params.callback)
        params.callback({error: `Ocurrió un error agregando ${resource_name}.`})
      console.error(e)
    }
  },
  async get ({ commit }, params) {
    console.log(params)
    await db.collection('products').get().then(doc => {
    //await db.collection('products').doc(params.file).get().then(doc => {
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
