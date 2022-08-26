import { getHotlineManageList } from '@/api/SocialGovernance/hotlineManage'

// 启用序号列会与sortable拖拽发生冲突   不要一起使用!!!!
export function renderTable() {
    const tableConfig = {
        name: 'table',
        data: [],
        pagination: true, // 开启分页器
        mutiSelect: true, // 开启选择
        method: getHotlineManageList, // 請求api
        index: true, // 是否启用序号列
        total: 0,
        isSortable: false, // 是否开启拖拽
        columns: [
            {
                prop: 'orderNo',
                label: '工单编号',
                minWidth: '150',
                slot:'orderNo',
            },
            {
                prop: 'receivingTime',
                label: '审核时间',
                minWidth: '120',
                formatter: 'YYYY-MM-DD HH:mm:ss',
            },
            {
                prop: 'problemDescription',
                label: '问题描述',
                minWidth: '120',
                tooltip: true,
            },
            {
                prop: 'transferOpinions',
                label: '转办意见',
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
                type:'code',
                code:'1076',
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
                type:'code',
                code:'1068',
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
                placeholder:'请输入工单编号',
                span: 6,
              }, 
              {
                type: 'datetime',
                label: '接收时间',
                prop: 'receivingTime',
                value: '',
                format: 'YYYY-MM-DD HH:mm:ss',
                isClearable: true,
                span: 6,
              },
              // {
              //   type: 'Input',
              //   label: '问题描述',
              //   prop: 'problemDescription',
              //   placeholder:'请输入问题描述',
              //   isClearable: true,
              //   span: 6,
              // }, 
              {
                type: 'Input',
                label: '转办意见',
                prop: 'transferOpinions',
                placeholder:'请输入转办意见',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'Input',
                label: '联系人',
                prop: 'contacts',
                placeholder:'请输入联系人',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'Input',
                label: '联系电话',
                placeholder:'请输入联系电话',
                prop: 'contactNumber',
                isClearable: true,
                span: 6,
              }, 
              {
                type: 'selectSearch',
                label: '紧急程度',
                prop: 'urgency',
                placeholder: '请选择紧急程度',
                code:'1076',
                isClearable: true,
                span: 6,
              },
              {
                type: 'datetime',
                label: '办结时限',
                prop: 'concludeTime',
                value: '',
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
                label: '工单状态',
                prop: 'hotlineStatus',
                placeholder: '请选择工单状态',
                code:'1068',
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