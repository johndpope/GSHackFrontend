<template lang="pug">
  b-container.mt-4
    .d-flex.align-items-center.justify-content-center.my-3
      Avatar.mr-2(:size="'xl'", :src="'https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-1/p100x100/61589514_1886459874789225_8612030699794333696_n.jpg?_nc_cat=102&_nc_oc=AQnKUDKgUkolo6GCOY0jb3g3FikF-aEsMMMj9JoP0Vl6JVcp784AGFcFW8dWsyLd_hs&_nc_ht=scontent-qro1-1.xx&oh=2bb22dfa6b79bbd12bcd53143089779f&oe=5E0E98FD'")
      h3.m-3 Lorena Luna
    b-button-group.my-3(vertical, style="width:100%")
      b-button.my-button(size="lg", :to="{name: 'clients'}") Clientes
      b-button.my-button(size="lg") Usuario
      b-button.my-button(size="lg") Tutorial
</template>

<script>
  import Toolbar from '../components/Toolbar.vue'
  import Avatar from '../components/Avatar.vue'
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
    components: { Toolbar, Avatar }
  }
</script>

<style lang="scss" scoped>
  .btn-container {
    text-align:center;

  }

  .my-button {
    color: #666666 !important;
    border: 2px solid #DA291C !important;
    background-color: #FFDC20 !important;
  }

</style>
