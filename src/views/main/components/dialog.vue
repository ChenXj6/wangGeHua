<template>
  <div class="headerDialog">
        <div class="carousel_box">
          <el-row class="showBox">
            {{ isOpenType }}
            <template v-if="isOpenType == 'partyVan'">
              <h1 style="text-align: center">{{ show }}</h1>
              <el-carousel
                :interval="5000"
                arrow="never"
                v-if="searchParams.list"
                indicator-position="outside"
                style="width: 100%; margin-top: 30px"
              >
                <el-carousel-item
                  :span="18"
                  v-for="(item, index) in searchParams.list"
                  :key="index"
                >
                  <el-col :span="6" class="vanguard">
                    <img
                      src="https://img0.baidu.com/it/u=640038218,836613496&fm=253&fmt=auto&app=138&f=JPEG?w=460&h=620"
                    />
                  </el-col>
                  <p>姓名：{{ item.memberName }}</p>
                  <p>
                    性别：{{
                      sexOptions.filter((v) => v.value == item.gender)[0]?.label
                    }}
                  </p>
                  <p>归属党组织：{{ item.infoName }}</p>
                  <p>电话：{{ item.phone }}</p>
                  <span>简介：{{ item.memberSynopsis }}</span>
                </el-carousel-item>
              </el-carousel>
            </template>
            <template v-else-if="isOpenType == 'brand'">
              <el-carousel
                :interval="5000"
                arrow="never"
                v-if="brandList.length"
                indicator-position="outside"
                style="width: 100%;height:100%"
              >
                <el-carousel-item
                  :span="24"
                  v-for="(item, index) in brandList"
                  :key="index"
                >
                  <h1 style="text-align: center">{{ item.title }}</h1>
                  <div
                    style="overflow: scroll; height: 500px; margin-top: 20px"
                  >
                    <div
                      v-html="item.content"
                      style="margin-bottom: 100px"
                    ></div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </template>
            <template v-else-if="isOpenType == 'workShow'">
              <el-carousel
                :interval="5000"
                arrow="never"
                v-if="workShowList.length"
                indicator-position="outside"
                style="width: 100%"
              >
                <el-carousel-item
                  :span="24"
                  v-for="(item, index) in workShowList"
                  :key="index"
                >
                  <h1 style="text-align: center">{{ show }}</h1>
                  <div style="height: 500px; text-align: center">
                    <template v-if="item.type == 'img'">
                      <img
                        :src="item.url"
                        :alt="item.title"
                        style="height: 100%"
                      />
                    </template>
                    <template v-else-if="item.type == 'video'">
                      <video
                        :src="item.url"
                        style="height: 100%"
                        controls
                      ></video>
                    </template>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </template>
           <template v-else-if="isOpenType == 'briefIntroduction'">
               <h1 style="text-align: center">{{ show }}</h1>
             <template
              v-for="(item, index) in searchInfoParams.list"
              :key="index">
              <p v-if="item.jdbm == '370105005'">
                <div v-html="item.synopsis"></div>
              </p>
             </template>
           </template>
           <template v-else-if="isOpenType == 'building'">
            <h1 style="text-align: center">{{ show }}</h1>
           </template>
           <template v-else-if="isOpenType == 'location'">
            <h1 style="text-align: center">{{ show }}</h1>
            <div>
              <VForm
                :form-data="formConfig"
                :form-model="searchBuildingForm"
                :form-handle="formHandle"
              >
                <template v-slot:status>
                  <popup-tree-input
                    :data="popupTreeData"
                    :propa="popupTreeProps"
                    :nodeKey="'' + searchBuildingForm.officeCode"
                    @update:dataForm="handleTreeSelectChange"
                  >
                    <template v-slot>
                      <el-input
                        v-model="searchBuildingForm.officeName"
                        size="small"
                        :readonly="true"
                        placeholder="点击选择机构"
                        style="cursor: pointer"
                      ></el-input>
                    </template>
                  </popup-tree-input>
                </template>
              </VForm>
              <V-table
                ref="tableBuilding"
                :table-config="tableConfig"
                @select-change="(val) => (multipleSelection = val)"
              >
                <!-- <template v-slot:houseType="{ data }">
                  <span>{{ houseType(Number(data.houseType)) }}</span>
                </template> -->
                <template v-slot:operation="{}">
                  <el-button type="primary" @click="handleOperation"
                    >定位</el-button
                  >
                </template>
              </V-table>
          </div>
          </template>
          <template  v-else-if="isOpenType == 'eventQuery'">
            <h1 style="text-align: center">{{ show }}</h1>
            <div>
              <VForm
                :form-data="formEventConfig"
                :form-model="searchEventForm"
                :form-handle="formEventHandle"
              >
                <template v-slot:approvalStatus>
                  <el-select
                    v-model="searchEventForm.approvalStatus"
                    size="small"
                    clearable
                    placeholder="请选择事件状态"
                  >
                    <el-option
                      v-for="item in approvalStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template v-slot:eventFirstType>
                  <el-select
                    v-model="searchEventForm.eventFirstType"
                    size="small"
                    clearable
                    placeholder="请选择事件类型"
                  >
                    <el-option
                      v-for="item in eventFirstTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template v-slot:source>
                  <el-select
                    v-model="searchEventForm.source"
                    size="small"
                    clearable
                    placeholder="请选择事件来源"
                  >
                    <el-option
                      v-for="item in eventSourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </VForm>
              <V-table
                ref="tableEvent"
                :table-config="tableEventConfig"
                @select-change="(val) => (multipleSelection = val)"
              >
                <template v-slot:name="data">
                  <span
                    type="success"
                    @click.prevent="handleOperation(1, data.data)"
                    >{{ data.data.eventName }}</span
                  >
                </template>
                <template v-slot:eventScope="{ data }">
                  <span>{{
                    eventScopeOptions.filter(
                      (v) => v.value == data.eventScope
                    )[0]?.label
                  }}</span>
                </template>
                <template v-slot:eventFirstType="{ data }">
                  <span>{{
                    eventFirstTypeOptions.filter(
                      (v) => v.value == data.eventFirstType
                    )[0]?.label
                  }}</span>
                </template>
                <template v-slot:approvalStatus="{ data }">
                  <span>{{
                    approvalStatusOptions.filter(
                      (v) => v.value == data.approvalStatus
                    )[0]?.label
                  }}</span>
                </template>
                <template v-slot:dataSource="{ data }">
                  <span>{{
                    eventSourceOptions.filter(
                      (v) => v.value == data.dataSource
                    )[0]?.label
                  }}</span>
                </template>
                <template v-slot:operation="{}">
                  <el-button type="primary" @click="handleEventOperation"
                    >定位</el-button
                  >
                </template>
              </V-table>
            </div>
          </template>
           <template  v-else-if="isOpenType == 'hotline'">
            <h1 style="text-align: center">{{ show }}</h1>
            <div>
              <VForm
                :form-data="formHotlineConfig"
                :form-model="searchHotlineForm"
                :form-handle="formHotlineHandle"
              >
                <template v-slot:status>
                  <popup-tree-input
                    :data="popupTreeData"
                    :propa="popupTreeProps"
                    :nodeKey="'' + searchHotlineForm.officeCode"
                    @update:dataForm="handleTreeSelectHotlineChange"
                  >
                    <template v-slot>
                      <el-input
                        v-model="searchHotlineForm.officeName"
                        size="small"
                        :readonly="true"
                        placeholder="点击选择机构"
                        style="cursor: pointer"
                      ></el-input>
                    </template>
                  </popup-tree-input>
                </template>
              </VForm>
              <V-table
                ref="tableHotline"
                :table-config="tableHotlineConfig"
                @select-change="(val) => (multipleSelection = val)"
              >
                <template v-slot:operation="{}">
                  <el-button type="primary" @click="handleHotlineOperation"
                    >定位</el-button
                  >
                </template>
              </V-table>
            </div>
           </template>
          </el-row>
        </div>
      </div>
