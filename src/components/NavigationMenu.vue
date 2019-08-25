<template lang="pug">
  .navigation-menu
    .close-button.d-lg-none(@click="toggleSidenav('sidenav-close-button', 'open', false)")
      x-icon
    .section-title
      span {{ account.name }}
      span.sub.subtitle {{ organization.name }}
    .navigation-ul
      router-link.navigation-li(v-for="(route, index) in plugins", :to="{name: route.name, params: route.params || {}}", :key="index", v-if="route.icon && route.menu_name && route.resource_name && $can('read', route.resource_name)")
        .d-flex.align-items-center
          component.mr-3.icon-md(:is="route.icon")
          span {{ route.menu_name }}
      router-link.navigation-li.mt-4(:to="{name: 'root'}")
        .d-flex.align-items-center
          log-out-icon.icon-md.mr-3
          span Salir
</template>

<script>
import { createNamespacedHelpers, mapActions } from 'vuex'
const accountController = createNamespacedHelpers('account')
const organizationController = createNamespacedHelpers('organization')

export default {
  data () {
    return {

    }
  },
  computed: {
    ...accountController.mapState({
      account: state => state.account
    }),
    ...organizationController.mapState({
      organization: state => state.organization,
      plugins: state => state.plugins
    })
  },
  methods: {
    ...mapActions(['organization/get', 'account/get', 'organization/plugins']),
    getOrganization () {
      let self = this

      this['organization/get']({
        organization_id: self.account.organization_id
      })
    },
    getAccount () {
      let self = this

      this['account/get']({
        account_id: self.$route.params.account_id,
        callback: res => {
          if (res.success) {
            self.getOrganization()
            self.getOrganizationPlugins()
          }
        }
      })
    },
    getOrganizationPlugins () {
      let self = this

      this['organization/plugins']({
        organization_id: self.account.organization_id,
        callback: res => {
          self.scrollToActiveElement()
        }
      })
    },
    scrollToActiveElement () {
      this.$nextTick(() => {
        let active = $('.navigation-menu .navigation-ul .navigation-li.router-link-exact-active')[0]
        if (active) {
          active = $(active)
          $('.sidenav').scrollTop(0)
          if ($(document).width() > 991) {
            $('.sidenav').scrollTop(active.offset().top - 54 - 10)
          } else {
            $('.sidenav').scrollTop(active.offset().top - 54)
          }
        }
      })
    }
  },
  mounted () {
    // scroll to active element on create
    this.getAccount()
  }
}
</script>

<style lang="scss" scoped>
  .navigation-menu {
    z-index: 1;
    width: 100%;
    min-height: 100%;
    background-color: white;

    & > *:not(:last-child) {
      padding-bottom: 0 !important;
    }

    .close-button {
      display: block;
      text-align: right;
      cursor: pointer;
      padding: 30px;
    }

    .section-title {
      display: flex;
      flex-flow: column;
      font-size: 20px;
      font-weight: 500;
      padding: 30px;

      span:not(:last-child) {
        margin-bottom: 5px;
      }

      .sub {
        font-size: initial;
        font-weight: 400;
      }
    }

    .navigation-ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      padding: 30px 0;

      .navigation-li {
        cursor: default;
        padding: 10px 30px;
        display: block;
        text-decoration: none;
        color: #6e84a3 !important;
        border-left: 2px solid transparent;

        .navigation-icon {
          margin-right: 10px;
        }

        &:hover, &.router-link-exact-active {
          color: black !important;
          border-left: 2px solid #0e5ccf;
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
