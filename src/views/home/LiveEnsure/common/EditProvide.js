
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const ProvideFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '编号',
        prop: 'bh',
        value: '',
        placeholder: '请填写编号',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'Input',
        label: '名称',
        prop: 'orgName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
        span: 22,
      },
      {
        type: 'slot',
        label: '归属网格',
        slotName:'gridCode',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'orgType',
        placeholder: '请选择类型',
        code:'1067',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '经/纬度',
        slotName:'lonAndLat',
        span: 11,
      },
      {
        type: 'textarea',
        label: '简介',
        prop: 'synopsis',
        value: '',
        placeholder: '请输入简介',
        isClearable: true,
        span: 22,
      },
      {
        type: 'textarea',
        label: '备注',
        prop: 'remarks',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 22,
      },
    ],
    rules:{
      orgName: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      bh: [
        { required: true, message: '请输入编号', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择归属网格', trigger: ['blur','change'] },
      ],
      orgType: [
        { required: true, message: '请选择类型', trigger: ['blur','change'] },
      ],
      synopsis: [
        { required: true, message: '请输入简介', trigger: ['blur','change'] },
      ],
    }
  }
  return {
    ProvideFormConfig,
  }
}