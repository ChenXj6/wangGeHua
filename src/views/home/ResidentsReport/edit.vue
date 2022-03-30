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
    <el-form
      ref="formRef"
      :model="formData"
      :disabled="route.query.operation == 1"
      :rules="rules"
      label-width="150px"
    >
      <el-row type="flex" :gutter="20" justify="center">
        <el-col :span="8">
          <el-form-item label="事件名称" prop="entryId">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件发生时间">
            <el-input
              v-model="formData.entryId"
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
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件经/纬度">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事件类别">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-select
                  v-model="formData.region"
                  size="small"
                  placeholder="please select your zone"
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-col>
              <el-col :span="12">
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
          <el-form-item label="事件规模">
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
        <el-col :span="8">
          <el-form-item label="涉及人数">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要当事人名称">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要当事人证件号码">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要当事人地址">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="24">
          <el-form-item label="事情简述" prop="entryId">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="formData.entryId"
            >
            </el-input>
          </el-form-item>
        </el-col>
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
              v-model="textarea2"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
    <el-row>
      <div class="btn-box">
        <el-button
          v-if="route.query.operation != 1"
          type="primary"
          size="small"
          icon="el-icon-lx-roundcheck"
          @click="handleSubmit"
          >确认</el-button
        >
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
import { getCurrentInstance, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'
export default {
  mixins: [mixin],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const {
      proxy: { $message },
    } = getCurrentInstance()
    const formRef = ref(null)

    const fileList = ref([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)

    let id = null
    const formData = reactive({})
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

    const getDetail = (id) => {
      console.log(
        `isNew为${id},点击按钮为 ${
          route.query.operation == 1 ? '查看' : '编辑'
        }`
      )
    }
    // upload
    const handlePreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }
    // 
    const handleSubmit = async () => {
      await formRef.value.validate((vaild) => {
        if (vaild) {
          $message.success('编辑成功')
          delCurrentTag(route)
        } else {
          return
        }
      })
    }
    const handleBack = () => {
      delCurrentTag(route)
    }
    onMounted(() => {
      // getDetail(route.query.id)
    })
    return {
      formData,
      formRef,
      rules,
      tableData,
      route,
      handleBack,
      handleSubmit,
      fileList,
      dialogVisible,
      dialogImageUrl,
      handlePreview,
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
