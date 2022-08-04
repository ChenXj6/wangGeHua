import { getHouseList,getPeopleList,getPeopleByHouseList } from '@/api/ActualInfo/build'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const houseTableConfig = {
    name: 'table1',
    data: [],
    pagination: false, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getHouseList, // 請求api
    index: false, // 是否启用序号列 
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'unitNumber',
        label: '单元号',
        minWidth: '120',
      },
      { prop: 'houseNumber', label: '房间号', minWidth: '120' },
      { prop: 'userName', label: '使用者姓名', minWidth: '120' },
      { prop: 'userPhone', label: '使用者联系方式', minWidth: '120' },
    ],
  }
  const peopleTableConfig = {
    name: 'table2',
    data: [],
    pagination: false, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getPeopleList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'name',
        label: '姓名',
      },
      { prop: 'idcard', label: '身份证号', minWidth: '120' },
      // { prop: 'residenceNow', label: '具体住址',minWidth:'200'},
    ],
  }
  const peopleByHouseTableConfig = {
    name: 'table3',
    data: [],
    pagination: false, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getPeopleByHouseList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'name',
        label: '姓名',
      },
      { prop: 'idcard', label: '身份证号', minWidth: '120' },
      // { prop: 'residenceNow', label: '具体住址',},
    ],
  }
  const buildFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        span: 8,
        slotName:'tree',
        prop:'streetCode'
      },
      {
        type: 'slot',
        label: '',
        span: 8,
        slotName:'communityCode',
        prop:'communityCode'
      },
      {
        type: 'slot',
        label: '',
        span: 6,
        slotName:'gridCode',
        prop:'gridCode'
      },
      {
        type: 'Input',
        label: '小区名称',
        prop: 'villageName',
        value: '',
        placeholder: '请填写小区名称',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: 'GISID',
        prop: 'gisid',
        value: '',
        placeholder: '请填写GIS地图id',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '楼号',
        prop: 'buildingNumber',
        value: '',
        placeholder: '请输入楼号',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '小区性质',
        prop: 'villageType',
        placeholder: '请选择小区性质',
        code:'1004',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '楼栋类型',
        prop: 'houseType',
        value: '',
        code:'1005',
        placeholder: '请选择楼栋类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '地上楼层数',
        prop: 'floorNumber',
        value: '',
        placeholder: '请填写地上楼层数',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '地上单元数',
        prop: 'unitNumber',
        value: '',
        placeholder: '请填写地上单元数',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '地上总户数',
        prop: 'houseNumber',
        value: '',
        placeholder: '请填写地上总户数',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '地下楼层数',
        prop: 'undergroundNumber',
        value: '',
        placeholder: '请填写地下楼层数',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '地下房间数',
        prop: 'undergroundHouse',
        value: '',
        placeholder: '请填写地下房间数',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '楼栋经/纬度',
        slotName:'lonAndLat',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '是否存在隐患',
        prop: 'hiddenDanger',
        value: '',
        code:'1006',
        placeholder: '是否存在隐患',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '建筑面积',
        prop: 'builtupArea',
        value: '',
        placeholder: '请填写建筑面积',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '物业公司',
        prop: 'propertyCompany',
        value: '',
        placeholder: '请填写物业公司名称',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '物业联系人',
        prop: 'propertyContact',
        value: '',
        placeholder: '请填写物业公司联系人',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '物业电话',
        prop: 'propertyTelephone',
        value: '',
        placeholder: '请填写物业联系电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '楼长姓名',
        prop: 'housemaster',
        value: '',
        placeholder: '请填写楼长姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '楼长电话',
        prop: 'housemasterPhone',
        value: '',
        placeholder: '请填写楼长电话',
        isClearable: true,
        span: 11,
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
        label: '简介',
        prop: 'remarks',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 22,
      },
    ],
    rules:{
      streetCode: [
        { required: true, message: '请选择街道', trigger: ['blur','change'] },
      ],
      communityCode: [
        { required: true, message: '请选择社区', trigger: ['blur','change'] },
      ],
      gridCode: [
        { required: true, message: '请选择网格', trigger: ['blur','change'] },
      ],
      villageName: [
        { required: true, message: '请输入小区名称', trigger: ['blur','change'] },
      ],
      buildingNumber: [
        { required: true, message: '请输入楼号', trigger: ['blur','change'] },
      ],
      houseType: [
        { required: true, message: '请选择楼栋类型', trigger: 'blur' },
      ],
      floorNumber: [
        { required: true, message: '请输入地上楼层数', trigger: 'blur' },
      ],
      unitNumber: [
        { required: true, message: '请输入地上单元数', trigger: ['blur','change'] },
      ],
      houseNumber: [
        { required: true, message: '请输入地上总户数', trigger: ['blur','change'] },
      ],
      undergroundNumber: [
        { required: true, message: '请输入地下楼层数', trigger: 'blur' },
      ],
      undergroundHouse: [
        { required: true, message: '请输入地下房间数', trigger: 'blur' },
      ],
      lonAndLat: [
        { required: true, message: '请输入楼栋经/纬度', trigger: 'blur' },
      ],
      hiddenDanger: [
        { required: true, message: '请选择是否存在隐患', trigger: 'blur' },
      ],
    }
  }
  const houseFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        span: 8,
        slotName:'tree',
        prop:'streetCode'
      },
      {
        type: 'slot',
        label: '',
        span: 8,
        slotName:'communityCode',
        prop:'communityCode'
      },
      {
        type: 'slot',
        label: '',
        span: 6,
        slotName:'gridCode',
        prop:'gridCode'
      },
      {
        type: 'slot',
        label: '楼栋',
        slotName:'buildingId',
        span: 11,
        prop:'buildingId'
      },
      {
        type: 'selectSearch',
        label: '单元号',
        prop: 'unitNumber',
        value: '',
        code:'1052',
        placeholder: '请选择单元号',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '楼层',
        prop: 'floorId',
        value: '',
        placeholder: '请输入楼层',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '房间号',
        prop: 'houseNumber',
        value: '',
        placeholder: '请输入房间号',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '房屋类型',
        prop: 'houseType',
        value: '',
        code:'1005',
        placeholder: '请选择房屋类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '房主姓名',
        prop: 'ownerName',
        value: '',
        placeholder: '请输入房主姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '联系电话',
        prop: 'ownerPhone',
        value: '',
        placeholder: '请输入房主联系电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '身份证号码',
        prop: 'ownerIdcard',
        value: '',
        placeholder: '请输入房主身份证号码',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '房屋建筑面积',
        prop: 'housearea',
        value: '',
        placeholder: '请输入房屋建筑面积',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '使用方式',
        prop: 'usageMode',
        value: '',
        placeholder: '请选择房屋使用方式',
        code:'1007',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '业态形式',
        prop: 'format',
        value: '',
        placeholder: '请选择业态形式',
        code:'1008',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '使用者姓名',
        prop: 'userName',
        value: '',
        placeholder: '请输入使用者姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '身份证号码',
        prop: 'userIdno',
        value: '',
        placeholder: '请输入使用者身份证号码',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '联系电话',
        prop: 'userPhone',
        value: '',
        placeholder: '请输入使用者联系电话',
        isClearable: true,
        span: 11,
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
        label: '简介',
        prop: 'remarks',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 22,
      },
    ],
    rules:{
      streetCode: [
        { required: true, message: '请选择街道', trigger: ['blur','change'] },
      ],
      communityCode: [
        { required: true, message: '请选择社区', trigger: ['blur','change'] },
      ],
      gridCode: [
        { required: true, message: '请选择网格', trigger: ['blur','change'] },
      ],
      buildingId: [
        { required: true, message: '请选择楼号', trigger: ['blur','change'] },
      ],
      unitNumber: [
        { required: true, message: '请选择单元', trigger: ['blur','change'] },
      ],
      floorId: [
        { required: true, message: '请输入楼层', trigger: ['blur','change'] },
      ],
      houseNumber: [
        { required: true, message: '请输入房间号', trigger: 'blur' },
      ],
    }
  }
  const peopleFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        span: 8,
        slotName:'tree',
        prop:'streetCode'
      },
      {
        type: 'slot',
        label: '',
        span: 8,
        slotName:'communityCode',
        prop:'communityCode'
      },
      {
        type: 'slot',
        label: '',
        span: 6,
        slotName:'gridCode',
        prop:'gridCode'
      },
      {
        type: 'slot',
        label: '楼栋',
        slotName:'buildingId',
        span: 11,
        prop:'buildingId'
      },
      {
        type: 'slot',
        label: '房屋',
        slotName: 'house',
        span: 11,
        prop:'house'
      },
      {
        type: 'Input',
        label: '姓名',
        prop: 'name',
        value: '',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '身份证号码',
        prop: 'idcard',
        value: '',
        placeholder: '请输入身份证号码',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '性别',
        prop: 'gender',
        value: '',
        code:'1009',
        placeholder: '请选择性别',
        isClearable: true,
        span: 11,
      },
      {
        type: 'date',
        label: '出生日期',
        prop: 'birthDate',
        value: '',
        format: 'YYYY-MM-DD',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '民族',
        prop: 'nation',
        code:'1021',
        placeholder:'请选择民族',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '婚姻状况',
        prop: 'marriageStatus',
        value: '',
        placeholder:'请选择婚姻状况',
        code:'1010',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '学历',
        prop: 'education',
        value: '',
        placeholder:'请选择学历',
        code:'1011',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '人员属性',
        prop: 'personnelAttributes',
        value: '',
        placeholder:'请选择人员属性',
        code:'1012',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '职业',
        prop: 'occupation',
        value: '',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '联系方式',
        prop: 'contactPhone',
        value: '',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '特殊属性',
        prop: 'special',
        value: '',
        placeholder:'请选择人员特殊属性',
        code:'1013',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '与户主关系',
        prop: 'relationship',
        value: '',
        placeholder:'请选择与户主的关系',
        code:'1014',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '户籍地',
        prop: 'domicile',
        value: '',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '家庭结构',
        prop: 'familyStructure',
        value: '',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '紧急联系人',
        prop: 'emergencyContact',
        value: '',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '紧急联系电话',
        prop: 'emergencyPhone',
        value: '',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '重点服务人员',
        prop: 'keyServicePersonType',
        value: '',
        placeholder:'请选择重点服务人员类型',
        code:'1015',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '重点管理人员',
        prop: 'keyManagePersonType',
        value: '',
        placeholder:'请选择重点管理人员类型',
        code:'1016',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '是否接种疫苗',
        prop: 'flagYmXg',
        value: '',
        placeholder:'请选择是否已接种新冠疫苗',
        code:'1006',
        isClearable: true,
        span: 11,
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
        label: '简介',
        prop: 'remarks',
        value: '',
        isClearable: true,
        span: 22,
      },
    ],
    rules:{
      streetCode: [
        { required: true, message: '请选择街道', trigger: ['blur','change'] },
      ],
      communityCode: [
        { required: true, message: '请选择社区', trigger: ['blur','change'] },
      ],
      gridCode: [
        { required: true, message: '请选择网格', trigger: ['blur','change'] },
      ],
      buildingId: [
        { required: true, message: '请选择楼栋', trigger: ['blur','change'] },
      ],
      house: [
        { required: true, message: '请选择房屋', trigger: ['blur','change'] },
      ],
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
      ],
      idCard: [
        { required: true, message: '请输入身份证号码', trigger: 'blur' },
      ],
      gender: [
        { required: true, message: '请选择性别', trigger: ['blur','change'] },
      ],
      nation: [
        { required: true, message: '请选择民族', trigger: ['blur','change'] },
      ],
      contactPhone: [
        { required: true, message: '请输入联系方式', trigger: 'blur' },
      ],
    }
  }
  return {
    houseTableConfig,
    peopleTableConfig,
    peopleByHouseTableConfig,
    buildFormConfig,
    houseFormConfig,
    peopleFormConfig,
  }
}