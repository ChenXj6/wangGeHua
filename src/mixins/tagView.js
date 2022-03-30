import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup(){
    const router = useRouter()
    const store = useStore()
    const tagsList = computed(() => store.state.tagsList)
    // 返回上一页并关闭当前页
    const delCurrentTag = ({fullPath}) => {
      tagsList.value.map((item,index)=>{
        if(item.path === fullPath){
          store.commit('delTagsItem', { index })
          router.go(-1)
        }
      })
    }
    return {
      delCurrentTag
    }
  }
}

