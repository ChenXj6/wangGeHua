import { streetName, communityName, gridName,buildNature,buildType,isTrue,useMode,format,buildingNo,sex,marriageStatus,education,personnelAttributes,special,relationship,keyServicePersonType,keyManagePersonType } from '@/config/common'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const CarFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '名称',
        prop: 'name',
        value: '',
        placeholder: '请填写停车场名称',
        isClearable: true,
        span: 22,
      },
      {
        type: 'slot',
        label: '归属网格',
        prop: 'officeCode',
        span: 11,
        slotName:'organ',
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'lotType',
        value: '',
        code:'1022',
        placeholder:'请选择停车场类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '车位数',
        prop: 'spaceNum',
        value: '',
        placeholder: '请输入车位数',
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
      name:[{ required: true, message: '请输入停车场名称', trigger: ['blur','change'] }],
      officeCode:[{ required: true, message: '请选择归属网格', trigger: ['blur','change'] }],
      lotType:[{ required: true, message: '请选择停车场类型', trigger: ['blur','change'] }],
      spaceNum:[{ required: true, message: '请输入车位数', trigger: ['blur','change'] }],
    }
  }
  const PubilcFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '名称',
        prop: 'deviceName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
        span: 22,
      },
      {
        type: 'slot',
        label: '归属网格',
        prop: 'officeCode',
        span: 11,
        slotName:'organ',
      },
      {
        type: 'slot',
        label: '经纬度',
        prop: 'lonAndLat',
        span: 11,
        slotName:'lonAndLat',
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'deviceType',
        value: '',
        code:'1023',
        placeholder:'请选择设施类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '数量',
        prop: 'amount',
        value: '',
        placeholder: '',
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
      {
        type: 'Input',
        label: '备注',
        prop: 'remarks',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 22,
      },
    ],
    rules:{
      deviceName:[{ required: true, message: '请输入名称', trigger: ['blur','change'] }],
      officeCode:[{ required: true, message: '请选择归属网格', trigger: ['blur','change'] }],
      deviceType:[{ required: true, message: '请选择设施类型', trigger: ['blur','change'] }],
      amount:[{ required: true, message: '请输入数量', trigger: ['blur','change'] }],
      synopsis:[{ required: true, message: '请输入简介', trigger: ['blur','change'] }],
    }
  }
  const rubbishFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '名称',
        prop: 'pointName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
        span: 22,
      },
      {
        type: 'slot',
        label: '归属网格',
        prop: 'officeCode',
        span: 11,
        slotName:'organ',
      },
      {
        type: 'slot',
        label: '经纬度',
        prop: '',
        span: 11,
        slotName:'lonAndLat',
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'pointType',
        code:'1024',
        placeholder:'请选择垃圾类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '每日垃圾重量',
        prop: 'weightRefuse',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '每日垃圾箱数',
        prop: 'binsNum',
        value: '',
        placeholder: '',
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
      pointName:[{ required: true, message: '请输入名称', trigger: ['blur','change'] }],
      officeCode:[{ required: true, message: '请选择归属网格', trigger: ['blur','change'] }],
      pointType:[{ required: true, message: '请选择垃圾类型', trigger: ['blur','change'] }],
    }
  }
  return {
    CarFormConfig,
    PubilcFormConfig,
    rubbishFormConfig,
  }
}