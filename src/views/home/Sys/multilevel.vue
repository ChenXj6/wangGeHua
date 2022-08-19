<template>
  <div>
    <VForm
      :form-data="formConfig"
      :form-model="searchForm"
      :form-handle="formHandle"
    />
    <V-table
      ref="table"
      :table-config="tableConfig"
    >
      <template v-slot:operation="data">
        <el-button
          @click="handleEdit(data.data)"
          icon="edit"
          circle
          type="primary"
        ></el-button>
        <el-popconfirm v-if="data.data.level != 0" title="确定要删除该数据吗？" @confirm="handleDelete(data.data)">
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
     <el-dialog
      :close-on-click-modal="false"
      :title="operation ? '新增' : '编辑'"
      v-model="dialogVisible"
      width="35%"
    >
    <el-form ref="form" :key="timer" :model="dataForm" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" size="small" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.parentId" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.parentName" size="small" :readonly="true" placeholder="点击选择内容" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </el-form-item>
      <el-form-item label="编码值" v-if="!dataForm.parentId" prop="perms">
        <el-input v-model="dataForm.perms" size="small" disabled placeholder="" clearable></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="dataForm.orderNum" size="small" placeholder="" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="dataForm.remark" size="small" placeholder="" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-top:4px;text-align:right">
      <el-button type="default" size="small" @click="dialogVisible = false" >取消</el-button>
      <el-button type="primary" size="small" @click="handleSave" >提交</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref, onMounted, onBeforeMount, watch } from '@vue/runtime-core'
import { deepClone, formatterDate, listAssign, defaultObject } from '@/utils/util'

import { renderTable } from './common/multilevel'
import { saveDictTh,deleteDictTh } from '@/api/sys/multilevel'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
export default {
  name:'Menu',
  components:{PopupTreeInput},
  setup() {
    const { proxy } = getCurrentInstance()
    const { tableConfig, formConfig, addFormConfig } = renderTable.call(proxy)
    const table = ref(null)
    const form = ref(null)
    const timer = ref(new Date().getTime())
    let searchParams = ref({}) // 表单数据备份
    const searchForm = reactive({
      name:''
    })
    const typeList = [
      { label:'目录',value:'0'},
      { label:'菜单',value:'1'},
      { label:'按钮',value:'2'},
    ]
    const dataForm = reactive({
      id:'',
      name:'',
      parentId:0,
      parentName:'',
      orderNum:'',
      perms:''
    })
    const rules = reactive({
      name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
      ],
      orderNum: [
        { required: true, message: '请输入排序号', trigger: 'blur' },
      ],
      parentId:[
        { required: true, message: '请选择上级菜单', trigger: 'blur' },
      ],
      perms:[
        { required: true, message: '编码值必填', trigger: 'blur' },
      ],
    })
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "name",
      children: "children"
    }
    const handleTreeSelectChange = ({id,name}) => {
      dataForm.parentId = id
      dataForm.parentName = name
    }
    const dialogVisible = ref(false)
    const operation = ref(false) // true:新增, false:编辑
    // 表單操作按鈕配置
    const handleEdit = async (data) => {
      operation.value = false
      defaultObject(dataForm)
      timer.value = new Date().getTime()
      data.type = String(data.type)
      listAssign(dataForm, data)
      dataForm.parentId == 0 && (dataForm.parentName = '顶级菜单')      
      dialogVisible.value = true
    }
    watch(()=>dataForm.parentId,(val)=>{
      if(!!val && operation.value){
        dataForm.perms = ''
      }else if(operation.value){
        dataForm.perms = String(tableConfig.data.length + 1).padStart(4,'0')
      }
    },{deep:true})
    const handleAdd = async () => {
      operation.value = true
      timer.value = new Date().getTime()
      defaultObject(dataForm)
      dataForm.parentId = 0
      dataForm.parentName = '顶级菜单'
      dataForm.perms = String(tableConfig.data.length + 1).padStart(4,'0')      
      dialogVisible.value = true
    }
    const handleDelete = ({id}) => {
      deleteDictTh({id}).then(res=>{
        res.code === 200 && (handleQuery(),proxy.$message.success('数据删除成功。'))
      })
    }
    // 表格操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        tableConfig.data = res
        let obj = [{
          name:'顶级菜单',
          id:0,
        }]
        popupTreeData.value = res
        popupTreeData.value = obj.concat(popupTreeData.value)
      })
    }
    // 表单按钮组
    const formHandle = {
      span: 4,
      btns: [
        { type: 'primary', label: '查询', key: 'search', handle: handleQuery },
        { type: 'primary', label: '新增', key: 'add', handle: handleAdd },
      ],
    }
    const handleSave = () => {
      form.value.validate((valid) => {
        if (valid) {
          saveDictTh(dataForm).then(res=>{
            if(res.code == '200'){
              handleQuery()
              proxy.$message.success(`${operation.value ? '新增' : '编辑'}成功`)
              dialogVisible.value = false
            }
          })
        } else {
          return
        }
      })
    }
    onMounted(() => {
      handleQuery()
    })
    return {
      form,
      table,
      formConfig,
      tableConfig,
      formHandle,
      addFormConfig,
      searchForm,
      dataForm,
      handleEdit,
      handleDelete,
      dialogVisible,
      operation,
      typeList,
      handleSave,
      popupTreeData,
      rules,
      popupTreeProps,
      handleTreeSelectChange,
      timer,
    }
  },
}
</script>
<style scoped>
.tagClass {
  height: 30px;
  transform: scale(0.8);
}
</style>