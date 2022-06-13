import { getPeopleList } from '@/api/ActualInfo/people'
import { buildType } from '@/config/common'

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
      { prop: 'unitNumber', label: '单元'},
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
      // {
      //   type: 'select',
      //   label: '组织结构',
      //   prop: 'status',
      //   value: '',
      //   placeholder: '请选择组织结构',
      //   options: [],
      //   isClearable: true,
      //   span: 4,
      // },
      // {
      //   type: 'Input',
      //   label: '小区名称',
      //   prop: 'villageName',
      //   value: '',
      //   placeholder: '请输入小区名称',
      //   isClearable: true,
      //   span: 4,
      // },
      // {
      //   type: 'Input',
      //   label: '楼号',
      //   prop: 'buildingNo',
      //   placeholder: '请输入楼号',
      //   isClearable: true,
      //   span: 4,
      // },
      // {
      //   type: 'Input',
      //   label: '单元号',
      //   prop: 'unitNo',
      //   placeholder: '请输入单元号',
      //   isClearable: true,
      //   span: 4,
      // },
      // {
      //   type: 'Input',
      //   label: '房间号',
      //   prop: 'houseNo',
      //   placeholder: '请输入房间号',
      //   isClearable: true,
      //   span: 4,
      // },
      {
        type: 'Input',
        label: '姓名',
        prop: 'ownerName',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '身份证号',
        prop: 'houseType',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '民族',
        prop: 'format',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 4,
      },
      // {
      //   type: 'Input',
      //   label: '人员属性',
      //   prop: 'useMode',
      //   value: '',
      //   placeholder: '',
      //   isClearable: true,
      //   span: 4,
      // },
      // {
      //   type: 'Input',
      //   label: '是否接种疫苗',
      //   prop: 'useMode',
      //   value: '',
      //   placeholder: '',
      //   isClearable: true,
      //   span: 4,
      // },

    ],
  }
  return {
    tableConfig,
    formConfig,
  }
}
