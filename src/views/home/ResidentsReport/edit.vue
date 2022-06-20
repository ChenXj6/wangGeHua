<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{ route.query.operation == 1 ? '查看' : (route.query.operation == 2 ? '编辑' : '添加') }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <VForm :isDisabled="route.query.operation == 1" :form-data="editFormConfig" :form-model="formData" :form-handle="route.query.operation != 1 ? formHandle : {}">
        <template v-slot:tree="">
          <el-select v-model="formData.streetCode" size="mini" clearable placeholder="请选择街道" @change="(val)=>{handleChange(1,val,true)}">
            <el-option
              v-for="item in streetNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:communityCode="">
          <el-select v-model="formData.communityCode" size="mini" clearable placeholder="请选择社区" @change="(val)=>{handleChange(2,val,true)}">
            <el-option
              v-for="item in communityNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:gridCode="">
          <el-select v-model="formData.gridCode" size="mini" clearable placeholder="请选择网格" @change="(val)=>{handleChange(3,val,true)}">
            <el-option
              v-for="item in gridNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      <template v-slot:longAndLat="">
        <el-row :gutter="10">
              <el-col :span="12">
                <el-input
                  v-model="formData.eventLong"
                  placeholder="请输入"
                  size="small"
                  clearable
                  @click="handleClick"
                />
              </el-col>
              <el-col :span="12">
                <el-input
                  v-model="formData.eventLat"
                  placeholder="请输入"
                  size="small"
                  clearable
                  @click="handleClick"
                />
              </el-col>
            </el-row>
      </template>
      <template v-slot:upload="">
        <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture-card"
            >
              <i class="el-icon-lx-add"></i>
            </el-upload>
      </template>
    </VForm>
    <div v-if="route.query.operation == 1">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 处置记录
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="date" label="发起人"> </el-table-column>
        <el-table-column prop="date" label="发起意见"> </el-table-column>
        <el-table-column prop="date" label="发起时间"> </el-table-column>
        <el-table-column prop="date" label="发起照片"> </el-table-column>
        <el-table-column prop="date" label="处置人"> </el-table-column>
        <el-table-column prop="date" label="处理意见" width="280px">
        </el-table-column>
        <el-table-column prop="date" label="处置时间"> </el-table-column>
        <el-table-column prop="date" label="处置照片"> </el-table-column>
        <el-table-column prop="name" label="处置状态"> </el-table-column>
      </el-table>
    </div>
    <el-row v-if="route.query.operation == 1">
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
    <!-- 地图弹窗 -->
    <el-dialog
        width="37.5%"
        v-model="mapDialogVisible">
      <VMap @getLatAndLng="getLatAndLng" :lng="formData.eventLong" :lat="formData.eventLat" />
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'
import { listAssign,defaultObject } from '@/utils/util'
import {renderTable} from './common/edit'
import { editRecord } from '@/api/ResidentsReport/index'
import { getSubClass } from '@/api/ActualInfo/build'
export default {
  mixins: [mixin],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const {
      proxy,
    } = getCurrentInstance()
    const { editFormConfig } = renderTable.call(proxy)
    const fileList = ref([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])
    const streetNameOptions = ref([
      { label:'工人新村北村街道',value:'370105004' },
      { label:'工人新村南村街道',value:'370105005' },
    ])
    const tableData = ref([])
    const communityNameOptions = ref([])
    const gridNameOptions = ref([])
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
        (!formData.value.streetName || trigMode) && (formData.value.streetName = streetNameOptions.value.filter((obj)=>obj.value == parentCode)[0].label)
        subClass(1,parentCode,trigMode)
      } else if( type == 2) {
        (!formData.value.communityName || trigMode) && (formData.value.communityName = communityNameOptions.value.filter((obj)=>obj.value == parentCode)[0].label)
        subClass(2,parentCode,trigMode)
      } else {
        (!formData.value.gridName || trigMode) && (formData.value.gridName = gridNameOptions.value.filter((obj)=>obj.value == parentCode)[0].label)
        subClass(3,parentCode,trigMode)
      }
    }
        // 街道获取社区 、 社区获取网格
    const subClass = (type,parentCode,trigMode) => {
      getSubClass({parentCode}).then(res=>{
        if(res.resCode === "000000"){
          if(type == 1){
            if(trigMode){
              formData.value.communityName = ''
              formData.value.communityCode = ''
              formData.value.gridName = ''
              formData.value.gridCode = ''
              communityNameOptions.value = []
              gridNameOptions.value = []
            }            
            resetFormat(res.data,communityNameOptions)
          } else if(type == 2) {
            if(trigMode){
              formData.value.gridName = ''
              formData.value.gridCode = ''
              gridNameOptions.value = [] 
            }            
            resetFormat(res.data,gridNameOptions)
          } else if(type == 3) {
          }
        }
      })
    }
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    let formData = ref({
      streetCode:'',
      streetName:'',
      gridName:'',
      gridCode:'',
      communityCode:'',
      communityName:'',
      eventName:'',
      eventContent:'',
      happenTime:'',
      eventLong:'',
      eventLat:'',
      mainPeopleFirstType:'',
      mainPeopleSecondType:'',
      eventScope:'',
      aboutPeopleNum:'',
      mainPeopleName:'',
      mainPeopleCertificateNum:'',
      mainPeopleAddress:'',
      eventFirstType:'',
    })
    // upload
    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }
    // 
    const handleSubmit = async (formRef) => {
      await formRef.validate((vaild) => {
        if (vaild) {
          editRecord(formData.value).then(res=>{
            if(res.resCode == '000000'){
              proxy.$message.success('编辑成功')
              delCurrentTag(route)
            }
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

    // 获取经纬度
    const mapDialogVisible = ref(false)
    const handleClick = () => {
      mapDialogVisible.value = true
    }
    const getLatAndLng = ({lat,lng}) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      formData.value.eventLong = lng
      formData.value.eventLat = lat
      mapDialogVisible.value = false
    }

    // formData = JSON.parse(decodeURIComponent(route.query.data))
    route.query.operation != 3 && listAssign(formData.value,JSON.parse(decodeURIComponent(route.query.data)))
    console.log(formData.value,'...')
    onMounted(() => {
      if(route.query.operation != 3){
        handleChange(1,formData.value.streetCode)
        handleChange(2,formData.value.communityCode)
        handleChange(3)
      }
      
    })
    return {
      formData,
      tableData,
      route,
      handleBack,
      fileList,
      dialogVisible,
      dialogImageUrl,
      handlePreview,
      editFormConfig,
      formHandle,
      //
      streetNameOptions,
      communityNameOptions,
      gridNameOptions,
      handleChange,
      // 获取经纬度
      mapDialogVisible,
      handleClick,
      getLatAndLng,

    }
  },
}
</script>
<style lang="scss" scoped>
.btn-box {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
