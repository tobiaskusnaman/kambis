import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backLog: [],
    todo: [],
    doing: [],
    done: []
  },
  mutations: {
    setBackLog (state, payload) {
      state.backLog = payload
    },
    setTodo (state, payload) {
      state.todo = payload
    },
    setDoing (state, payload) {
      state.doing = payload
    },
    setDone (state, payload) {
      state.done = payload
    }
  },
  actions: {

  }
})
