import { itemList } from '@/api/Economics/itemList'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: itemList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '名称', slot:'projectName',minWidth: '200', },
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '200',
      },
      { prop: 'typeName1', label: '一级类型', minWidth: '120' },
      { prop: 'typeName2',  label: '二级类型', minWidth: '120' },
      { prop: 'year', label: '所属年份', minWidth: '150' },
      { prop: 'month', label: '所属月份', tooltip: true, minWidth: '120' },
      { prop: 'sort', label: '排序号', tooltip: true, minWidth: '120' },
      { prop: 'longitude', label: '经度', minWidth: '120'},
      { prop: 'latitude', label: '维度', minWidth: '120'},
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
        prop: 'projectName',
        value: '',
        placeholder: '请输入名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '一级分类',
        prop: 'type1',
        value: '',
        placeholder: '请选择类型',
        code:'1054',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '二级分类',
        prop: 'type2',
        value: '',
        placeholder: '请选择类型',
        code:'1054',
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
