<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="cascades"></i>
          {{ route.query.operation == 1 ? '查看' : (route.query.operation == 2 ? '编辑' : '添加') }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px">
      <hr />
    </div>
    <VForm v-if="route.query.type == 'Drug'" :form-data="DrugFormConfig"
      :isDisabled="route.query.operation == 1" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:tree>
        <el-select v-model="dataForm.streetCode" size="small" clearable placeholder="请选择街道"
          @change="(val) => { handleChange(1, val, true) }">
          <el-option v-for="item in streetNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:communityCode>
        <el-select v-model="dataForm.communityCode" size="small" clearable placeholder="请选择社区"
          @change="(val) => { handleChange(2, val, true) }">
          <el-option v-for="item in communityNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:officeCode>
        <el-select v-model="dataForm.officeCode" size="small" clearable placeholder="请选择网格"
          @change="(val) => { handleChange(3, val, true), handleGetBuild(1, val, true) }">
          <el-option v-for="item in gridNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:buildingId>
        <el-select v-model="dataForm.buildingId" size="small" clearable placeholder="请选择楼栋"
          @change="(val) => { handleGetBuild(2, val, true), handleGetHouse(1, val, true) }">
          <el-option v-for="item in buildingOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:house>
        <el-select v-model="dataForm.houseId" size="small" clearable placeholder="请选择房屋"
          @change="(val) => { handleGetHouse(2, val, true) }">
          <el-option v-for="item in houseOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'Release'" :form-data="ReleaseFormConfig"
      :isDisabled="route.query.operation == 1" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:tree>
        <el-select v-model="dataForm.streetCode" size="small" clearable placeholder="请选择街道"
          @change="(val) => { handleChange(1, val, true) }">
          <el-option v-for="item in streetNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:communityCode>
        <el-select v-model="dataForm.communityCode" size="small" clearable placeholder="请选择社区"
          @change="(val) => { handleChange(2, val, true) }">
          <el-option v-for="item in communityNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:officeCode>
        <el-select v-model="dataForm.officeCode" size="small" clearable placeholder="请选择网格"
          @change="(val) => { handleChange(3, val, true), handleGetBuild(1, val, true) }">
          <el-option v-for="item in gridNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:buildingId>
        <el-select v-model="dataForm.buildingId" size="small" clearable placeholder="请选择楼栋"
          @change="(val) => { handleGetBuild(2, val, true), handleGetHouse(1, val, true) }">
          <el-option v-for="item in buildingOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:house>
        <el-select v-model="dataForm.houseId" size="small" clearable placeholder="请选择房屋"
          @change="(val) => { handleGetHouse(2, val, true) }">
          <el-option v-for="item in houseOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'Rrectify'" :form-data="RrectifyFormConfig"
      :isDisabled="route.query.operation == 1" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:tree>
        <el-select v-model="dataForm.streetCode" size="small" clearable placeholder="请选择街道"
          @change="(val) => { handleChange(1, val, true) }">
          <el-option v-for="item in streetNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:communityCode>
        <el-select v-model="dataForm.communityCode" size="small" clearable placeholder="请选择社区"
          @change="(val) => { handleChange(2, val, true) }">
          <el-option v-for="item in communityNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:officeCode>
        <el-select v-model="dataForm.officeCode" size="small" clearable placeholder="请选择网格"
          @change="(val) => { handleChange(3, val, true), handleGetBuild(1, val, true) }">
          <el-option v-for="item in gridNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:buildingId>
        <el-select v-model="dataForm.buildingId" size="small" clearable placeholder="请选择楼栋"
          @change="(val) => { handleGetBuild(2, val, true), handleGetHouse(1, val, true) }">
          <el-option v-for="item in buildingOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:house>
        <el-select v-model="dataForm.houseId" size="small" clearable placeholder="请选择房屋"
          @change="(val) => { handleGetHouse(2, val, true) }">
          <el-option v-for="item in houseOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'Petition'" :form-data="PetitionFormConfig"
      :isDisabled="route.query.operation == 1" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:tree>
        <el-select v-model="dataForm.streetCode" size="small" clearable placeholder="请选择街道"
          @change="(val) => { handleChange(1, val, true) }">
          <el-option v-for="item in streetNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:communityCode>
        <el-select v-model="dataForm.communityCode" size="small" clearable placeholder="请选择社区"
          @change="(val) => { handleChange(2, val, true) }">
          <el-option v-for="item in communityNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:officeCode>
        <el-select v-model="dataForm.officeCode" size="small" clearable placeholder="请选择网格"
          @change="(val) => { handleChange(3, val, true), handleGetBuild(1, val, true) }">
          <el-option v-for="item in gridNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:buildingId>
        <el-select v-model="dataForm.buildingId" size="small" clearable placeholder="请选择楼栋"
          @change="(val) => { handleGetBuild(2, val, true), handleGetHouse(1, val, true) }">
          <el-option v-for="item in buildingOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:house>
        <el-select v-model="dataForm.houseId" size="small" clearable placeholder="请选择房屋"
          @change="(val) => { handleGetHouse(2, val, true) }">
          <el-option v-for="item in houseOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'Mentaldisorders'" :form-data="MentaldisordersFormConfig"
      :isDisabled="route.query.operation == 1" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:tree>
        <el-select v-model="dataForm.streetCode" size="small" clearable placeholder="请选择街道"
          @change="(val) => { handleChange(1, val, true) }">
          <el-option v-for="item in streetNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:communityCode>
        <el-select v-model="dataForm.communityCode" size="small" clearable placeholder="请选择社区"
          @change="(val) => { handleChange(2, val, true) }">
          <el-option v-for="item in communityNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:officeCode>
        <el-select v-model="dataForm.officeCode" size="small" clearable placeholder="请选择网格"
          @change="(val) => { handleChange(3, val, true), handleGetBuild(1, val, true) }">
          <el-option v-for="item in gridNameOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:buildingId>
        <el-select v-model="dataForm.buildingId" size="small" clearable placeholder="请选择楼栋"
          @change="(val) => { handleGetBuild(2, val, true), handleGetHouse(1, val, true) }">
          <el-option v-for="item in buildingOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:house>
        <el-select v-model="dataForm.houseId" size="small" clearable placeholder="请选择房屋"
          @change="(val) => { handleGetHouse(2, val, true) }">
          <el-option v-for="item in houseOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <el-row v-if="route.query.operation == 1">
      <div class="btn-box">
        <el-button type="primary" @click="handleBack"  textAlign="right" size="small" icon="back">返回</el-button>
      </div>
    </el-row>
    <!-- <el-row v-if="route.query.operation == 2">
      <div class="btn-box">
        <el-button type="primary" @click="Examine" size="small" icon="back">审核</el-button>
      </div>
    </el-row> -->
    <!-- 地图弹窗 -->
    <el-dialog width="37.5%" v-model="mapDialogVisible">
      <VMap @getLatAndLng="getLatAndLng" :lng="dataForm.longitude" :lat="dataForm.latitude" />
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import mixin from '@/mixins/tagView.js'
import { listAssign } from '@/utils/util'

import { renderTable } from './common/Edit'
import { saveDrug, editDrug } from '@/api/ManagementPersonnel/drugPer'
import { saveMental, editMental } from '@/api/ManagementPersonnel/mentaldisordersPer'
import { savePetition, editPetition } from '@/api/ManagementPersonnel/petitionStaff'
import { saveRectify, editRectify } from '@/api/ManagementPersonnel/rectifyStaff'
import { saveRelease, editRelease } from '@/api/ManagementPersonnel/releasePer'
import { getSubClass, getBuildClass, getHouseClass } from '@/api/ActualInfo/build'
import { updateStatus } from '@/api/ManagementPersonnel/drugPer'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { searchDict } from '@/api/sys/dict'
import { getOrganList } from '@/api/sys/organ'


export default {
  name: 'EditActual',
  mixins: [mixin],
  components: { PopupTreeInput },
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { MentaldisordersFormConfig,PetitionFormConfig,RrectifyFormConfig,ReleaseFormConfig,DrugFormConfig } = renderTable.call(proxy)
    let dataForm = ref({})
    const table1 = ref(null)
    const table2 = ref(null)
    const table3 = ref(null)
    let timer = ref(new Date().getTime())
    let popupTreeData = ref([])
    const streetNameOptions = ref([
      { label: '工人新村北村街道', value: '370105004' },
      { label: '工人新村南村街道', value: '370105005' },
    ])
    const communityNameOptions = ref([])
    const gridNameOptions = ref([])
    const buildingOptions = ref([])
    const houseOptions = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    }

    const handleTreeSelectChange = ({ officeCode, officeName }) => {
      dataForm.officeCode = officeCode
      dataForm.officeName = officeName
    }
    // flag： 1 组织结构的数据处理、2 楼栋信息数据格式处理、 3 房屋信息数据格式处理
    const resetFormat = (data, options, flag = 1) => {
      if (data.length == 0) return options.value = []
      let arr = []
      data.forEach(v => {
        let obj = {}
        if (flag == 1) {
          obj.label = v.officeName
          obj.value = v.officeCode
        } else if (flag == 2) {
          obj.label = `${v.villageName}-${v.buildingNumber}`
          obj.value = v.id
        } else if (flag == 3) {
          obj.label = `${v.unitNumber}-${v.houseNumber}`
          obj.value = v.id
        }
        arr.push(obj)
      })
      options.value = arr
    }
    // trigMode 用来区分是编辑初始化还是自己手动触发的
    const handleChange = (type, parentCode, trigMode = false) => {
      if (type == 1) {
        (!dataForm.value.streetName || trigMode) && (dataForm.value.streetName = streetNameOptions.value.filter((obj) => obj.value == parentCode)[0].label)
        subClass(1, parentCode, trigMode)
      } else if (type == 2) {
        (!dataForm.value.communityName || trigMode) && (dataForm.value.communityName = communityNameOptions.value.filter((obj) => obj.value == parentCode)[0].label)
        subClass(2, parentCode, trigMode)
      } else {
        (!dataForm.value.officeName || trigMode) && (dataForm.value.officeName = gridNameOptions.value.filter((obj) => obj.value == parentCode)[0].label)
        subClass(3, parentCode, trigMode)
      }
    }
    // 网格下拉框change事件 触发获取楼栋信息
    const handleGetBuild = (type, parentCode, trigMode = false) => {
      if (type == 1) {
        buildClss(type, parentCode, trigMode)
      } else {
      }
    }
    // 街道获取社区 、 社区获取网格
    const subClass = (type, parentCode, trigMode) => {
      getSubClass({ parentCode }).then(res => {
        if (res.resCode === "000000") {
          if (type == 1) {
            if (trigMode) {
              dataForm.value.communityName = ''
              dataForm.value.communityCode = ''
              dataForm.value.officeName = ''
              dataForm.value.officeCode = ''
              communityNameOptions.value = []
              gridNameOptions.value = []
                dataForm.value.buildingId = ''
                buildingOptions.value = []
                dataForm.value.houseId = ''
                houseOptions.value = []
            }
            resetFormat(res.data, communityNameOptions)
          } else if (type == 2) {
            if (trigMode) {
              dataForm.value.officeName = ''
              dataForm.value.officeCode = ''
              gridNameOptions.value = []
                dataForm.value.buildingId = ''
                buildingOptions.value = []
                dataForm.value.houseId = ''
                houseOptions.value = []
            }
            resetFormat(res.data, gridNameOptions)
          } else if (type == 3) {
            if (trigMode) {
                dataForm.value.buildingId = ''
                buildingOptions.value = []
                dataForm.value.houseId = ''
                houseOptions.value = []
            }
          }
        }
      })
    }
    // 网格获取楼栋
    const buildClss = (type, gridCode, trigMode) => {
      getBuildClass({ gridCode }).then(res => {
        if (res.resCode == '000000') {
          if (trigMode && type == 1) {
            dataForm.value.buildingId = ''
            buildingOptions.value = []
          }
          resetFormat(res.data, buildingOptions, 2)
        }
      })
    }
    const houseClass = (type, buildingId, trigMode) => {
      getHouseClass({ buildingId }).then(res => {
        if (res.resCode == '000000') {
          if (trigMode && type == 1) {
            dataForm.value.houseId = ''
            houseOptions.value = []
          }
          resetFormat(res.data, houseOptions, 3)
          console.log(houseOptions.value,'....')
        }
      })
    }
    // 楼栋获取房屋
    const handleGetHouse = (type,buildingId, trigMode = false) => {
      if (type == 1) {
        houseClass(type,buildingId,trigMode)
      } else {
      }
    }
    
    // 提交
    const handleSave = () => {
      return new Promise((resolve, reject) => {
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
          // dataForm.value.villageName == null
          if (route.query.type == 'Drug') {
            delete dataForm.value.buildingNumber
            delete dataForm.value.villageName
            delete dataForm.value.unitNumber
            delete dataForm.value.houseNumber
            editDrug(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
          if (route.query.type == 'Release') {
            delete dataForm.value.buildingNumber
            delete dataForm.value.villageName
            delete dataForm.value.unitNumber
            delete dataForm.value.houseNumber
            editRelease(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
          if (route.query.type == 'Rrectify') {
            delete dataForm.value.buildingNumber
            delete dataForm.value.villageName
            delete dataForm.value.unitNumber
            delete dataForm.value.houseNumber
            editRectify(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
          if (route.query.type == 'Petition') {
            delete dataForm.value.buildingNumber
            delete dataForm.value.villageName
            delete dataForm.value.unitNumber
            delete dataForm.value.houseNumber
            editPetition(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
          if (route.query.type == 'Mentaldisorders') {
            delete dataForm.value.buildingNumber
            delete dataForm.value.villageName
            delete dataForm.value.unitNumber
            delete dataForm.value.houseNumber
            editMental(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
        } else {
          dataForm.value.countyCode = '370105'
          dataForm.value.countyName = '天桥区'
          // dataForm.value.isState = '0'
          if (route.query.type == 'Drug') {
            saveDrug(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
           if (route.query.type == 'Release') {
            saveRelease(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
           if (route.query.type == 'Rrectify') {
            saveRectify(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
           if (route.query.type == 'Petition') {
            savePetition(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
           if (route.query.type == 'Mentaldisorders') {
            saveMental(dataForm.value).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
        }
      })
    }
    const handleSubmit = (formRef) => { 
      formRef.validate((vaild) => {
        if (vaild) {
          handleSave().then(res => {
            proxy.$message.success(`${route.query.operation == 2 ? '编辑' : '添加'}成功`)
            delCurrentTag(route)
          }).catch(err => {
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
    const Examine = () => {
      updateStatus.then(request => {
        dataForm.value.isState = request.data
      })
    }
    
    const formHandle = {
      span: 22,
      textAlign: 'right',
      btns: [
        { type: 'primary', label: '确认', key: 'sub', icon: 'CircleCheck', handle: handleSubmit },
        { type: 'primary', label: '返回', key: 'back', icon: 'ArrowLeft', handle: handleBack },
      ]
    }
    // 表格相關操作5
    const handleQueryTable = () => {
      table1.value.getTableData({}, (res) => {
        // const data = res.data || []
        tableConfig.data = tableData
      })
    }

    // 获取经纬度
    const mapDialogVisible = ref(false)
    const handleClick = () => {
      mapDialogVisible.value = true
    }
    if (route.query.operation != 3) {
      dataForm.value = JSON.parse(decodeURIComponent(route.query.data))
      if (route.query.type == 'Drug') {
        handleChange(1, dataForm.value.streetCode)
        handleChange(2, dataForm.value.communityCode)
        handleChange(3)
        handleGetBuild(1, dataForm.value.officeCode)
        handleGetHouse(1, dataForm.value.buildingId)
      }else if(route.query.type == 'Release'){
        handleChange(1, dataForm.value.streetCode)
        handleChange(2, dataForm.value.communityCode)
        handleChange(3)
        handleGetBuild(1, dataForm.value.officeCode)
        handleGetHouse(1, dataForm.value.buildingId)
      }else if(route.query.type == 'Rrectify'){
        handleChange(1, dataForm.value.streetCode)
        handleChange(2, dataForm.value.communityCode)
        handleChange(3)
        handleGetBuild(1, dataForm.value.officeCode)
        handleGetHouse(1, dataForm.value.buildingId)
      }else if(route.query.type == 'Mentaldisorders'){
        handleChange(1, dataForm.value.streetCode)
        handleChange(2, dataForm.value.communityCode)
        handleChange(3)
        handleGetBuild(1, dataForm.value.officeCode)
        handleGetHouse(1, dataForm.value.buildingId)
      }else if(route.query.type == 'Petition'){
        handleChange(1, dataForm.value.streetCode)
        handleChange(2, dataForm.value.communityCode)
        handleChange(3)
        handleGetBuild(1, dataForm.value.officeCode)
        handleGetHouse(1, dataForm.value.buildingId)
      }
    }
    const getLatAndLng = ({ lat, lng }) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      dataForm.longitude = lng.toFixed(6)
      dataForm.latitude = lat.toFixed(6)
      mapDialogVisible.value = false
    }
    onBeforeMount(() => {
      timer.value = new Date().getTime()
    })
    route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)), delete dataForm.value.treeNames)

    onMounted(() => {
      route.query.operation === 3 && (dataForm = {})
      // handleQueryTable()
    })


    return {
      dataForm,
      route,
      table1,
      table2,
      table3,
      handleBack,
      handleSubmit,
      DrugFormConfig,
      ReleaseFormConfig,
      RrectifyFormConfig,
      PetitionFormConfig,
      MentaldisordersFormConfig,
      streetNameOptions,
      communityNameOptions,
      gridNameOptions,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      handleGetHouse,
      handleChange,
      handleGetBuild,
      buildingOptions,
      houseOptions,
      popupTreeData,
      // 获取经纬度
      mapDialogVisible,
      handleClick,
      getLatAndLng,
      Examine,
    }
  },
}
</script>
<style lang="scss" scoped>
.edit-content {
  padding-bottom: 20px;
}

.btn-box {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
