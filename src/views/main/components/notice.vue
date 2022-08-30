<template>
  <div class="noticeBox">
    <div class="notice-title-box">
      <div class="notice-title">
        <h4>工单提醒</h4>
      </div>
    </div>
    <div class="box">
      <p>派单后&nbsp;4小时&nbsp;未接单&nbsp;的12345热线工单共<el-link type="warning" @click.prevent="handleViewDetail()">{{ overdueTime }}</el-link>条</p>
      <p>临期前&nbsp;2天&nbsp;未回复&nbsp;的12345热线工单共<el-link type="warning" @click.prevent="handleViewDetail(4)">{{ overdueDay }}</el-link>条</p>
    </div>
  </div>
</template>
<script>
import { computed, getCurrentInstance, onBeforeMount, onMounted, reactive, ref,toRefs,watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { noticeList } from '@/api/weather'
import { listAssign } from '@/utils/util'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const noticeObj = reactive({
      overdueDay:0,
      overdueTime:0,
    })
    // 消息通知
    const getList = () => {
      let dealCode = JSON.parse(sessionStorage.getItem('user')).user.operatorId
      noticeList({dealCode}).then(res=>{
        listAssign(noticeObj,res)
      })
    }
    
    const handleViewDetail = (type = 1) => {
      router.push({
        name: 'Management',
        params: { operation: type },
      })
    }
    onBeforeMount(()=>{
      getList()
    })
    return {
      ...toRefs(noticeObj),
      handleViewDetail,
    }
  },
}
</script>
<style lang="scss" scoped>
.noticeBox {
  position: absolute;
  bottom: 5px;
  border-radius: 5px;
  right: 5px;
  width: 250px;
  height: auto;
  background: #242f42;
  z-index: 3;
  opacity: 0.8;
  padding: 5px;
  overflow: hidden;
  box-sizing: border-box;
  color: #f5f5f5;
  font-size: 14px;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
  .notice-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    padding-left: 5px;
  }
  .notice-title-box::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(-90deg, #242f42, #f5f5f5);
    clear: both;
    margin: 5px 0;
  }
  .box{
    width: 100%;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
  }
  // .notice-item-box {
  //   width: 100%;
  //   min-height: 250px;
  //   overflow: scroll;
  //   transition: height 0.3s ease;
  //   .notice-item {
  //     font-size: 14px;
  //     padding: 5px 0;
  //     .notice-item-content {
  //       display: inline-block;
  //     }
  //   }
  // }
  // .no-notice {
  //   height: 100px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   font-size: 14px;
  // }
}
.notice-item-box::-webkit-scrollbar {
  display: none;
}
</style>
