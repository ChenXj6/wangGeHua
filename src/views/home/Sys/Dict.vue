<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-button style="margin: 10px 20px"
                   type="primary"
                   size="small" @click="handleAddType(1,{},1)">添加主类型</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <!-- v-model="activeTabs" -->
        <el-tabs
                v-model="activeTabs"
                 tab-position="left"
                 class="demo-tabs"
                 style="height: 600px"
                 @tab-click="handleClick">
          <el-tab-pane v-for="i in tabList" :key="i.value" :label="i.description" :name="i.description" lazy>
            <el-row :gutter="10">
              <el-col :span="4">
                <el-button type="primary"
                           style="margin: 10px 20px"
                           size="small"
                           @click="handleAddType(1,i,2)">添加子类型</el-button>
              </el-col>
              <el-col :span="8" :offset="6">
                <span><b>{{ i.description }}</b></span>
              </el-col>
            </el-row>
            <el-table :data="i.list" size="small" border  style="width: 100%">
              <el-table-column prop="value" label="编码" align="center"/>
              <el-table-column prop="description" label="描述" align="center" />
              <el-table-column prop="createTime" label="创建时间" align="center">
                <template #default="scope">
                  <span>{{ dateFormat(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="delflag" label="是否禁用" align="center">
                <template #default="scope">
                  <span>{{ scope.row.delflag == 0 ? '可用' : (scope.row.delflag == 1 ? '删除' : '禁用') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150" align="center">
                <template #default="scope">
                  <el-button type="primary" icon="edit" circle @click="handleEdit(scope.row)"
                    ></el-button
                  >
                  <el-popconfirm title="确定要删除该数据吗？" @confirm="handleDel(scope.row)">
                    <template #reference>
                      <el-button
                        icon="delete"
                        circle
                        type="danger"
                      />
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px">&nbsp;</el-row>
    <el-dialog :close-on-click-modal="false"
               :title="operation ? '新增' : '编辑'"
               v-model="dialogVisible"
               width="40%">
      <VForm ref="form"
             :key="timer"
             :form-data="addFormConfig"
             :form-model="dataForm"
             :form-handle="AddFormHandle" />
    </el-dialog>
  </div>
</template>
<script>
import { renderTable } from './common/Dict'
import { computed, getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch } from '@vue/runtime-core'

import { saveDict,editDict, getDictList,deleteDict } from '@/api/sys/dict.js'
import { listAssign, defaultObject } from '@/utils/util'

export default {
  name: 'User',
  setup () {
    const { proxy } = getCurrentInstance()
    const { addFormConfig } = renderTable.call(proxy)
    const timer = ref(new Date().getTime())
    let dataForm = reactive({
      id:'',
      basictype:'',
      basictypename:'',
      value:'',
      description:'',
      delflag:0,
    })
    let tabList = reactive([])
    const searchCode = ref('')
    const activeTabs = ref('')
    const dialogVisible = ref(false)
    const operation = ref(false) // true:新增, false:编辑
    // 计算属性处理时间格式
    const dateFormat = computed(() => (date, formatter) => {
      return date && proxy.$moment(date).format(formatter)
    })
    // 表單操作按鈕配置
    const handleEdit = (data) => {
      listAssign(dataForm,data)
      timer.value = new Date().getTime() // 利用组件key来实现实时刷新组件
      operation.value = false
      dialogVisible.value = true
    }
    const handleSave = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if(operation.value){
            saveDict(dataForm).then((res) => {
              if (res.resCode === '000000') {
                tabList.length = 0
                proxy.$message.success('操作成功')
                handleQuery()
                dialogVisible.value = false
              }
            })
          }else{
            editDict(dataForm).then((res) => {
              if (res.resCode === '000000') {
                tabList.length = 0
                proxy.$message.success('操作成功')
                handleQuery()
                dialogVisible.value = false
              }
            })
          }
        } else {
          return
        }
      })
    }
    const AddFormHandle = {
      span: 23,
      textAlign: 'right',
      btns: [
        {
          type: 'default',
          label: '取消',
          key: 'search',
          handle: () => (dialogVisible.value = false),
        },
        { type: 'primary', label: '提交', key: 'add', handle: handleSave },
      ],
    }
    const handleAddType = (type,data={},level) => {
      defaultObject(dataForm)
      if(type == 1){
        operation.value = true
      } else{ operation.value = false }
      dataForm.basictype = data?.value ?? '0000'
      dataForm.basictypename = data?.description ?? '类型列表'
      level == 1 && (dataForm.value = (Number(tabList[tabList.length - 1]?.value) + 1),addFormConfig.formItems[2].disabled = true)
      level == 2 && (dataForm.value = '',addFormConfig.formItems[2].disabled = false)
      timer.value = new Date().getTime()
      dialogVisible.value = true
    }
    const handleDel = ({id}) => {
      deleteDict({id}).then((res) => {
        if (res.resCode === '000000') {
          tabList.length = 0
          proxy.$message.success('操作成功')
          handleQuery()
          dialogVisible.value = false
        }
      })
    }
    const handleClick = (val) => {
      activeTabs.value = val.props.label
      sessionStorage.setItem('activeTabs',activeTabs.value) // 用来记录当前用户上次编辑的目录----小型记忆功能
    }
    // 表格查询
    const handleQuery = () => {
      getDictList({code:searchCode.value}).then(res=>{
        tabList.push(...res.data)
        activeTabs.value = sessionStorage.getItem('activeTabs') ? sessionStorage.getItem('activeTabs') : tabList[0].description
      })
    }
    onBeforeMount(() => {
      handleQuery()
    })
    onBeforeUnmount(()=>{
      sessionStorage.removeItem('activeTabs')
    })
    return {
      dialogVisible,
      dataForm,
      addFormConfig,
      operation,
      timer,
      handleEdit,
      AddFormHandle,
      //
      tabList,
      handleAddType,
      handleDel,
      dateFormat,
      activeTabs,
      handleClick,
    }
  },
}
</script>
<style scoped></style>
