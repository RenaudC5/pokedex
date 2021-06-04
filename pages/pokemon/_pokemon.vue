<template>
  <article v-if="Object.keys(pokemon).length === 0">
  </article>
  <article v-else>

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

    if(this.$store.state.pokemons){
      let pokemonStored = this.$store.state.pokemons.data.find(x => x.name === this.name)
      if(pokemonStored && this.pokemon){
        this.pokemon = Object.assign({},pokemonStored);
        this.pokemon = this.pokemon.data
      } else {
        this.loadPokemon();
      }
    } else {
      this.loadPokemon();
    }
    },
  components:{
    pokemon_card
  },
  methods: {
    async loadPokemon(){
      this.pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/" + this.name).then(async res => {
        let pokemon = res.data
        pokemon.species = await axios.get("https://pokeapi.co/api/v2/pokemon-species/"+pokemon.id).then(async res => {
          let data = res.data
          data.evolution_chain.data = await axios.get(data.evolution_chain.url).then(res => res.data);
          return data
        });
        pokemon.name = pokemon.species.names.find(x => x.language.name === this.language).name
        return pokemon
      })
    }
  }
}
</script>

<style scoped>

</style>
