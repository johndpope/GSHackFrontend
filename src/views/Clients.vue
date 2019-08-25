<template lang="pug">
  b-container
    .m-4.d-flex.align-items-center.justify-content-between
      Avatar.mr-2(:size="'lg'", :src="'https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-1/p100x100/61589514_1886459874789225_8612030699794333696_n.jpg?_nc_cat=102&_nc_oc=AQnKUDKgUkolo6GCOY0jb3g3FikF-aEsMMMj9JoP0Vl6JVcp784AGFcFW8dWsyLd_hs&_nc_ht=scontent-qro1-1.xx&oh=2bb22dfa6b79bbd12bcd53143089779f&oe=5E0E98FD'")
      b-button(pill variant="success", @click="new_client_dialog = true") Agregar cliente
    .client-container(v-for="client in parsed_clients", :key="client.id", @click="goToClient(client.id)")
      b-row.m-1.d-flex.align-items-center.justify-content-between(style="text-align: center;")
        b-col
          Avatar.mr-2(:size="'xs'", :src="'https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-1/p100x100/61589514_1886459874789225_8612030699794333696_n.jpg?_nc_cat=102&_nc_oc=AQnKUDKgUkolo6GCOY0jb3g3FikF-aEsMMMj9JoP0Vl6JVcp784AGFcFW8dWsyLd_hs&_nc_ht=scontent-qro1-1.xx&oh=2bb22dfa6b79bbd12bcd53143089779f&oe=5E0E98FD'")
          div {{client.name}}
        b-col(style="text-align: center;")
          div Productos: {{client.products}}
          div.status-box(:style="{'border-color': client.color}") {{client.activity}}

    b-modal(v-model="new_client_dialog", centered, title="Agregar nuevo cliente", cancel-title="Cancelar", ok-title="Crear", ok-variant="success", :ok-disabled="can_create", @ok="createClient", @show="resetModal")
      b-container(fluid)
        label Nombre:
        b-form-input.mb-2(v-model="new_client_data.name" placeholder="Nombre")
        label Teléfono:
        b-form-input.mb-2(v-model="new_client_data.phone" placeholder="Télefono")
        label Drección:
        b-form-textarea.mb-2(v-model="new_client_data.address" placeholder="Drección")
</template>

<script>
  import { createNamespacedHelpers, mapActions } from 'vuex'
  const userController = createNamespacedHelpers('user')
  import Avatar from '../components/Avatar.vue'
  export default {
    name: 'clients',
    data () {
      return {
        //users: [],
        new_client_dialog: false,
        new_client_data: {
          name: '',
          phone: '',
          address: '',
        },
      }
    },
    beforeCreate: function () {
      //this.$store.dispatch('setUsers')
    },
    computed: {
      ...userController.mapState({
        users: state => state.users
      }),
      parsed_clients () {
        let self = this
        return this.users.map(c => {
          let data = self.statusColor(c.status)
          c.color = data.color
          c.activity = data.activity
          return c
        })
      },
      can_create () {
        return !this.new_client_data.name.length
      }
    },
    methods: {
      ...mapActions(['user/all', 'user/create']),
      getUsers () {
        this['user/all']()
      },
      createClient () {
        let self = this
        this['user/create']({
          ...self.new_client_data,
          callback: res => {
            if(res.error) {

            } else {
              self.$message.success('Usuario creado con éxito')
            }
          }
        })
      },
      statusColor(status){
        let color = '';
        let activity = ''
        switch (status) {
          case 'buying':
            color = '#0374d6'
            activity = 'Comprando'
            break
          case 'help':
            color = '#f0401d'
            activity = 'Necesita ayuda'
            break
          case 'paying':
            color = '#41a602'
            activity = 'Quiere pagar'
            break
        }
        return {color: color, activity: activity}
      },
      goToClient(client_id){
        this.$router.push({name: 'client', params: { client_id: client_id } })
      },
      resetModal () {
        //this.new_client_dialog = false
      }
    },
    mounted () {
      this.getUsers()
    },
    components: { Avatar }
  }
</script>

<style lang="scss" scoped>
  .client-container {
    border: 1px solid #8D8D8D;
    border-radius: 4px;
    padding: 5px;
    margin: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    transition: height 125ms, margin 125ms;
    background: #fff;
    background: linear-gradient(to bottom, #fff 70%, #fafafa 100%);
  }
  .client-container:hover {
    background-color: #FFDC20;
  }

  .status-box {
    border-right: 8px solid;
    padding: 5px;
    font-weight: bold;
    font-size: 15px;
  }
</style>
