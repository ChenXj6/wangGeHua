import { getHouseList } from '@/api/ActualInfo/house'
import { buildType } from '@/config/common'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getHouseList, // 請求api
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
      { prop: 'villageName', label: '小区名称', tooltip: true, minWidth: '120' },
      { prop: 'buildingNumber', label: '楼号'},
      { prop: 'unitNumber', label: '单元号'},
      { prop: 'floorId', label: '楼层'},
      { prop: 'houseNumber', label: '房间号'},
      { prop: '', label: '房屋类型', minWidth: '120',slot:'houseType' },
      { prop: 'ownerName', label: '房主姓名', minWidth: '120' },
      { prop: 'ownerPhone', label: '房主电话', minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '140' },
    ],
  }
  const formConfig = {
    gutter:'10',
    labelWidth:'130',
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
        span: 4,
      },
      {
        type: 'Input',
        label: '楼号',
        prop: 'buildingNo',
        placeholder: '请输入楼号',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '单元号',
        prop: 'unitNo',
        placeholder: '请输入单元号',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '房间号',
        prop: 'houseNo',
        placeholder: '请输入房间号',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '房主姓名',
        prop: 'ownerName',
        placeholder: '请输入房主姓名',
        isClearable: true,
        span: 4,
      },
      {
        type: 'selectSearch',
        label: '房屋类型',
        prop: 'houseType',
        value: '',
        placeholder: '请选择房屋类型',
        code:'1005',
        isClearable: true,
        span: 4,
      },
      {
        type: 'selectSearch',
        label: '业态形式',
        prop: 'format',
        value: '',
        placeholder: '请选择业态形式',
        code:'1008',
        isClearable: true,
        span: 4,
      },
      {
        type: 'selectSearch',
        label: '使用方式',
        prop: 'useMode',
        value: '',
        placeholder: '请选择使用方式',
        code:'1007',
        isClearable: true,
        span: 4,
      },

    ],
  }
  return {
    tableConfig,
    formConfig,
  }
}
