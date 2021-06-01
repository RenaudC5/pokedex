<template>
  <article v-if="Object.keys(pokemon).length === 0">
    <h1>{{this.name}}</h1>
  </article>
  <article v-else>
    <h1>{{pokemon.name}}</h1>

    <pokemon_card :pokemon="pokemon"/>


  </article>

</template>

<script>
import { LANGUAGE } from '@/constants/' //langue pour le nom du pokémon
import pokemon_card from "~/components/card/pokemon_card";
import axios from 'axios'
export default {
  name: "pokemon",
  async asyncData({ params }) {
    const name = params.pokemon
    return { name }
  },

  data() {
    return {
      pokemon: {},
      language : LANGUAGE
    }
  },
  mounted: async function () {
    //recuperation du pokemon
    //https://pokeapi.co/api/v2/pokemon/' + this.name
    //https://pokeapi.co/api/v2/pokemon-species/"+pokemon.id
    this.pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + this.name).then(async res => {
      let pokemon = res.data
      pokemon.species = await axios.get("https://pokeapi.co/api/v2/pokemon-species/"+pokemon.id).then(res => res.data)
      pokemon.name = pokemon.species.names.find(x => x.language.name === this.language).name
      return pokemon
    })
    },
  components:{
    pokemon_card
  }
}
</script>

<style scoped>

</style>
