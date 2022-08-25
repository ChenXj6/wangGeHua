import { getHandleList } from '@/api/ResidentsReport/index'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getHandleList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      // {
      //   prop: 'date',
      //   label: '工单号',
      //   minWidth: '100',
      // },
      // { prop: 'date', label: '所属网格', minWidth: '100' },
      { prop: '', label: '事件名称', slot: 'name',minWidth:'120' },
      { prop: 'eventPlace', label: '事件发生地', tooltip: true },
      {
        prop: 'happenTime',
        label: '事件发生时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: '',slot:'eventScope', label: '事项规模', minWidth: '120' },
      { prop: '',slot:'eventFirstType', label: '事项类型', tooltip: true },
      { prop: '',slot:'approvalStatus', label: '事项处理状态', minWidth: '120' },
      { prop: '',slot:'dataSource', label: '数据来源', minWidth: '120' },
      // { prop: 'eventUserName', label: '姓名', minWidth: '120' },
      // { prop: 'eventUserPhone', label: '联系电话', minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '150' },
    ],
  }
  const formConfig = {
    formItems: [
      // {
      //   type: 'Input',
      //   label: '工单号',
      //   prop: 'entryId',
      //   value: '',
      //   placeholder: '请输入工单号',
      //   isClearable: true,
      //   span: 6,
      // },
      {
        type: 'Input',
        label: '事件名称',
        prop: 'eventName',
        placeholder: '请输入',
        isClearable: true,
        span: 6,
      },
      {
        type: 'date',
        label: '发生时间',
        prop: 'happenTime',
        value: '',
        format: 'YYYY-MM-DD',
        isClearable: true,
        span: 6,
      },
      {
        type:'slot',
        label:'事件状态',
        slotName:'approvalStatus',
        placeholder: '请选择事件类型',
        span:6,
      },
      {
        type:'slot',
        label:'事件类型',
        slotName:'eventFirstType',
        placeholder: '请选择事件类型',
        span:6,
      },
      // {
      //   type: 'Input',
      //   label: '事件查询',
      //   prop: 'entryId',
      //   value: '',
      //   placeholder: '请输入事件',
      //   isClearable: true,
      //   span: 6,
      // },
      {
        type:'slot',
        label:'数据来源',
        slotName:'dataSource',
        placeholder: '请选择事件来源',
        span:6,
      },
    ],
  }
  return {
    tableConfig,
    formConfig,
  }
}
