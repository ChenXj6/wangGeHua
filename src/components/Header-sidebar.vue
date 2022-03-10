<template>
  <div class="menu-box">
    <span v-for="item in menuList"
          :key="item.id"
          class="menu-item">{{item.title}}</span>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
export default {
  name: "header-sidebar",
  setup () {
    const menuList = [
      {
        id: 1,
        title: '党建引领',
      },
      {
        id: 2,
        title: '网格治理',
      },
      {
        id: 3,
        title: '民生保障',
      },
      {
        id: 4,
        title: '应急指挥',
      },
      {
        id: 5,
        title: '智慧物业',
      },
      {
        id: 6,
        title: '经济运行',
      },
    ]
    return {
      menuList,
    }
  },
};
</script>
<style scoped>
.menu-box {
  height: 70px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
}
.menu-item {
  position: relative;
  display: block;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  box-sizing: border-box;
}
.active::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 1px;
  border-top: 1px solid #20A0ff;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
</style>