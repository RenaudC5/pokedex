<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <NuxtLink :to="'/pokemon/'+pokemon.name">{{this.getName()}}</NuxtLink>
      <img :src="pokemon.data.sprites.front_default" v-if="pokemon.data && pokemon.data.sprites" alt="figure du pokemon vue de face">
    </v-card-title>

    <v-card-text>

    </v-card-text>

    <v-card-actions>
      <v-menu
        top
        :offset-y="true"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            Ajouter
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(team, index) in $store.state.teams"
            :key="index"
          >
            <v-list-item-title>{{ team.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>


  </v-card>
</template>

<script>
import {LANGUAGE} from "~/constants";

export default {
  name: "menu_card",
  methods:{
    reserve : function (){
    },
    getName: function (){
      if(this.pokemon.data.species.names){
        return this.pokemon.data.species.names.find(x => x.language.name === this.language).name;
      } else {
        return this.pokemon.name
      }

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
      language: LANGUAGE,
    })
  }
}
</script>

<style scoped>

</style>
