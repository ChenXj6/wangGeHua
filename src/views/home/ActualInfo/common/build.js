import { getBuildList } from '@/api/ActualInfo/build'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: true, // 开启选择
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
      { prop: 'communityName', label: '社区名称', minWidth: '120' },
      { prop: 'gridName', label: '网格名称', minWidth: '150' },
      {
        prop: 'villageName',
        label: '小区名称',
        tooltip: true,
        minWidth: '120',
      },
      { prop: '', label: '小区性质', slot: 'villageType' },
      { prop: 'buildingNumber', label: '楼号' },
      { prop: 'builtupArea', label: '建筑面积(㎡)', minWidth: '120' },
      { prop: '', label: '楼栋类型', minWidth: '120', slot: 'houseType' },
      { prop: 'housemaster', label: '楼长姓名', minWidth: '120' },
      // { prop: 'isLocation', label: '是否定位' },
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
        slotName: 'status',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '小区名称',
        prop: 'villageName',
        value: '',
        placeholder: '请输入小区名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '楼号',
        prop: 'buildingNumber',
        placeholder: '请输入楼号',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '楼栋类型',
        prop: 'houseType',
        value: '',
        placeholder: '请选择楼栋类型',
        code: '1005',
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
