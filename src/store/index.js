import Vue from 'vue'
import Vuex from 'vuex'
import mainStore from './mainStore'
import teamStore from './teamStore'
import userStore from './userStore'
import competitionStore from './competitionStore'
import matchStore from './matchStore'
import gameStore from './gameStore'
import guessStore from './guessStore'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mainStore,
    teamStore,
    userStore,
    competitionStore,
    matchStore,
    gameStore,
    guessStore
  },
  plugins: [createPersistedState()]
})
