import { getVehicleList } from '@/api/SmartProperty/vehicle'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getVehicleList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: '',
        label: '车牌号',
        minWidth: '120',
        slot:'licenseNum',
      },
      { prop: 'treeNames', label: '归属网格', minWidth: '150' },
      { prop: 'ownerId', label: '车主', minWidth: '150' },
      { prop: 'userId', label: '使用人', minWidth: '150' },
      { prop: 'brand', label: '品牌', minWidth: '150' },
      { prop: '', slot:'vehicleType', label: '类型', minWidth: '120' },
      { prop: 'color', label: '颜色', minWidth: '150' },
      { prop: 'regDate', label: '上牌时间', minWidth: '150' },
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
        label: '车牌号',
        prop: 'licenseNum',
        value: '',
        placeholder: '请输入车牌号',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '车主',
        prop: 'ownerId',
        value: '',
        placeholder: '请输入车主姓名',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '使用人',
        prop: 'userId',
        value: '',
        placeholder: '请输入使用人姓名',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '品牌',
        prop: 'brand',
        value: '',
        placeholder: '请输入车辆品牌',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'vehicleType',
        value: '',
        code:'1028',
        placeholder: '请输入车辆类型',
        isClearable: true,
        span: 6,
      }, 
      {
        type: 'dateTime',
        label: '上牌日期',
        prop: 'date',
        value: [],
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