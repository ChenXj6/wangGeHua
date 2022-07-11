import { getTree } from '@/api/SocialGovernance/gridHotlineWorkOrder'
// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
    const tableConfig = {
        name: 'table',
        data: [],
        pagination: false, // 开启分页器
        paginationAlign: 'right', // 分页器方向
        mutiSelect: false, // 开启选择
        method: getTree, // 請求api
        index: false, // 是否启用序号列
        total: 0,
        isSortable: false, // 是否开启拖拽
        columns: [
            {
                prop: 'hotlineWorkOrderName',
                label: '类别名称',
                minWidth: '60',
            },
            { prop: 'createDate', label: '创建时间', minWidth: '120' },
            { prop: 'treeSort', label: '本级排序号型',  minWidth: '60' },
            { prop: 'remarks', label: '备注',  minWidth: '60' },
            { prop: '', label: '操作', slot: 'operation', minWidth: '100' },


        ],

    }
    const formConfig = {
        formItems: [
            {
                type: 'Input',
                label: '',
                prop: 'hotlineWorkOrderName',
                value: '',
                placeholder: '请输入类别名称',
                isClearable: true,
                span: 4,
              },
        ],
      }
    return {
        tableConfig,
        formConfig,
        // addFormConfig,
      }
}