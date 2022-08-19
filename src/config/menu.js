export const items = [
  {
    id: '1',
    icon: 'home',
    index: '/dashboard',
    title: '系统首页',
  },
  {
    id: '2',
    icon: 'cascades',
    index: '/table',
    title: '基础表格',
  },
  {
    id: '3',
    icon: 'cascades',
    index: '/icon',
    title: '图标',
  },
  {
    id: '4',
    icon: 'cascades',
    index: '/editor',
    title: '富文本',
  },
  {
    id: '5',
    icon: 'calendar',
    index: '1',
    title: '事件处置',
    children: [
      {
        id: '51',
        icon: 'service',
        index: '/residentsreport',
        title: '居民上报事件',
      },
    ],
  },
  {
    id: '6',
    icon: 'settings',
    index: '2',
    title: '系统管理',
    children: [
      {
        id: '61',
        icon: 'people',
        index: '/user',
        title: '用户管理',
      },
      {
        id: '62',
        icon: 'attention',
        index: '/role',
        title: '角色管理',
      },
      {
        id: '63',
        icon: 'cascades',
        index: '/menu',
        title: '菜单管理',
      },
    ],
  },
]
