import { getBuildList } from '@/api/ActualInfo/build'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getBuildList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'streetName',
        label: '街道名称',
        minWidth: '120',
      },
      { prop: 'title', label: '标题', minWidth: '120' },
      { prop: 'releaseTime', label: '发布时间', minWidth: '150' },
      { prop: 'releaseName', label: '发布人', tooltip: true, minWidth: '120' },
      { prop: 'level1', label: '文稿一级分类', tooltip: true, minWidth: '120' },
      { prop: 'level2', label: '文稿二级分类', tooltip: true, minWidth: '120' },
      { prop: 'level3', label: '文稿三级分类', tooltip: true, minWidth: '120' },
      { prop: 'sort', label: '排序号', tooltip: true, minWidth: '120' },
      { prop: 'isRecommend', label: '是否推荐', tooltip: true, minWidth: '120' },
      { prop: 'consultNum', label: '查阅数量', tooltip: true, minWidth: '120' },
      { prop: 'opinion', label: '文稿审核状态', tooltip: true, minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '130' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'slot',
        label: '组织结构',
        prop: 'status',
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
        prop: 'releaseTime',
        value: [],
        format: 'YYYY-MM-DD',
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
