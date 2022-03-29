import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useStore()
const tagsList = computed(() => store.state.tagsList)

// 返回上一页并关闭当前页
export const delCurrentTag = (baseObj, mergeObj) => {

}