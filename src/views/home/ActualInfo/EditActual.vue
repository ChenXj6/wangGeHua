<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{ route.params.operation == 1 ? '查看' : ( route.params.operation == 2 ? '编辑' : '添加' ) }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <VForm v-if="route.params.type === 'build'" :key="timer" :isDisabled="route.params.operation == 1" :form-data="buildFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:lonAndLat="">
        <el-input v-model="dataForm.longitude" placeholder="请输入经纬度" size="small"></el-input>
      </template>
    </VForm>
    <VForm v-else-if="route.params.type === 'house'" :isDisabled="route.params.operation == 1" :form-data="houseFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}"/>
    <VForm v-else :form-data="peopleFormConfig" :isDisabled="route.params.operation == 1" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}"/>
    <div v-if="route.params.operation == 1 && route.params.type !== 'people'">
      <div style="margin-bottom: 20px"></div>
      <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
        <el-tab-pane v-if="route.params.type === 'build'" label="实有房屋" name="first">
          <V-table ref="table1" :table-config="houseTableConfig"/>
        </el-tab-pane>
        <el-tab-pane v-if="route.params.type !== 'people'" label="实有人口" name="second">
          <V-table ref="table2" :table-config="peopleTableConfig"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-row v-if="route.params.operation == 1">
      <div class="btn-box">
        <el-button
          type="primary"
          @click="handleBack"
          size="small"
          icon="el-icon-lx-back"
          >返回</el-button
        >
      </div>
    </el-row>
    <el-dialog v-model="dialogVisible">
      <img
        :src="dialogImageUrl"
        alt="Preview Image"
        style="display: block; width: 50%; margin: 0 auto"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/edit'
import { saveBuild,editBuild } from '@/api/ActualInfo/build'
import { saveHouse,editHouse } from '@/api/ActualInfo/house'
import { savePeople,editPeople } from '@/api/ActualInfo/people'
import { listAssign, defaultObject } from '@/utils/util'
export default {
  name:'EditActual',
  mixins: [mixin],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { houseTableConfig,peopleTableConfig,buildFormConfig,houseFormConfig,peopleFormConfig } = renderTable.call(proxy)
    const activeName = ref('first')
    const table1 = ref(null)
    const table2 = ref(null)
    let dataForm = reactive({})
    let timer = ref(new Date().getTime())
    const handleClick = (val) => {
      console.log(val)
      // activeName.value = 'people'
    }
    
    // 提交
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.params.operation == 2) {
          if(route.params.type == 'build'){
            editBuild(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else if (route.params.type == 'house') {
            editHouse(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else {
            editPeople(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          }
        } else {
          if(route.params.type == 'build'){
            saveBuild(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else if (route.params.type == 'house') {
            saveHouse(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else {
            savePeople(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          }
        }
      })
    }
    const handleSubmit = (formRef) => {
      formRef.validate((vaild) => {
        if (vaild) {
          handleSave().then(res=>{
            proxy.$message.success(`${route.params.operation == 2 ? '编辑' : '添加'}成功`)
            delCurrentTag(route)
          }).catch(err=>{
            proxy.$message.warning(`操作失败，请稍后再试！`)
          })          
        } else {
          return
        }
      })
    }
    const handleBack = () => {
      delCurrentTag(route)
    }
    const formHandle = {
      span:22,
      textAlign: 'right',
      btns: [
        {type:'primary',label:'确认',key:'sub',icon:'el-icon-lx-roundcheck',handle:handleSubmit},
        {type:'primary',label:'返回',key:'back',icon:'el-icon-lx-back',handle:handleBack},
      ]
    }
    // 表格相關操作
    const handleQueryTable = () => {
      table1.value.getTableData({}, (res) => {
        // const data = res.data || []
        tableConfig.data = tableData
      })
    }
    onBeforeMount(()=>{
      timer.value = new Date().getTime()
    })
    route.params.operation != 3 && (dataForm = JSON.parse(decodeURIComponent(route.params.data)))
    route.params.type == 'house' && (activeName.value = 'second')
    onMounted(() => {
      route.params.operation === 3 &&( dataForm = {})
      // handleQueryTable()
      // getDetail(route.params.id)
    })
    return {
      dataForm,
      table1,
      table2,
      route,
      handleBack,
      handleSubmit,
      houseTableConfig,
      peopleTableConfig,
      buildFormConfig,
      houseFormConfig,
      peopleFormConfig,
      activeName,
      handleClick,
      formHandle,
    }
  },
}
</script>
<style lang="scss" scoped>
.edit-content{
  padding-bottom: 20px;
}
.btn-box {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
