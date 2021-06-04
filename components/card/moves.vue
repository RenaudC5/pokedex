<template>
  <div>
    <v-divider></v-divider>

    <v-card-text>
        <v-data-table
          :headers="headers"
          :items="this.movesLoad"
          :items-per-page="5"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </template>

        </v-data-table>
    </v-card-text>
  </div>
</template>

<script>
import axios from "axios";
import { LANGUAGE } from '@/constants/' //langue pour le nom du pokémon

export default {
  name: "moves",
  props:{
    moves:Array,
  },
  async mounted() {
    this.movesLoad = this.moves.slice();
    for(let move of this.movesLoad){
      move.data = await axios.get(move.move.url).then(res => {
        return res.data
    })

      move.description = move.data.flavor_text_entries.find(x => x.language.name === this.language).flavor_text
      move.name = move.data.names.find(x => x.language.name === this.language).name
    }
  },

  data: function (){
    return({
      language : LANGUAGE,
      //table
      search: '',
      movesLoad : [],
      headers: [
        {
          text: 'Attaques',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Niveau', value: 'version_group_details[0].level_learned_at' }, //TODO : changer ça
        { text: 'Description', value: 'description' },
        { text: 'Précision', value: 'data.accuracy' },
        { text: 'Génération', value: 'data.generation.name'},
        { text: 'Taux de coup critique', value: 'data.meta.crit_rate'},
        { text: 'Puissance', value: 'data.power'},
        { text: 'PP', value: 'data.pp'},
      ],
    })
  }
}
</script>

<style scoped>

</style>
