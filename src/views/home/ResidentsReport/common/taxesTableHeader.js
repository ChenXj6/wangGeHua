// import { getTaxesList } from '@/api/comparisonDiff/index'

export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: false,
    mutiSelect: true,
    method: '',
    index:1,
    columns: [
      {
        prop: 'entryId',
        label: '报关单号',
        width: '180',
        // fixed: 'left',
        render:''
      },
      { prop: 'billNo', label: '提运单号', width: '180'},
      { prop: 'date', label: '贸易方式', minWidth: '100'},
      { prop: 'address', label: '征免性质', minWidth: '100'},
      { prop: 'address', label: '实际完税价格', minWidth: '120' },
      { prop: 'address', label: '预估完税价格', minWidth: '120'},
      { prop: 'address', label: '实际税金合计', minWidth: '100' }, // contrast 数据对比控制样式方法；contrastField  该数据要对比的字段
    ]
  }
  return {
    tableConfig
  }
}
