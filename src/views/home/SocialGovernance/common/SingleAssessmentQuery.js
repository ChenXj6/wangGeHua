// import {  } from '@/api/SocialGovernance/assessmentScore'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
    const tableConfig = {
        name: 'table',
        data: [],
        pagination: true, // 开启分页器
        mutiSelect: false, // 开启选择
        method: getInfoList, // 請求api
        index: true, // 是否启用序号列
        total: 0,
        isSortable: false, // 是否开启拖拽
        columns: [
            { prop: '', label: '开始时间', toolTip: true, minWidth: '120' },
            { prop: '', label: '结束时间', toolTip: true, minWidth: '120' },
            { prop: 'officeName', label: '考核组织', toolTip: true, minWidth: '120' },
            // { prop: '', label: '考核类型', toolTip: true, minWidth: '120' },
            { prop: 'fullMarks', label: '满分', toolTip: true, minWidth: '120' },
            { prop: 'score', label: '单项得分', toolTip: true, minWidth: '120' },
            { prop: 'sjScoe', label: '实际得分', toolTip: true, minWidth: '120' },
            { prop: '', label: '操作', slot: 'operation', minWidth: '120' },
        ],
    }
    //   const formConfig = {
    //     gutter:'10',
    //     labelWidth:'130',
    //     formItems: [
    //       {
    //         type: 'slot',
    //         label: '组织结构',
    //         prop: 'officeName',
    //         value: '',
    //         slotName:'status',
    //         isClearable: true,
    //         span: 6,
    //       },

    //     ],
    //   }
    return {
        tableConfig,
        // formConfig,
    }
}
