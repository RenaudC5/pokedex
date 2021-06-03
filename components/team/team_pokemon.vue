<template>
  <v-card>
    <v-card-title>{{pokemon.name}}</v-card-title>
    <v-card-text> <img :src="pokemon.data.sprites.front_default" alt="Pokemon vue de devant"/></v-card-text>
    <v-card-actions>
      <v-btn
        elevation="2"
        color="red"
        @click="removePokemonSingle">
        Retirer
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import {mapActions} from "vuex";
import add_team from "@/components/team/add_team";

export default {
  name: "team_pokemon",
  props:{
    pokemon: Object,
    team : Object
  },
  methods:{
    removePokemonSingle : function (){
      this.removePokemon({team:this.team, pokemon:this.pokemon})
      console.log(this)
    },
    ...mapActions("teams",["removePokemon"])
  },
  components:{
    add_team
  }

}
</script>

<style scoped>

</style>
