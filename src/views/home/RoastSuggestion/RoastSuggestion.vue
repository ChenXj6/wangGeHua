<template>
  <div>
    <VForm
      :form-data="formConfig"
      :form-model="searchForm"
      :form-handle="formHandle"
    >
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:operation="{ data }">
        <el-button
          @click="handleOperation(1, data)"
          icon="search"
          circle
          type="success"
        />
        <el-button
          icon="edit"
          @click="handleOperation(2, data)"
          circle
          type="priamry"
        />
        <el-popconfirm title="确定要删除吗？" @confirm="handleDel(data.id)">
          <template #reference>
            <el-button
              icon="delete"
              circle
              type="danger"
            />
          </template>
        </el-popconfirm>
      </template>
    </V-table>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch,
} from "@vue/runtime-core";
import { renderTable } from "./common/RoastSuggestion";
import { deepClone, defaultObject } from "@/utils/util";


import { deleteRoastSuggestion } from "@/api/RoastSuggestion/roastSuggestion"

export default defineComponent({
  name: "RoastSuggestion",
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const { tableConfig, formConfig } = renderTable.call(proxy);
    const table = ref(null);
    const searchForm = reactive({}); // 表单数据
    let searchParams = ref({}); // 表单数据备份

    const multipleSelection = ref([]); // 选中数据

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
    const handleAdd = () => {
      handleOperation(3, {});
    };
    const handleDel = (id) => {
      deleteRoastSuggestion({ id }).then((res) => {
        if (res.resCode == "000000") {
          handleQuery();
          proxy.$message.success("删除成功");
        } else {
          proxy.$message.danger("删除失败");
        }
      });
    };
    const handleQueryTable = () => {
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
        { type: "primary", label: "添加", key: "reset", handle: handleAdd },
      ],
    };
    //
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData);
      router.push({
        path: "/editRoastSuggestion",
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
      handleDel,

    };
  },
});
</script>
<style scoped>
:deep(.el-table .warning-row) {
  background: #e6a23c;
}

:deep(.el-table .danger-row) {
  background: orangered;
}
</style>

