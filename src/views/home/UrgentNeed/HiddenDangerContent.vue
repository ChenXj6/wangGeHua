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
          icon="search"
          @click="handleOperation(1, data,'a')"
          circle
          title="查看隐患"
          type="primary"
        />
        <el-button
          v-if="data.status == 1 && data.isDanger != 0"
          icon="edit"
          @click="handleOperation(2, data)"
          circle
          title="隐患处理"
          type="success"
        />
        <el-button
          v-if="data.status == 2 && data.isDanger != 0"
          icon="TopRight"
          circle
          title="隐患整改"
          @click="handleOperation(2, data,'rectification')"
          type="success"
        />
        <!-- v-if="data.dangerstatus == 3 && data.isDanger != 0" -->
        <el-button
          v-if="data.status == 3 && data.isDanger != 0"
          icon="CircleCheck"
          circle
          title="隐患复查"
          @click="handleOperation(2, data,'review')"
          type="success"
        />
      </template>
    </V-table>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/HiddenDangerContent'
import { deepClone,resetFormat,defaultObject  } from '@/utils/util'
import { useRouter } from 'vue-router'
import { searchDict } from '@/api/sys/dict'
import { ElMessageBox  } from 'element-plus';
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
      searchParams.value = {processePerCode:JSON.parse(sessionStorage.getItem('user')).user.operatorId}
      defaultObject(searchForm.value)
      handleQuery()
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
      ]
    }
    const handleQueryTable = () => {
      searchParams.value.processePerCode = JSON.parse(sessionStorage.getItem('user')).user.operatorId
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
    const handleOperation = (type, rowData,care ='') => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editHiddenDanger',
        query: { data : encodeURIComponent(data), operation: type,type:'content',care },
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
      //
      orgTypeOptions,
    }
  },
}
</script>
<style scoped>

</style>