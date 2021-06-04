<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <section class="self-align-center">
        <span class="team-index">{{teamIndex}}</span>
         -
        <span>{{team.name}}</span>
      </section>

        <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Supprimer
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Supression de la team
            </v-card-title>
            <v-card-text>Êtes vous sûr de vouloir supprimer cette équipe ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Non
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="deleteTeam"
              >
                Oui
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col lg="6" v-for="(pokemon,index) of team.pokemons" :key="index">
          <team_pokemon :pokemon="pokemon" :team="team"/>
        </v-col>


      </v-row>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn
        color="green"
        elevation="1"
        large
        @click="randomizeTeam">
      >
        Aléatoire
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapState} from "vuex";
import team_pokemon from "@/components/team/team_pokemon";

export default {
  name: "team_card",

  computed : mapState(['teams/data']),
  data : function() {
    return({
      dialog : false
    })
  },
  methods:{
    deleteTeam : function(){
      this.dialog = false
      this.$store.dispatch("teams/deleteSingleTeam",this.teamIndex)
      this.$store.dispatch("utilities/updateSnack",{text : `Team ${this.team.name} suprimée`, color:"red"})
    },
    randomizeTeam : function (){
      let pokemons = [...this.$store.state.pokemons.data]

      let randomNumber = []
      let keys = Array.from(Array(pokemons.length).keys())
      for(let i=0; i< 6; i++){
        let random = Math.floor(Math.random() * keys.length);
        randomNumber.push(keys[random])
        keys.splice(random,1);
      }

      let randomPokemons = randomNumber.map(x => pokemons[x]);

      this.$store.dispatch("teams/setTeam",{pokemons : randomPokemons, teamIndex : this.teamIndex})

    }
  },
  components:{
    team_pokemon
  },
  props:{
    team:Object,
    teamIndex : Number
  },

}
</script>

<style scoped>
  .team-index{
    font-size: 3rem;
  }
</style>
