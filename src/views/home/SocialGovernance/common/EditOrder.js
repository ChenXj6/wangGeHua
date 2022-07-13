// import {  } from '@/api/SocialGovernance/build'

export function renderTable() {
  const InfoFormConfig = {
      gutter:10,
      formItems: [
        {
          type: 'slot',
          label: '上级类别',
          prop: 'parentCode',
          slotName:'status',
          span: 11,
        },
        {
          type: 'Input',
          label: '类别名称',
          prop: 'hotlineWorkOrderName',
          value: '',
          isClearable: true,
          span: 11,
        },
        {
          type: 'Input',
          label: '本级排序号',
          prop: 'treeSort',
          value: '',
          isClearable: true,
          span: 11,
        },
        {
          type: 'textarea',
          label: '备注',
          prop: 'remarks',
          value: '',
          isClearable: true,
          span: 22,
        },
      ]
  }

  return {
    InfoFormConfig
  }
}