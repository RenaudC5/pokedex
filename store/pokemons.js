import axios from "axios";

export const state = () => ({
  data:[],
})

export const mutations = {
  addPokemons(state,pokemons){
    console.log(pokemons)
    console.time(`add ${pokemons.length} pokemons`)
    state.data = [...state.data, ...pokemons]
    console.timeEnd(`add ${pokemons.length} pokemons`)
  },
}

export const actions = {
  getPokemons: async function ({commit}) {
    //récupération des données de l'API
    let pokemonToAdd = true
    let counter = 5
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
  addPokemons({commit}, pokemons){
    commit("addPokemonsFromStorage",pokemons);
  }
}

export const getters = {
  getNbPokemons: (state) => {
    return state.data.length
  },

}
