import { getDictThTree } from '@/api/sys/multilevel'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: false, // 开启分页器
    paginationAlign: 'right', // 分页器方向
    mutiSelect: false, // 开启选择
    method: getDictThTree, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'id',
        label: 'ID',
        minWidth: '60',
      },
      { prop: 'name', label: '名称', minWidth: '120' },
      {
        prop: 'remarks',
        label: '备注',
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
        prop: 'name',
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
      name: [
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
