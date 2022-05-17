export const items =  [
  {
    id: '1',
    icon: 'el-icon-lx-home',
    index: '/dashboard',
    title: '系统首页',
  },
  {
    id: '2',
    icon: 'el-icon-lx-cascades',
    index: '/table',
    title: '基础表格',
  },
  {
    id: '3',
    icon: 'el-icon-lx-cascades',
    index: '/icon',
    title: '图标',
  },
  {
    id: '4',
    icon: 'el-icon-lx-cascades',
    index: '/editor',
    title: '富文本',
  },
  {
    id: '5',
    icon: 'el-icon-lx-calendar',
    index: '1',
    title: '事件处置',
    children: [
      {
        id: '51',
        icon: 'el-icon-lx-service',
        index: '/residentsreport',
        title: '居民上报事件',
      },
    ],
  },
  {
    id: '6',
    icon: 'el-icon-lx-settings',
    index: '2',
    title: '系统管理',
    children: [
      {
        id: '61',
        icon: 'el-icon-lx-people',
        index: '/user',
        title: '用户管理',
      },
      {
        id: '62',
        icon: 'el-icon-lx-attention',
        index: '/role',
        title: '角色管理',
      },
      {
        id: '63',
        icon: 'el-icon-lx-cascades',
        index: '/menu',
        title: '菜单管理',
      },
    ],
  },
]