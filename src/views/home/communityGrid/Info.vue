<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+searchForm.officeCode" @update:dataForm="handleTreeSelectChange" style="width:100%">
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
      <template v-slot:operation="{data}">
        <el-tooltip
        class="box-item"
        effect="dark"
        content="查看"
        placement="top-start"
      >
        <el-button
          @click="handleOperation(1, data)"
          :icon="Search"
          circle
          type="success"
        />
        </el-tooltip>
        <el-tooltip
        class="box-item"
        effect="dark"
        content="编辑"
        placement="top-start"
      >
        <el-button
          :icon="Edit"
          @click="handleOperation(2, data)"
          circle
          type="priamry"
        />
        </el-tooltip>
        <!-- <el-tooltip
        class="box-item"
        effect="dark"
        content="添加边界信息"
        placement="top-start"
      >
        <el-button
          size="small"
          icon="tagfill"
          @click="addInfo(4,data)"
          circle
          type="priamry"
        />
        </el-tooltip>
        <el-tooltip
        class="box-item"
        effect="dark"
        content="添加人员力量"
        placement="top-start"
      >
        <el-button
          size="small"
          icon="friend"
          @click="addInfo(5,data)"
          circle
          type="priamry"
        />
        </el-tooltip> -->
        <el-popconfirm title="确定要删除吗？" @confirm="handleDel(data.id)">
          <template #reference>
            <el-button
              :icon="Delete"
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

import {
  Delete,
  Edit,
  Search,
} from '@element-plus/icons-vue'

import { renderTable } from './common/Info'
import { deepClone, defaultObject } from '@/utils/util'
import { deleteInfo } from '@/api/communityGrid/info'

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
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
    const handleDel = (id) => {
      deleteInfo({id}).then(res=>{
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
        path: '/editInfo',
        query: { data : encodeURIComponent(data), operation: type},
      })
    }
    const addInfo = (type,rowData) => {
      let data = JSON.stringify(rowData)
      // type： 4 边界信息、5 人员力量
      if(type == 4) {
        router.push({
          path: '/editBorderInfo',
          query: { data : encodeURIComponent(data), operation: 3},
        })
      } else {
        router.push({
          path: '/editStaffInfo',
          query: { data : encodeURIComponent(data), operation: 3},
        })
      }
    }
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
      addInfo,
      Delete,
      Edit,
      Search,
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
