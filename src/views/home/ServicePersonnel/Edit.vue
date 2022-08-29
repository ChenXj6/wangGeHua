<template>
  <div class="edit-content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="cascades"></i>
          {{
            route.query.operation == 1
              ? "查看"
              : route.query.operation == 2
              ? "编辑"
              : "添加"
          }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom: 20px"><hr /></div>
    <VForm
      v-if="route.query.type == 'ServicePersonnel'"
      :form-data="StaffFormConfig"
      :key="timer"
      :isDisabled="route.query.operation == 1"
      :form-model="dataForm"
      :form-handle="route.query.operation != 1 ? formHandle : {}"
    >
      <template v-slot:tree="">
        <el-select
          v-model="dataForm.streetCode"
          size="small"
          clearable
          placeholder="请选择街道"
          @change="
            (val) => {
              handleChange(1, val, true);
            }
          "
        >
          <el-option
            v-for="item in streetNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <template v-slot:communityCode="">
        <el-select
          v-model="dataForm.communityCode"
          size="small"
          clearable
          placeholder="请选择社区"
          @change="
            (val) => {
              handleChange(2, val, true);
            }
          "
        >
          <el-option
            v-for="item in communityNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
      <template v-slot:officeCode="">
          <el-select v-model="dataForm.officeCode" size="small" clearable placeholder="请选择网格" @change="(val)=>{handleChange(3,val,true),handleGetBuild(1,val,true)}">
            <el-option
              v-for="item in gridNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      <template v-slot:buildingId="">
        <el-select
          v-model="dataForm.buildingId"
          size="small"
          clearable
          placeholder="请选择楼栋"
          @change="
            (val) => {
              handleGetBuild(2, val, true), handleGetHouse(1, val, true);
            }
          "
        >
          <el-option
            v-for="item in buildingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
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
        <el-button
          type="primary"
          @click="handleBack"
          size="small"
          icon="back"
          >返回</el-button
        >
      </div>
    </el-row>
    <!-- <el-row v-if="route.query.operation == 2">
      <div class="btn-box">
        <el-button
          type="primary"
          @click="examine"
          size="small"
          icon="back"
          >审核</el-button
        >
      </div>
    </el-row> -->
    <!-- 地图弹窗 -->
    <el-dialog width="37.5%" v-model="mapDialogVisible">
      <VMap
        @getLatAndLng="getLatAndLng"
        :lng="dataForm.longitude"
        :lat="dataForm.latitude"
      />
    </el-dialog>
  </div>
</template>
<script>
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import mixin from "@/mixins/tagView.js";
import { listAssign } from "@/utils/util";

import { renderTable } from "./common/Edit";
import { saveStaff, editStaff } from "@/api/ServicePersonnel/servicePersonnel";
import {
  getSubClass,
  getBuildClass,
  getHouseClass,
} from "@/api/ActualInfo/build";
import PopupTreeInput from "@/components/PopupTreeInput/index.vue";
import { getOrganList } from "@/api/sys/organ";
export default {
  name: "EditServicePersonnel",
  mixins: [mixin],
  components: { PopupTreeInput },
  setup() {
    const route = useRoute();
    const { delCurrentTag } = mixin.setup();
    const { proxy } = getCurrentInstance();
    let dataForm = ref({});
    const { StaffFormConfig } = renderTable.call(proxy);
    const table1 = ref(null);
    const table2 = ref(null);
    const table3 = ref(null);
    let timer = ref(new Date().getTime());
    let popupTreeData = ref([]);

    const streetNameOptions = ref([
      { label: "工人新村北村街道", value: "370105004" },
      { label: "工人新村南村街道", value: "370105005" },
    ]);
    const communityNameOptions = ref([]);
    const gridNameOptions = ref([]);
    const buildingOptions = ref([]);
    const houseOptions = ref([]);
    const popupTreeProps = {
      label: "officeName",
      children: "children",
    };

    const handleTreeSelectChange = ({ officeCode, officeName }) => {
      dataForm.officeCode = officeCode;
      dataForm.officeName = officeName;
    };
    // flag： 1 组织结构的数据处理、2 楼栋信息数据格式处理、 3 房屋信息数据格式处理
    const resetFormat = (data, options, flag = 1) => {
      if (data.length == 0) return (options.value = []);
      let arr = [];
      data.forEach((v) => {
        let obj = {};
        if (flag == 1) {
          obj.label = v.officeName;
          obj.value = v.officeCode;
        } else if (flag == 2) {
          obj.label = `${v.villageName}-${v.buildingNumber}`;
          obj.value = v.id;
        } else if (flag == 3) {
          obj.label = `${v.unitNumber}-${v.houseNumber}`;
          obj.value = v.id;
        }
        arr.push(obj);
      });
      options.value = arr;
      // console.log('111111',arr)
    };
    // trigMode 用来区分是编辑初始化还是自己手动触发的
    const handleChange = (type, parentCode, trigMode = false) => {
      if (type == 1) {
        (!dataForm.value.streetName || trigMode) &&
          (dataForm.value.streetName = streetNameOptions.value.filter(
            (obj) => obj.value == parentCode
          )[0].label);
        subClass(1, parentCode, trigMode);
      } else if (type == 2) {
        (!dataForm.value.communityName || trigMode) &&
          (dataForm.value.communityName = communityNameOptions.value.filter(
            (obj) => obj.value == parentCode
          )[0].label);
        subClass(2, parentCode, trigMode);
      } else {
        (!dataForm.value.officeName || trigMode) &&
          (dataForm.value.officeName = gridNameOptions.value.filter(
            (obj) => obj.value == parentCode
          )[0].label);
        subClass(3, parentCode, trigMode);
      }
    };
    // 网格下拉框change事件 触发获取楼栋信息
    const handleGetBuild = (type, parentCode, trigMode = false) => {
      if (type == 1) {
        buildClss(type, parentCode, trigMode);
      } else {
      }
    };
    //街道获取社区 、 社区获取网格
    const subClass = (type, parentCode, trigMode) => {
      getSubClass({ parentCode }).then((res) => {
        if (res.resCode === "000000") {
          if (type == 1) {
            if (trigMode) {
              dataForm.value.communityName = "";
              dataForm.value.communityCode = "";
              dataForm.value.officeName = "";
              dataForm.value.officeCode = "";
              communityNameOptions.value = [];
              gridNameOptions.value = [];
              dataForm.value.buildingId = "";
              buildingOptions.value = [];
              dataForm.value.houseId = "";
              houseOptions.value = [];
            }
            resetFormat(res.data, communityNameOptions);
          } else if (type == 2) {
            if (trigMode) {
              dataForm.value.officeName = "";
              dataForm.value.officeCode = "";
              gridNameOptions.value = [];
              dataForm.value.buildingId = "";
              buildingOptions.value = [];
              dataForm.value.houseId = "";
              houseOptions.value = [];
            }
            resetFormat(res.data, gridNameOptions);
          } else if (type == 3) {
            if (trigMode) {
              dataForm.value.buildingId = "";
              buildingOptions.value = [];
              dataForm.value.houseId = "";
              houseOptions.value = [];
            }
          }
        }
      });
    };

    // 网格获取楼栋
    const buildClss = (type, gridCode, trigMode) => {
      getBuildClass({ gridCode }).then((res) => {
        if (res.resCode == "000000") {
          if (trigMode && type == 1) {
            dataForm.value.buildingId = "";
            buildingOptions.value = [];
          }
          resetFormat(res.data, buildingOptions, 2);
        }
      });
    };
    const houseClass = (type, buildingId, trigMode) => {
      getHouseClass({ buildingId }).then((res) => {
        if (res.resCode == "000000") {
          if (trigMode && type == 1) {
            dataForm.value.houseId = "";
            houseOptions.value = [];
          }
          resetFormat(res.data, houseOptions, 3);
        }
      });
    };
    // 楼栋获取房屋
    const handleGetHouse = (type, buildingId, trigMode = false) => {
      if (type == 1) {
        houseClass(type, buildingId, trigMode);
      } else {
      }
    };
    const getOList = () => {
      getOrganList({}).then((res) => {
        if (res.resCode == "000000") {
          popupTreeData.value = res.data;
        }
      });
    };
    getOList();
    // 提交
    const handleSave = () => {
      console.log(1111)
      return new Promise((resolve, reject) => {
        // true: 编辑；false:添加
        if (route.query.operation == 2) {
          delete dataForm.value.buildingNumber;
          delete dataForm.value.villageName;
          delete dataForm.value.unitNumber;
          delete dataForm.value.houseNumber;
          if (route.query.type == "ServicePersonnel") {
            editStaff(dataForm.value).then((res) => {
              if (res.resCode === "000000") {
                resolve(res.message);
              } else {
                reject(res.resCode);
              }
            });
          }
        } else {
          dataForm.value.countyCode = "370105";
          dataForm.value.countyName = "天桥区";
          if (route.query.type == "ServicePersonnel") {
            saveStaff(dataForm.value).then((res) => {
              if (res.resCode === "000000") {
                resolve(res.message);
              } else {
                reject(res.resCode);
              }
            });
          }
        }
      });
    };
    const handleSubmit = (formRef) => {
      formRef.validate((vaild) => {
        if (vaild) {
          handleSave()
            .then((res) => {
              proxy.$message.success(
                `${route.query.operation == 2 ? "编辑" : "添加"}成功`
              );
              delCurrentTag(route);
            })
            .catch((err) => {
              proxy.$message.warning(`操作失败，请稍后再试！`);
            });
        } else {
          return;
        }
      });
    };
    const handleBack = () => {
      delCurrentTag(route);
    };
    const formHandle = {
      span: 22,
      textAlign: "right",
      btns: [
        {
          type: "primary",
          label: "确认",
          key: "sub",
          icon: "CircleCheck",
          handle: handleSubmit,
        },
        {
          type: "primary",
          label: "返回",
          key: "back",
          icon: "ArrowLeft",
          handle: handleBack,
        },
      ],
    };
    // 表格相關操作5
    const handleQueryTable = () => {
      table1.value.getTableData({}, (res) => {
        // const data = res.data || []
        tableConfig.data = tableData;
      });
    };

    // 获取经纬度
    const mapDialogVisible = ref(false);
    const handleClick = () => {
      mapDialogVisible.value = true;
    };

    const getLatAndLng = ({ lat, lng }) => {
      // console.log(`获取到的经纬度为：${lng}-${lat}`)
      dataForm.value.buildingLongitude = lng.toFixed(6);
      dataForm.value.buildingLatitude = lat.toFixed(6);
      mapDialogVisible.value = false;
    };

    onBeforeMount(() => {
      
      timer.value = new Date().getTime();
    });
    if (route.query.operation != 3) {
      dataForm.value = JSON.parse(decodeURIComponent(route.query.data));
      if (route.query.type == "ServicePersonnel") {
        handleChange(1, dataForm.value.streetCode);
        handleChange(2, dataForm.value.communityCode);
        handleChange(3);
        handleGetBuild(1, dataForm.value.officeCode);
        handleGetHouse(1, dataForm.value.buildingId);
      }
    }

    // route.query.operation != 3 && (dataForm.value = JSON.parse(decodeURIComponent(route.query.data)), delete dataForm.value.treeNames)

    onMounted(() => {
      route.query.operation === 3 && (dataForm = {});
      // handleQueryTable()
    });
    return {
      dataForm,
      route,
      table1,
      table2,
      table3,
      handleBack,
      StaffFormConfig,
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
      popupTreeData,
      // handleChange,
      // 获取经纬度
      mapDialogVisible,
      handleClick,
      getLatAndLng,
      timer,
      houseOptions
    };
  },
};
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
