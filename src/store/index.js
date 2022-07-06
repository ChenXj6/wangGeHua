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
    isAddEventList:false,
    mapDialog:{
      visabled:false,
      data:[]
    },
    menuList:[],
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
      state.eventList = [...data,...arr]
      sessionStorage.setItem('eventName',JSON.stringify(state.eventList))
      state.isAddEventList = true
    },
    // 事件处理完，删除指定事件
    delEvent(state,data){
      let arr = JSON.parse(sessionStorage.getItem('eventName')) || []
      if(state.eventList.length > 0 && arr.length > 0){
        state.eventList.forEach((v,i)=>{
          if(v.id == data.id){
            state.eventList.splice(i,1)
          }
        })
        arr.forEach((v,i)=>{
          if(v.id == data.id){
            arr.splice(i,1)
          }
        })
      }
      sessionStorage.setItem('eventName',JSON.stringify(arr))
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
    resetMenu(state,data){
      state.menuList = data
      sessionStorage.setItem('menulist',JSON.stringify(data))
    },
    clearMenu(state){
      state.menuList = []
      sessionStorage.removeItem('menulist')
    }
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
    delEvent({ commit },data) {
      commit('delEvent',data)
    },
    resetMenu({commit},data) {
      commit('resetMenu',data)
    },
    clearMenu({ commit }){
      commit('clearMenu')
    }
  },
  modules: {},
})
