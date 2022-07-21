<template>
  <div class="menu-box">
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "header-sidebar",
  setup() {
    const menuList = [
      {
        id: 1,
        title: "驾驶舱",
        type:'cockpit',
      },
      {
        id: 2,
        title: "数字党建",
        data: [
          {
            title: "党组织",
            
            children: [
              { title: "党工委",type:'party', },
              { title: "直属党组织",type:'underParty' },
              { title: "党支部",type:'partyBranch' },
            ],
          },
          {
            title: "党建先锋",
            type:'partyVan',
          },
          {
            title: "品牌打造",
            type:'brand',
          },
          {
            title: "工作展示",
            type:'workShow',
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
        id: 3,
        title: "网格政务",
        data: [
          {
            title: "简介",
          },
          {
            title: "双实信息",
            children: [{ title: "楼栋标签" }, { title: "查询" }],
          },
          {
            title: "网格事件",
            children: [{ title: "当日时间" }, { title: "事件查询" }],
          },
          {
            title: "12345热线",
          },
          {
            title: "重点管理人员",
            children: [
              { title: "刑满释放" },
              { title: "精神障碍" },
              { title: "社区戒毒" },
              { title: "社会矫正" },
              { title: "稳控对象" },
              { title: "人员查询" },
            ],
          },
          {
            title: "雪亮工程",
            children: [{ title: "监控定位" }, { title: "监控查询" }],
          },
          {
            title: "出入口",
          },
          {
            title: "停车场",
          },
          {
            title: "道路",
          },
        ],
      },
      {
        id: 4,
        title: "民生保障",
        data: [
          {
            title: "服务机构",
            children: [{ title: "残联服务中心" }, { title: "养老中心" }],
          },
          {
            title: "重点服务人员",
            children: [
              { title: "高龄老人" },
              { title: "独居老人" },
              { title: "失业人员" },
              { title: "残疾人" },
            ],
          },
          {
            title: "政策法规",
          },
          {
            title: "办事流程",
          },
          {
            title: "邻里互动",
          },
          {
            title: "工作展示",
          },
        ],
      },
      {
        id: 5,
        title: "应急指挥",
        data: [
          {
            title: "应急物资",
          },
          {
            title: "应急站点",
          },
          {
            title: "消防栓",
          },
          { title: "摄像头" },
          {
            title: "烟雾报警器",
            children: [{ title: "设备定位" }, { title: "报警记录" }],
          },
          { title: "一键报警器" },
          { title: "隐患记录" },
           {
            title: "应急管理",
            children: [{ title: "疫情防控" }, { title: "法律法规" }, { title: "企业管理" }, { title: "风险评估" }],
          },
           {
            title: "培训宣传",
            children: [{ title: "应急演练" }, { title: "应急培训" }, { title: "案例警告" }],
          },
        ],
      },
      {
        id: 6,
        title: "智慧物业",
      },
      {
        id: 7,
        title: "经济运行",
      },
    ];
    const router = useRouter();
    const store = useStore();
    const handleClick = (data) => {
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
