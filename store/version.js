export const state = () => (
  {
    version : ""
  }
)

export const mutations = {
  updateVersion(state,version){
    state.version = version
  }
}

export const actions = {
  updateVersion({commit},version){
    commit("updateVersion",version)
  }
}

