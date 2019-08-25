<template lang="pug">
  .login-container
    b-container
      b-row.justify-content-center
        b-col(md="5", xl="4", style="text-align:center;")
          b-img.logo(src="https://s3.amazonaws.com/ekt-atap/assets/elektra-com-mx-2.svg")
          h3 Inicia sesión
          .text-help.mb-4 Ingresa con tu correo y contraseña
          b-form(style="text-align:left;")
            b-form-group(label="Correo", label-for="email-input")
              b-form-input(id="email-input", type="email", placeholder="Ingresa tu correo", v-model="form.email", name="Correo", v-validate="'required|email'", :state="validateState('Correo')")
            b-form-group.mb-4(label="Contraseña", label-for="password-input")
              b-form-input(id="password-input", type="password", placeholder="Ingresa tu contraseña", v-model="form.password", name="Contraseña", v-validate="'required|max:20'", :state="errors.has('Contraseña') ? false : null")
              b-form-invalid-feedback {{ errors.first('Contraseña') }}
            b-button.mb-2(variant="info", block, type="submit", :disabled="loading", :to="{name: 'seller'}")
              span.mr-2(v-if="!loading", style="vertical-align:middle;") Iniciar sesión
              b-spinner(v-else, small, type="grow", style="vertical-align:middle;")
          b-link.text-help(style="font-size:13px;") ¿Olvidaste tu contraseña?
</template>

<script>
//import { createNamespacedHelpers } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    login (event) {
      event.preventDefault()
      let self = this

      this.$validator.validate().then(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('auth/login', {
            user: self.form,
            callback: res => {
              self.loading = false
              if (res.error) {
                self.$message.error(res.error)
              } else {
                self.$message.success(`Bienvenido de nuevo, ${res.data.first_name}`)
                self.$router.push({name: 'root'})
              }
            }
          })
        } else {
          self.$message.error('Verifica los datos e intenta de nuevo')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    min-height: 0;
    border-top: 2px solid #DA291C;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo{
    height: 75px;
    margin-bottom: 30px;
    width: auto;
  }
</style>
