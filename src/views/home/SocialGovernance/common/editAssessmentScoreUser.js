export function renderTable() {
    const InfoFormConfig = {
        gutter:10,
        labelWidth:'220px',
        position:'right',
        formItems: [
            {
                type: 'Input',
                label: '考核类型',
                prop: 'assessType',
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
                prop: '',
                value: '',
                disabled:true,
                span: 11,
              },  
              {
                type: 'Input',
                label: '结束时间',
                prop: '',
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
                label: '单项得分',
                prop: 'score',
                value: '',
                span: 11,
              },
        ]   
    }
    return {
        InfoFormConfig
      }
}