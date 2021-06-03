<template>
  <section class="teams mt-4">
    <v-row>
      <v-col>
        <add_team/>
      </v-col>
    </v-row>
    <v-row>
      <v-col xl="4" lg="6" md="6" sm="12" v-for="(team,index) of this.$store.state.teams.data" v-bind:key="index">
        <team_card :team="team" :teamIndex="index"/>
      </v-col>
    </v-row>

  </section>
</template>

<script>
import team_card from "~/components/team/team_card";
import add_team from "~/components/team/add_team";
import {mapState} from "vuex";
export default {
  name: "team_menu",
  computed : mapState(['teams']),
  data: function () {
    return ({})
  },
  methods:{

  },
  components:{
    team_card,
    add_team
  }
}
</script>

<style scoped>

</style>
