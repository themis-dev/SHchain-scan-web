import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app'
// import user from './modules/user'
// import permission from './modules/permission'
import chains from './modules/chains'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    chains
  },
  getters
})

export default store
