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
    <el-form ref="form" :model="formData" label-width="150px">
      <el-row type="flex" :gutter="20" justify="center">
        <el-col :span="8">
          <el-form-item label="事件名称">
            <el-input
              v-model="formData.entryId"
              placeholder="请输入"
              size="small"
              clearable
              disabled
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
        <el-col :span="24" style="min-height: 200px">
          <el-form-item label="图片上传">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
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
          >确认</el-button
        >
        <el-button type="primary" @click="handleBack" size="small" icon="el-icon-lx-back"
          >返回</el-button
        >
      </div>
    </el-row>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const formData = reactive({})
    let id = null
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
    const tagsList = computed(() => store.state.tagsList)
    console.log(tagsList.value)
    const getDetail = (id) => {
      console.log(
        `isNew为${id},点击按钮为${route.query.operation == 1 ? '查看' : '编辑'}`
      )
    }
    const handleBack = () => {
      router.go(-1)
    }
    onMounted(() => {
      getDetail(route.query.id)
    })
    return {
      formData,
      tableData,
      route,
      handleBack,
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
