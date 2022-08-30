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
                prop: 'officeName',
                label: '组织机构',
                minWidth: '120',
            },
            {
                prop: 'orderNo',
                label: '工单编号',
                minWidth: '120',
                slot:'orderNo',
            },
            {
                prop: 'receivingTime',
                label: '接收时间',
                minWidth: '120',
                formatter: 'YYYY-MM-DD HH:mm:ss',
            },
            {
                prop: 'dealBy',
                label: '承办单位',
                minWidth: '120',
            },
            {
                prop: 'problemDescription',
                label: '问题描述',
                minWidth: '120',
                tooltip: true,
            },
            
            {
                prop: 'concludeTime',
                label: '办结时限',
                minWidth: '120',
                formatter: 'YYYY-MM-DD HH:mm:ss',
            },
            {
                prop: 'dispatchTime',
                label: '派单时间',
                minWidth: '120',
                formatter: 'YYYY-MM-DD HH:mm:ss',
            },
            {
                prop: 'replyOrderDate',
                label: '回复时间',
                minWidth: '120',
            },
            {
                type:'code',
                code:'1069',
                prop: 'status',
                label: '处置状态',
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
                prop: 'orderNo',
                placeholder:'请输入工单编号',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'dateTime',
                label: '接收时间',
                prop: 'receivingTime',
                value: [],
                format: 'YYYY-MM-DD HH:mm:ss',
                isClearable: true,
                span: 6,
              },
              {
                type: 'Input',
                label: '承办单位',
                placeholder:'请输入承办单位',
                prop: '',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'Input',
                label: '问题描述',
                prop: 'problemDescription',
                placeholder:'请输入问题描述',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'dateTime',
                label: '办结时限',
                prop: 'concludeTime',
                value: [],
                format: 'YYYY-MM-DD HH:mm:ss',
                isClearable: true,
                span: 6,
              },
              {
                type: 'slot',
                label: '工单类别',
                prop: 'orderType',
                value: '',
                slotName:'orderType',
                isClearable: true,
                span: 6,
              },
              {
                type: 'selectSearch',
                label: '处置状态',
                prop: 'status',
                placeholder: '请选择处置状态',
                code:'1069',
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