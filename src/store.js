import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backLog: null,
    toDo: null,
    doing: null,
    done: null,
    test: null
  },
  getters: {
    getBackLog: state => {
      return state.backLog
    }
  },
  mutations: {
    setBackLog (state, payload) {
      state.backLog = payload
    },
    setToDo (state, payload) {
      state.toDo = payload
    },
    setDoing (state, payload) {
      state.doing = payload
    },
    setDone (state, payload) {
      state.done = payload
    },
    addBackLog (state, payload) {
      console.log('VUEX')
      // state.test = payload
      // console.log('INI DI VUEX',payload);
      // state.backLog.push(payload)
    }
  },
  actions: {

  }
})
