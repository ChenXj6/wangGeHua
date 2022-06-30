import { getUserList } from '@/api/sys/user'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: false, // 开启分页器
    paginationAlign: 'right', // 分页器靠左、靠右、中间
    mutiSelect: false, // 开启选择
    method: getUserList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'id',
        label: '流水号',
        minWidth: '100',
      },
      { prop: 'value', label: '编码', minWidth: '100' },
      { prop: 'operatorName', label: '名称' },
      { prop: 'description', label: '描述', tooltip: true },
      {
        prop: 'createTime',
        label: '创建时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: 'roleId', label: '是否禁用', tooltip: true },
      { prop: '', label: '操作', slot: 'operation' },
    ],
  }
  const addFormConfig = {
    formItems: [
      {
        type: 'Input',
        label: '基本类型',
        prop: 'basictype',
        value: '',
        placeholder: '请输入id',
        isClearable: true,
        disabled:true,
        span: 24,
      },
      {
        type: 'Input',
        label: '名称',
        prop: 'basictypename',
        value: '',
        placeholder: '请输入账号',
        isClearable: true,
        disabled:true,
        span: 24,
      },
      {
        type: 'Input',
        label: '编码值',
        prop: 'value',
        value: '',
        placeholder: '',
        isClearable: true,
        disabled:false,
        span: 24,
      },
      {
        type: 'Input',
        label: '描述',
        prop: 'description',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 24,
      },
      {
        type: 'radioGroup',
        label: '是否禁用',
        prop: 'delflag',
        value: 0,
        options:[{value:0,label:'启用'},{value:1,label:'删除'},{value:2,label:'停用'}],
        placeholder: '',
        isClearable: true,
        span: 24,
      },
    ],
    rules:{
      value: [
        { required: true, message: '请输入编码值', trigger: 'blur' },
      ],
      description: [
        { required: true, message: '请输入描述信息', trigger: 'blur' },
      ],
    }
  }
  return {
    tableConfig,
    addFormConfig,
  }
}
