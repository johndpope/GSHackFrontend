export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        validateState(ref) {
          if (this.veeFields && this.veeFields[ref] && this.veeFields[ref].validated) {
            return this.errors.has(ref) ? false : null
          }
          return null
        }
      }
    })
  }
}
