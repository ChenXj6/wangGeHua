import { getRoleList } from '@/api/sys/role'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    paginationAlign: 'right', // 分页器方向
    mutiSelect: false, // 开启选择
    method: '', // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'id',
        label: 'ID',
        minWidth: '100',
      },
      { prop: 'title', label: '名称', minWidth: '100' },
      { prop: '', label: '类型', slot:'type', minWidth: '100' },
      { prop: 'icon', label: '图标', minWidth: '120', icon:'icon'},
      { prop: 'index', label: '菜单URL' },
      {
        prop: 'a',
        label: '授权标识',
        minWidth: '120',
      },
      {
        prop: 'b',
        label: '排序',
        minWidth: '120',
      },
      { prop: '', label: '操作', slot: 'operation', minWidth: '100' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'Input',
        label: '',
        prop: 'name',
        value: '',
        placeholder: '请输入名称',
        isClearable: true,
        span: 4,
      },
    ],
  }
  const addFormConfig = {
    formItems: [
      {
        type: 'radioGroup',
        label: '菜单类型',
        prop: 'type',
        value: '',
        placeholder: '请输入角色名',
        isClearable: true,
        span: 24,
        options:[
          {label:'目录',value:'1'},
          {label:'菜单',value:'2'},
          {label:'按钮',value:'3'},
        ]
      },
      {
        type: 'Input',
        label: '菜单名称',
        prop: 'title',
        value: '',
        placeholder: '菜单名称',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '上级菜单',
        prop: 'parentName',
        value: '',
        placeholder: '上级菜单',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '菜单图标',
        prop: 'icon',
        value: '',
        placeholder: '菜单图标 (如 el-icon-lx-weibo；el-icon-lx-emojifill)',
        isClearable: true,
        span: 24,
      },
    ],
    rules:{
      title: [
        { required: true, message: '请输入角色名', trigger: 'blur' },
      ],
    }
  }
  return {
    tableConfig,
    formConfig,
    addFormConfig,
  }
}
