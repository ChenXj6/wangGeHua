
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const InfoFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'slot',
        label: '机构名称',
        slotName:'status',
        span: 11,
        prop:'officeCode',
      },
      {
        type: 'Input',
        label: '区名称',
        prop: 'countyName',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '街道名称',
        prop: 'streetName',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '社区名称',
        prop: 'communityName',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '网格名称',
        prop: 'gridName',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'slot',
        label: '',
        prop: '',
        span: 24,
        slotName:'remarks'
      },
    ]
  }
  return {
    InfoFormConfig
  }
}