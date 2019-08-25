import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Seller from './views/Seller.vue'
import Clients from "./views/Clients";
import Client from "./views/Client";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: 'login'},
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: {name: 'root'},
    },
    // MAIN
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      redirect: {name: 'seller'},
      children: [
        {
          path: 'seller',
          name: 'seller',
          component: Seller
        },
        {
          path: 'clients',
          name: 'clients',
          component: Clients
        },
        {
          path: 'client/:client_id',
          name: 'client',
          component: Client
        },
      ]
    },
  ]
})

export default router