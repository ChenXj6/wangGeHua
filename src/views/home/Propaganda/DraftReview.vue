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
          icon="el-icon-lx-edit"
          @click="handleEdit(data)"
          circle
          type="primary"
        />
      </template>
    </V-table>
    <el-dialog
      title="审核"
      v-model="dialogVisible"
      width="30%">
      <div>
        <el-form ref="form" :model="reviewForm" :rules="rules" label-width="80px">
          <el-form-item label="审核状态" prop="reviewStatus">
            <el-select
              v-model="reviewForm.reviewStatus"
              placeholder="请选择审核状态"
              size="small"
              :loading="loading"
            >            
              <el-option
                v-for="i in options[1074]"
                :label="i.label"
                :value="i.value"
                :key="i.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核意见" prop="opinion">
            <el-input size="mini" type="textarea" v-model="reviewForm.opinion"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
      </template>
    </el-dialog>
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
import { renderTable } from './common/DraftReview'
import { deepClone, defaultObject,resetFormat} from '@/utils/util'
import { searchDict } from '@/api/sys/dict'
import { updateDraft } from '@/api/Propaganda/review'
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
    // 文稿审核弹窗
    const reviewForm = ref({})
    const form = ref(null)
    const dialogVisible = ref(false)
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
      ]
    }
    //
    // 查看
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        name: 'editDraft',
        params: { data : encodeURIComponent(data), operation: type,type:'draft'},
      })
    }
    // 审核
    const handleEdit = (data) => {
      Object.assign(reviewForm.value,data)
      dialogVisible.value = true
    }
    const rules = reactive({
      reviewStatus:[
        { required: true, message: '请选择审核状态', trigger: ['blur','change'] },
      ],
      opinion:[
        { required: true, message: '请选择审核意见', trigger: ['blur','change'] },
      ],
    })
    const handleConfirm = () =>{
      form.value.validate((valid)=>{
        if(valid){
          delete reviewForm.value.treeNames
          reviewForm.value.reviewerUser = JSON.parse(sessionStorage.getItem('user')).user.operatorName
          updateDraft(reviewForm.value).then(res=>{
            if(res.resCode == '000000'){
              proxy.$message.success('文稿审核成功')
              dialogVisible.value = false
              handleQuery()
            }
          })
        } else {
          return false
        }
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
    const loading = ref(false)
    const options = reactive({})
    const querySearchAsync = (basictype) => {
      if(basictype){
        loading.value = true
        searchDict({basictype}).then(res=>{
          if(res.resCode == '000000' && res.data){
            options[basictype] = resetFormat(res.data)
            loading.value = false
          }else{
            options[basictype] = []
            loading.value = false
          }
        })
      }else{
        options[basictype] = []
      }
    }
    querySearchAsync(1074)
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
      handleEdit,
      reviewForm,
      dialogVisible,
      loading,
      options,
      querySearchAsync,
      form,
      handleConfirm,
      rules,
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
