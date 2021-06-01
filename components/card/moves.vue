<template>
  <div>
    <v-divider></v-divider>

    <v-card-text>
        <v-data-table
          :headers="headers"
          :items="moves"
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
    moves:Array
  },
  async mounted() {
    for(let move of this.moves){
       move.move = await axios.get(move.move.url).then(res => {
        return res.data
    })
      move.description = move.move.flavor_text_entries.find(x => x.language.name === this.language).flavor_text
      move.name = move.move.names.find(x => x.language.name === this.language).name
    }
  },

  data: function (){
    return({
      language : LANGUAGE,
      //table
      search: '',
      headers: [
        {
          text: 'Attaques',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Niveau', value: 'version_group_details[0].level_learned_at' }, //TODO : changer ça
        { text: 'Description', value: 'description' },
        { text: 'Précision', value: 'move.accuracy' },
        { text: 'Génération', value: 'move.generation.name'},
        { text: 'Taux de coup critique', value: 'move.meta.crit_rate'},
        { text: 'Puissance', value: 'move.power'},
        { text: 'PP', value: 'move.pp'},
      ],
    })
  }
}
</script>

<style scoped>

</style>
