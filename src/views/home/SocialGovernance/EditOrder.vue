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
    <div style="margin-bottom: 20px">
      <hr />
    </div>
    <VForm :key="timer"
           :isDisabled="route.params.operation == 1"
           :form-data="InfoFormConfig"
           :form-model="dataForm"
           :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:status>
        <popup-tree-input :data="popupTreeData"
                          :propa="popupTreeProps"
                          :nodeKey="''+dataForm.officeCode"
                          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName"
                      size="mini"
                      :readonly="true"
                      placeholder="点击选择上级类别"
                      style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <el-row v-if="route.params.operation == 1">
      <div class="btn-box">
        <el-button type="primary"
                   @click="handleBack"
                   size="small"
                   icon="el-icon-lx-back">返回</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/EditOrder'
import { saveHotlineManage, editHotlineManage } from '@/api/SocialGovernance/HotlineManage'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { listAssign } from '@/utils/util'

export default {
  name: 'EditHotlineManage',
  mixins: [mixin],
  components: { PopupTreeInput },
  setup () {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { InfoFormConfig } = renderTable.call(proxy)
    let dataForm = ref({})
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    }
    const getOList = () => {
      getOrganList({}).then(res => {
        if (res.resCode == '000000') {
          popupTreeData.value = res.data
        }
      })
    }

    const handleTreeSelectChange = ({ officeCode, officeName }) => {
      dataForm.officeCode = officeCode
      dataForm.officeName = officeName
    }
    const handleSave = () => {
      return new Promise((resolve, reject) => {
        // true: 编辑；false:添加
        if (route.params.operation == 2) {
          editHotlineManage(dataForm).then(res => {
            if (res.resCode === '000000') {
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
          saveHotlineManage(dataForm).then(res => {
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
          handleSave().then(res => {
            proxy.$message.success(`${route.params.operation == 2 ? '编辑' : '添加'}成功`)
            delCurrentTag(route)
          }).catch(err => {
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
        { type: 'primary', label: '确认', key: 'sub', icon: 'el-icon-lx-roundcheck', handle: handleSubmit },
        { type: 'primary', label: '返回', key: 'back', icon: 'el-icon-lx-back', handle: handleBack },
      ]
    }
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)))
    onBeforeMount(() => {
      getOList()
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      InfoFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
    }

  }
}

</script>