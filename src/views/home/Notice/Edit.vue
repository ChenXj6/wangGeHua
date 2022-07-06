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
    <VForm :key="timer" :isDisabled="route.params.operation == 1" :form-data="noticeFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:gridCode="">
        <popup-tree-input
          :data="popupTreeData" :propa="popupTreeProps"
          :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
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
              <el-button type="primary" size="mini">上传文件</el-button>
            </el-upload>
        </div>
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
import { getOrganList } from '@/api/sys/organ'
import { addParty,updateParty } from '@/api/PartyBuilding/partyInfo'
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
        if (route.params.operation == 2) {
          addParty(dataForm.value).then(res=>{
            if(res.resCode === '000000'){
            resolve(res.message)
          } else {
            reject(res.resCode)
          }
          })
        } else {
          addParty(dataForm.value).then(res=>{
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
      let fileFormData = new FormData();
      let currentFile = file.raw
      fileFormData.append('file',currentFile)
      fileFormData.append('fileName',file.name)
      uploadApi(fileFormData).then(res=>{
        if(res.resCode == '000000'){
          // fileList   
          // console.log((dataForm.value.certificates == null && dataForm.value.certificatesName == null) || (String(dataForm.value.certificates).length <= 0 && String(dataForm.value.certificatesName).length <= 0))      
          if((dataForm.value.filePath == null && dataForm.value.fileName == null) || (String(dataForm.value.filePath).length <= 0 && String(dataForm.value.fileName).length <= 0)){
            dataForm.value.filePath = res.message
            dataForm.value.fileName = file.name
          } else {
            let str = dataForm.value.filePath + ',' + res.message
            let nameStr = dataForm.value.fileName + ',' + file.name
            dataForm.value.filePath = str
            dataForm.value.fileName = nameStr
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
        dataForm.value.filePath = ''
        dataForm.value.fileName = ''
      }else{
        let certificatesArr = dataForm.value.filePath.split(',')
        let certificatesNameArr = dataForm.value.fileName.split(',')
        certificatesArr.forEach((v,ind) => {
          if(`${import.meta.env.VITE_IMG_BASE_API }${v}` == val.url && certificatesNameArr[ind] == val.name){
            certificatesArr.splice(ind,1)
            certificatesNameArr.splice(ind,1)
            dataForm.value.filePath = certificatesArr.join(',')
            dataForm.value.fileName = certificatesNameArr.join(',')
          }
        })
      }
    }
    // 图片回显
    const resetFileList = () => {
      if(dataForm.value.filePath == null ||  dataForm.value.filePath.length == 0 ) return
      let result = dataForm.value.filePath.indexOf(',')
      if(result != '-1'){
        let certificatesArr = dataForm.value.filePath.split(',')
        let certificatesNameArr = dataForm.value.fileName.split(',')
        certificatesArr.forEach((v,i) => {
          let obj = {
            name:certificatesNameArr[i],
            url:`${import.meta.env.VITE_IMG_BASE_API }${v}`
          }
          fileList.value.push(obj)
        })
      }else{
        let obj = {
          name:dataForm.value.fileName,
          url:`${import.meta.env.VITE_IMG_BASE_API }${dataForm.value.filePath}`
        }
        fileList.value.push(obj)
      }
    }
    // 初始化数据
    route.params.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.params.data)))
    onMounted(() => {
      resetFileList()
      route.params.operation === 3 &&( dataForm.value = {})
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
