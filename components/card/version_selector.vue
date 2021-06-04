<template>
  <v-row>
    <v-col>
      <v-select
        :items="pokemon.game_indices"
        :value="$store.state.version.version"
        item-text="version.name"
        label="Version"
        @change="changeVersion">
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "version_selector",
  methods:{
    changeVersion(version){
      this.$store.dispatch("version/updateVersion",version)
    }
  },
  props:{
    pokemon:Object
  }
}
</script>

<style scoped>

</style>
