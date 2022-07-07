
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const userFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '登录账号',
        prop: 'operatorId',
        value: '',
        placeholder: '',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'Input',
        label: '用户姓名',
        prop: 'operatorName',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 11,
      },
    ],
    rules:{
      operatorId: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      operatorName: [
        { required: true, message: '请选择归属网格', trigger: ['blur','change'] },
      ],
    }
  }
  const roleFormConfig = {
    gutter:10,
    formItems: [
      {
        type: 'Input',
        label: '角色名称',
        prop: 'name',
        value: '',
        placeholder: '',
        isClearable: true,
        disabled:false,
        span: 11,
      },
      {
        type: 'Input',
        label: '备注',
        prop: 'remark',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 11,
      },
    ],
    rules:{
      name: [
        { required: true, message: '请输入名称', trigger: ['blur','change'] },
      ],
      remark: [
        { required: true, message: '请选择归属网格', trigger: ['blur','change'] },
      ],
    }
  }
  return {
    userFormConfig,
    roleFormConfig,
  }
}