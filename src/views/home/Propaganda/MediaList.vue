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
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
    <template v-slot:title="data">
        <el-link
          type="success"
          @click.prevent="handleOperation(1, data.data)"
          >{{ data.data.title }}</el-link
        >
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
  onMounted,
} from '@vue/runtime-core'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/MediaList'
import { deepClone, defaultObject } from '@/utils/util'
import { deleteMedia } from '@/api/Propaganda/media'
export default defineComponent({
  name: 'Draft',
  components:[PopupTreeInput],
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({
      officeName:'',
      officeCode:'',
    })
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.officeCode = officeCode
      searchForm.officeName = officeName
    }

    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      for ( const key in searchParams.value ){
        if(Array.isArray(searchParams.value[key]) && searchParams.value[key].length > 1){
          searchParams.value[`${key}Start`] = searchParams.value[key][0]
          searchParams.value[`${key}End`] = searchParams.value[key][1]
          delete searchParams.value[key]
        }
      }
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
      deleteMedia({id}).then(res=>{
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
        path: '/editDraft',
        query: { data : encodeURIComponent(data), operation: type,type:'media'},
      })
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
    onMounted(() => {
      handleQuery()
    })
    return {
      table,
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
