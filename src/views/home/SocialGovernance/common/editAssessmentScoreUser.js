export function renderTable() {
    const InfoFormConfig = {
        gutter:10,
        labelWidth:'220px',
        position:'right',
        formItems: [
            {
              type: 'selectSearch',
                label: '类型',
                prop: 'assessType',
                code:'1089',
                value: '',
                disabled:true,
                span: 11,
              },
              // {
              //   type: 'slot',
              //   label: '组织机构',
              //   prop: 'officeName',
              //   slotName:'status',
              //   disabled:true,
              //   span: 11,
              // },
              {
                type: 'Input',
                label: '开始时间',
                prop: 'startTime',
                value: '',
                disabled:true,
                span: 11,
              },  
              {
                type: 'Input',
                label: '结束时间',
                prop: 'endTime',
                value: '',
                disabled:true,
                span: 11,
              },  
              {
                type: 'Input',
                label: '满分',
                prop: 'maxSocre',
                disabled:true,
                value: '',
                span: 11,
              },
              {
                type: 'Input',
                label: '实际得分',
                prop: 'sjScoe',
                value: '',
                span: 11,
              },
        ]   
    }
    return {
        InfoFormConfig
      }
}