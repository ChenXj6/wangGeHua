<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+searchForm.gridCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="searchForm.gridName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
    >
    <template v-slot:dangerName="{data}">
      <el-link type="success" @click.prevent="handleOperation(2, data)">{{ data.dangerName }}</el-link>
    </template>
    <template v-slot:operation="{data}">
        <el-button
          icon="edit"
          @click="handleOperation(2, data)"
          circle
          type="success"
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
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/HiddenDanger'
import { deepClone,resetFormat,defaultObject  } from '@/utils/util'
import { useRouter } from 'vue-router'
import { searchDict } from '@/api/sys/dict'
import { deleteHiddenDanger } from '@/api/UrgentNeed/hiddenDanger'
export default {
  name: 'TaxList',
  components:[PopupTreeInput],
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { formConfig,tableConfig } = renderTable.call(proxy)
    const searchForm = ref({
      gridCode:'',
      gridName:'',
    })
    const table = ref(null)
    const searchParams = ref({})
        // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm.value)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchParams.value = {realpopulation_id:JSON.parse(sessionStorage.getItem('user')).user.operatorId}
      defaultObject(searchForm.value)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
    const handleDel = (id) => {
      deleteHiddenDanger({id}).then(res=>{
        if(res.resCode == '000000'){
          handleQuery()
          proxy.$message.success('数据删除成功！')
        }else{
          proxy.$message.warning('操作失败，清稍后重试！')
        }
      })
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
        {type:'primary',label:'新增',key:'reset',handle:handleAdd},
      ]
    }
    const handleQueryTable = () => {
      searchParams.value.realpopulation_id = JSON.parse(sessionStorage.getItem('user')).user.operatorId
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    // 组织结构
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.value.gridCode = officeCode
      searchForm.value.gridName = officeName
    }
    getOList()
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editHiddenDanger',
        query: { data : encodeURIComponent(data), operation: type,type:'hidden' },
      })
    }
    //
    const orgTypeOptions = ref([])
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormat(res.data)
        }else{
          data.value = []
        }
      })
    }
    getOptionsByCode(1057,orgTypeOptions)
    onMounted(()=>{
      handleQuery()
    })
    return{
      tableConfig,
      formConfig,
      searchForm,
      table,
      formHandle,
      popupTreeData,
      popupTreeProps,
      handleTreeSelectChange,
      handleOperation,
      handleDel,
      //
      orgTypeOptions,
    }
  },
}
</script>
<style scoped>

</style>