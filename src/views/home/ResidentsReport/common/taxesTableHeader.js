import { fetchData } from '@/api/index'
import { eventStatus, eventType, eventSource } from '@/config/common'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable(handleQuery, handleReset) {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 開啟分頁器
    mutiSelect: false, // 開啟選擇
    method: fetchData, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: true, // 是否开启拖拽
    columns: [
      {
        prop: 'date',
        label: '工单号',
        minWidth: '100',
      },
      { prop: 'date', label: '所属网格', minWidth: '100' },
      { prop: 'name', label: '事件名称', slot: 'name' },
      { prop: 'address', label: '事件发生地', tooltip: true },
      {
        prop: 'date',
        label: '事件发生时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: 'date', label: '事项规模', minWidth: '120' },
      { prop: 'address', label: '事项类型', tooltip: true },
      { prop: 'date', label: '事项处理状态', minWidth: '120' },
      { prop: 'date', label: '数据来源', minWidth: '120' },
      { prop: 'date', label: '姓名', minWidth: '120' },
      { prop: 'date', label: '联系电话', minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '100' },
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
        prop: 'region',
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
        type: 'select',
        label: '事件状态',
        prop: 'status',
        value: '',
        placeholder: '请选择事件状态',
        options: eventStatus,
        isClearable: true,
        span: 6,
      },
      // {
      //   type: 'many',
      //   label: '事件类型',
      //   span: 8,
      //   children:{
      //     gutter:10,
      //     formItems:[
      //       {
      //         type: 'Input',
      //         prop: 'a',
      //         value: '',
      //         placeholder: '请输入事件',
      //         isClearable: true,
      //         span: 8,
      //       },
      //       {
      //         type: 'Input',
      //         prop: 'b',
      //         value: '',
      //         placeholder: '请输入事件',
      //         isClearable: true,
      //         span: 8,
      //       },
      //       {
      //         type: 'Input',
      //         prop: 'c',
      //         value: '',
      //         placeholder: '请输入事件',
      //         isClearable: true,
      //         span: 8,
      //       },
      //     ]
      //   }
      // },
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
        type: 'select',
        label: '事件来源',
        prop: 'source',
        value: '',
        placeholder: '请选择事件来源',
        options: eventSource,
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
