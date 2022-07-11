
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const smokeFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '名称',
        prop: 'deviceName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
        disabled:false,
        span: 22,
      },
      {
        type: 'selectSearch',
        label: '设备类型',
        prop: 'deviceType',
        placeholder: '请选择设备类型',
        code:'1072',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '识别码',
        prop: 'deviceImei',
        value: '',
        placeholder: '请填写识别码',
        isClearable: true,
        disabled:false,
        span: 11,
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
        label: '紧急联系人',
        prop: 'emergencyContact',
        value: '',
        placeholder: '请填写紧急联系人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '紧急联系人电话',
        prop: 'emergencyPhone',
        value: '',
        placeholder: '请填写紧急联系人电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '安全责任人',
        prop: 'safetyPerson',
        value: '',
        placeholder: '请填写安全责任人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '安全责任人电话',
        prop: 'safetyPhone',
        value: '',
        placeholder: '请填写安全责任人电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '法人',
        prop: 'legalPerson',
        value: '',
        placeholder: '请填写法人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '法人电话',
        prop: 'legalPhone',
        value: '',
        placeholder: '请填写法人电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '社区责任人',
        prop: 'communityPerson',
        value: '',
        placeholder: '请填写社区责任人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '社区责任人电话',
        prop: 'communityPhone',
        value: '',
        placeholder: '请填写社区责任人电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '应急办负责人',
        prop: 'emergencyOfficePerson',
        value: '',
        placeholder: '请填写应急办负责人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '应急办负责电话',
        prop: 'emergencyOfficePhone',
        value: '',
        placeholder: '请填写应急办负责人电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'textarea',
        label: '简介',
        prop: 'synopsis',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 22,
      },
    ],
    rules:{
      deviceName: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择所属机构', trigger: ['blur','change'] },
      ],
      deviceImei: [
        { required: true, message: '请输入识别码', trigger: ['blur','change'] },
      ],
      deviceType: [
        { required: true, message: '请选择设备类型', trigger: ['blur','change'] },
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
    smokeFormConfig,
  }
}