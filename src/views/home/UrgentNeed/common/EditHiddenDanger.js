import { getUserList } from '@/api/sys/user'
import validator from '@/utils/validator'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const hiddenFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'dangerType',
        placeholder: '请选择设备类型',
        code:'1058',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '名称',
        prop: 'dangerName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'slot',
        label: '归属网格',
        slotName:'gridCode',
        prop:'gridName',
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
        label: '责任人',
        prop: 'manageProper',
        value: '',
        placeholder: '请填写责任人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '责任人电话',
        prop: 'managePhone',
        value: '',
        placeholder: '请填写责任人电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '安全员',
        prop: 'safeProper',
        value: '',
        placeholder: '请填写安全员',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '安全员电话',
        prop: 'safePhone',
        value: '',
        placeholder: '请填写安全员电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '法人',
        prop: 'legalProper',
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
        label: '地址',
        prop: 'address',
        value: '',
        placeholder: '请填写地址',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '简介',
        prop: 'synopsis',
        value: '',
        placeholder: '请填写简介',
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
      dangerName: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      gridName: [
        { required: true, message: '请选择所属机构', trigger: ['blur','change'] },
      ],
      dangerType: [
        { required: true, message: '请选择类型', trigger: ['blur','change'] },
      ],
      longitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
        { validator:validator.checkLongitude, trigger: ['blur']  }
      ],
      latitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
        { validator:validator.checkLongitude, trigger: ['blur']  }
      ],
    }
  }
  const taskFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'configType',
        placeholder: '请选择类型',
        code:'1059',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '隐患点位类型',
        prop: 'dangerType',
        placeholder: '请选择类型',
        code:'1058',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '归属网格',
        slotName:'gridCode',
        prop:'gridName',
        span: 11,
      },
      {
        type: 'slot',
        label: '排查人员',
        slotName:'manageProper',
        prop:'investigePer',
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
      investigePer: [
        { required: true, message: '请输入排查人员', trigger: ['blur','change'] },
      ],
      gridName: [
        { required: true, message: '请选择所属机构', trigger: ['blur','change'] },
      ],
      dangerType: [
        { required: true, message: '请选择类型', trigger: ['blur','change'] },
      ],
      configType: [
        { required: true, message: '请选择类型', trigger: ['blur','change'] },
      ],
    }
  }
  const userTableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    paginationAlign: 'right', // 分页器靠左、靠右、中间
    mutiSelect: false, // 开启选择
    method: getUserList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    paginationAlign:'left',
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'id',
        label: 'ID',
        minWidth: '100',
      },
      { prop: 'operatorId', label: '账号', minWidth: '100' },
      { prop: 'operatorName', label: '姓名' },
      { prop: 'roleId', label: '角色', tooltip: true },
      {
        prop: 'createTime',
        label: '创建时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
    ],
  }
  const contentFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '隐患名称',
        prop: 'dangerinfoName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
        disabled:true,
        span: 11,
      },
      {
        type: 'slot',
        label: '归属网格',
        slotName:'gridCode',
        prop:'gridName',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '处理人',
        prop: 'processePer',
        value: '',
        placeholder: '请填写处理人姓名',
        isClearable: true,
        disabled:true,
        span: 11,
      },
      {
        type: 'datetime',
        label: '处理时间',
        prop: 'processeTime',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        disabled:true,
        isHide:'hide',
        span: 11,
      },
      {
        type: 'datetime',
        label: '整改时间',
        prop: 'rectificationTime',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        disabled:true,
        isHide:'hide',
        span: 11,
      },
      {
        type: 'datetime',
        label: '复查时间',
        prop: 'reviewTime',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        disabled:true,
        isHide:'hide',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '是否存在隐患',
        prop: 'isDanger',
        placeholder: ' ',
        code:'1006',
        isClearable: true,
        span: 11,
        disabled:true,
      },
      {
        type: 'slot',
        label: '图片上传',
        prop: 'upload',
        span: 24,
        slotName:'upload',
        isHide:'hide',
      },
      {
        type: 'textarea',
        label: '备注',
        prop: 'remarks',
        value: '',
        placeholder: '',
        isClearable: true,
        disabled:true,
        span: 22,
      },
    ],
    rules:{
      dangerinfoName: [
        { required: true, message: '请输入隐患名称', trigger: ['blur'] },
      ],
      gridName: [
        { required: true, message: '请选择所属机构', trigger: ['blur','change'] },
      ],
      processePer: [
        { required: true, message: '请输入处理人', trigger: ['blur'] },
      ],
      processeTime: [
        { required: true, message: '请输入处理时间', trigger: ['blur','change'] },
      ],
      rectificationTime: [
        { required: true, message: '请输入整改时间', trigger: ['blur','change'] },
      ],
      reviewTime: [
        { required: true, message: '请输入复查时间', trigger: ['blur','change'] },
      ],
      isDanger: [
        { required: true, message: '请选择是否存在隐患', trigger: ['blur'] },
      ],
    }
  }
  return {
    hiddenFormConfig,
    taskFormConfig,
    userTableConfig,
    contentFormConfig,
  }
}