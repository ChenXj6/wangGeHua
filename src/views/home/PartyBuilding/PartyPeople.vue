<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+searchForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="searchForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
      <template v-slot:partyOrgId>
        <el-input v-model="searchForm.infoName" size="small" :readonly="true" placeholder="点击选择党组织" @click="handleOpenInfo" style="cursor:pointer;"></el-input>
      </template>
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
    >
    <template v-slot:memberName="{data}">
      <el-link type="success" @click.prevent="handleOperation(2, data)">{{ data.memberName }}</el-link>
    </template>
    <template v-slot:memberType="{data}">
      <span >{{memberTypeOptions.filter(v=>v.value == data.memberType)[0]?.label}}</span>
    </template>
    <template v-slot:title="{data}">
      <span >{{titleOptions.filter(v=>v.value == data.title)[0]?.label}}</span>
    </template>
    <template v-slot:pioneerFlag="{data}">
      <span >{{pioneerFlagOptions.filter(v=>v.value == data.pioneerFlag)[0]?.label}}</span>
    </template>
    <template v-slot:operation="{data}">
        <!-- <el-button
          size="small"
          @click="handleOperation(1, data)"
          icon="search"
          circle
          type="success"
        /> -->
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
    <!-- 党组织弹窗 -->
    <el-dialog
        width="width"
        v-model="InfoDialogVisible">
        <VForm :form-data="infoFormConfig" :form-model="searchInfoForm" :form-handle="infoFormHandle">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+searchForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="searchForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
    </VForm>
    <V-table
      ref="infoTable"
      :table-config="infoTtableConfig"
      @row-click="rowClick"
    >
    <template v-slot:orgType="{data}">
      <span >{{orgTypeOptions.filter(v=>v.value == data.orgType)[0]?.label}}</span>
    </template>
    </V-table>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/PartyPeople'
import { renderTable as renderInfoTable } from './common/PartyInfo'
import { deepClone,resetFormat,defaultObject  } from '@/utils/util'
import { useRouter } from 'vue-router'
import { searchDict } from '@/api/sys/dict'
import { delPartyPeople } from '@/api/PartyBuilding/partyPeople'
export default {
  name: 'TaxList',
  components:[PopupTreeInput],
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const { infoTtableConfig , infoFormConfig } = renderInfoTable.call(proxy)
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
      defaultObject(searchForm.value)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
    const handleDel = (id) => {
      delPartyPeople({id}).then(res=>{
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
        path: '/editParty',
        query: { data : encodeURIComponent(data), operation: type, type:'partyPeople' },
      })
    }
    //
    const memberTypeOptions = ref([])
    const titleOptions = ref([])
    const pioneerFlagOptions = ref([])
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
    getOptionsByCode(1062,memberTypeOptions)
    getOptionsByCode(1063,titleOptions)
    getOptionsByCode(1006,pioneerFlagOptions)
    getOptionsByCode(1057,orgTypeOptions)
    // 党组织弹窗
    const InfoDialogVisible = ref(false)
    const searchInfoForm = ref({
      officeCode:'',
      officeName:'',
    })
    const infoTable = ref(null)
    const searchInfoParams = ref({})
    const handleOpenInfo = () => {
      infoTtableConfig.columns.splice(infoTtableConfig.columns.length-1,1)
      InfoDialogVisible.value = true
      setTimeout(()=>{
        handleQueryInfo()
      },0)
    }
        // 表格相關操作
    const handleQueryInfo = () => {
      searchInfoParams.value = deepClone(searchInfoForm.value)
      infoTable.currentPage = 1
      handleQueryInfoTable()
    }
    const handleResetInfo = (formEL) => {
      formEL.resetFields()
      searchInfoParams.value = {}
      defaultObject(searchInfoForm.value)
      handleQueryInfo()
    }
    // 表單操作按鈕配置
    const infoFormHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQueryInfo},
        {type:'primary',label:'重置',key:'reset',handle:handleResetInfo},
      ]
    }
    const handleQueryInfoTable = () => {
      infoTable.value.getTableData(searchInfoParams.value, (res) => {
        const data = res.list || []
        infoTtableConfig.data = data
      })
    }
    const rowClick = ({id,infoName}) => {
      // console.log(val)
      searchForm.value.partyOrgId = id
      searchForm.value.infoName = infoName
      InfoDialogVisible.value = false
    }
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
      memberTypeOptions,
      titleOptions,
      pioneerFlagOptions,
      // 
      rowClick,
      infoFormHandle,
      handleOpenInfo,
      infoTable,
      infoFormConfig,
      infoTtableConfig,
      InfoDialogVisible,
      searchInfoForm,
      orgTypeOptions,
    }
  },
}
</script>
<style scoped>

</style>