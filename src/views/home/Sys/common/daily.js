import { getDaily } from '@/api/sys/daily'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getDaily, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'beginDate',
        label: '请求时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: 'userName', label: '用户', minWidth: '100' },
      { prop: 'url', label: '请求地址',tooltip:true, minWidth: '200' },
      { prop: 'inParams',label: '请求参数',tooltip:true, minWidth: '200' },
      { prop: 'result',label: '返回结果', minWidth: '120' },
      { prop: 'outParams',label: '返回参数',tooltip:true, minWidth: '200' },
      { prop: 'handleTime', label: '执行时长(ms)', minWidth: '120' },
      { prop: 'exception',label: '异常信息',tooltip:true, minWidth: '200' },      
    ],
  }
  const formConfig = {
    // labelWidth:'80px',
    formItems: [
      {
        type: 'Input',
        label: '用户',
        prop: 'userName',
        value: '',
        placeholder: '请输入用户',
        isClearable: true,
        span: 6,
      },
      {
        type: 'dateTime',
        label: '请求时间',
        prop: 'Date',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
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