</template>
<script>
import { searchDict } from "@/api/sys/dict";
import { PartyPeopleList } from "@/api/PartyBuilding/partyPeople";
import { getDraft } from '@/api/Propaganda/draft'

import { renderTable } from "@/views/home/ActualInfo/common/build";
import { renderTable as renderEventTable } from "@/views/home/ResidentsReport/common/eventHandle";
import { renderTable as renderHotlineTable} from '@/views/home/SocialGovernance/common/hotlineManage'
import { deepClone, defaultObject,formatterDate,resetFormat as resetFormatStatus } from "@/utils/util";
import { reactive, ref } from '@vue/reactivity';
import { getCurrentInstance } from '@vue/runtime-core';
export default {
  props:{
    show:{
      type: String,
      default:()=>''
    },
    isOpenType:{
      type:String,
      default:()=>''
    }
  },
  setup(props) {
    const isOpenType = ref(props.isOpenType)
    const show = ref(props.show)
    const { proxy } = getCurrentInstance()
    const tableBuilding = ref(null);
    const tableEvent = ref(null);
    const tableHotline = ref(null);
    const { tableConfig, formConfig } = renderTable.call(proxy);
    const { tableConfig:tableEventConfig,formConfig:formEventConfig } = renderEventTable.call(proxy);
    const { tableConfig:tableHotlineConfig,formConfig:formHotlineConfig } = renderHotlineTable.call(proxy);
    const searchBuildingForm = reactive({
      officeName: "",
      officeCode: "",
    });

    const searchHotlineForm = reactive({
      officeName: "",
      officeCode: "",
    });

    const searchEventForm = ref({
      date: [],
    });
    let searchBuildingParams = ref({}); // 表单数据备份
    const getBuilList = () => {
      getBuildList({ pageNum: 1, pageSize: 99 }).then((res) => {
        searchBuildingParams.value = res.data;
      });
    };

    let searchEventParams = ref({}); // 事件查询表单数据备份
    let searchHotlineParams = ref({}); // 12345热线查询表单数据备份

    // 组织结构
    let popupTreeData = ref([]);
    const popupTreeProps = {
      label: "officeName",
      children: "children",
    };
    const getOList = () => {
      getOrganList({}).then((res) => {
        if (res.resCode == "000000") {
          popupTreeData.value = res.data;
        }
      });
    };
    const handleTreeSelectChange = ({ officeCode, officeName }) => {
      searchBuildingForm.officeCode = officeCode;
      searchBuildingForm.officeName = officeName;
    };

    //热线
    const handleTreeSelectHotlineChange  = ({ officeCode, officeName }) => {
      searchHotlineForm.officeCode = officeCode;
      searchHotlineForm.officeName = officeName;
    };
    // 定位表格相關操作
    const handleQuery = () => {
      searchBuildingParams.value = deepClone(searchBuildingForm);
      tableBuilding.currentPage = 1;
      handleQueryTable();
    };
    const handleReset = (formEL) => {
      formEL.resetFields();
      searchBuildingParams.value = {};
      defaultObject(searchBuildingForm);
      handleQuery();
    };

    // 事件查询表格相關操作
    const handleEventQuery = () => {
      searchEventParams.value = deepClone(searchEventForm.value);
       for (const key in searchEventParams.value) {
        if (
          Array.isArray(searchEventParams.value[key]) &&
          searchEventParams.value[key].length > 0
        ) {
          searchEventParams.value[`${key}Start`] = formatterDate(
            searchEventParams.value[key][0]
          )
          searchEventParams.value[`${key}End`] = formatterDate(
            searchEventParams.value[key][1]
          )
          delete searchEventParams.value[key]
        }
      }
      tableEvent.currentPage = 1;
      handleQueryEventTable();
    };
    const handleEventReset = (formEL) => {
      formEL.resetFields();
      searchEventParams.value = {};
      defaultObject(searchEventForm);
      handleEventQuery();
    };


    // 12345热线表格相關操作
    const handleHotlineQuery = () => {
      searchHotlineParams.value = deepClone(searchHotlineForm);
      tableHotline.currentPage = 1;
      handleQueryHotlineTable();
    };
    const handleHotlineReset = (formEL) => {
      formEL.resetFields();
      searchHotlineParams.value = {};
      defaultObject(searchHotlineForm);
      handleHotlineQuery();
    };

    // 定位查询表單操作按鈕配置
    const formHandle = {
      btns: [
        { type: "primary", label: "查询", key: "search", handle: handleQuery },
        { type: "primary", label: "重置", key: "reset", handle: handleReset },
      ],
    };

    // 事件查询表單操作按鈕配置
    const formEventHandle = {
      btns: [
        {type: "primary",label: "查询", key: "search",handle: handleEventQuery,},
        {type: "primary", label: "重置", key: "reset", handle: handleEventReset,},
      ],
    };


    // 12345热线表單操作按鈕配置
    const formHotlineHandle = {
      btns: [
        { type: "primary", label: "查询", key: "search", handle: handleHotlineQuery },
        { type: "primary", label: "重置", key: "reset", handle: handleHotlineReset },
      ],
    };
    const handleQueryTable = () => {
      tableBuilding.value.getTableData(searchBuildingParams.value, (res) => {
        const data = res.list || [];
        tableConfig.data = data;
      });
    };

    const handleQueryEventTable = () => {
      tableEvent.value.getTableData(searchEventParams.value, (res) => {
        const data = res.list || [];
        tableEventConfig.data = data;
      });
    };

    const handleQueryHotlineTable = () => {
      tableHotline.value.getTableData(searchHotlineParams.value, (res) => {
        const data = res.list || [];
        tableHotlineConfig.data = data;
      });
    };

    let searchParams = ref({});
    const getPartyList = () => {
      console.log(111)
      PartyPeopleList({ pageNum: 1, pageSize: 99 }).then((res) => {
        searchParams.value = res.data;
      });
    };

    let searchInfoParams = ref({});
    const getInfo = () => {
      getInfoList({ pageNum: 1, pageSize: 99 }).then((res) => {
        searchInfoParams.value = res.data;
      });
    };
    const getOptionsByCode = (basictype, data) => {
      searchDict({ basictype }).then((res) => {
        if (res.resCode == "000000" && res.data) {
          data.value = resetFormatStatus(res.data);
        } else {
          data.value = [];
        }
      });
    };
    const dataSourceOptions = ref([]);
    const sexOptions = ref([]);
    const eventScopeOptions = ref([]);
    const eventFirstTypeOptions = ref([]);
    const approvalStatusOptions = ref([]);
    const eventSourceOptions = ref([]);
    getOptionsByCode(1026, dataSourceOptions);
    getOptionsByCode(1009, sexOptions);
    getOptionsByCode(1019,eventScopeOptions);
    getOptionsByCode(1025, eventFirstTypeOptions);
    getOptionsByCode(1027, approvalStatusOptions);
    getOptionsByCode(1003, eventSourceOptions);
    const brandList = ref([])
    const getDraftList = () => {
      getDraft({ pageNum: 1, pageSize: 999 }).then(res => {
        if (res.resCode == '000000') {
          let arr = []
          res.data.list.forEach(v => {
            v.content.replace('/\/g', '')
            arr.push(v)
          })
          brandList.value = arr
        }
      })
    }
    const dispense = (type) => {
      console.log(type,'////')
      if (type == 'party') {
        return
      } else if (type == 'underParty') {
        return
      } else if (type == 'partyBranch') {
        return
      } else if (type == 'partyVan') {
        getPartyList();
      } else if (type == 'brand') {
        getDraftList()
      } else if (type == 'workShow') {
      }else if (type == "building") {
        return;
      } else if (type == "location") {
        setTimeout(() => {
          handleQuery();
        }, 1000);
        getOList();
        // return;
      }else if(type == "eventQuery"){
        setTimeout(() => {
          handleEventQuery();
        }, 1000);
      }else if(type == "hotline"){
        setTimeout(() => {
          handleHotlineQuery();
        }, 1000);
      }else if(type == "release"){
       return;
      }else if(type == "neuropathy"){
        return;
      }else if(type == "someDayEvent"){
        return;
      }else if(type == "drugDetoxification"){
        return;
      }else if(type == "correct"){
        return;
      }else if(type == "control"){
        return;
      }else if(type == "briefIntroduction"){
        setTimeout(() => {
          getInfo();
        }, 1000);
      }

    }
    dispense(isOpenType.value)
    return{
      isOpenType,
      show,
      searchParams,
      sexOptions,
      brandList,

      searchInfoParams,
      formConfig,
      searchBuildingForm,
      searchHotlineForm,
      formHandle,
      formHotlineHandle,
      popupTreeProps,
      popupTreeData,
      handleQuery,
      tableBuilding,
      tableEvent,
      tableHotline,
      tableConfig,
      handleTreeSelectChange,
      handleTreeSelectHotlineChange,
      formEventConfig,
      formHotlineConfig,
      tableEventConfig,
      tableHotlineConfig,
      searchEventForm,
      formEventHandle,
      handleEventQuery,
      handleEventReset,
      eventScopeOptions,
      eventFirstTypeOptions,
      approvalStatusOptions,
      eventSourceOptions,
      handleHotlineQuery,
      handleHotlineReset,
    }
  },
}
</script>
<style scoped>
.headerDialog {
  width: 100%;
  height: 100%; 
  min-height: 500px;
  border: 1px solid #bad23c;
  box-sizing: border-box;
  padding: 5px;
  background: #242f42;
  color: #fff;
}
.showBox > h1 {
  width: 100%;
  text-align: center;
}
.headerDialog > div {
  margin: 20px 0;
}
.headerDialogBox > h1 {
  text-align: center;
}

h4 {
  height: 20px;
}

.checkSpan {
  display: inline-block;
  padding: 2px 5px 3px;
  background: #e3edf5;
  color: #4190bd;
  border: 1px solid #acc2cf;
  border-radius: 2px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background: rgba(36, 47, 66, 0.7);
}

.el-carousel__item:nth-child(2n + 1) {
  background: rgba(36, 47, 66, 0.7);
}

.vanguard {
  height: 100px;
  width: 100px;
  margin: 0 10px;
  /* text-align: left; */
}
.vanguard > p {
  height: 100px;
  width: 100px;
  text-indent: 2em;
}
.vanguard > img {
  height: 100px;
  width: 100px;
}
.el-carousel__item {
  background: none !important;
}
</style>