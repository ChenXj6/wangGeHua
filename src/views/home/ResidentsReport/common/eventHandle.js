import { getRecordList } from '@/api/ResidentsReport/index'
import { eventStatus, eventType, eventSource } from '@/config/common'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getRecordList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: true, // 是否开启拖拽
    columns: [
      // {
      //   prop: 'date',
      //   label: '工单号',
      //   minWidth: '100',
      // },
      // { prop: 'date', label: '所属网格', minWidth: '100' },
      { prop: '', label: '事件名称', slot: 'name',minWidth:'120' },
      { prop: 'eventLong', label: '事件发生地', tooltip: true },
      {
        prop: 'happenTime',
        label: '事件发生时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: 'eventScope', label: '事项规模', minWidth: '120' },
      { prop: 'eventFirstType', label: '事项类型', tooltip: true },
      { prop: 'approvalStatus', label: '事项处理状态', minWidth: '120' },
      { prop: 'dataSource', label: '数据来源', minWidth: '120' },
      { prop: 'eventUserName', label: '姓名', minWidth: '120' },
      { prop: 'eventUserPhone', label: '联系电话', minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '120' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'Input',
        label: '工单号',
        prop: 'entryId',
        value: '',
        placeholder: '请输入工单号',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '事件名称',
        prop: 'eventName',
        placeholder: '请输入',
        isClearable: true,
        span: 6,
      },
      {
        type: 'dateTime',
        label: '发生时间',
        prop: 'date',
        value: [],
        format: 'YYYY-MM-DD',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '事件状态',
        prop: 'status',
        value: '',
        placeholder: '请选择事件状态',
        code:'1001',
        isClearable: true,
        span: 6,
      },
      {
        type: 'select',
        label: '事件类型',
        prop: 'type',
        value: '',
        placeholder: '请选择事件类型',
        options: eventType,
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '事件查询',
        prop: 'entryId',
        value: '',
        placeholder: '请输入事件',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '事件来源',
        prop: 'source',
        value: '',
        placeholder: '请选择事件来源',
        code:'1003',
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
