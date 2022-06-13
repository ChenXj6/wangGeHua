import { getPeopleInfoList } from '@/api/communityGrid/staffInfo'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getPeopleInfoList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: '',
        label: '网格力量类型',
        minWidth: '120',
        slot:'slotType',
      },
      { prop: 'name', label: '姓名',toolTip:true, minWidth: '120' },
      { prop: 'idcard', label: '身份证号码',toolTip:true, minWidth: '120' },
      { prop: 'phone', label: '电话',toolTip:true, minWidth: '120' },
      { prop: 'position', label: '职位',toolTip:true, minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '120' },
    ],
  }
  const formConfig = {
    gutter:'10',
    labelWidth:'130',
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        prop: 'status',
        value: '',
        slotName:'status',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '名称',
        prop: 'name',
        value: '',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 4,
      },
      {
        type: 'selectSearch',
        label: '力量类型',
        prop: 'status',
        code:'1017',
        placeholder:'选择力量类型',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '身份证号',
        prop: 'idcard',
        value: '',
        placeholder: '请输入身份证号',
        isClearable: true,
        span: 4,
      },
    ],
  }
  return {
    tableConfig,
    formConfig,
  }
}
