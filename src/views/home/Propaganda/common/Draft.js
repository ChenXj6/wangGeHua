import { getDraft } from '@/api/Propaganda/draft'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getDraft, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'treeNames',
        label: '组织机构',
        minWidth: '400',
      },
      { prop: '', label: '标题',slot:'title', minWidth: '120' },
      { prop: 'releaseTime', label: '发布时间', minWidth: '150' },
      { prop: 'releaseUser', label: '发布人', tooltip: true, minWidth: '120' },
      { prop: 'levelName1', label: '文稿一级分类', tooltip: true, minWidth: '120' },
      { prop: 'levelName2', label: '文稿二级分类', tooltip: true, minWidth: '120' },
      { prop: 'levelName3', label: '文稿三级分类', tooltip: true, minWidth: '120' },
      // { prop: 'sort', label: '排序号', tooltip: true, },
      { type:'code',code:'1006',prop: 'isRecommend', label: '是否推荐', tooltip: true, minWidth: '120' },
      // { prop: 'consultNum', label: '查阅数量', tooltip: true, },
      { type:'code',code:'1074',prop: 'reviewStatus', label: '文稿审核状态', tooltip: true, minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '150' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        prop: '',
        value: '',
        slotName:'status',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '标题',
        prop: 'title',
        value: '',
        placeholder: '请输入标题',
        isClearable: true,
        span: 6,
      },
      {
        type: 'dateTime',
        label: '发布时间',
        prop: 'date',
        value: '',
        format: 'YYYY-MM-DD HH:mm:ss',
        isClearable: true,
        span: 6,
      },
    ],
  }
  return {
    tableConfig,
    formConfig,
  }
}
