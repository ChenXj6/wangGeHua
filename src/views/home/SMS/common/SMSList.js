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
        prop: 'mobile',
        label: '手机号',
        slotName: 'mobile',
        minWidth: '120',
      },
      { prop: 'userid', label: '企业ID', minWidth: '' },
      { prop: 'account', label: '账号', minWidth: '' },
      { prop: 'https', label: '请求地址', toolTip: true, minWidth: '120' },
      { prop: 'content', label: '短信内容', toolTip: true, minWidth: '120' },
      { prop: 'taskid', label: '本次任务的序列ID', minWidth: '' },
      {
        type: 'code',
        code: '',
        prop: 'status',
        label: '状态报告',
        minWidth: '80',
      },
      {
        prop: 'receivetime',
        formatter: 'YYYY-MM-DD HH:mm:ss',
        label: '接收时间',
        minWidth: '120',
      },
      {
        prop: 'createDate',
        formatter: 'YYYY-MM-DD HH:mm:ss',
        label: '创建时间',
        minWidth: '120',
      },
      { prop: 'smokeAlarmId', label: '关联ID', minWidth: '60' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '100' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'Input',
        label: '手机号',
        prop: 'mobile',
        value: '',
        placeholder: '手机号',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '企业ID',
        prop: 'userid',
        value: '',
        placeholder: '企业ID',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '账号',
        prop: 'account',
        value: '',
        placeholder: '账号',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '请求地址',
        prop: 'https',
        value: '',
        placeholder: '请求地址',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '短信内容',
        prop: 'content',
        value: '',
        placeholder: '短信内容',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '任务序列ID',
        prop: 'taskid',
        value: '',
        placeholder: '任务序列ID',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '状态报告',
        prop: 'status',
        placeholder: '请选择状态报告',
        code:'1004',
        isClearable: true,
        span: 6,
      },
      {
        type: 'date',
        label: '接收时间',
        prop: 'receivetime',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '关联ID',
        prop: 'smokeAlarmId',
        value: '',
        placeholder: '关联ID',
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
