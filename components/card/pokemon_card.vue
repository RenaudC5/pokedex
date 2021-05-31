<template>
  <v-card
    elevation="3"
    outlined
  >
    <v-card-title>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</v-card-title>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >

      </v-row>

      <div class="my-4 subtitle-1">
        <p v-if="pokemon.species.is_baby">Bébé pokemon !</p>
        <p v-if="pokemon.species.is_legendary">Pokémon légendaire !</p>
        <p v-if="pokemon.species.is_mythical">Pokémon mythique</p>
      </div>
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
      <div v-show="showStat">
        <v-divider></v-divider>

        <v-card-text>
          Stats
        </v-card-text>
      </div>


    </v-expand-transition>

    <v-card-actions>
      <v-btn
        color="green lighten-2"
        text
        @click="showMoves = !showMoves"
      >
        Moves
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
      <div v-show="showMoves">
        <v-divider></v-divider>

        <v-card-text>
          Attaques
        </v-card-text>
      </div>


    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "card",
  
}
</script>

<style scoped>

</style>
