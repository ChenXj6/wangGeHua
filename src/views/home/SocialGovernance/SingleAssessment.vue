<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="cascades"></i>
          {{
            route.query.operation == 1
              ? "查看"
              : route.query.operation == 2
              ? "编辑"
              : "添加"
          }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <VForm
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
              size="small"
              :readonly="true"
              placeholder="点击选择机构"
              style="cursor: pointer"
            ></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:remarks="">
        <div class="mgb20" ref="editor"></div>
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
import {
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import WangEditor from "wangEditor";
import mixin from "@/mixins/tagView.js";

import { renderTable } from "./common/SingleAssessmentQuery";
import PopupTreeInput from "@/components/PopupTreeInput/index.vue";
import { getOrganList } from "@/api/sys/organ";

export default {
  name: "SingleAssessmentQuery",
  components:{PopupTreeInput},
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy);
    const table = ref(null)
    const searchForm = reactive({}) // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const multipleSelection = ref([]) // 选中数据

 let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.officeCode = officeCode
      searchForm.officeName = officeName
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }

    getOList()

        onMounted(() => {
      handleQuery()
    })

      return {
      table,
      multipleSelection,
      tableConfig,
      formConfig,
      searchForm,
      formHandle,
      handleQuery,
      handleReset,
      handleOperation,
      handleDel,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
    }
  },
};
</script>