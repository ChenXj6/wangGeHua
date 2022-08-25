import { getChargeList } from '@/api/SmartProperty/Charge'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getChargeList, // 請求api
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
      // { prop: '', slot:'type1', label: '一级分类', minWidth: '120' },
      // { prop: '', slot:'type2', label: '二级分类', minWidth: '120' },
      { prop: 'chargeTime', label: '时间', minWidth: '150' },
      { prop: 'amount', label: '金额', minWidth: '150' },
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
        placeholder: '请输入名称',
        isClearable: true,
        span: 6,
      },
      // {
      //   type: 'selectSearch',
      //   label: '一级分类',
      //   prop: 'type1',
      //   value: '',
      //   code:'1030',
      //   placeholder: '请选择一级分类',
      //   isClearable: true,
      //   span: 6,
      // },
      // {
      //   type: 'selectSearch',
      //   label: '二级分类',
      //   prop: 'type2',
      //   value: '',
      //   code:'1028',
      //   placeholder: '请选择二级分类',
      //   isClearable: true,
      //   span: 6,
      // },
      {
        type: 'dateTime',
        label: '日期',
        prop: 'date',
        value: [],
        format: 'YYYY-MM-DD HH:mm:ss',
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