import { getRoastSuggestion } from '@/api/RoastSuggestion/roastSuggestion'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
    const tableConfig = {
        name: 'table',
        data: [],
        pagination: true, // 开启分页器
        mutiSelect: false, // 开启选择
        method: getRoastSuggestion, // 請求api
        index: true, // 是否启用序号列
        total: 0,
        isSortable: false, // 是否开启拖拽
        columns: [
            { prop: 'title', label: '标题', toolTip: true, minWidth: '120' },
            { prop: 'content', label: '内容', toolTip: true, minWidth: '120' },
            { prop: 'remarks', label: '备注', toolTip: true, minWidth: '120' },
            { type: 'text', prop: 'type', label: '问题类型', code: '', minWidth: '120' },
            { prop: 'createDate', label: '创建时间', toolTip: true, minWidth: '120' },
            { prop: '', label: '操作', slot: 'operation', minWidth: '270' },

        ]
    }
    const formConfig = {
        gutter: '10',
        labelWidth: '130',
        formItems: [
            {
                type: 'Input',
                label: '标题名称',
                prop: 'title',
                value: '',
                placeholder: '请输入标题名称',
                isClearable: true,
                span: 4,
            },
        ]
    }
    return {
        tableConfig,
        formConfig,
    }
}