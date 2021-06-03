import {NB_POKEMON_PAR_PAGE} from "@/constants";
export const state = () => ({
  data:{
    snackBar:{
      text: "",
      show : false,
      color:""
    },
    pagination:{
      list_start:0,
      list_end:NB_POKEMON_PAR_PAGE,
      list_step:NB_POKEMON_PAR_PAGE
    }
  }
})

export const mutations = {

  mutateSnack(state, {text, color}){
    state.data.snackBar.text = text;
    state.data.snackBar.color = color;
    state.data.snackBar.show = true
  },

  hideSnack(state){
    state.data.snackBar.show = false
  },

  resetList(state){
    console.log("resetPage")
    state.data.pagination = {
        list_start:0,
        list_end:NB_POKEMON_PAR_PAGE,
        list_step:NB_POKEMON_PAR_PAGE
    }
  },

  incrementList(state){
      state.data.pagination.list_start += state.data.pagination.list_step;
      state.data.pagination.list_end += state.data.pagination.list_step;
  },

  decrementList(state){
    state.data.pagination.list_start -= state.data.pagination.list_step;
    state.data.pagination.list_end -= state.data.pagination.list_step;
  },


}

export const actions = {

  updateSnack({commit}, snack){
    commit("mutateSnack",snack)
  },

  hideSnack({commit}){
    commit("hideSnack");
  },

  incrementList({commit,state},nbPokemons) {
    if(state.data.pagination.list_end < nbPokemons){
      commit("incrementList")
    }
  },

  decrementList({commit,state}) {
    if(state.data.pagination.list_start >= state.data.pagination.list_step){
      commit("decrementList")
    }
  },

  resetList({commit,state}){
    if(state.data.pagination.list_start !== 0){ //optimisation
      commit("resetList")
    }

  }

}
