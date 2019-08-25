import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import './assets/theme.scss'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
Vue.component('v-select', vSelect)

import FeatherWrapper from 'vue-feather-icons-wrapper'
Vue.use(FeatherWrapper)

import Moment from 'moment-timezone'
Moment.locale('es')
Vue.prototype.$moment = Moment

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/es'
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(ElementUI, { locale })

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import Functions from './helpers/functions'
Vue.use(Functions)

import VueAuthenticate from 'vue-authenticate'
Vue.use(VueAuthenticate, {
  baseUrl: process.env.VUE_APP_API,
  loginUrl: '/login',
  storageNamespace: 'botlers',
  tokenPrefix: 'enterprise',
  providers: {
    facebook: {
      clientId: process.env.VUE_APP_FACEBOOK_APP_ID,
      redirectUri: `${window.location.origin}/callback`,
      scope: ['manage_pages', 'pages_messaging', 'pages_messaging_subscriptions', 'publish_pages']
    },
    twitter: {
      redirectUri: `${window.location.origin}/callback`
    }
  }
})

import Request from './helpers/request'
Vue.use(Request)

import RequestSam from './helpers/request-sam'
Vue.use(RequestSam)

import RequestFacebook from './helpers/request-facebook'
Vue.use(RequestFacebook)

// Global mixin for sidenav control
import SidenavController from './helpers/sidenav-controller'
Vue.use(SidenavController)

// Loader controller computed method plugin
import LoaderController from './helpers/loader-controller'
Vue.use(LoaderController)

import ClearObject from './helpers/clear-object'
Vue.use(ClearObject)

import PaginationHelper from './helpers/pagination-helper'
Vue.use(PaginationHelper)

import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyA24aBSIiybD9FMhQs8QXY3on0DXisQMcQ",
  authDomain: "gshackchallenge.firebaseapp.com",
  databaseURL: "https://gshackchallenge.firebaseio.com",
  projectId: "gshackchallenge",
  storageBucket: "",
  messagingSenderId: "624088226105",
  appId: "1:624088226105:web:784c4a2b7e3c3566"
})
export const db = firebase.firestore()

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: '#409EFF',
  failedColor: 'rgb(245, 108, 108)',
  thickness: '2px',
  autoFinish: false,
  transition: {
    speed: '.8s',
    opacity: '.2s',
    termination: 800
  }
})

import { Message } from 'element-ui';
Vue.prototype.$message = Message;

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
Vue.prototype.$setCookie = (key, value, opts) => Vue.prototype.$cookie.set(key, JSON.stringify(value), opts)
Vue.prototype.$getCookie = key => JSON.parse(Vue.prototype.$cookie.get(key))
import RecentsManager from './helpers/recents-manager'
Vue.use(RecentsManager)
import UserManager from './helpers/user-manager'
Vue.use(UserManager)

import VeeValidate from 'vee-validate'
import dictionary from './data/errors-dictionary-es'
Vue.use(VeeValidate, {
  locale: 'es',
  dictionary,
  fieldsBagName: 'veeFields',
  mode: 'eager'
})

import FormValidation from './helpers/validator-method'
Vue.use(FormValidation)

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {
  color: '#0e5ccf',
  zIndex: 2000,
  height: 70,
  width: 70,
  opacity: 0.6
});
import LoadingScreen from './helpers/loading-screen-controller'
Vue.use(LoadingScreen)

import EmptyMessage from './components/EmptyMessage.vue'
Vue.component(EmptyMessage.name, EmptyMessage)

import SideModal from './components/SideModal.vue'
Vue.component(SideModal.name, SideModal)

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

Vue.config.productionTip = false

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import ToggleDisabledStatus from './helpers/toggle-disabled-status'
Vue.use(ToggleDisabledStatus)

import { abilitiesPlugin } from '@casl/vue'
import { ability } from './helpers/abilities'
Vue.use(abilitiesPlugin, ability)

import abilitiesManager from './helpers/abilities-manager'
Vue.use(abilitiesManager)

import Breakpoints from './helpers/breakpoints-helper'
Vue.use(Breakpoints)

import VueNumberInput from '@chenfengyuan/vue-number-input';
Vue.use(VueNumberInput);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
