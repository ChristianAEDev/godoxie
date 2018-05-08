import log from 'electron-log'
import axios from 'axios'

const state = {
  doxieIP: '192.168.100.101',
  status: {},
  isConnected: false
}

const getters = {
  doxieIP: state => {
    return state.doxieIP
  },
  status: state => {
    return state.status
  },
  isConnected: state => {
    return state.isConnected
  }
}

const mutations = {
  setStatus (state, payload) {
    state.status = payload
  },
  setConnected (state, payload) {
    state.isConnected = payload
  }
}

const actions = {
  requestStatus ({ commit }) {
    log.info('GET status (/hello)')
    axios
      .get('http://' + state.doxieIP + '/hello.json')
      .then(response => {
        log.info(response)

        if (response.status === 200) {
          commit('setConnected', true)

          commit('setStatus', response.data)
        } else {
          commit('setConnected', false)
        }
      })
      .catch(error => {
        throw error
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
