<template>
  <div style="position: relative">
    <div class="vMap"
         :style="{ height: !fullHeight ? '100vh' : fullHeight + 'px' }"
         id="dituContent"></div>
    <!-- 侧边导航栏 -->
    <div class="sidebar">
      <div class="sidebar-item"
           v-for="item in mapDialogData?.data"
           :key="item.id">
        <el-dropdown v-if="item?.children?.length"
                     placement="left-start"
                     trigger="click">
          <el-button type="goon"
                     size="mini"
                     round
                     style="width: 88px">
            {{ item?.title }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in item.children"
                :key="item"
                :icon="tagShow.hasOwnProperty([item.type]) ? ( !!tagShow[item.type] ? 'el-icon-lx-attentionforbidfill' : 'el-icon-lx-attentionfill') : ''"
                @click="handleClick(item)"
                >{{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>

          </template>
        </el-dropdown>
        <el-button type="goon"
                   size="mini"
                   round
                   :icon="tagShow.hasOwnProperty([item.type]) ? ( !!tagShow[item.type] ? 'el-icon-lx-attentionforbidfill' : 'el-icon-lx-attentionfill') : ''"
                   style="width: 88px"
                   @click="handleClick(item)"
                   v-else>
          {{ item?.title }}
        </el-button>
      </div>
    </div>
    <!-- 侧边导航栏弹窗 -->
    <div v-if="isOpen"
         class="headerDialogBox">
      <div class="headerDialog">
        <div class="carousel_box">
          <el-row class="showBox">
            <template v-if="isOpenType == 'partyVan'">
              <h1 style="text-align: center">{{ show }}</h1>
              <el-carousel
                :interval="5000"
                arrow="never"
                v-if="searchParams.list"
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
            <template v-else-if="isOpenType == 'workShow' || isOpenType == 'liveworkshow' || isOpenType =='workResults' || isOpenType == 'drill' || isOpenType == 'training' || isOpenType == 'casewarning'">
              <!-- {{ workShowList }} -->
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
                  <div style="height: 400px; text-align: center">
                    <template v-if="item.mtype == '1'">
                      <img
                        :src="url + item.mediaPath"
                        :alt="item.title"
                        style="height: 100%"
                      />
                    </template>
                    <template v-else-if="item.mtype == '2'">
                      <video
                        :src="url + item.mediaPath"
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
              <div v-if="item.jdbm == '370105005'">
                <div v-html="item.synopsis"></div>
              </div>
             </template>
           </template>
           <template v-else-if="isOpenType == 'building'">
            <h1 style="text-align: center">{{ show }}</h1>
           </template>
           <template v-else-if="isOpenType == 'location'">
            <h1 style="text-align: center">{{ show }}</h1>
            <el-col :span="24">
              <VForm
                :form-data="formConfig"
                :form-model="searchBuildingForm"
                :form-handle="formHandle"
              >
                <template v-slot:status>
                  <popup-tree-input
                    :data="popupTreeData"
                    :propa="popupTreeProps"
                    :nodeKey="'' + searchBuildingForm.gridCode"
                    @update:dataForm="handleTreeSelectChange"
                  >
                    <template v-slot>
                      <el-input
                        v-model="searchBuildingForm.gridName"
                        size="mini"
                        :readonly="true"
                        placeholder="点击选择机构"
                        style="cursor: pointer"
                      ></el-input>
                    </template>
                  </popup-tree-input>
                </template>
              </VForm>
              <div class="tableBox">
                <V-table
                ref="tableBuilding"
                :table-config="tableConfig"
                @select-change="(val) => (multipleSelection = val)"
              >
                <template v-slot:houseType="{ data }">
                  <span>{{ houseType(Number(data.houseType)) }}</span>
                </template>
                <template v-slot:operation="{}">
                  <el-button type="primary" size="mini" @click="handleOperation"
                    >定位</el-button
                  >
                </template>
              </V-table>
              </div>
            </el-col>
          </template>
          <!-- 事件查询 && 烟感报警记录 -->
          <template  v-else-if="isOpenType == 'eventQuery' || isOpenType == 'smokeRecord'">
            <h1 style="text-align: center">{{ show }}</h1>
            <el-col :span="24">
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
                <template v-slot:dataSource>
                  <el-select
                    v-model="searchEventForm.dataSource"
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
              <div class="tableBox">
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
                  <el-button type="primary" size="mini" @click="handleEventOperation"
                    >定位</el-button
                  >
                </template>
              </V-table>
              </div>
            </div>
            </el-col>
          </template>
           <template  v-else-if="isOpenType == 'hotline'">
            <h1 style="text-align: center">{{ show }}</h1>
            <el-col :span="24">
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
              <div class="tableBox">
                <V-table
                ref="tableHotline"
                :table-config="tableHotlineConfig"
                @select-change="(val) => (multipleSelection = val)"
              >
                <template v-slot:operation="{}">
                  <el-button type="primary" size="mini" @click="handleHotlineOperation"
                    >定位</el-button
                  >
                </template>
              </V-table>
              </div>
            </div>
            </el-col>
           </template>
           <!-- <template v-else-if="isOpenType == 'workResults'">
              <el-carousel
                :interval="5000"
                arrow="never"
                v-if="workResultsList.length"
                indicator-position="outside"
                style="width: 100%"
              >
                <el-carousel-item
                  :span="24"
                  v-for="(item, index) in workResultsList"
                  :key="index"
                >
                  <h1 style="text-align: center">{{ show }}</h1>
                  <div style="height: 400px; text-align: center">
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
           </template> -->
           <!-- policy、process、neighborhood -->
           <template v-else-if="isOpenType == 'brand' || isOpenType == 'policy' || isOpenType == 'process' || isOpenType == 'neighborhood' || isOpenType == 'pandemic'  || isOpenType == 'law'  || isOpenType == 'business'  || isOpenType == 'risk' || isOpenType == 'integratedMarket' || isOpenType == 'buildingEconomy'">
             <el-row style="width:100%" gutter="20">
               <el-col :span="5">
                 <div class="policy_left_top"><img src="http://123.233.250.69:9090/tqqgridManage/static/img/nc/msbz/tb.png" alt=""> <h2>{{ show }}</h2></div>
                 <div class="policy_left">
                      <p class="policy_left_item" v-for="(item, index) in brandList" :key="index" @click="handleSelect(item)">{{item.title}}</p>
                </div>
               </el-col>
               <el-col :span="18">
                 <div>
                      <h1 style="text-align: center">{{ policyItem.title }}</h1>
                      <div
                        style="overflow: scroll; height: 400px; margin-top: 25px"
                      >
                        <div
                          v-html="policyItem.content"
                          style="margin-bottom: 100px"
                        ></div>
                      </div>
                 </div>
               </el-col>
             </el-row>
            </template>
            <template v-else-if="isOpenType == 'hiddenDanger'">
              <h1 style="text-align: center">{{ show }}</h1>
            <el-col :span="24">
              <VForm
                :form-data="formHiddenDangerConfig"
                :form-model="searchHiddenDangerForm"
                :form-handle="formHiddenHandle"
              >
                <template v-slot:status>
                  <popup-tree-input
                    :data="popupTreeData"
                    :propa="popupTreeProps"
                    :nodeKey="'' + searchHiddenDangerForm.officeCode"
                    @update:dataForm="handleHiddenSelectChange"
                  >
                    <template v-slot>
                      <el-input
                        v-model="searchHiddenDangerForm.officeName"
                        size="mini"
                        :readonly="true"
                        placeholder="点击选择机构"
                        style="cursor: pointer"
                      ></el-input>
                    </template>
                  </popup-tree-input>
                </template>
              </VForm>
              <div class="tableBox">
                <V-table
                ref="hiddenDangerRef"
                :table-config="tableHiddenDangerConfig"
                @select-change="(val) => (multipleSelection = val)"
              >
              <template v-slot:dangerName="{data}">
                <el-link type="success" @click.prevent="javascript();">{{ data.dangerName }}</el-link>
              </template>
                <template v-slot:operation="{}">
                  <el-button type="primary" size="mini" @click="handleOperation"
                    >定位</el-button
                  >
                </template>
              </V-table>
              </div>
            </el-col>
            </template>
          </el-row>
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
      <div class="coclpitDialog">
        <Coclpit />
      </div>
      <i
        class="el-icon-lx-roundclose headerDialogIcon"
        style="color: #fff; font-size: 30px; cursor: pointer"
        @click="handleCloseDialog('isOpenCockpit')"
      ></i>
    </div>
    <!-- 楼栋弹窗-->
      <Building :key="buildTime" v-if="houseDialogVisible" :houseDialogVisible="houseDialogVisible" @update:houseDialogVisible="handleCloseBuild" :gisid="gisid" />
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
<script>
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  computed,
  nextTick,
} from "@vue/runtime-core";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useStore } from "vuex";
import { searchDict } from "@/api/sys/dict";
import { getUserList } from "@/api/sys/user";
import { eventProcessing } from "@/api/ResidentsReport/index";
import { resetFormat as resetFormatStatus } from "@/utils/util";
import { PartyPeopleList } from "@/api/PartyBuilding/partyPeople";
import { getDraft } from '@/api/Propaganda/draft'
import { ElButton } from 'element-plus'
import { getInfoList } from "@/api/communityGrid/info";
import PopupTreeInput from "@/components/PopupTreeInput/index.vue";
import { deepClone, defaultObject,formatterDate } from "@/utils/util";
import { renderTable } from "@/views/home/ActualInfo/common/build";
import { renderTable as renderEventTable } from "@/views/home/ResidentsReport/common/eventHandle";
import { renderTable as renderHotlineTable} from '@/views/home/SocialGovernance/common/hotlineManage'
import { renderTable as renderHiddenDangerTable } from '@/views/home/UrgentNeed/common/HiddenDanger'
import { getBuildList } from "@/api/ActualInfo/build";
import { getDetailList } from "@/api/ResidentsReport/index";
import { getOrganList } from "@/api/sys/organ";
// 数字党建
import { PartyList } from '@/api/PartyBuilding/partyInfo'

// 民生保障
import { getProvide } from '@/api/LiveEnsure/provide'
import { getStaffList } from '@/api/ServicePersonnel/servicePersonnel'
import { getMedia } from '@/api/Propaganda/media'
// 应急指挥
import { getSupp } from '@/api/UrgentNeed/supplies'
import { getSmoke } from '@/api/UrgentNeed/smoke'
// 
import Coclpit from './components/coclpit.vue'
import Building from './components/building.vue'

//车位信息
import { getParkLotList } from '@/api/SmartProperty/parkLot'

//应急指挥
import { getPubilcList } from '@/api/SmartProperty/pubilc'

//经济运行>>商务楼宇,重点企业
import { buildingList } from '@/api/Economics/building'

//经济运行>>重点项目
import { itemList } from '@/api/Economics/itemList'
// 图标引入
import party1Url  from '@/assets/img/dgw.png'
import party2Url from "/src/assets/img/党支部.png"
import party3Url from "/src/assets/img/党组织.png"
import serviceUrl1 from "/src/assets/img/残联服务中心.png"
import serviceUrl2 from "/src/assets/img/养老中心.png"
import meetUrl1 from "/src/assets/img/应急物资.png"
import meetUrl2 from "/src/assets/img/应急站点.png"
import meetUrl3 from "/src/assets/img/消防栓.png"
import smokeUrl1 from "/src/assets/img/烟雾报警.png"
import smokeUrl2 from "/src/assets/img/一键报警器.png"
import smokeUrl3 from "/src/assets/img/摄像头.png"
import servicePeoUrl1 from "/src/assets/img/高龄老人.png"
import servicePeoUrl2 from "/src/assets/img/独居老人.png"
import servicePeoUrl3 from "/src/assets/img/失业人员.png"
import servicePeoUrl4 from "/src/assets/img/残疾人.png"
import lotUrl from "/src/assets/img/车位位置.png"
import communalUrl from "/src/assets/img/摄像头.png"
import communalUr2 from "/src/assets/img/道闸.png"
import communalUr3 from "/src/assets/img/垃圾桶.png"
import communalUr4 from "/src/assets/img/充电桩.png"
import economyUr1 from "/src/assets/img/商务楼宇.png"
import economyUr2 from "/src/assets/img/重点企业.png"
import keyProjectsUr1 from "/src/assets/img/重点项目.png"
import releaseUr1 from "/src/assets/img/刑满释放.png"
import neuropathyUr1 from "/src/assets/img/精神障碍.png"
import drugDetoxificationUr1 from "/src/assets/img/社区戒毒.png"
import correctUr1 from "/src/assets/img/社会矫正.png"
import controlUr1 from "/src/assets/img/稳控对象.png"


//重点管理人员>>戒毒
import { getDrugList } from '@/api/ManagementPersonnel/drugPer'

//重点管理人员>>精神障碍
import { getMentalList } from '@/api/ManagementPersonnel/mentaldisordersPer'

//重点管理人员>>刑满释放
import { getReleaseList } from '@/api/ManagementPersonnel/releasePer'

//重点管理人员>>社会矫正
import { getRectifyList } from '@/api/ManagementPersonnel/rectifyStaff'

//重点管理人员>>上访人员
import { getPetitionList } from '@/api/ManagementPersonnel/petitionStaff'




import Notice from './components/notice.vue'
export default {
  components: { Notice, Coclpit, Building },
  setup() {
    let vMap = ref(null);
    const url = ref(import.meta.env.VITE_IMG_BASE_API)
    let fullHeight = ref("");
    let timer = null;
    let buildTime = ref(new Date().getTime());
    const store = useStore();
    const route = useRoute();
    const dialogVisible = ref(false);
    const mapDialogData = ref(null);
    const { proxy } = getCurrentInstance();
    // 楼栋
    const houseDialogVisible = ref(false)
    const gisid = ref('')
    const handleCloseBuild = (flag) => {
      houseDialogVisible.value = flag
    }
    const tableBuilding = ref(null);
    const tableEvent = ref(null);
    const tableHotline = ref(null);
    const { tableConfig, formConfig } = renderTable.call(proxy);
    const { tableConfig:tableEventConfig,formConfig:formEventConfig } = renderEventTable.call(proxy);
    const { tableConfig:tableHotlineConfig,formConfig:formHotlineConfig } = renderHotlineTable.call(proxy);
    const { tableConfig:tableHiddenDangerConfig,formConfig:formHiddenDangerConfig } = renderHiddenDangerTable.call(proxy);
    const searchBuildingForm = reactive({
      gridName: "",
      gridCode: "",
    });

    const searchHotlineForm = reactive({
      officeName: "",
      officeCode: "",
    });

    const searchEventForm = ref({
      operatorId: JSON.parse(sessionStorage.getItem('user')).user.operatorId
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
      var html = '<div id="release" onClick="hj2(18512,7420,\'1公寓\',\'http://www.baidu.com\',400,300)" style="cursor: pointer;display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>1公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
      vMap.showMapMark(18512, 7420, html);
      return;
    };
    
    const handleEventOperation = () => {
      var html = '<div id="release" onClick="hj2(17088,9828,\'3公寓\',\'http://www.baidu.com\',400,300)" style="cursor: pointer;display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>3公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
      vMap.showMapMark(17088, 9828, html);
      return;
    };

    
    const handleHotlineOperation = () => {  
       var html = '<div id="release" onClick="hj2(14328,8812,\'西区公寓\',\'http://www.baidu.com\',400,300)" style="cursor: pointer;display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>西区公寓</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
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
      searchBuildingForm.gridCode = officeCode;
      searchBuildingForm.gridName = officeName;
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
      tableEvent.currentPage = 1;
      handleQueryEventTable();
    };
    const handleEventReset = (formEL) => {
      formEL.resetFields();
      searchEventParams.value = {};
      defaultObject(searchEventForm.value);
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
        handleClickOpen('')
        handleAssign()
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
    // GIS显示地图标签
    // ---------对象属性与Header-sidebar组件命名保持一致-----------
    const tagShow = ref({})
    const tagList = ref({
      party:'01',
      underParty:'02',
      partyBranch:'03',
      building:'04',
      location:'05',
      someDayEvent:'06',
      eventQuery:'07',
      release:'08',
      neuropathy:'09',
      drugDetoxification:'10',
      correct:'11',
      control:'12',
      haidi:'13',
      provide:'14',
      service3:'15',
      service10:'16',
      service2:'17',
      service6:'18',
      supplies:'19',
      site:'20',
      fireHydrant:'21',
      // camera:'22',
      smokeDetector:'23',
      smokeRecord:'24',
      alarm:'25',
      hiddenDanger:'26',
      parkingLotPosition:'27',
      cameraPosition:'28',
      roadGatePosition:'29',
      trashCanPosition:'30',
      chargingPilePosition:'31',
      businessBuilding:'32',
      keyProjects:'33',
      keyEnterprises:'34',
    })
    const initTagState = () => {
      Object.keys(tagList.value).forEach(v=>{
        tagShow.value[v] = false
      })
    }
    
    const tagClick = (tagNanme,isShow,{lng,lat,html}) => {
      Object.keys(tagList.value).forEach(v=>{
        if(v == tagNanme){
          if(!isShow){
            vMap.delAllMapMark(tagList.value[tagNanme]);
          }else{
            vMap.showMapMark(lng, lat, html,tagList.value[tagNanme]);
          }
        }
      })
    }



    const floorTagClick = (tagNanme,isShow) => {
      Object.keys(tagList.value).forEach(v=>{
        if(v == tagNanme.type){
          if(!isShow){
            vMap.Iv('g7',false);
          }else{
            vMap.Iv('g7',true);
          }
        }
      })
    }
    const handleAssign = () => {
      // 一级分类触发不同弹窗方法 >>> 驾驶舱、数字党建等
      if (mapDialogData.value.type && mapDialogData.value.type == 'cockpit') {
        handleClickOpen('isOpenCockpit')
      }
    }
    const handleCloseDialog = (flag) => {
      if (mapDialogData.value.type && mapDialogData.value.type == 'cockpit') {
        store.state.mapDialog = { type: '', data: [] }
        mapDialogData.value = null
      }
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
        { lng: "18112", lat: "7516" },
        { lng: "17408", lat: "7178" },
        { lng: "19524", lat: "7796" },
        { lng: "18648", lat: "9718" },
        { lng: "18988", lat: "8830" },
      ];
      return arr[sum];
    };
    // randomAddress();
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
        buildTime.value = new Date().getTime()
        gisid.value = id
        houseDialogVisible.value = true
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
    // 民生保障 >>> 政策法规右侧点击事件
    const policyItem = ref({})
    const handleSelect = (item) => {
      policyItem.value = item
    }
    // showType:'media',
    // 数字党建 >>> 品牌打造模块
    const show = ref('');
    const brandList = ref([])
    const getDraftList = (level1,level2,level3) => {
      brandList.value = []
      policyItem.value = {}
      getDraft({ pageNum: 1, pageSize: 999,level1,level2,level3 }).then(res => {
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
    // 民生保障 >>> 工作展示请求接口
    const getmediaList = (level1,level2,level3) => {
      return new Promise((resolve,reject)=>{
        getMedia({pageNum:1,pageSize:9999,level1,level2,level3}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }
    // 获取后台宣传管理列表，根据Header-sidebar中的showType来区分文稿与多媒体
    const getList = (type,level1,level2,level3)=>{
      if(type == 'media'){
        return getmediaList(level1,level2,level3)
      }else{
        getDraftList(level1,level2,level3)
      }
    }
    watch(()=>brandList.value,(data)=>{
      data.length && handleSelect(data[0])
    })
    // 数字党建 >>> 工作展示模块
    const workShowList = ref([])    
    // 数字党建弹窗控制模块
    const getPartyInfoList = (orgType) => {
      return new Promise((resolve,reject)=>{
        PartyList({pageNum:1,pageSize:999,orgType}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }
    // 数字党建 >>> 党组织
    const partyClick = (orgType,type) => {
      tagShow.value[type] = !tagShow.value[type]
      getPartyInfoList(orgType).then(res=>{
        if(res.list.length > 0){
          res.list.forEach((v,i)=>{
            let {lng,lat} = randomAddress()
            var html = `<div id="party" onClick="hj2(${lng},${lat},\'${v.infoName}\',\'http://192.168.1.146:8081/biaoqian/party.html?id=${v.id}&type=${orgType}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${orgType == 1 ? party1Url : (orgType == 2 ? party2Url : party3Url)}" style="width:50px;margin-bottom: 5px;"></div>`
            tagClick(type,tagShow.value[type],{lng,lat,html})
          })
        }else{
          proxy.$message.warning('暂无此类数据!')
        }
      },err=> proxy.$message.error(`${orgType == 1 ?'党工委' : (orgType == 2 ? '党直属组织' : '党支部')}数据请求错误！请稍后重试`) )
      return
    }

        // 重点管理人员 >>> 刑满释放
    const releaseClick = (item) => {
      tagShow.value[item] = !tagShow.value[item]
      getRelease().then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="release" onClick="hj2(${lng},${lat},\'刑满释放\',\'http://192.168.1.146:8081/biaoqian/releaseIndex.html?id=${v.id}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${releaseUr1}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(item,tagShow.value[item],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        }, err=> proxy.$message.error('刑满释放数据请求错误！请稍后重试') )
        return
    }

        // 重点管理人员 >>> 精神障碍
    const neuropathyClick = (item) => {
      tagShow.value[item] = !tagShow.value[item]
      getMental().then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="neuropathy" onClick="hj2(${lng},${lat},\'精神障碍\',\'http://192.168.1.146:8081/biaoqian/releaseIndex.html?id=${v.id}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${neuropathyUr1}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(item,tagShow.value[item],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        }, err=> proxy.$message.error('精神障碍数据请求错误！请稍后重试') )
        return
    }

        // 重点管理人员 >>> 社区戒毒
    const drugDetoxificationClick = (item) => {
      tagShow.value[item] = !tagShow.value[item]
      getDrug().then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="drugDetoxification" onClick="hj2(${lng},${lat},\'社区戒毒\',\'http://192.168.1.146:8081/biaoqian/releaseIndex.html?id=${v.id}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${drugDetoxificationUr1}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(item,tagShow.value[item],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        }, err=> proxy.$message.error('社区戒毒数据请求错误！请稍后重试') )
        return
    }

       // 重点管理人员 >>> 社会矫正
    const correctClick = (item) => {
      tagShow.value[item] = !tagShow.value[item]
      getRectify().then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="correct" onClick="hj2(${lng},${lat},\'社会矫正\',\'http://192.168.1.146:8081/biaoqian/releaseIndex.html?id=${v.id}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${correctUr1}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(item,tagShow.value[item],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        }, err=> proxy.$message.error('社会矫正数据请求错误！请稍后重试') )
        return
    }

         // 重点管理人员 >>> 稳控对象
    const controlClick = (item) => {
      tagShow.value[item] = !tagShow.value[item]
      getControl().then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="control" onClick="hj2(${lng},${lat},\'稳控对象\',\'http://192.168.1.146:8081/biaoqian/releaseIndex.html?id=${v.id}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${controlUr1}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(item,tagShow.value[item],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        }, err=> proxy.$message.error('稳控对象数据请求错误！请稍后重试') )
        return
    }



    // 智慧物业 >>> 车位位置
    const lotClick = (item) => {
      tagShow.value[item] = !tagShow.value[item]
      getParkLot().then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="parkingLotPosition" onClick="hj2(${lng},${lat},\'车位位置\',\'http://192.168.1.146:8081/biaoqian/parkLot.html?id=${v.id}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${lotUrl}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(item,tagShow.value[item],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        }, err=> proxy.$message.error('车位信息数据请求错误！请稍后重试') )
        return
    }

     // 智慧物业 >>> 摄像头,道闸,垃圾桶,充电桩
    const communalFacilitiesClick = (deviceType,type) => {
      tagShow.value[type] = !tagShow.value[type]
      getCommunalFacilities(deviceType).then(res=>{
        if(res.list.length > 0){
          res.list.forEach((v,i)=>{
            let {lng,lat} = randomAddress()
            var html = `<div id="communal" onClick="hj2(${lng},${lat},\'${v.deviceName}\',\'http://192.168.1.146:8081/biaoqian/communal.html?id=${v.id}&type=${deviceType}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${deviceType == 2 ? communalUrl : deviceType == 3 ? communalUr2 : (deviceType == 4 ? communalUr3 : communalUr4)}" style="width:50px;margin-bottom: 5px;"></div>`
            tagClick(type,tagShow.value[type],{lng,lat,html})
          })
        }else{
          proxy.$message.warning('暂无此类数据!')
        }
      },err=> proxy.$message.error(`${deviceType == 2 ?'摄像头' : deviceType == 3 ?'道闸' : (deviceType == 3 ? '垃圾桶' : '充电桩')}数据请求错误！请稍后重试`) )
      return
    }

        // 经济运行 >>> 重点企业,商务楼宇
    const economyClick = (cbType,type) => {
      tagShow.value[type] = !tagShow.value[type]
      getBuildingList(cbType).then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="businessBuilding" onClick="hj2(${lng},${lat},\'${v.cbName}\',\'http://192.168.1.146:8081/biaoqian/enterpriseBuilding.html?id=${v.id}&type=${cbType}&data=${encodeURIComponent(JSON.stringify(v))}',)" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${cbType == 1 ? economyUr1  : economyUr2 }" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(type,tagShow.value[type],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error(`${cbType == 1 ? '商务楼宇' : '重点企业'}数据请求错误！请稍后重试`) )
        return
    }

    // 经济运行 >>> 重点项目
    const keyProjectsClick = (item) => {
      tagShow.value[item] = !tagShow.value[item]
      getItemList().then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="keyProjects" onClick="hj2(${lng},${lat},\'重点项目\',\'http://192.168.1.146:8081/biaoqian/keyProjects.html?id=${v.id}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${keyProjectsUr1}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(item,tagShow.value[item],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        }, err=> proxy.$message.error('重点项目数据请求错误！请稍后重试') )
        return
    }


    // 民生保障 >>> 服务机构
    const serviceClick = (orgType,type) => {
      
      tagShow.value[type] = !tagShow.value[type]
      getHaidi(orgType).then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="party" onClick="hj2(${lng},${lat},\'${v.orgName}\',\'http://192.168.1.146:8081/biaoqian/service.html?id=${v.id}&type=${orgType}&data=${encodeURIComponent(JSON.stringify(v))}',)" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${orgType == 1 ? serviceUrl1  : serviceUrl2 }" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(type,tagShow.value[type],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error(`${orgType == 1 ? '残联服务中心' : '养老中心'}数据请求错误！请稍后重试`) )
        return
    }
    // 民生保障 >>> 应急
    const meetClick = (type1,type) => {
      
      tagShow.value[type] = !tagShow.value[type]
      getSuppList(type1).then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="party" onClick="hj2(${lng},${lat},\'${v.suppliesName}\',\'http://192.168.1.146:8081/biaoqian/meet.html?id=${v.id}&type=${type1}&data=${encodeURIComponent(JSON.stringify(v))}',)" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${type1 == 2 ? meetUrl1 : (type1 == 3 ? meetUrl2 : meetUrl3)}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(type,tagShow.value[type],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error(`${type1 == 1 ? '应急物资' : (type1 == 3 ? '应急站点':'消防栓')}数据请求错误！请稍后重试`) )
        return
    }
    // 应急指挥 >>> 烟感&一键报警器
    const smokeClick = (deviceType,type) => {
      
      tagShow.value[type] = !tagShow.value[type]
      getSmokeList(deviceType).then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="party" onClick="hj2(${lng},${lat},\'${v.deviceName}\',\'http://192.168.1.146:8081/biaoqian/smoke.html?id=${v.id}&type=${deviceType}&data=${encodeURIComponent(JSON.stringify(v))}',)" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${deviceType == 1 ? smokeUrl1 : smokeUrl2}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(type,tagShow.value[type],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error(`${deviceType == 1 ? '烟感' : '一键'}报警器数据请求错误！请稍后重试`) )
    }
    const handleClick = async (item)  => {
      handleClickOpen('')
      if (item.type == 'party') {
        isOpenType.value = item.type
        handleClickOpen('')
        partyClick(1,item.type)
      } else if (item.type == 'underParty') {
        isOpenType.value = item.type
        handleClickOpen('')
        partyClick(2,item.type)
      } else if (item.type == 'partyBranch') {
        isOpenType.value = item.type
        handleClickOpen('')        
        partyClick(3,item.type)
        return
      } else if (item.type == 'partyVan') {
        handleClickOpen('')
        getPartyList();
        handleClickOpen('isOpen')
        show.value = item.title;
        isOpenType.value = item.type
      } else if (item.type == 'brand') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
      } else if (item.type == 'workShow') {
        isOpenType.value = item.type
        show.value = item.title;
        handleClickOpen('')
        getList(item.showType,item.level1,item.level2,item.level3).then(res=>{
          if(res.list.length > 0){
            workShowList.value = res.list
            handleClickOpen('isOpen')
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error('工作展示数据请求错误！请稍后重试') )        
        return
      }else if (item.type == 'workResults') {
        isOpenType.value = item.type
        show.value = item.title;
        handleClickOpen('')
        getList(item.showType,item.level1,item.level2,item.level3).then(res=>{
          if(res.list.length > 0){
            workShowList.value = res.list
            handleClickOpen('isOpen')
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error('工作展示数据请求错误！请稍后重试') )        
        return
      }
      // else if (item.type == "building") {
      //   handleClickOpen('')
      //   getList(item.showType,item.level1,item.level2,item.level3).then(res=>{
      //     if(res.list.length > 0){
      //       workShowList.value = res.list
      //       handleClickOpen('isOpen')
      //     }else{
      //       proxy.$message.warning('暂无此类数据!')
      //     }
      //   },err=> proxy.$message.error('残联服务中心数据请求错误！请稍后重试') )        
      //   return
      // } 
      else if (item.type == "building") {
        tagShow.value[item.type] = !tagShow.value[item.type]
        floorTagClick(item,tagShow.value[item.type])
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
      } else if(item.type == "eventQuery"){
        isOpenType.value = item.type
        handleClickOpen('')
         show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
            handleEventQuery();
        }, 1000);
      } else if(item.type == "hotline"){
         isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
            handleHotlineQuery();
        }, 1000);
      } else if(item.type == "release"){
        isOpenType.value = item.type
        handleClickOpen('')        
        releaseClick(item.type)
      } else if(item.type == "neuropathy"){
        isOpenType.value = item.type
        handleClickOpen('')        
        neuropathyClick(item.type)
      } else if(item.type == "someDayEvent"){
         var html = '<div id="release" onClick="hj2(16600,9484,\'计算小楼\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>计算小楼</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(16600, 9484, html);
        return;
      } else if(item.type == "drugDetoxification"){
        isOpenType.value = item.type
        handleClickOpen('')        
        drugDetoxificationClick(item.type)
      } else if(item.type == "correct"){
        isOpenType.value = item.type
        handleClickOpen('')   
        correctClick(item.type)
      } else if(item.type == "control"){
        isOpenType.value = item.type
        handleClickOpen('')   
        controlClick(item.type)
        //  var html = '<div id="release" onClick="hj2(21176,5124,\'北楼\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>北楼</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        // vMap.showMapMark(21176, 5124, html);
        // return;
      } else if(item.type == "briefIntroduction"){
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
            getInfo();
        }, 1000);
      } else if (item.type == 'haidi') {
        isOpenType.value = item.type
        handleClickOpen('')
        serviceClick(1,item.type)
      } else if (item.type == 'provide') {
        isOpenType.value = item.type
        handleClickOpen('')
        serviceClick(2,item.type)
        return
      } else if (item.type == 'parkingLotPosition') {
        isOpenType.value = item.type
        handleClickOpen('')        
        lotClick(item.type)
      } else if (item.type == 'cameraPosition') {
        isOpenType.value = item.type
        handleClickOpen('')
        communalFacilitiesClick(2,item.type)

      } else if (item.type == 'roadGatePosition') {
        isOpenType.value = item.type
        handleClickOpen('')
        communalFacilitiesClick(3,item.type)
      }else if (item.type == 'trashCanPosition') {
        isOpenType.value = item.type
        handleClickOpen('')
        communalFacilitiesClick(4,item.type)
      } else if (item.type == 'chargingPilePosition') {
        isOpenType.value = item.type
        handleClickOpen('')
        communalFacilitiesClick(5,item.type)
        return
      } else if (item.type == 'businessBuilding') {
        isOpenType.value = item.type
        handleClickOpen('')
        economyClick(1,item.type)
      }else if (item.type == 'keyEnterprises') {
        isOpenType.value = item.type
        handleClickOpen('')
        economyClick(2,item.type)
        return
      }else if (item.type == 'keyProjects') {
        isOpenType.value = item.type
        handleClickOpen('')        
        keyProjectsClick(item.type)
      }else if (item.type == 'service') {
        isOpenType.value = item.type
        handleClickOpen('')
        
        let type = item.type + item.staffType
        tagShow.value[type] = !tagShow.value[type]
        getStaff(item.staffType).then(res=>{
          if(res.list.length > 0){
            res.list.forEach((v,i)=>{
              let {lng,lat} = randomAddress()
              var html = `<div id="serive" onClick="hj2(${lng},${lat},\'重点服务人员\',\'http://192.168.1.146:8081/biaoqian/servicePeople.html?id=${v.id}&type=${item.staffType}&data=${encodeURIComponent(JSON.stringify(v))}')" style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="${item.staffType == 3 ? servicePeoUrl1 : (item.staffType == 10 ? servicePeoUrl2 : (item.staffType == 2 ? servicePeoUrl3 : servicePeoUrl4))}" style="width:50px;margin-bottom: 5px;"></div>`
              tagClick(type,tagShow.value[type],{lng,lat,html})
            })
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error('重点服务人员数据请求错误！请稍后重试') )
        return
      } else if (item.type == 'policy') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      } else if (item.type == 'process') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        // setTimeout(()=>{
        //   console.log(brandList.value,'222')
        //   brandList.value.length && handleSelect(brandList.value[0])
        // },100)
        nextTick(()=>{
          brandList.value.length && handleSelect(brandList.value[0])
        })
        return
      } else if (item.type == 'neighborhood') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      } else if (item.type == 'liveworkshow') {
        isOpenType.value = item.type
        show.value = item.title;
        handleClickOpen('')
        getList(item.showType,item.level1,item.level2,item.level3).then(res=>{
          if(res.list.length > 0){
            workShowList.value = res.list
            handleClickOpen('isOpen')
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error('工作展示数据请求错误！请稍后重试') )        
        return
      } else if (item.type == 'supplies') {
        isOpenType.value = item.type
        handleClickOpen('')
        meetClick(2,item.type)
      } else if (item.type == 'site') {
        isOpenType.value = item.type
        handleClickOpen('')
        meetClick(3,item.type)
      } else if (item.type == 'fireHydrant') {
        isOpenType.value = item.type
        handleClickOpen('')
        meetClick(4,item.type)
        return
      } else if (item.type == 'camera') {
        isOpenType.value = item.type
        handleClickOpen('')
        let {lng,lat} = randomAddress()
        var html = `<div id="party" onClick="hj2(${lng},${lat},\'村头超市监控\',\'http://www.baidu.com\',400,300)" style="cursor: pointer;display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>村头超市监控</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>`
        vMap.showMapMark(lng, lat, html);
        return
      } else if (item.type == 'smokeDetector') {
        isOpenType.value = item.type
        handleClickOpen('')
        smokeClick(1,item.type)
        return
      } else if (item.type == "smokeRecord") {
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        searchEventForm.value.eventFirstType = "8"
        setTimeout(() => {
          handleEventQuery();
        }, 1000);
      } else if (item.type == 'alarm') {
        isOpenType.value = item.type
        handleClickOpen('')
        smokeClick(2,item.type)
        return
      } else if (item.type == "hiddenDanger") {
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        setTimeout(() => {
          handleHiddenDangerQuery();
        }, 1000);
      } else if (item.type == 'pandemic') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      } else if (item.type == 'law') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      } else if (item.type == 'business') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      } else if (item.type == 'risk') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      } else if (item.type == 'integratedMarket') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      } else if (item.type == 'buildingEconomy') {
        getList(item.showType,item.level1,item.level2,item.level3)
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
        return
      }
      else if (item.type == 'drill') {
        isOpenType.value = item.type
        show.value = item.title;
        handleClickOpen('')
        getList(item.showType,item.level1,item.level2,item.level3).then(res=>{
          if(res.list.length > 0){
            workShowList.value = res.list
            handleClickOpen('isOpen')
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error('培训宣传数据请求错误！请稍后重试') )        
        return
      } else if (item.type == 'training') {
        isOpenType.value = item.type
        show.value = item.title;
        handleClickOpen('')
        getList(item.showType,item.level1,item.level2,item.level3).then(res=>{
          if(res.list.length > 0){
            workShowList.value = res.list
            handleClickOpen('isOpen')
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error('应急培训数据请求错误！请稍后重试') )        
        return
      } else if (item.type == 'casewarning') {
        isOpenType.value = item.type
        show.value = item.title;
        handleClickOpen('')
        getList(item.showType,item.level1,item.level2,item.level3).then(res=>{
          if(res.list.length > 0){
            workShowList.value = res.list
            handleClickOpen('isOpen')
          }else{
            proxy.$message.warning('暂无此类数据!')
          }
        },err=> proxy.$message.error('案列警告数据请求错误！请稍后重试') )        
        return
      }


    };
    // 智能物业 >>> 车位位置
    const getParkLot = () => {
      return new Promise((resolve,reject)=>{
        getParkLotList({pageNum:1,pageSize:9999}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }

//公共设施 
    const getCommunalFacilities = (deviceType) => {
       return new Promise((resolve,reject)=>{
        getPubilcList({pageNum:1,pageSize:9999,deviceType}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }


//刑满释放
        const getRelease = () => {
       return new Promise((resolve,reject)=>{
        getReleaseList({pageNum:1,pageSize:9999}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }


//戒毒
        const getDrug = () => {
       return new Promise((resolve,reject)=>{
        getDrugList({pageNum:1,pageSize:9999}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }

    //精神障碍
        const getMental = () => {
       return new Promise((resolve,reject)=>{
        getMentalList({pageNum:1,pageSize:9999}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }

    //社会矫正
        const getRectify = () => {
       return new Promise((resolve,reject)=>{
        getRectifyList({pageNum:1,pageSize:9999}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }

    //上访人员
        const getControl = () => {
       return new Promise((resolve,reject)=>{
        getPetitionList({pageNum:1,pageSize:9999}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }

    //经济运行>>重点企业,商务楼宇 
    const getBuildingList = (cbType) => {
       return new Promise((resolve,reject)=>{
        buildingList({pageNum:1,pageSize:9999,cbType}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }

    //经济运行>>重点项目 
      const getItemList = (orgType) => {
      return new Promise((resolve,reject)=>{
        itemList({pageNum:1,pageSize:9999,orgType}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }

    // 民生保障 >>> 服务机构请求接口
    const getHaidi = (orgType) => {
      return new Promise((resolve,reject)=>{
        getProvide({pageNum:1,pageSize:9999,orgType}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }
    // 民生保障 >>> 重点服务人员请求接口
    const getStaff = (staffType) => {
      return new Promise((resolve,reject)=>{
        getStaffList({pageNum:1,pageSize:9999,staffType}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }
    

    // 应急指挥 >>> 应急物资
    const getSuppList = (type1) => {
      return new Promise((resolve,reject)=>{
        getSupp({pageNum:1,pageSize:9999,type1}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }
    // 应急指挥 >>> 烟感设备&一键报警器
    const getSmokeList = (deviceType) => {
      return new Promise((resolve,reject)=>{
        getSmoke({pageNum:1,pageSize:9999,deviceType}).then(res=>{
          if(res.resCode == '000000'){
            resolve(res.data)
          }else{
            reject('false')
          }
        })
      })
    }
    // 应急指挥 >>> 烟隐患排查记录
    const hiddenDangerRef = ref(null)
    const searchHiddenDangerForm = reactive({
      officeName: "",
      officeCode: "",
    });
    const searchHiddenDangerParams = ref({})
    const handleHiddenDangerReset = (formEL) => {
      formEL.resetFields();
      searchEventParams.value = {};
      defaultObject(searchHiddenDangerForm);
      handleHiddenDangerQuery();
    };
    const handleHiddenDangerQuery = () => {
      searchHiddenDangerParams.value = deepClone(searchHiddenDangerForm);
      hiddenDangerRef.currentPage = 1;
      handleQueryHiddenTable();
    }
    const formHiddenHandle =  {
      btns: [
        {type: "primary",label: "查询", key: "search",handle: handleHiddenDangerQuery,},
        {type: "primary", label: "重置", key: "reset", handle: handleHiddenDangerReset,},
      ],
    };
    const handleQueryHiddenTable = () => {
      hiddenDangerRef.value.getTableData(searchHiddenDangerParams.value, (res) => {
        const data = res.list || [];
        tableHiddenDangerConfig.data = data;
      });
    };
    const handleHiddenSelectChange  = ({ officeCode, officeName }) => {
      searchHiddenDangerForm.officeCode = officeCode;
      searchHiddenDangerForm.officeName = officeName;
    };
    // 
    onBeforeMount(() => {
      initTagState()
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

    return {
      fullHeight,
      mapDialogData,
      dialogVisible,
      handleCloseDialog,
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
      handleClick,
      ...toRefs(dialogVis),
      show,
      // showTitleObj,
      searchParams,
      // 党建弹窗
      isOpenType,
      brandList,
      workShowList,
      gisid,
      // 
      tagShow,
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
      handleSelect,
      policyItem,
      url,
      hiddenDangerRef,
      formHiddenHandle,
      searchHiddenDangerForm,
      formHiddenDangerConfig,
      tableHiddenDangerConfig,
      handleHiddenSelectChange,
      // 
      buildTime,
      houseDialogVisible,
      handleCloseBuild,
      // 
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

  scrollbar-width: none;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
}
.carousel_box{
  width:100%;
  height:100%;
}
.carousel_box .showBox{
  max-height:500px ;
  overflow-y: scroll;
}
::v-deep .el-carousel__container{
  height: 400px;
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
/* 驾驶舱 */
.coclpitDialog {
  width: 100%;
  /* height: 500px;  */
  min-height: 300px;
  border: 1px solid #bad23c;
  box-sizing: border-box;
  padding: 5px;
  background: #242f42;
  color: #fff;
  background: transparent;
}
.coclpitDialog > div {
  margin: 20px 0;
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
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.tableBox{
  height: 400px;
  overflow: scroll;
}
.policy_left_top{
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 230px;
}
.policy_left_top>img{
  width: 50px;
  margin-right: 20px;
}
.policy_left{
  width: 230px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  height: 400px;
  overflow: scroll;
  border: 1px solid #acc2cf;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.policy_left_item{
  width:100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px dashed #4190bd;
  cursor: pointer;
}
</style>

