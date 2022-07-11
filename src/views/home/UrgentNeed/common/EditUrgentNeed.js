
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const teamsFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '所属单位',
        prop: 'orgId',
        value: '',
        placeholder: '请填写所属单位',
        isClearable: true,
        disabled:false,
        span: 22,
      },
      {
        type: 'slot',
        label: '归属网格',
        slotName:'gridCode',
        prop:'officeName',
        span: 11,
      },
      {
        type: 'slot',
        label: '经纬度',
        prop: 'longitude',
        span: 6,
        slotName:'eventLong'
      },
      {
        type: 'slot',
        label: '',
        prop: 'latitude',
        span: 5,
        slotName:'eventLat'
      },
      {
        type: 'Input',
        label: '姓名',
        prop: 'teamName',
        value: '',
        placeholder: '请填写姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '电话',
        prop: 'phone',
        value: '',
        placeholder: '请填写电话',
        isClearable: true,
        span: 11,
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
      orgId: [
        { required: true, message: '请输入所属单位', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择所属机构', trigger: ['blur','change'] },
      ],
      teamName: [
        { required: true, message: '请输入姓名', trigger: ['blur','change'] },
      ],
      longitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
      ],
      latitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
      ],
    }
  }
  const suppliesPeopleFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '物资名称',
        prop: 'suppliesName',
        value: '',
        placeholder: '请填写物资名称',
        isClearable: true,
        disabled:false,
        span: 22,
      },
      {
        type: 'slot',
        label: '归属网格',
        slotName:'gridCode',
        prop:'officeName',
        span: 11,
      },
      {
        type: 'slot',
        label: '经纬度',
        prop: 'longitude',
        span: 6,
        slotName:'eventLong'
      },
      {
        type: 'slot',
        label: '',
        prop: 'latitude',
        span: 5,
        slotName:'eventLat'
      },
      {
        type: 'selectSearch',
        label: '大类型',
        prop: 'type1',
        placeholder: '请选择物资大类',
        code:'1011',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '小类型',
        prop: 'type2',
        placeholder: '请选择物资小类',
        code:'1011',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '数量',
        prop: 'amount',
        value: '',
        placeholder: '请填写物资数量',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '物资状态',
        prop: 'suppliesStatus',
        placeholder: '请选择物资状态',
        code:'1073',
        isClearable: true,
        span: 11,
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
      suppliesName: [
        { required: true, message: '请输入物资名称', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择所属机构', trigger: ['blur','change'] },
      ],
      type1: [
        { required: true, message: '请选择物资大类', trigger: ['blur','change'] },
      ],
      type2: [
        { required: true, message: '请选择物资小类', trigger: ['blur','change'] },
      ],
      suppliesStatus: [
        { required: true, message: '请选择物资状态', trigger: ['blur','change'] },
      ],
      longitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
      ],
      latitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
      ],
    }
  }
  return {
    teamsFormConfig,
    suppliesPeopleFormConfig,
  }
}