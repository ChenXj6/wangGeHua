<template>
  <router-view />
</template>

<script>
import { getCurrentInstance, onMounted, onUpdated, watch ,toRaw} from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { h } from 'vue'
import { ElNotification } from 'element-plus'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    if(sessionStorage.getItem('user')){
      store.dispatch('socketInit')
    }
    // let eventArr = [
    //   {id:1,event:'井盖丢失',lng:'18624',lat:'8178'},
    //   {id:2,event:'邻里纠纷',lng:'14440',lat:'5260'},
    //   {id:3,event:'道路缺陷',lng:'121.8878',lat:'29.3432'},
    // ]
    // setTimeout(()=>{
    //   store.dispatch('addEvent',eventArr)
    // },5000)
    // 全局检测是否有来自webSocket的消息通知   
    onMounted(()=>{
      watch(
        () => store.state.eventList,
        (newValue) => {
          let obj = newValue[0]
          // console.log(obj,'接收到了数据')
            let a = ElNotification({
              title: `${obj?.eventName}`,
              dangerouslyUseHTMLString: true,
              message: `<p>事件名称：${obj?.eventName}</p><p>发生地点：${obj?.cityName}-${obj?.communityName}-${obj?.gridName}${obj.eventPlace ? '-' :''}${obj.eventPlace ?? ''}</p>`,
              duration: 0,
              position: 'top-left',
              offset: 60,
              onClick(){
                a.close()
                router.push({ name: 'Map',params:{isClick:true}})
              }
            })
        },
        {deep:true}
      )
    })
  },
}
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
