<template>
  <v-row class="d-flex justify-space-between">
    <v-col>
      <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
          :disabled="$store.getters.getNbteams === max_teams"
        >
          Ajouter une équipe
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Ajouter une team</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nom de l'équipe"
                  v-model="team_name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Fermer
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveTeam"
          >
            Sauvegarder
          </v-btn>
        </v-card-actions>
        <v-alert
          v-show="error"
          color="red"
          elevation="24"
          type="error"
        >Ce nom d'équipe existe deja !</v-alert>
      </v-card>
    </v-dialog>
    </v-col>

    <v-col class="text-right">{{this.$store.getters["teams/getNbteams"]}} / {{max_teams}}</v-col>
  </v-row>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "add_team",
  data:function (){
    return({
      dialog: false,
      team_name : "",
      error : false,
      max_teams: 6
    })
  },
  methods:{
    saveTeam() {
      //on regarde si le nom de l'équipe existe deja
      if(this.$store.state.teams.data.find(x => x.name === this.team_name)){
        this.error = true;
      } else{
        this.dialog = false
        this.error = false;

        let date = new Date();
        console.log("AddTeam method")
        console.log(date.toLocaleTimeString())
        console.log(date.getMilliseconds())

        this.addTeam(this.team_name)
        this.team_name = ""
      }

    },
    ...mapActions("teams",["addTeam"])
  },

}
</script>

<style scoped>

</style>
