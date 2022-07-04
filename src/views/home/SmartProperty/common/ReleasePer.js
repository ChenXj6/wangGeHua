import { getCarParkList } from '@/api/SmartProperty/carPark'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getCarParkList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: '',
        label: '名称',
        minWidth: '120',
        slot:'name',
      },
      { prop: 'treeNames', label: '归属网格', minWidth: '150' },
      { prop: '', slot:'lotType', label: '类型', minWidth: '120' },
      { prop: 'spaceNum', label: '车位数', tooltip: true, minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '120' },
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
        label: '名称',
        prop: 'villageName',
        value: '',
        placeholder: '请输入停车场名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'lotType',
        value: '',
        placeholder: '请选择停车场类型',
        code:'1022',
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