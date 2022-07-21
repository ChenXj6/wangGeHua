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
      ],
      rules:{
        parentCode:[{ required:true,message:'请选择上级类别',trigger:['change','blur'] }],
        hotlineWorkOrderName:[{ required:true,message:'请输入类别名称',trigger:['change','blur'] }],
        treeSort:[{ required:true,message:'请输入本级排序号',trigger:['change','blur'] }],
      }
  }

  return {
    InfoFormConfig
  }
}