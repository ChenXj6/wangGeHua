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
                span: 11,
              },
              {
                type: 'Input',
                label: '考核名称',
                prop: 'assessName',
                value: '',
                span: 11,
              },
              {
                type: 'Input',
                label: '单项考核',
                prop: 'assessDetail',
                value: '',
                span: 11,
              },  
              {
                type: 'Input',
                label: '满分',
                prop: 'fullMarks',
                value: '',
                span: 11,
              },
              {
                type: 'Input',
                label: '次数',
                prop: 'num',
                value: '',
                span: 11,
              },
              {
                type: 'Input',
                label: '类型',
                prop: 'assessType',
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