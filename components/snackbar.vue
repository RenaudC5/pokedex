<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
  >
    {{ $store.state.utilities.data.snackBar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="$store.state.utilities.data.snackBar.color"
        text
        v-bind="attrs"
        @click="close"
      >
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",
  data() {
    return {
      show: this.$store.state.utilities.data.snackBar.show, // Pour éviter des erreurs, cela change la variable local du component
      //show:false,
      timeout: 2000
    }
  },

  methods: {
    close() {
      this.$store.dispatch('utilities/hideSnack')
    }
  },

  mounted() {
    // On regarde si le state change dans le store
    this.$store.watch(() => this.$store.state.utilities.data.snackBar.show, show => {
      this.show = show

      if (this.show) {
        // On passe la variable à false quand le component dispartait seul
        setTimeout(() => {
          this.close()
        }, this.timeout);
      }
    })
  }
}
</script>

<style scoped>

</style>
