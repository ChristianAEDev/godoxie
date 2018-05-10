import log from 'electron-log'
import axios from 'axios'
import fs from 'fs'
const { dialog } = require('electron').remote

const state = {
  doxieIP: '192.168.100.101',
  status: {},
  isConnected: false,
  scans: []
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
  },
  scans: state => {
    return state.scans
  }
}

const mutations = {
  setStatus (state, payload) {
    state.status = payload
  },
  setConnected (state, payload) {
    state.isConnected = payload
  },
  setScans (state, payload) {
    state.scans = payload
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
  },
  requestAllScans ({ commit }) {
    log.info('GET /scans.json')

    axios
      .get('http://' + state.doxieIP + '/scans.json')
      .then(response => {
        let scans = []
        response.data.forEach(scan => {
          let startIndex = scan.name.indexOf('_') + 1
          let endIndex = scan.name.length - 4
          let filename = scan.name.substring(startIndex, endIndex)
          scans.push({ ...scan, filename })
        })
        commit('setScans', scans)
      })
      .catch(error => {
        throw error
      })
  },
  downloadScan (context, payload) {
    log.info(payload.filename)
    let filename = payload.filename + '.pdf'
    let url = `http://${state.doxieIP}/scans/DOXIE/PDF/IMG_${payload.filename}.PDF`

    log.info(url)

    // Download the PDF
    axios
      .get(url, { responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'}
      })
      .then(response => {
        log.info('response: ' + response.data)
        let blob = new Blob([response.data], {type: 'application/pdf'})
        log.info('blob: ' + blob)
        dialog.showSaveDialog(
          {
            defaultPath: filename,
            title: 'Save scan...'
          },
          path => {
            log.info(path)
            fs.writeFileSync(path, response.data)
            // fs.writeFile(path, blob, error => {
            //   log.error('Error saving PDF: ' + error)
            // })
          }
        )
      })
      .catch(error => {
        log.error(error)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
