import { streetName, communityName, gridName,eventScope,eventFirstType,eventSecondType} from '@/config/common'

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
        prop: '',
        span: 8,
        slotName:'longAndLat'
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
    ]
  }
  return {
    editFormConfig
  }
}