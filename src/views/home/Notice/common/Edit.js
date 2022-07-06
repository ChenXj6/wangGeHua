
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const noticeFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        slotName:'gridCode',
        span: 11,
      },
      {
        type: 'Input',
        label: '标题',
        prop: 'summary',
        value: '',
        placeholder: '请填写标题',
        isClearable: true,
        disabled:false,
        span: 11,
      },      
      {
        type: 'selectSearch',
        label: '通知级别',
        prop: 'noticeType',
        placeholder: '请选择通知级别',
        code:'1064',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '通知类别',
        prop: 'category',
        placeholder: '请选择通知类别',
        code:'1065',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '接收部门',
        prop: 'recipientName',
        value: '',
        placeholder: '请填写接收部门',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'date',
        label: '日期',
        prop: 'date',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '上线状态',
        prop: 'cancelFlg',
        placeholder: '请选择',
        code:'1065',
        isClearable: true,
        span: 11,
      },
      {
        type: 'textarea',
        label: '内容',
        prop: 'content',
        value: '',
        placeholder: '请输入通知内容',
        isClearable: true,
        span: 22,
      },
      {
        type: 'textarea',
        label: '备注信息',
        prop: 'remarks',
        value: '',
        placeholder: '请输入备注信息',
        isClearable: true,
        span: 22,
      },
      {
        type: 'slot',
        label: '附件上传',
        prop: '',
        span: 6,
        slotName:'upload'
      },
    ],
    rules:{
      summary: [
        { required: true, message: '请输入标题', trigger: ['blur','change'] },
      ],
      noticeType: [
        { required: true, message: '请选择通知级别', trigger: ['blur','change'] },
      ],
      category: [
        { required: true, message: '请选择通知类别', trigger: ['blur','change'] },
      ],
      recipientName: [
        { required: true, message: '请输入接收部门', trigger: ['blur','change'] },
      ],
      content: [
        { required: true, message: '请输入内容', trigger: ['blur','change'] },
      ],
    }
  }
  return {
    noticeFormConfig,
  }
}