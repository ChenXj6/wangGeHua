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
    <ul v-if="isHaveNotice" ref="noticeListBox" class="notice-item-box">
      <li v-for="item in noticeList" :key="item.id" class="notice-item">
        <span class="notice-item-content">{{ item.message }}，</span>
        <el-link type="warning">请查看</el-link>
      </li>
    </ul>
    <div v-else class="no-notice">暂无最新消息</div>
  </div>
</template>
<script>
import { computed, ref } from '@vue/runtime-core'
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
    const noticeList = ref([
      { message: '新添加一名戒毒人员', id: 1 },
      { message: '新增加一名社区矫正人员', id: 2 },
      { message: '新增加一名刑满释放人员', id: 3 },
      { message: '您有一条新的备忘录', id: 4 },
      { message: '新增加一名社区矫正人员', id: 2 },
      { message: '新增加一名刑满释放人员', id: 3 },
      { message: '新添加一名戒毒人员', id: 1 },
      { message: '新增加一名社区矫正人员', id: 2 },
      { message: '新增加一名刑满释放人员', id: 3 },
    ])
    const stowAndUnfold = () => {
      if (isUnfold.value) {
        noticeListBox.value.style.height = 0
      } else {
        noticeListBox.value.style.height = '250px'
      }
      isUnfold.value = !isUnfold.value
    }
    return {
      isHaveNotice,
      noticeList,
      stowAndUnfold,
      isUnfold,
      noticeListBox,
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
    height: 250px;
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
