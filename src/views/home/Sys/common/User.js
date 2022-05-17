import { getUserList } from '@/api/sys/user'
import { eventStatus, eventType, eventSource } from '@/config/common'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    paginationAlign: 'right', // 分页器靠左、靠右、中间
    mutiSelect: false, // 开启选择
    method: getUserList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      {
        prop: 'id',
        label: 'ID',
        minWidth: '100',
      },
      { prop: 'operatorId', label: '账号', minWidth: '100' },
      { prop: 'operatorName', label: '姓名' },
      { prop: 'roleId', label: '角色', tooltip: true },
      {
        prop: 'createTime',
        label: '创建时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: '', label: '操作', slot: 'operation' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'Input',
        label: '账号',
        prop: 'operatorId',
        value: '',
        placeholder: '请输入账号',
        isClearable: true,
        span: 4,
      },
      {
        type: 'Input',
        label: '姓名',
        prop: 'operatorName',
        value: '',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 4,
      },
    ],
  }
  const addFormConfig = {
    formItems: [
      {
        type: 'Input',
        label: 'ID',
        prop: 'id',
        value: '',
        placeholder: '请输入id',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '账号',
        prop: 'operatorId',
        value: '',
        placeholder: '请输入账号',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '姓名',
        prop: 'operatorName',
        value: '',
        placeholder: '请输入姓名',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '手机',
        prop: 'mobile',
        value: '',
        placeholder: '请输入手机',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '邮箱',
        prop: 'email',
        value: '',
        placeholder: '请输入邮箱',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '部门',
        prop: 'deptId',
        value: '',
        placeholder: '请输入部门',
        isClearable: true,
        span: 24,
      },
      {
        type: 'Input',
        label: '角色',
        prop: 'roleId',
        value: '',
        placeholder: '请输入角色',
        isClearable: true,
        span: 24,
      },
      // {
      //   type: 'select',
      //   label: '部门',
      //   prop: 'deptId',
      //   value: '',
      //   placeholder: '请选择部门',
      //   isClearable: true,
      //   span: 24,
      //   options:[]
      // },
      // {
      //   type: 'select',
      //   label: '角色',
      //   prop: 'roleId',
      //   value: '',
      //   placeholder: '请选择角色',
      //   isClearable: true,
      //   span: 24,
      //   options:[]
      // },
    ],
    rules:{
      operatorId: [
        { required: true, message: '请输入用户登录账号', trigger: 'blur' },
      ],
      operatorName: [
        { required: true, message: '请输入用户姓名', trigger: 'blur' },
      ],
      deptId: [
        { required: true, message: '请选择所在部门', trigger: 'change' },
      ],
      roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
    }
  }
  return {
    tableConfig,
    formConfig,
    addFormConfig,
  }
}
