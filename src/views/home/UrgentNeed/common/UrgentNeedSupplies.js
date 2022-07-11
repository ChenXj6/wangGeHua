import { getSupp } from '@/api/UrgentNeed/supplies'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getSupp, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '物资名称', slot:'suppliesName', minWidth: '200', },
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '250',
      },
      { type: 'code', code:'1011',prop: 'type1', label: '大类型', minWidth: '120'},
      { type: 'code', code:'1011',prop: 'type2', label: '小类型', minWidth: '120'},
      { prop: 'amount', label: '数量', minWidth: '120'},
      { type: 'code', code:'1073',prop: 'suppliesStatus', label: '状态', minWidth: '120'},
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
        type: 'selectSearch',
        label: '大类型',
        prop: 'type1',
        placeholder: '请选择物资大类',
        code:'1011',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '小类型',
        prop: 'type2',
        placeholder: '请选择物资小类',
        code:'1011',
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
