import { getRubbishList } from '@/api/SmartProperty/rubbish'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getRubbishList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'streetName',
        label: '名称',
        minWidth: '120',
      },
      { prop: 'communityName', label: '归属网格', minWidth: '120' },
      { prop: 'gridName', label: '类型', minWidth: '120' },
      { prop: 'villageName', label: '车位数', tooltip: true, minWidth: '120' },
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
        placeholder: '请输入名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'houseType',
        value: '',
        placeholder: '请选择类型',
        code:'1023',
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