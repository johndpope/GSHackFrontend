<template lang="pug">
  b-container
    .d-flex.align-items-center.justify-content-evenly.mt-2
      Avatar.mx-2(:size="'xl'", :src="'https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-1/p100x100/61589514_1886459874789225_8612030699794333696_n.jpg?_nc_cat=102&_nc_oc=AQnKUDKgUkolo6GCOY0jb3g3FikF-aEsMMMj9JoP0Vl6JVcp784AGFcFW8dWsyLd_hs&_nc_ht=scontent-qro1-1.xx&oh=2bb22dfa6b79bbd12bcd53143089779f&oe=5E0E98FD'")
      .text-center(style="flex:1")
        h4(style="overflow-wrap:break-word;flex: 1;") {{client.name}}
        h4 Tel: {{client.telephone}}
        h5.text-center {{client.address}}
    div.my-2(style="text-align:right")
      b-button.mr-1(pill, variant="info", v-show="products_list.length") Cobrar
      b-button.mr-1(pill, variant="success", @click="cam.click()") Agregar Producto
      b-button(pill, variant="secondary", @click="client_dialog = true")
        v-icon.icon-button(name="users-cog", scale="1.5")
    h4.text-center Poductos en carrito
    .product-container
      .product(v-for="(product, index) in products_list", :key="index")
        x-icon(style="float:right")
        b-row.m-1.d-flex.align-items-center.justify-content-between(style="text-align: center;")
          b-col(cols="5")
            //h5 {{product.name}}
            img(:src="product.image", style="width: 100%;")
          b-col(cols="7")
            div Precio: {{product.price}}
            div Unidades: {{product.amount}}
            div (Disponibles: {{product.stock}})
            div.status-box(:style="{'border-right' : '8px solid' + product.color}") {{product.status}}
          div(style="width: 100%;") {{product.description}}

    b-modal(v-model="client_dialog", centered, title="Actualizar información", cancel-title="Cancelar", ok-title="Actualizar", ok-variant="success", :ok-disabled="can_create", @ok="updateClient")
      b-container(fluid)
        label Nombre:
        b-form-input.mb-2(v-model="client.name" placeholder="Nombre")
        label Teléfono:
        b-form-input.mb-2(v-model="client.telephone" placeholder="Télefono")
        label Drección:
        b-form-textarea.mb-2(v-model="client.address" placeholder="Drección")

    b-modal(v-model="image_modal", centered, title="Agregar producto", cancel-title="Cancelar", ok-title="Enviar", ok-variant="success", @ok="getProduct", @hide="image_file = null")
      b-container(fluid)
        img(id="frame", style="width:100%;object-fit: contain;")
    input(type="file", accept="image/*", capture="camera", id="cam", style="display:none")

</template>

<script>
  import { createNamespacedHelpers, mapActions } from 'vuex'
  const orderController = createNamespacedHelpers('order')
  const productController = createNamespacedHelpers('product')
  import Avatar from '../components/Avatar.vue'
  export default {
    data () {
      return {
        client: {
          name:'',
          telephone: '',
          address: '',
          status: 'help',
        },
        client_dialog: false,
        products_list: [
          {
            id:'3',
            name: 'Nintendo switch',
            description: 'Consola Nintendo Switch 32 GB con Controles Joy-Con Gris con Negro',
            image: 'https://elektra.vteximg.com.br/arquivos/ids/329405-1000-1000/847687-d9.jpg?v=636399729573530000',
            price: '$7,289.00',
            amount: '3',
            stock: '16',
            status: 'Entrega en tienda',
            color: '#0000ff'
          },
          {
            id:'3',
            name: 'Nintendo switch',
            description: 'Consola Nintendo Switch 32 GB con Controles Joy-Con Gris con Negro',
            image: 'https://elektra.vteximg.com.br/arquivos/ids/329405-1000-1000/847687-d9.jpg?v=636399729573530000',
            price: '$7,289.00',
            amount: '3',
            stock: '16',
            status: 'Envío a domicilio',
            color: '#00ff00'
          },
          {
            id:'3',
            name: 'Nintendo switch',
            description: 'Consola Nintendo Switch 32 GB con Controles Joy-Con Gris con Negro',
            image: 'https://elektra.vteximg.com.br/arquivos/ids/329405-1000-1000/847687-d9.jpg?v=636399729573530000',
            price: '$7,289.00',
            amount: '3',
            stock: '16',
            status: 'Envío a domicilio',
            color: '#00ff00'
          },
          {
            id:'3',
            name: 'Nintendo switch',
            description: 'Consola Nintendo Switch 32 GB con Controles Joy-Con Gris con Negro',
            image: 'https://elektra.vteximg.com.br/arquivos/ids/329405-1000-1000/847687-d9.jpg?v=636399729573530000',
            price: '$7,289.00',
            stock: '16',
            status: 'Envío a domicilio',
            color: '#00ff00'
          }
        ],
        cam: null,
        frame: null,
        image_file: null,
        image_modal: false,
      }
    },
    computed: {
      ...orderController.mapState({
        orders: state => state.orders
      }),
      can_create () {
        return !this.client.name.length
      },
    },
    methods: {
      ...mapActions(['order/all', 'user/get', 'user/update', 'product/get']),
      initCam () {
        let self = this
        this.cam = document.getElementById('cam');
        this.frame = document.getElementById('frame');

        this.cam.addEventListener('change', function(e) {
          self.image_file = e.target.files[0];
          self.frame.src = URL.createObjectURL(self.image_file);
          self.image_modal = true
          self.cam.value = ''
        });
      },
      getClient () {
        let self = this
        this['user/get']({
          id: self.$route.params.client_id,
          callback: res => {
            if(res.error) {
              self.$message.error(res.error)
            } else {
              self.client = Object.assign(self.client, res)
            }
          }
        })
      },
      updateClient () {
        let self = this
        this['user/update']({
          id: self.$route.params.client_id,
          ...self.client
        })
      },
      getProduct () {
        console.log(this.image_file)
        let self = this
        this['product/get']({
          file: this.image_file,
          callback: res => {
            if(res.error) {
              self.$message.error(res.error)
            } else {
              console.log(res)
            }
          }
        })
      }
    },
    mounted () {
      this.initCam()
      this.getClient()
      this['order/all']()
    },
    components: { Avatar }
  }
</script>

<style lang="scss" scoped>
  .product-container {
    overflow-y: scroll;
  }
  .product {
    border: 1px solid #8D8D8D;
    border-radius: 4px;
    padding: 5px;
    margin: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    transition: height 125ms, margin 125ms;
    background: #fff;
    background: linear-gradient(to bottom, #fff 70%, #fafafa 100%);
  }

  .status-box {
    transition: height 125ms, margin 125ms;
    padding: 2px;
  }
</style>
