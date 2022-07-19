<template>
  <!-- <router-view :key="$route.fullPath"/> -->
  <router-view/>
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
    const route = useRoute()
    if(sessionStorage.getItem('user')){
      store.dispatch('socketInit')
    }
    // 全局检测是否有来自webSocket的消息通知   
    onMounted(()=>{
      store.state.eventList = JSON.parse(sessionStorage.getItem('eventName')) || []
      store.state.menuList = JSON.parse(sessionStorage.getItem('menulist')) || []
      watch(
        () => store.state.eventList,
        (newValue) => {
          if(!store.state.isAddEventList) return
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
