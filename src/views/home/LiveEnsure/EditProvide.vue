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
    <VForm :key="timer" :isDisabled="route.params.operation == 1" :form-data="ProvideFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:lonAndLat="">
        <el-row :gutter="10">
          <el-col :span="12"><el-input v-model="dataForm.lon" placeholder="请点击获取经纬度" size="small" @click="handleClick"></el-input></el-col>
          <el-col :span="12"><el-input v-model="dataForm.lat" placeholder="请点击获取经纬度" size="small" @click="handleClick"></el-input></el-col>
        </el-row>
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
  <!-- 地图弹窗 -->
    <el-dialog
        width="37.5%"
        v-model="mapDialogVisible">
      <VMap @getLatAndLng="getLatAndLng" />
    </el-dialog>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/EditProvide'
import { getOrganList } from '@/api/sys/organ'
import { addPartyPeople,updatePartyPeople } from '@/api/PartyBuilding/partyPeople'
export default {
  name:'Edit',
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { ProvideFormConfig } = renderTable.call(proxy)
    const dataForm = ref({
      officeCode:'',
      officeName:'',
    })
    // 提交
    const handleSave = () => {
      delete dataForm.value.treeNames
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.params.operation == 2) {
          addPartyPeople(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
            resolve(res.message)
          } else {
            reject(res.resCode)
          }
          })
        } else {
          addPartyPeople(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
            resolve(res.message)
          } else {
            reject(res.resCode)
          }
          })
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
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      // console.log(officeCode,officeName,'....')
      dataForm.value.officeCode = officeCode
      dataForm.value.officeName = officeName
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
    // 获取经纬度
    const mapDialogVisible = ref(false)
    const handleClick = () => {
      mapDialogVisible.value = true
    }
    const getLatAndLng = ({lat,lng}) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      dataForm.value.lon = lng
      dataForm.value.lat = lat
      mapDialogVisible.value = false
    }
    
    // 初始化数据
    route.params.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.params.data)))
    onMounted(() => {
      route.params.operation === 3 &&( dataForm.value = {})
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      ProvideFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      handleClick,
      mapDialogVisible,
      getLatAndLng,
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
<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100% !important;
}
</style>
