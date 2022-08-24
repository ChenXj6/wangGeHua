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
              // {
              //   type: 'Input',
              //   label: '单项考核',
              //   prop: 'assessDetail',
              //   value: '',
              //   span: 11,
              // },  
              {
                type: 'Input',
                label: '满分',
                prop: 'fullMarks',
                value: '',
                span: 11,
              },
              // {
              //   type: 'Input',
              //   label: '次数',
              //   prop: 'num',
              //   value: '',
              //   span: 11,
              // },
              {
                type: 'selectSearch',
                label: '类型',
                prop: 'assessType',
                placeholder: '请选择考核类型',
                code:'1089',
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
        ],
        rules:{
          titleName: [{ required: true, message: '请输入标题名称', trigger: 'blur' }],
          assessName: [{ required: true, message: '请输入考核名称', trigger: 'blur' }],
          fullMarks: [{ required: true, message: '请输入满分成绩', trigger: ['blur'] }],
          assessType: [{ required: true, message: '请选择考核类型', trigger: ['change','blur'] }],
        }
    }
    return {
        InfoFormConfig
      }
}