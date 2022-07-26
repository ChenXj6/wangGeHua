<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+searchForm.gridCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="searchForm.gridName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:unitNumber="{data}">
        <span>{{unitNumberOptions.filter(v=>v.value == data.unitNumber)[0]?.label}}</span>
      </template>
      <template v-slot:houseType="{data}">
        <span>{{ houseType(Number(data.houseType)) }}</span>
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
import { renderTable } from './common/House'
import { deepClone, defaultObject,resetFormat } from '@/utils/util'
import { deleteHouse } from '@/api/ActualInfo/house'
import { searchDict } from '@/api/sys/dict'
export default defineComponent({
  name: 'ActualBuild',
  components:[PopupTreeInput],
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({
      gridCode:'',
      gridName:'',
    }) // 表单数据
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    let searchParams = ref({}) // 表单数据备份
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
    const buildingNo = computed(()=>{
      return (val)=>{
        switch(val){
          case 0:
              return '西区-1号楼';
          case 1:
              return '西区-2号楼';
          case 2:
              return '西区-3号楼';
          case 3:
              return '西区-4号楼';
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
      // searchForm.value = {}
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
    const handleDel = (id) => {
      deleteHouse({id}).then(res=>{
        if(res.resCode == '000000'){
          handleQuery()
          proxy.$message.success('删除房屋数据成功')
        }else{
          proxy.$message.danger('删除房屋数据失败')
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
        query: { data : encodeURIComponent(data), operation: type, type:'house' },
      })
    }
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.gridCode = officeCode
      searchForm.gridName = officeName
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
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
      buildingNo,
      houseType,
      handleDel,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
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
