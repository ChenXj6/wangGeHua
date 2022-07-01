<template>
  <div class="noticeBox">
    <div class="notice-title-box">
      <div class="notice-title">
        <h4>消息中心</h4>
        <i
          :class="`el-icon-arrow-${isUnfold ? 'up' : 'down'}`"
          @click="stowAndUnfold"
        ></i>
      </div>
    </div>
    <!-- {{ noticeList }}111 -->
    <template v-if="isHaveNotice">      
      <!-- <vue3-seamless-scroll :data="noticeList" class="warp"> -->
        <ul ref="noticeListBox" class="notice-item-box">
          <li v-for="item in noticeList" :key="item.id" class="notice-item">
            <span class="notice-item-content">{{ item.eventName }}，</span>
            <el-link type="warning" @click.prevent="handleViewDetail(item)">请查看</el-link>
          </li>
        </ul>
      <!-- </vue3-seamless-scroll> -->
    </template>
    <div v-else class="no-notice">暂无最新消息</div>
  </div>
</template>
<script>
import { computed, onMounted, ref,watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isUnfold = ref(true)
    const noticeListBox = ref(null)
    // 消息通知
    const isHaveNotice = computed(() => !!noticeList.value.length)
    const noticeList = computed(() => store.state.eventList)
    const stowAndUnfold = () => {
      if (isUnfold.value) {
        noticeListBox.value.style.height = 0
      } else {
        noticeListBox.value.style.height = '250px'
      }
      isUnfold.value = !isUnfold.value
    }
    
    const handleViewDetail = (data,type = 1) => {
      data = JSON.stringify(data)
      router.push({
        path: '/editResidentsReport',
        query: { data: encodeURIComponent(data), operation: type },
      })
    }
    // onMounted(()=>{
      
      // console.log(noticeList.value,'notice2')
    // })
    // noticeList.value = JSON.parse(localStorage.getItem('eventName')) || []
    return {
      isHaveNotice,
      noticeList,
      stowAndUnfold,
      isUnfold,
      noticeListBox,
      handleViewDetail,
    }
  },
}
</script>
<style lang="scss" scoped>
.noticeBox {
  position: relative;
  top: 5px;
  border-radius: 5px;
  left: 5px;
  width: 250px;
  height: auto;
  background: #242f42;
  z-index: 3;
  opacity: 0.8;
  padding: 5px;
  overflow: hidden;
  box-sizing: border-box;
  color: #f5f5f5;
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
  .notice-item-box {
    width: 100%;
    max-height: 250px;
    overflow: scroll;
    transition: height 0.3s ease;
    .notice-item {
      font-size: 14px;
      padding: 5px 0;
      .notice-item-content {
        display: inline-block;
      }
    }
  }
  .no-notice {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.notice-item-box::-webkit-scrollbar {
  display: none;
}
</style>
