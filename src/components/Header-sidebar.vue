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
        type:'digitalPartyBuilding',
        data: [
          {
            title: "党组织",
            type:'dzz',
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
      },
      {
        id: 3,
        title: "网格政务",
        data: [
          {
            title: "简介",type:'briefIntroduction'
          },
          {
            title: "双实信息",
            children: [{ title: "楼栋标签",type:'building' }, { title: "定位查询",type:'location'}],
          },
          {
            title: "网格事件",
            children: [{ title: "当日事件",type:'someDayEvent' }, { title: "事件查询",type:'eventQuery' }],
          },
          {
            title: "12345热线",
            type:"hotline"
          },
          {
            title: "重点管理人员",
            children: [
              { title: "刑满释放",type:'release' },
              { title: "精神障碍",type:'neuropathy' },
              { title: "社区戒毒",type:'drugDetoxification' },
              { title: "社会矫正",type:'correct' },
              { title: "稳控对象",type:'control' },
              // { title: "人员查询",type:'personnelQuery' },
            ],
          },
          // {
          //   title: "雪亮工程",
          //   children: [{ title: "监控定位" }, { title: "监控查询" }],
          // },
          // {
          //   title: "出入口",
          // },
          // {
          //   title: "停车场",
          // },
          // {
          //   title: "道路",
          // },
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
        data:[
          {
            title: "车位位置",
          },
           {
            title: "摄像头位置",
          },
           {
            title: "道闸位置",
          },
           {
            title: "垃圾桶位置",
          },
           {
            title: "充电桩位置",
          },
          {
            title: "工作成果",
            type:"workResults"
          },
        ]
      },
      {
        id: 7,
        title: "经济运行",
        data:[
          {
            title: "商务楼宇",
          },
           {
            title: "重点项目",
          },
           {
            title: "重点企业",
          },
        ]
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
