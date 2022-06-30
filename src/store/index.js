import { createStore } from 'vuex'
import VueSocket from '@/utils/VueSocket'
import { isType } from '@/utils/util'

import { handleData } from '@/utils/handleSocketData' // 分发任务的关键函数

export default createStore({
  state: {
    tagsList: [],
    collapse: false,
    ws: null,
    eventList:[],
    mapDialog:{
      visabled:false,
      data:[]
    }
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
      const baseURL = `${import.meta.env.VITE_APP_SOCKET}${sessionStorage.getItem("operatorId")}`
      state.ws = new VueSocket(baseURL, commit, handleData)
    },
    // 手动断开socket连接
    closeSocket(state) {
      state.ws.close()
    },
    // 更新数据
    updateHealthDegree(state,data) {
      if(!isType(data,'Array') || data.length == 0) return
      let arr = JSON.parse(sessionStorage.getItem('eventName')) || []
      
      state.eventList =[...data,...arr]
      sessionStorage.setItem('eventName',JSON.stringify(state.eventList))
    },
    delHealthDegree(state) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem('operatorId')
      sessionStorage.removeItem('eventName')
      // state.eventList = []
    },

    // 添加地图显示事件
    // addEvent(state,data){
    //   if(!isType(data,'Array') || data.length == 0) return
    //   state.eventList.push(...data)
    // },
    // 地图上部导航触发事件
    handleClick(state,data){
      state.mapDialog.visabled = true
      state.mapDialog.data = data
    },
    closeDialog(state){
      state.mapDialog.visabled = false
      state.mapDialog.data = []
    },
  },
  actions: {
    // 创建实例
    socketInit({ commit }) {
      commit('createSocket', { commit })
    },
    closeSocket({commit}) {
      commit('closeSocket')
    },
    // addEvent({commit},data){      
    //   commit('addEvent',data)      
    // },
    handleClick({commit},data){
      commit('handleClick',data)
    },
    closeDialog({commit}){
      commit('closeDialog')
    },
    delHealthDegree({commit}) {
      commit('delHealthDegree')
    },
  },
  modules: {},
})
