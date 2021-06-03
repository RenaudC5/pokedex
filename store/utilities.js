export const state = () => ({
  data:{
    snackBar:{
      text: "",
      show : false,
      color:""
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
  }
}

export const actions = {

  updateSnack({commit}, snack){
    commit("mutateSnack",snack)
  },

  hideSnack({commit}){
    commit("hideSnack");
  }

}
