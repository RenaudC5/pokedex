<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <span>{{team.name}}</span>

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
        <v-col lg="6" sm="12">Pokemon 1</v-col>
        <v-col lg="6" sm="12">Pokemon 2</v-col>
        <v-col lg="6" sm="12">Pokemon 3</v-col>
        <v-col lg="6" sm="12">Pokemon 4</v-col>
        <v-col lg="6" sm="12">Pokemon 5</v-col>
        <v-col lg="6" sm="12">Pokemon 6</v-col>

      </v-row>
    </v-card-text>

    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "team_card",
  props:{
    team:Object
  },
  data : function() {
    return({
      dialog : false
    })
  },
  methods:{
    deleteTeam : function(){
      this.dialog = false
      console.log(this.team)
      this.deleteTeam(this.team.name)
    },
    ...mapActions(["deleteTeam"])
  },

}
</script>

<style scoped>

</style>
