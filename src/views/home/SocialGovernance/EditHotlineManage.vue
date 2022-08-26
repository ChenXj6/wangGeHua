<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="cascades"></i>
          {{
            route.query.operation == 1
              ? '查看'
              : route.query.operation == 2
              ? '编辑'
              : route.query.operation == 3
              ? '添加'
              : route.query.operation == 4
              ? '审核'
              : route.query.operation == 5
              ? '接单/退回'
              : route.query.operation == 6
              ? '回单'
              : route.query.operation == 7
              ? '转派'
              : '撤回'
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
              size="small"
              :readonly="true"
              placeholder="点击选择机构"
              style="cursor: pointer"
            ></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:level1="">
        <el-select v-model="dataForm.level1" clearable size="small" placeholder="请选择一级分类" @change="handleChangelevel1">
          <el-option
            v-for="item in level1Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level2="">
        <el-select v-model="dataForm.level2" clearable :disabled="!dataForm.level1" size="small" placeholder="请选择二级分类" @change="handleChangelevel2">
          <el-option
            v-for="item in level2Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level3="">
        <el-select v-model="dataForm.level3" clearable :disabled="!dataForm.level2" size="small" placeholder="请选择三级分类" @change="handleChangelevel3">
          <el-option
            v-for="item in level3Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level4="">
        <el-select v-model="dataForm.level4" clearable :disabled="!dataForm.level3" size="small" placeholder="请选择四级分类" @change="handleChangelevel4">
          <el-option
            v-for="item in level4Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level5="">
        <el-select v-model="dataForm.level5" clearable :disabled="!dataForm.level4" size="small" placeholder="请选择五级分类">
          <el-option
            v-for="item in level5Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <VForm
      v-else-if="route.query.type == 'manage'"
      :key="timer"
      :isDisabled="true"
      :form-data="InfoFormConfig"
      :form-model="dataForm"
      :form-handle="{}"
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
      <template v-slot:level1="">
        <el-select v-model="dataForm.level1" clearable size="small" placeholder="请选择一级分类" @change="handleChangelevel1">
          <el-option
            v-for="item in level1Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level2="">
        <el-select v-model="dataForm.level2" clearable :disabled="!dataForm.level1" size="small" placeholder="请选择二级分类" @change="handleChangelevel2">
          <el-option
            v-for="item in level2Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level3="">
        <el-select v-model="dataForm.level3" clearable :disabled="!dataForm.level2" size="small" placeholder="请选择三级分类" @change="handleChangelevel3">
          <el-option
            v-for="item in level3Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level4="">
        <el-select v-model="dataForm.level4" clearable :disabled="!dataForm.level3" size="small" placeholder="请选择四级分类" @change="handleChangelevel4">
          <el-option
            v-for="item in level4Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level5="">
        <el-select v-model="dataForm.level5" clearable :disabled="!dataForm.level4" size="small" placeholder="请选择五级分类">
          <el-option
            v-for="item in level5Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <div v-if="route.query.operation == 1 || route.query.type == 'manage'">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="cascades"></i> 处理记录
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-table :data="tableData" border style="width: 100%" size="small">
        <el-table-column prop="dealBy" label="承办单位" />
        <el-table-column prop="orderType" label="工单标签" />
        <el-table-column prop="handleTime" label="办理时效(天)" />
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
            {{ formatterDate(scope.row.replyOrderDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="dealRemark" label="退回原因/回单内容" />
        <el-table-column prop="filePath" label="办理文件">
          <template #default="scope">
            <img :src="url + scope.row.filePath" alt="" style="width:100%">
          </template>
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
    <div v-if="(route.query.type == 'manage' && route.query.operation != 1)">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="cascades"></i> 12345事件处置
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-form ref="recordFormRef" :model="orderForm" label-width="150px">
        <!-- 审核 -->
        <el-form-item v-if="route.query.operation == 4" label="审核结果" prop="dealStatus">
          <el-select v-model="orderForm.verifyStatus" size="small" placeholder="请选择审核结果">
            <el-option
              v-for="item in dataSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 转派 -->
        <el-form-item v-if="(route.query.operation == 7 || (route.query.operation == 4 && orderForm.verifyStatus == 2))" label="工单类别" prop="dealRemark">
          <el-row :gutter="10">
            <el-col :span="18">
              <popup-tree-input
                :data="orderTreeData"
                :propa="orderTreeProps"
                :nodeKey="'' + orderForm.orderType"
                @update:dataForm="handleOrderTreeSelectChange"
              >
                <template v-slot>
                  <el-input
                    v-model="orderForm.orderName"
                    size="small"
                    :readonly="true"
                    placeholder="点击选择工单类别"
                    style="cursor: pointer"
                  ></el-input>
                </template>
              </popup-tree-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="(route.query.operation == 7 || (route.query.operation == 4 && orderForm.verifyStatus == 2))" label="承办单位" prop="dealRemark">
          <el-input
              v-model="orderForm.dealBy"
              size="small"
              placeholder=""
              @click="handleChangeLaunch"
            ></el-input>
        </el-form-item>
        <el-form-item v-if="route.query.operation == 4" label="审核意见" prop="dealRemark">
          <el-input v-model="orderForm.processingResults" type="textarea" size="small" placeholder=""></el-input>
        </el-form-item>
        <!-- 接单/退回 -->
        <el-form-item v-if="route.query.operation == 5" label="退回原因" prop="dealRemark">
          <el-input v-model="orderForm.remarks" type="textarea" size="small" placeholder=""></el-input>
        </el-form-item>
        <!-- 回单 -->
        <el-form-item v-if="route.query.operation == 6" label="处理内容" prop="dealRemark">
          <el-input v-model="orderForm.dealRemark" type="textarea" size="small" placeholder=""></el-input>
        </el-form-item>
        <el-form-item v-if="route.query.operation == 6" label="上传图片" prop="dealRemark">
          <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              accept="bmp,jpg,png,gif,webp,"
              list-type="picture-card"
              :on-change="(file,fileList) => changeFile(file,fileList)"
            >
              <i class="add"></i>
            </el-upload>
        </el-form-item>
        
        <!-- 撤回 -->
        <el-form-item v-if="route.query.operation == 8" label="撤回原因" prop="dealRemark">
          <el-input v-model="orderForm.remarks" type="textarea" size="small" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-row v-if="route.query.operation == 1 || route.query.type == 'manage'">
      <div class="btn-box">
        <el-button
          v-if="route.query.operation == 8"
          type="primary"
          @click="handleWithdraw(recordFormRef)"
          size="small"
          icon="CircleClose"
          >撤回</el-button
        >
        <el-button
          v-if="route.query.operation == 7"
          type="primary"
          @click="handleReass(recordFormRef)"
          size="small"
          icon="Share"
          >转派</el-button
        >
        <el-button
          v-if="route.query.operation == 6"
          type="primary"
          @click="handleReceipt(recordFormRef)"
          size="small"
          icon="Back"
          >回单</el-button
        >
        <el-button
          v-if="route.query.operation == 5"
          type="primary"
          @click="handleTake(recordFormRef)"
          size="small"
          icon="roundcheck"
          >接单</el-button
        >
        <el-button
          v-if="route.query.operation == 5"
          type="primary"
          @click="handleReturn(recordFormRef)"
          size="small"
          icon="Promotion"
          >退回</el-button
        >
        <el-button
          v-if="route.query.operation == 4"
          type="primary"
          @click="handleManage(recordFormRef)"
          size="small"
          icon="roundcheck"
          >处置</el-button
        >
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
  <!-- 图片预览 -->
  <el-dialog v-model="dialogVisible">
    <img
      :src="dialogImageUrl"
      alt="Preview Image"
      style="display: block; width: 50%; margin: 0 auto"
    />
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
import { getUserList } from "@/api/sys/user";
import { getTree } from '@/api/SocialGovernance/GridHotlineWorkOrder'
import { renderTable } from './common/edit'
import { getDictThTreeBy } from '@/api/sys/multilevel'
import {
  saveHotlineManage,
  editHotlineManage,
  getHotlineRecordList,
  takeOrder,
  recallOrder,
  dispatchOrder,
  receiptOrder,
  examineOrder,
} from '@/api/SocialGovernance/HotlineManage'
import PopupTreeInput from '@/components/PopupTreeInput/index.vue'
import { uploadApi } from '@/api/upload'
import { searchDict } from '@/api/sys/dict'
import { formatterDate,resetFormat as resetFormatStatus } from '@/utils/util'
import { getOrganList } from '@/api/sys/organ'

export default {
  name: 'editHotlineManage',
  mixins: [mixin],
  components: { PopupTreeInput },
  setup() {
    const route = useRoute()
    const url = ref(import.meta.env.VITE_IMG_BASE_API)
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
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
    // 分类
    const level1Options = ref([])
    const level2Options = ref([])
    const level3Options = ref([])
    const level4Options = ref([])
    const level5Options = ref([])
    const resetFormat = (data,option) => {
      let arr = []
      data.forEach(v=>{
        let obj = {}
        obj.label = v.name
        obj.value = String(v.id)
        arr.push(obj)
      })
      option.value = arr
    }
    const handleChangelevel1 = (flag = false) => {
      let id = dataForm.value.level1
      getDictThTreeByApi({id},level2Options)
      if(!flag){
        dataForm.value.level2 = ''
        dataForm.value.level3 = ''
        dataForm.value.level4 = ''
        dataForm.value.level5 = ''
      }
    }
    const handleChangelevel2 = (flag = false) => {
      let id = dataForm.value.level2
      if(!flag){
        dataForm.value.level3 = ''
        dataForm.value.level4 = ''
        dataForm.value.level5 = ''
      }
      getDictThTreeByApi({id},level3Options)
    }
    const handleChangelevel3 = (flag = false) => {
      let id = dataForm.value.level3
      if(!flag){
        dataForm.value.level4 = ''
        dataForm.value.level5 = ''
      }
      getDictThTreeByApi({id},level4Options)
    }
    const handleChangelevel4 = (flag = false) => {
      let id = dataForm.value.level4
      if(!flag){
        dataForm.value.level5 = ''
      }
      getDictThTreeByApi({id},level5Options)
    }
    const getDictThTreeByApi = (data,option) => {
      getDictThTreeBy(data).then(res=>{
        if(res.code == 200){
          resetFormat(res.data,option)
        }        
      })
    }
    getDictThTreeByApi({perms:'0004'},level1Options)
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
          icon: 'CircleCheck',
          handle: handleSubmit,
        },
        {
          type: 'primary',
          label: '返回',
          key: 'back',
          icon: 'ArrowLeft',
          handle: handleBack,
        },
      ],
    }
    // 事件处置弹窗
    const recordFormRef = ref(null);
    const eventHandleVisible = ref(false);
    const userDialogVisible = ref(false);
    const formData = ref(null);
    const dataSourceOptions = ref([]);
    const sexOptions = ref([]);
    const launchList = ref([]);
    const multipleSelection = ref([]);
    const rules = reactive({
      dealStatus: [
        { required: true, message: "请选择处置方式", trigger: "blur" },
      ],
      launchBy: [
        {
          required: true,
          message: "请选择流转人",
          trigger: ["change", "blur"],
        },
      ],
      dealRemark: [
        { required: true, message: "请输入处理意见", trigger: "blur" },
      ],
    });
    // 流转
    const handleChangeLaunch = () => {
      userDialogVisible.value = true;
      multipleSelection.value = [];
      dataForm.value.dealBy = "";
      handleQueryUserTable();
    };
    const handleQueryUserTable = () => {
      getUserList({ pageNum: 1, pageSize: 50 }).then((res) => {
        if (res.code == "200") {
          launchList.value = res.data.list;
        }
      });
    };
    const handleRowclick = (val) => {
      if(route.query.type == 'manage'){
        orderForm.value.dealBy = val.operatorName;
        orderForm.value.dealCode = val.operatorId;
      }else{
        dataForm.value.dealBy = val.operatorName;
        dataForm.value.dealCode = val.operatorId;
      }
      userDialogVisible.value = false
    }
    const handleRecord = async (formRef) => {

    };
    // 图片相关配置
    const fileList = ref([])
    const dialogVisible = ref(false)
    const dialogImageUrl = ref('')
    // 上传图片
    const changeFile = (file) => {
      if(file.size / 1024 / 1024 > 10){ 
        fileList.value = []
        proxy.$message.error('最大文件上传尺寸为10Mb')
        return
      }
      let fileFormData = new FormData();
      let currentFile = file.raw
      fileFormData.append('file',currentFile)
      fileFormData.append('fileName',file.name)
      uploadApi(fileFormData).then(res=>{
        if(res.resCode == '000000'){
          // fileList   
          // console.log((dataForm.value.certificates == null && dataForm.value.certificatesName == null) || (String(dataForm.value.certificates).length <= 0 && String(dataForm.value.certificatesName).length <= 0))      
          if((orderForm.value.filePath == null && orderForm.value.fileName == null) || (String(orderForm.value.filePath).length <= 0 && String(orderForm.value.fileName).length <= 0)){
            orderForm.value.filePath = res.message
            orderForm.value.fileName = file.name
          } else {
            let str = orderForm.value.filePath + ',' + res.message
            let nameStr = orderForm.value.fileName + ',' + file.name
            orderForm.value.filePath = str
            orderForm.value.fileName = nameStr
          }
          // console.log(dataForm.value.certificates,'///')
          proxy.$message.success('图片上传成功')
        } else {
          proxy.$message.success('图片上传失败')
        }
      })
    }
    // 删除图片
    const handleRemove = (val) => {
      if(fileList.value.length == 1){
        fileList.value = []
        orderForm.value.filePath = ''
        orderForm.value.fileName = ''
      }else{
        let certificatesArr = orderForm.value.filePath.split(',')
        let certificatesNameArr = orderForm.value.fileName.split(',')
        certificatesArr.forEach((v,ind) => {
          if(`${import.meta.env.VITE_IMG_BASE_API }${v}` == val.url && certificatesNameArr[ind] == val.name){
            certificatesArr.splice(ind,1)
            certificatesNameArr.splice(ind,1)
            orderForm.value.filePath = certificatesArr.join(',')
            orderForm.value.fileName = certificatesNameArr.join(',')
          }
        })
      }
    }
    // 图片回显
    const resetFileList = () => {
      if(orderForm.value.filePath == null ||  orderForm.value.filePath.length == 0 ) return
      let result = orderForm.value.filePath.indexOf(',')
      // console.log(result,'////')
      if(result != '-1'){
        let certificatesArr = orderForm.value.filePath.split(',')
        let certificatesNameArr = orderForm.value.fileName.split(',')
        certificatesArr.forEach((v,i) => {
          let obj = {
            name:certificatesNameArr[i],
            url:`${import.meta.env.VITE_IMG_BASE_API }${v}`
          }
          fileList.value.push(obj)
        })
      }else{
        let obj = {
          name:orderForm.value.fileName,
          url:`${import.meta.env.VITE_IMG_BASE_API }${orderForm.value.filePath}`
        }
        fileList.value.push(obj)
      }
    }
    // 图片预览
    const handlePreview = ({url}) => {
      dialogVisible.value = true
      dialogImageUrl.value = url
    }
    // 
    let orderTreeData = ref([])
    const orderTreeProps = {
      label: 'hotlineWorkOrderName',
      children: 'children',
    }
    const getOrderList = () => {
      getTree({}).then((res) => {
        if (res.resCode == '000000') {
          orderTreeData.value = res.data
        }
      })
    }
     const handleOrderTreeSelectChange = ({hotlineWorkOrderName,id}) => {
      orderForm.value.orderType = id
      orderForm.value.orderName = hotlineWorkOrderName
    }
    getOrderList()

    // 操作
    const orderForm = ref({})
    // 撤回
    const handleWithdraw = (formRef) => {
      orderForm.value.id = dataForm.value.id
      orderForm.value.recordId = dataForm.value.recordId
      formRef.validate((vaild) => {
        if (vaild) {
          recallOrder(orderForm.value)
            .then((res) => {
              if(res.resCode == '000000'){
                proxy.$message.success(
                  `撤单成功`
                )
                delCurrentTag(route)
              }
            })
            .catch((err) => {
              proxy.$message.warning(`操作失败，请稍后再试！`)
            })
        } else {
          return
        }
      })
    }
    // 转派
    const handleReass = (formRef) => {
      orderForm.value.id = dataForm.value.id
      orderForm.value.concludeTime = dataForm.value.concludeTime
      orderForm.value.receivingTime = dataForm.value.receivingTime
      // orderForm.value.recordId = dataForm.value.recordId
      delete orderForm.value.orderName
      formRef.validate((vaild) => {
        if (vaild) {
          dispatchOrder(orderForm.value)
            .then((res) => {
              if(res.resCode == '000000'){
                proxy.$message.success(
                  `转派成功`
                )
                delCurrentTag(route)
              }
            })
            .catch((err) => {
              proxy.$message.warning(`操作失败，请稍后再试！`)
            })
        } else {
          return
        }
      })
    }
    // 回单 
    const handleReceipt = (formRef) => {
      orderForm.value.id = dataForm.value.recordId
      formRef.validate((vaild) => {
        if (vaild) {
          receiptOrder(orderForm.value)
            .then((res) => {
              if(res.resCode == '000000'){
                proxy.$message.success(
                  `回单成功`
                )
                delCurrentTag(route)
              }
            })
            .catch((err) => {
              proxy.$message.warning(`操作失败，请稍后再试！`)
            })
        } else {
          return
        }
      })
    }
    // 接单 
    const handleTake = (formRef) => {
      orderForm.value.id = dataForm.value.id
      orderForm.value.recordId = dataForm.value.recordId
      formRef.validate((vaild) => {
        if (vaild) {
          orderForm.value.status = 4
          takeOrder(orderForm.value)
            .then((res) => {
              if(res.resCode == '000000'){
                proxy.$message.success(
                  `接单成功`
                )
                delCurrentTag(route)
              }
            })
            .catch((err) => {
              proxy.$message.warning(`操作失败，请稍后再试！`)
            })
        } else {
          return
        }
      })
    }
    // 退回 
    const handleReturn = (formRef) => {
      orderForm.value.id = dataForm.value.id
      orderForm.value.recordId = dataForm.value.recordId
      formRef.validate((vaild) => {
        if (vaild) {
          orderForm.value.status = 3
          takeOrder(orderForm.value)
            .then((res) => {
              if(res.resCode == '000000'){
                proxy.$message.success(
                  `退回成功`
                )
                delCurrentTag(route)
              }
            })
            .catch((err) => {
              proxy.$message.warning(`操作失败，请稍后再试！`)
            })
        } else {
          return
        }
      })
    }
    // 审核 处置  
    const handleManage = (formRef) => {
      orderForm.value.id = dataForm.value.id
      orderForm.value.recordId = dataForm.value.recordId
      formRef.validate((vaild) => {
        if (vaild) {
          examineOrder(orderForm.value)
            .then((res) => {
              if(res.resCode == '000000'){
                proxy.$message.success(
                  `审核成功`
                )
                delCurrentTag(route)
              }
            })
            .catch((err) => {
              proxy.$message.warning(`操作失败，请稍后再试！`)
            })
        } else {
          return
        }
      })
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
    getOptionsByCode(1070,dataSourceOptions);
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)))
    // console.log(dataForm.value,route.query.operation,';;;')
    if(route.query.operation == 1 || route.query.type == 'manage'){
      getRecordByEventId(true)
    }
    if( route.query.type == 'manage' || (route.query.operation == 1 || route.query.type == 'hotline')){
      handleChangelevel1(true)
      handleChangelevel2(true)
      handleChangelevel3(true)
      handleChangelevel4(true)
    }
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
      // 事件处置弹窗
      eventHandleVisible,
      dataSourceOptions,
      sexOptions,
      handleChangeLaunch,
      userDialogVisible,
      handleRecord,
      launchList,
      multipleSelection,
      rules,
      recordFormRef,
      // 上传图片
      fileList,
      changeFile,
      handleRemove,
      dialogVisible,
      dialogImageUrl,
      handlePreview,
      url,
      // 
      orderTreeProps,
      orderTreeData,
      handleOrderTreeSelectChange,
      handleRowclick,
      // 操作
      orderForm,
      handleWithdraw,
      handleReass,
      handleReceipt,
      handleTake,
      handleReturn,
      handleManage,
      // 多级分类
      level1Options,
      level2Options,
      level3Options,
      level4Options,
      level5Options,
      handleChangelevel1,
      handleChangelevel2,
      handleChangelevel3,
      handleChangelevel4,
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
