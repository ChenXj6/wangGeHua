<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{ route.query.operation == 1 ? '查看' : ( route.query.operation == 2 ? '编辑' : '添加' ) }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <el-row :gutter="10">
      <el-col :span="24" class="">
        <span><B>基本信息</B></span>
      </el-col>
    </el-row>
    <VForm :key="timer" :isDisabled="route.query.operation == 1" :form-data="InfoFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <el-form-item label="组织结构">
          <!-- <el-input v-if="dataForm.streeName" size="mini" disabled v-model="dataForm.streeName"></el-input>
          <el-input v-else-if="dataForm.communityName" size="mini" disabled v-model="dataForm.communityName"></el-input>
          <el-input v-else size="mini" disabled v-model="dataForm.gridName"></el-input> -->
          <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
        </el-form-item>
      </template>
      <template v-slot:remarks>
        <el-row>
          <el-col :span="24" class="menu-header">
            <span><B>边界信息</B></span>
            <span v-if="route.query.operation == 3"><el-button type="primary" size="mini" @click="addList">添加行</el-button></span>
          </el-col>
          <el-col :span="24">
            <el-form ref="form" :disabled="route.query.operation == 1" :model="dataForm" label-width="80px">
              <el-table
                :data="dataForm.info"
                size="mini"
                style="width: 100%">
                <el-table-column
                  prop="borderScope"
                  label="边界范围">
                  <template #default="scope">
                    <el-input v-model="scope.row.borderScope" size="mini" placeholder="请输入边界信息"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="borderColor"
                  label="边界颜色">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="18"><el-input v-model="scope.row.borderColor" size="mini" placeholder="请输入边界颜色"></el-input></el-col>
                      <el-col :span="6"><el-color-picker v-model="scope.row.borderColor" size="mini" color-format="hex"/></el-col>
                    </el-row>                    
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fillColor"
                  label="填充颜色">
                  <template #default="scope">
                    <el-row>
                      <el-col :span="18"><el-input v-model="scope.row.fillColor" size="mini" placeholder="请输入边界颜色"></el-input></el-col>
                      <el-col :span="6"><el-color-picker v-model="scope.row.fillColor" size="mini" color-format="hex"/></el-col>
                    </el-row>                    
                  </template>
                </el-table-column>
                <el-table-column
                  prop="longitude"
                  label="中心点">
                  <template #default="scope">
                    <el-input v-model="scope.row.longitude" size="mini" placeholder="请输入中心点"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="30">
                  <template #default="scope">
                    <el-popconfirm title="确定要删除吗？" @confirm="removeBtn(scope.$index)">
                      <template #reference>
                        <el-button
                          size="small"
                          icon="el-icon-lx-delete"
                          circle
                          type="danger"
                        />
                      </template>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-col>
        </el-row>
      </template>
    </VForm>
    
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
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'

import { renderTable } from './common/EditBorderInfo'
import { saveBorderInfo,editBorderInfo } from '@/api/communityGrid/borderInfo'
import { defaultObject } from '@/utils/util'
import { getOrganList } from '@/api/sys/organ'
export default {
  name:'EditActual',
  mixins: [mixin],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { InfoFormConfig } = renderTable.call(proxy)
    // const rules = {
    //   borderScope:[
    //     { required: true, message: '请输入边界信息', trigger: 'blur'},
    //   ],
    //   borderColor:[
    //     { required: true, message: '请选择边界颜色', trigger: 'blur'},
    //   ],
    //   fillColor:[
    //     { required: true, message: '请选择填充颜色', trigger: 'blur'},
    //   ],
    //   longitude:[
    //     { required: true, message: '请输入中心点', trigger: 'blur'},
    //   ],
    // }
    let dataForm = reactive({
      id:'',
      gridBasicid:'',
      countyCode:'',
      countyName:'',
      streetCode:'',
      streeName:'',
      communityCode:'',
      communityName:'',
      info:[
        {
          borderScope:'',
          borderColor:'',
          fillColor:'',
          longitude:'',
        }
      ],
    })
    let timer = ref(new Date().getTime())
    // 提交
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
            dataForm.borderScope = dataForm.info[0].borderScope
            dataForm.borderColor = dataForm.info[0].borderColor
            dataForm.fillColor = dataForm.info[0].fillColor
            dataForm.longitude = dataForm.info[0].longitude
            delete dataForm.info
            editBorderInfo(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
            saveBorderInfo(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        }
      })
    }
    const handleSubmit = (formRef) => {
      formRef.validate((vaild) => {
        if (vaild) {
          handleSave().then(res=>{
            proxy.$message.success(`${route.query.operation == 2 ? '编辑' : '添加'}成功`)
            delCurrentTag(route)
          }).catch(err=>{
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
    const addList = () => {
      let obj = {
        borderScope:'',
        borderColor:'',
        fillColor:'',
        longitude:'',
      }
      if(!dataForm.info) {
        dataForm.info = []
      }
      dataForm.info.push(obj)
      console.log(dataForm)
    }
    const removeBtn = (ind) => {
      dataForm.info.splice(ind,1)
    }
    const formHandle = {
      span:22,
      textAlign: 'right',
      btns: [
        {type:'primary',label:'确认',key:'sub',icon:'el-icon-lx-roundcheck',handle:handleSubmit},
        {type:'primary',label:'返回',key:'back',icon:'el-icon-lx-back',handle:handleBack},
      ]
    }
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      dataForm.officeCode = officeCode
      dataForm.officeName = officeName
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    onBeforeMount(()=>{
      timer.value = new Date().getTime()
    })
    // 编辑时初始化格式
    const formatReset = (data,obj) => {
      Object.keys(obj).forEach((v)=>{
        if(Object.prototype.toString.call(obj[v]) == '[object Array]'){
          formatReset(data,obj[v][0])
        }else {
          obj[v] = data[v]
        }
      })
    }
    route.query.operation != 3 && (formatReset(JSON.parse(decodeURIComponent(route.query.data)),dataForm))
    getOList()
    onMounted(() => {
      route.query.operation === 3 &&( defaultObject(dataForm))
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      InfoFormConfig,
      formHandle,
      addList,
      removeBtn,
      // rules,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
    }
  },
}
</script>
<style lang="scss" scoped>
.edit-content{
  padding-bottom: 20px;
}
.btn-box {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
.menu-header{
  height: 50px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
