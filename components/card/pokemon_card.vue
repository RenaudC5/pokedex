<template>
  <v-card
    elevation="3"
    outlined
  >
    <v-card-title>{{ getName().charAt(0).toUpperCase() + getName().slice(1) }}</v-card-title>
    <v-card-text>
      <version_selector :pokemon="pokemon"/>

      <description :pokemon="pokemon"/>

      <v-spacer></v-spacer>

      <evolution_chain :pokemon="pokemon"/>

      <v-spacer></v-spacer>

    </v-card-text>

    <v-card-actions>
      <v-btn
        color="green lighten-2"
        text
        @click="showStat = !showStat"
      >
        statistiques
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="showStat = !showStat"
      >
        <v-icon>{{ showStat ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>

      <stats v-show="showStat" :stats="pokemon.stats"/>

    </v-expand-transition>

    <v-card-actions>
      <v-btn
        color="green lighten-2"
        text
        @click="showMoves = !showMoves"
      >
        Attaques
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="showMoves = !showMoves"
      >
        <v-icon>{{ showMoves ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>

      <moves v-show="showMoves" :moves="pokemon.moves"/>

    </v-expand-transition>
  </v-card>
</template>

<script>
import moves from "~/components/card/moves";
import stats from "~/components/card/stats";
import description from "~/components/card/description";
import version_selector from "@/components/card/version_selector";
import evolution_chain from "@/components/card/evolution_chain";
import {LANGUAGE} from "@/constants";
export default {
  name: "pokemon_card",
  props:{
    pokemon:Object
  },
  data(){
    return({
      showStat : false,
      showMoves : false,
      language : LANGUAGE
    })
  },
  components:{
    moves,
    stats,
    description,
    version_selector,
    evolution_chain
  },
  methods:{
    getName(){
      return this.pokemon.species.names.find(x => x.language.name === this.language).name;
    }
  }

}
</script>

<style scoped>

</style>
