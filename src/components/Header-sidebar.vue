<template>
  <div class="menu-box">
    <span
      v-for="item in menuList"
      :key="item.id"
      class="menu-item"
      :class="currentMenu == item.title ? 'active':''"
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
          // {
          //   title: "12345热线",
          //   type:"hotline"
          // },
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
        type:'liveensure',
        data: [
          {
            title: "服务机构",
            children: [{ title: "残联服务中心", type:'haidi' }, { title: "养老中心", type:'provide' }],
          },
          {
            title: "重点服务人员",
            children: [
              { title: "高龄老人", type:'service',staffType:'3'},
              { title: "独居老人", type:'service',staffType:'10' },
              { title: "失业人员", type:'service',staffType:'2' },
              { title: "残疾人", type:'service',staffType:'6' },
            ],
          },
          {
            title: "政策法规",
            type:'policy'
          },
          {
            title: "办事流程",
            type:'process',
          },
          {
            title: "邻里互动",
            type:'neighborhood',
          },
          {
            title: "工作展示",
            type:'liveworkshow',
          },
        ],
      },
      {
        id: 5,
        title: "应急指挥",
        data: [
          {
            title: "应急物资",
            type:'supplies',
          },
          {
            title: "应急站点",
            type:'site',
          },
          {
            title: "消防栓",
            type:'fireHydrant',
          },
          { title: "摄像头",
            type: 'camera',
          },
          {
            title: "烟雾报警器",
            children: [{ title: "设备定位",type:'smokeDetector' }, { title: "报警记录",type:'smokeRecord' }],
          },
          { title: "一键报警器",type:'alarm' },
          { title: "隐患记录",type:'hiddenDanger' },
           {
            title: "应急管理",
            children: [{ title: "疫情防控",type:'pandemic' }, { title: "法律法规",type:'law' }, { title: "企业管理",type:'business' }, { title: "风险评估",type:'risk' }],
          },
           {
            title: "培训宣传",
            children: [{ title: "应急演练",type:'drill' }, { title: "应急培训",type:'training' }, { title: "案例警告",type:'casewarning' }],
          },
        ],
      },
      {
        id: 6,
        title: "智慧物业",
        data:[
          {
            title: "车位位置",
            type:'parkingLotPosition',
          },
           {
            title: "摄像头位置",
            type:'cameraPosition',
            deviceType:'2'
          },
           {
            title: "道闸位置",
            type:'roadGatePosition',
            deviceType:'3'
          },
           {
            title: "垃圾桶位置",
            type:'trashCanPosition',
            deviceType:'4'
          },
           {
            title: "充电桩位置",
            type:'chargingPilePosition',
            deviceType:'5'
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
            type:'businessBuilding',
            cbType:"1"
          },
           {
            title: "重点项目",
            type:'keyProjects',
          },
           {
            title: "重点企业",
            type:'keyEnterprises',
            cbType:"2"
          },
           {
            title: "招商政策",
            children: [{ title: "专业综合市场",type:'integratedMarket' }, { title: "楼宇经济",type:'buildingEconomy' }],
          },
        ]
      },
    ];
    const router = useRouter();
    const store = useStore();
    const currentMenu = ref('')
    const handleClick = (data) => {
      currentMenu.value = data.title
      store.dispatch("handleClick", data);
    };
    return {
      menuList,
      router,
      handleClick,
      store,
      currentMenu,
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
  height: 30px;
  line-height: 30px;
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
  border-top: 1px solid #fff;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
</style>
