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
    <VForm :key="timer" :isDisabled="route.query.operation == 1" :form-data="noticeFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:upload>
        <div class="uploadBox">
          <el-upload
              class="upload-demo"
              action="#"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              show-file-list
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <el-button type="primary" size="small">上传文件</el-button>
              <el-icon><Plus/></el-icon>
              <template #tip>
                <div class="el-upload__tip tip">
                  *最大上传文件大小10Mb
                </div>
              </template>
            </el-upload>
        </div>
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
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/Edit'
import { getOrganList } from '@/api/sys/organ'
import { saveNotice,updateNotice } from '@/api/Notice/index'
import { uploadApi } from '@/api/upload.js'
export default {
  name:'Edit',
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { noticeFormConfig } = renderTable.call(proxy)
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
          updateNotice(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
            resolve(res.message)
          } else {
            reject(res.resCode)
          }
          })
        } else {
          saveNotice(dataForm.value).then(res=>{
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
    // 图片相关配置
    const fileList = ref([])
    // 上传图片
    const changeFile = (file) => {
      if(file.size / 1024 / 1024 > 10){ 
        fileList.value = []
        proxy.$message.error('最大文件上传尺寸为10Mb')
        return
      }
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
          proxy.$message.success('文件上传成功')
        } else {
          proxy.$message.success('文件上传失败')
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
    // 初始化数据
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)))
    onMounted(() => {
      resetFileList()
      route.query.operation === 3 &&( dataForm.value = {})
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      noticeFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      // 上传图片
      fileList,
      changeFile,
      handleRemove,
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
.uploadBox{
  width: 100%;
  min-height: 120px;
  border: 1px dashed #d9d9d9;
  padding: 10px;
}
</style>
<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100% !important;
}
.el-upload--text{
    background-color: #fff;
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    width: auto;
    height: auto;
}
</style>
