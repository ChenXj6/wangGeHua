<template>
  <div>
    <VForm
      :form-data="formConfig"
      :form-model="searchForm"
      :form-handle="formHandle"
    >
      <template v-slot:status>
        <popup-tree-input
          :data="popupTreeData"
          :propa="popupTreeProps"
          :nodeKey="'' + searchForm.officeCode"
          @update:dataForm="handleTreeSelectChange"
          style="width:100%"
        >
          <template v-slot>
            <el-input
              v-model="searchForm.officeName"
              size="small"
              :readonly="true"
              placeholder="点击选择机构"
              style="cursor: pointer"
            ></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:orderType>
        <popup-tree-input
          :data="orderTreeData"
          :propa="orderTreeProps"
          :nodeKey="'' + searchForm.orderType"
          @update:dataForm="handleOrderTreeSelectChange"
          style="width:100%"
        >
          <template v-slot>
            <el-input
              v-model="searchForm.orderName"
              size="small"
              :readonly="true"
              placeholder="点击选择工单类别"
              style="cursor: pointer"
            ></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:orderNo="{ data }">
        <el-link type="success" @click.prevent="handleOperation(2, data)" >{{ data.orderNo }}</el-link>
      </template>
      <template v-slot:operation="{ data }">
        <el-button
          @click="handleOperation(1, data)"
          :icon="Search"
          circle
          type="success"
        />
        <el-button
          :icon="Edit"
          @click="handleOperation(2, data)"
          circle
          type="priamry"
        />
        <el-button
          :icon="Delete"
          @click="handleDel(data)"
          circle
          type="danger"
        />
      </template>
    </V-table>
  </div>
  <el-dialog title="派单" v-model="eventHandleVisible" width="width">
      <div>
        <el-form
          ref="recordFormRef"
          :model="dataForm"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item label="工单编号" prop="dealStatus">
            <el-input size="small" disabled v-model="dataForm.orderNo"></el-input>
          </el-form-item>
          <el-form-item
            label="承办单位"
            prop="dealBy"
          >
            <el-input
              v-model="dataForm.dealBy"
              size="small"
              placeholder=""
              @click="handleChangeLaunch"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="small" @click="eventHandleVisible = false"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="handleRecord(recordFormRef)"
          >确 定</el-button
        >
      </template>
    </el-dialog>
       <!-- 流转人弹窗 -->
    <el-dialog title="选择承办单位" v-model="userDialogVisible" width="40%">
      <div>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-table
              :data="launchList"
              @row-click="handleRowclick"
              style="width: 100%"
            >
              <el-table-column prop="id" label="ID" >
              </el-table-column>
              <el-table-column prop="operatorId" label="账号" >
              </el-table-column>
              <el-table-column prop="operatorName" label="姓名" width="width">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button size="small" type="primary" @click="userDialogVisible = false"
          >返回</el-button
        >
      </template>
    </el-dialog>
    <el-dialog
      title="导入12345热线数据"
      v-model="importDialogVisible"
      width="500px">
      <div style="display:flex;align-items:center;justify-content: center;">
        <el-upload
        class="upload-demo"
        action="#"
        :auto-upload="false"
        :file-list="fileList"
        show-file-list
        :on-change="(file,fileList) => changeFile(file,fileList)"
      >
        <el-button type="primary">上传文件</el-button>
      </el-upload>
      </div>
    </el-dialog>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch,
} from '@vue/runtime-core'
import PopupTreeInput from '@/components/PopupTreeInput/index.vue'
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/hotlineManage'
import { deepClone, defaultObject } from '@/utils/util'
import { getTree } from '@/api/SocialGovernance/GridHotlineWorkOrder'
import { dispatchOrder,delHotline,exportHotline, importHotline } from '@/api/SocialGovernance/HotlineManage'
import { getUserList } from "@/api/sys/user";
import { downLoadFile } from '@/utils/util'
import {
  Delete,
  Edit,
  Search,
} from '@element-plus/icons-vue'

