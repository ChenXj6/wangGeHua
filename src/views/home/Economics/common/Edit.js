import { getHouseList,getPeopleList,getPeopleByHouseList } from '@/api/ActualInfo/build'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const taxFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '名称',
        prop: 'revenueName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
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
        type: 'selectSearch',
        label: '类型',
        prop: 'revenueType',
        placeholder: '请选择类型',
        code:'1054',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '金额',
        prop: 'amount',
        value: '',
        placeholder: '请填写金额',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '所属年份',
        prop: 'year',
        value: '',
        placeholder: '请填写所属年份',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '所属月份',
        prop: 'month',
        value: '',
        placeholder: '请填写所属月份',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '任务数',
        prop: 'taskNum',
        value: '',
        placeholder: '请填写任务数',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '完成数',
        prop: 'completedNumber',
        value: '',
        placeholder: '请填写完成数',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '任务量',
        prop: 'taskVolume',
        value: '',
        placeholder: '请填写任务量',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '完成量',
        prop: 'completedQuantity',
        value: '',
        placeholder: '请填写完成量',
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
      revenueName: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择归属网格', trigger: ['blur','change'] },
      ],
      revenueType: [
        { required: true, message: '请选择类型', trigger: ['blur','change'] },
      ],
    }
  }
  const itemFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '名称',
        prop: 'projectName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
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
        label: '楼栋经/纬度',
        slotName:'lonAndLat',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '一级分类',
        prop: 'type1',
        placeholder: '请选择类型',
        code:'1054',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '二级分类',
        prop: 'type2',
        placeholder: '请选择类型',
        code:'1054',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '所属年份',
        prop: 'year',
        value: '',
        placeholder: '请填写所属年份',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '所属月份',
        prop: 'month',
        value: '',
        placeholder: '请填写所属月份',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '金额',
        prop: 'amount',
        value: '',
        placeholder: '请填写金额',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '排序号',
        prop: 'sort',
        value: '',
        placeholder: '请填写排序号',
        isClearable: true,
        span: 11,
      },
      {
        type: 'textarea',
        label: '详情',
        prop: 'details',
        value: '',
        placeholder: '',
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
      projectName: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择归属网格', trigger: ['blur','change'] },
      ],
      type1: [
        { required: true, message: '请选择一级分类', trigger: ['blur','change'] },
      ],
    }
  }
  const buildingFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '名称',
        prop: 'cbName',
        value: '',
        placeholder: '请填写名称',
        isClearable: true,
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
        label: '楼栋经纬度',
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
        prop: 'cbType',
        placeholder: '请选择类型',
        code:'1055',
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
      cbName: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择归属网格', trigger: ['blur','change'] },
      ],
      longitude: [
        { required: true, message: '请选择经纬度', trigger: ['blur','change'] },
      ],
      latitude: [
        { required: true, message: '请点击选择经纬度', trigger: ['blur','change'] },
      ],
      cbType: [
        { required: true, message: '请选择类型', trigger: ['blur','change'] },
      ],
      synopsis: [
        { required: true, message: '请填写简介', trigger: ['blur','change'] },
      ],
    }
  }
  const industryFormConfig = {
    gutter:10,
    formItems: [
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
        prop: 'industryType',
        placeholder: '请选择类型',
        code:'1056',
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
        label: '备注',
        prop: 'remarks',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 22,
      },
    ],
    rules:{
      industryType: [
        { required: true, message: '请选择类型', trigger: ['blur','change'] },
      ],
      officeName: [
        { required: true, message: '请选择归属网格', trigger: ['blur','change'] },
      ],
    }
  }
  return {
    taxFormConfig,
    itemFormConfig,
    buildingFormConfig,
    industryFormConfig,
  }
}