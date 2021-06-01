<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <NuxtLink :to="'/pokemon/'+pokemon.name">{{this.getName()}}</NuxtLink>
      <img :src="pokemon.data.sprites.front_default" v-if="pokemon.data && pokemon.data.sprites" alt="figure du pokemon vue de face">
    </v-card-title>

    <v-card-text>

    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >+</v-btn>
    </v-card-actions>


  </v-card>
</template>

<script>
import axios from "axios";
import {LANGUAGE} from "~/constants";

export default {
  name: "menu_card",
  methods:{
    reserve : function (){
    },
    getName: function (){
      return this.pokemon.data.species.names.find(x => x.language.name === this.language).name;
    }
  },
  props:{
    pokemon:Object
  },
  async mounted() {
    //this.pokemon = await axios.get(this.pokemon.url).then(res => res.data);
  },

  data : function () {
    return({
      language: LANGUAGE
    })
  }
}
</script>

<style scoped>

</style>
