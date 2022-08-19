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
     <VForm v-if="route.query.type == 'list'" :key="timer" :isDisabled="route.query.operation == 1" :form-data="ListFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}"/>
     <VForm v-else :key="timer" :isDisabled="route.query.operation == 1" :form-data="TempFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
       <template v-slot:rule>
         <span style="font-style:italic;">【智慧天桥】紧急报警：位于{treeNames}的{device_name}的设备在{alarmTime}发生{alarmType}类型的报警事件，请立即联系排查。{treeNames}:所属网格，{device_name}：烟感报警器名称，{alarmTime}：发生时间，{alarmType}：报警类型</span>
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
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/EditSMS'
import { saveHotlineManage,editHotlineManage } from '@/api/SocialGovernance/HotlineManage'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"

export default {
    name:'EditSMS',
    mixins: [mixin],
    components:{PopupTreeInput},
    setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { ListFormConfig,TempFormConfig } = renderTable.call(proxy)
    let dataForm = reactive({})
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
            editHotlineManage(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
            saveHotlineManage(dataForm).then(res=>{
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
    //   dataForm.synopsis = instance.txt.html();
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


  onBeforeUnmount(() => {
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      ListFormConfig,
      TempFormConfig,
      formHandle,
    }

    }
}

</script>