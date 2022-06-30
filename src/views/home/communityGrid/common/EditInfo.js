
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const InfoFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'slot',
        label: '机构名称',
        prop: 'officeName',
        slotName:'status',
        span: 11,
      },
      {
        type: 'Input',
        label: '区名称',
        prop: 'areaName',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '街道名称',
        prop: 'streetName',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '社区名称',
        prop: 'communityName',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '网格名称',
        prop: 'name',
        value: '',
        disabled:true,
        span: 11,
      },
      {
        type: 'Input',
        label: '网格性质',
        prop: 'gridCharacter',
        value: '',
        placeholder: '请输入网格性质',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '网格范围',
        prop: 'gridScope',
        value: '',
        placeholder: '请输入楼网格范围',
        isClearable: true,
        span: 11,
      },
      // {
      //   type: 'Input',
      //   label: '户数',
      //   prop: 'gridScope',
      //   value: '',
      //   placeholder: '请输入楼户数',
      //   isClearable: true,
      //   span: 11,
      // },
      // {
      //   type: 'Input',
      //   label: '常住人口',
      //   prop: 'gridScope',
      //   value: '',
      //   placeholder: '请输入常住人口',
      //   isClearable: true,
      //   span: 11,
      // },
      // {
      //   type: 'Input',
      //   label: '党员总数',
      //   prop: 'gridScope',
      //   value: '',
      //   placeholder: '请输入党员总数',
      //   isClearable: true,
      //   span: 11,
      // },
      // {
      //   type: 'Input',
      //   label: '重点人员',
      //   prop: 'gridScope',
      //   value: '',
      //   placeholder: '请输入重点人员',
      //   isClearable: true,
      //   span: 11,
      // },
      // {
      //   type: 'Input',
      //   label: '重点部位',
      //   prop: 'gridScope',
      //   value: '',
      //   placeholder: '请输入重点部位',
      //   isClearable: true,
      //   span: 11,
      // },
      {
        type: 'slot',
        label: '简介',
        prop: '',
        span: 22,
        slotName:'remarks'
      },
    ],
    rules:{
      officeName:[
        { required: true, message: '请选择机构', trigger: ['blur','change'] },
      ]
    }
  }
  return {
    InfoFormConfig
  }
}