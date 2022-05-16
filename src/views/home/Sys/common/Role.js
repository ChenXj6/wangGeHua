import { getUserList } from '@/api/sys/role'
import { eventStatus, eventType, eventSource } from '@/config/common'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    paginationAlign: 'center', // 分页器方向
    mutiSelect: false, // 开启选择
    method: getUserList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'id',
        label: 'ID',
        minWidth: '100',
      },
      { prop: 'name', label: '角色名', minWidth: '100' },
      { prop: 'remark', label: '备注', minWidth: '120', tooltip: true },
      { prop: 'createBy', label: '创建人' },
      {
        prop: 'createTime',
        label: '创建时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: '', label: '操作', slot: 'operation', minWidth: '100' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'Input',
        label: '角色名',
        prop: 'name',
        value: '',
        placeholder: '请输入角色名',
        isClearable: true,
        span: 4,
      },
    ],
  }
  const addFormConfig = {
    formItems: [
      {
        type: 'Input',
        label: '角色名',
        prop: 'name',
        value: '',
        placeholder: '请输入角色名',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '备注 ',
        prop: 'remark',
        value: '',
        placeholder: '请输入备注',
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
