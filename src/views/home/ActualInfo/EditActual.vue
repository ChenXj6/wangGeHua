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
      <template v-slot:tree="">
          <el-select v-model="dataForm.streetCode" size="mini" clearable placeholder="请选择街道" @change="(val)=>{handleChange(1,val,true)}">
            <el-option
              v-for="item in streetNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:communityCode="">
          <el-select v-model="dataForm.communityCode" size="mini" clearable placeholder="请选择社区" @change="(val)=>{handleChange(2,val,true)}">
            <el-option
              v-for="item in communityNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:gridCode="">
          <el-select v-model="dataForm.gridCode" size="mini" clearable placeholder="请选择网格" @change="(val)=>{handleChange(3,val,true)}">
            <el-option
              v-for="item in gridNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      <template v-slot:lonAndLat="">
        <el-row :gutter="10">
          <el-col :span="12"><el-input v-model="dataForm.buildingLongitude" placeholder="请点击获取经纬度" size="small" @click="handleClick"></el-input></el-col>
          <el-col :span="12"><el-input v-model="dataForm.buildingLatitude" placeholder="请输入经纬度" size="small" @click="handleClick"></el-input></el-col>
        </el-row>
      </template>
      <template v-slot:upload="">
        <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              list-type="picture-card"
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <i class="el-icon-lx-add"></i>
            </el-upload>
      </template>
    </VForm>
    <VForm v-else-if="route.params.type === 'house'" :isDisabled="route.params.operation == 1" :form-data="houseFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:tree="">
          <el-select v-model="dataForm.streetCode" size="mini" clearable placeholder="请选择街道" @change="(val)=>{handleChange(1,val,true)}">
            <el-option
              v-for="item in streetNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:communityCode="">
          <el-select v-model="dataForm.communityCode" size="mini" clearable placeholder="请选择社区" @change="(val)=>{handleChange(2,val,true)}">
            <el-option
              v-for="item in communityNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:gridCode="">
          <el-select v-model="dataForm.gridCode" size="mini" clearable placeholder="请选择网格" @change="(val)=>{handleChange(3,val,true),handleGetBuild(1,val,true)}">
            <el-option
              v-for="item in gridNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      <template v-slot:buildingId="">
        <el-select v-model="dataForm.buildingId" size="mini" clearable placeholder="请选择楼栋" @change="(val)=>{handleGetBuild(2,val,true),handleGetHouse(1,val,true)}">
          <el-option
            v-for="item in buildingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:upload="">
        <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              list-type="picture-card"
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <i class="el-icon-lx-add"></i>
            </el-upload>
      </template>
    </VForm>
    <VForm v-else :form-data="peopleFormConfig" :isDisabled="route.params.operation == 1" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:tree="">
          <el-select v-model="dataForm.streetCode" size="mini" clearable placeholder="请选择街道" @change="(val)=>{handleChange(1,val,true)}">
            <el-option
              v-for="item in streetNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:communityCode="">
          <el-select v-model="dataForm.communityCode" size="mini" clearable placeholder="请选择社区" @change="(val)=>{handleChange(2,val,true)}">
            <el-option
              v-for="item in communityNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:gridCode="">
          <el-select v-model="dataForm.gridCode" size="mini" clearable placeholder="请选择网格" @change="(val)=>{handleChange(3,val,true),handleGetBuild(1,val,true)}">
            <el-option
              v-for="item in gridNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      <template v-slot:buildingId="">
        <el-select v-model="dataForm.buildingId" size="mini" clearable placeholder="请选择楼栋" @change="(val)=>{handleGetBuild(2,val,true),handleGetHouse(1,val,true)}">
          <el-option
            v-for="item in buildingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:house="">
        <el-select v-model="dataForm.house" size="mini" clearable placeholder="请选择房屋" @change="(val) => {handleGetHouse(2,val,true)}">
          <el-option
            v-for="item in houseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:upload="">
        <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              list-type="picture-card"
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <i class="el-icon-lx-add"></i>
            </el-upload>
      </template>
    </VForm>
    <div v-if="route.params.operation == 1 && route.params.type !== 'people'">
      <div style="margin-bottom: 20px"></div>
      <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
        <el-tab-pane v-if="route.params.type === 'build'" label="实有房屋" name="first">
          <V-table ref="table1" :table-config="houseTableConfig"/>
        </el-tab-pane>
        <el-tab-pane v-if="route.params.type !== 'people'" label="实有人口" name="second">
          <V-table ref="table2" v-if="route.params.type == 'build'" :table-config="peopleTableConfig"/>
          <V-table ref="table3" v-if="route.params.type == 'house'" :table-config="peopleByHouseTableConfig"/>
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
    <!-- // 图片预览弹窗 -->
    <el-dialog v-model="dialogVisible">
      <img
        :src="dialogImageUrl"
        alt="Preview Image"
        style="display: block; width: 90%; margin: 0 auto"
      />
    </el-dialog>
    <!-- 地图弹窗 -->
    <el-dialog
        width="37.5%"
        v-model="mapDialogVisible">
      <VMap @getLatAndLng="getLatAndLng" />
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/edit'
import { saveBuild,editBuild,getSubClass,getBuildClass,getHouseClass } from '@/api/ActualInfo/build'
import { saveHouse,editHouse } from '@/api/ActualInfo/house'
import { savePeople,editPeople } from '@/api/ActualInfo/people'

