
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const InfoFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'slot',
        label: '',
        span: 6,
        slotName:'organ'
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