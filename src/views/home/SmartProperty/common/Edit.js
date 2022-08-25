import validator from '@/utils/validator'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const CarFormConfig = {
    gutter: 10,
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
        slotName: 'organ',
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'lotType',
        value: '',
        code: '1022',
        placeholder: '请选择停车场类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '车位数',
        prop: 'spaceNum',
        append:'个',
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
    rules: {
      name: [{ required: true, message: '请输入停车场名称', trigger: ['blur', 'change'] }],
      officeCode: [{ required: true, message: '请选择归属网格', trigger: ['blur', 'change'] }],
      lotType: [{ required: true, message: '请选择停车场类型', trigger: ['blur', 'change'] }],
      spaceNum: [{ required: true, message: '请输入车位数', trigger: ['blur', 'change'] }],
    }
  }
  const PubilcFormConfig = {
    gutter: 10,
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
        slotName: 'organ',
      },
      // {
      //   type: 'slot',
      //   label: '经纬度',
      //   prop: 'lonAndLat',
      //   span: 11,
      //   slotName: 'lonAndLat',
      // },
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
        label: '类型',
        prop: 'deviceType',
        value: '',
        code: '1023',
        placeholder: '请选择设施类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '数量',
        prop: 'amount',
        value: '',
        append:'个',
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
    rules: {
      deviceName: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
      officeCode: [{ required: true, message: '请选择归属网格', trigger: ['blur', 'change'] }],
      deviceType: [{ required: true, message: '请选择设施类型', trigger: ['blur', 'change'] }],
      amount: [{ required: true, message: '请输入数量', trigger: ['blur', 'change'] }],
      synopsis: [{ required: true, message: '请输入简介', trigger: ['blur', 'change'] }],
      longitude: [
        { required: true, message: '请点击获取经纬度', trigger: ['change','blur'] },
        { validator:validator.checkLongitude, trigger: ['blur']  }
      ],
      latitude: [
        { required: true, message: '请点击获取经纬度', trigger: ['change','blur'] },
        { validator:validator.checkLatitude, trigger: ['blur']  }
      ],
    }
  }
  const rubbishFormConfig = {
    gutter: 10,
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
        slotName: 'organ',
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
        label: '类型',
        prop: 'pointType',
        code: '1024',
        placeholder: '请选择垃圾类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '每日垃圾重量',
        prop: 'weightRefuse',
        value: '',
        placeholder: '',
        append:'kg',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '每日垃圾箱数',
        prop: 'binsNum',
        value: '',
        placeholder: '',
        append:'箱',
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
    rules: {
      pointName: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
      officeCode: [{ required: true, message: '请选择归属网格', trigger: ['blur', 'change'] }],
      pointType: [{ required: true, message: '请选择垃圾类型', trigger: ['blur', 'change'] }],
      longitude: [
        { required: true, message: '请点击获取经纬度', trigger: ['change','blur'] },
        { validator:validator.checkLongitude, trigger: ['blur']  }
      ],
      latitude: [
        { required: true, message: '请点击获取经纬度', trigger: ['change','blur'] },
        { validator:validator.checkLatitude, trigger: ['blur']  }
      ],
    }
  }
  const VehicleFormConfig = {
    gutter: 10,
    formItems: [
      {
        type: 'Input',
        label: '车牌号',
        prop: 'licenseNum',
        value: '',
        placeholder: '请填写车牌号',
        isClearable: true,
        span: 22,
      },
      {
        type: 'slot',
        label: '归属网格',
        prop: 'officeCode',
        span: 11,
        slotName: 'organ',
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'vehicleType',
        value: '',
        code: '1028',
        placeholder: '请选择车辆类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '品牌',
        prop: 'brand',
        value: '',
        placeholder: '请输入车辆品牌',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '车主',
        prop: 'ownerId',
        value: '',
        placeholder: '请输入车主',
        isClearable: true,
        span: 11,
      },
      {
        type: 'date',
        label: '上牌日期',
        prop: 'regDate',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '使用人',
        prop: 'userId',
        value: '',
        placeholder: '请输入使用人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '颜色',
        prop: 'color',
        value: '',
        placeholder: '请输入车辆颜色',
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
    rules: {
      licenseNum: [
        { required: true, message: '请输入车牌号', trigger: ['blur', 'change'] },
        { validator:validator.isLicenseNo, trigger: ['blur']  }
      ],
      officeCode: [{ required: true, message: '请选择归属网格', trigger: ['blur', 'change'] }],
      brand: [{ required: true, message: '请输入车辆品牌', trigger: ['blur', 'change'] }],
      vehicleType: [{ required: true, message: '请选择车辆类型', trigger: ['blur', 'change'] }],
    }
  }
  const ParkLotFormConfig = {
    gutter: 10,
    formItems: [
      {
        type: 'slot',
        label: '归属网格',
        prop: 'officeCode',
        span: 11,
        slotName: 'organ',
      },
      {
        type: 'Input',
        label: '已停数量',
        prop: 'useNum',
        value: '',
        append:'辆',
        placeholder: '请选择已停车辆',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '未停数量',
        prop: 'surplusNum',
        value: '',
        append:'辆',
        placeholder: '请输入未停数量',
        isClearable: true,
        span: 11,
      }
    ],
    rules: {
      officeCode: [{ required: true, message: '请选择归属网格', trigger: ['blur', 'change'] }],
    }
  }
  const ChargeFormConfig = {
      gutter: 10,
      formItems: [
        {
          type: 'slot',
          label: '归属网格',
          prop: 'officeCode',
          span: 11,
          slotName: 'organ',
        },
        {
          type: 'Input',
          label: '名称',
          prop: 'name',
          value: '',
          placeholder: '请输入名称',
          isClearable: true,
          span: 11,
        },
        {
          type: 'slot',
          label: '一级分类',
          prop: 'type1',
          slotName: 'level1',
          isClearable: true,
          span: 11,
        },
        {
          type: 'slot',
          label: '二级分类',
          prop: 'type2',
          slotName: 'level2',
          isClearable: true,
          span: 11,
        },
        {
          type: 'date',
          label: '时间',
          prop: 'chargeTime',
          value: '',
          format: 'YYYY-MM-DD HH:mm:ss',
          isClearable: true,
          span: 11,
        },
        {
          type: 'Input',
          label: '金额',
          prop: 'amount',
          value: '',
          append:'元',
          placeholder: '请输入金额',
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
      rules: {
        officeCode: [{ required: true, message: '请选择归属网格', trigger: ['blur', 'change'] }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        chargeTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        amount: [{ required: true, message: '请填写金额', trigger: 'blur' }],
        type1:[{ required: true, message: '请选择一级分类', trigger: ['blur', 'change'] }],
      }
    }
  const ManageFormConfig = {
    gutter: 10,
    formItems: [
      {
        type: 'slot',
        label: '归属网格',
        prop: 'officeCode',
        span: 11,
        slotName: 'organ',
      },
      {
        type: 'Input',
        label: '物业名称',
        prop: 'name',
        value: '',
        placeholder: '请输入物业名称',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '管理小区名称',
        prop: 'manageVillage',
        value: '',
        placeholder: '请输入物业名称',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '负责人',
        prop: 'chargePerson',
        value: '',
        placeholder: '请输入负责人姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '联系电话',
        prop: 'phone',
        value: '',
        placeholder: '请输入联系电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'textarea',
        label: '备注',
        prop: 'remarks',
        value: '',
        placeholder: '输入备注',
        isClearable: true,
        span: 22,
      },
    ],
    rules: {
      officeCode: [{ required: true, message: '请选择归属网格', trigger: ['blur', 'change'] }],
      phone: [{ validator: validator.phoneNumber, trigger: ['blur', 'change'] }],
    }
  }

  return {
    CarFormConfig,
    PubilcFormConfig,
    rubbishFormConfig,
    VehicleFormConfig,
    ParkLotFormConfig,
    ChargeFormConfig,
    ManageFormConfig,
  }
}
