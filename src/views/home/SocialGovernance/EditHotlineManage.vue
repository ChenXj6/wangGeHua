<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{
            route.query.operation == 1
              ? '查看'
              : route.query.operation == 2
              ? '编辑'
              : '添加'
          }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px">
      <hr />
    </div>
    <VForm
      v-if="route.query.type == 'hotline'"
      :key="timer"
      :isDisabled="route.query.operation == 1"
      :form-data="InfoFormConfig"
      :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}"
    >
      <template v-slot:status>
        <popup-tree-input
          :data="popupTreeData"
          :propa="popupTreeProps"
          :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange"
        >
          <template v-slot>
            <el-input
              v-model="dataForm.officeName"
              size="mini"
              :readonly="true"
              placeholder="点击选择机构"
              style="cursor: pointer"
            ></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <div v-if="route.query.operation == 1">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 处理记录
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-table :data="tableData" border style="width: 100%" size="mini">
        <el-table-column prop="dealBy" label="承办单位" />
        <el-table-column prop="orderType" label="工单标签" />
        <el-table-column prop="concludeTime" label="办理时效(天)" />
        <el-table-column prop="dispatchTime" label="派单时间" width="200">
          <template #default="scope">
            {{ formatterDate(scope.row.dispatchTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="acceptOrderDate" label="接单时间/退回时间" width="200">
          <template #default="scope">
            {{ formatterDate(scope.row.acceptOrderDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="replyOrderDate" label="回单时间" width="200">
          <template #default="scope">
            {{ formatterDate(scope.row.processeTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="dealRemark" label="退回原因/回单内容" />
        <el-table-column prop="filePath" label="办理文件">
        </el-table-column>
        <el-table-column prop="processeTime" label="撤回时间/审核时间/办结时间" width="200">
          <template #default="scope">
            {{ formatterDate(scope.row.processeTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="situation" label="撤回原因/审核内容/办理情况" />
        <el-table-column prop="dealStatus" label="处置状态" >
          <template #default="scope">
            {{isDangerOptions.filter(v=>v.value == scope.row.dealStatus)[0]?.label}}
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <el-row :gutter="10"><div style="margin-top:20px"></div></el-row>
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
  </div>
</template>
<script>
import {
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/edit'
import {
  saveHotlineManage,
  editHotlineManage,
  getHotlineRecordList,
} from '@/api/SocialGovernance/HotlineManage'
import PopupTreeInput from '@/components/PopupTreeInput/index.vue'
import { uploadApi } from '@/api/upload'
import { searchDict } from '@/api/sys/dict'
import { formatterDate,resetFormat as resetFormatStatus } from '@/utils/util'

export default {
  name: 'editHotlineManage',
  mixins: [mixin],
  components: { PopupTreeInput },
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { InfoFormConfig } = renderTable.call(proxy)
    let dataForm = ref({
      officeCode: '',
      officeName: '',
    })
    let timer = ref(new Date().getTime())
    const editor = ref(null)

    let popupTreeData = ref([])
    const popupTreeProps = {
      label: 'officeName',
      children: 'children',
    }

    const handleTreeSelectChange = ({ officeCode, officeName }) => {
      dataForm.value.officeCode = officeCode
      dataForm.value.officeName = officeName
      getSOList(officeCode)
    }
    const handleSave = () => {
      return new Promise((resolve, reject) => {
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
          editHotlineManage(dataForm.value).then((res) => {
            if (res.resCode === '000000') {
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
          saveHotlineManage(dataForm.value).then((res) => {
            if (res.resCode === '000000') {
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
          handleSave()
            .then((res) => {
              proxy.$message.success(
                `${route.query.operation == 2 ? '编辑' : '添加'}成功`
              )
              delCurrentTag(route)
            })
            .catch((err) => {
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
      span: 22,
      textAlign: 'right',
      btns: [
        {
          type: 'primary',
          label: '确认',
          key: 'sub',
          icon: 'el-icon-lx-roundcheck',
          handle: handleSubmit,
        },
        {
          type: 'primary',
          label: '返回',
          key: 'back',
          icon: 'el-icon-lx-back',
          handle: handleBack,
        },
      ],
    }
    // 热线管理记录
    const tableData = ref([])
    const getRecordByEventId = () => {
      getHotlineRecordList({hotlineId:dataForm.value.id,pageNum:1,pageSize:9999}).then(res=>{
        if(res.resCode == '000000'){
          tableData.value = res.data.list
        }
      })
    }
    // 
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
    getOptionsByCode(1078,isDangerOptions)
    
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)))
    route.query.operation == 1 && getRecordByEventId()
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
      tableData,
      isDangerOptions,
      formatterDate,
    }
  },
}
</script>
<style scoped>
.btn-box {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
