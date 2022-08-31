import { getInfoList } from '@/api/communityGrid/info'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getInfoList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: 'areaName', label: '区',toolTip:true, minWidth: '120' },
      { prop: 'qbm', label: '区编码',toolTip:true, minWidth: '120' },
      { prop: 'streetName', label: '街道名称',toolTip:true, minWidth: '120' },
      { prop: 'jdbm', label: '街道编码',toolTip:true, minWidth: '120' },
      { prop: 'communityName', label: '社区名称',toolTip:true, minWidth: '120' },
      { prop: 'sqbm', label: '社区编码',toolTip:true, minWidth: '120' },

      { prop: 'officeName', label: '网格名称',toolTip:true, minWidth: '120' },
      { prop: 'officeCode', label: '网格编码',toolTip:true, minWidth: '120' },
      {
        prop: 'gridCharacter',
        label: '网格性质',
        minWidth: '120',
      },
      { prop: 'gridScope', label: '网格范围',toolTip:true, minWidth: '120' },
      // { prop: 'communityName', label: '户数',toolTip:true, minWidth: '120' },
      // { prop: 'communityName', label: '常住人口',toolTip:true, minWidth: '120' },
      // { prop: 'communityName', label: '党员总数',toolTip:true, minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '160' },
    ],
  }
  const formConfig = {
    gutter:'10',
    labelWidth:'130',
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        prop: 'officeName',
        value: '',
        slotName:'status',
        isClearable: true,
        span: 6,
      },
      // {
      //   type: 'Input',
      //   label: '名称',
      //   prop: 'officeName',
      //   value: '',
      //   placeholder: '请输入名称',
      //   isClearable: true,
      //   span: 6,
      // },
    ],
  }
  return {
    tableConfig,
    formConfig,
  }
}
