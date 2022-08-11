import { getAssessmentScoreUser } from '@/api/SocialGovernance/AssessmentScoreUser'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
    const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getAssessmentScoreUser, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
        { prop: '', label: '开始时间',toolTip:true, minWidth: '120' },
        { prop: '', label: '结束时间',toolTip:true, minWidth: '120' },
        // { prop: 'officeName', label: '考核组织',toolTip:true, minWidth: '120' },
        { prop: 'assessType', label: '考核类型',toolTip:true, minWidth: '120' },
        { prop: 'maxSocre', label: '满分',toolTip:true, minWidth: '120' }, 
        { prop: 'score', label: '单项得分',toolTip:true, minWidth: '120' },
        { prop: 'sjScoe', label: '实际得分',toolTip:true, minWidth: '120' }, 
        { prop: '', label: '操作', slot: 'operation', minWidth: '120' }, 
    ]
    }

    const formConfig = {
        gutter:'10',
        labelWidth:'130',
        formItems: [
            {
                type: 'selectSearch',
                label: '考核类型',
                prop: 'assessType',
                placeholder: '请选择考核类型',
                code:'1089',
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