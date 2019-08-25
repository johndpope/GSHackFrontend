<template lang="pug">
  .dashboard-container
    Toolbar
    router-view
</template>

<script>
import Toolbar from '../components/Toolbar.vue'
export default {
  data () {
    return {

    }
  },
  computed: {
    greeting () {
      return "Bienvenido"
    }
  },
  components: { Toolbar }
}
</script>

<style lang="scss" scoped>
</style>
