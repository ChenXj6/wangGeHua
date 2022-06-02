<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{ route.query.operation == 1 ? '查看' : '编辑' }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <!-- <el-form
      ref="formRef"
      :model="formData"
      :disabled="route.query.operation == 1"
      :rules="rules"
      label-width="150px"
    >
      <el-row type="flex" :gutter="20" justify="center">
        <el-col :span="8">
          <el-form-item label="事件名称" prop="eventName">
            <el-input
              v-model="formData.eventName"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件发生时间">
            <el-input
              v-model="formData.happenTime"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织结构">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-select
                  v-model="formData.region"
                  size="small"
                  placeholder="please select your zone"
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="formData.region"
                  size="small"
                  placeholder="please select your zone"
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="formData.region"
                  size="small"
                  placeholder="please select your zone"
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件发生地点">
            <el-input
              v-model="formData.eventLong"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件经/纬度">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-input
              v-model="formData.eventLat"
              placeholder="请输入"
              size="small"
              clearable
            />
              </el-col>
              <el-col :span="12">
                <el-input
              v-model="formData.eventLong"
              placeholder="请输入"
              size="small"
              clearable
            />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件类别">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-select
                  v-model="formData.mainPeopleFirstType"
                  size="small"
                  placeholder="please select your zone"
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-select
                  v-model="formData.mainPeopleSecondType"
                  size="small"
                  placeholder="please select your zone"
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件规模">
            <el-select
              v-model="formData.eventScope"
              size="small"
              placeholder="请选择事件规模"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="涉及人数">
            <el-input
              v-model="formData.aboutPeopleNum"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要当事人名称">
            <el-input
              v-model="formData.mainPeopleName"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要当事人证件号码">
            <el-input
              v-model="formData.mainPeopleCertificateNum"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要当事人地址">
            <el-input
              v-model="formData.mainPeopleAddress"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="24" style="min-height: 200px">
          <el-form-item label="图片上传">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture-card"
            >
              <i class="el-icon-lx-add"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事情简述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="formData.eventContent"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <VForm :isDisabled="route.query.operation == 1" :form-data="editFormConfig" :form-model="formData" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:longAndLat="">
        <el-row :gutter="10">
              <el-col :span="12">
                <el-input
              v-model="formData.eventLat"
              placeholder="请输入"
              size="small"
              clearable
            />
              </el-col>
              <el-col :span="12">
                <el-input
              v-model="formData.eventLong"
              placeholder="请输入"
              size="small"
              clearable
            />
              </el-col>
            </el-row>
      </template>
      <template v-slot:upload="">
        <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture-card"
            >
              <i class="el-icon-lx-add"></i>
            </el-upload>
      </template>
    </VForm>
    <div v-if="route.query.operation == 1">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 处置记录
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-bottom: 20px"><hr /></div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="date" label="发起人"> </el-table-column>
        <el-table-column prop="date" label="发起意见"> </el-table-column>
        <el-table-column prop="date" label="发起时间"> </el-table-column>
        <el-table-column prop="date" label="发起照片"> </el-table-column>
        <el-table-column prop="date" label="处置人"> </el-table-column>
        <el-table-column prop="date" label="处理意见" width="280px">
        </el-table-column>
        <el-table-column prop="date" label="处置时间"> </el-table-column>
        <el-table-column prop="date" label="处置照片"> </el-table-column>
        <el-table-column prop="name" label="处置状态"> </el-table-column>
      </el-table>
    </div>
    <el-row v-if="route.query.operation == 1">
      <div class="btn-box">
        <el-button
          type="primary"
          @click="handleBack"
          size="small"
          icon="el-icon-lx-back"
          >返回</el-button
        >
      </div>
    </el-row>
    <el-dialog v-model="dialogVisible">
      <img
        :src="dialogImageUrl"
        alt="Preview Image"
        style="display: block; width: 50%; margin: 0 auto"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'
import { listAssign,defaultObject } from '@/utils/util'
import {renderTable} from './common/edit'
import { editRecord } from '@/api/ResidentsReport/index'
export default {
  mixins: [mixin],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const {
      proxy,
    } = getCurrentInstance()
    const { editFormConfig } = renderTable.call(proxy)
    const fileList = ref([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    let formData = reactive({
      eventName:'',
      eventContent:'',
      happenTime:'',
      eventLong:'',
      eventLat:'',
      eventLong:'',
      mainPeopleFirstType:'',
      mainPeopleSecondType:'',
      eventScope:'',
      aboutPeopleNum:'',
      mainPeopleName:'',
      mainPeopleCertificateNum:'',
      mainPeopleAddress:'',
    })
    const rules = {
      entryId: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
    }
    const tableData = [
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
    ]
    // upload
    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }
    // 
    const handleSubmit = async (formRef) => {
      await formRef.validate((vaild) => {
        if (vaild) {
          editRecord(formData).then(res=>{
            if(res.resCode == '000000'){
              proxy.$message.success('编辑成功')
              delCurrentTag(route)
            }
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
      span:22,
      textAlign: 'right',
      btns: [
        {type:'primary',label:'确认',key:'sub',icon:'el-icon-lx-roundcheck',handle:handleSubmit},
        {type:'primary',label:'返回',key:'back',icon:'el-icon-lx-back',handle:handleBack},
      ]
    }
    // formData = JSON.parse(decodeURIComponent(route.query.data))
    route.query.operation != 3 && listAssign(formData,JSON.parse(decodeURIComponent(route.query.data)))
    console.log(formData,'...')
    onMounted(() => {
      
      // getDetail(route.query.id)
    })
    return {
      formData,
      tableData,
      route,
      handleBack,
      fileList,
      dialogVisible,
      dialogImageUrl,
      handlePreview,
      editFormConfig,
      formHandle,
    }
  },
}
</script>
<style lang="scss" scoped>
.btn-box {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
