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
    <VForm v-if="route.query.type == 'car'" :key="timer" :isDisabled="route.query.operation == 1"
      :form-data="CarFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'Charge'" :key="timer" :isDisabled="route.query.operation == 1"
      :form-data="ChargeFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:level1="">
        <el-select v-model="dataForm.type1" clearable size="small" placeholder="请选择一级分类" @change="handleChangelevel1">
          <el-option
            v-for="item in level1Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-slot:level2="">
        <el-select v-model="dataForm.type2" clearable :disabled="!dataForm.type1" size="small" placeholder="请选择二级分类">
          <el-option
            v-for="item in level2Options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'Manage'" :key="timer" :isDisabled="route.query.operation == 1"
      :form-data="ManageFormConfig" :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'Vehicle'" :key="timer" :isDisabled="route.query.operation == 1"
      :form-data="VehicleFormConfig" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'ParkLot'" :key="timer" :isDisabled="route.query.operation == 1"
      :form-data="ParkLotFormConfig" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.query.type === 'pubilc'" :isDisabled="route.query.operation == 1" :form-data="PubilcFormConfig"
      :form-model="dataForm" :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:eventLong="">
          <el-input
                  v-model="dataForm.longitude"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable                  
                  @click="handleClick"
                />
        </template>
      <template v-slot:eventLat="">
                <el-input
                  v-model="dataForm.latitude"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable
                  @click="handleClick"
                />
      </template>
    </VForm>
    <VForm v-if="route.query.type == 'rubbish'" :form-data="rubbishFormConfig"
      :isDisabled="route.query.operation == 1" :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="small" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:eventLong="">
          <el-input
                  v-model="dataForm.longitude"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable                  
                  @click="handleClick"
                />
        </template>
      <template v-slot:eventLat="">
                <el-input
                  v-model="dataForm.latitude"
                  placeholder="请点击获取经纬度"
                  size="small"
                  clearable
                  @click="handleClick"
                />
      </template>
    </VForm>
    <el-row v-if="route.query.operation == 1">
      <div class="btn-box">
        <el-button type="primary" @click="handleBack" size="small" icon="back">返回</el-button>
      </div>
    </el-row>
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
import { saveCarPark, editCarPark } from '@/api/SmartProperty/carPark'
import { savePubilc, editPubilc } from '@/api/SmartProperty/pubilc'
import { saveRubbish, editRubbish } from '@/api/SmartProperty/rubbish'
import { saveVehicle, editVehicle } from '@/api/SmartProperty/vehicle'
import { saveParkLot, editParkLot } from '@/api/SmartProperty/parkLot'
import { saveManage, editManage } from '@/api/SmartProperty/Manage'
import { saveCharge, editCharge } from '@/api/SmartProperty/Charge'

import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { getDictThTreeBy } from '@/api/sys/multilevel'
export default {
  name: 'EditActual',
  mixins: [mixin],
  components: { PopupTreeInput },
  setup() {
    const route = useRoute()
    const { delCurrentTag } = mixin.setup()
    const { proxy } = getCurrentInstance()
    const { CarFormConfig, PubilcFormConfig, rubbishFormConfig, VehicleFormConfig, ParkLotFormConfig,ChargeFormConfig,ManageFormConfig } = renderTable.call(proxy)
    let dataForm = reactive({
      officeCode: '',
      officeName: '',
      type1:'',
      type2:'',
    })
    let timer = ref(new Date().getTime())
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    }
    const handleTreeSelectChange = ({ officeCode, officeName }) => {
      dataForm.officeCode = officeCode
      dataForm.officeName = officeName
    }
    const getOList = () => {
      getOrganList({}).then(res => {
        if (res.resCode == '000000') {
          popupTreeData.value = res.data
        }
      })
    }
    getOList()
    // 提交
    const handleSave = () => {
      return new Promise((resolve, reject) => {
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
          if (route.query.type == 'car') {
            editCarPark(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } else if (route.query.type == 'pubilc') {
            editPubilc(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.query.type == 'Vehicle') {
            editVehicle(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
          if (route.query.type == 'ParkLot') {
            editParkLot(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } 
          if (route.query.type == 'Manage') {
            editManage(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }  if (route.query.type == 'Charge') {
            editCharge(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } else {
            editRubbish(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
        } else {
          if (route.query.type == 'car') {
            saveCarPark(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.query.type == 'pubilc') {
            savePubilc(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.query.type == 'Vehicle') {
            saveVehicle(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.query.type == 'ParkLot') {
            saveParkLot(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }  if (route.query.type == 'Charge') {
            saveCharge(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.query.type == 'Manage') {
            saveManage(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }else {
            saveRubbish(dataForm).then(res => {
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
    const formHandle = {
      span: 22,
      textAlign: 'right',
      btns: [
        { type: 'primary', label: '确认', key: 'sub', icon: 'CircleCheck', handle: handleSubmit },
        { type: 'primary', label: '返回', key: 'back', icon: 'ArrowLeft', handle: handleBack },
      ]
    }
    // 多级分类
    const level1Options = ref([])
    const level2Options = ref([])
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
    const handleChangelevel1 = () => {
      let id = dataForm.type1
      // dataForm.type2 = ''
      getDictThTreeByApi({id},level2Options)
    }
    const getDictThTreeByApi = (data,option) => {
      getDictThTreeBy(data).then(res=>{
        if(res.code == 200){
          resetFormat(res.data,option)
        }        
      })
    }
    getDictThTreeByApi({perms:'0005'},level1Options)
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
    const getLatAndLng = ({ lat, lng }) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      dataForm.longitude = lng.toFixed(6)
      dataForm.latitude = lat.toFixed(6)
      mapDialogVisible.value = false
    }
    onBeforeMount(() => {
      timer.value = new Date().getTime()
    })
    route.query.operation != 3 && (dataForm = JSON.parse(decodeURIComponent(route.query.data)), delete dataForm.treeNames)

    onMounted(() => {
      route.query.operation === 3 && (dataForm = {})
      // handleQueryTable()
    })
    return {
      dataForm,
      route,
      handleBack,
      handleSubmit,
      CarFormConfig,
      PubilcFormConfig,
      rubbishFormConfig,
      VehicleFormConfig,
      ParkLotFormConfig,
      ManageFormConfig,
      ChargeFormConfig,
      formHandle,
      handleTreeSelectChange,
      popupTreeProps,
      popupTreeData,
      // 获取经纬度
      mapDialogVisible,
      handleClick,
      getLatAndLng,
      // 多级分类
      level1Options,
      level2Options,
      handleChangelevel1,
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
