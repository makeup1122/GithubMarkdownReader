import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    repoUrl: ''
  },
  getters: {
    owner: state => {
      const w = state.repoUrl.split('/')
      return w[3]
    },
    repo: state => {
      const w = state.repoUrl.split('/')
      return w[4]
    }
  },
  mutations: {
    setRepoUrl (state, repoUrl) {
      // Cookie.setToken(menuName, 'currment_menu')
      state.repoUrl = repoUrl
    },
    emptyRepoUrl (state) {
      state.repoUrl = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
