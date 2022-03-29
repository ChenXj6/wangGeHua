<template>
  <div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="工单号">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件名称">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发生时间">
            <el-date-picker
              v-model="formData.entryId"
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
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件类型">
            <el-select
              v-model="formData.region"
              size="small"
              placeholder="please select your zone"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件查询">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件来源">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="btn-box">
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="primary" size="small">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
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
          <el-link type="primary">{{ scope.row.name }}</el-link>
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
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { get } from "@/api/index";
export default {
  name: 'residentsReport',
  setup() {
    const router = useRouter()
    const eventData = ref(null)
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
    const formData = reactive({})
    const getList = () => {
      get().then(res=>{
        console.log(res,'.....')
      })
    }
    // getList()
    const tableRowClassName = ({ row }) => {
      if (row.isNew === 1) {
        return 'warning-row'
      } else if (row.isNew === 2) {
        return 'success-row'
      } else return ''
    }
    const handleOperation = (type, rowData) => {
      router.push({
        path: '/editResidentsReport',
        query: { id: rowData.isNew, operation: type },
      })
    }
    return {
      tableData,
      formData,
      tableRowClassName,
      handleOperation,
    }
  },
}
</script>
<style scoped>
/deep/ .el-table .warning-row {
  background: #e6a23c;
}

/deep/ .el-table .success-row {
  background: orangered;
}
</style>
