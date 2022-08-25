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
    <template v-slot:officeName="{data}">
      <span>（{{data.officeCode}}）</span>
      <el-link type="primary" @click.prevent="handleOperation(2,data)">{{ data.officeName }}</el-link>
    </template>
    <template v-slot:type="{data}">
      <span class="tagClass">
        {{ officeType(Number(data.officeType)) }}
      </span>
    </template>
    <template v-slot:status="{data}">
      <span class="tagClass">{{ data.status == 0 ? '正常' : (data.status == 1 ? '删除' : '停用') }}</span>
    </template>
      <template v-slot:operation="data">
        <el-button
          @click="handleOperation(2,data.data)"
          icon="edit"
          circle
          type="primary"
        ></el-button>
        <el-popconfirm title="确定要删除该数据吗？" @confirm="handleDelete(data.data)">
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
import { getCurrentInstance, reactive, ref, onMounted, computed } from '@vue/runtime-core'
import { deepClone, listAssign, defaultObject } from '@/utils/util'

import { renderTable } from './common/Organ'
import { deleteOrgan } from '@/api/sys/organ'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { useRouter } from 'vue-router'
export default {
  name:'Menu',
  components:{PopupTreeInput},
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { tableConfig, formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const form = ref(null)
    let searchParams = ref({}) // 表单数据备份
    const searchForm = reactive({})
    const typeList = [
      { label:'目录',value:'0'},
      { label:'菜单',value:'1'},
      { label:'按钮',value:'2'},
    ]
    const dataForm = reactive({
      id:'',
      name:'',
      type: '',
      icon: '',
      parentId:'',
      parentName:'',
      orderNum:1,
      url:'',
    })
    const officeType = computed(()=>{
      return (val)=>{
        switch(val){
          case 2:
              return '区';
          case 3:
              return '街道';
          case 4:
              return '社区';            
          case 5:
              return '网格';
          case 0:
              return '省';
          case 1:
              return '市';
        }
      }
    })
    const handleAdd = () => {
      handleOperation(1,{})
    }
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        name: 'editorgan',
        params: { data : encodeURIComponent(data), operation: type},
      })
    }
    const handleDelete = (data) => {
      deleteOrgan(data).then(res=>{
        res.resCode === '000000' && (handleQuery(),proxy.$message.success('用户删除成功。'))
      })
    }
    // 表格操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      defaultObject(searchForm)
      searchParams.value = {}
      handleQuery()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        tableConfig.data = res
      })
    }
    // 表单按钮组
    const formHandle = {
      span: 4,
      btns: [
        { type: 'primary', label: '查询', key: 'search', handle: handleQuery },
        { type: 'primary', label: '重置', key: 'reset', handle: handleReset },
        { type: 'primary', label: '新增', key: 'add', handle: handleAdd },
      ],
    }
    onMounted(() => {
      handleQuery()
    })
    return {
      form,
      table,
      formConfig,
      tableConfig,
      formHandle,
      searchForm,
      dataForm,
      handleDelete,
      officeType,
      handleOperation,
    }
  },
}
</script>
<style scoped>
.tagClass {
  height: 30px;
  transform: scale(0.8);
}
</style>