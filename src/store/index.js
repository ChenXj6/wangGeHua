import { createStore } from 'vuex'
import VueSocket from '@/utils/VueSocket'
// import { round } from '@/use/useToolFunction'

import { handleData } from '@/utils/handleSocketData' // 分发任务的关键函数

export default createStore({
  state: {
    tagsList: [],
    collapse: false,
    ws: null,
    pressureHealthDegree: 1, // 
    eventName:'',
  },
  mutations: {
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1)
    },
    setTagsItem(state, data) {
      state.tagsList.push(data)
    },
    clearTags(state) {
      state.tagsList = []
    },
    closeTagsOther(state, data) {
      state.tagsList = data
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i]
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.tagsList[i + 1].path)
          } else if (i > 0) {
            data.$router.push(state.tagsList[i - 1].path)
          } else {
            data.$router.push('/')
          }
          state.tagsList.splice(i, 1)
          break
        }
      }
    },
    // 侧边栏折叠
    handleCollapse(state, data) {
      state.collapse = data
    },
    // 初始化socket连接
    createSocket(state, { commit }) {
      const baseURL = `${import.meta.env.VITE_APP_SOCKET}`
      state.ws = new VueSocket(baseURL, commit, handleData)
    },
    // 更新数据
    updateHealthDegree(state, { healthDegree, prop, eventName }) {
      state[prop] = healthDegree
      state[eventName] = eventName
    },
  },
  actions: {
    // 创建实例
    socketInit({ commit }) {
      commit('createSocket', { commit })
    },
  },
  modules: {},
})
