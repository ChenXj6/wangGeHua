import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home/index.vue";
import Main from "@/views/main/index.vue";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  // {
  //   path: '/',
  //   redirect: '/main'
  // },
  {
    path: "/",
    name: "Main",
    component: Main,
    meta: {
      title: '南村街道社会治理网格化智能工作平台'
    },
    children: [
      {
        path: "/map",
        name: "Map",
        meta: {
          title: '地图'
        },
        component: () => import( /* webpackChunkName: "map" */ "@/views/main/map.vue")
      },
    ],
    redirect:'/map'
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: '首页'
        },
        component: () => import( /* webpackChunkName: "dashboard" */ "@/views/home/Dashboard.vue")
      },
      {
        path: "/icon",
        name: "icon",
        meta: {
          title: '图标'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Icon.vue")
      }, 
      {
        path: "/tabs",
        name: "tab",
        meta: {
          title: '选项卡'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Tabs.vue")
      },
      {
        path: "/editor",
        name: "editor",
        meta: {
          title: '富文本'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Editor.vue")
      }, 
      {
        path: "/residentsReport",
        name: "residentsReport",
        meta: {
          title: '事件信息采集'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ResidentsReport/EventColl.vue")
      },
      {
        path: "/eventhandle",
        name: "eventhandle",
        meta: {
          title: '事件信息处置'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ResidentsReport/EventHandle.vue")
      },
      {
        path: "/editResidentsReport",
        name: "editResidentsReport",
        meta: {
          title: '上报事件',
          getTitle: function(route) {
            return `${route.query.operation == 1 ? '查看' : (route.query.operation == 2 ? '编辑' : '添加')}上报事件`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ResidentsReport/edit.vue")
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: '用户管理'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Sys/User.vue")
      },
      {
        path: "/dict",
        name: "dict",
        meta: {
          title: '字典管理'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Sys/Dict.vue")
      },
      {
        path: "/menu",
        name: "menu",
        meta: {
          title: '菜单管理'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Sys/Menu.vue")
      },
      {
        path: "/role",
        name: "role",
        meta: {
          title: '角色管理'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Sys/Role.vue")
      },
      {
        path: "/organ",
        name: "organ",
        meta: {
          title: '机构管理'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Sys/Organ.vue")
      },
      {
        path: "/distribution",
        name: "distribution",
        meta: {
          title: '系统管理'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Sys/distribution.vue")
      },
      {
        path: "/editorgan",
        name: "editorgan",
        meta: {
          title: '机构管理',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '新增' : '编辑'}机构`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Sys/EditOrgan.vue")
      },
      {
        path: "/actualbuild",
        name: "actualbuild",
        meta: {
          title: '实有楼栋'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ActualInfo/ActualBuild.vue")
      },
      {
        path: "/actualhouse",
        name: "actualhouse",
        meta: {
          title: '实有房屋'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ActualInfo/ActualHouse.vue")
      },
      {
        path: "/actualpeople",
        name: "actualpeople",
        meta: {
          title: '实有人口'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ActualInfo/ActualPeople.vue")
      },
      {
        path: "/editactual",
        name: "editactual",
        meta: {
          title: '实有信息',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'build' ? '楼栋' : (route.params.type == 'house' ? '房屋' : '人口')}`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ActualInfo/EditActual.vue")
      },
      {
        path: "/info",
        name: "info",
        meta: {
          title: '基本信息'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/communityGrid/Info.vue")
      },
      {
        path: "/borderInfo",
        name: "borderInfo",
        meta: {
          title: '边界信息'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/communityGrid/borderInfo.vue")
      },
      {
        path: "/staffInfo",
        name: "staffInfo",
        meta: {
          title: '人员力量信息'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/communityGrid/staffInfo.vue")
      },
      {
        path: "/editInfo",
        name: "editInfo",
        meta: {
          title: '实有信息',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}基本信息`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/communityGrid/EditInfo.vue")
      },
      {
        path: "/editBorderInfo",
        name: "editBorderInfo",
        meta: {
          title: '实有信息',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}边界信息`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/communityGrid/EditBorderInfo.vue")
      },
      {
        path: "/editStaffInfo",
        name: "editStaffInfo",
        meta: {
          title: '实有信息',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}人员力量`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/communityGrid/EditStaffInfo.vue")
      },
      {
        path: "/carpacrk",
        name: "carpacrk",
        meta: {
          title: '停车场'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/CarPacrk.vue")
      },
      {
        path: "/pubilcfacilities",
        name: "pubilcfacilities",
        meta: {
          title: '公共设施'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/PubilcFacilities.vue")
      },
      {
        path: "/rubbishclass",
        name: "rubbishclass",
        meta: {
          title: '垃圾分类'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/RubbishClass.vue")
      },
      {
        path: "/vehiclelist",
        name: "vehiclelist",
        meta: {
          title: '车辆列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/VehicleList.vue")
      },
      {
        path: "/parklot",
        name: "parklot",
        meta: {
          title: '车位信息'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/ParkLot.vue")
      },
      {
        path: "/charge",
        name: "charge",
        meta: {
          title: '收费列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/Charge.vue")
      },
      {
        path: "/manage",
        name: "manage",
        meta: {
          title: '物业公司'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/Manage.vue")
      },
      // {
      //   path: "/propertyManager",
      //   name: "propertyManager",
      //   meta: {
      //     title: '物业管家'
      //   },
      //   component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/PropertyManager.vue")
      // },
      {
        path: "/editsmart",
        name: "editsmart",
        meta: {
          title: '智慧物业',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'car' ? '停车场' : route.params.type == 'Vehicle' ? '车辆' : (route.params.type == 'Manage' ? '物业' : route.params.type == 'Charge' ? '收费' : route.params.type == 'ParkLot' ? '车位' : route.params.type == 'car' ? '停车场' : route.params.type == 'rubbish' ? '垃圾分类' : '公共设施')}`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/Edit.vue")
      },
      {
        path: "/ServicePersonnel",
        name: "ServicePersonnel",
        meta: {
          title: '重点服务人员'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ServicePersonnel/ServicePersonnel.vue")
      },
      {
        path: "/editServicePersonnel",
        name: "editServicePersonnel",
        meta: {
          title: '重点服务人员',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}重点服务人员`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ServicePersonnel/Edit.vue")
      },
      {
        path: "/DrugPer",
        name: "DrugPer",
        meta: {
          title: '戒毒人员'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ManagementPersonnel/DrugPer.vue")
      },
      {
        path: "/ReleasePer",
        name: "ReleasePer",
        meta: {
          title: '刑满释放人员'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ManagementPersonnel/ReleasePer.vue")
      },
      {
        path: "/RrectifyStaff",
        name: "RrectifyStaff",
        meta: {
          title: '社会矫正人员'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ManagementPersonnel/RrectifyStaff.vue")
      },
      {
        path: "/PetitionStaff",
        name: "PetitionStaff",
        meta: {
          title: '上访人员'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ManagementPersonnel/PetitionStaff.vue")
      },
      {
        path: "/MentaldisordersPer",
        name: "MentaldisordersPer",
        meta: {
          title: '精神障碍人员'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ManagementPersonnel/MentaldisordersPer.vue")
      },
      {
        path: "/eidtManagementPersonnel",
        name: "eidtManagementPersonnel",
        meta: {
          title: '重点管理人员',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'Drug' ? '吸毒人员' : route.params.type == 'Release' ? '刑满释放人员' : route.params.type == 'Rrectify' ? '社会矫正人员' : route.params.type == 'Petition' ? '上访人员' : '精神障碍人员' }`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ManagementPersonnel/Edit.vue")
      },
      {
        path: "/draft",
        name: "draft",
        meta: {
          title: '文稿列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Propaganda/Draft.vue")
      },
      {
        path: "/editDraft",
        name: "editDraft",
        meta: {
          title: '文稿列表',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'draft' ? '文稿' :'多媒体'}`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Propaganda/EditDraft.vue")
      },
      {
        path: "/draftReview",
        name: "draftReview",
        meta: {
          title: '文稿审核'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Propaganda/DraftReview.vue")
      },
      {
        path: "/media",
        name: "media",
        meta: {
          title: '多媒体列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Propaganda/MediaList.vue")
      },
      {
        path: "/gridPeopleType",
        name: "gridPeopleType",
        meta: {
          title: '网格人员类型统计'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/GridPeopleType.vue")
      },
      {
        path: "/eventHadle",
        name: "eventHadle",
        meta: {
          title: '事件类型处置统计'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/EventHandle.vue")
      },
      {
        path: "/eventHadleRate",
        name: "eventHadleRate",
        meta: {
          title: '事件类型处置率排名'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/EventHandleRate.vue")
      },
      {
        path: "/eventHadleOver",
        name: "eventHadleOver",
        meta: {
          title: '事件类型处置完成率排名'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/EventHandleOver.vue")
      },
      {
        path: "/daysEvent",
        name: "daysEvent",
        meta: {
          title: '事件日处理统计'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/DaysEvent.vue")
      },
      {
        path: "/dataPool",
        name: "dataPool",
        meta: {
          title: '数据汇总'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/DataPool.vue")
      },
      {
        path: "/satisfiedRate",
        name: "satisfiedRate",
        meta: {
          title: '满意率统计'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/SatisfiedRate.vue")
      },
      {
        path: "/12345Handle",
        name: "12345Handle",
        meta: {
          title: '12345热线办理比例分析图'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/12345Handle.vue")
      },
      {
        path: "/12345Weekly",
        name: "12345Weekly",
        meta: {
          title: '12345市民服务热线工单受理周报表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Statistics/12345Weekly.vue")
      },
      {
        path: "/hotlineManage",
        name: "hotlineManage",
        meta: {
          title: '12345热线管理'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SocialGovernance/HotlineManage.vue")
      },
      {
        path: "/editHotlineManage",
        name: "editHotlineManage",
        meta: {
          title: '12345热线管理',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : (route.params.operation == 2 ? '编辑' : '新增')}12345热线`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SocialGovernance/EditHotlineManage.vue")
      },
      {
        path: "/Management",
        name: "Management",
        meta: {
          title: '12345处置'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SocialGovernance/Management.vue")
      },
      {
        path: "/GridHotlineWorkOrder",
        name: "GridHotlineWorkOrder",
        meta: {
          title: '12345热线工单类别'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SocialGovernance/GridHotlineWorkOrder.vue")
      },
      {
        path: "/editOrder",
        name: "editOrder",
        meta: {
          title: '12345热线工单类别',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : (route.params.operation == 2 ? '编辑' : '新增')}12345热线工单类别`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SocialGovernance/EditOrder.vue")
      },
      {
        path: "/taxList",
        name: "taxList",
        meta: {
          title: '财政税收列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Economics/TaxList.vue")
      },
      {
        path: "/itemList",
        name: "itemList",
        meta: {
          title: '项目列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Economics/ItemList.vue")
      },
      {
        path: "/buildingList",
        name: "buildingList",
        meta: {
          title: '企业楼宇列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Economics/BuildingList.vue")
      },
      {
        path: "/smallPlaces",
        name: "smallPlaces",
        meta: {
          title: '九小场所'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Economics/SmallPlaces.vue")
      },
      {
        path: "/industry",
        name: "industry",
        meta: {
          title: '产业信息采集'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Economics/Industry.vue")
      },
      {
        path: "/editEconomics",
        name: "editEconomics",
        meta: {
          title: '经济运行',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'tax' ? '财政税收' : (route.params.type == 'item' ? '项目' : (route.params.type == 'building' ? '楼宇信息' : '产业信息'))}`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Economics/Edit.vue")
      },
      {
        path: "/partyInfo",
        name: "partyInfo",
        meta: {
          title: '党组织信息'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/PartyBuilding/PartyInfo.vue")
      },
      {
        path: "/partyPeople",
        name: "partyPeople",
        meta: {
          title: '党员信息'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/PartyBuilding/PartyPeople.vue")
      },
      {
        path: "/editParty",
        name: "editParty",
        meta: {
          title: '党建引领',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'partyInfo' ? '党组织' : '党员'}`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/PartyBuilding/Edit.vue")
      },
      {
        path: "/notice",
        name: "notice",
        meta: {
          title: '通知公告'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Notice/index.vue")
      },
      {
        path: "/editNotice",
        name: "editNotice",
        meta: {
          title: '通知公告',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}通知公告`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/Notice/Edit.vue")
      },
      {
        path: "/provide",
        name: "provide",
        meta: {
          title: '养老机构列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/LiveEnsure/Provide.vue")
      },
      {
        path: "/editProvide",
        name: "editProvide",
        meta: {
          title: '养老机构',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}养老机构`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/LiveEnsure/EditProvide.vue")
      },




      //
      {
        path: "/urgentNeedTeams",
        name: "urgentNeedTeams",
        meta: {
          title: '应急队伍列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/UrgentNeedTeams.vue")
      },
      {
        path: "/urgentNeedSupplies",
        name: "urgentNeedSupplies",
        meta: {
          title: '应急物资列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/UrgentNeedSupplies.vue")
      },
      {
        path: "/smokeDevide",
        name: "smokeDevide",
        meta: {
          title: '烟感设备列表'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/SmokeDevide.vue")
      },
      {
        path: "/hiddenDanger",
        name: "hiddenDanger",
        meta: {
          title: '隐患排查'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/HiddenDanger.vue")
      },
      {
        path: "/hiddenDangerTask",
        name: "hiddenDangerTask",
        meta: {
          title: '隐患排查定时任务'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/HiddenDangerTask.vue")
      },
      {
        path: "/hiddenDangerContent",
        name: "hiddenDangerContent",
        meta: {
          title: '隐患排查内容'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/HiddenDangerContent.vue")
      },
      {
        path: "/editHiddenDanger",
        name: "editHiddenDanger",
        meta: {
          title: '隐患排查',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}隐患排查`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/EditHiddenDanger.vue")
      },
      {
        path: "/editSmoke",
        name: "editSmoke",
        meta: {
          title: '烟感设备',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}烟感设备`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/EditSmoke.vue")
      },
      {
        path: "/editUrgentNeed",
        name: "editUrgentNeed",
        meta: {
          title: '应急',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'team' ? '应急队伍': '应急物资'}`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/UrgentNeed/EditUrgentNeed.vue")
      },
      {
        path: "/SMSList",
        name: "SMSList",
        meta: {
          title: '短信发送日志'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SMS/SMSList.vue")
      },
      {
        path: "/SMSTemplate",
        name: "SMSTemplate",
        meta: {
          title: '短信模板'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SMS/SMSTemplate.vue")
      },
      {
        path: "/editSMS",
        name: "editSMS",
        meta: {
          title: '短信模板',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${ route.params.type == 'list' ? '发送日志' : '短信模板' }`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SMS/EditSMS.vue")
      },
      {
        path: "/personal",
        name: "personal",
        meta: {
          title: '个人中心'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/User.vue")
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import( /* webpackChunkName: "login" */ "@/views/Login/login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = sessionStorage.getItem('Authorization');
  let user = JSON.parse(sessionStorage.getItem("user"));
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (user) {
      NProgress.start()
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (!user) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({path: '/login'})
    } else {
      if (user == null) {
        sessionStorage.removeItem("Authorization");
        next({path: '/login'});
      } else {
        NProgress.start()
        next()
      }
    }
  }
});

router.afterEach(transition => {
  NProgress.done()
})

export default router;