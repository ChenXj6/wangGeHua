import { getPeopleList } from '@/api/ActualInfo/people'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
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
      { prop: 'communityName', label: '社区名称', minWidth: '120' },
      { prop: 'gridName', label: '网格名称', minWidth: '150' },
      { prop: 'villageName', label: '小区名称', tooltip: true, minWidth: '120' },
      { prop: 'buildingNumber', label: '楼栋',},
      { prop: '', slot:'unitNumber', label: '单元'},
      { prop: 'houseNumber', label: '房间号'},
      { prop: 'name', label: '姓名'},
      { prop: 'idcard', label: '身份证号',tooltip:true},
      { prop: '', label: '性别',slot:'gender'},
      { prop: '', label: '人员属性',slot:'personnelAttributes'},
      { prop: '', label: '是否接种疫苗',slot:'flagYmXg',minWidth:'100'},
      { prop: 'remarks', label: '简介',tooltip:true},
      // { prop: 'houseNo', label: '核实状态',tooltip:true},
      // { prop: 'houseNo', label: '状态',tooltip:true},
      { prop: '', label: '操作', fixed:'right', slot: 'operation', minWidth: '140' },
    ],
  }
  const formConfig = {
    gutter:'10',
    labelWidth:'130',
    formItems: [
      {
        type: 'Input',
        label: '姓名',
        prop: 'name',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '身份证号',
        prop: 'idcard',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 4,
      },
      {
        type: 'selectSearch',
        label: '民族',
        prop: 'nation',
        code:'1021',
        placeholder:'请选择民族',
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
