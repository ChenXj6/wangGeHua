// import { getTaxesList } from '@/api/comparisonDiff/index'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true,
    mutiSelect: false,
    method: '',
    index: '', // 是否启用序号列
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
      { prop: 'date', label: '事件发生时间', minWidth: '120', formatter:'YYYY-MM-DD HH:mm:ss' },
      { prop: 'date', label: '事项规模', minWidth: '120' },
      { prop: 'address', label: '事项类型', tooltip: true }, // contrast 数据对比控制样式方法；contrastField  该数据要对比的字段
      { prop: 'date', label: '事项处理状态', minWidth: '120' },
      { prop: 'date', label: '数据来源', minWidth: '120' },
      { prop: 'date', label: '姓名', minWidth: '120' },
      { prop: 'date', label: '联系电话', minWidth: '120' },
      { prop: '', label: '操作',slot:'operation',minWidth:'100' },
    ],
  }
  return {
    tableConfig,
  }
}
