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
      <template v-slot:houseType="{data}">
        <span>{{ houseType(Number(data.houseType)) }}</span>
      </template>
      <template v-slot:villageType="{data}">
        <span>{{ villageType(Number(data.villageType)) }}</span>
      </template>
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

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/Build'
import { deepClone, defaultObject } from '@/utils/util'
import { deleteBuild } from '@/api/ActualInfo/build'
export default defineComponent({
  name: 'ActualBuild',
  components:[PopupTreeInput],
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({
      officeName:'',
      officeCode:'',
      userDataId:String(JSON.parse(sessionStorage.getItem('user')).user.id),
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
    const multipleSelection = ref([]) // 选中数据
    const houseType = computed(()=>{
      return (val)=>{
        switch(val){
          case 0:
              return '居民楼';
          case 1:
              return '平房';
          case 2:
              return '商品房';
          case 3:
              return '房改房';            
          case 4:
              return '小产权';
          case 5:
              return '单位用房';
          case 6:
              return '商品门头房';
          case 7:
              return '住改商';
          case 8:
              return '商业体';
          case 9:
              return '经济体';
        }
      }
    })
    const villageType = computed(()=>{
      return (val)=>{
        switch(val){
          case 0:
              return '开放';
          case 1:
              return '封闭';
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
      deleteBuild({id}).then(res=>{
        if(res.resCode == '000000'){
          handleQuery()
          proxy.$message.success('删除楼栋成功')
        }else{
          proxy.$message.danger('删除楼栋失败')
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
        path: '/editactual',
        query: { data : encodeURIComponent(data), operation: type, type:'build' },
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
      multipleSelection,
      tableConfig,
      formConfig,
      searchForm,
      formHandle,
      handleQuery,
      handleReset,
      handleOperation,
      villageType,
      houseType,
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
