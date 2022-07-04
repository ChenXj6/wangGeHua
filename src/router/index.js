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
        path: "/editsmart",
        name: "editsmart",
        meta: {
          title: '智慧物业',
          getTitle: function(route) {
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.type == 'car' ? '停车场' : (route.params.type == 'rubbish' ? '垃圾分类' : '公共设施')}`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/SmartProperty/Edit.vue")
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
            return `${route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' )}${route.params.operation == 1 ? '文稿' :'多媒体'}`
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