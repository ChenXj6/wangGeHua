import { getOrganList } from '@/api/sys/organ'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
  const tableConfig = {
    name: 'table',
    data: [],
    rowKey:'officeCode',
    pagination: false, // 开启分页器
    paginationAlign: 'right', // 分页器方向
    mutiSelect: false, // 开启选择
    method: getOrganList, // 請求api
    index: false, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
      { prop: '', label: '机构名称', slot:'officeName', minWidth: '300',align:'left' },
      { prop: 'fullName', label: '机构全称', minWidth: '120' },
      {
        prop: 'treeSort',
        label: '排序号',
      },
      { prop: '', label: '机构类型', slot:'type', minWidth: '60' },
      {
        prop: 'createDate',
        label: '更新时间',
        minWidth: '120',
        formatter: 'YYYY-MM-DD HH:mm:ss',
      },
      { prop: 'remarks', label: '备注信息',minWidth:'150', toolTip:true},
      { prop: '', label: '状态', slot:'status', minWidth: '60' },

      { prop: '', label: '操作', slot: 'operation', minWidth: '100' },
    ],
  }
  const formConfig = {
    formItems: [
      {
        type: 'Input',
        label: '机构全称',
        prop: 'fullName',
        value: '',
        placeholder: '请输入名称',
        isClearable: true,
        span: 6,
      },
    ],
  }
  const editOrganForm = {
    gutter:'10',
    formItems: [
      {
        type: 'slot',
        label: '上级机构',
        span: 12,
        slotName:'parentName'
      },
      {
        type: 'Input',
        label: '机构名称',
        prop: 'officeName',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 12,
      },
      {
        type: 'Input',
        label: '机构代码',
        prop: 'officeCode',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 12,
      },
      {
        type: 'Input',
        label: '机构全称',
        prop: 'fullName',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 12,
      },
      {
        type: 'Input',
        label: '排序号',
        prop: 'treeSort',
        value: '',
        placeholder: '',
        isClearable: true,
        span: 12,
      },
      {
        type: 'selectSearch',
        label: '机构类型',
        prop: 'officeType',
        value: '',
        code:'1020',
        isClearable: true,
        placeholder:'选择机构类型',
        span: 12,
      },
    ],
    rules:{
      officeName: [
        { required: true, message: '请输入机构名称', trigger: 'blur' },
      ],
      officeCode: [
        { required: true, message: '请输入机构代码', trigger: 'blur' },
      ],
      fullName: [
        { required: true, message: '请输入机构全称', trigger: 'blur' },
      ],
      treeSort: [
        { required: true, message: '请输入排序号', trigger: 'blur' },
      ],
      type: [
        { required: true, message: '请选择机构类型', trigger: 'blur' },
      ],
    }
  }
  return {
    tableConfig,
    formConfig,
    editOrganForm,
  }
}
