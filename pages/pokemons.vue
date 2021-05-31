<template>
  <section class="pokemons">
    <h1>Pokemons ! </h1>
    <div v-for="(pokemon,index) in pokemons.results" v-bind:key="index">
      <h2><a :href="pokemon.url">{{ pokemon.name }}</a></h2>
    </div>


  </section>

</template>

<script>
export default {
  name: "pokemons.vue",
  data() {
    return {
      pokemons: []
    }
  },
  async fetch() {
    this.pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(pokemons =>
      pokemons.json()
    )
  }
}
</script>

<style scoped>

</style>
