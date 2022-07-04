<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{ route.params.operation == 1 ? '查看' : (route.params.operation == 2 ? '编辑' : '添加') }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px">
      <hr />
    </div>
    <VForm v-if="route.params.type == 'car'" :key="timer" :isDisabled="route.params.operation == 1"
      :form-data="CarFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.params.type == 'Charge'" :key="timer" :isDisabled="route.params.operation == 1"
      :form-data="ChargeFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.params.type == 'Manage'" :key="timer" :isDisabled="route.params.operation == 1"
      :form-data="ManageFormConfig" :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.params.type == 'Vehicle'" :key="timer" :isDisabled="route.params.operation == 1"
      :form-data="VehicleFormConfig" :form-model="dataForm"
      :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.params.type == 'ParkLot'" :key="timer" :isDisabled="route.params.operation == 1"
      :form-data="ParkLotFormConfig" :form-model="dataForm"
      :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
    </VForm>
    <VForm v-if="route.params.type === 'pubilc'" :isDisabled="route.params.operation == 1" :form-data="PubilcFormConfig"
      :form-model="dataForm" :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:lonAndLat>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input v-model="dataForm.longitude" placeholder="请点击获取经纬度" size="small" @click="handleClick"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="dataForm.latitude" placeholder="请输入经纬度" size="small" @click="handleClick"></el-input>
          </el-col>
        </el-row>
      </template>
    </VForm>
    <VForm v-if="route.params.type == 'rubbish'" :form-data="rubbishFormConfig"
      :isDisabled="route.params.operation == 1" :form-model="dataForm"
      :form-handle="route.params.operation != 1 ? formHandle : {}">
      <template v-slot:organ>
        <popup-tree-input :data="popupTreeData" :propa="popupTreeProps" :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange">
          <template v-slot>
            <el-input v-model="dataForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构"
              style="cursor:pointer;"></el-input>
          </template>
        </popup-tree-input>
      </template>
      <template v-slot:lonAndLat>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input v-model="dataForm.longitude" placeholder="请点击获取经纬度" size="small" @click="handleClick"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="dataForm.latitude" placeholder="请输入经纬度" size="small" @click="handleClick"></el-input>
          </el-col>
        </el-row>
      </template>
    </VForm>
    <el-row v-if="route.params.operation == 1">
      <div class="btn-box">
        <el-button type="primary" @click="handleBack" size="small" icon="el-icon-lx-back">返回</el-button>
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
        if (route.params.operation == 2) {
          if (route.params.type == 'car') {
            editCarPark(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } else if (route.params.type == 'pubilc') {
            editPubilc(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.params.type == 'Vehicle') {
            editVehicle(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }
          if (route.params.type == 'ParkLot') {
            editParkLot(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } 
          if (route.params.type == 'Manage') {
            editManage(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }  if (route.params.type == 'Charge') {
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
          if (route.params.type == 'car') {
            saveCarPark(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.params.type == 'pubilc') {
            savePubilc(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.params.type == 'Vehicle') {
            saveVehicle(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.params.type == 'ParkLot') {
            saveParkLot(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          }  if (route.params.type == 'Charge') {
            saveCharge(dataForm).then(res => {
              if (res.resCode === '000000') {
                resolve(res.message)
              } else {
                reject(res.resCode)
              }
            })
          } if (route.params.type == 'Manage') {
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
            proxy.$message.success(`${route.params.operation == 2 ? '编辑' : '添加'}成功`)
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
        { type: 'primary', label: '确认', key: 'sub', icon: 'el-icon-lx-roundcheck', handle: handleSubmit },
        { type: 'primary', label: '返回', key: 'back', icon: 'el-icon-lx-back', handle: handleBack },
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
    const getLatAndLng = ({ lat, lng }) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      dataForm.longitude = lng
      dataForm.latitude = lat
      mapDialogVisible.value = false
    }
    onBeforeMount(() => {
      timer.value = new Date().getTime()
    })
    route.params.operation != 3 && (dataForm = JSON.parse(decodeURIComponent(route.params.data)), delete dataForm.treeNames)

    onMounted(() => {
      route.params.operation === 3 && (dataForm = {})
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
