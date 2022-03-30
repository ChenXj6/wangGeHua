import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home/index.vue";
import Main from "@/views/main/index.vue";

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: "/main",
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
      {
        path: "/a",
        name: "A",
        meta: {
          title: '安防平台'
        },
        component: () => import( /* webpackChunkName: "map" */ "@/views/main/a.vue")
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
      }, {
        path: "/table",
        name: "basetable",
        meta: {
          title: '表格'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/BaseTable.vue")
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
        path: "/residentsReport",
        name: "residentsReport",
        meta: {
          title: '居民上报事件'
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ResidentsReport/index.vue")
      },
      {
        path: "/editResidentsReport",
        name: "editResidentsReport",
        meta: {
          title: '上报事件',
          getTitle: function(route) {
            return `${route.query.operation == 1 ? '查看' : '编辑'}上报事件`
          },
        },
        component: () => import( /* webpackChunkName: "table" */ "@/views/home/ResidentsReport/edit.vue")
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import( /* webpackChunkName: "login" */ "@/views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403');
  } else {
    next();
  }
});

export default router;