<template lang="pug">
  b-navbar.back-yellow.light-bar.bb-1
    b-container(fluid)
      b-navbar-nav.mr-3
        b-nav-item.d-lg-none
          menu-icon(@click="toggleSidenav('sidenav-close-button', 'open', !isSidenavOpen)")
        b-nav-item.d-none.d-lg-block
          menu-icon(@click="toggleSidenav('sidenav-close-button', 'close', false)", v-if="isSidenavClose")
          bar-chart-icon.sidenav-button(@click="toggleSidenav('sidenav-close-button', 'close')", v-else)
      b-navbar-brand.mr-auto(:to="{name: 'root'}")
        img.toolbar-logo(src="https://s3.amazonaws.com/ekt-atap/assets/elektra-com-mx-2.svg", style="margin-top:3.5px;")
      b-navbar-nav.ml-auto.d-none.d-md-block
        b-nav-item.mt-1(:to="{name: 'logout'}") Cerrar sesión
</template>

<script>
export default {
  mounted () {
    // FOCUS SEARCH INPUT ON CTRL (CMD) + F
    // window.addEventListener("keydown",function (e) {
    //   if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
    //     e.preventDefault();
    //     document.getElementById('toolbarSearch').focus()
    //   }
    // })
  }
}
</script>

<style lang="css" scoped>

  .back-yellow {
    background-color: #FFDC20;
    color: #2E2E2E !important;
  }

  .light-bar {
    background: white;
    padding: 13px 16px;
  }

  .toolbar-logo {
    width: auto;
    height: 35px;
    object-fit: scale-down;
  }

  .sidenav-button {
    transform: rotate(90deg) scaleX(-1);
  }
</style>
