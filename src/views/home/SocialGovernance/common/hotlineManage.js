import { getHotlineManageList } from '@/api/SocialGovernance/hotlineManage'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
    const tableConfig = {
        name: 'table',
        data: [],
        pagination: true, // 开启分页器
        mutiSelect: false, // 开启选择
        method: getHotlineManageList, // 請求api
        index: true, // 是否启用序号列
        total: 0,
        isSortable: false, // 是否开启拖拽
        columns: [
            {
                prop: 'orderNO',
                label: '工单编号',
                minWidth: '120',
            },
            {
                prop: 'receivingTime',
                label: '审核时间',
                minWidth: '120',
            },
            {
                prop: 'problemDescription',
                label: '问题描述',
                minWidth: '120',
            },
            {
                prop: 'transferOpinions',
                label: '转办意见',
                minWidth: '120',
            },
            {
                prop: 'concludeTime',
                label: '办结时限',
                minWidth: '120',
            },
            {
                prop: 'urgency',
                label: '紧急程度',
                minWidth: '120',
            },
            {
                prop: 'orderType',
                label: '工单类别',
                minWidth: '120',
            },
            {
                prop: 'hotlineStatus',
                label: '工单状态',
                minWidth: '120',
            },
            { prop: '', label: '操作', slot: 'operation', minWidth: '130' },
        ]
    }
    const formConfig = {
        formItems: [  
            {
                type: 'slot',
                label: '组织结构',
                prop: 'status',
                value: '',
                slotName:'status',
                isClearable: true,
                span: 6,
              },
              {
                type: 'Input',
                label: '工单编号',
                prop: 'orderNO',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'dateTime',
                label: '接收时间',
                prop: 'receivingTime',
                value: [],
                format: 'YYYY-MM-DD',
                isClearable: true,
                span: 6,
              },
              {
                type: 'Input',
                label: '问题描述',
                prop: 'problemDescription',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'Input',
                label: '转办意见',
                prop: 'transferOpinions',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'Input',
                label: '联系人',
                prop: 'contacts',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'Input',
                label: '联系电话',
                prop: 'contactNumber',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'selectSearch',
                label: '紧急程度',
                prop: 'urgency',
                value: '',
                // code:'1005',
                isClearable: true,
                span: 6,
              },
              {
                type: 'dateTime',
                label: '办结时限',
                prop: 'concludeTime',
                value: [],
                format: 'YYYY-MM-DD',
                isClearable: true,
                span: 6,
              },
              {
                type: 'Input',
                label: '工單類別',
                prop: 'orderType',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'Input',
                label: '工單狀態',
                prop: 'hotlineStatus',
                isClearable: true,
                span: 6,
              }, 
        ] 
    }
    return {
        tableConfig,
        formConfig,
      }
}