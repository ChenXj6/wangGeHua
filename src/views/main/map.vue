<template>
  <div style="position: relative">
    <div
      class="vMap"
      :style="{ height: !fullHeight ? '100vh' : fullHeight + 'px' }"
      id="dituContent"
    ></div>
    <div class="sidebar">
      <div
        class="sidebar-item"
        v-for="item in mapDialogData?.data"
        :key="item.id"
      >
        <el-dropdown placement="left-start" trigger="hover">
          <el-button
            type="goon"
            size="mini"
            round
            style="width: 88px"
            v-if="item?.children?.length"
          >
            {{ item?.title }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-button
            type="goon"
            size="mini"
            round
            style="width: 88px"
            @click="handleClick(item)"
            v-else
          >
            {{ item?.title }}
          </el-button>
          <template #dropdown v-if="item?.children?.length">
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in item.children"
                :key="item"
                @click="handleClick(item)"
                >{{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- store.state.mapDialog.visible -->
    <div v-if="isOpen" class="headerDialogBox">
      <div class="headerDialog">
        <div>
          <el-row class="showBox">
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
                        size="mini"
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
                <template v-slot:houseType="{ data }">
                  <span>{{ houseType(Number(data.houseType)) }}</span>
                </template>
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
                    size="mini"
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
                    size="mini"
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
                    size="mini"
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
                        size="mini"
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

        <div v-for="item in mapDialogData.children" :key="item.id">
          <img :src="item.img" alt="" />
          <span>{{ item.title }}</span>
        </div>
      </div>
      <i
        class="el-icon-lx-roundclose headerDialogIcon"
        style="color: #fff; font-size: 30px; cursor: pointer"
        @click="handleCloseDialog('isOpen')"
      ></i>
    </div>
    <!-- 驾驶舱弹窗 -->
    <div v-if="isOpenCockpit" class="coclpit">
      <div class="headerDialog">
        <div>
          <h1 style="text-align: center">驾驶舱</h1>
        </div>
        <el-row :gutter="10" class="itemBox1">
          <el-col :span="3" v-for="item in billboardList" :key="item.id">
            <div class="item">
              <p class="itemTitle">{{ item.title }}</p>
              <p class="itemNum">
                {{ item.num }}<span class="itemUnit">{{ item.unit }}</span>
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="itemBox2">
          <el-col :span="3" v-for="item in personnelDetails" :key="item.id">
            <div class="item">
              <p class="itemNum">
                {{ item.num }}<span class="itemUnit">{{ item.unit }}</span>
              </p>
              <p class="itemTitle">{{ item.title }}</p>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main1" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main2" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main3" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main4" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main5" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main6" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main7" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div id="main8" style="width: 100%; height: 200px"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <i
        class="el-icon-lx-roundclose headerDialogIcon"
        style="color: #fff; font-size: 30px; cursor: pointer"
        @click="handleCloseDialog('isOpenCockpit')"
      ></i>
    </div>
    <!-- 楼栋弹窗 -->
    <el-dialog
      :title="`${buildForm.villageName + buildForm.buildingNumber}`"
      v-model="houseDialogVisible"
      width="60%"
      draggable
      style="z-index: 9999"
    >
      <div>
        <el-row :gutter="10">
          <el-col :span="5" class="buildInfoBox">
            <h4>楼栋信息：</h4>
            <hr />
            <p><span>楼长：</span> {{ buildForm.housemaster }}</p>
            <p><span>联系电话：</span>{{ buildForm.housemasterPhone }}</p>
            <p><span>楼层数：</span> {{ buildForm.floorNumber }}</p>
            <p><span>总户数：</span> {{ buildForm.houseNumber }}</p>
          </el-col>
          <el-col :span="19" class="buildListBox">
            <h4>楼栋单元：</h4>
            <hr />
            <div class="buildListItemBox">
              <div
                class="buildListItem"
                v-for="item in unitList"
                :key="item.unitNumber"
                :class="
                  item.unitNumber == searchForm.unitNumber ? 'active' : ''
                "
                @click="getHouseByUnit(item.unitNumber)"
              >
                <img src="@/assets/img/unit.jpg" alt="" srcset="" />
                <span>{{
                  unitNumberOptions.filter((v) => v.value == item.unitNumber)[0]
                    ?.label
                }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5" class="buildFloor">
            <h4>楼层信息：</h4>
            <hr />
            <div>
              <div
                class="floor"
                v-for="item in floorArr(buildForm.floorNumber)"
                :class="item.floorId + 1 == searchForm.floorId ? 'active' : ''"
                :key="item"
                @click="getHouseByFloor(item.floorId + 1)"
              >
                {{ item.floorId + 1 }}F
              </div>
            </div>
          </el-col>
          <el-col :span="19" class="houseBox">
            <h4>
              {{ buildForm.buildingNumber }}-{{ searchForm.unitNumber
              }}{{ searchForm.unitNumber ? "单元" : "" }}-{{ searchForm.floorId
              }}{{ searchForm.floorId ? "楼" : "" }}房屋人员信息：
            </h4>
            <!-- <hr> -->
            <el-row :gutter="10">
              <el-col :span="10">
                <!-- {{ houseList.length }} -->
                <div v-if="!isHaveHouse" class="noHouse">
                  <img src="@/assets/img/loading.gif" alt="loading" srcset="" />
                  <p>Loading...</p>
                </div>
                <div v-else-if="houseList.length <= 0" class="noList">
                  暂无数据
                </div>
                <div v-else class="house">
                  <div
                    class="houseItem"
                    @click="getPeople(item.houseNumber)"
                    v-for="item in houseList"
                    :key="item"
                  >
                    <img src="@/assets/img/house.png" alt="" />
                    <p>{{ item.houseNumber }}</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" class="borderRight">
                <div v-if="!isHavePeople" class="noPeople">
                  <img src="@/assets/img/loading.gif" alt="loading" srcset="" />
                  <p>Loading...</p>
                </div>
                <div v-else-if="peopleList.length <= 0" class="noList">
                  暂无数据
                </div>
                <div v-else class="people house">
                  <div
                    class="peopleItem"
                    v-for="item in peopleList"
                    :key="item"
                  >
                    <img
                      :src="
                        item?.certificates?.length
                          ? `${imgUrl}${item.certificates.split(',')[0]}`
                          : ''
                      "
                      alt=""
                    />
                    <p>
                      <span>姓名：</span> <span>{{ item.name }}</span>
                    </p>
                    <p>
                      <span>户籍：</span> <span>{{ item.domicile }}</span>
                    </p>
                    <p>
                      <span>户主关系：</span>
                      <span>{{
                        relationshipOptions.filter(
                          (v) => v.value == item.relationship
                        )[0]?.label
                      }}</span>
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 事件处置弹窗 -->
    <el-dialog title="" v-model="eventHandleVisible" width="width">
      <div>
        <el-form
          ref="recordFormRef"
          :model="dataForm"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item label="处置方式" prop="dealStatus">
            <el-select
              v-model="dataForm.dealStatus"
              size="mini"
              placeholder="请选择处置方式"
            >
              <el-option
                v-for="item in dataSourceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="流转人"
            v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3"
            prop="launchBy"
          >
            <el-input
              v-model="dataForm.launchRemark"
              size="mini"
              placeholder=""
              @click="handleChangeLaunch"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="处理时限"
            v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3"
          >
            <el-date-picker
              v-model="dataForm.updateDate"
              type="datetime"
              size="mini"
              placeholder="请选择时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="处理意见" prop="dealRemark">
            <el-input
              v-model="dataForm.dealRemark"
              type="textarea"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="eventHandleVisible = false"
          >取 消</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="handleRecord(recordFormRef)"
          >确 定</el-button
        >
      </template>
    </el-dialog>
    <!-- 流转人弹窗 -->
    <el-dialog title="选择流转人" v-model="userDialogVisible" width="40%">
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <el-table
              :data="launchList"
              @selection-change="(val) => (multipleSelection = val)"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="ID" width="100">
              </el-table-column>
              <el-table-column prop="operatorId" label="账号" width="140">
              </el-table-column>
              <el-table-column prop="operatorName" label="姓名" width="width">
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6" style="border: 1px solid #ddd">
            <div>当前已选择{{ multipleSelection.length }}项：</div>
            <div
              class="checkSpan"
              v-for="item in multipleSelection"
              :key="item.id"
            >
              {{ item.operatorName }}
            </div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button size="mini" type="primary" @click="handleSubmitUser"
          >确定</el-button
        >
        <el-button size="mini" type="primary" @click="userDialogVisible = false"
          >返回</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script lang='jsx'>
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  computed,
} from "@vue/runtime-core";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useStore } from "vuex";
import { getUnitByBuild } from "@/api/ActualInfo/build.js";
import { searchDict } from "@/api/sys/dict";
import { getUserList } from "@/api/sys/user";
import { eventProcessing } from "@/api/ResidentsReport/index";
import { resetFormat as resetFormatStatus } from "@/utils/util";
import { getHouseList } from "@/api/ActualInfo/house";
import { getPeopleList } from "@/api/ActualInfo/people";
import { PartyList } from "@/api/PartyBuilding/partyInfo";
import { PartyPeopleList } from "@/api/PartyBuilding/partyPeople";
import { getDraft } from '@/api/Propaganda/draft'
import { ElButton } from 'element-plus'
import { getInfoList } from "@/api/communityGrid/info";
import PopupTreeInput from "@/components/PopupTreeInput/index.vue";
import { deepClone, defaultObject,formatterDate } from "@/utils/util";
import { renderTable } from "@/views/home/ActualInfo/common/build";
import { renderTable as renderEventTable } from "@/views/home/ResidentsReport/common/eventHandle";
import { renderTable as renderHotlineTable} from '@/views/home/SocialGovernance/common/hotlineManage'
import { getBuildList } from "@/api/ActualInfo/build";
import { getDetailList } from "@/api/ResidentsReport/index";
import { getOrganList } from "@/api/sys/organ";
export default {
  components: [PopupTreeInput],
  //#region 
  setup() {
    let vMap = ref(null);
    let fullHeight = ref("");
    let timer = null;
    const store = useStore();
    const route = useRoute();
    const dialogVisible = ref(false);
    const mapDialogData = ref(null);
    const { proxy } = getCurrentInstance();
    // 驾驶舱看板
    const billboardList = ref([
      { id: 1, title: '街道', num: 2, unit: '个' },
      { id: 2, title: '基础网格', num: 80, unit: '个' },
      { id: 3, title: '专属网格', num: 16, unit: '个' },
      { id: 4, title: '常住户', num: 28802, unit: '户' },
      { id: 5, title: '社区', num: 11, unit: '个' },
      { id: 6, title: '单位', num: 695, unit: '个' },
      { id: 7, title: '楼栋', num: 658, unit: '个' },
      { id: 8, title: '重点服务人员', num: 3871, unit: '个' },
    ])
    const personnelDetails = ref([
      { id: 1, title: '网格书记', num: 49, unit: '名' },
      { id: 2, title: '网格长', num: 29, unit: '名' },
      { id: 3, title: '网格员', num: 114, unit: '名' },
      { id: 4, title: '帮包服务队', num: 70, unit: '个' },
      { id: 5, title: '事件处置', num: 4488, unit: '件' },
      { id: 6, title: '12345工单', num: 6091, unit: '件' },
      { id: 7, title: '雪亮工程监控', num: 594, unit: '路' },
      { id: 8, title: '重点监控管理人员', num: 162, unit: '人' },
    ])
    const myChart1 = ref(null)
    const myChart2 = ref(null)
    const myChart3 = ref(null)
    const myChart4 = ref(null)
    const myChart5 = ref(null)
    const myChart6 = ref(null)
    const myChart7 = ref(null)
    const myChart8 = ref(null)
    const drawEcharts = () => {
      myChart1.value = proxy.$echart.init(document.getElementById('main1'))
      myChart2.value = proxy.$echart.init(document.getElementById('main2'))
      myChart3.value = proxy.$echart.init(document.getElementById('main3'))
      myChart4.value = proxy.$echart.init(document.getElementById('main4'))
      myChart5.value = proxy.$echart.init(document.getElementById('main5'))
      myChart6.value = proxy.$echart.init(document.getElementById('main6'))
      myChart7.value = proxy.$echart.init(document.getElementById('main7'))
      myChart8.value = proxy.$echart.init(document.getElementById('main8'))
      // 绘制图表
      myChart1.value.setOption({
        title: {
          text: '网格人员力量类型统计'
        },
        tooltip: {},
        xAxis: {
          data: ['网格书记', '网格长', '网格员', '帮包服务队']
        },
        yAxis: {},
        series: [
          {
            name: '人数以及人员类型',
            type: 'bar',
            data: [49, 26, 114, 70]
          }
        ]
      });
      // 饼图
      myChart2.value.setOption({
        title: {
          text: '网格人员类型占比统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'bottom'
        },
        series: [
          {
            name: '人员占比',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 49, name: '网格书记' },
              { value: 26, name: '网格长' },
              { value: 114, name: '网格员' },
              { value: 70, name: '帮包服务队' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      // 绘制图表
      myChart3.value.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        calculable: true,
        legend: {
          data: ['总数量', '已完成'],
          itemGap: 5
        },
        grid: {
          top: '12%',
          left: '1%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['网格书记', '网格长', '网格员', '帮包服务队']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
            axisLabel: {
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? proxy.$echart.format.addCommas(+a / 1000) : '';
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 94,
            end: 100
          },
          {
            type: 'inside',
            start: 94,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: [
          {
            name: 'Budget 2011',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          },
          {
            name: 'Budget 2012',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          }
        ]
      });
      // 绘制图表
      myChart4.value.setOption({
        // title: {
        //   text: '事项处置效率排名',
        //   subtext:'完成数/总数',
        // },
        tooltip: {},
        xAxis: {
          data: ['东区社区', '西区社区', '南区社区', '北区社区', '泉星社区', '绿地社区']
        },
        legend: [
          {
            name: '总数量',
          },
          {
            name: '效率',
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
          },
          {
            type: 'value',
            name: '处理效率',
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [49, 26, 114, 70, 20, 30]
          },
          {
            name: '效率',
            type: 'line',
            data: [10, 20, 40, 65, 50, 86]
          }
        ]
      });
      // 饼图
      myChart5.value.setOption({
        title: {
          text: '事项处置完成率统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'bottom'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 835, name: '西区社区' },
              { value: 794, name: '南区社区' },
              { value: 781, name: '北区社区' },
              { value: 764, name: '绿地社区' },
              { value: 710, name: '东区社区' },
              { value: 619, name: '泉星社区' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      // 绘制图表
      myChart6.value.setOption({
        // title: {
        //   text: '事项处置效率排名',
        //   subtext:'完成数/总数',
        // },
        tooltip: {},
        xAxis: {
          data: ['东区社区', '西区社区', '南区社区', '北区社区', '泉星社区', '绿地社区'],
          min: 0,
        },
        legend: [
          {
            name: '总数量',
          },
          {
            name: '已完成',
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [2, 18, 8, 3, 0, 0]
          },
          {
            name: '已完成',
            type: 'bar',
            data: [0, 18, 5, 0, 0, 0]
          }
        ]
      });
      // 绘制图表
      myChart7.value.setOption({
        title: {
          text: '事项处置效率排名',
          // subtext:'完成数/总数',
        },
        tooltip: {},
        xAxis: {
          data: ['工人南村街道'],
          min: 0,
        },
        // legend: [
        //   {
        //     name:'总数量',
        //   },
        //   {
        //     name:'已完成',
        //   },
        // ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
          },
          {
            type: 'value',
            name: '处置效率',
            min: 0,
            max: 100,
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [2, 18, 8, 3, 0, 0]
          },
          {
            name: '已完成',
            type: 'bar',
            data: [0, 18, 5, 0, 0, 0]
          },
          {
            name: '处理效率',
            type: 'line',
            data: [0, 18, 5, 0, 0, 0]
          }
        ]
      });
      // 饼图
      myChart8.value.setOption({
        title: {
          text: '南村街道12345热线办理比例分析图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            label: {
              normal: {
                show: true,
                formatter: '{b}: {c}件({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
              }
            },
            data: [
              { value: 2138, name: '城乡建设' },
              { value: 420, name: '社会事业' },
              { value: 2812, name: '城市综合' },
              { value: 39, name: '三农问题' },
              { value: 179, name: '人力资源保障' },
              { value: 139, name: '经济综合' },
              { value: 32, name: '其他' },
              { value: 501, name: '疫情防控' },
              { value: 0, name: '城市更新' },
              { value: 13, name: '自然资源' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
    // 楼栋
    const imgUrl = ref(import.meta.env.VITE_IMG_BASE_API);
    const houseDialogVisible = ref(false); //楼栋弹窗
    const buildForm = ref({}); // 楼栋表单
    const unitList = ref([]); // 楼栋弹窗单元列表
    const houseList = ref([]);
    const peopleList = ref([]);
    const isHaveHouse = ref(true);
    const isHavePeople = ref(true);
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
    const houseType = computed(() => {
      return (val) => {
        switch (val) {
          case 0:
            return "居民楼";
          case 1:
            return "平房";
          case 2:
            return "商品房";
          case 3:
            return "房改房";
          case 4:
            return "小产权";
          case 5:
            return "单位用房";
          case 6:
            return "商品门头房";
          case 7:
            return "住改商";
          case 8:
            return "商业体";
          case 9:
            return "经济体";
        }
      };
    });

    const handleOperation = () => {
      var html = '<div id="release" onClick="hj2(18512,7420,\'1公寓\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>1公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
      vMap.showMapMark(18512, 7420, html);
      return;
    };
    
    const handleEventOperation = () => {
      var html = '<div id="release" onClick="hj2(17088,9828,\'3公寓\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>3公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
      vMap.showMapMark(17088, 9828, html);
      return;
    };

    
    const handleHotlineOperation = () => {
       var html = '<div id="release" onClick="hj2(14328,8812,\'西区公寓\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>西区公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
      vMap.showMapMark(14328, 8812, html);
      return;
    };

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

    // 小区名字  楼号  单元号   房屋号
    const searchForm = ref({
      villageName: "",
      buildingNumber: "",
      unitNumber: "1",
      floorId: 1,
      houseNumber: "",
      pageNum: "1",
      pageSize: "9999",
    });
    const floorArr = (floorNumber) => {
      let arr = [];
      for (let i = floorNumber; i > 0; i--) {
        let obj = {};
        obj.floorId = i - 1;
        arr.push(obj);
      }
      return arr;
    };

    // 事件处置弹窗
    const recordFormRef = ref(null);
    const eventHandleVisible = ref(false);
    const userDialogVisible = ref(false);
    const dataForm = ref({});
    const formData = ref(null);
    const dataSourceOptions = ref([]);
    const sexOptions = ref([]);
    const launchList = ref([]);
    const multipleSelection = ref([]);
    // 获取事件来源、事项类型1025、事件处理状态1001
    const eventScopeOptions = ref([]);
    const eventFirstTypeOptions = ref([]);
    const approvalStatusOptions = ref([]);
    const eventSourceOptions = ref([]);
    const rules = reactive({
      dealStatus: [
        { required: true, message: "请选择处置方式", trigger: "blur" },
      ],
      launchBy: [
        {
          required: true,
          message: "请选择流转人",
          trigger: ["change", "blur"],
        },
      ],
      dealRemark: [
        { required: true, message: "请输入处理意见", trigger: "blur" },
      ],
    });
    const getOptionsByCode = (basictype, data) => {
      searchDict({ basictype }).then((res) => {
        if (res.resCode == "000000" && res.data) {
          data.value = resetFormatStatus(res.data);
        } else {
          data.value = [];
        }
      });
    };
    // 流转
    const handleChangeLaunch = () => {
      userDialogVisible.value = true;
      multipleSelection.value = [];
      dataForm.value.launchRemark = "";
      handleQueryUserTable();
    };
    const handleQueryUserTable = () => {
      getUserList({ pageNum: 1, pageSize: 50 }).then((res) => {
        if (res.code == "200") {
          launchList.value = res.data.list;
        }
      });
    };
    const handleSubmitUser = () => {
      if (multipleSelection.value.length <= 0) {
        proxy.$message.warning({
          message: "请至少选择一位流转人",
          customClass: "messageIndex",
        });
        return;
      }
      userDialogVisible.value = false;
      let str = "";
      let idStr = "";
      multipleSelection.value.forEach((v) => {
        str = str + v.operatorName + ",";
        idStr = idStr + v.operatorId + ",";
      });
      dataForm.value.launchRemark = str.substr(0, str.length - 1);
      dataForm.value.dealBy = idStr.substr(0, idStr.length - 1);
    };
    const handleRecord = async (formRef) => {
      dataForm.value.id = formData.value.id;
      dataForm.value.eventId = formData.value.id;
      (dataForm.value.createBy = JSON.parse(
        sessionStorage.getItem("user")
      ).user.operatorId),
        await formRef.validate((vaild) => {
          if (vaild) {
            eventProcessing(dataForm.value).then((res) => {
              if (res.resCode == "000000") {
                eventHandleVisible.value = false;
                proxy.$message.success("处置成功");
                store.dispatch("delEvent", dataForm.value);
              }
            });
          } else {
            return;
          }
        });
    };
    window.handleManageBtn = (obj) => {
      formData.value = obj;
      eventHandleVisible.value = true;
    };
    // 初始化GIS地图
    const VMapRender = function () {
      vMap = new VMap();
      vMap.createMap("dituContent");
      //设置中心点，目前是像素坐标
      var point = new Point(18000, 8194);
      //创建地图配置文件
      var config = new Config();
      //设置中心点和缩放层级
      config.centerAndZoom(point, 4);
      //设置加载地图类型
      //1：三维地图
      //2：平面地图
      config.setMapType(1);
      //设置鹰眼是否显示(默认不显示)
      config.setEyeMap(false);
      //设置标签是否显示(默认不显示)
      config.setLabel(false);
      //设置全景是否显示(默认不显示)
      config.setPano(false);
      //设置停车场是否显示(默认不显示)
      config.setStop(false);
      //设置路名是否显示(默认不显示)
      config.setRoad(false);
      config.setPopUrl("");
      //加载地图
      vMap.loadMap(config);
      // drawMyRoute3();
    };
    watch(fullHeight, () => {
      reLoadMap();
      VMapRender();
      setTimeout(() => drawMyRoute3(), 1000);
    });
    // 点击导航栏 弹窗
    watch(
      () => store.state.mapDialog,
      () => {
        mapDialogData.value = store.state.mapDialog.data;
        handleAssign();
      },
      { deep: true }
    );
    const isOpenType = ref(null)
    const dialogVis = reactive({
      isOpen: false,
      isOpenCockpit: false,
    })
    // 点击什么标签开启指定弹窗，关闭其他
    const handleClickOpen = (flag) => {
      Object.keys(dialogVis).forEach(v => {
        if (v == flag) {
          dialogVis[flag] = true;
        } else {
          dialogVis[v] = false
        }
      })
    }
    const handleAssign = () => {
      // 一级分类触发不同弹窗方法 >>> 驾驶舱、数字党建等
      if (mapDialogData.value.type && mapDialogData.value.type == 'cockpit') {
        handleClickOpen('isOpenCockpit')
        // 渲染驾驶舱看板 Echarts
        setTimeout(() => drawEcharts(), 0)
      }
    }
    const handleCloseDialog = (flag) => {
      dialogVis[flag] = false;
    }
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
    // 随机获取x，y值
    const randomAddress = () => {
      let sum = Math.round(Math.random() * 3);
      let arr = [
        { lng: "18624", lat: "8178" },
        { lng: "14440", lat: "5260" },
        { lng: "21352", lat: "5074" },
        { lng: "16570", lat: "5160" },
      ];
      return arr[sum];
    };
    randomAddress();
    //绘制编号为1000的静态箭头线
    const drawMyRoute3 = () => {
      //vMap.drawRoute("17808,18500,17744,18224","7526,7700,9118,9262",'1000','red',4,'arrow','','1');
      //画第一网格线圈
      vMap.drawRoute(
        "13848,14556,15480,16884,18296,17064,17752,17632,18528,17992,13848",
        "8818,7966,7218,6419,6738,8836,9012,9100,9308,10324,8818",
        "1000",
        "blue",
        4,
        "",
        "",
        "1"
      );
      //画第一网格标签
      var html1 =
        '<div style="display:inline;height:150px; line-height:180px;border:#FFFFFF solid 3px;padding:10px 20px 10px 20px;color:#FFFFFF;text-align:center; background-color:#000FFF"><nobr>第一网格</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>';
      //vMap.showMapMark(18821,10596,html);
      vMap.showMapMark(16144, 7148, html1);

      // //画第二网格线圈
      vMap.drawRoute(
        "19928,18026,18556,17732,17802,17120,18770,19960,19312,20278,20325,21838,19928",
        "11020,10349,9278,9089,8965,8805,6033,6331,7474,7673,7595,7943,11020",
        "1000",
        "red",
        4,
        "",
        "",
        "1"
      );
      //画第二网格标签
      var html =
        '<div style="display:inline;height:150px; line-height:180px;border:#FFFFFF solid 3px;padding:10px 20px 10px 20px;color:#FFFFFF;text-align:center; background-color:#FF0000"><nobr>第二网格</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>';
      //vMap.showMapMark(18821,10596,html);
      vMap.showMapMark(19024, 9636, html);

      //画第三网格线圈
      vMap.drawRoute(
        "18314,16928,17234,20266,23288,21840,20316,20254,19370,20000,18738,18314",
        "6711,6400,6200,4935,5730,7932,7565,7641,7449,6313,6000,6711",
        "1000",
        "yellow",
        4,
        "",
        "",
        "1"
      );
      //画第二网格标签
      var html =
        '<div style="display:inline;height:150px; line-height:180px;border:#FFFFFF solid 3px;padding:10px 20px 10px 20px;color:#FFFFFF;text-align:center; background-color:#3A1027"><nobr>第三网格</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>';
      //vMap.showMapMark(18821,10596,html);
      vMap.showMapMark(18888, 5250, html);
    };
    
    // 获取楼栋信息
    const getBuild = (buildingId) => {
      getUnitByBuild({ buildingId }).then(async (res) => {
        if (res.resCode == "000000") {
          unitList.value = res.data.unit;
          buildForm.value = res.data.build;
          searchForm.value.villageName = res.data.build.villageName;
          searchForm.value.buildingNumber = res.data.build.buildingNumber;
          houseList.value = await getHouseApi();
          isHaveHouse.value = true;
          peopleList.value = await getPeopleApi();
          isHavePeople.value = true;
          // console.log(houseList.value.length,peopleList.value.length,'????')
          houseDialogVisible.value = true;
        }
      });
    };
    let searchParams = ref({});
    const getPartyList = () => {
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

    const getHouseByUnit = (unitNumber) => {
      searchForm.value.unitNumber = unitNumber;
      searchForm.value.houseNumber = "";
      isHaveHouse.value = false;
      isHavePeople.value = false;
      peopleList.value = [];
      getHouseApi().then((res) => {
        isHaveHouse.value = true;
        houseList.value = res;
      });
      getPeopleApi().then((res) => {
        isHavePeople.value = true;
        peopleList.value = res;
      });
    };
    const getHouseByFloor = (floorNumber) => {
      searchForm.value.floorId = floorNumber;
      searchForm.value.houseNumber = "";
      isHaveHouse.value = false;
      isHavePeople.value = false;
      peopleList.value = [];
      getHouseApi().then((res) => {
        isHaveHouse.value = true;
        houseList.value = res;
      });
      getPeopleApi().then((res) => {
        isHavePeople.value = true;
        peopleList.value = res;
      });
    };
    const getPeople = (houseNumber) => {
      searchForm.value.houseNumber = houseNumber;
      isHavePeople.value = false;
      getPeopleApi().then((res) => {
        peopleList.value = res;
        isHavePeople.value = true;
      });
    };
    const getHouseApi = async () => {
      return new Promise((resolve, reject) => {
        getPeopleList(searchForm.value).then((res) => {
          if (res.resCode == "000000") {
            resolve(res.data.list)
          }
        });
      })
    };
    // const getPeopleApi = async () => {
    //   return new Promise((resolve, reject) => {
    //     getPeopleList(searchForm.value).then((res) => {
    //       if (res.resCode == "000000") {
    //         resolve(res.data.list);
    //       }
    //     });
    //   });
    // };
    const getPeopleApi = async () => {
      return new Promise((resolve, reject) => {
        getPeopleList(searchForm.value).then((res) => {
          if (res.resCode == "000000") {
            resolve(res.data.list);
          }
        });
      });
    };
    // websocket 事件触发
    // 自行触发弹窗函数
    const eventDialogStyle = () => {
      setTimeout(() => {
        let arr = JSON.parse(sessionStorage.getItem("eventName"));
        let { lng, lat } = randomAddress();
        let obj = arr[0];
        speak(obj);
        vMap.showMapPopWin(
          lng,
          lat,
          `${obj.eventName}`,
          "/src/assets/index.html",
          400,
          300
        );
      }, 1000);
    };
    onMounted(() => {
      // 是否有紧急事件通知 具体数值
      if (!!route.params.isClick) {
        store.state.isAddEventList && eventDialogStyle();
        store.state.isAddEventList = false;
      }
      window.onresize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fullHeight.value = document.documentElement.clientHeight;
        }, 1000);
      };
      VMapRender();
      setTimeout(() => drawMyRoute3(), 1000);

      vMap.onMapClick((x0, y0, id, title, identitycode) => {
        console.log(x0,y0,id,title,identitycode)
        // getBuild(19);
      });
    });
    
    watch(
      () => store.state.eventList,
      () => {
        store.state.isAddEventList && eventDialogStyle();
        store.state.isAddEventList = false;
      },
      { deep: true }
    );
    // 事件播报事件
    const speak = (obj) => {
      proxy.$speak(
        `事件名称：${obj?.eventName},发生地点:${obj?.cityName}${obj?.communityName
        }${obj?.gridName}${obj.eventPlace ?? ""}`
      );
    };
    // 数字党建 >>> 品牌打造模块
    const show = ref('');
    const brandList = ref([])
    const getDraftList = () => {
      getDraft({pageNum:1,pageSize:999}).then(res=>{
        if(res.resCode == '000000'){
          let arr = []
          res.data.list.forEach(v=>{
            v.content.replace('/\/g','')
            arr.push(v)
          })
          brandList.value = arr
        }
      })
    }
    // 数字党建 >>> 工作展示模块
    const workShowList = ref([
      { id:1,title:'a',type:'img',url:'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202107/1418474776831426560.jpg' },
      { id:2,title:'a',type:'video',url:'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202112/1468426165151420416.mp4' },
      { id:3,title:'a',type:'img',url:'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202107/1418474760540749824.jpg' },
      { id:4,title:'a',type:'img',url:'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202107/1418464766973935616.jpg' },
    ])
    // 数字党建弹窗控制模块
    const handleClick = (item) => {
      if (item.type == 'party') {
        var html = '<div id="party" onClick="hj2(17408,7178,\'南村街道党工委\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>南村街道党工委</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(17408, 7178,html);
        isOpenType.value = item.type
        return
      }else if(item.type == 'underParty') {
        var html = '<div id="party" onClick="hj2(19524,7796,\'南村街道直属党组织\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>南村街道直属党组织</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'        
        vMap.showMapMark(19524, 7796,html);
        isOpenType.value = item.type
        return
      }else if(item.type == 'partyBranch') {
        var html = '<div id="party" onClick="hj2(18648,9718,\'南村街道党支部\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>南村街道党支部</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'        

        vMap.showMapMark(18648, 9718,html);
        isOpenType.value = item.type
        return
      }else if(item.type == 'partyVan') {
        handleClickOpen('')
        getPartyList();
        handleClickOpen('isOpen')
        show.value = item.title;
        isOpenType.value = item.type
      }else if (item.type == 'brand'){
        getDraftList()
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
      } else if(item.type == 'workShow'){
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
      }else if (item.type == "building") {
         var html = '<div id="release" onClick="hj2(18988,8830,\'明德楼\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>明德楼</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(18988, 8830, html);
        return;
      } else if (item.type == "location") {
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
          handleQuery();
        }, 1000);
          getOList();
        // return;
      }else if(item.type == "eventQuery"){
        isOpenType.value = item.type
        handleClickOpen('')
         show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
            handleEventQuery();
        }, 1000);
      }else if(item.type == "hotline"){
         isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
            handleHotlineQuery();
        }, 1000);
      }else if(item.type == "release"){
        var html = '<div id="release" onClick="hj2(17176,7026,\'2号\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>2号</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(17176, 7026, html);
        // isOpenType.value = item.type
       return;
      }else if(item.type == "neuropathy"){
        var html = '<div id="release" onClick="hj2(22736,5876,\'5公寓\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>5公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(22736, 5876, html);
        return;
      }else if(item.type == "someDayEvent"){
         var html = '<div id="release" onClick="hj2(16600,9484,\'计算小楼\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>计算小楼</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(16600, 9484, html);
        return;
      }else if(item.type == "drugDetoxification"){
         var html = '<div id="release" onClick="hj2(15032,8020,\'2公寓\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>2公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(15032, 8020, html);
        return;
      }else if(item.type == "correct"){
         var html = '<div id="release" onClick="hj2(16824,6492,\'东区\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>东区</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(16824, 6492, html);
        return;
      }else if(item.type == "control"){
         var html = '<div id="release" onClick="hj2(21176,5124,\'北楼\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>北楼</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(21176, 5124, html);
        return;
      }else if(item.type == "briefIntroduction"){
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
            getInfo();
        }, 1000);
      }
      

    }
    // const handleClick = (item) => {
    //   getInfo();
    //   getBuilList();
    // };
    window.aa = () => {
      console.log('1111')
    }

    onBeforeMount(() => {
      getOptionsByCode(1026, dataSourceOptions);
      getOptionsByCode(1009, sexOptions);
      getOptionsByCode(1019,eventScopeOptions);
      getOptionsByCode(1025, eventFirstTypeOptions);
      getOptionsByCode(1027, approvalStatusOptions);
      getOptionsByCode(1003, eventSourceOptions);
    });
    // 恢复地图未加载默认状态
    const reLoadMap = () => {
      if (typeof jv != "undefined") {
        jv = false;
      }
      if (typeof fz != "undefined") {
        fz = false;
      }
    };
    onBeforeRouteLeave(() => {
      reLoadMap();
    });

    //
    const unitNumberOptions = ref([]);
    const relationshipOptions = ref([]);
    // const houseTypeOptions = ref([]);
    getOptionsByCode(1052, unitNumberOptions);
    getOptionsByCode(1014, relationshipOptions);
    // getOptionsByCode(1005, houseTypeOptions);

    return {
      fullHeight,
      mapDialogData,
      dialogVisible,
      handleCloseDialog,
      houseDialogVisible,
      // 楼栋弹窗
      imgUrl,
      buildForm,
      unitList,
      houseList,
      peopleList,
      getHouseByUnit,
      isHaveHouse,
      isHavePeople,
      getHouseByFloor,
      getPeople,
      searchForm,
      floorArr,
      relationshipOptions,
      // 事件处置弹窗
      eventHandleVisible,
      dataForm,
      dataSourceOptions,
      sexOptions,
      handleChangeLaunch,
      userDialogVisible,
      handleRecord,
      launchList,
      handleSubmitUser,
      multipleSelection,
      rules,
      recordFormRef,
      unitNumberOptions,
      handleClick,
      ...toRefs(dialogVis),
      show,
      // showTitleObj,
      searchParams,
      // 看板
      billboardList,
      personnelDetails,
      // 党建弹窗
      isOpenType,
      brandList,
      workShowList,
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
      houseType,
      handleOperation,
      handleEventOperation,
      handleHotlineOperation,
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
  }
  //#endregion
}
</script>
<style scoped>
.sidebar {
  position: absolute;
  top: 50px;
  right: 30px;
  min-height: 250px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.sidebar-item {
  margin-bottom: 20px;
  box-shadow: 0 4px 4px #242f42;
  border-radius: 20px;
}
.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
.el-button--goon {
  min-width: 120px;
  color: #fff;
  background-color: #242f42;
  border-color: #242f42;
}
.headerDialogBox {
  position: absolute;
  width: 75%;
  min-height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  background: rgba(36, 47, 66, 0.7);
  z-index: 2;
  padding: 50px;
  border-radius: 10px;
}
.headerDialogIcon {
  position: absolute;
  top: 10px;
  right: 10px;
}
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
/* .headerDialog > div {
  width: 150px;
  height: 120px;
  background: #242f42;
  margin: 10px;
  box-sizing: border-box;
  color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.headerDialog > div:hover {
  opacity: 0.8;
  border: 1px dashed #fff;
  background: block;
}
.headerDialog > div > img {
  width: 80%;
  height: 60%;
} */
h4 {
  height: 20px;
}
.buildInfoBox {
  height: 122px;
  color: #333;
}
.buildInfoBox > p > span {
  display: inline-block;
  width: 80px;
  color: #999;
}
.buildListBox {
  display: flex;
  height: 122px;
  flex-direction: column;
  justify-content: flex-start;
}
.buildListBox > h4 {
  width: 100%;
  height: 22px;
}
.buildListItemBox {
  display: flex;
  height: 100px;
  justify-content: start;
  overflow: scroll;
  scrollbar-width: none;
  align-items: center;
}
.buildListItem {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 12px;
}
.buildListItem > img {
  width: 40px;
  /* height: 200px; */
}
.buildFloor {
  min-height: 300px;
}
.buildFloor > div {
  margin: 0 auto;
  width: 100%;
  overflow-y: scroll;
  max-height: 300px;
  scrollbar-width: none;
}
.floor {
  width: 60%;
  margin-left: 20%;
  height: 40px;
  background: #bad23c;
  border-radius: 5px;
  transform: rotateX(45deg);
  transform: rotate(10deg);
  transform: skewX(160deg);
  transform: translateY(-100);
  cursor: pointer;
  line-height: 40px;
  text-align: center;
}
.floor:hover {
  transform: scale(1.1);
  background: darkgoldenrod;
}
.active {
  transform: scale(1.1);
  background: #242f42;
  color: #fff;
}
.houseBox {
  border: 1px solid #999;
}
.houseBox > h4 {
  border-bottom: 1px dashed #999;
  height: 25px;
}
.houseBox > div {
  height: calc(100% - 25px);
}
.noList {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.noHouse,
.noPeople {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.noHouse > img,
.noPeople > img {
  width: 100px;
  height: 80px;
}
.house {
  height: 300px;
  display: flex;
  padding-right: 5px;
  width: 100%;
  justify-content: start;
  flex-wrap: wrap;
  overflow-y: scroll;
  scrollbar-width: none;
}
.houseItem {
  width: 70px;
  height: 100px;
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px;
  cursor: pointer;
}
.houseItem > img {
  width: 30px;
  /* height: 60px; */
}
.peopleItem {
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  width: 110px;
  height: 200px;
  font-size: 12px;
  padding: 5px;
  box-sizing: border-box;
}
.peopleItem > img {
  width: 100%;
  height: 100px;
}
.peopleItem > p {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.borderRight {
  border-left: 1px dashed #999;
}
/*  */
/* .eventBox{
  width: 400px;
  height: 400px;
  background: #242f42;
  opacity: .8;
  z-index: 2999;
  position: absolute;
  top: 40%;
  left: 51%;
  border-radius: 10px;
}
.eventBox:before {
  content: "";
  position: absolute;
  right: 100%;
  top: 80px;
  border-top: 13px solid transparent;
  border-right: 30px solid #242f42;
  border-bottom: 13px solid transparent;
} */

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
.coclpit {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: absolute;
  bottom: 60px;
  left: 0;
  /* transform: translate(-50%, -50%); */
  background: rgba(36, 47, 66, 0.7);
  z-index: 9999;
  padding: 60px 50px 50px;
  border-radius: 10px;
}
.item {
  width: 100%;
  padding: 5px 10px 10px;
  box-sizing: border-box;
  /* height: 60px; */
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 14px;
}
.item > p,
.item > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.itemNum {
  font-size: 36px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.itemUnit {
  margin-top: 10px;
  font-size: 14px;
  float: right;
}
.itemBox1,
.itemBox2 {
  height: 80px !important;
}
.itemBox2 {
  text-align: center;
}
</style>

