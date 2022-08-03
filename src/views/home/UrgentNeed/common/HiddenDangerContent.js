import { getHiddenDangerContent } from '@/api/UrgentNeed/hiddenDangerContent'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getHiddenDangerContent, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: 'treeNames', label: '归属网格', minWidth: '300',toolTip:true },
      { type:'code',code:'1061',prop: 'dangerstatus', label: '状态', minWidth: '80'},
      { type:'code',code:'1059',prop: 'configType', label: '任务周期', minWidth: '90'},
      { prop: 'startTime', label: '开始时间',formatter: 'YYYY-MM-DD HH:mm:ss',minWidth: '130'},
      { prop: 'endTime', label: '结束时间',formatter: 'YYYY-MM-DD HH:mm:ss',minWidth: '130'},
      { prop: 'createDate', label: '创建时间',formatter: 'YYYY-MM-DD HH:mm:ss',minWidth: '130'},
      { prop: 'dangerinfoName', label: '隐患内容', minWidth: '70',toolTip:true },
      { type:'code',code:'1058',prop: 'dangerType', label: '点位类型', minWidth: '120'},
      { prop: 'processePer', label: '处理人',},
      { prop: 'processeTime', label: '处理时间',formatter: 'YYYY-MM-DD HH:mm:ss',minWidth: '130'},
      { type:'code',code:'1006',prop: 'isDanger', label: '是否存在隐患', minWidth: '90'},
      { prop: 'remarks', label: '备注',},
      { prop: '', label: '操作', slot: 'operation', minWidth: '200' },
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
      // {
      //   type: 'selectSearch',
      //   label: '类型',
      //   prop: 'configType',
      //   placeholder: '请选择类型',
      //   code:'1059',
      //   isClearable: true,
      //   span: 6,
      // },
      // {
      //   type: 'Input',
      //   label: '排查人员',
      //   prop: 'investigePer',
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
