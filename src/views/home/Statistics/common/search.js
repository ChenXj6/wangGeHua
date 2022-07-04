import { getPeopleList } from '@/api/ActualInfo/people'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  // 网格人员类型统计
  const PeopleTypeFormConfig = {
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
        type: 'selectSearch',
        label: '类型',
        prop: 'houseType',
        value: '',
        placeholder: '请选择类型',
        code:'1005',
        isClearable: true,
        span: 6,
      },
    ],
  }
  // 事件类型处置统计
  const EventHandleFormConfig = {
    gutter:'10',
    labelWidth:'130',
    formItems: [
      {
        type: 'slot',
        label: '机构全称',
        prop: 'status',
        value: '',
        slotName:'status',
        isClearable: true,
        span: 6,
      },
      {
        type: 'dateTime',
        label: '日期选择',
        prop: 'date',
        value: [],
        format: 'YYYY-MM-DD',
        isClearable: true,
        span: 6,
      },
    ],
  }
  // 数据汇总
  
  const DataPollTableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getPeopleList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'streetName',
        label: '街道名称',
        minWidth: '120',
      },
      { prop: 'communityName', label: '网格力量', minWidth: '120' },
      { prop: 'gridName', label: '事项信息', minWidth: '150' },
      { prop: 'villageName', label: '实有楼栋', tooltip: true, minWidth: '120' },
      { prop: 'villageName', label: '实有房屋', tooltip: true, minWidth: '120' },
      { prop: 'buildingNumber', label: '实有人口'},
      { prop: 'builtupArea', label: '重点服务人员', minWidth: '120' },
      { prop: 'builtupArea', label: '上访人员', minWidth: '120' },
      { prop: 'housemaster', label: '社区矫正人员', minWidth: '120' },
      { prop: 'housemaster', label: '刑满释放人员', minWidth: '120' },
      { prop: 'housemaster', label: '精神障碍人员', minWidth: '120' },
      { prop: 'housemaster', label: '社区戒毒人员', minWidth: '120' },
    ],
  }
  // 12345周报表
    // 事件类型处置统计
    const weeklyFormConfig = {
      gutter:'10',
      labelWidth:'130',
      formItems: [
        {
          type: 'dateTime',
          label: '日期选择',
          prop: 'date',
          value: [],
          format: 'YYYY-MM-DD',
          isClearable: true,
          span: 6,
        },
      ],
    }
  const weeklyTableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getPeopleList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'streetName',
        label: '科室社区名称',
        minWidth: '120',
      },
      { prop: 'communityName', label: '办理工单数量', minWidth: '120' },
      { prop: 'gridName', label: '未按期回复数量', minWidth: '150' },
      { prop: 'villageName', label: '超期未接收(工作日)', tooltip: true, minWidth: '120' },
      { prop: 'villageName', label: '重新办理工单数量', tooltip: true, minWidth: '120' },
    ],
  }
  return {
    PeopleTypeFormConfig,
    EventHandleFormConfig,
    DataPollTableConfig,
    weeklyTableConfig,
    weeklyFormConfig,
  }
}
