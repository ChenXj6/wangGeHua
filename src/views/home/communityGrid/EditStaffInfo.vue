<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="cascades"></i>
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
      <template v-slot:status>
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.officeCode" @update:dataForm="handleTreeSelectChange" style="width:100%">
            <template v-slot>
              <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </template>
      <template v-slot:remarks>
        <el-row>
          <el-col :span="24" class="menu-header">
            <span><B>网格力量</B></span>
            <span><el-button v-if="route.query.operation == 3" type="primary" size="small" @click="addList">添加行</el-button></span>
          </el-col>
          <el-col :span="24">
            <el-form ref="form" :disabled="route.query.operation == 1" :model="dataForm" label-width="80px">
              <el-table
                :data="dataForm.info"
                size="small"
                style="width: 100%">
                <el-table-column
                  prop="prop"
                  label="网格力量类型">
                  <template #default="scope">
                    
                    <el-select
                      v-model="scope.row.type"
                      placeholder="请选择力量类型"
                      size="small"
                      key="1017"
                      @focus="()=>{querySearchAsync('1017')}"
                      clearable
                      :loading="loading"
                    >
                      <el-option
                        v-for="i in options['1017']"
                        :label="i.label"
                        :value="i.value"
                        :key="i.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="prop"
                  label="姓名" >
                  <template #default="scope">
                    <el-input v-model="scope.row.name" size="small" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="prop"
                  label="身份证号" >
                  <template #default="scope">
                    <el-input v-model="scope.row.idcard" size="small" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="prop"
                  label="电话" >
                  <template #default="scope">
                    <el-input v-model="scope.row.phone" size="small" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  prop="prop"
                  label="职位" >
                  <template #default="scope">
                    <el-input v-model="scope.row.position" size="small" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="prop"
                  label="性别">
                  <template #default="scope">
                    <el-select
                      v-model="scope.row.gender"
                      placeholder="请选择性别"
                      size="small"
                      key="1009"
                      @focus="()=>{querySearchAsync('1009')}"
                      clearable
                      :loading="loading"
                    >
                      <el-option
                        v-for="i in options['1009']"
                        :label="i.label"
                        :value="i.value"
                        :key="i.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="prop"
                  label="种类">
                  <template #default="scope">
                    <el-select
                      v-model="scope.row.category"
                      placeholder="请选择力量种类"
                      size="small"
                      key="1018"
                      @focus="()=>{querySearchAsync('1018')}"
                      clearable
                      :loading="loading"
                    >
                      <el-option
                        v-for="i in options['1018']"
                        :label="i.label"
                        :value="i.value"
                        :key="i.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="prop"
                  label="政治面貌">
                  <template #default="scope">
                    <el-input v-model="scope.row.politicsstatus" size="small" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column v-if="route.query.operation == 3 " label="操作" min-width="30">
                  <template #default="scope">
                    <el-popconfirm title="确定要删除吗？" @confirm="removeBtn(scope.$index)">
                      <template #reference>
                        <el-button
                          size="small"
                          icon="delete"
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
          icon="back"
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

import { renderTable } from './common/EditStaffInfo'
import { savePeopleInfo,editPeopleInfo } from '@/api/communityGrid/staffInfo'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList,getSmallOrganList } from '@/api/sys/organ'
import { isNull } from '@/utils/util'

import { searchDict } from '@/api/sys/dict'
export default {
  name:'EditActual',
  mixins: [mixin],
  components:[PopupTreeInput],
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { InfoFormConfig } = renderTable.call(proxy)
    let dataForm = reactive({
      id:'',
      remarks:'',
      officeCode:'',
      officeName:'',
      info:[
        {
          type:'',
          name:'',
          idcard:'',
          phone:'',
          position:'',
          gender:'',
          category:'',
          politicsstatus:'',
        }
      ],
    })
    let timer = ref(new Date().getTime())
    // selete 联想功能
    const loading = ref(false)
    const options = reactive({})
    const resetFormat = (data) => {
      let arr = []
      data.forEach(v=>{
        let obj = {}
        obj.label = v.description
        obj.value = String(v.value)
        arr.push(obj)
      })
      return arr
    }
    const querySearchAsync = (basictype) => {
      if(basictype){
        loading.value = true
        searchDict({basictype}).then(res=>{
          if(res.resCode == '000000' && res.data){
            options[basictype] = resetFormat(res.data)
            loading.value = false
          }else{
            options[basictype] = []
            loading.value = false
          }
        })
      }else{
        options[basictype] = []
      }
    }
    // 组织结构 功能
    const getSOList = (officeCode) => {
      getSmallOrganList({officeCode}).then(res=>{
        if(!dataForm.officeName && dataForm.officeCode == res.data[0].officeCode){
          dataForm.officeName = res.data[0].officeName
        }
        if(res.resCode == '000000' && !isNull(res.data)){
          res.data.forEach(v => {
            if(v.officeType == 2){
              dataForm.areaName = v.officeName
              dataForm.qbm = v.officeCode
            } else if (v.officeType == 3){
              dataForm.streetName = v.officeName
              dataForm.jdbm = v.officeCode
            } else if (v.officeType == 4){
              dataForm.communityName = v.officeName
              dataForm.sqbm = v.officeCode
            } else if (v.officeType == 5){
              dataForm.name = v.officeName
              dataForm.wgbm = v.officeCode
            }
          })
        }
      })
    }
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      dataForm.officeCode = officeCode
      dataForm.officeName = officeName
      getSOList(officeCode)
    }
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
    // 提交
    const handleSave = () => {
      return new Promise((resolve,reject)=>{
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
          dataForm.type = dataForm.info[0].type
          dataForm.name = dataForm.info[0].name
          dataForm.idcard = dataForm.info[0].idcard
          dataForm.phone = dataForm.info[0].phone
          dataForm.position = dataForm.info[0].position
          dataForm.gender = dataForm.info[0].gender
          dataForm.category = dataForm.info[0].category
          dataForm.politicsstatus = dataForm.info[0].politicsstatus
          delete dataForm.info
            editPeopleInfo(dataForm).then(res=>{
            if(res.resCode === '000000'){
              resolve(res.message)
            } else {
              reject(res.resCode)
            }
          })
        } else {
            savePeopleInfo(dataForm).then(res=>{
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
        type:'',
        name:'',
        idcard:'',
        phone:'',
        position:'',
        gender:'',
        category:'',
        politicsstatus:'',
      }
      if(!dataForm.info) {
        dataForm.info = []
      }
      dataForm.info.push(obj)
    }
    const removeBtn = (ind) => {
      dataForm.info.splice(ind,1)
    }
    const formHandle = {
      span:22,
      textAlign: 'right',
      btns: [
        {type:'primary',label:'确认',key:'sub',icon:'CircleCheck',handle:handleSubmit},
        {type:'primary',label:'返回',key:'back',icon:'ArrowLeft',handle:handleBack},
      ]
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
    route.query.operation != 3 && (formatReset(JSON.parse(decodeURIComponent(route.query.data)),dataForm),getSOList(dataForm?.officeCode))
    onMounted(() => {
      route.query.operation === 3 &&( dataForm = {})
    })
    querySearchAsync('1017')
    querySearchAsync('1018')
    querySearchAsync('1009')
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      InfoFormConfig,
      formHandle,
      addList,
      removeBtn,
      // 组织结构选择
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      // selete 联想
      loading,
      options,
      querySearchAsync,
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
