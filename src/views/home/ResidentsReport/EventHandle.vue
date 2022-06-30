<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle">
      <template v-slot:approvalStatus>
        <el-select v-model="searchForm.approvalStatus" size="mini" clearable placeholder="请选择事件状态">
          <el-option
            v-for="item in approvalStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:eventFirstType>
        <el-select v-model="searchForm.eventFirstType" size="mini" clearable placeholder="请选择事件类型">
          <el-option
            v-for="item in eventFirstTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:source>
        <el-select v-model="searchForm.source" size="mini" clearable placeholder="请选择事件来源">
          <el-option
            v-for="item in dataSourceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:name="data">
        <el-link
          type="success"
          @click.prevent="handleOperation(1, data.data)"
          >{{ data.data.eventName }}</el-link
        >
      </template>
      <template v-slot:eventScope="{data}">
        <span>{{eventScopeOptions.filter(v=>v.value == data.eventScope)[0]?.label}}</span>
      </template>
      <template v-slot:eventFirstType="{data}">
        <span>{{eventFirstTypeOptions.filter(v=>v.value == data.eventFirstType)[0]?.label}}</span>
      </template>
      <template v-slot:approvalStatus="{data}">
        <span>{{approvalStatusOptions.filter(v=>v.value == data.approvalStatus)[0]?.label}}</span>
      </template>
      <template v-slot:dataSource="{data}">
        <span>{{dataSourceOptions.filter(v=>v.value == data.dataSource)[0]?.label}}</span>
      </template>
      <template v-slot:operation="data">
        <el-button
          size="small"
          @click="handleOperation(1, data.data)"
          icon="el-icon-lx-search"
          circle
          type="success"
        />
        <el-button
          size="small"
          v-if="data.data.approvalStatus == 1 || data.data.approvalStatus == 2"
          icon="el-icon-lx-forwardfill"
          circle
          type="priamry"
          @click="handleOperation(4, data.data)"
        />
        <el-popconfirm v-if="data.data.approvalStatus == 1 || data.data.approvalStatus == 2 || data.data.approvalStatus == 4" :title="`是否${data.data.approvalStatus == 4 || data.data.approvalStatus == 5 ? '解挂' : '临时挂起'}该条数据`" @confirm="handleLock(data.data)">
          <template #reference>
            <el-button
              size="small"
              :icon="`el-icon-lx-${data.data.approvalStatus == 4 ? 'unlock' : 'lock'}`"
              circle
              type="priamry"
            />
          </template>
          <!-- unlock -->
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

import { renderTable } from './common/eventHandle'
import { deepClone, formatterDate,resetFormat } from '@/utils/util'

import { searchDict } from '@/api/sys/dict'
import { queryByEventId,eventLock } from '@/api/ResidentsReport/index'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'residentsReport',
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = ref({
      date: []
    }) // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const multipleSelection = ref([]) // 选中数据
    // 是否有選中數據
    const isHaveSelect = computed(
      () => multipleSelection.value && multipleSelection.value.length > 0
    )
    
    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm.value)
      for (const key in searchParams.value) {
        if (
          Array.isArray(searchParams.value[key]) &&
          searchParams.value[key].length > 0
        ) {
          searchParams.value[`${key}Start`] = formatterDate(
            searchParams.value[key][0]
          )
          searchParams.value[`${key}End`] = formatterDate(
            searchParams.value[key][1]
          )
          delete searchParams.value[key]
        }
      }
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchForm.value = {}
      searchParams.value = {}
      handleQuery()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    // 监听webSocket事件 ，实时刷新列表
    watch(()=>store.state.eventList,()=>{
        handleQuery()
      },
      {deep:true}
    )
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
      ]
    }
    //
    // 改变table行样式
    const tableRowClassName = ({ row }) => {
      if (row.isNew === 1) {
        return 'warning-row'
      } else if (row.isNew === 2) {
        return 'danger-row'
      } else return ''
    }
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editResidentsReport',
        query: { data: encodeURIComponent(data), operation: type },
      })
    }
    const dataForm = ref({})
    const handleLock = async (data) => {
      dataForm.value.eventId = data.id
      await queryByEventId({eventId:dataForm.value.eventId}).then(res=>{
        if(res.resCode == '000000'){
          dataForm.value.id = res.data[0].id
        }
      })
      if(data.approvalStatus == 4){
        dataForm.value.dealStatus = '2'
        eventLock(dataForm.value).then(res=>{
          if(res.resCode == '000000'){
            handleQuery()
            proxy.$message.success('数据解挂成功')
          }
        })
      }else{
        dataForm.value.dealStatus = '4'
        eventLock(dataForm.value).then(res=>{
          if(res.resCode == '000000'){
            handleQuery()
            proxy.$message.success('数据临时挂起成功')
          }
        })
      }
    }
    // 获取事件规模1019、事项类型1025、事件处理状态1001
    const eventScopeOptions = ref([])
    const eventFirstTypeOptions = ref([])
    const approvalStatusOptions = ref([])
    const dataSourceOptions = ref([])
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormat(res.data)
        }else{
          data.value = []
        }
      })
    }

    onBeforeMount(() => {
      tableConfig.rowClassFunc = tableRowClassName //  表格样式
      getOptionsByCode(1019,eventScopeOptions);
      getOptionsByCode(1025,eventFirstTypeOptions);
      getOptionsByCode(1027,approvalStatusOptions);
      getOptionsByCode(1003,dataSourceOptions);
    })
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
      //
      eventScopeOptions,
      eventFirstTypeOptions,
      approvalStatusOptions,
      dataSourceOptions,
      handleLock,
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
