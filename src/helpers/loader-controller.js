export default {
  install (Vue, options) {
    Vue.mixin({
      computed: {
        isAxiosLoading () {
          return this.$store.getters['loader/isAxiosLoading']
        }
      }
    })
  }
}
