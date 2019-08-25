<template lang="pug">
  b-row.align-items-center.justify-content-center
    b-col.text-center(lg="8")
      h4.text-help.my-4 {{ message }}
</template>

<script>
export default {
  name: 'EmptyMessage',
  props: {
    message: {
      type: String,
      default: 'No hay elementos'
    }
  }
}
</script>
