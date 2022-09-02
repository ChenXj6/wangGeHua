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
    width="95%"
    :before-close="dialogBeforeClose">
    <el-row class="box" gutter="20">
      <el-col :span="12" style="height:100%;overflow: scroll">
        <el-tree
          ref="treeRef"
          :data="treeList"
          :props="props"
          node-key="id"
          default-expand-all
          show-checkbox
          check-strictly
          :default-checked-keys="checkTreeList"
          @check="handleCheckChange"
        >
        <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ data.name }}</span>
              <span>
                <span class="tagClass" v-if="!!data.showType && data.children.length <= 0">
                  <el-button
                    size="small"
                    :type="(  data.showType == '1') ? 'primary' : 'success'"
                    >{{ (  data.showType == '1') ? '文本' : '图表' }}</el-button
                  ></span>
                  <span v-else><el-button size="small" type="info">模块</el-button></span>
              </span>
            </span>
          </template>
        </el-tree>
      </el-col>
      <!-- <el-col class="bg" :span="18">
        <Coclpit ref="CoclpitRef"/>
      </el-col> -->
    </el-row>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSet">保 存</el-button>
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
import { defineAsyncComponent, getCurrentInstance, nextTick, onMounted, reactive, ref } from '@vue/runtime-core'
import { renderTable } from './common/CoclpitGovern'
import { deepClone, defaultObject } from '@/utils/util'
import { useRouter } from 'vue-router'
import { saveCoclpit,deleteCoclpit,updateCoclpit,getCoclpitTree,getCheckCoclpitTree,setConfig } from '@/api/sys/coclpitGovern'
export default {
  components:{
    // Coclpit:defineAsyncComponent(() => import('@/views/main/components/coclpit.vue'))
  },
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
    const CoclpitRef = ref(null)
    const handleControl = () => {
      getTreeList()
      getCheckTree()
      dialogVisible.value = true
      // nextTick(()=>{
      //   console.log(CoclpitRef.value.isOpen)
      // })
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
    //
    const treeRef = ref(null)
    const treeList = ref([])
    const checkTreeList = ref([])
    const treeCheckArr = ref([])
    const getTreeList = () => {
      getCoclpitTree().then(res=>{
        if(res.resCode == '000000'){
          treeList.value = res.data
        }
      })
    }
    const getCheckTree = () => {
      getCheckCoclpitTree().then(res=>{
        if(res.resCode == '000000'){
          let arr = []
          res.data.forEach((v,i)=>{
            arr[i] = v.id
          })
          checkTreeList.value = arr
        }
      })
    }
    const props = {
      label: 'name',
      children: 'children',
    }
    // el-tree 选择逻辑
    const handleCheckChange = (data,node) => {
      let result = node.checkedKeys.indexOf(data.id) >= 0
      if(data.children.length > 0 && result){ // 如果直接选择了父级，下级全部勾选
        data.children.forEach(val=>{
          if(node.checkedKeys.indexOf(val.id) >= 0){
            node.checkedKeys.forEach((v,i)=>{
              if(val.id == v){
                node.checkedKeys.splice(i,1)
              }
            })
          }else{
            node.checkedKeys.push(val.id)
          }
        })
      }else if(!result){  // 如果点击取消了父级，下级全部移除
        data.children.forEach(val=>{
          if(node.checkedKeys.indexOf(val.id) >= 0){
            node.checkedKeys.forEach((v,i)=>{
              if(val.id == v){
                node.checkedKeys.splice(i,1)
              }
            })
          }
        })
      }
      // 如果只选择了一个下级，则把他的父级也勾选
      if(!!Number(data.parentId)){
        let result = node.checkedKeys.indexOf(data.parentId) >= 0
        !result && node.checkedKeys.push(data.parentId)
      }
      // 把半选中的父级改为选中
      node.halfCheckedKeys.forEach((v,i)=>{
        node.checkedKeys.push(v)
        node.halfCheckedKeys.splice(i,1)
      })
      treeRef.value.setCheckedKeys(node.checkedKeys,false)
      // 给接口所用数据赋值
      let checkArr = node.checkedKeys
      if(checkArr.length == 0) treeCheckArr.value = []
      let arr = []
      checkArr.forEach(v=>{
        arr.push(v)
      })
      treeCheckArr.value = arr
    }
    const handleSet = () => {
      let id = treeCheckArr.value.join(';')
      setConfig({id}).then(res=>{
        if(res.resCode == '000000'){
          proxy.$message.success('修改成功')
          handleQuery()
          dialogVisible.value = false
        }else{
          proxy.$message('保存失败，请稍后重试')
        }
      })
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
      treeRef,
      props,
      handleCheckChange,
      treeList,
      checkTreeList,
      handleSet,
      CoclpitRef,
    }
  },
}
</script>
<style scoped>
.bg{
  background: #424242;
}
.box{
  height: 500px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node > span:nth-child(2) {
  width: 400px;
  display: flex;
  justify-content: flex-start;
}
.custom-tree-node > span:nth-child(2) >span {
  min-width: 100px;
}
</style>
