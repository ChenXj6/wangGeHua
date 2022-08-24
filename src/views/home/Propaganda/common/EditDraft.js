
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
        label: '是否推荐',
        prop: 'isRecommend',
        placeholder:'请选择是否推荐',
        value: '',
        code:'1006',
        span: 11,
      },
      {
        type: 'slot',
        label: '文稿一级分类',
        prop: 'level1',
        slotName: 'level1',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '文稿二级分类',
        prop: 'level2',
        slotName: 'level2',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '文稿三级分类',
        prop: 'level3',
        slotName: 'level3',
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
        label: '内容',
        prop: 'content',
        span: 22,
        slotName:'content'
      },
    ],
    rules:{
      title:[
        { required: true, message: '请输入标题', trigger: ['blur','change'] },
      ],
      officeName:[
        { required: true, message: '请选择机构', trigger: ['blur','change'] },
      ],
      level1:[
        { required: true, message: '请选择文稿一级分类', trigger: ['blur','change'] },
      ],
      content:[
        { required: true, message: '请输入内容', trigger: ['blur','change'] },
      ],
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
        type: 'selectSearch',
        label: '类型',
        prop: 'mtype',
        value: '',
        code:'1071',
        placeholder: '请选择多媒体类型',
        isClearable: true,
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
        type: 'slot',
        label: '文稿一级分类',
        prop: 'level1',
        slotName: 'level1',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '文稿二级分类',
        prop: 'level2',
        slotName: 'level2',
        isClearable: true,
        span: 11,
      },
      {
        type: 'slot',
        label: '文稿三级分类',
        prop: 'level3',
        slotName: 'level3',
        isClearable: true,
        span: 11,
      },
      {
        type: 'selectSearch',
        label: '是否显示',
        prop: 'viewFlag',
        value: '',
        code:'1006',
        placeholder:'请选择是否显示',
        span: 11,
      },
      {
        type: 'Input',
        label: '组',
        prop: 'mediaGroups',
        value: '',
        span: 11,
      },
      {
        type: 'slot',
        label: '图片上传',
        prop: '',
        span: 11,
        slotName:'upload'
      },
    ],
    rules:{
      officeName:[
        { required: true, message: '请选择机构', trigger: ['blur','change'] },
      ],
      title:[
        { required: true, message: '请填写标题', trigger: ['blur','change'] },
      ],
      level1:[
        { required: true, message: '请选择一级分类', trigger: ['blur','change'] },
      ],
      viewFlag:[
        { required: true, message: '请选择是否展示', trigger: ['blur','change'] },
      ],
      mtype:[
        { required: true, message: '请选择多媒体类型', trigger: ['blur','change'] },
      ],
      mediaGroups:[
        { required: true, message: '请填写组', trigger: ['blur','change'] },
      ],
    }
  }
  return {
    InfoFormConfig,
    MediaFormConfig
  }
}