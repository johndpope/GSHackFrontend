export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        getCurrentUser () {
          let user = Vue.prototype.$cookie.get('user')
          if (user) {
            return JSON.parse(user)
          } else {
            this.$router.push({name: 'logout'})
            return null
          }
        }
      }
    })
  }
}
