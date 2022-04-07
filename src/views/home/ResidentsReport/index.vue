<template>
  <div>
    <el-form ref="form" :model="searchForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="工单号" prop="entryId">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件名称">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发生时间">
            <el-date-picker
              v-model="searchForm.entryId"
              type="datetimerange"
              range-separator="至"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件状态">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件类型">
            <el-select
              v-model="searchForm.region"
              size="small"
              placeholder="请选择事件类型"
              clearable
            >
              <el-option label="Zone one" value="1" />
              <el-option label="Zone two" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件查询">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件来源">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="btn-box">
            <el-button type="primary" size="small" @click="handleSearch"
              >查询</el-button
            >
            <el-button type="primary" size="small" @click="handleReset(form)"
              >重置</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
    <VTable :table-config="tableConfig"></VTable>
    <el-table
      :data="tableData"
      border
      size="mini"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column type="index" width="30"> </el-table-column>
      <el-table-column prop="date" label="工单号" />
      <el-table-column prop="date" label="所属网格" />
      <el-table-column prop="date" label="事件名称">
        <template #default="scope">
          <el-link type="success" @click.prevent="handleOperation(1, scope.row)"
            >{{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="事件发生地" />
      <el-table-column prop="date" label="事件发生时间" />
      <el-table-column prop="date" label="事项规模" />
      <el-table-column prop="date" label="事项类型" />
      <el-table-column prop="date" label="事项处理状态" />
      <el-table-column prop="date" label="数据来源" />
      <el-table-column prop="date" label="姓名" />
      <el-table-column prop="date" label="联系电话" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleOperation(1, scope.row)"
            icon="el-icon-lx-search"
            circle
            type="success"
          />
          <el-button
            size="small"
            icon="el-icon-lx-edit"
            @click="handleOperation(2, scope.row)"
            circle
            type="priamry"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="searchForm.pageIndex"
        :page-size="searchForm.pageSize"
        :total="pageTotal"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { get } from '@/api/index'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'

import { renderTable } from './common/taxesTableHeader'
import VTable from '@/components/table/index.vue'

export default {
  name: 'residentsReport',
  components: { VTable },
  setup() {
    const router = useRouter()
    const form = ref(null)
    const { proxy } = getCurrentInstance()
    const { tableConfig } = renderTable()
    const tableData = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        isNew: 1,
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Jerry',
        isNew: 2,
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Sam',
        isNew: '',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Timi',
        isNew: 2,
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])
    const searchForm = reactive({
      entryId: '',
      region: '',
      pageIndex: 1,
      pageSize: 10,
    })
    const pageTotal = ref(5)
    const getList = () => {
      get(searchForm).then((res) => {
        console.log(res, '.....')
      })
    }
    const handleSearch = () => {
      searchForm.pageIndex = 1
      getList()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      getList()
    }
    // 分页导航
    const handlePageChange = (val) => {
      searchForm.pageIndex = val
      getList()
    }
    // getList()
    // 改变table行样式
    const tableRowClassName = ({ row }) => {
      if (row.isNew === 1) {
        return 'warning-row'
      } else if (row.isNew === 2) {
        return 'danger-row'
      } else return ''
    }
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      router.push({
        path: '/editResidentsReport',
        query: { id: rowData.isNew, operation: type },
      })
    }
    onMounted(() => {
      tableConfig.data = tableData.value
    })
    return {
      form,
      tableData,
      searchForm,
      pageTotal,
      tableRowClassName,
      handleOperation,
      handlePageChange,
      handleSearch,
      handleReset,
      tableConfig,
    }
  },
}
</script>
<style scoped>
/deep/ .el-table .warning-row {
  background: #e6a23c;
}

/deep/ .el-table .danger-row {
  background: orangered;
}
</style>
