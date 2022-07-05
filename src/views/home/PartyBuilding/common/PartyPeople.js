import { PartyPeopleList } from '@/api/PartyBuilding/partyPeople'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: PartyPeopleList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '姓名', slot:'memberName',minWidth: '100', },
      { prop: 'number', label: '编号', minWidth: '120'},
      {
        prop: 'partyOrgId',
        label: '归属党组织',
        minWidth: '200',
      },
      {
        prop: 'treeNames',
        label: '归属网格',
        minWidth: '200',
      },
      { prop: '', slot:'memberType', label: '类型', minWidth: '120' },
      { prop: '', slot:'title', label: '职称', minWidth: '120' },
      { prop: 'score', label: '积分', minWidth: '120'},
      { prop: '', slot:'pioneerFlag', label: '党建先锋', minWidth: '120' },
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
        label: '姓名',
        prop: 'memberName',
        value: '',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '党建先锋',
        prop: 'pioneerFlag',
        value: '',
        placeholder: '请选择',
        code:'1006',
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
