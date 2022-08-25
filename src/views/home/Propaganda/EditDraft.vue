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
    <VForm v-if="route.query.type === 'draft'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="InfoFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
      <template v-slot:level1="">
        <el-select v-model="dataForm.level1" size="small" placeholder="请选择文稿一级分类" @change="handleChangelevel1">
          <el-option
            v-for="item in level1Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level2="">
        <el-select v-model="dataForm.level2" :disabled="!dataForm.level1" size="small" placeholder="请选择文稿二级分类" @change="handleChangelevel2">
          <el-option
            v-for="item in level2Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level3="">
        <el-select v-model="dataForm.level3" clearable :disabled="!dataForm.level2" size="small" placeholder="请选择文稿三级分类">
          <el-option
            v-for="item in level3Options"
            :key="item.id"
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
              accept="bmp,jpg,png,gif,webp,"
              :auto-upload="false"
              :file-list="fileList"
              list-type="picture-card"
              limit="1"
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <el-icon><Plus/></el-icon>
              <template #tip>
                <div class="el-upload__tip tip">
                  *最大上传文件大小10Mb
                </div>
              </template>
            </el-upload>
      </template>
      <template v-slot:content="">
        <div class="mgb20" ref='editor'></div>
      </template>
    </VForm>
    <VForm v-else :key="timer" :isDisabled="route.query.operation == 1" :form-data="MediaFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
      <template v-slot:level1="">
        <el-select v-model="dataForm.level1" size="small" placeholder="请选择文稿一级分类" @change="handleChangelevel1">
          <el-option
            v-for="item in level1Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level2="">
        <el-select v-model="dataForm.level2" :disabled="!dataForm.level1" size="small" placeholder="请选择文稿二级分类" @change="handleChangelevel2">
          <el-option
            v-for="item in level2Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level3="">
        <el-select v-model="dataForm.level3" clearable :disabled="!dataForm.level2" size="small" placeholder="请选择文稿三级分类">
          <el-option
            v-for="item in level3Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:upload="">
        <el-upload
              v-if="dataForm.mtype == 1"
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              accept="bmp,jpg,png,gif,webp,"
              :auto-upload="false"
              :file-list="fileList"
              list-type="picture-card"
              limit="1"
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <el-icon><Plus/></el-icon>
              <template #tip>
                <div class="el-upload__tip tip">
                  *最大上传文件大小10Mb
                </div>
              </template>
            </el-upload>
            <el-upload
            v-else
              class="upload-demo"
              action="#"
              :on-remove="handleRemove"
              :auto-upload="false"
              accept="mp4,mp3"
              :file-list="fileList"
              show-file-list
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <el-button type="primary" size="small">上传文件</el-button>
              <!-- <el-icon><Plus/></el-icon> -->
              <template #tip>
                <div class="el-upload__tip tip">
                  *最大上传文件大小10Mb
                </div>
              </template>
            </el-upload>
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
import { saveDraft,updateDraft } from '@/api/Propaganda/draft'
import { saveMedia,updateMedia } from '@/api/Propaganda/media'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList,getSmallOrganList } from '@/api/sys/organ'
import { getDictThTreeBy } from '@/api/sys/multilevel'
import { isNull,findElem } from '@/utils/util'
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
    let dataForm = ref({})
    let timer = ref(new Date().getTime())
    const editor = ref(null);
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
    let instance;
    // 提交
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        delete dataForm.value.treeNames
        delete dataForm.value.levelName1
        delete dataForm.value.levelName2
        delete dataForm.value.levelName3
        dataForm.value.releaseUser = JSON.parse(sessionStorage.getItem('user')).user.operatorName
        if (route.query.operation == 2) {
          if(route.query.type === 'draft'){
            updateDraft(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } else {
            dataForm.value.releaseUser = JSON.parse(sessionStorage.getItem('user'))?.user?.operatorName
            updateMedia(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
            
        } else {
          if(route.query.type === 'draft'){
            saveDraft(dataForm.value).then(res=>{
              if(res.resCode === '000000'){
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } else {
            dataForm.value.releaseUser = JSON.parse(sessionStorage.getItem('user'))?.user?.operatorName
            saveMedia(dataForm.value).then(res=>{
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
      if(route.query.type == 'draft'){
        dataForm.value.content = instance.txt.html()
      }
      formRef.validate((vaild) => {
        if (vaild) {
          if(route.query.type != 'draft'){
            // String(dataForm.value.mediaPath).length <= 0 
            console.log(fileList.value,dataForm.value.mediaPath)
            if(String(dataForm.value.mediaPath).length <= 0 && dataForm.value.mediaPath != null){
              proxy.$message.warning(`请添加图片、音频或视频，点击确定！`)
              return
            }
          }
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
    // 多级分类
    const level1Options = ref([])
    const level2Options = ref([])
    const level3Options = ref([])
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
      let id = dataForm.value.level1
      getDictThTreeByApi({id},level2Options)
    }
    const handleChangelevel2 = () => {
      let id = dataForm.value.level2
      getDictThTreeByApi({id},level3Options)
    }
    const getDictThTreeByApi = (data,option) => {
      getDictThTreeBy(data).then(res=>{
        if(res.code == 200){
          resetFormat(res.data,option)
        }        
      })
    }
    getDictThTreeByApi({perms:'0003'},level1Options)
    
    // 图片相关配置
    const fileList = ref([])
    const dialogVisible = ref(false)
    const dialogImageUrl = ref('')
    const isAbleUpload = () => {
      if(level1Options.value.length>0 && !!dataForm.value.level1){
        let flag = true
        level1Options.value.forEach(v=>{
          if(v.label.toUpperCase() == 'APP'){
            if(String(dataForm.value.level1) === String(v.value)){
              flag = true
            }else{
              flag = false
            }
          }else{
            flag = false
          }
        })
        if(!flag){
          fileList.value = []
          proxy.$message.warning('文稿一级分类为APP时，才可以上传图片！', {grouping:true})
          return false
        }else{
          return true
        }
      }else{
        fileList.value = []
        proxy.$message.warning('请先选择文稿一级分类')
        return false
      }
    }
    // 上传图片
    const changeFile = (file) => {
      if(file.size / 1024 / 1024 > 10){ 
        fileList.value = []
        proxy.$message.error('最大文件上传尺寸为10Mb')
        return
      }
      let result = isAbleUpload()
      if(!result) return
      let fileFormData = new FormData();
      let currentFile = file.raw
      fileFormData.append('file',currentFile)
      fileFormData.append('mediaName',file.name)
      uploadApi(fileFormData).then(res=>{
        if(res.resCode == '000000'){
          // fileList   
          // console.log((dataForm.value.certificates == null && dataForm.value.certificatesName == null) || (String(dataForm.value.certificates).length <= 0 && String(dataForm.value.certificatesName).length <= 0))      
          if((dataForm.value.mediaPath == null ) || (String(dataForm.value.mediaPath).length <= 0 )){
            dataForm.value.mediaPath = res.message
            dataForm.value.mediaName = file.name
          } else {
            let str = dataForm.value.mediaPath + ',' + res.message
            let nameStr = dataForm.value.mediaName + ',' + file.name
            dataForm.value.mediaPath = str
            dataForm.value.mediaName = nameStr
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
        dataForm.value.mediaPath = ''
        // dataForm.value.mediaName = ''
      }else{
        let certificatesArr = dataForm.value.mediaPath.split(',')
        let certificatesNameArr = dataForm.value.mediaName.split(',')
        certificatesArr.forEach((v,ind) => {
          if(`${import.meta.env.VITE_IMG_BASE_API }${v}` == val.url){
            certificatesArr.splice(ind,1)
            certificatesNameArr.splice(ind,1)
            dataForm.value.mediaPath = certificatesArr.join(',')
            dataForm.value.mediaName = certificatesNameArr.join(',')
          }
        })
      }
    }
    // 图片回显
    const resetFileList = () => {
      if(dataForm.value.mediaPath == null ||  dataForm.value.mediaPath.length == 0 ) return
      let result = dataForm.value.mediaPath.indexOf(',')
      if(result != '-1'){
        let certificatesArr = dataForm.value.mediaPath.split(',')
        let certificatesNameArr = dataForm.value.mediaName.split(',')
        certificatesArr.forEach((v,i) => {
          let obj = {
            name:certificatesNameArr[i],
            url:`${import.meta.env.VITE_IMG_BASE_API }${v}`
          }
          fileList.value.push(obj)
        })
      }else{
        let obj = {
          name:dataForm.value.mediaName,
          url:`${import.meta.env.VITE_IMG_BASE_API }${dataForm.value.mediaPath}`
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
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)))
    if(route.query.operation != 3){
      handleChangelevel1()
      handleChangelevel2()
    }
    onMounted(() => {
      if(route.query.type === 'draft'){
        instance = new WangEditor(editor.value);
        instance.config.zIndex = 1;
        instance.create();
        route.query.operation == 1 && (instance.txt.html(dataForm.value.content),instance.disable(),resetFileList())
        route.query.operation == 2 && (instance.txt.html(dataForm.value.content),instance.enable(),resetFileList())
        route.query.operation === 3 &&( dataForm.value = {})
      }else if(route.query.type != 'draft' && route.query.operation != 3){
        resetFileList()
      }
      //
    })
    onBeforeUnmount(() => {
      if(route.query.type === 'draft'){
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
      // 多级分类
      level1Options,
      level2Options,
      level3Options,
      handleChangelevel1,
      handleChangelevel2,
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
