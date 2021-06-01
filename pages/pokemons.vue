<template>
  <section class="pokemons">
    <h1>Pokemons ! </h1>

    <v-row >
        <v-col cols="3" md="4" lg="3" sm="6" v-for="(pokemon,index) in pokemons.results" v-bind:key="index">
          <menu_card :pokemon="pokemon"/>
        </v-col>
    </v-row>

  </section>

</template>

<script>
import menu_card from "~/components/card/menu_card";
import axios from "axios";
import {LANGUAGE} from "~/constants";

export default {
  name: "pokemons.vue",
  data() {
    return {
      language : LANGUAGE,
      pokemons: []
    }
  },
  mounted: async function () {
    //https://pokeapi.co/api/v2/pokemon?limit=151
    //"https://pokeapi.co/api/v2/pokemon/" + pokemon.name
    //"https://pokeapi.co/api/v2/pokemon-species/"+pokemonFull.id

    //récupération des pokémons

    /*this.pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then(async res => {

      //ajout des données par rapport au nom
      for(let pokemon of res.data.results){
        pokemon.data = await axios.get(pokemon.url).then(pokemonFull => pokemonFull.data);
      }

      return res.data
    });*/

    console.log("Chargement des pokémmons")
    this.pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151").then(async res => {
      console.log("Chargement des données")
      //récupération des données sur le pokemon
      for (let pokemon of res.data.results){
        pokemon.data = await axios.get(pokemon.url).then(res => res.data);
      }

      //récupération des données sur son espèce (dont le nom)

      console.log("Chargement des espèces")
      for (let pokemon of res.data.results){
        pokemon.data.species = await axios.get(pokemon.data.species.url).then(res => {
          let species = res.data;
          pokemon.name_new = species.names.find(x => x.language.name === this.language).name
          return species
        });
      }

      return res.data;
    })


  },
  components:{
    menu_card
  }
}
</script>

<style scoped>

</style>
