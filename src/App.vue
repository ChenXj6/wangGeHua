<template>
  <router-view />
</template>

<script>
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    store.dispatch('socketInit')
    // 全局检测是否有来自webSocket的消息通知   
    // isHaveEmergency：是否有紧急事件
    watch(
      () => store.state.pressureHealthDegree,
      (newValue) => {
        console.log(newValue, 'pressureHealthDegree....')
        route != '/map' &&
          router.push({ name: 'Map', params: { isHaveEmergency: true } })
      }
    )
  },
}
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
