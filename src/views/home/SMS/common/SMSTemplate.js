import { getTree } from '@/api/SocialGovernance/gridHotlineWorkOrder'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: false, // 开启分页器
    paginationAlign: 'right', // 分页器方向
    mutiSelect: false, // 开启选择
    method: getTree, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'moile',
        label: '模板名称',
        minWidth: '120',
      },
      { type: 'code',
      code: '',prop: '', label: '模板类型', minWidth: '' },
      { prop: '', label: '模板具体内容', toolTip: true, minWidth: '150' },
      {
        prop: 'createDate',
        formatter: 'YYYY-MM-DD HH:mm:ss',
        label: '创建时间',
        minWidth: '120',
      },
      { prop: '', label: '操作', slot: 'operation', minWidth: '100' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'Input',
        label: '模板名称',
        prop: 'mobile',
        value: '',
        placeholder: '请输入模板名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '模板类型',
        prop: 'status',
        placeholder: '请选择模板类型',
        code:'1004',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '模板具体内容',
        prop: 'smokeAlarmId',
        value: '',
        placeholder: '请输入模板具体内容',
        isClearable: true,
        span: 6,
      },
    ],
  }
  return {
    tableConfig,
    formConfig,
    // addFormConfig,
  }
}
