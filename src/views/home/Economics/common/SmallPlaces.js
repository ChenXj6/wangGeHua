import { taxList } from '@/api/Economics/tax'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: taxList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '场所名称', slot:'revenueName' },
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '120',
      },
      { prop: '', slot:'revenueType', label: '场所类型', minWidth: '120' },
      { prop: '', slot:'revenueType', label: '场所详址', minWidth: '120' },
      { prop: '', slot:'revenueType', label: '使用面积', minWidth: '120' },
      { prop: '', slot:'revenueType', label: '场所负责人姓名', minWidth: '120' },
      { prop: '', slot:'revenueType', label: '场所负责人联系方式', minWidth: '120' },
      {
        prop: 'receivingTime',
        label: '创建时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
    },
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
        label: '场所名称',
        prop: 'revenueName',
        value: '',
        placeholder: '请输入场所名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '场所类型',
        prop: 'revenueType',
        value: '',
        placeholder: '请选择场所类型',
        code:'1054',
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
