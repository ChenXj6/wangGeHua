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
    >
    <template v-slot:operation="{data}">
        <el-button
          icon="edit"
          @click="handleOperation(false, data)"
          circle
          type="primary"
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
  <!-- 驾驶舱展示配置 -->
  <el-dialog
    title="驾驶舱展示配置"
    v-model="dialogVisible"
    width="50%"
    :before-close="dialogBeforeClose">
    <div></div>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </template>
  </el-dialog>
  <!-- 新增&&编辑 -->
  <el-dialog
    :title="operation ? '新增': '编辑'"
    v-model="addDialogVisible"
    width="50%"
    :before-close="addDialogBeforeClose">
    <div>
      <VForm :key="timer" :form-data="coclpitFormConfig" :form-model="addForm" :form-handle="addFormHandle"/>
    </div>
  </el-dialog>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref } from '@vue/runtime-core'
import { renderTable } from './common/CoclpitGovern'
import { deepClone, defaultObject } from '@/utils/util'
import { useRouter } from 'vue-router'
import { saveCoclpit,deleteCoclpit,updateCoclpit } from '@/api/sys/coclpitGovern'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { tableConfig,formConfig, coclpitFormConfig } = renderTable.call(proxy)
    const searchForm = ref({
      officeCode:'',
      officeName:'',
    })
    const timer = ref(new Date().getTime())
    const table = ref(null)
    const searchParams = ref({})
    // 展示配置
    const dialogVisible = ref(false)
    const dialogBeforeClose = () => {
      dialogVisible.value = false
    }
    const handleControl = () => {
      dialogVisible.value = true
    }
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
      handleOperation(true,{})
    }
    const handleDel = (id) => {
      deleteCoclpit({id}).then(res=>{
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
        {type:'primary',label:'新增',key:'add',handle:handleAdd},
        {type:'primary',label:'驾驶舱展示配置',key:'control',handle:handleControl},
      ]
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    // 新增 true/编辑 false
    const operation = ref(false) 
    const handleOperation = (type, rowData) => {
      timer.value = new Date().getTime()
      operation.value = type
      addForm.value = deepClone(rowData)
      addDialogVisible.value = true      
    }
    const addForm = ref({})
    const addDialogVisible = ref(false)
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (operation.value) {
          saveCoclpit(addForm.value).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
          updateCoclpit(addForm.value).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        }
      })
    }
    const handleAddItem = (formEl) => {
      formEl.validate((vaild) => {
        if (vaild) {
          handleSave().then(res=>{
            addDialogVisible.value = false
            handleQuery()
            proxy.$message.success(`${!operation.value ? '编辑' : '添加'}成功`)
          }).catch(err=>{
            proxy.$message.warning(`操作失败，请稍后再试！`)
          })     
        } else {
          return
        }
      })
    }
    const addDialogBeforeClose = () => {
      addDialogVisible.value = false
    }
    const addFormHandle = {
      span:24,
      textAlign:'right',
      btns: [
        {type:'primary',label:'取 消',key:'reset',handle:addDialogBeforeClose},
        {type:'primary',label:'保 存',key:'add',handle:handleAddItem},
      ]
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
      handleOperation,
      handleDel,
      //
      timer,
      operation,
      dialogVisible,
      dialogBeforeClose,
      coclpitFormConfig,
      addForm,
      addFormHandle,
      addDialogVisible,
      addDialogBeforeClose,
    }
  },
}
</script>
<style scoped>

</style>