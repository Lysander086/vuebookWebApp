import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 1
  },
  mutations: {
    'SET_SET': (state, newTest) => {
      state.test = newTest
    }
  },
  actions: {
    setTest: ({commit, state}, newTest) => { // commit 是一个方法
      console.log(state.test, newTest)
      return commit('SET_SET', newTest)
    }
  }
})
