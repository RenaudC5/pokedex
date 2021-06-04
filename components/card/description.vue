<template>
  <div>
    <div class="d-flex justify-sm-space-between">
      <div class="align-md-center pokemon-img">
        <img :src="getSprite('front_default')" alt="pokemon vue de devant"/>
        <img :src="getSprite('back_default')" alt="pokemon vue de derrière"/>
      </div>
      <div class="align-md-center pokemon-img">
        <img :src="getSprite('front_shiny')" alt="pokemon shiny vue de devant"/>
        <img :src="getSprite('back_shiny')" alt="pokemon shiny vue de derrière"/>
      </div>
    </div>

    <div class="my-4 subtitle-1">
      <p v-if="pokemon.species.is_baby">Bébé pokemon !</p>
      <p v-if="pokemon.species.is_legendary">Pokémon légendaire !</p>
      <p v-if="pokemon.species.is_mythical">Pokémon mythique</p>
    </div>

    <p>{{ pokemon.species.genera.find(x => x.language.name === this.language).genus}}</p>


  <v-row>
      <v-col class="col-md-3"><strong>Description : </strong></v-col>
      <v-col class="col-md-9">{{getCurrentText()}}</v-col>
  </v-row>



  </div>

</template>

<script>
import { LANGUAGE } from '@/constants/'
import {mapState} from "vuex"; //langue pour le nom du pokémon

export default {
  name: "description",
  computed : mapState(['version/version']),
  props:{
    pokemon : Object
  },
  data: function (){
    return({
      language : LANGUAGE
    })
  },
  async mounted() {
    //type du pokemon
    // for (let type of this.pokemon.types){
    //   type.type = await axios.get(type.type.url).then(res => res.data)
    //   type.name = type.type.names.find(x => x.language.name === this.language).name
    // }


  },
  methods:{
    getTypes: function () {
      return this.pokemon.types.map(x => x.name).join("/");
    },
    getCurrentText(){
      //premier check avec la langue sélectionée

      let texte = this.pokemon.species.flavor_text_entries.find(x => x.language.name === this.language && x.version.name === this.$store.state.version.version)
      if(texte){
        return texte.flavor_text
      } else {
        let texteEn = this.pokemon.species.flavor_text_entries.find(x => x.language.name === "en" && x.version.name === this.$store.state.version.version)
        if(texteEn){
          return "(Description en anglais) - "+texteEn.flavor_text
        } else {
          return "Aucune description pour cette version"
        }
      }
    },

    getSprite(sprite){
      let img = this.pokemon.sprites[sprite]

      for (let key of Object.keys(this.pokemon.sprites.versions)){

        let versions = this.pokemon.sprites.versions[key]
        for (let version of Object.keys(versions)){
          if(version.indexOf(this.$store.state.version.version) !== -1){
            if(versions[version][sprite]){
              return versions[version][sprite]
            } else {
              return img
            }

          }
        }
      }

      return img // si aucune image n'a été trouvée
    }
  }
}
</script>

<style scoped>
  .pokemon-img img{
    height: 100px;
    margin-left: 10px;
  }
</style>
