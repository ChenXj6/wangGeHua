// import { streetName, communityName, gridName, buildNature, buildType, isTrue, useMode, format, buildingNo, sex, marriageStatus, education, personnelAttributes, special, relationship, keyServicePersonType, keyManagePersonType } from '@/config/common'
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
      { prop: 'idCard', label: '身份证号', minWidth: '120' },
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
      { prop: 'idCard', label: '身份证号', minWidth: '120' },
      // { prop: 'residenceNow', label: '具体住址',},
    ],
  }
  const StaffFormConfig = {
    gutter: 10,
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
        slotName:'officeCode',
        prop:'officeCode'
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
        prop: 'houseId',
        slotName:'house',
        isClearable: true,
        span: 11,
      },
      // {
      //   type: 'slot',
      //   label: '房屋',
      //   slotName: 'house',
      //   span: 11,
      //   prop:'houseId'
      // },
      {
        type: 'Input',
        label: '身份证号',
        prop: 'idCard',
        value: '',
        placeholder: '请输入身份证号',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '姓名',
        prop: 'staffName',
        value: '',
        placeholder: '请输入重点人员姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '曾用名',
        prop: 'beforeName',
        value: '',
        placeholder: '请输入重点人员曾用名',
        isClearable: true,
        span: 11,
      },
      
      {
        type: 'selectSearch',
        label: '性别',
        prop: 'gender',
        value: '',
        code: '1009',
        placeholder: '请选择重点人员性别',
        isClearable: true,
        span: 11,
      },
      {
        type: 'date',
        label: '出生日期',
        prop: 'birthDate',
        value: [],
        format: 'YYYY-MM-DD',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '民族',
        prop: 'nation',
        value: '',
        code: '1021',
        placeholder: '请选择重点人员民族',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '籍贯',
        prop: 'nativePlace',
        value: '',
        placeholder: '请输入重点人员籍贯',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '婚姻状态',
        prop: 'marriageStatus',
        value: '',
        code: '1010',
        placeholder: '请选择婚姻状态',
        isClearable: true,
        span: 11, 
      },
      {
        type: 'selectSearch',
        label: '政治面貌',
        prop: 'politicalOutlook',
        value: '',
        code: '1050',
        placeholder: '请选择政治面貌',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '学历',
        prop: 'education',
        value: '',
        code: '1011',
        placeholder: '请选择学历',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '宗教信仰',
        prop: 'religiousBelief',
        value: '',
        placeholder: '请输入宗教信仰',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '职业类别',
        prop: 'staffType',
        span: 11,
        code : '1032',
        placeholder: '请选择职业类别',
        isClearable: true,
      },
      {
        type: 'Input',
        label: '服务处所',
        prop: 'servicePlace',
        value: '',
        placeholder: '请输入服务处所',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '联系方式',
        prop: 'contactPhone',
        value: '',
        placeholder: '请输入联系方式',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '户籍地',
        prop: 'domicile',
        value: '',
        placeholder: '请输入户籍地',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '户籍详址',
        prop: 'domicileDetail',
        value: '',
        placeholder: '请输入户籍详址',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '现在地',
        prop: 'residenceNow',
        value: '',
        placeholder: '请输入现在地',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '现住详址',
        prop: 'residenceNowDetail',
        value: '',
        placeholder: '请输入现住详址',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '帮扶情况',
        prop: 'helpSituation',
        value: '',
        placeholder: '请输入帮扶情况',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '职业',
        prop: 'occupation',
        value: '',
        placeholder: '请输入职业',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '人员类型',
        prop: 'staffType',
        value: '',
        code : '1015',
        placeholder: '请选择人员类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '个人年收入',
        prop: 'annualIncome',
        value: '',
        placeholder: '请输入个人年收入',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '家庭成员姓名',
        prop: 'memberName',
        value: '',
        placeholder: '请输入家庭成员姓名',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '家庭成员电话',
        prop: 'memberPhone',
        value: '',
        placeholder: '请输入家庭成员电话',
        isClearable: true,
        span: 11,
      },
      {
        type: 'textarea',
        label: '困难及诉求',
        prop: 'appeal',
        value: '',
        placeholder: '请输入困难及诉求',
        isClearable: true,
        span: 22,
      },
      {
        type: 'textarea',
        label: '备注',
        prop: 'remarks',
        value: '',
        placeholder: '请输入备注',
        isClearable: true,
        span: 22,
      },
    ],
    rules: {
      streetCode: [
        { required: true, message: '请选择街道', trigger: ['blur','change'] },
      ],
      communityCode: [
        { required: true, message: '请选择社区', trigger: ['blur','change'] },
      ],
      officeCode: [
        { required: true, message: '请选择网格', trigger: ['blur','change'] },
      ],
      buildingId: [
        { required: true, message: '请选择楼栋', trigger: ['blur','change'] },
      ],
      houseId: [
        { required: true, message: '请选择房屋', trigger: ['blur','change'] },
      ],
      communityCode: [{ required: true, message: '请选择社区', trigger: ['blur', 'change'] }],
      idCard: [{ required: true, message: '请输入身份证号', trigger: ['blur', 'change'] }],
      staffName: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
      // houseNumber: [{ required: true, message: '请选择房屋', trigger: ['blur', 'change'] }],
    }
  }
  return {
    StaffFormConfig,
    houseTableConfig,
    peopleTableConfig,
    peopleByHouseTableConfig,
  }
}
