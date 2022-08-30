import { placeList } from '@/api/Economics/smallplace'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: placeList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '场所名称', slot:'placeName' },
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '200',
      },
      { type:'code', code:'1093',prop: 'type', label: '场所类型', minWidth: '120' },
      { prop: 'address', label: '场所详址', minWidth: '120' },
      { prop: 'area', label: '使用面积(m²)', minWidth: '120' },
      { prop: 'personName',label: '场所负责人姓名', minWidth: '120' },
      { prop: 'personPhone',label: '场所负责人联系方式', minWidth: '120' },
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
        label: '场所名称',
        prop: 'placeName',
        value: '',
        placeholder: '请输入场所名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '场所类型',
        prop: 'type',
        value: '',
        placeholder: '请选择场所类型',
        code:'1093',
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
