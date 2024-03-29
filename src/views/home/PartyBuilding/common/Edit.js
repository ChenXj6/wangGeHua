import validator from '@/utils/validator'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const partyFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '编号',
        prop: 'number',
        value: '',
        placeholder: '请填写党组织编号',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'Input',
        label: '名称',
        prop: 'infoName',
        value: '',
        placeholder: '请填写党组织名称',
        isClearable: true,
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
        type: 'selectSearch',
        label: '类型',
        prop: 'orgType',
        placeholder: '请选择类型',
        code:'1057',
        isClearable: true,
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
      number: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
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
      infoName: [
        { required: true, message: '请输入党组织名称', trigger: ['blur','change'] },
      ],
      longitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
        { validator:validator.checkLongitude, trigger: ['change','blur']  }
      ],
      latitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
        { validator:validator.checkLatitude, trigger: ['change','blur']  }
      ],
    }
  }
  const partyPeopleFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '编号',
        prop: 'number',
        value: '',
        placeholder: '请填写编号',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'Input',
        label: '姓名',
        prop: 'memberName',
        value: '',
        placeholder: '请填写姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '党员类型',
        prop: 'memberType',
        placeholder: '请选择类型',
        code:'1062',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '性别',
        prop: 'gender',
        placeholder: '请选择性别',
        code:'1009',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '年龄',
        prop: 'age',
        value: '',
        placeholder: '请填写年龄',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '归属党组织',
        slotName:'partyOrgId',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '职称',
        prop: 'title',
        placeholder: '请选择职称类型',
        code:'1063',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '党员先锋标识',
        prop: 'pioneerFlag',
        placeholder: '请选择',
        code:'1006',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '身份证',
        prop: 'idCard',
        value: '',
        placeholder: '请填写身份证号',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '党员先锋排序号',
        prop: 'pioneerSort',
        placeholder: '请填写党员先锋排序号',
        value:'',
        isClearable: true,
        span: 11,
      },
      {
        type: 'date',
        label: '入党日期',
        prop: 'joinDate',
        value: '',
        format: 'YYYY-MM-DD',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '电话',
        prop: 'phone',
        placeholder: '请填写电话',
        value:'',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '积分',
        prop: 'score',
        placeholder: '请填写积分',
        value:'',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '学历',
        prop: 'education',
        placeholder: '请选择学历',
        code:'1011',
        isClearable: true,
        span: 11,
      },
      {
        type: 'date',
        label: '出生日期',
        prop: 'birthDate',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        span: 11,
      },
      {
        type: 'textarea',
        label: '党员简介',
        prop: 'memberSynopsis',
        value: '',
        placeholder: '请输入党员简介',
        isClearable: true,
        span: 22,
      },
      {
        type: 'slot',
        label: '图片上传',
        prop: '',
        span: 24,
        slotName:'upload'
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
      number: [
        { required: true, message: '请输入编号', trigger: ['blur','change'] },
      ],
      memberName: [
        { required: true, message: '请输入姓名', trigger: ['blur','change'] },
      ],
      memberType: [
        { required: true, message: '请选择党员类型', trigger: ['blur','change'] },
      ],
      gender: [
        { required: true, message: '请选择性别', trigger: ['blur','change'] },
      ],
      age: [
        { required: true, message: '请填写年龄', trigger: ['blur','change'] },
      ],
      pioneerFlag: [
        { required: true, message: '请选择是否是党建先锋', trigger: ['blur','change'] },
      ],
      pioneerSort: [
        { required: true, message: '请填写党建先锋排序号', trigger: ['blur','change'] },
      ],
      joinDate: [
        { required: true, message: '请填写入党日期', trigger: ['blur','change'] },
      ],
    }
  }
  return {
    partyFormConfig,
    partyPeopleFormConfig,
  }
}