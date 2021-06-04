import axios from "axios";

export const state = () => ({
  data:[],
})

export const mutations = {
  addPokemons(state,pokemons){

    console.time(`add ${pokemons.length} pokemons`)
    console.log(pokemons)
    state.data = [...state.data, ...pokemons]
    console.timeEnd(`add ${pokemons.length} pokemons`)
  },
}

export const actions = {
  getPokemons: async function ({commit}) {
    //récupération des données de l'API
    let pokemonToAdd = true
    // let counter = 5
    let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"
    // while(pokemonToAdd && counter > 0){
    while(pokemonToAdd){
      // counter--
      let pokemons = await axios.get(url).then(async res => {
        let pokemonsRes = res.data;

        for (let pokemon of pokemonsRes.results){
          pokemon.data = await axios.get(pokemon.url).then(async pokemon => {

            let pokemonData = pokemon.data

            pokemonData.species = await axios.get(pokemonData.species.url).then(async res => {
              let data = res.data
              data.evolution_chain.data = await axios.get(data.evolution_chain.url).then(res => res.data);
              return data
            });
            //pokemonData.generation = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`).then(res => res.data)

            // for (let move of pokemonData.moves){
            //   move.move = await axios.get(move.move.url).then(res => res.data)
            // }

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
