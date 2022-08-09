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
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:operation="{data}">
        <el-button
          size="small"
          @click="handleOperation(1, data)"
          icon="el-icon-lx-search"
          circle
          type="success"
        />
        <el-button
          size="small"
          icon="el-icon-lx-edit"
          @click="handleOperation(2, data)"
          circle
          type="priamry"
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

import { renderTable } from './common/borderInfo'
import { deepClone, defaultObject } from '@/utils/util'
import { deleteBorderInfo } from '@/api/communityGrid/borderInfo'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
export default defineComponent({
  name: 'ActualBuild',
  components:{PopupTreeInput},
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({}) // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const multipleSelection = ref([]) // 选中数据
    // 是否有選中數據
    const isHaveSelect = computed(
      () => multipleSelection.value && multipleSelection.value.length > 0
    )

    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.officeCode = officeCode
      searchForm.officeName = officeName
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      // searchForm.value = {}
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleDel = (id) => {
      deleteBorderInfo({id}).then(res=>{
        if(res.resCode == '000000'){
          handleQuery()
          proxy.$message.success('删除数据成功')
        }else{
          proxy.$message.danger('删除数据失败')
        }
      })
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editBorderInfo',
        query: { data : encodeURIComponent(data), operation: type},
      })
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
        {type:'primary',label:'添加',key:'add',handle:handleAdd},
      ]
    }
    //
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
      handleDel,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
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
