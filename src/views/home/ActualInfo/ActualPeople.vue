<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle"/>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:flagYmXg="{data}">
        <span>{{ flagYmXg(Number(data.flagYmXg)) }}</span>
      </template>
      <template v-slot:personnelAttributes="{data}">
        <span>{{ personnelAttributes(Number(data.personnelAttributes)) }}</span>
      </template>
      <template v-slot:gender="{data}">
        <span>{{ sex(Number(data.gender)) }}</span>
      </template>
      <template v-slot:unitNumber="{data}">
        <span>{{unitNumberOptions.filter(v=>v.value == data.unitNumber)[0]?.label}}</span>
      </template>
      <template v-slot:operation="{data}">
        <el-button
          @click="handleOperation(1, data)"
          icon="search"
          circle
          type="success"
        />
        <el-button
          icon="edit"
          @click="handleOperation(2, data)"
          circle
          type="priamry"
        />
        <el-popconfirm title="确定要删除吗？" @confirm="handleDel(data.id)">
          <template #reference>
            <el-button
              icon="delete"
              circle
              type="danger"
            />
          </template>
        </el-popconfirm>
      </template>
    </V-table>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch,
} from '@vue/runtime-core'

import { renderTable } from './common/People'
import { deepClone, defaultObject,resetFormat } from '@/utils/util'
import { deletePeople } from '@/api/ActualInfo/people'
import { searchDict } from '@/api/sys/dict'
export default defineComponent({
  name: 'ActualBuild',
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({}) // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const multipleSelection = ref([]) // 选中数据
    const personnelAttributes = computed(()=>{
      return (val)=>{
        switch(val){
          case 1:
              return '中共党员';
          case 2:
              return '群众';
          case 3:
              return '共青团员';            
          case 4:
              return '流动人口';
          case 5:
              return '志愿者';
          case 6:
              return '失业人员';
          case 7:
              return '高龄老人';
          case 8:
              return '烈士家属';
          case 9:
              return '台属人员';
          case 10:
              return '残疾人';
          case 11:
              return '退役军人';
          case 12:
              return '其他';
        }
      }
    })
    const sex = computed(()=>{
      return (val)=>{
        switch(val){
          case 0:
              return '男';
          case 1:
              return '女';
        }
      }
    })
    const flagYmXg = computed(()=>{
      return (val)=>{
        switch(val){
          case 0:
              return '否';
          case 1:
              return '是';
        }
      }
    })
    // 是否有選中數據
    const isHaveSelect = computed(
      () => multipleSelection.value && multipleSelection.value.length > 0
    )

    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
    const handleDel = (id) => {
      deletePeople({id}).then(res=>{
        if(res.resCode == '000000'){
          handleQuery()
          proxy.$message.success('删除人员数据成功')
        }else{
          proxy.$message.danger('删除人员数据失败')
        }
      })
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
        {type:'primary',label:'添加',key:'reset',handle:handleAdd},
      ]
    }
    //
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: 'editactual',
        query: { data : encodeURIComponent(data), operation: type, type:'people' },
      })
    }
    // 
    const unitNumberOptions = ref([])
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormat(res.data)
        }else{
          data.value = []
        }
      })
    }
    getOptionsByCode(1052,unitNumberOptions)
    onMounted(() => {
      handleQuery()
    })
    return {
      table,
      multipleSelection,
      tableConfig,
      formConfig,
      searchForm,
      formHandle,
      handleQuery,
      handleReset,
      handleOperation,
      personnelAttributes,
      flagYmXg,
      handleDel,
      sex,
      unitNumberOptions,
    }
  },
})
</script>
<style scoped>
:deep(.el-table .warning-row) {
  background: #e6a23c;
}

:deep(.el-table .danger-row) {
  background: orangered;
}
</style>
