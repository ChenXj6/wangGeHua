import { getRectifyList } from '@/api/ManagementPersonnel/rectifyStaff'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getRectifyList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'streetName',
        label: '街道名称',
        minWidth: '120',
      },
      { prop: 'communityName', label: '社区名称', minWidth: '150' },
      { prop: 'gridName', label: '网格名称', minWidth: '150' },
      { prop: 'villageName', label: '小区名称', minWidth: '150' },
      { prop: 'buildingNumber', label: '楼栋名称', minWidth: '150' },
      { prop: 'unitNumber', label: '单元名称', minWidth: '150' },
      { prop: 'houseNumber', label: '房屋名称', minWidth: '150' },
      { prop: 'staffName', label: '姓名', minWidth: '150' },
      { prop: 'residenceNow', label: '所在地', minWidth: '150' },
      // { prop: '', slot:'isState', label: '核实状态', minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '120' },
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
        label: '小区名称',
        prop: 'villageName',
        value: '',
        placeholder: '请输入小区名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '楼栋名称',
        prop: 'buildingNumber',
        value: '',
        placeholder: '请输入楼栋名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '单元名称',
        prop: 'unitNumber',
        value: '',
        placeholder: '请输入单元名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '房屋名称',
        prop: 'houseNumber',
        value: '',
        placeholder: '请输入房屋名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '姓名',
        prop: 'staffName',
        value: '',
        placeholder: '请输入姓名',
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