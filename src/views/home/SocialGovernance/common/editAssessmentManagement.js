export function renderTable() {
    const InfoFormConfig = {
        gutter:10,
        labelWidth:'220px',
        position:'right',
        formItems: [
            {
                type: 'Input',
                label: '标题名称',
                prop: 'titleName',
                value: '',
                disabled:true,
                span: 11,
              },
              {
                type: 'Input',
                label: '考核名称',
                prop: 'assessName',
                value: '',
                disabled:true,
                span: 11,
              },
              {
                type: 'Input',
                label: '单项考核',
                prop: 'assessDetail',
                value: '',
                disabled:true,
                span: 11,
              },  
              {
                type: 'Input',
                label: '满分',
                prop: 'fullMarks',
                value: '',
                disabled:true,
                span: 11,
              },
              {
                type: 'Input',
                label: '次数',
                prop: 'num',
                value: '',
                disabled:true,
                span: 11,
              },
              {
                type: 'Input',
                label: '类型',
                prop: 'assessType',
                value: '',
                disabled:true,
                span: 11,
              },
              {
                type: 'Input',
                label: '备注',
                prop: 'remarks',
                value: '',
                disabled:true,
                span: 11,
              },
        ]   
    }
    return {
        InfoFormConfig
      }
}