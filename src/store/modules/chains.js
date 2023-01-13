import { getChainOverview } from '@/api/chains'
import { Message } from 'element-ui'

const chains = {
  state: {
    home: {},
    nightMode: JSON.parse(localStorage.nightMode ? localStorage.nightMode : false),
    account: ""
  },

  mutations: {
    SET_HOME: (state, home) => {
      state.home = home
    },
    SET_NightMode: (state, mode) => {
      state.nightMode = mode
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
  },

  actions: {
    // 获取首页信息
    GetHomeChainOverview({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getChainOverview().then(response => {
          if (response.status === 1) {
            const data = response.data
            commit('SET_HOME', data)
            resolve(data)
          } else {
            Message({
              message: response.message,
              type: 'error',
              duration: 5 * 1000
            })
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // mode
    SwitchMode({ commit }, mode) {
      return new Promise(resolve => {
        localStorage.nightMode = mode
        commit('SET_NightMode', mode)
      })
    }
  }
}

export default chains
