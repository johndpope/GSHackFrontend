export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        clearObject (object, options = {}) {
          for (let item in object) {
            switch (typeof(object[item])) {
              case 'string':
                object[item] = options.string !== undefined ? options.string : ''
                break;
              case 'number':
                object[item] = options.number !== undefined ? options.number : 0
                break;
              case 'boolean':
                object[item] = options.boolean !== undefined ? options.boolean : false
                break;
              default:
                if (Array.isArray(object[item])) {
                  object[item] = options.array !== undefined ? options.array : []
                } else if (object[item] instanceof Object) {
                  object[item] = options.object !== undefined ? options.object : {}
                } else {
                  object[item] = ''
                }
            }
          }

          return object
        }
      }
    })
  }
}
