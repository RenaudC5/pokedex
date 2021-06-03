<template>
  <div>
    <div class="d-flex justify-sm-space-between">
      <div class="align-md-center">
        <img :src="pokemon.sprites.front_default" alt="pokemon vue de devant"/>
        <img :src="pokemon.sprites.back_default" alt="pokemon vue de derrière"/>
      </div>
      <div class="align-md-center">
        <img :src="pokemon.sprites.front_shiny" alt="pokemon shiny vue de devant"/>
        <img :src="pokemon.sprites.back_shiny" alt="pokemon shiny vue de derrière"/>
      </div>
    </div>

    <div class="my-4 subtitle-1">
      <p v-if="pokemon.species.is_baby">Bébé pokemon !</p>
      <p v-if="pokemon.species.is_legendary">Pokémon légendaire !</p>
      <p v-if="pokemon.species.is_mythical">Pokémon mythique</p>
    </div>

    <p>{{ pokemon.species.genera.find(x => x.language.name === this.language).genus}}</p>

    <!-- <p>{{pokemon.species.flavor_text_entries.filter(x => x.language.name === this.language).map(x => x.version.name+" - "+x.flavor_text).join("\n")}}</p> -->

    <v-row>
      <v-col class="col-md-3 ">
        <strong>Version</strong>
      </v-col>
      <v-col class="col-md-9">
        <strong>Texte</strong>
      </v-col>
    </v-row>
    <v-row v-for="(text,index) of pokemon.species.flavor_text_entries.filter(x => x.language.name === this.language)" v-bind:key="index">
      <v-col class="col-md-3 "><strong>{{text.version.name}}</strong></v-col>
      <v-col class="col-md-9">{{text.flavor_text}}</v-col>
    </v-row>


  </div>

</template>

<script>
import axios from "axios";
import { LANGUAGE } from '@/constants/' //langue pour le nom du pokémon

export default {
  name: "description",
  props:{
    pokemon : Object
  },
  data: function (){
    return({
      language : LANGUAGE
    })
  },
  async mounted() {
    //type du pokemon
    for (let type of this.pokemon.types){
      type.type = await axios.get(type.type.url).then(res => res.data)
      type.name = type.type.names.find(x => x.language.name === this.language).name
    }
  },
  methods:{
    getTypes: function () {
      return this.pokemon.types.map(x => x.name).join("/");
    }
  }
}
</script>

<style scoped>

</style>
