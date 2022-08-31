import { coclpitList } from '@/api/sys/coclpitGovern'
import validator from '@/utils/validator'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: coclpitList, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        type:'code', 
        code:'1095',
        prop: 'ownModule',
        label: '所属模块',
        minWidth: '120',
      },
      { prop: 'name', label: '指标名称', minWidth: '120' },
      { prop: 'componentName', label: '组件名称', minWidth: '120' },
      { type:'code', code:'1094',prop: 'showType', label: '类型', minWidth: '120' },
      { prop: 'showSort',label: '排序', minWidth: '120' },
      { type:'code', code:'1006',prop: 'isShowFlag', label: '是否在驾驶舱展示', minWidth: '120' },
      { prop: 'remark',label: '说明', minWidth: '120' },
      { prop: '', label: '操作', slot: 'operation', minWidth: '130' },
    ],
  }
  const formConfig = {
    // labelWidth:'80px',
    formItems: [
      {
        type: 'selectSearch',
        label: '模块',
        prop: 'ownmodule',
        value: '',
        placeholder: '请选择模块',
        code:'1095',
        isClearable: true,
        span: 6,
      },
      {
        type: 'Input',
        label: '指标名称',
        prop: 'name',
        value: '',
        placeholder: '请输入指标名称',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'showtype',
        value: '',
        placeholder: '请选择类型',
        code:'1094',
        isClearable: true,
        span: 6,
      },
      {
        type: 'selectSearch',
        label: '驾驶舱是否显示',
        prop: 'isshowflag',
        value: '',
        placeholder: '请选择是否显示',
        code:'1006',
        isClearable: true,
        span: 6,
      },
    ],
  }
  const coclpitFormConfig = {
    gutter:20,
    formItems: [
      {
        type: 'Input',
        label: '指标名称',
        prop: 'name',
        value: '',
        placeholder: '请输入指标名称',
        isClearable: true,
        span: 12,
      },
      {
        type: 'Input',
        label: '组件名称',
        prop: 'componentName',
        value: '',
        placeholder: '请输入组件名称',
        isClearable: true,
        span: 12,
      },
      {
        type: 'selectSearch',
        label: '所属模块',
        prop: 'ownModule',
        value: '',
        placeholder: '请选择模块',
        code:'1095',
        isClearable: true,
        span: 12,
      },
      
      {
        type: 'selectSearch',
        label: '类型',
        prop: 'showType',
        value: '',
        placeholder: '请选择类型',
        code:'1094',
        isClearable: true,
        span: 12,
      },
      {
        type: 'selectSearch',
        label: '驾驶舱是否显示',
        prop: 'isShowFlag',
        value: '',
        placeholder: '请选择是否显示',
        code:'1006',
        isClearable: true,
        span: 12,
      },
      {
        type: 'Input',
        label: '排序',
        prop: 'showSort',
        dataType:'Number',
        value: '',
        placeholder: '请填写排序',
        isClearable: true,
        span: 12,
      },
      {
        type: 'textarea',
        label: '备注',
        prop: 'remark',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 24,
      },
    ],
    rules:{
      name: [
        { required: true, message: '请输入指标名称', trigger:'blur' },
      ],
      componentName: [
        { required: true, message: '请输入组件名称', trigger: ['blur'] },
      ],
      showType: [
        { required: true, message: '请选择类型', trigger: ['change'] },
      ],
      isShowFlag: [
        { required: true, message: '请选择驾驶舱是否显示', trigger: ['change'] },
      ],
      showSort: [
        { required: true, message: '请输入排序号', trigger: ['blur'] },
      ],
      ownModule: [
        { required: true, message: '请选择所属模块', trigger: ['change','blur'] },
      ],
    }
  }
  return {
    tableConfig,
    formConfig,
    coclpitFormConfig,
  }
}
