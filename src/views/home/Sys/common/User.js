import { fetchData } from '@/api/index'
import { eventStatus, eventType, eventSource } from '@/config/common'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: fetchData, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'id',
        label: 'ID',
        minWidth: '100',
      },
      { prop: 'operatorId', label: '账号', minWidth: '100' },
      { prop: 'operatorName', label: '姓名' },
      { prop: 'roleId', label: '角色', tooltip: true },
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
        label: '姓名',
        prop: 'operatorName',
        value: '',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 6,
      },
    ],
  }
  return {
    tableConfig,
    formConfig,
  }
}
