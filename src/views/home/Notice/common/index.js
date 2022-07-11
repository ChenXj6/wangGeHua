import { getNotice } from '@/api/Notice/index'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getNotice, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      // {
      //   prop: 'streetName',
      //   label: '街道名称',
      //   minWidth: '120',
      // },
      // {
      //   prop: 'communityName',
      //   label: '社区名称',
      //   minWidth: '120',
      // },
      {
        prop: 'officeName',
        label: '网格名称',
        minWidth: '150',
      },
      { prop: 'recipientName', label: '接收人', minWidth: '120'},
      { type:'code', code:'1065',prop: 'category', label: '通知类型', minWidth: '120' },
      { prop: 'summary', label: '标题', minWidth: '120'},
      { prop: 'date', label: '日期', formatter: 'YYYY-MM-DD', minWidth: '120'},
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
        label: '标题',
        prop: 'summary',
        value: '',
        placeholder: '请输入标题',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '通知类型',
        prop: 'category',
        value: '',
        placeholder: '请选择类型',
        code:'1065',
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
