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
      @select-change="(val) => (multipleSelection = val)"
    >
    <template v-slot:type="{data}">
      <span class="tagClass"
                ><el-button
                  size="small"
                  :type="data.type == 1 ? 'success' : ''"
                  >{{ data.type != 1 ? '目录' : '菜单' }}</el-button
                ></span
              >
    </template>
      <template v-slot:operation="data">
        <el-button
          @click="handleEdit(data.data)"
          icon="edit"
          circle
          type="primary"
        ></el-button>
        <el-popconfirm title="确定要删除该角色吗？" @confirm="handleDelete(data.data)">
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
    <el-form ref="form" :model="dataForm" :rules="rules" label-width="80px">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="dataForm.type" size="small">
          <el-radio v-for="item in typeList" :label="item.value" :key="item.label">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="`${typeList[dataForm.type].label}名称`" prop="name">
        <el-input v-model="dataForm.name" size="small" :placeholder="`${typeList[dataForm.type].label}名称`" clearable></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.parentId" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.parentName" size="small" :readonly="true" placeholder="点击选择内容" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </el-form-item>
      <!-- <el-form-item v-if="dataForm.type != 0" label="授权标识">
        <el-input v-model="dataForm.perms" size="small" clearable></el-input>
      </el-form-item> -->
      <el-form-item v-if="dataForm.type == 1" label="菜单路由">
        <el-input v-model="dataForm.url" size="small" placeholder="菜单路由" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type != 2" label="排序编号">
        <el-input v-model="dataForm.orderNum" type="number" size="small"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type != 2" label="菜单图标">
        <el-input v-model="dataForm.icon" size="small" placeholder="菜单图标 (如 weibo；emojifill)" clearable></el-input>
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
import { getCurrentInstance, reactive, ref, onMounted, onBeforeMount, nextTick } from '@vue/runtime-core'
import { deepClone, formatterDate, listAssign, defaultObject } from '@/utils/util'

import { renderTable } from './common/Menu'
import { saveMenu,deleteMenu } from '@/api/sys/menu'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
export default {
  name:'Menu',
  components:{PopupTreeInput},
  setup() {
    const { proxy } = getCurrentInstance()
    const { tableConfig, formConfig, addFormConfig } = renderTable.call(proxy)
    const table = ref(null)
    const form = ref(null)
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
      type: '',
      icon: '',
      parentId:'',
      parentName:'',
      orderNum:1,
      url:'',
    })
    const rules = reactive({
      name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
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
      
      data.type = String(data.type)
      !(data.parentId) && (data.parentName = '顶级菜单')
      listAssign(dataForm, data)
      operation.value = false
      dialogVisible.value = true
      nextTick(()=>{
        form.value.clearValidate('name')
      })
    }
    const handleAdd = async () => {
      defaultObject(dataForm)
      !(dataForm.parentId) && (dataForm.parentName = '顶级菜单')
      dataForm.type = '1'
      operation.value = true
      dialogVisible.value = true
      nextTick(()=>{
        form.value.clearValidate('name')
      })
    }
    const handleDelete = ({id}) => {
      deleteMenu({id}).then(res=>{
        res.code === 200 && (handleQuery(),proxy.$message.success('用户删除成功。'))
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
        popupTreeData.value = res
      })
    }
    // 表单按钮组
    const formHandle = {
      span: 4,
      btns: [
        // { type: 'primary', label: '查询', key: 'search', handle: handleQuery },
        { type: 'primary', label: '新增', key: 'add', handle: handleAdd },
      ],
    }
    const handleSave = () => {
      form.value.validate((valid) => {
        if (valid) {
          saveMenu(dataForm).then(res=>{
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