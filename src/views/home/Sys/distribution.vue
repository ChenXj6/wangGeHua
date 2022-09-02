<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="cascades"></i>
          {{ route.query.type == 'user' ? '用户分配角色' : '基本信息' }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <VForm v-if="route.query.type == 'user'" :isDisabled="true" :form-data="userFormConfig" :form-model="dataForm" />
    <VForm v-else-if="route.query.type == 'role'" :isDisabled="true" :form-data="roleFormConfig" :form-model="dataForm" />
    <VForm v-else :isDisabled="true" :form-data="userFormConfig" :form-model="dataForm" />
    <div v-if="route.query.type == 'user'">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="cascades"></i> 分配角色
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-table ref="table" :data="tableData" style="width: 100%" size="small" border @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50" />
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </div>
    <div v-else-if="route.query.type == 'role'">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="cascades"></i> 授权功能菜单
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="10">
      <el-col :span="10">
        <el-tree
          ref="treeRef"
          :data="items"
          show-checkbox
          :height="208"
          default-expand-all
          :default-checked-keys="treeCheckArr"
          node-key="id"
          check-strictly
          @check="nodeClick"
        >
        <!-- @check-change="handleCheckChange" -->
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ data.name }}</span>
              <span>
                <span><i :class="data.icon"></i></span>
                <span class="tagClass"
                  ><el-button
                    size="small"
                    :type="data.children?.length ? 'primary' : 'success'"
                    >{{ data.children?.length ? '目录' : '菜单' }}</el-button
                  ></span
                >
                
                <span>{{ data.url }}</span>
              </span>
            </span>
          </template>
        </el-tree>
      </el-col>
    </el-row>
    </div>
    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="cascades"></i> 授权数据权限
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="10">
      <el-col :span="10">
        <el-tree
          ref="treeDataRef"
          :data="data"
          show-checkbox
          :height="208"
          default-expand-all
          :default-checked-keys="treeCheckDataArr"
          node-key="officeCode"
          @check-change="handleCheckDataChange"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ data.officeName }}</span>
            </span>
          </template>
        </el-tree>
      </el-col>
    </el-row>
    </div>
    <el-row>
      <div class="btn-box">
        <el-button
          type="primary"
          @click="handleClick()"
          icon="CircleCheck"
          >确定</el-button
        >
        <el-button
          type="primary"
          @click="handleBack()"
          icon="back"
          >返回</el-button
        >
      </div>
    </el-row>
  </div>
