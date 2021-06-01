<template>
  <div>
    <v-divider></v-divider>

    <v-card-text>

      <v-row
        class="mb-3 lg-4 sm-3 xs-2 stats"
      >

        <v-col
          clas="md-4">
            Statistique
        </v-col>
        <v-col
          clas="md-4">
          Statistique de base
        </v-col>

        <v-col
          clas="md-4">
          Effort
        </v-col>

      </v-row>

      <v-row
        class="mb-3 lg-4 sm-3 xs-2 stats"
      >

        <v-col
          clas="md-4">
          Point de vie
        </v-col>
        <v-col
          clas="md-4">
          {{ this.getStats("hp") }}
        </v-col>

        <v-col
          clas="md-4">
          {{ this.getEffort("hp") }}
        </v-col>

      </v-row>

      <v-row
        class="mb-3 lg-4 sm-3 xs-2 stats"
      >

        <v-col
          clas="md-4">
          Attaque
        </v-col>
        <v-col
          clas="md-4">
          {{ this.getStats("attack") }}
        </v-col>

        <v-col
          clas="md-4">
          {{ this.getEffort("attack") }}
        </v-col>
      </v-row>

        <v-row
          class="mb-3 lg-4 sm-3 xs-2 stats"
        >

          <v-col
            clas="md-4">
            Défense
          </v-col>
          <v-col
            clas="md-4">
            {{ this.getStats("defense") }}
          </v-col>

          <v-col
            clas="md-4">
            {{ this.getEffort("defense") }}
          </v-col>

        </v-row>

        <v-row
          class="mb-3 lg-4 sm-3 xs-2 stats"
        >

          <v-col
            clas="md-4">
            Attaque spé.
          </v-col>
          <v-col
            clas="md-4">
            {{ this.getStats("special-attack") }}
          </v-col>

          <v-col
            clas="md-4">
            {{ this.getEffort("special-attack") }}
          </v-col>

        </v-row>

        <v-row
          class="mb-3 lg-4 sm-3 xs-2 stats"
        >

          <v-col
            clas="md-4">
            Défense spé.
          </v-col>
          <v-col
            clas="md-4">
            {{ this.getStats("special-defense") }}
          </v-col>

          <v-col
            clas="md-4">
            {{ this.getEffort("special-defense") }}
          </v-col>

        </v-row>

        <v-row
          class="mb-3 lg-4 sm-3 xs-2 stats"
        >

          <v-col
            clas="md-4">
            Vitesse
          </v-col>
          <v-col
            clas="md-4">
            {{ this.getStats("speed") }}
          </v-col>

          <v-col
            clas="md-4">
            {{ this.getEffort("speed") }}
          </v-col>

        </v-row>


    </v-card-text>
  </div>

</template>

<script>
export default {
  name: "stats",
  props:{
    stats : Array
  },
  methods:{
    getStats : function (str){
      return this.stats.find(x => x.stat.name === str ).base_stat
    },

    getEffort : function (str){
      return this.stats.find(x => x.stat.name === str ).effort
    }
  }
}
</script>

<style scoped>
  .stats{
    text-align: center;
  }
</style>
