<template>
  <section class="pokemons">
    <section class="pokemon-list">
    <v-row>
      <v-col md="9">
        <v-text-field
          label="Pokemon"
          placeholder="Search..."
          v-model="pokemon_search"
          @keydown="resetPage"

        ></v-text-field>
      </v-col>

      <v-col md="3">
        <v-select
          :items="generations"
          label="Génération"
          v-model="currentGen"
          @change="resetPage"
        ></v-select>
      </v-col>

    </v-row>
    <v-row >
        <v-col cols="3" md="4" lg="3" sm="6"
               v-for="(pokemon,index) in getList()"
               v-bind:key="index"
        >
          <menu_card :pokemon="pokemon"/>
        </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="decrementList"
        >
          <v-icon dark>
            mdi-arrow-left-bold-outline
          </v-icon>
        </v-btn>
      </v-col>

      <v-col class="d-flex justify-center align-center">

        <p>
          <span>{{$store.state.utilities.data.pagination.list_start}}</span>
          -
          <span v-if=" $store.state.utilities.data.pagination.list_end < this.$store.getters['pokemons/getNbPokemons']">{{$store.state.utilities.data.pagination.list_end}}</span>
          <span v-else>{{this.$store.getters["pokemons/getNbPokemons"]}}</span>
        </p>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="incrementList"
        >
          <v-icon dark>
            mdi-arrow-right-bold-outline
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <template>
          <v-progress-linear :value="$store.state.utilities.data.pagination.list_end/ this.$store.getters['pokemons/getNbPokemons']*100"></v-progress-linear>
        </template>
      </v-col>
    </v-row>

  </section>

    <v-divider class="mt-4"></v-divider>

    <team_menu/>

  </section>

</template>

<script>
import menu_card from "~/components/card/menu_card";
import team_menu from "~/components/team/team_menu";

import {LANGUAGE} from "~/constants";

import {mapState} from 'vuex'

export default {
  name: "pokemons.vue",
  data() {
    return {
      language : LANGUAGE,
      pokemon_search : "",
      generations : [],
      currentGen : ""
    }
  },
  beforeUpdate() {
    this.getGeneration()
  },
  beforeMount: function () {
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

    /*console.log("Chargement des pokémmons")
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

      return res.data.results;
    })*/

    //first requets
    /*let request = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${this.list_step}`
    let end = false;
    let nbTour = 0;
    while(!end && nbTour >= 0){
      let res = await this.loadPokemonData(request);
      console.log("res")
      console.log(res)

      nbTour -=1;
      this.$store.commit("addPokemons",res.results)

      end = !res.next ;
      request = res.next
    }*/


  },

  mounted() {
    this.getGeneration()
    console.log(this.$store.state.pokemons.data)
  },
  computed : mapState(['pokemons/data']),
  methods:{
    incrementList : function (){
      this.$store.dispatch("utilities/incrementList",this.$store.getters["pokemons/getNbPokemons"])
    },

    decrementList : function (){
      this.$store.dispatch("utilities/decrementList")
    },

    getName : function (x) {
      if(x.data.species.names){
        return x.data.species.names.find(x => x.language.name === this.language).name
      } else {
        return x.name;
      }
    },
    resetPage: function () {
      console.log("resetPage")
      this.$store.dispatch("utilities/resetList")
    },
    getList : function () {
      let names =  this.$store.state.pokemons.data.filter(x => this.getName(x).toLocaleLowerCase().indexOf(this.pokemon_search.toLocaleLowerCase()) !== -1)

        if(this.currentGen !== "Toutes les générations" && this.currentGen !== ""){
          names = names.filter(x => x.data.generation.generation.name === this.currentGen)

        }

        return names.slice(this.$store.state.utilities.data.pagination.list_start,this.$store.state.utilities.data.pagination.list_end)
    },
    getGeneration : function () {
      this.generations =  ["Toutes les générations",...new Set( this.$store.state.pokemons.data.reduce((a, c) => [...a, c.data.generation.generation.name], []))];

    }
    //...mapActions("pokemons",["getPokemons"])
  },
  components:{
    menu_card,
    team_menu
  }
}
</script>

<style scoped>

</style>
