<template lang="pug">
  b-navbar.back-yellow.light-bar.bb-1(toggleable="lg")
    b-container
      b-navbar-toggle.mr-auto.burger-menu(target="navbar-collapse")
        menu-icon
      b-navbar-brand.mr-auto(:to="{name: 'root'}")
        img.toolbar-logo(src="https://s3.amazonaws.com/ekt-atap/assets/elektra-com-mx-2.svg")
      b-navbar-nav.d-none.d-lg-block
        b-nav-item(:to="{name: 'logout'}") Cerrar sesión
      b-navbar-nav.d-lg-none.invisible
        b-nav-text HH
      b-collapse.order-lg-first(id="navbar-collapse", is-nav, style="flex-grow: inherit;")
        b-navbar-nav
          //- b-nav-form.justify-content-center
          //-   b-col(cols="auto").px-0
          //-     search-icon.text-help.icon-sm(style="margin-bottom:2px;")
          //-   b-col.pr-0
          //-     b-form-input.form-control-flush.search.toolbar-search#toolbarSearch(type="search", placeholder="Buscar")
          b-nav-item.d-lg-none(:to="{name: 'logout'}") Cerrar sesión
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
  .light-bar {
    background: white;
    padding: 13px 16px;
  }

  .navbar-collapse:before {
    content: "";
    display: block;
    border-top-width: 1px;
    border-top-style: solid;
    margin: .75rem -1rem;
    border-top-color: #e3ebf6;
  }

  .burger-menu {
    border: transparent;
    outline: none !important;
    padding: 0;
  }

  .toolbar-logo {
    width: auto;
    height: 35px;
    object-fit: scale-down;
  }

  .toolbar-search {
    width: 100% !important;
  }

  .back-yellow {
    background-color: #FFDC20;
    color: #2E2E2E !important;
  }

  @media (min-width: 992px) {
    .toolbar-search {
      width: 100px !important;
    }

    .navbar-collapse:before {
      display: none;
    }
  }
</style>
