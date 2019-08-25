import store from '../store/store'

export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        toggleSidenav (origin, type, value) {
          switch (type) {
            case 'open':
              store.dispatch('openSidenav', value)
              break
            case 'close':
              store.dispatch('closeSidenav', value)
              break
          }
        }
      },
      computed: {
        isSidenavOpen () {
          return store.getters.isSidenavOpen
        },
        isSidenavClose () {
          return store.getters.isSidenavClose
        }
      }
    })
  }
}
