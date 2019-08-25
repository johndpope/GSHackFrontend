export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          pagination_page: 1,
          pagination_limit: 20,
          pagination_hasNextPage: false,
          pagination_page_sizes:[25, 50, 100, 200, 300]
        }
      },
      computed: {
        paginationCount () {
          if (this.pagination_hasNextPage) {
            return (this.pagination_page + 1) * this.pagination_limit
          } else {
            return this.pagination_page * this.pagination_limit
          }
        },
        paginationParams () {
          return {
            page: this.pagination_page,
            limit: this.pagination_limit
          }
        }
      },
      methods: {
        paginationPositionChange (current_page, method_name, reset) {
          this.pagination_hasNextPage = false
          if (reset) this.resetPagination()
          if (method_name && typeof method_name == 'string' && method_name.length) {
            try {
              this[method_name]()
            } catch (e) {
              console.error(e)
            }
          }
        },
        resetPagination () {
          this.pagination_page = 1
          this.pagination_hasNextPage = false
        },
        paginationIndex (index) {
          return (this.pagination_page * this.pagination_limit) + (index + 1) - this.pagination_limit
        },
        parseResponseForPaginationData (res) {
          this.pagination_hasNextPage = res.hasNextPage || false
          if (this.pagination_hasNextPage) this.pagination_page ++
        }
      },
      watch: {
        '$route' () {
          this.resetPagination()
        }
      }
    })
  }
}
