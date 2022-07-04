import { getCleanerList } from '@/api/SmartProperty/propertyManager'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getCleanerList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'cleanerName',
        label: '姓名',
        minWidth: '120',
        // slot:'cleanerName',
      },
      { prop: 'treeNames', label: '归属网格', minWidth: '150' },
      { prop: '', slot:'cleanerType', label: '类型', minWidth: '120' },
      { prop: '', slot:'sex', label: '性别', minWidth: '120' },
      { prop: 'tel', label: '电话', minWidth: '150' },
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
        label: '姓名',
        prop: 'cleanerName',
        value: '',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'cleanerType',
        value: '',
        code:'1053',
        placeholder: '请选择类型',
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