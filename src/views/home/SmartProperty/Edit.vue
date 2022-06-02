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
    <VForm v-if="route.params.type == 'car'" :key="timer" :isDisabled="route.params.operation == 1" :form-data="CarFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ="">
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-else-if="route.params.type === 'pubilc'" :isDisabled="route.params.operation == 1" :form-data="PubilcFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ="">
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
      <template v-slot:lonAndLat="">
        <el-input v-model="dataForm.longitude" placeholder="请输入经纬度" size="small"></el-input>
      </template>
    </VForm>
    <VForm v-else :form-data="rubbishFormConfig" :isDisabled="route.params.operation == 1" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ="">
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
      <template v-slot:lonAndLat="">
        <el-input v-model="dataForm.longitude" placeholder="请输入经纬度" size="small"></el-input>
      </template>
    </VForm>
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
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/Edit'
import { saveBuild,editBuild } from '@/api/ActualInfo/build'
import { saveHouse,editHouse } from '@/api/ActualInfo/house'
import { savePeople,editPeople } from '@/api/ActualInfo/people'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
export default {
  name:'EditActual',
  mixins: [mixin],
  components:{PopupTreeInput},
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { CarFormConfig, PubilcFormConfig, rubbishFormConfig } = renderTable.call(proxy)
    let dataForm = reactive({
      officeCode:'',
      officeName:'',
    })
    let timer = ref(new Date().getTime())
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.officeCode = officeCode
      searchForm.officeName = officeName
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
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
    
    onMounted(() => {
      route.params.operation === 3 &&( dataForm = {})
      // handleQueryTable()
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      CarFormConfig,
      PubilcFormConfig,
      rubbishFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
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