export default defineComponent({
  name: 'HotlineManage',
  components: [PopupTreeInput],
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig, formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = ref({
      officeName: '',
      officeCode: '',
    })
    let popupTreeData = ref([])
    let orderTreeData = ref([])
    const popupTreeProps = {
      label: 'officeName',
      children: 'children',
    }
    const orderTreeProps = {
      label: 'hotlineWorkOrderName',
      children: 'children',
    }
    // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const handleTreeSelectChange = ({ officeCode, officeName }) => {
      searchForm.value.officeCode = officeCode
      searchForm.value.officeName = officeName
    }
    const handleOrderTreeSelectChange = ({hotlineWorkOrderName,id}) => {
      searchForm.value.orderType = id
      searchForm.value.orderName = hotlineWorkOrderName
    }
    const multipleSelection = ref([]) // 选中数据

    // 是否有選中數據
    const isHaveSelect = computed(
      () => multipleSelection.value && multipleSelection.value.length > 0
    )

    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm.value)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchParams.value = {dealCode:JSON.parse(sessionStorage.getItem('user')).user.operatorId}
      defaultObject(searchForm.value)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3, {})
    }

    const handleQueryTable = () => {
      searchParams.value.dealCode = JSON.parse(sessionStorage.getItem('user')).user.operatorId
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    // 派单
    const recordFormRef = ref(null);
    const eventHandleVisible = ref(false);
    const dataForm = ref({});
    const launchList = ref([])
    const userDialogVisible = ref(false)
    // const multipleSelection = ref([]);
    const rules = reactive({
      dealBy: [
        {
          required: true,
          message: "请选择承办单位",
          trigger: ["change", "blur"],
        },
      ],
    });
    const handleChangeLaunch = () => {
      userDialogVisible.value = true;
      dataForm.value.dealBy = "";
      handleQueryUserTable();
    };
    const handleRowclick = (val) => {
      dataForm.value.dealBy = val.operatorName;
      dataForm.value.dealCode = val.operatorId;
      userDialogVisible.value = false
      
    }
    const handleQueryUserTable = () => {
      getUserList({ pageNum: 1, pageSize: 50 }).then((res) => {
        if (res.code == "200") {
          launchList.value = res.data.list;
        }
      });
    };
    const handleDispatch = () => {
      if(!isHaveSelect.value){
        proxy.$message.warning('请先选择数据')
        return
      }
      let flag = true
      multipleSelection.value.forEach(v=>{
        if(v.hotlineStatus != 1){
          proxy.$message.warning('只可选择待处理工单')
          flag = false
          return
        }
      })
      if(!flag){
        return
      }
      if(multipleSelection.value.length > 1) {
        proxy.$message.warning('只可选择一份工单')
        return
      }
      let arr = []
      let idArr = []
      multipleSelection.value.forEach(v=>{
        arr.push(v.orderNo)
        idArr.push(v.id)
      })
      dataForm.value.orderNo = arr.join(',')
      dataForm.value.id = idArr.join(',')
      dataForm.value.concludeTime = multipleSelection.value[0].concludeTime
      dataForm.value.receivingTime = multipleSelection.value[0].receivingTime
      eventHandleVisible.value = true
      
    }
    const handleRecord = async (formRef) => {
        await formRef.validate((vaild) => {
          if (vaild) {
            dispatchOrder(dataForm.value).then(res=>{
              if(res.resCode == '000000'){
                proxy.$message.success('派单成功')
                eventHandleVisible.value = false
                handleQuery()
              }
            })
          } else {
            return;
          }
        });
    };
    // 删除 & 批量删除
    const handleDel = (val) => {
      let arr = []
      arr.push(val)
      delHotline(arr).then(res=>{
        if(res.resCode == '000000'){
          proxy.$message.success('数据删除成功')
          handleQuery()
        }else{
          proxy.$message.error(res.message)
          return
        }
      })
    }
    const handleDelte = () => {
      if(!isHaveSelect.value){
        proxy.$message.warning('请至少选择一条数据！')
        return
      }else{
        delHotline(multipleSelection.value).then(res=>{
          if(res.resCode == '000000'){
            proxy.$message.success('数据删除成功')
            handleQuery()
          }else{
            proxy.$message.error(res.message)
            return
          }
        })
      }
    }
    // 导入
    // 图片相关配置
    const fileList = ref([])
    // 上传图片
    const changeFile = (file) => {
      let fileFormData = new FormData();
      let currentFile = file.raw
      fileFormData.append('Hotline',currentFile)
      importHotline(fileFormData).then(res=>{
        if(res.resCode == '000000'){
          handleQuery()
          importDialogVisible.value = false
          proxy.$message.success('文件上传成功')
        } else {
          proxy.$message.success('文件上传失败')
        }
      })
    }
    const importDialogVisible = ref(false)
    const handleImport = () => {
      importDialogVisible.value = true
    }
    // 导出
    const handleExport = () => {
      if(!isHaveSelect.value){
        proxy.$message.warning('请至少选择一条数据！')
        return
      }else{
        exportHotline(multipleSelection.value).then(res=>{
          downLoadFile(res,'12345热线','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        })
      }
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        { type: 'primary', label: '查询', key: 'search', handle: handleQuery },
        { type: 'primary', label: '重置', key: 'reset', handle: handleReset },
        { type: 'primary', label: '添加', key: 'reset', handle: handleAdd },
        { type: 'primary', label: '派单', key: 'dispatch', handle: handleDispatch },
        { type: 'danger', label: '批量删除', key: 'delete', handle: handleDelte },
        { type: 'success', label: '导入', key: 'import', handle: handleImport },
        { type: 'Primary', label: '导出', key: 'export', handle: handleExport },
      ],
    }

    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editHotlineManage',
        query: {
          data: encodeURIComponent(data),
          operation: type,
          type: 'hotline',
        },
      })
    }
    // 树形结构获取值
    const getOList = () => {
      getOrganList({}).then((res) => {
        if (res.resCode == '000000') {
          popupTreeData.value = res.data
        }
      })
    }
    const getOrderList = () => {
      getTree({}).then((res) => {
        if (res.resCode == '000000') {
          orderTreeData.value = res.data
        }
      })
    }
    getOList()
    getOrderList()
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
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      orderTreeProps,
      orderTreeData,
      handleOrderTreeSelectChange,
      handleDelte,
      handleDel,
      // 派单
      eventHandleVisible,
      recordFormRef,
      dataForm,
      rules,
      handleChangeLaunch,
      launchList,
      userDialogVisible,
      handleRowclick,
      handleRecord,
      // 
      Delete,
      Edit,
      Search,
      // 导入
      importDialogVisible,
      fileList,
      changeFile,
    }
  },
})
</script>
