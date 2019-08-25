<template lang="pug">
  .sidenav(:class="{'is-open': isSidenavOpen, 'is-close': isSidenavClose}")
    .sidenav-background.d-lg-none(v-if="isSidenavOpen", @click="toggleSidenav('sidenav-background', 'open', false)")
    NavigationMenu
</template>

<script>
import NavigationMenu from './NavigationMenu.vue'

export default {
  components: { NavigationMenu },
  watch: {
    '$route' (to, from) {
      this.toggleSidenav('sidenav-route-changed', 'open', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidenav {
    width: 250px;
    overflow-y: auto;
    flex: 0 0 250px;
    border-right: 1px solid #e3ebf6;
    z-index: 10;
    background-color: white;

    position: fixed;
    top: 0;
    bottom: 0;
    left: -250px;
    transition: 0.5s;

    .sidenav-background {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -5;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 992px) {
    .sidenav {
      &.is-open {
        left: 0 !important;
        display: block !important;
      }
    }
  }

  @media (min-width: 993px) {
    .sidenav {
      left: 0;

      &.is-open {
        left: 0 !important;
      }

      &.is-close {
        left: -250px !important;
      }
    }
  }
</style>
