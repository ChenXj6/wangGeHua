<template>
  <div class="about">
    <v-header />
    <div class="main-content-box">
      <keep-alive>
      <router-view />
      </keep-alive>
    </div>
    <notice />
  </div>
</template>
<script>
import { onMounted, ref, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { computed, h } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import vHeader from '@/components/Header.vue'
import Notice from './components/notice.vue'
export default {
  components: {
    vHeader,
    Notice,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    )
    // const notice = ElNotification({
    //   title: 'Success',
    //   message: 'This is a success message',
    //   type: 'success',
    //   position: 'bottom-right',
    //   showClose: true,
    //   offset: 60,
    //   duration: 0,
    // })
    const collapse = computed(() => store.state.collapse)
    // onMounted(() => {
    //   notice()
    // })
    // watch(
    //   () => route.path,
    //   () => notice && notice.close()
    // )
    return {
      tagsList,
      collapse,
      store,
    }
  },
}
</script>
<style lang="scss" scoped>
.about{
  height: 100%;
  position: relative;
}
</style>
