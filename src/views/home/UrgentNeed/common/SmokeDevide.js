import { getSmoke } from '@/api/UrgentNeed/smoke'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getSmoke, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '名称', slot:'deviceName', minWidth: '200', },
      { prop: 'deviceImei', label: '识别码', minWidth: '120'},
      { type: 'code', code:'1072',prop: 'deviceType', label: '设备类型', minWidth: '120'},
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '250',
      },
      { prop: 'longitude', label: '经度', minWidth: '120'},
      { prop: 'latitude', label: '维度', minWidth: '120'},
      { prop: 'synopsis', label: '简介', tooltip: true, minWidth: '120'},
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
        label: '识别码',
        prop: 'deviceImei',
        value: '',
        placeholder: '请输入识别码',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '名称',
        prop: 'deviceName',
        value: '',
        placeholder: '请输入名称',
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
