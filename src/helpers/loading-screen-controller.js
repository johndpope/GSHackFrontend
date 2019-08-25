export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          loading_screen: null
        }
      },
      methods: {
        showLoadingScreen () {
          if (this.$loading) {
            this.loading_screen = this.$loading.show()
          }
        },
        hideLoadingScreen () {
          if (this.loading_screen) {
            this.loading_screen.hide()
            this.loading_screen = null
          }
        }
      }
    })
  }
}
