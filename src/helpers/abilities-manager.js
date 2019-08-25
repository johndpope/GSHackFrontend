export default function abilitiesPlugin(Vue, ability) {
  const bus = new Vue()

  Vue.mixin({
    beforeCreate() {
      this.$forceUpdate = this.$forceUpdate.bind(this)
      bus.$on('ability:update', this.$forceUpdate)
    },
    beforeDestroy() {
      bus.$off('ability:update', this.$forceUpdate)
    }
  })
}
