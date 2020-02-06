import Vue from 'vue'
import Vuex from 'vuex'
import Storage from '@/utils/storage.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    repoUrl: '',
    drawerLeft: true,
    drawerRight: false
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
      state.repoUrl = repoUrl
      let history = Storage.getItem('history')
      if (history === null) {
        history = [repoUrl]
      } else {
        const i = history.findIndex(e => e === repoUrl)
        if (i > -1) {
          history.splice(i, 1)
        }
        history.unshift(repoUrl)
      }
      history.splice(20)
      Storage.setItem('history', history)
    },
    emptyRepoUrl (state) {
      state.repoUrl = ''
    },
    changeDrawerLeft (state, status = null) {
      state.drawerLeft = status === null ? !state.drawerLeft : status
    },
    changeDrawerRight (state, status = null) {
      state.drawerRight = status === null ? !state.drawerRight : status
    }
  },
  actions: {
  },
  modules: {
  }
})
