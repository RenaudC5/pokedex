export const state = () => ({
  data:[{
    name:"Ma team principale",
    pokemons:[]
  }]
})

export const mutations = {

  addTeam(state,team) {
    console.time("AddTeam mutation")

    state.data.push({...team})
    console.timeEnd("AddTeam mutation")
  },

  deleteTeam(state,index){
    console.time("delete team")
    state.data.splice(index, 1);
    console.timeEnd("delete team")
  },

  addPokemon(state, req) {
    console.time("add pokemon")
    state.data[req.index].pokemons.push(req.pokemon);
    console.timeEnd("add pokemon")
  },

  removePokemon(state, req){
    console.time("add pokemon")
    console.log(req)
    let team = state.data.find(x => x === req.team)
    team.pokemons.splice(team.pokemons.indexOf(req.pokemon),1)
    console.timeEnd("add pokemon")
  }
}

export const actions = {

  addTeam: function ({commit},name) {
    //creation de la team
    commit("addTeam", {name:name, pokemons:[]})
  },

  deleteSingleTeam: function ({commit},index) {
    commit("deleteTeam", index)
  },
  addPokemon : function({commit,state}, req) {
    console.log(req)
    console.log("coucou")
    if(!state.data[req.index].pokemons.find(x => x.data.id === req.pokemon.data.id) && state.data[req.index].pokemons.length < 6){
      commit("addPokemon",req)
    }
  },
  removePokemon : function ({commit}, req){
    let pokemon = req.pokemon
    let team = req.team

    if(team.pokemons.find(x => x.id === pokemon.id)){
      commit("removePokemon",req)
    }
  }
}

export const getters = {
  getNbteams: (state) => {
    return state.data.length
  },

}
