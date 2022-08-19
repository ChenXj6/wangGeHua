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
    <VForm v-if="route.query.type == 'hidden'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="hiddenFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.gridCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.gridName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
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
    <VForm v-else-if="route.query.type == 'task'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="taskFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.gridCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.gridName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:manageProper="">
        <el-input v-model="dataForm.investigePer" placeholder="点击获取人员" size="small" @click="handleChangeLaunch"></el-input>
      </template>
    </VForm>
    <VForm v-else-if="route.query.type == 'content'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="contentFormConfig" :form-model="dataForm">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.gridCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.gridName" disabled size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
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
          <i class="add"></i>
        </el-upload>
      </template>
    </VForm>
    <div v-if="route.query.care">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="cascades"></i> 排查记录
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column prop="originator" label="发起人" />
        <el-table-column prop="action" label="动作" />
        <el-table-column prop="processeTime" label="处理时间" width="200">
          <template #default="scope">
            {{ formatterDate(scope.row.processeTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="isDanger" label="是否存在隐患" >
          <template #default="scope">
            {{isDangerOptions.filter(v=>v.value == scope.row.isDanger)[0]?.label}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="上传图片">
          <template #default="scope">
            <img v-if="!isNull(scope.row.img) && String(scope.row.img).indexOf(',') <= 0" style="width:100px;height:100px" :src="`${IMGprefix}${scope.row.img}`" alt="">
            <template v-else-if="!isNull(scope.row.img)" v-for="(item) in scope.row.img.split(',')" :key="item">
              <img style="width:100px;height:100px" :src="`${IMGprefix}${item}`" alt="">
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" />
        
      </el-table>
    </div>
    <el-row v-if="route.query.operation == 1 && route.query.type != 'content'">
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
    <el-row v-else-if="route.query.type == 'content'">
      <div class="btn-box">
        <el-button
          v-if="route.query.operation != 1"
          type="primary"
          size="small"
          @click="handleClickRecord"
          icon="CircleCheck"
          >处理</el-button
        >
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
   <!-- 流转人弹窗 -->
    <el-dialog
      title="选择流转人"
      v-model="userDialogVisible"
      width="60%">
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <V-table
              ref="tableRef"
              :table-config="userTableConfig"
              @rowClick="handleRowClick"
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
        <el-button size="small" type="primary" @click="handleSubmitUser">确定</el-button>
        <el-button size="small" type="primary" @click="userDialogVisible = false">返回</el-button>
      </template>
    </el-dialog>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'
import { formatterDate,resetFormat as resetFormatStatus,isNull } from '@/utils/util'
import { renderTable } from './common/EditHiddenDanger'
import { getOrganList } from '@/api/sys/organ'
import { saveHiddenDanger,updateHiddenDanger } from '@/api/UrgentNeed/hiddenDanger'
import { saveHiddenDangerTask,updateHiddenDangerTask } from '@/api/UrgentNeed/hiddenDangerTask'
import { updateHiddenDangerContent,getHiddenDangerContentRecord } from '@/api/UrgentNeed/hiddenDangerContent'
import { uploadApi } from '@/api/upload'
import { searchDict } from '@/api/sys/dict'
// 
export default {
  name:'Edit',
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { hiddenFormConfig,userTableConfig,taskFormConfig,contentFormConfig} = renderTable.call(proxy)
    const dataForm = ref({
      gridCode:'',
      gridName:'',
    })
    const IMGprefix = ref(import.meta.env.VITE_IMG_BASE_API)
    // 提交
    const handleSave = () => {
      delete dataForm.value.treeNames
      delete dataForm.value.officeCode
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
          delete dataForm.value.treeNames
          if(route.query.type == 'hidden'){
            updateHiddenDanger(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }else if(route.query.type == 'task'){
            updateHiddenDangerTask(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }        
        } else {
          if(route.query.type == 'hidden'){
            saveHiddenDanger(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
            })
          }else if(route.query.type == 'task'){
            saveHiddenDangerTask(dataForm.value).then(res=>{
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
      dataForm.value.gridCode = officeCode
      dataForm.value.gridName = officeName
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
    // 处置
    const tableRef = ref(null)
    const userDialogVisible = ref(false)
    const multipleSelection = ref([])
    const handleChangeLaunch = () => {      
      userDialogVisible.value = true
      multipleSelection.value = []
      dataForm.value.investigePer = ''
      dataForm.value.investigePerCode = ''
      setTimeout(()=>handleQueryUserTable(),0)  
    }
    const handleRowClick = (row) => {
      multipleSelection.value.length = 0
      multipleSelection.value.push(row)
    }
    const handleQueryUserTable = () => {
      tableRef.value.getTableData({}, (res) => {
        const data = res.list || []
        userTableConfig.data = data
      })
    }
    const handleSubmitUser = () => {
      if(multipleSelection.value.length <= 0){
        proxy.$message.warning({message:'请至少选择一位流转人',customClass:'messageIndex'})
        return
      }      
      dataForm.value.investigePer = multipleSelection.value[0].operatorName
      dataForm.value.investigePerCode = multipleSelection.value[0].operatorId
      userDialogVisible.value = false
    }
    const tableData = ref([])
    const getRecordByEventId = () => {
      getHiddenDangerContentRecord({id:dataForm.value.id}).then(res=>{
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
          if((dataForm.value.img == null) || (String(dataForm.value.img).length <= 0)){
            dataForm.value.img = res.message
          } else {
            let str = dataForm.value.img + ',' + res.message
            dataForm.value.img = str
          }
          // console.log(dataForm.value.img,'///')
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
        dataForm.value.img = ''
      }else{
        let certificatesArr = dataForm.value.img.split(',')
        certificatesArr.forEach((v,ind) => {
          if(`${import.meta.env.VITE_IMG_BASE_API }${v}` == val.url && certificatesNameArr[ind] == val.name){
            certificatesArr.splice(ind,1)
            certificatesNameArr.splice(ind,1)
            dataForm.value.img = certificatesArr.join(',')
          }
        })
      }
    }
    // 图片回显
    const resetFileList = () => {
      if(dataForm.value.img == null) return
      let result = dataForm.value.img.indexOf(',')
      if(result != '-1'){
        let certificatesArr = dataForm.value.img.split(',')
        certificatesArr.forEach((v,i) => {
          let obj = {
            url:`${import.meta.env.VITE_IMG_BASE_API }${v}`
          }
          fileList.value.push(obj)
        })
      }else{
        let obj = {
          url:`${import.meta.env.VITE_IMG_BASE_API }${dataForm.value.img}`
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
    const handleClickRecord = () => {
      delete dataForm.value.treeNames
      delete dataForm.value.manageProper
      delete dataForm.value.managePhone
      delete dataForm.value.dangerType
      delete dataForm.value.address
      delete dataForm.value.synopsis
      delete dataForm.value.safeProper
      delete dataForm.value.safePhone
      delete dataForm.value.legalProper
      delete dataForm.value.legalPhone
      delete dataForm.value.remark
      delete dataForm.value.longitude
      delete dataForm.value.latitude
      updateHiddenDangerContent(dataForm.value).then(res=>{
        if(res.resCode == '000000'){
          proxy.$message.success('隐患排查处理成功！')
          delCurrentTag(route)
        }
      })
    }
    const isDangerOptions = ref([])
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormatStatus(res.data)
        }else{
          data.value = []
        }
      })
    }

    // 初始化数据
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)))
    route.query.type == 'content' && (getRecordByEventId())
    // console.log(dataForm.value)
    onBeforeMount(()=>{
      if(route.query.type == 'content' && route.query.operation != 1){
        let arr = ['upload','remarks','isDanger']
        contentFormConfig.formItems.forEach((v)=>{
          arr.forEach(val=>{
            if(v.prop == val){
              v.disabled = false
              v.isHide && (v.isHide = '')
            }
          })
        })
        dataForm.value.processeTime = proxy.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        
        resetFileList()
      }
      if(route.query.type == 'content' && route.query.care == ''){
        contentFormConfig.formItems.forEach((v)=>{
          if(v.prop == 'processeTime'){
            v.isHide && (v.isHide = '')
          }
        })
        dataForm.value.processeTime = proxy.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
      if(route.query.type == 'content' && route.query.care == 'rectification'){
        contentFormConfig.formItems.forEach((v)=>{
          if(v.prop == 'rectificationTime'){
            v.isHide && (v.isHide = '')
          }
        })
        dataForm.value.rectificationTime = proxy.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
      if(route.query.type == 'content' && route.query.care == 'review'){
        contentFormConfig.formItems.forEach((v)=>{
          if(v.prop == 'reviewTime'){
            v.isHide && (v.isHide = '')
          }
        })
        dataForm.value.reviewTime = proxy.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    onMounted(() => {
      route.query.operation === 3 &&( dataForm.value = {})
      getOptionsByCode(1006,isDangerOptions)
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      hiddenFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      handleClick,
      mapDialogVisible,
      getLatAndLng,
      handleChangeLaunch,
      tableRef,
      taskFormConfig,
      userDialogVisible,
      userTableConfig,
      multipleSelection,
      handleRowClick,
      handleSubmitUser,
      tableData,
      contentFormConfig,
      // 上传图片
      fileList,
      changeFile,
      handleRemove,
      dialogVisible,
      dialogImageUrl,
      handlePreview,
      IMGprefix,
      //
      handleClickRecord,
      formatterDate,
      isDangerOptions,
      isNull,
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
.checkSpan{
  display: inline-block;
  padding: 2px 5px 3px;
  height: 20px;
  line-height: 20px;
  background: #e3edf5;
  color: #4190bd;
  border: 1px solid #acc2cf;
  border-radius: 2px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.messageIndex{
  z-index: 9999 !important;
}
</style>
