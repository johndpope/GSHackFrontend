export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          recentOrganizations: [],
          recentAccounts: [],
          recentPlatforms: []
        }
      },
      methods: {
        cookieSetRecent (key, object, resource) {
          let recent = this.$getCookie(key) || []
          let index = recent.findIndex(item => item[resource + '_id'] == object[resource + '_id'])
          if (index >= 0) {
            recent[index].visit_count ? recent[index].visit_count ++ : recent[index].visit_count = 1
            recent.splice(0, 0, recent.splice(index, 1)[0])
          } else {
            object.visit_count = 1
            recent.unshift(object)
          }

          this.$setCookie(key, recent)
        },
        cookieGetRecents (key) {
          return Array.isArray(this.$getCookie(key)) ? this.$getCookie(key).sort((a, b) => b.visit_count - a.visit_count) : []
        }
      }
    })
  }
}
