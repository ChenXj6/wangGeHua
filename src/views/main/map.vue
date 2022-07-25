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
                     trigger="hover">
          <el-button type="goon"
                     size="mini"
                     round
                     style="width: 88px">
            {{ item?.title }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in item.children"
                                :key="item"
                                @click="handleClick(item)">{{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>

          </template>
        </el-dropdown>
        <el-button type="goon"
                   size="mini"
                   round
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
        <div>
          <el-row class="showBox">
            <template v-if="isOpenType == 'partyVan'">
              <h1 style="text-align: center">{{show}}</h1>
              <el-carousel :interval="5000"
                           arrow="never"
                           v-if="searchParams.list"
                           indicator-position="outside"
                           style="width: 1000px;margin-top:30px">
                <el-carousel-item :span="18"
                                  v-for="(item, index) in searchParams.list"
                                  :key="index">
                  <el-col :span="6"
                          class="vanguard">
                    <img src="https://img0.baidu.com/it/u=640038218,836613496&fm=253&fmt=auto&app=138&f=JPEG?w=460&h=620" />
                  </el-col>
                  <p>姓名：{{ item.memberName }}</p>
                  <p>
                    性别：{{sexOptions.filter((v) => v.value == item.gender)[0]?.label}}
                  </p>
                  <p>归属党组织：{{item.infoName}}</p>
                  <p>电话：{{item.phone}}</p>
                  <span>简介：{{ item.memberSynopsis }}</span>
                </el-carousel-item>
              </el-carousel>
            </template>
            <template v-else-if="isOpenType == 'brand'">
              <el-carousel :interval="5000"
                           arrow="never"
                           v-if="brandList.length"
                           indicator-position="outside"
                           style="width: 1000px;">
                <el-carousel-item :span="24"
                                  v-for="(item, index) in brandList"
                                  :key="index">
                  <h1 style="text-align: center">{{item.title}}</h1>
                  <div style="overflow:scroll;height:300px;margin-top:20px;">
                    <div v-html="item.content"
                         style="margin-bottom:100px"></div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </template>
            <template v-else-if="isOpenType == 'workShow'">
              <el-carousel :interval="5000"
                           arrow="never"
                           v-if="workShowList.length"
                           indicator-position="outside"
                           style="width: 1000px;">
                <el-carousel-item :span="24"
                                  v-for="(item, index) in workShowList"
                                  :key="index">
                  <h1 style="text-align: center">{{show}}</h1>
                  <div style="height:300px;text-align:center">
                    <template v-if="item.type == 'img'">
                      <img :src="item.url"
                           :alt="item.title"
                           style="height:100%">
                    </template>
                    <template v-else-if="item.type == 'video'">
                      <video :src="item.url"
                             style="height:100%"
                             controls></video>
                    </template>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-row>
        </div>
      </div>
      <i class="el-icon-lx-roundclose headerDialogIcon"
         style="color: #fff; font-size: 30px; cursor: pointer"
         @click="handleCloseDialog('isOpen')"></i>
    </div>
    <!-- 驾驶舱弹窗 -->
    <div v-if="isOpenCockpit"
         class="coclpit">
      <div class="headerDialog">
        <div>
          <h1 style="text-align: center">驾驶舱</h1>
        </div>
        <Coclpit />
      </div>
      <i class="el-icon-lx-roundclose headerDialogIcon"
         style="color: #fff; font-size: 30px; cursor: pointer"
         @click="handleCloseDialog('isOpenCockpit')"></i>
    </div>
    <!-- 楼栋弹窗-->
    <el-dialog title="楼栋人员信息"
               v-model="houseDialogVisible"
               width="60%"
               draggable
               style="z-index: 9999">
      <Building :buildingId="buildingId" />
    </el-dialog>
    <!-- 事件处置弹窗 -->
    <el-dialog title=""
               v-model="eventHandleVisible"
               width="width">
      <div>
        <el-form ref="recordFormRef"
                 :model="dataForm"
                 :rules="rules"
                 label-width="150px">
          <el-form-item label="处置方式"
                        prop="dealStatus">
            <el-select v-model="dataForm.dealStatus"
                       size="mini"
                       placeholder="请选择处置方式">
              <el-option v-for="item in dataSourceOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流转人"
                        v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3"
                        prop="launchBy">
            <el-input v-model="dataForm.launchRemark"
                      size="mini"
                      placeholder=""
                      @click="handleChangeLaunch"></el-input>
          </el-form-item>
          <el-form-item label="处理时限"
                        v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3">
            <el-date-picker v-model="dataForm.updateDate"
                            type="datetime"
                            size="mini"
                            placeholder="请选择时间"
                            style="width: 100%" />
          </el-form-item>
          <el-form-item label="处理意见"
                        prop="dealRemark">
            <el-input v-model="dataForm.dealRemark"
                      type="textarea"
                      size="mini"
                      placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini"
                   @click="eventHandleVisible = false">取 消</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="handleRecord(recordFormRef)">确 定</el-button>
      </template>
    </el-dialog>
    <!-- 流转人弹窗 -->
    <el-dialog title="选择流转人"
               v-model="userDialogVisible"
               width="40%">
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <el-table :data="launchList"
                      @selection-change="(val) => (multipleSelection = val)"
                      style="width: 100%">
              <el-table-column type="selection"
                               width="55" />
              <el-table-column prop="id"
                               label="ID"
                               width="100">
              </el-table-column>
              <el-table-column prop="operatorId"
                               label="账号"
                               width="140">
              </el-table-column>
              <el-table-column prop="operatorName"
                               label="姓名"
                               width="width">
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6"
                  style="border: 1px solid #ddd">
            <div>当前已选择{{ multipleSelection.length }}项：</div>
            <div class="checkSpan"
                 v-for="item in multipleSelection"
                 :key="item.id">
              {{ item.operatorName }}
            </div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button size="mini"
                   type="primary"
                   @click="handleSubmitUser">确定</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="userDialogVisible = false">返回</el-button>
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
} from "@vue/runtime-core";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useStore } from "vuex";
import { searchDict } from "@/api/sys/dict";
import { getUserList } from "@/api/sys/user";
import { eventProcessing } from "@/api/ResidentsReport/index";
import { resetFormat as resetFormatStatus } from "@/utils/util";
import { PartyList } from "@/api/PartyBuilding/partyInfo";
import { PartyPeopleList } from "@/api/PartyBuilding/partyPeople";
import { getDraft } from '@/api/Propaganda/draft'
import Coclpit from './components/coclpit.vue'
import Building from './components/building.vue'

import Notice from './components/notice.vue'
export default {
  components: { Notice, Coclpit, Building },
  setup () {
    let vMap = ref(null);
    let fullHeight = ref("");
    let timer = null;
    const store = useStore();
    const route = useRoute();
    const dialogVisible = ref(false);
    const mapDialogData = ref(null);
    const { proxy } = getCurrentInstance();
    // 楼栋
    const houseDialogVisible = ref(false)
    const buildingId = ref('')
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
    let searchParams = ref({});
    const getPartyList = () => {
      PartyPeopleList({ pageNum: 1, pageSize: 99 }).then((res) => {
        searchParams.value = res.data;
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
        buildingId.value = '19'
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
    // 数字党建 >>> 品牌打造模块
    const show = ref('');
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
    // 数字党建 >>> 工作展示模块
    const workShowList = ref([
      { id: 1, title: 'a', type: 'img', url: 'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202107/1418474776831426560.jpg' },
      { id: 2, title: 'a', type: 'video', url: 'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202112/1468426165151420416.mp4' },
      { id: 3, title: 'a', type: 'img', url: 'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202107/1418474760540749824.jpg' },
      { id: 4, title: 'a', type: 'img', url: 'http://123.233.250.69:9090/gridManageFiles/userfiles/fileupload/202107/1418464766973935616.jpg' },
    ])
    // 数字党建弹窗控制模块
    const handleClick = (item) => {
      if (item.type == 'party') {
        var html = '<div id="party" onClick="hj2(17408,7178,\'南村街道党工委\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>南村街道党工委</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(17408, 7178, html);
        isOpenType.value = item.type
        return
      } else if (item.type == 'underParty') {
        var html = '<div id="party" onClick="hj2(19524,7796,\'南村街道直属党组织\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>南村街道直属党组织</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
        vMap.showMapMark(19524, 7796, html);
        isOpenType.value = item.type
        return
      } else if (item.type == 'partyBranch') {
        var html = '<div id="party" onClick="hj2(18648,9718,\'南村街道党支部\',\'http://www.baidu.com\',400,300)" style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>南村街道党支部</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'

        vMap.showMapMark(18648, 9718, html);
        isOpenType.value = item.type
        return
      } else if (item.type == 'partyVan') {
        handleClickOpen('')
        getPartyList();
        handleClickOpen('isOpen')
        show.value = item.title;
        isOpenType.value = item.type
      } else if (item.type == 'brand') {
        getDraftList()
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
      } else if (item.type == 'workShow') {
        isOpenType.value = item.type
        handleClickOpen('')
        show.value = item.title;
        handleClickOpen('isOpen')
      }


    };
    onBeforeMount(() => {
      getOptionsByCode(1026, dataSourceOptions);
      getOptionsByCode(1009, sexOptions);
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
      houseDialogVisible,
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
      searchParams,
      // 党建弹窗
      isOpenType,
      brandList,
      workShowList,
      buildingId,
    };
  },
};
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
  width: 900px;
  min-height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  background: rgba(36, 47, 66, 0.7);
  z-index: 9999;
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
  min-height: 300px;
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
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
