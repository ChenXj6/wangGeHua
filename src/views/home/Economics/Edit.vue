<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="cascades"></i>
          {{ route.query.operation == 1 ? '查看' : ( route.query.operation == 2 ? '编辑' : '添加' ) }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <VForm v-if="route.query.type === 'tax'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="taxFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-else-if="route.query.type === 'item'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="itemFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:lonAndLat="">
        <el-row :gutter="10">
          <el-col :span="12"><el-input v-model="dataForm.longitude" placeholder="请点击获取经纬度" size="small" @click="handleClick"></el-input></el-col>
          <el-col :span="12"><el-input v-model="dataForm.latitude" placeholder="请输入经纬度" size="small" @click="handleClick"></el-input></el-col>
        </el-row>
      </template>
      <template v-slot:type1="">
        <el-select v-model="dataForm.type1" clearable size="small" placeholder="请选择一级分类" @change="handleChangelevel1">
          <el-option
            v-for="item in level1Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:type2="">
        <el-select v-model="dataForm.type2" clearable :disabled="!dataForm.type1" size="small" placeholder="请选择二级分类">
          <el-option
            v-for="item in level2Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <VForm v-else-if="route.query.type === 'building'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="buildingFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:eventLong="">
          <el-input
                  v-model="dataForm.longitude"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable                  
                  @click="handleClick"
                />
        </template>
      <template v-slot:eventLat="">
                <el-input
                  v-model="dataForm.latitude"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable
                  @click="handleClick"
                />
      </template>
    </VForm>
    <VForm v-else :key="timer" :isDisabled="route.query.operation == 1" :form-data="industryFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <el-row v-if="route.query.operation == 1">
      <div class="btn-box">
        <el-button
          type="primary"
          @click="handleBack"
          size="small"
          icon="back"
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

import { renderTable } from './common/Edit'
import { getOrganList,getSmallOrganList } from '@/api/sys/organ'
import { addTax,updateTax } from '@/api/Economics/tax'
import { addItem,updateItem } from '@/api/Economics/itemList'
import { addBuilding,updateBuilding } from '@/api/Economics/building'
import { addIndustry,updateIndustry } from '@/api/Economics/industry'
import { getDictThTreeBy } from '@/api/sys/multilevel'
export default {
  name:'Edit',
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { taxFormConfig,itemFormConfig,buildingFormConfig,industryFormConfig } = renderTable.call(proxy)
    const dataForm = ref({
      officeCode:'',
      officeName:'',
    })
    // 提交
    const handleSave = () => {
      delete dataForm.value.treeNames
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
          if(route.query.type == 'tax'){
            updateTax(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
          if(route.query.type == 'item'){
            updateItem(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
          if(route.query.type == 'building'){
            updateBuilding(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
          if(route.query.type == 'industry'){
            updateIndustry(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
        } else {
          if(route.query.type == 'tax'){
            addTax(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
          if(route.query.type == 'item'){
            addItem(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
          if(route.query.type == 'building'){
            addBuilding(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
          if(route.query.type == 'industry'){
            addIndustry(dataForm.value).then(res=>{
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
            proxy.$message.success(`${route.query.operation == 2 ? '编辑' : '添加'}成功`)
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
        {type:'primary',label:'确认',key:'sub',icon:'CircleCheck',handle:handleSubmit},
        {type:'primary',label:'返回',key:'back',icon:'ArrowLeft',handle:handleBack},
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
        // 分类
    const level1Options = ref([])
    const level2Options = ref([])
    const resetFormat = (data,option) => {
      let arr = []
      data.forEach(v=>{
        let obj = {}
        obj.label = v.name
        obj.value = String(v.id)
        arr.push(obj)
      })
      option.value = arr
    }
    const handleChangelevel1 = () => {
      let id = dataForm.value.type1
      dataForm.value.type2 = ''
      getDictThTreeByApi({id},level2Options)
    }
    const getDictThTreeByApi = (data,option) => {
      getDictThTreeBy(data).then(res=>{
        if(res.code == 200){
          resetFormat(res.data,option)
        }        
      })
    }
    getDictThTreeByApi({perms:'0006'},level1Options)
    // 获取经纬度
    const mapDialogVisible = ref(false)
    const handleClick = () => {
      mapDialogVisible.value = true
    }
    const getLatAndLng = ({lat,lng}) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      dataForm.value.longitude = lng
      dataForm.value.latitude = lat
      mapDialogVisible.value = false
    }
    // 初始化数据
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)))
    console.log(route.query.type)
    onMounted(() => {
      route.query.operation === 3 &&( dataForm.value = {})
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      taxFormConfig,
      itemFormConfig,
      buildingFormConfig,
      industryFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      handleClick,
      mapDialogVisible,
      getLatAndLng,
      // 多级分类
      level1Options,
      level2Options,
      handleChangelevel1,
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
