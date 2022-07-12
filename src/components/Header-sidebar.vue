<template>
  <div class="menu-box">
    <span
      class="menu-item"
      >驾驶舱</span
    >
    <span
      v-for="item in menuList"
      :key="item.id"
      class="menu-item"
      @click="handleClick(item)"
      >{{ item.title }}</span
    >
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, provide } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "header-sidebar",
  setup() {
    const menuList = [
      {
        id: 1,
        title: "数字党建",
        data: [
          {
            title: "党组织",
            children: [
              { title: "党工委" },
              { title: "直属党组织" },
              { title: "党支部" },
            ],
          },
        ],
        // children:[
        //   // 党建先锋 在线教育 党风建设 支部文化
        //   { title:'党建瞭望',img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ixintu.com%2Fdownload%2Fjpg%2F201911%2F5a4ba68b1fba277da96f8267f9b72ff5.jpg%21con&refer=http%3A%2F%2Fimg.ixintu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658545593&t=c43eafd624cfc7f4fb6b94a6746e2cf2' },
        //   { title:'党建先锋',img:'https://img2.baidu.com/it/u=42904497,637130856&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=641' },
        //   { title:'党风建设',img:'https://img1.baidu.com/it/u=185095650,3733147082&fm=253&fmt=auto&app=138&f=PNG?w=667&h=500' },
        //   { title:'支部文化',img:'https://img1.baidu.com/it/u=2643849219,2259734721&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500' },
        //   { title:'在线教育',img:'https://img1.baidu.com/it/u=807296333,4294174678&fm=253&fmt=auto?w=750&h=500' },
        // ]
      },
      {
        id: 2,
        title: "网格政务",
        data: [
          {
            title: "党风建设",
            img: "https://img1.baidu.com/it/u=185095650,3733147082&fm=253&fmt=auto&app=138&f=PNG?w=667&h=500",
          },
        ],
      },
      {
        id: 3,
        title: "民生保障",
      },
      {
        id: 4,
        title: "物业服务",
      },
      {
        id: 5,
        title: "社区经济",
      },
      {
        id: 6,
        title: "共商共治",
        data: [
          {
            title: "党建先锋",
            img: "https://img2.baidu.com/it/u=42904497,637130856&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=641",
          },
          {
            title: "党风建设",
            img: "https://img1.baidu.com/it/u=185095650,3733147082&fm=253&fmt=auto&app=138&f=PNG?w=667&h=500",
            d: [
              {
                title: "党建瞭望",
                img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ixintu.com%2Fdownload%2Fjpg%2F201911%2F5a4ba68b1fba277da96f8267f9b72ff5.jpg%21con&refer=http%3A%2F%2Fimg.ixintu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658545593&t=c43eafd624cfc7f4fb6b94a6746e2cf2",
              },
            ],
          },
          {
            title: "党建先锋",
            img: "https://img2.baidu.com/it/u=42904497,637130856&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=641",
          },
          {
            title: "党风建设",
            img: "https://img1.baidu.com/it/u=185095650,3733147082&fm=253&fmt=auto&app=138&f=PNG?w=667&h=500",
            d: [
              {
                title: "党建瞭望",
                img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ixintu.com%2Fdownload%2Fjpg%2F201911%2F5a4ba68b1fba277da96f8267f9b72ff5.jpg%21con&refer=http%3A%2F%2Fimg.ixintu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658545593&t=c43eafd624cfc7f4fb6b94a6746e2cf2",
              },
            ],
          },
          {
            title: "党建先锋",
            img: "https://img2.baidu.com/it/u=42904497,637130856&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=641",
          },
          {
            title: "党风建设",
            img: "https://img1.baidu.com/it/u=185095650,3733147082&fm=253&fmt=auto&app=138&f=PNG?w=667&h=500",
            d: [
              {
                title: "党建瞭望",
                img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ixintu.com%2Fdownload%2Fjpg%2F201911%2F5a4ba68b1fba277da96f8267f9b72ff5.jpg%21con&refer=http%3A%2F%2Fimg.ixintu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658545593&t=c43eafd624cfc7f4fb6b94a6746e2cf2",
              },
            ],
          },
        ],
      },
    ];
    const router = useRouter();
    const store = useStore();
    const handleClick = (data) => {
      console.log(data);
      store.dispatch("handleClick", data);
    };
    return {
      menuList,
      router,
      handleClick,
      store,
    };
  },
};
</script>
<style scoped>
.menu-box {
  height: 60px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;
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
  border-top: 1px solid #20a0ff;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
</style>
