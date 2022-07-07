import { getTeamList } from '@/api/UrgentNeed/team'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getTeamList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '所属单位', slot:'orgId', minWidth: '200', },
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '250',
      },
      { prop: 'teamName', label: '姓名', minWidth: '200', },
      { prop: 'phone', label: '电话', minWidth: '120'},
      { prop: 'longitude', label: '经度', minWidth: '120'},
      { prop: 'latitude', label: '维度', minWidth: '120'},
      { prop: '', label: '操作', slot: 'operation', minWidth: '130' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        prop: 'status',
        value: '',
        slotName:'status',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '所属单位',
        prop: 'orgId',
        value: '',
        placeholder: '请填写所属单位',
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
