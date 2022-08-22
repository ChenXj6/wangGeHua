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
      { prop: '', label: '名称', slot:'dangerName', minWidth: '100', },
      { type:'code',code:'1058',prop: 'dangerType', label: '类型', minWidth: '100'},
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '150',
        tooltip:true,
      },
      { prop: 'longitude',tooltip:true, label: '经度',},
      { prop: 'latitude',tooltip:true, label: '维度',},
      { prop: 'manageProper',tooltip:true, label: '责任人',},
      { prop: 'managePhone',tooltip:true, label: '责任人电话',minWidth: '90'},
      { prop: 'safeProper',tooltip:true, label: '安全员',},
      { prop: 'safePhone',tooltip:true, label: '安全员电话', minWidth: '90'},
      { prop: 'legalProper',tooltip:true, label: '法人',},
      { prop: 'legalPhone',tooltip:true, label: '法人电话',minWidth: '90'},
      { prop: 'address',tooltip:true, label: '地址',tooltip: true, minWidth: '100'},
      { prop: 'synopsis', label: '简介', tooltip: true, minWidth: '100'},
      { prop: '', label: '操作', slot: 'operation', minWidth: '100' },
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
