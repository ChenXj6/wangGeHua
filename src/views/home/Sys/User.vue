<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle"/>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:operation="data">
        <el-button
          size="small"
          @click="handleOperation(1, data.data)"
          icon="el-icon-lx-search"
          circle
          type="success"
        />
        <el-button
          size="small"
          icon="el-icon-lx-edit"
          @click="handleOperation(2, data.data)"
          circle
          type="priamry"
        />
      </template>

          <!--新增编辑界面-->
    <el-dialog
      :close-on-click-modal="false"
      :title="operation ? '新增' : '编辑'"
      :visible="dialogVisible"
      width="30%"
    >
      <el-form
        :model="dataForm"
        :rules="dataFormRules"
        :size="size"
        label-position="right"
        label-width="80px"
        ref="dataForm"
      >
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input
            :disabled="true"
            auto-complete="off"
            v-model="dataForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="operatorId">
          <el-input
            v-model="dataForm.operatorId"
            auto-complete="off"
            :disabled="editOperatorId"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="operatorName">
          <el-input
            v-model="dataForm.operatorName"
            auto-complete="off"
            :disabled="editOperatorName"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-select
            v-model="dataForm.deptId"
            placeholder="请选择"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in deptIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="dataForm.roleId"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in this.roleIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :size="size" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button
            :loading="editLoading"
            :size="size"
            @click="submitForm"
            type="primary"
            >提交</el-button
          >
        </div>
      </template>
    </el-dialog>
    </V-table>
  </div>
</template>
<script>

import { renderTable } from './common/User'
import { deepClone, formatterDate } from '@/utils/util'
import { getCurrentInstance, onMounted, reactive, ref } from '@vue/runtime-core'

export default {
  name: 'User',
  setup() {
    const { proxy }  = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    let searchParams = ref({}) // 表单数据备份
    const searchForm = reactive({
      operatorName:'',
    })
    // 表單操作按鈕配置
    const handleAdd = () => {
      
    }
            // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      for (const key in searchParams.value) {
        if (
          Array.isArray(searchParams.value[key]) &&
          searchParams.value[key].length > 0
        ) {
          searchParams.value[`${key}Start`] = formatterDate(
            searchParams.value[key][0]
          )
          searchParams.value[`${key}End`] = formatterDate(
            searchParams.value[key][1]
          )
          delete searchParams.value[key]
        }
      }
      table.currentPage = 1
      handleQueryTable()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.data || []
        tableConfig.data = data
      })
    }
    const formHandle = [
      {type:'primary',label:'查询',key:'search',handle:handleQuery},
      {type:'primary',label:'新增',key:'reset',handle:handleAdd},
    ]
    onMounted(() => {
      handleQuery()
    })
    return {
      table,
      searchForm,
      formHandle,
      tableConfig,
      formConfig,
    }
  },
}
</script>
<style scoped>

</style>