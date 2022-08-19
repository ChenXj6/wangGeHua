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
    <VForm :key="timer" :isDisabled="route.query.operation == 1" :form-data="InfoFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange" style="width:100%">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
      <template v-slot:remarks="">
        <div class="mgb20" ref='editor'></div>
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
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import WangEditor from "wangEditor";
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/EditInfo'
import { saveInfo,editInfo } from '@/api/communityGrid/info'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList,getSmallOrganList } from '@/api/sys/organ'
import { isNull } from '@/utils/util'
export default {
  name:'EditActual',
  mixins: [mixin],
  components:{PopupTreeInput},
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { InfoFormConfig } = renderTable.call(proxy)
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
        if (route.query.operation == 2) {
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
    onBeforeMount(()=>{
      timer.value = new Date().getTime()
    })
    route.query.operation != 3 && (dataForm = JSON.parse(decodeURIComponent(route.query.data)))
    onMounted(() => {
      instance = new WangEditor(editor.value);
      instance.config.zIndex = 1;
      instance.create();
      route.query.operation == 1 && (getSOList(dataForm?.officeCode),instance.txt.html(dataForm.synopsis),instance.disable())
      route.query.operation == 2 && (getSOList(dataForm?.officeCode),instance.txt.html(dataForm.synopsis),instance.enable())
      route.query.operation === 3 &&( dataForm = {})
      //
    })
    onBeforeUnmount(() => {
        instance.destroy();
        instance = null;
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      InfoFormConfig,
      formHandle,
      editor,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
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
