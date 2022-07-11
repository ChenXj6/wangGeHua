import { PartyList } from '@/api/PartyBuilding/partyInfo'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const infoTtableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: PartyList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: 'infoName', label: '名称', minWidth: '200', },
      { prop: 'number', label: '编号', minWidth: '120'},
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '200',
      },
      { prop: '', slot:'orgType', label: '类型', minWidth: '120' },
      { prop: 'longitude', label: '经度', minWidth: '120'},
      { prop: 'latitude', label: '维度', minWidth: '120'},
      { prop: '', label: '操作', slot: 'operation', minWidth: '130' },
    ],
  }
  const infoFormConfig = {
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
        prop: 'infoName',
        value: '',
        placeholder: '请输入名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'orgType',
        value: '',
        placeholder: '请选择类型',
        code:'1057',
        isClearable: true,
        span: 6,
      },
    ],
  }
  return {
    infoTtableConfig,
    infoFormConfig,
  }
}
