<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{ route.params.operation == 1 ? '添加' : '编辑' }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <VForm :key="timer" :form-data="editOrganForm" :form-model="dataForm" :form-handle="formHandle">
      <template v-slot:parentName="">
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.parentCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.parentName" size="mini" :readonly="true" placeholder="点击选择内容" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
    </VForm>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { renderTable } from './common/Organ'
import { getOrganList,saveOrgan,editOrgan } from '@/api/sys/organ'
import { listAssign, defaultObject } from '@/utils/util' 
export default {
  name:'EditActual',
  mixins: [mixin],
  components:{PopupTreeInput},
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { editOrganForm } = renderTable.call(proxy)
    let dataForm = reactive({
      parentCode:'',
      parentName:'',
      officeType:'',
      treeLevel:'',
      officeName:'',
      officeCode:'',
      fullName:'',
      treeSort:'',
    })
    let timer = ref(new Date().getTime())
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    } 
    // 提交
    const handleSave = () => {
      dataForm.treeLevel = dataForm.officeType
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.params.operation == 1) {
          saveOrgan(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
          editOrgan(dataForm).then(res=>{
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
            proxy.$message.success(`${route.params.operation == 1 ? '添加' : '编辑'}成功`)
            delCurrentTag(route)
          }).catch(err=>{
            proxy.$message.warning(`操作失败，请稍后再试！`)
          })          
        } else {
          return
        }
      })
    }
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      dataForm.parentCode = officeCode
      dataForm.parentName = officeName
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
    
    onBeforeMount(()=>{
      getOList()
      timer.value = new Date().getTime()
    })
    route.params.operation == 2 && (listAssign(dataForm,JSON.parse(decodeURIComponent(route.params.data))))
    console.log(dataForm,'...')
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      editOrganForm,
      formHandle,
      popupTreeData,
      popupTreeProps,
      handleTreeSelectChange,
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
