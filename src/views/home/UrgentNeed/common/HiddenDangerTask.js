import { getHiddenDangerTask } from '@/api/UrgentNeed/hiddenDangerTask'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: true, // 开启选择
    method: getHiddenDangerTask, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: 'treeNames', label: '归属网格', minWidth: '250', },
      { type:'code',code:'1059',prop: 'configType', label: '类型', minWidth: '120'},
      { type:'code',code:'1058',prop: 'dangerType', label: '隐患点位类型', minWidth: '120'},
      { prop: 'investigePer', label: '排查人员',},
      { prop: 'createDate', label: '创建时间',formatter: 'YYYY-MM-DD HH:mm:ss',},
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
        type: 'selectSearch',
        label: '类型',
        prop: 'configType',
        placeholder: '请选择类型',
        code:'1059',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '排查人员',
        prop: 'investigePer',
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
