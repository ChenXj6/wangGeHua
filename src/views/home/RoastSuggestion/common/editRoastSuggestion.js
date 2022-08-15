export function renderTable() {
    const InfoFormConfig = {
        gutter:10,
        labelWidth:'220px',
        position:'right',
        formItems: [
            {
                type: 'Input',
                label: '标题',
                prop: 'title',
                value: '',
                span: 11,
              },
              {
                type: 'Input',
                label: '内容',
                prop: 'content',
                value: '',
                span: 11,
              },
             
              {
                type: 'selectSearch',
                label: '问题类型',
                prop: 'type',
                placeholder: '请选择问题类型',
                code:'',
                value: '',
                span: 11,
              },
              {
                type: 'Input',
                label: '备注',
                prop: 'remarks',
                value: '',
                span: 11,
              },
        ]   
    }
    return {
        InfoFormConfig
      }
}