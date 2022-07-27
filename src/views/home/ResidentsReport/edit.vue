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
    <VForm :isDisabled="route.query.operation == 1 || route.query.operation == 4" :form-data="editFormConfig" :form-model="formData" :form-handle="route.query.operation != 1 && route.query.operation != 4 ? formHandle : {}">
        <template v-slot:tree>
          <el-select v-model="formData.streetCode" size="mini" clearable placeholder="请选择街道" @change="(val)=>{handleChange(1,val,true)}">
            <el-option
              v-for="item in streetNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:communityCode>
          <el-select v-model="formData.communityCode" size="mini" clearable placeholder="请选择社区" @change="(val)=>{handleChange(2,val,true)}">
            <el-option
              v-for="item in communityNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:gridCode>
          <el-select v-model="formData.gridCode" size="mini" clearable placeholder="请选择网格" @change="(val)=>{handleChange(3,val,true)}">
            <el-option
              v-for="item in gridNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-slot:eventLong="">
          <el-input
                  v-model="formData.eventLong"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable                  
                  @click="handleClick"
                />
        </template>
      <template v-slot:eventLat="">
                <el-input
                  v-model="formData.eventLat"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable
                  @click="handleClick"
                />
      </template>
      <template v-slot:upload>
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
    <div v-if="route.query.operation == 1 || route.query.operation == 4">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 处置记录
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-table :data="tableData" style="width: 100%" size="mini">
        <el-table-column prop="createByName" label="发起人" width="120" />
        <el-table-column prop="launchRemark" label="发起意见" />
        <el-table-column prop="createDate" label="发起时间" width="150">
          <template #default="scope">
            {{ formatterDate(scope.row.createDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="发起图片" width="150" />
        <el-table-column prop="dealByName" label="处置人" width="120" />
        <el-table-column prop="dealRemark" label="处置意见" />
        <el-table-column prop="updateDate" label="处置时间" width="150">
          <template #default="scope">
            {{ formatterDate(scope.row.updateDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="处置图片" width="150" />
        <el-table-column prop="dealStatus" label="处置状态" width="90">
          <template #default="scope">
            {{eventSourceOptions.filter(v=>v.value == scope.row.dealStatus)[0]?.label}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="route.query.operation == 4">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 事件处置
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-form ref="recordFormRef" :model="dataForm" :rules="rules" label-width="150px">
        <el-form-item label="处置方式" prop="dealStatus">
          <el-select v-model="dataForm.dealStatus" size="mini" placeholder="请选择处置方式">
            <el-option
              v-for="item in dataSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流转人" v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3" prop="dealBy">
          <el-input v-model="dataForm.launchRemark" size="mini" placeholder="" @click="handleChangeLaunch"></el-input>
        </el-form-item>
        <el-form-item label="处理时限" v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3">
          <el-date-picker
            v-model="dataForm.updateDate"
            type="datetime"
            size="mini"
            placeholder="请选择时间"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item label="处理意见" prop="dealRemark">
          <el-input v-model="dataForm.dealRemark" type="textarea" size="mini" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      
      
    </div>
    <el-row v-if="route.query.operation == 1 || route.query.operation == 4">
      <div class="btn-box">
        <el-button
          v-if="route.query.operation == 4"
          type="primary"
          @click="handleRecord(recordFormRef)"
          size="small"
          icon="el-icon-lx-roundcheck"
          >确定</el-button
        >
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
        title="地图"
        width="37%"
        v-model="mapDialogVisible">
      <VMap @getLatAndLng="getLatAndLng" :lng="formData.eventLong" :lat="formData.eventLat" />
    </el-dialog>
    <!-- 流转人弹窗 -->
    <el-dialog
      title="选择流转人"
      v-model="userDialogVisible"
      width="80%">
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <V-table
              ref="table"
              :table-config="userTableConfig"
              @select-change="(val)=>(multipleSelection = val)"
            >
            </V-table>
          </el-col>
          <el-col :span="6" style="border:1px solid #ddd">
            <div>当前已选择{{ multipleSelection.length }}项：</div>
            <div class="checkSpan" v-for="(item) in multipleSelection" :key="item.id">{{ item.operatorName }}</div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button size="mini" type="primary" @click="handleSubmitUser">确定</el-button>
        <el-button size="mini" type="primary" @click="userDialogVisible = false">返回</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'
import { listAssign,defaultObject,formatterDate,resetFormat as resetFormatStatus } from '@/utils/util'
import {renderTable} from './common/edit'
import { editRecord,editDetail,addDetail,queryByEventId,eventProcessing } from '@/api/ResidentsReport/index'
import { getSubClass } from '@/api/ActualInfo/build'
import { searchDict } from '@/api/sys/dict'
import { uploadApi } from '@/api/upload.js'
import { useStore } from 'vuex'
export default {
  mixins: [mixin],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const store = useStore();
    const {
      proxy,
    } = getCurrentInstance()
    const { editFormConfig,userTableConfig } = renderTable.call(proxy)
    let formData = ref({
      id:'',
      certificates:'',
      cityCode:'370105',
      cityName:'天桥区',
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
      eventPlace:'',
      mainPeopleFirstType:'',
      mainPeopleSecondType:'',
      eventScope:'',
      aboutPeopleNum:'',
      mainPeopleName:'',
      mainPeopleCertificateNum:'',
      mainPeopleAddress:'',
      eventFirstType:'',
      createBy:JSON.parse(sessionStorage.getItem('user')).user.operatorId,
      filePath:'',
      fileName:'',
    })
    const streetNameOptions = ref([
      { label:'工人新村北村街道',value:'370105004' },
      { label:'工人新村南村街道',value:'370105005' },
    ])
    const tableData = ref([])
    const userDialogVisible = ref(false) // 流转人弹窗
    const multipleSelection = ref([]) // 选中数据集合
    const table  = ref(null)
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

    const dataForm = ref({}) // 处置表单
    const recordFormRef = ref(null) // 处置表单ref
    const rules = reactive({
      dealStatus:[
        {required: true, message:'请选择处置方式', trigger: 'blur'}
      ],
      dealBy:[
        {required: true, message:'请选择流转人', trigger: ['change','blur']}
      ],
      dealRemark:[
        {required: true, message:'请输入处理意见', trigger: 'blur'}
      ],
    })
    const getRecordByEventId = () => {
      queryByEventId({eventId:formData.value.id}).then(res=>{
        if(res.resCode == '000000'){
          tableData.value = res.data
        }
      })
    }
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
          if((formData.value.filePath == null && formData.value.fileName == null) || (String(formData.value.filePath).length <= 0 && String(formData.value.fileName).length <= 0)){
            formData.value.filePath = res.message
            formData.value.fileName = file.name
          } else {
            let str = formData.value.filePath + ',' + res.message
            let nameStr = formData.value.fileName + ',' + file.name
            formData.value.filePath = str
            formData.value.fileName = nameStr
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
        formData.value.filePath = ''
        formData.value.fileName = ''
      }else{
        let certificatesArr = formData.value.filePath.split(',')
        let certificatesNameArr = formData.value.fileName.split(',')
        certificatesArr.forEach((v,ind) => {
          if(`${import.meta.env.VITE_IMG_BASE_API }${v}` == val.url && certificatesNameArr[ind] == val.name){
            certificatesArr.splice(ind,1)
            certificatesNameArr.splice(ind,1)
            formData.value.filePath = certificatesArr.join(',')
            formData.value.fileName = certificatesNameArr.join(',')
          }
        })
      }
    }
    // 图片回显
    const resetFileList = () => {
      if(formData.value.filePath == null ||  formData.value.filePath.length == 0 ) return
      let result = formData.value.filePath.indexOf(',')
      // console.log(result,'////')
      if(result != '-1'){
        let certificatesArr = formData.value.filePath.split(',')
        let certificatesNameArr = formData.value.fileName.split(',')
        certificatesArr.forEach((v,i) => {
          let obj = {
            name:certificatesNameArr[i],
            url:`${import.meta.env.VITE_IMG_BASE_API }${v}`
          }
          fileList.value.push(obj)
        })
      }else{
        let obj = {
          name:formData.value.fileName,
          url:`${import.meta.env.VITE_IMG_BASE_API }${formData.value.filePath}`
        }
        fileList.value.push(obj)
      }
    }
    // 图片预览
    const handlePreview = ({url}) => {
      dialogVisible.value = true
      dialogImageUrl.value = url
    }
    // 
    const handleSubmit = async (formRef) => {
      await formRef.validate((vaild) => {
        if (vaild) {
          if(route.query.type == 'coll'){
            if(route.query.operation == 2){
              editDetail(formData.value).then(res=>{
                if(res.resCode == '000000'){
                  proxy.$message.success('编辑成功')
                  delCurrentTag(route)
                }
              })
            } else if (route.query.operation == 3 ){
              addDetail(formData.value).then(res=>{
                if(res.resCode == '000000'){
                  proxy.$message.success('添加成功')
                  delCurrentTag(route)
                }
              })
            }
          } else {
            if(route.query.operation == 2){
              editRecord(formData.value).then(res=>{
                if(res.resCode == '000000'){
                  proxy.$message.success('编辑成功')
                  delCurrentTag(route)
                }
              })
            } else if (route.query.operation == 3 ){
              addRecord(formData.value).then(res=>{
                if(res.resCode == '000000'){
                  proxy.$message.success('添加成功')
                  delCurrentTag(route)
                }
              })
            }
          }          
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
    // 处理状态
    const dataSourceOptions = ref([])
    const eventSourceOptions = ref([])
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormatStatus(res.data)
        }else{
          data.value = []
        }
      })
    }

    // 处置
    const handleChangeLaunch = () => {      
      userDialogVisible.value = true
      multipleSelection.value = []
      dataForm.value.launchRemark = ''
      setTimeout(()=>handleQueryUserTable(table),0)  
    }
    const handleQueryUserTable = (table) => {
      table.value.getTableData({}, (res) => {
        const data = res.list || []
        userTableConfig.data = data
      })
    }
    const handleSubmitUser = () => {
      if(multipleSelection.value.length <= 0){
        proxy.$message.warning({message:'请至少选择一位流转人',customClass:'messageIndex'})
        return
      }
      userDialogVisible.value = false
      let str = ''
      let idStr = ''
      multipleSelection.value.forEach(v=>{
        str = str + v.operatorName + ','
        idStr = idStr + v.operatorId + ','
      })
      dataForm.value.launchRemark = str.substr(0,str.length-1)
      dataForm.value.dealBy = idStr.substr(0,idStr.length-1)
    }
    const handleRecord = async (formRef) => {
      dataForm.value.id = formData.value.id
      dataForm.value.eventId = formData.value.id
      dataForm.value.createBy = JSON.parse(sessionStorage.getItem('user')).user.operatorId,
      delete dataForm.value.launchRemark
      await formRef.validate((vaild) => {
        if(vaild){
          eventProcessing(dataForm.value).then(res=>{
            if(res.resCode == '000000'){
              proxy.$message.success('处置成功')
              store.dispatch("delEvent", dataForm.value);
              handleBack()
            }
          })
        }else{
          return
        }
      })
    }

    // formData = JSON.parse(decodeURIComponent(route.query.data))
    route.query.operation != 3 && listAssign(formData.value,JSON.parse(decodeURIComponent(route.query.data)))
    // console.log(formData.value,'...')
    onBeforeMount(()=>{
      if(route.query.operation == 1 || route.query.operation == 4){
        getRecordByEventId()
      }
      getOptionsByCode(1026,dataSourceOptions);
      getOptionsByCode(1029,eventSourceOptions);
    })
    resetFileList()
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
      dataForm,
      formatterDate,
      dataSourceOptions,
      eventSourceOptions,
      // 处置
      userDialogVisible,
      handleChangeLaunch,
      userTableConfig,
      multipleSelection,
      handleSubmitUser,
      table,
      handleRecord,
      rules,
      recordFormRef,
      // 
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
.btn-box {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
.checkSpan{
  display: inline-block;
  padding: 2px 5px 3px;
  background: #e3edf5;
  color: #4190bd;
  border: 1px solid #acc2cf;
  border-radius: 2px;
  margin-right: 5px;
  margin-bottom: 5px;
}

</style>
<style>
.messageIndex{
  z-index: 9999 !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100% !important;
}
</style>