</template>
<script>
import { getCurrentInstance, nextTick, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import mixin from '@/mixins/tagView.js'
import {renderTable} from './common/distribution'
import { useRoute } from 'vue-router'
import { getRoleList } from '@/api/sys/role'
import { getRoleByUser,saveRoleToUser,getMenuByRole,saveMenuByRole,saveDataByRole,getDataByRole } from '@/api/sys/user'
import { getMenuTree } from '@/api/sys/menu.js'
import { getOrganList } from '@/api/sys/organ'
export default {
  mixins: [mixin],
  setup() {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const { userFormConfig,roleFormConfig } = renderTable.call(proxy)
    const { delCurrentTag } = mixin.setup()
    const dataForm = ref({})
    const table = ref(null)
    const treeRef = ref(null)
    const treeDataRef = ref(null)
    const tableData = ref([])
    const multipleSelection = ref([])
    const treeCheckArr = ref([])
    const treeSelectArr = ref([])
    const items = ref([]) // 菜单权限
    const data = ref([])  // 数据权限
    const treeCheckDataArr = ref([]) // 数据权限显示数组
    const treeCheckData = ref({
      operatorId:JSON.parse(sessionStorage.getItem('user')).user.id,
      createBy:JSON.parse(sessionStorage.getItem('user')).user.operatorName,
      officeCode:'',
    }) // 数据权限发送
    const getRole = () => {
      getRoleList({pageNum:1,pageSize:9999}).then(res=>{
        if(res.code == 200){
          tableData.value = res.data.list
          multipleSelection.value.forEach(v=>{
            tableData.value.forEach((val,index)=>{
              if(v.roleId == val.id){
                nextTick(()=>{
                  table.value.toggleRowSelection(tableData.value[index],true)
                })
              }
            }) 
          })            
        }
      })
    }
    const getRoleBy = (userId) => {
      getRoleByUser(userId).then(res=>{
        if(res.code == '200'){
          res.data.forEach(v=>{
            let obj = {}
            obj.roleId = v.roleId
            obj.userId = v.userId
            multipleSelection.value.push(obj)
          })
        }
      })
    }
    const getMenuAll = () => {
      getMenuTree().then(res=>{
        if(res.code == '200'){
          items.value = res.data
        }
      })
    }
    const getMenuBy = (id) => {
      getMenuByRole({id}).then(res=>{
        if(res.code == '200'){
          let arr = []
          res.data.forEach((v,i)=>{
            arr[i] = v.id
          })
          treeCheckArr.value = arr
        }
      })
    }
    const getDataBy = (operatorId) => {
      getDataByRole({operatorId}).then(res=>{
        if(res.code == '200'){
          treeCheckDataArr.value = res?.data?.officeCode.split(',') || []
          treeCheckData.value.officeCode = res?.data?.officeCode || ''
        }
      })
    }
    // 角色分配菜单树逻辑
    const nodeClick = (data,node) => {
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
      if(checkArr.length == 0) treeSelectArr.value = []
      let arr = []
      checkArr.forEach(v=>{
        let obj = {}
        obj.roleId = dataForm.value.id
        obj.menuId = v
        arr.push(obj)
      })
      treeSelectArr.value = arr
    }
    const handleSelectionChange = (row) => {
      if(row.length == 0) {
        multipleSelection.value = [] 
        return 
      }
      let arr = []
      row.forEach(v=>{
        let obj = {}
        obj.roleId = v.id
        obj.userId = dataForm.value.id
        arr.push(obj)
      })
      multipleSelection.value = arr
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          data.value = res.data
        }
      })
    }
    const handleCheckDataChange = (row) => {
      if(row.treeLevel == '5'){
        let arr = []
        if(!!treeCheckData.value.officeCode){
          arr = treeCheckData.value.officeCode.split(',')
          let result = arr.indexOf(row.officeCode)
          if(result > -1) {
            arr.splice(result,1)
          }else{
            arr.push(row.officeCode)
          }
        } else {
          arr.push(row.officeCode)
        }
        treeCheckData.value.officeCode = arr.join(',')
      }
      
    }
    const handleClick = async () => {
      if(route.query.type == 'user'){
        saveRoleToUser(multipleSelection.value).then(res=>{
          if(res.code == '200'){
            proxy.$message.success('用户分配角色成功')
            delCurrentTag(route)
          }
        })
      }else if(route.query.type == 'role') {
        if(treeSelectArr.value.length == 0){
          proxy.$message.warning('请至少选择一个菜单!')
          return
        }
        saveMenuByRole(treeSelectArr.value).then(res=>{
          if(res.code == '200'){
            proxy.$message.success('角色分配菜单权限成功')
            delCurrentTag(route)
          }
        })
      }else{
        if(treeCheckData.value.officeCode.length == 0){
          proxy.$message.warning('请至少选择一个数据!')
          return
        }
        saveDataByRole(treeCheckData.value).then(res=>{
          if(res.code == '200'){
            proxy.$message.success('角色分配数据权限成功')
            delCurrentTag(route)
          }
        })
      }
      
    }
    const handleBack = () => {
      delCurrentTag(route)
    }
    dataForm.value = JSON.parse(decodeURIComponent(route.query.data))
    if(route.query.type == 'user'){
      getRoleBy(dataForm.value.id)
      getRole()
    } else if ( route.query.type == 'role') {
      getMenuBy(dataForm.value.id)
      getMenuAll()
    } else {
      getDataBy(dataForm.value.id)
      getOList()
    }
    onBeforeMount(()=>{
      
    })
    onMounted(() => {   
    })
    return {
      table,
      route,
      userFormConfig,
      roleFormConfig,
      dataForm,
      tableData,
      handleSelectionChange,
      handleClick,
      handleBack,
      items,
      treeRef,
      nodeClick,
      treeCheckArr,
      data,
      treeDataRef,
      treeCheckDataArr,
      handleCheckDataChange,
    }
  },
}
</script>
<style scoped>
.btn-box{
  margin: 10px;
  text-align: right;
}
.menu-header {
  padding-left: 8px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 16px;
  color: rgb(20, 89, 121);
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
.tagClass {
  height: 30px;
  transform: scale(0.8);
}
.footerClass {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<style>
.el-tree-node__content{
  height: 30px !important;
  line-height: 30px;
}
</style>