import { getHiddenDanger } from '@/api/UrgentNeed/hiddenDanger'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getHiddenDanger, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '名称', slot:'dangerName', minWidth: '120', },
      { type:'code',code:'1058',prop: 'dangerType', label: '类型', minWidth: '120'},
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '250',
      },
      { prop: 'longitude', label: '经度',},
      { prop: 'latitude', label: '维度',},
      { prop: 'manageProper', label: '责任人',},
      { prop: 'managePhone', label: '责任人电话',minWidth: '90'},
      { prop: 'safeProper', label: '安全员',},
      { prop: 'safePhone', label: '安全员电话', minWidth: '90'},
      { prop: 'legalProper', label: '法人',},
      { prop: 'legalPhone', label: '法人电话',minWidth: '90'},
      { prop: 'address', label: '地址',tooltip: true, minWidth: '120'},
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
        label: '名称',
        prop: 'dangerName',
        value: '',
        placeholder: '请输入名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'dangerType',
        placeholder: '请选择类型',
        code:'1058',
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
