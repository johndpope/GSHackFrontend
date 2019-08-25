<template lang="pug">
  b-container
    .d-flex.align-items-center.justify-content-evenly.mt-2
      Avatar.mx-2(:size="'xl'", :src="'https://scontent-qro1-1.xx.fbcdn.net/v/t1.0-1/p100x100/61589514_1886459874789225_8612030699794333696_n.jpg?_nc_cat=102&_nc_oc=AQnKUDKgUkolo6GCOY0jb3g3FikF-aEsMMMj9JoP0Vl6JVcp784AGFcFW8dWsyLd_hs&_nc_ht=scontent-qro1-1.xx&oh=2bb22dfa6b79bbd12bcd53143089779f&oe=5E0E98FD'")
      .text-center(style="flex:1")
        h4(style="overflow-wrap:break-word;flex: 1;") {{client.data.name}}
        h4 {{client.data.telephone}}
        h5.text-center {{client.data.address}}
        h5.text-center {{status}}

    div.my-2(style="text-align:right")
      b-button.mr-1(pill, variant="info", v-show="parsed_order.length") Cobrar
      b-button.mr-1(pill, variant="success", @click="cam.click()") Agregar Producto
      b-button(pill, variant="secondary", @click="client_dialog = true")
        v-icon.icon-button(name="users-cog", scale="1.5")
    h4.text-center Poductos en carrito
    .product-container
      .product.p-3(v-for="(product, index) in parsed_order", :key="product.id")
        x-icon(style="float:right")
        h5.text-center {{product.name}}
        h6.text-center Ref: {{product.RefId}}
    empty-message(v-if="!parsed_order.length", message="No productos aún")

    b-modal(v-model="client_dialog", centered, title="Actualizar información", cancel-title="Cancelar", ok-title="Actualizar", ok-variant="success", :ok-disabled="can_create", @ok="updateClient")
      b-container(fluid)
        label Nombre:
        b-form-input.mb-2(v-model="client.name" placeholder="Nombre")
        label Teléfono:
        b-form-input.mb-2(v-model="client.telephone" placeholder="Télefono")
        label Drección:
        b-form-textarea.mb-2(v-model="client.address" placeholder="Drección")

    b-modal(v-model="image_modal", centered, title="Agregar producto", cancel-title="Cancelar", ok-title="Enviar", ok-variant="success", @ok="loadFile")
      b-container(fluid)
        img(id="frame", style="width:100%;object-fit: contain;")
    input(type="file", accept="image/*", capture="camera", id="cam", style="display:none")

</template>

<script>
  import { createNamespacedHelpers, mapActions } from 'vuex'
  const orderController = createNamespacedHelpers('order')
  const productController = createNamespacedHelpers('product')
  import { UploadFile } from '../helpers/upload-file'
  import Avatar from '../components/Avatar.vue'
  export default {
    data () {
      return {
        client: {
          id: '',
          data: {}
        },
        client_dialog: false,
        cam: null,
        frame: null,
        image_file: null,
        image_modal: false,
        items: [],
        order_id: '',
        status: '',
      }
    },
    computed: {
      ...orderController.mapState({
        orders: state => state.orders
      }),
      ...productController.mapState({
        products: state => state.products
      }),
      can_create () {
        return this.client.data.name && !this.client.data.name.length
      },
      parsed_order () {
        return this.items.map(i => {
          i.description = i.LinkId
          i.name = i.Name
          i.ref = i.RefId
          return i
        })
      }
    },
    methods: {
      ...mapActions(['order/all', 'user/get', 'user/update', 'product/addProduct', 'product/get', 'helpers/upload_file']),
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
              let order = self.orders.find(o => o.data.idUser == self.$route.params.client_id)
              if(order) {
                console.log('order', order)
                self.order_id = order.id
                self.status = order.data.status
                self.items = order.data.items
              } else console.log('no se encontro orden')
            }
          }
        })
      },
      getOrder () {
        let self = this
        this['order/get']({
          id: self.$route.params.client_id,
          callback: res => {
            if(res.error) {
              self.$message.error(res.error)
            } else {
              self.order = Object.assign(self.order, res)
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
      async loadFile () {
        try {
          this.image_file = await UploadFile.call(this, this.image_file)
          console.log(this.image_file)
          //this.addProduct()
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      async addProduct () {
        console.log(this.image_file)

        let self = this
        let imagen = { url: self.image_file }

        this['product/addProduct']({
          imagen: imagen,
          idOrder: self.order.id,
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
      this['order/all']()
      this.$nextTick(() => {
        this.getClient()
      })
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
