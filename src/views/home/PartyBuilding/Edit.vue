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
    <VForm v-if="route.params.type === 'partyInfo'" :key="timer" :isDisabled="route.params.operation == 1" :form-data="partyFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
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
    <VForm v-else :key="timer" :isDisabled="route.params.operation == 1" :form-data="partyPeopleFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:partyOrgId="">
        <el-input v-model="dataForm.infoName" size="mini" :readonly="true" placeholder="点击选择党组织" @click="handleOpenInfo" style="cursor:pointer;"></el-input>
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
    <!-- 党组织弹窗 -->
    <el-dialog
        width="width"
        v-model="InfoDialogVisible">
        <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="infoFormHandle">
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
      @row-click="rowClick"
    >
    <template v-slot:orgType="{data}">
      <span >{{orgTypeOptions.filter(v=>v.value == data.orgType)[0]?.label}}</span>
    </template>
    </V-table>
    </el-dialog>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/Edit'
import { renderTable as renderInfoTable } from './common/PartyInfo'
import { deepClone,resetFormat,defaultObject  } from '@/utils/util'
import { getOrganList } from '@/api/sys/organ'
import { searchDict } from '@/api/sys/dict'
import { addParty,updateParty } from '@/api/PartyBuilding/partyInfo'
import { addPartyPeople,updatePartyPeople } from '@/api/PartyBuilding/partyPeople'
export default {
  name:'Edit',
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { partyFormConfig,partyPeopleFormConfig} = renderTable.call(proxy)
    const { tableConfig,formConfig } = renderInfoTable.call(proxy)
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
          delete dataForm.value.treeNames
          if(route.params.type == 'partyInfo'){
             updateParty(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }else{
            updatePartyPeople(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }
        } else {
          if(route.params.type == 'partyInfo'){
             addParty(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }else{
            addPartyPeople(dataForm.value).then(res=>{
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
      dataForm.value.longitude = lng
      dataForm.value.latitude = lat
      mapDialogVisible.value = false
    }
    // 党组织弹窗
    const InfoDialogVisible = ref(false)
    const searchForm = ref({
      officeCode:'',
      officeName:'',
    })
    const table = ref(null)
    const searchParams = ref({})
    const handleOpenInfo = () => {
      tableConfig.columns.splice(tableConfig.columns.length-1,1)
      InfoDialogVisible.value = true
      setTimeout(()=>{
        handleQuery()
      },0)
    }
    const orgTypeOptions = ref([])
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormat(res.data)
        }else{
          data.value = []
        }
      })
    }
    getOptionsByCode(1057,orgTypeOptions)
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
    // 表單操作按鈕配置
    const infoFormHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
      ]
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    const rowClick = ({id,infoName,officeCode,officeName}) => {
      // console.log(val)
      dataForm.value.partyOrgId = id
      dataForm.value.infoName = infoName
      dataForm.value.officeCode = officeCode
      dataForm.value.officeName = officeName
      InfoDialogVisible.value = false
    }

    // 初始化数据
    route.params.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.params.data)))
    // console.log(route.params.type)
    if(route.params.operation != 3 && route.params.type == 'partyInfo'){
      // partyFormConfig.formItems[0].disabled = true
      partyFormConfig.formItems.forEach(v=>{
        if(v.prop == 'number'){
          v.disabled = true
        }
      })
    }else if (route.params.operation != 3 && route.params.type == 'partyPeople'){
      partyPeopleFormConfig.formItems.forEach(v=>{
        if(v.prop == 'number'){
          v.disabled = true
        }
      })
    }
    onMounted(() => {
      route.params.operation === 3 &&( dataForm.value = {})
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      partyFormConfig,
      partyPeopleFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      handleClick,
      mapDialogVisible,
      getLatAndLng,
      // 党组织弹窗
      handleOpenInfo,
      InfoDialogVisible,
      tableConfig,
      formConfig,
      infoFormHandle,
      table,
      searchForm,
      orgTypeOptions,
      rowClick,
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
