import { getAssessmentManagement } from '@/api/SocialGovernance/assessmentManagement'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
    const tableConfig = {
    name: 'table',
    data: [],
    pagination: true, // 开启分页器
    mutiSelect: false, // 开启选择
    method: getAssessmentManagement, // 請求api
    index: true, // 是否启用序号列
    total: 0,
    isSortable: false, // 是否开启拖拽
    columns: [
        { prop: 'titleName', label: '标题名称',toolTip:true, minWidth: '120' }, 
        { prop: 'assessName', label: '考核名称',toolTip:true, minWidth: '120' }, 
        { prop: 'assessDetail', label: '考核细则',toolTip:true, minWidth: '120' },  
        { prop: 'fullMarks', label: '满分',toolTip:true, minWidth: '120' }, 
        { prop: 'num', label: '次数',toolTip:true, minWidth: '120' }, 
        { prop: 'assessType', label: '类型',toolTip:true, minWidth: '120' }, 
        { prop: 'remarks', label: '备注',toolTip:true, minWidth: '120' }, 
        { prop: 'status', label: '状态',toolTip:true, minWidth: '120' }, 
        { prop: 'createDate', label: '创建时间',toolTip:true, minWidth: '120' },
        { prop: '', label: '操作', slot: 'operation', minWidth: '120' }, 
    ]
    }
    const formConfig = {
        gutter:'10',
        labelWidth:'130',
        formItems: [
            {
                type: 'Input',
                label: '考核名称',
                prop: 'assessName',
                value: '',
                placeholder: '请输入考核名称',
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