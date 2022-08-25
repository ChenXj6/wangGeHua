import { getManageList } from '@/api/SmartProperty/Manage'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getManageList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: '',
        label: '物业名称',
        minWidth: '120',
        slot:'name',
      },
      { prop: 'treeNames', label: '归属网格', minWidth: '150' },
      { prop: 'manageVillage', label: '管理小区名称', minWidth: '150' },
      { prop: 'chargePerson', label: '负责人', minWidth: '150' },
      { prop: 'phone', label: '联系电话', minWidth: '150' },
      { prop: 'remarks', label: '备注', minWidth: '150' },
      { prop: 'createDate', label: '创建时间', formatter:'YYYY-MM-DD HH:mm:ss', minWidth: '150' },
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
        prop: 'name',
        value: '',
        placeholder: '请输入物业名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '管理小区名称',
        prop: 'manageVillage',
        value: '',
        placeholder: '请输入管理小区名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '负责人',
        prop: 'chargePerson',
        value: '',
        placeholder: '请输入负责人名字',
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