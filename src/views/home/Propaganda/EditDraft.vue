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
    <VForm v-if="route.params.type === 'draft'" :key="timer" :isDisabled="route.params.operation == 1" :form-data="InfoFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
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
              <i class="el-icon-lx-add"></i>
            </el-upload>
      </template>
      <template v-slot:remarks="">
        <div class="mgb20" ref='editor'></div>
      </template>
    </VForm>
    <VForm v-else :key="timer" :isDisabled="route.params.operation == 1" :form-data="MediaFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
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
              <i class="el-icon-lx-add"></i>
            </el-upload>
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
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import WangEditor from "wangEditor";
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/EditDraft'
import { saveInfo,editInfo } from '@/api/communityGrid/info'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList,getSmallOrganList } from '@/api/sys/organ'
import { isNull } from '@/utils/util'
import { uploadApi } from '@/api/upload.js'
export default {
  name:'EditActual',
  mixins: [mixin],
  components:{PopupTreeInput},
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { InfoFormConfig,MediaFormConfig } = renderTable.call(proxy)
    let dataForm = reactive({
      synopsis:'',
      officeCode:'',
      officeName:'',
      areaName:'',
      streetName:'',
      communityName:'',
      name:'',
    })
    let timer = ref(new Date().getTime())
    const editor = ref(null);
    const getSOList = (officeCode) => {
      getSmallOrganList({officeCode}).then(res=>{
        if(!dataForm.officeName && dataForm.officeCode == res.data[0].officeCode){
          dataForm.officeName = res.data[0].officeName
        }
        if(res.resCode == '000000' && !isNull(res.data)){
          res.data.forEach(v => {
            if(v.officeType == '2'){
              dataForm.areaName = v.officeName
              dataForm.qbm = v.officeCode
            } else if (v.officeType == '3'){
              dataForm.streetName = v.officeName
              dataForm.jdbm = v.officeCode
            } else if (v.officeType == '4'){
              dataForm.communityName = v.officeName
              dataForm.sqbm = v.officeCode
            } else if (v.officeType == '5'){
              dataForm.name = v.officeName
              dataForm.wgbm = v.officeCode
            }
          })
        }
      })
    }
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      dataForm.officeCode = officeCode
      dataForm.officeName = officeName
      getSOList(officeCode)
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
    let instance;
    // 提交
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.params.operation == 2) {
            editInfo(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
            saveInfo(dataForm).then(res=>{
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
      dataForm.synopsis = instance.txt.html();
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
    onBeforeMount(()=>{
      timer.value = new Date().getTime()
    })
    route.params.operation != 3 && (dataForm = JSON.parse(decodeURIComponent(route.params.data)))
    onMounted(() => {
      if(route.params.type === 'draft'){
        instance = new WangEditor(editor.value);
        instance.config.zIndex = 1;
        instance.create();
        route.params.operation == 1 && (getSOList(dataForm?.officeCode),instance.txt.html(dataForm.synopsis),instance.disable())
        route.params.operation == 2 && (getSOList(dataForm?.officeCode),instance.txt.html(dataForm.synopsis),instance.enable())
        route.params.operation === 3 &&( dataForm = {})
      }
      //
    })
    onBeforeUnmount(() => {
      if(route.params.type === 'draft'){
        instance.destroy();
        instance = null;
      }
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      InfoFormConfig,
      MediaFormConfig,
      formHandle,
      editor,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
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
