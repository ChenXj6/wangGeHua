<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+searchForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="searchForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
    >
    <template v-slot:revenueName="{data}">
      <el-link type="success" @click.prevent="handleOperation(2, data)">{{ data.revenueName }}</el-link>
    </template>
    <template v-slot:revenueType="{data}">
      <span >{{revenueTypeOptions.filter(v=>v.value == data.revenueType)[0]?.label}}</span>
    </template>
    <template v-slot:operation="{data}">
        <!-- <el-button
          size="small"
          @click="handleOperation(1, data)"
          icon="el-icon-lx-search"
          circle
          type="success"
        /> -->
        <el-button
          size="small"
          icon="el-icon-lx-edit"
          @click="handleOperation(2, data)"
          circle
          type="success"
        />
        <el-popconfirm title="确定要删除吗？" @confirm="handleDel(data.id)">
          <template #reference>
            <el-button
              size="small"
              icon="el-icon-lx-delete"
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
import { renderTable } from './common/TaxList'
import { deepClone, formatterDate,resetFormat,defaultObject } from '@/utils/util'
import { useRouter } from 'vue-router'
import { searchDict } from '@/api/sys/dict'
import { delTax } from '@/api/Economics/tax'
export default {
  name: 'TaxList',
  components:[PopupTreeInput],
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const searchForm = ref({
      officeCode:'',
      officeName:'',
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
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
    const handleDel = (id) => {
      delTax({id}).then(res=>{
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
      searchForm.value.officeCode = officeCode
      searchForm.value.officeName = officeName
    }
    getOList()
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        name: 'editEconomics',
        params: { data : encodeURIComponent(data), operation: type, type:'tax' },
      })
    }
    //
    const revenueTypeOptions = ref([])
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormat(res.data)
        }else{
          data.value = []
        }
      })
    }
    getOptionsByCode(1054,revenueTypeOptions)
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
      revenueTypeOptions,
    }
  },
}
</script>
<style scoped>

</style>