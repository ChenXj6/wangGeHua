<template>
  <div>
    <VForm
      :form-data="formConfig"
      :form-model="searchForm"
      :form-handle="formHandle"
    />
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:assessType="{ data }">
        <span>{{
          data.assessType == 1 ? "网格人物" : data.assessType == 2 ? "网格案例或典型做法": data.assessType == 3 ? "法律宣传" : data.assessType == 4
            ? "党的路线方针政策宣传" : data.assessType == 5 ? "社会民意采集" : data.assessType == 6 ? "重点人群、特殊人群服务管理": data.assessType == 7
            ? "网格化信息系统数据动态更新维护" : data.assessType == 8 ? "开展日常的网格巡查" : data.assessType == 9 ? "每周周报上报" : "每周业务工作例会"
        }}</span>
      </template>
      <template v-slot:operation="{ data }">
        <el-button
          size="small"
          icon="el-icon-lx-edit"
          @click="handleOperation(2, data)"
          circle
          type="priamry"
        />
      </template>
    </V-table>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch,
} from "@vue/runtime-core";
import { renderTable } from "./common/AssessmentScoreUser";
import { deepClone, defaultObject } from "@/utils/util";
export default defineComponent({
  name: "AssessmentScoreUser",
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const { tableConfig, formConfig } = renderTable.call(proxy);
    const table = ref(null);
    const searchForm = reactive({}); // 表单数据
    let searchParams = ref({}); // 表单数据备份
    const multipleSelection = ref([]); // 选中数据
    const route = useRoute();
    const assessPer = JSON.parse(
      decodeURIComponent(route.query.data)
    ).assessPer;
    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm);
      table.currentPage = 1;
      handleQueryTable();
    };
    const handleReset = (formEL) => {
      formEL.resetFields();
      searchParams.value = {};
      defaultObject(searchForm);
      handleQuery();
    };

    const handleQueryTable = () => {
      searchParams.value.assessPer = assessPer;
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || [];
        tableConfig.data = data;
      });
    };
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        { type: "primary", label: "查询", key: "search", handle: handleQuery },
        { type: "primary", label: "重置", key: "reset", handle: handleReset },
      ],
    };

    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData);
      router.push({
        path: "/editAssessmentScoreUser",
        query: { data: encodeURIComponent(data), operation: type },
      });
    };

    onMounted(() => {
      handleQuery();
    });

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
    };
  },
});
</script>
        