import { uploadApi } from '@/api/upload.js'
export default {
  name:'EditActual',
  mixins: [mixin],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { houseTableConfig,peopleTableConfig,peopleByHouseTableConfig,buildFormConfig,houseFormConfig,peopleFormConfig } = renderTable.call(proxy)
    const activeName = ref('first')
    const mapDialogVisible = ref(false)
    const table1 = ref(null)
    const table2 = ref(null)
    const table3 = ref(null)
    let dataForm = ref({})
    // 图片相关配置
    const fileList = ref([])
    const dialogVisible = ref(false)
    const dialogImageUrl = ref('')
    // 上传图片
    const changeFile = (file) => {
      let fileFormData = new FormData();
      let currentFile = file.raw
      fileFormData.append('file',currentFile)
      fileFormData.append('fileName',file.name)
      uploadApi(fileFormData).then(res=>{
        if(res.resCode == '000000'){
          // fileList   
          // console.log((dataForm.value.certificates == null && dataForm.value.certificatesName == null) || (String(dataForm.value.certificates).length <= 0 && String(dataForm.value.certificatesName).length <= 0))      
          if((dataForm.value.certificates == null && dataForm.value.certificatesName == null) || (String(dataForm.value.certificates).length <= 0 && String(dataForm.value.certificatesName).length <= 0)){
            dataForm.value.certificates = res.message
            dataForm.value.certificatesName = file.name
          } else {
            let str = dataForm.value.certificates + ',' + res.message
            let nameStr = dataForm.value.certificatesName + ',' + file.name
            dataForm.value.certificates = str
            dataForm.value.certificatesName = nameStr
          }
          // console.log(dataForm.value.certificates,'///')
          proxy.$message.success('图片上传成功')
        } else {
          proxy.$message.success('图片上传失败')
        }
      })
    }
    // 删除图片
    const handleRemove = (val) => {
      if(fileList.value.length == 1){
        fileList.value = []
        dataForm.value.certificates = ''
        dataForm.value.certificatesName = ''
      }else{
        let certificatesArr = dataForm.value.certificates.split(',')
        let certificatesNameArr = dataForm.value.certificatesName.split(',')
        certificatesArr.forEach((v,ind) => {
          if(`${import.meta.env.VITE_IMG_BASE_API }${v}` == val.url && certificatesNameArr[ind] == val.name){
            certificatesArr.splice(ind,1)
            certificatesNameArr.splice(ind,1)
            dataForm.value.certificates = certificatesArr.join(',')
            dataForm.value.certificatesName = certificatesNameArr.join(',')
          }
        })
      }
    }
    // 图片回显
    const resetFileList = () => {
      if(dataForm.value.certificates == null ||  dataForm.value.certificates.length == 0 ) return
      let result = dataForm.value.certificates.indexOf(',')
      if(result != '-1'){
        let certificatesArr = dataForm.value.certificates.split(',')
        let certificatesNameArr = dataForm.value.certificatesName.split(',')
        certificatesArr.forEach((v,i) => {
          let obj = {
            name:certificatesNameArr[i],
            url:`${import.meta.env.VITE_IMG_BASE_API }${v}`
          }
          fileList.value.push(obj)
        })
      }else{
        let obj = {
          name:dataForm.value.certificatesName,
          url:`${import.meta.env.VITE_IMG_BASE_API }${dataForm.value.certificates}`
        }
        fileList.value.push(obj)
      }
    }
    // 图片预览
    const handlePreview = ({url}) => {
      dialogVisible.value = true
      dialogImageUrl.value = url
    }

    // 街道下拉框
    let timer = ref(new Date().getTime())
    const streetNameOptions = ref([
      { label:'工人新村北村街道',value:'370105004' },
      { label:'工人新村南村街道',value:'370105005' },
    ])
    const communityNameOptions = ref([])
    const gridNameOptions = ref([])
    const buildingOptions = ref([])
    const houseOptions = ref([])
    // flag： 1 组织结构的数据处理、2 楼栋信息数据格式处理、 3 房屋信息数据格式处理
    const resetFormat = (data,options,flag = 1) => {
      if(data.length == 0) return options.value = []
      let arr = []
      data.forEach(v=>{
        let obj = {}
        if(flag == 1){
          obj.label = v.officeName
          obj.value = v.officeCode
        } else if (flag == 2) {
          obj.label = `${v.villageName}-${v.buildingNumber}`
          obj.value = v.id
        }else if(flag == 3) {
          obj.label = `${v.unitNumber}-${v.houseNumber}`
          obj.value = v.id
        }        
        arr.push(obj)
      })
      options.value = arr
    }
    // trigMode 用来区分是编辑初始化还是自己手动触发的
    const handleChange = (type,parentCode,trigMode = false) => {
      if(type == 1){
        (!dataForm.value.streetName || trigMode) && (dataForm.value.streetName = streetNameOptions.value.filter((obj)=>obj.value == parentCode)[0].label)
        subClass(1,parentCode,trigMode)
      } else if( type == 2) {
        (!dataForm.value.communityName || trigMode) && (dataForm.value.communityName = communityNameOptions.value.filter((obj)=>obj.value == parentCode)[0].label)
        subClass(2,parentCode,trigMode)
      } else {
        (!dataForm.value.gridName || trigMode) && (dataForm.value.gridName = gridNameOptions.value.filter((obj)=>obj.value == parentCode)[0].label)
        subClass(3,parentCode,trigMode)
      }
    }
    // 网格下拉框change事件 触发获取楼栋信息
    const handleGetBuild = (type,parentCode,trigMode = false) => {
      if(type == 1){
        buildClss(type,parentCode,trigMode)
      } else {
      }      
    }
    // 街道获取社区 、 社区获取网格
    const subClass = (type,parentCode,trigMode) => {
      getSubClass({parentCode}).then(res=>{
        if(res.resCode === "000000"){
          if(type == 1){
            if(trigMode){
              dataForm.value.communityName = ''
              dataForm.value.communityCode = ''
              dataForm.value.gridName = ''
              dataForm.value.gridCode = ''
              communityNameOptions.value = []
              gridNameOptions.value = []
              if(route.params.type == 'house'){
                dataForm.value.buildingId = ''
                buildingOptions.value = []
              }else if(route.params.type == 'people') {
                dataForm.value.buildingId = ''
                buildingOptions.value = []
                dataForm.value.house = ''
                houseOptions.value = []
              }
            }            
            resetFormat(res.data,communityNameOptions)
          } else if(type == 2) {
            if(trigMode){
              dataForm.value.gridName = ''
              dataForm.value.gridCode = ''
              gridNameOptions.value = [] 
              if(route.params.type == 'house'){
                dataForm.value.buildingId = ''
                buildingOptions.value = []
              } else if(route.params.type == 'people') {
                dataForm.value.buildingId = ''
                buildingOptions.value = []
                dataForm.value.house = ''
                houseOptions.value = []
              }
            }            
            resetFormat(res.data,gridNameOptions)
          } else if(type == 3) {
            if (trigMode){
              if(route.params.type == 'house'){
                dataForm.value.buildingId = ''
                buildingOptions.value = []
              }else if(route.params.type == 'people') {
                dataForm.value.buildingId = ''
                buildingOptions.value = []
                dataForm.value.house = ''
                houseOptions.value = []
              }
            }
          }
        }
      })
    }
    // 网格获取楼栋
    const buildClss = (type,gridCode,trigMode) => {
      getBuildClass({gridCode}).then(res=>{
        if(res.resCode == '000000'){
          if(trigMode && type == 1){
            dataForm.value.buildingId = ''
            buildingOptions.value = []
          }
          resetFormat(res.data,buildingOptions,2)
        }
      })
    }
    const houseClass = (type,buildingId,trigMode) => {
      getHouseClass({buildingId}).then(res=>{
        if(res.resCode == '000000'){
          if(trigMode && type == 1){
            dataForm.value.house = ''
            houseOptions.value = []
          }
          resetFormat(res.data,houseOptions,3)
        }
      })
    }
    // 楼栋获取房屋
    const handleGetHouse = (type,buildingId, trigMode = false) => {
      if(type == 1){
        houseClass(type,buildingId,trigMode)
      } else {
      }
    }
    // 提交
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.params.operation == 2) {
          if(route.params.type == 'build'){
            editBuild(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else if (route.params.type == 'house') {
            delete dataForm.value.buildingNumber
            delete dataForm.value.villageName
            delete dataForm.value.unitNumber
            editHouse(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else {
            delete dataForm.value.buildingNumber
            delete dataForm.value.villageName
            delete dataForm.value.unitNumber
            delete dataForm.value.houseNumber
            editPeople(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          }
        } else {
          dataForm.value.countyCode = '370105'
          dataForm.value.countyName = '天桥区'
          if(route.params.type == 'build'){
            saveBuild(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else if (route.params.type == 'house') {
            saveHouse(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
          } else {
            savePeople(dataForm.value).then(res=>{
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

    // 查看操作下的表格
    // 表格相關操作
    const handleQueryTable = (type) => {
      if(type == 1){
        table1.value.getTableData({id:dataForm.value.id}, (res) => {
          const data = res || []
          houseTableConfig.data = data
        })
      } else if(type == 2) {
        table2.value.getTableData({id:dataForm.value.id}, (res) => {
          const data = res || []
          peopleTableConfig.data = data
        })
      } else{
        table3.value.getTableData({id:dataForm.value.id}, (res) => {
          const data = res || []
          peopleByHouseTableConfig.data = data
        })
      }
      
    }

    // 获取经纬度
    const handleClick = () => {
      mapDialogVisible.value = true
    }
    const getLatAndLng = ({lat,lng}) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      dataForm.value.buildingLongitude = lng
      dataForm.value.buildingLatitude = lat
      mapDialogVisible.value = false
    }
    //
    onBeforeMount(()=>{
      timer.value = new Date().getTime()
    })
    if(route.params.operation != 3){
      dataForm.value = JSON.parse(decodeURIComponent(route.params.data))
      if(route.params.type == 'people'){
        handleChange(1,dataForm.value.streetCode)
        handleChange(2,dataForm.value.communityCode)
        handleChange(3)
        handleGetBuild(1,dataForm.value.gridCode)
        handleGetHouse(1,dataForm.value.buildingId)
      } else if (route.params.type == 'house') {
        handleChange(1,dataForm.value.streetCode)
        handleChange(2,dataForm.value.communityCode)
        handleChange(3)
        handleGetBuild(1,dataForm.value.gridCode)
      } else {
        handleChange(1,dataForm.value.streetCode)
        handleChange(2,dataForm.value.communityCode)
        handleChange(3)
      }
    }
    route.params.type == 'house' && (activeName.value = 'second')
    // console.log(dataForm.value)
    onMounted(() => {
      route.params.operation === 3 &&( dataForm.value = {})
      if(route.params.operation == 1 && route.params.type == 'build'){
        handleQueryTable(1)
        handleQueryTable(2)
      } else if(route.params.operation == 1 && route.params.type == 'house'){
        handleQueryTable(3)
      }
      if(route.params.operation == 1 || route.params.operation == 2){
        resetFileList()
      }
    })
    return {
      dataForm,
      table1,
      table2,
      table3,
      route,
      handleBack,
      handleSubmit,
      houseTableConfig,
      peopleTableConfig,
      peopleByHouseTableConfig,
      buildFormConfig,
      houseFormConfig,
      peopleFormConfig,
      activeName,
      formHandle,
      //
      streetNameOptions,
      communityNameOptions,
      gridNameOptions,
      handleChange,
      //
      handleGetBuild,
      buildingOptions,
      //
      handleGetHouse,
      houseOptions,
      // 获取经纬度
      mapDialogVisible,
      handleClick,
      getLatAndLng,
      // 上传图片
      fileList,
      changeFile,
      handleRemove,
      dialogVisible,
      dialogImageUrl,
      handlePreview,
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
