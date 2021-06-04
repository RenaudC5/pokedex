<template>
  <v-container>
    <div class="evolution" v-for="(evolution, index) of evolutions" :key="index">
      <v-row v-if="evolution.details.length > 0" align="center"
             justify="center">
        <v-col class="d-flex justify-center align-center" v-for="(evolutionDetail,index) of evolution.details" :key="index">
          <span v-if="evolutionDetail.min_level">Niveau {{evolutionDetail.min_level}}</span>
          <p v-if="evolutionDetail.dataItem">
            Avec : {{evolutionDetail.dataItem.names.find(x => x.language.name === language).name}}

            <img  :src="evolutionDetail.dataItem.sprites.default" alt="objet evolution pokemon"/>
          </p>
          <p v-if="evolutionDetail.dataItemHeld">
            En tenant : {{evolutionDetail.dataItemHeld.names.find(x => x.language.name === language).name}}
            <span v-if="evolutionDetail.trigger.name==='trade'">pendant un échange</span>
            <span v-if="evolutionDetail.trigger.name==='level_up'">En augmentant de niveau</span>
            <img  :src="evolutionDetail.dataItemHeld.sprites.default" alt="objet evolution pokemon"/>
          </p>
          <p v-if="evolutionDetail.dataKnowMove">
            En montant d'un niveau en conaissant la capacité : {{evolutionDetail.dataKnowMove.names.find(x => x.language.name === language).name}}
          </p>
          <p v-if="evolutionDetail.dataPartySpecies">
          Gain de niveau avec  <NuxtLink :to="'/pokemon/'+evolutionDetail.dataPartySpecies.name">{{evolutionDetail.dataPartySpecies.names.find(x => x.language.name === language).name}}}</NuxtLink> dans l'équipe
          </p>
          <p v-if="evolutionDetail.min_happiness">
          En montant d'un niveau avec {{evolutionDetail.min_happiness}} de bonheur
          </p>
          <p v-if="evolutionDetail.gender">
          <span v-if="evolutionDetail.gender === 0">En étant un male</span>
          <span v-else-if="evolutionDetail.gender === 1">En étant une femelle</span>
          </p>

          <v-icon aria-hidden="false">
            mdi-arrow-down-bold
          </v-icon>

        </v-col>
      </v-row>

      <v-row align="center"
             justify="center">
        <v-col class="d-flex justify-center align-center">
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.pokemon.id}.png`" alt="pokemon vu de devant"/>
        </v-col>
      </v-row>
      <v-row align="center"
             justify="center">
        <v-col class="d-flex justify-center align-center">
          <NuxtLink :to="'/pokemon/'+evolution.pokemon.name">{{evolution.pokemon.names.find(x => x.language.name === language).name}}</NuxtLink>
        </v-col>
      </v-row>
    </div>
  </v-container>

</template>

<script>
import axios from "axios";
import {LANGUAGE} from "@/constants";

export default {
  name: "evolution_chain",
  props:{
    pokemon:Object
  },
  data: function (){
    return({
      evolutions : [],
      language: LANGUAGE
    })
  },

  mounted() {
    //pokemon dans lequel
    this.addGeneration(this.pokemon.species.evolution_chain.data.chain)
  },

  methods:{
    addGeneration : async function (chain){
      let pokemon = await axios.get(chain.species.url).then(res => res.data)


      let evolutions = []
      for(let evolution of chain.evolution_details){
          if(evolution.item){
            evolution.dataItem = await axios.get(evolution.item.url).then(res => res.data);
          } else if(evolution.held_item) {
            evolution.dataItemHeld = await axios.get(evolution.held_item.url).then(res => res.data);
          }else if(evolution.known_move) {
            evolution.dataKnowMove = await axios.get(evolution.known_move.url).then(res => res.data);
          } else if (evolution.party_species){
            evolution.dataPartySpecies = await axios.get(evolution.party_species.url).then(res => res.data);
          }

          evolutions.push(evolution)
      }


      this.evolutions.push({pokemon: pokemon, details : evolutions});
      if(chain.evolves_to.length > 0){
        this.addGeneration(chain.evolves_to[0])
      }
    }
  }
}
</script>

<style>
  a{
    text-decoration: none;
    color: lightblue;
  }

  a:hover{
    text-decoration: underline;
    color:cornflowerblue;
  }
</style>
