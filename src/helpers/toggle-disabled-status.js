export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        toggleDisabledStatus (event) {
          if (event && event.target) {
            try {
              let element = $(event.target)

              if (element.is(':disabled')) {
                element.prop('disabled', false)
              } else {
                element.prop('disabled', true)
              }
            } catch (e) {
              console.log(e.message)
            }
          }
        }
      }
    })
  }
}
