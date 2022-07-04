
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const InfoFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '标题',
        prop: 'title',
        value: '',
        span: 11,
      },
      {
        type: 'slot',
        label: '机构名称',
        prop: 'officeName',
        slotName:'status',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '文稿一级分类',
        prop: 'level1',
        value: '',
        code:'1005',
        placeholder: '请选择一级分类',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '文稿二级分类',
        prop: 'level2',
        value: '',
        code:'1005',
        placeholder: '请选择二级分类',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '是否推荐',
        prop: 'isRecommend',
        placeholder:'请选择是否推荐',
        value: '',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '文稿三级分类',
        prop: 'level3',
        value: '',
        code:'1005',
        placeholder: '请选择三级分类',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '文稿类型',
        prop: 'mType',
        value: '',
        code:'1005',
        placeholder: '请选择楼栋类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '图片上传',
        prop: '',
        span: 22,
        slotName:'upload'
      },
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
  const MediaFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '标题',
        prop: 'title',
        value: '',
        span: 11,
      },
      {
        type: 'slot',
        label: '机构名称',
        prop: 'officeName',
        slotName:'status',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '一级分类',
        prop: 'level1',
        value: '',
        code:'1005',
        placeholder: '请选择一级分类',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '二级分类',
        prop: 'level2',
        value: '',
        code:'1005',
        placeholder: '请选择二级分类',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '是否显示',
        prop: 'viewFlag',
        value: '',
        placeholder:'请选择是否显示',
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '三级分类',
        prop: 'level3',
        value: '',
        code:'1005',
        placeholder: '请选择三级分类',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'mType',
        value: '',
        code:'1005',
        placeholder: '请选择多媒体类型',
        isClearable: true,
        span: 11,
      },
      {
        type: 'Input',
        label: '组',
        prop: 'sort',
        value: '',
        span: 11,
      },
      {
        type: 'slot',
        label: '图片上传',
        prop: '',
        span: 22,
        slotName:'upload'
      },
    ],
    rules:{
      officeName:[
        { required: true, message: '请选择机构', trigger: ['blur','change'] },
      ]
    }
  }
  return {
    InfoFormConfig,
    MediaFormConfig
  }
}