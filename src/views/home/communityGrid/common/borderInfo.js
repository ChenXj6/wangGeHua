import { getBorderInfoList } from '@/api/communityGrid/borderInfo'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getBorderInfoList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: 'streetName', label: '街道名称',toolTip:true, minWidth: '120' },
      { prop: 'streetCode', label: '街道编码',toolTip:true, minWidth: '120' },
      { prop: 'communityName', label: '社区名称',toolTip:true, minWidth: '120' },
      { prop: 'countyCode', label: '社区编码',toolTip:true, minWidth: '120' },
      { prop: 'borderScope', label: '边界范围',toolTip:true, minWidth: '120' },
      {
        prop: 'longitude',
        label: '中心点',
        minWidth: '120',
      },
      { prop: 'borderColor', label: '边界颜色',toolTip:true, minWidth: '120' },
      { prop: 'fillColor', label: '填充颜色',toolTip:true, minWidth: '120' },
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
        prop: 'villageName',
        value: '',
        placeholder: '请输入名称',
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
