<template>
  <v-card>
    <v-card-title>{{pokemon.data.species.names.find(x => x.language.name === this.language).name}}</v-card-title>
    <v-card-text> <img :src="pokemon.data.sprites.front_default" alt="Pokemon vue de devant"/></v-card-text>
    <v-card-actions class="justify-end">
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
import snackbar from "@/components/snackbar";
import {LANGUAGE} from "@/constants";

export default {
  name: "team_pokemon",
  props:{
    pokemon: Object,
    team : Object
  },
  data: function (){
    return{
      language:LANGUAGE
    }
  },
  methods:{
    removePokemonSingle : function (){
      this.removePokemon({team:this.team, pokemon:this.pokemon})
      let text = `${this.pokemon.data.species.names.find(x => x.language.name === this.language).name} à été retiré de l'équipe`
      this.$store.dispatch("utilities/updateSnack",{text : text, color:"blue"})
    },
    ...mapActions("teams",["removePokemon"])
  },
  components:{
    add_team,
    snackbar
  }

}
</script>

<style scoped>

</style>
