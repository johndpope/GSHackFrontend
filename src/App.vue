<template lang="pug">
  #app
    router-view
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Rubik:400,500,700');

html, body {
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  overflow-y: auto;
}

#app {
  min-width: 100vw;
  min-height: 100vh;
}
</style>
