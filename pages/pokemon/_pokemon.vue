<template>
  <h1>{{ this.name }}</h1>
</template>

<script>
export default {
  name: "pokemon",
  async asyncData({ params }) {
    const name = params.pokemon // When calling /abc the slug will be "abc"
    return { name }
  }
}
</script>

<style scoped>

</style>
