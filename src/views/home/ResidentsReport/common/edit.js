import { getUserList } from '@/api/sys/user'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const editFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '事件名称',
        prop: 'eventName',
        value: '',
        placeholder: '请输入事件名称',
        isClearable: true,
        span: 8,
      },
      {
        type: 'date',
        label: '发生时间',
        prop: 'happenTime',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        span: 8,
      },
      {
        type: 'slot',
        label: '组织结构',
        span: 4,
        slotName:'tree',
        prop:'streetCode'
      },
      {
        type: 'slot',
        label: '',
        span: 2,
        slotName:'communityCode',
        prop:'communityCode'
      },
      {
        type: 'slot',
        label: '',
        span: 2,
        slotName:'gridCode',
        prop:'gridCode'
      },
      {
        type: 'Input',
        label: '事件发生地点',
        prop: 'eventPlace',
        value: '',
        placeholder: '请输入事件发生地',
        isClearable: true,
        span: 8,
      },
      {
        type: 'slot',
        label: '事件经纬度',
        prop: 'eventLong',
        span: 4,
        slotName:'eventLong'
      },
      {
        type: 'slot',
        label: '',
        prop: 'eventLat',
        span: 4,
        slotName:'eventLat'
      },
      {
        type: 'selectSearch',
        label: '事件类型',
        span: 8,
        prop: 'eventFirstType',
        value: '',
        placeholder:'请选择事件类型',
        code:'1025',
        span:8,
      },
      {
        type: 'selectSearch',
        prop: 'eventScope',
        value: '',
        label:'事件规模',
        code:'1019',
        placeholder: '',
        isClearable: true,
        span: 8,
      },
      {
        type: 'Input',
        label: '涉及人数',
        prop: 'aboutPeopleNum',
        value: '',
        placeholder: '请输入涉及人数',
        isClearable: true,
        span: 8,
      },
      {
        type: 'Input',
        label: '当事人姓名',
        prop: 'mainPeopleName',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 8,
      },
      {
        type: 'Input',
        label: '当事人证件号',
        prop: 'mainPeopleCertificateNum',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 8,
      },
      {
        type: 'Input',
        label: '当事人地址',
        prop: 'mainPeopleAddress',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 8,
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
        label: '事情简述',
        prop: 'eventContent',
        span: 24,
      },
    ],
    rules:{
      eventName: [{ required: true, message: '请输入事件名称', trigger: 'blur' }],
      happenTime: [{ required: true, message: '请输入发生时间', trigger: 'blur' }],
      streetCode: [{ required: true, message: '请选择街道', trigger: ['change','blur'] }],
      communityCode: [{ required: true, message: '请选择社区', trigger: ['change','blur'] }],
      gridCode: [{ required: true, message: '请选择网格', trigger: ['change','blur'] }],
      eventPlace: [{ required: true, message: '请输入事件发生地', trigger: 'blur' }],
      eventLong: [{ required: true, message: '请点击获取经纬度', trigger: ['change','blur'] }],
      eventLat: [{ required: true, message: '请点击获取经纬度', trigger: ['change','blur'] }],
      eventFirstType:[{ required: true, message: '请选择事件类型', trigger: ['change','blur'] }],
      eventScope:[{ required: true, message: '请选择事件规模', trigger: ['change','blur'] }],
      eventContent:[{ required: true, message: '请输入事件简述', trigger: 'blur' }],
    }
  }
  
  const userTableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    paginationAlign: 'right', // 分页器靠左、靠右、中间
    mutiSelect: true, // 开启选择
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
      { prop: '', label: '操作', slot: 'operation' },
    ],
  }
  return {
    editFormConfig,
    userTableConfig
  }
}