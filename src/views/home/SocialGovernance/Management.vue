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
       <template v-slot:orderType>
        <popup-tree-input
          :data="orderTreeData"
          :propa="orderTreeProps"
          :nodeKey="'' + searchForm.orderType"
          @update:dataForm="handleOrderTreeSelectChange"
        >
          <template v-slot>
            <el-input
              v-model="searchForm.orderName"
              size="small"
              :readonly="true"
              placeholder="点击选择工单类别"
              style="cursor: pointer"
            ></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
       <template v-slot:orderNo="{ data }">
        <!-- @click.prevent="handleOperation(2, data)" -->
        <el-link type="success" @click.prevent="handleOperation(1, data)">{{ data.orderNo }}</el-link>
      </template>
      <template v-slot:operation="{data}">
        <el-button
          @click="handleOperation(1, data)"
          :icon="Search"
          circle
          type="success"
        />
        <el-button
          title="审核"
          v-if="data.status == 5 && data.buttonStatus == 1"
          :icon="Edit"
          @click="handleOperation(4, data)"
          circle
          type="priamry"
        />
        <el-button
          title="接单/退回"
          v-if="data.status == 1 && data.buttonStatus != 1"
          :icon="Promotion"
          @click="handleOperation(5, data)"
          circle
          type="priamry"
        />
        <el-button
          title="回单"
          v-if="(data.status == 4 || data.status == 7) && data.buttonStatus != 1"
          :icon="Back"
          @click="handleOperation(6, data)"
          circle
          type="priamry"
        />
        <el-button
          title="转派"
          v-if="(data.status == 2 || data.status == 3 )  && data.buttonStatus == 1"
          :icon="Share"
          @click="handleOperation(7, data)"
          circle
          type="priamry"
        />
        <el-button
          title="撤回"
          v-if="data.status == 1 && data.buttonStatus == 1"
          :icon="CircleClose"
          @click="handleOperation(8, data)"
          circle
          type="priamry"
        />
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
  CircleClose,
  Share,
  Back,
  Promotion,
} from '@element-plus/icons-vue'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/management'
import { deepClone, defaultObject } from '@/utils/util'
import { getTree } from '@/api/SocialGovernance/GridHotlineWorkOrder'
export default defineComponent({
    name: 'Management',
    components:[PopupTreeInput],
    setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({
      officeName:'',
      officeCode:'',
      orderType:'',
      orderName:'',
    })
    let popupTreeData = ref([])
    let orderTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const orderTreeProps = {
      label: 'hotlineWorkOrderName',
      children: 'children',
    }
    // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.officeCode = officeCode
      searchForm.officeName = officeName
    }
    const multipleSelection = ref([]) // 选中数据

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
      searchParams.value = {dealCode:JSON.parse(sessionStorage.getItem('user')).user.operatorId}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }

     const handleQueryTable = () => {
       searchParams.value.dealCode = JSON.parse(sessionStorage.getItem('user')).user.operatorId
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
        // {type:'primary',label:'添加',key:'reset',handle:handleAdd},
      ]
    }

      // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editHotlineManage',
        query: {
          data: encodeURIComponent(data),
          operation: type,
          type: 'manage',
        },
      })
    }

    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    const getOrderList = () => {
      getTree({}).then((res) => {
        if (res.resCode == '000000') {
          orderTreeData.value = res.data
        }
      })
    }
    const handleOrderTreeSelectChange = ({hotlineWorkOrderName,id}) => {
      searchForm.orderType = id
      searchForm.orderName = hotlineWorkOrderName
    }
    getOList()
    getOrderList()
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
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      orderTreeProps,
      orderTreeData,
      handleOrderTreeSelectChange,
      Delete,
      Edit,
      Search,
      CircleClose,
      Share,
      Back,
      Promotion,
    }




    }
})
</script>