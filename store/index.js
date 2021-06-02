import axios from "axios";

export const state = () => ({
  counter: 0,
  pokemons:[],
  teams:[]
})

export const mutations = {
  addPokemons(state,pokemons){
    state.pokemons = state.pokemons.concat(pokemons)
  },

  addTeam(state,team) {
    this.state.teams.push(team)
  },

  deleteTeam(state,name){
    this.state.teams = this.state.teams.filter(x => x.name !== name)
  }
}

export const actions = {
  getPokemons: async function ({commit}) {
    //récupération des données de l'API
    let pokemonToAdd = true
    let counter = 12
    let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"
    while(pokemonToAdd && counter > 0){
      counter--
      let pokemons = await axios.get(url).then(async res => {
        let pokemonsRes = res.data;

        for (let pokemon of pokemonsRes.results){
          pokemon.data = await axios.get(pokemon.url).then(async pokemon => {

            let pokemonData = pokemon.data

            pokemonData.species = await axios.get(pokemonData.species.url).then(res => res.data);

            return pokemonData
          });
        }

        return pokemonsRes
      })


      commit("addPokemons", pokemons.results)

      url = pokemons.next

      if(!pokemons.next) pokemonToAdd = false
    }
  },

  addTeam: function ({commit},name) {
    commit("addTeam", {name:name})
  },

  deleteTeam: function ({commit},event,name) {
    console.log(name)
    commit("deleteTeam", name)
  }
}

export const getters = {
  getNbPokemons: (state) => {
    return state.pokemons.length
  },
  getNbteams: (state) => {
    return state.teams.length
  },

}
