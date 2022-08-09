<template>
<el-dialog title="楼栋人员信息"
               v-model="houseDialogVisible"
               width="60%"
               draggable
               style="z-index: 9999;">
  <div v-if="isShow" >
    <el-row :gutter="10">
      <el-col :span="5"
              class="buildInfoBox">
        <h4>楼栋信息：</h4>
        <hr />
        <p><span>楼长：</span> {{ buildForm.housemaster }}</p>
        <p><span>联系电话：</span>{{ buildForm.housemasterPhone }}</p>
        <p><span>楼层数：</span> {{ buildForm.floorNumber }}</p>
        <p><span>总户数：</span> {{ buildForm.houseNumber }}</p>
      </el-col>
      <el-col :span="19"
              class="buildListBox">
        <h4>楼栋单元：</h4>
        <hr />
        <div class="buildListItemBox">
          <div class="buildListItem"
               v-for="item in unitList"
               :key="item.unitNumber"
               :class="
                  item.unitNumber == searchForm.unitNumber ? 'active' : ''
                "
               @click="getHouseByUnit(item.unitNumber)">
            <img src="@/assets/img/unit.jpg"
                 alt=""
                 srcset="" />
            <span>{{
                  unitNumberOptions.filter((v) => v.value == item.unitNumber)[0]
                    ?.label
                }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="5"
              class="buildFloor">
        <h4>楼层信息：</h4>
        <hr />
        <div>
          <div class="floor"
               v-for="item in floorArr(buildForm.floorNumber)"
               :class="item.floorId + 1 == searchForm.floorId ? 'active' : ''"
               :key="item"
               @click="getHouseByFloor(item.floorId + 1)">
            {{ item.floorId + 1 }}F
          </div>
        </div>
      </el-col>
      <el-col :span="19"
              class="houseBox">
        <h4>
          {{ buildForm.buildingNumber }}-{{ searchForm.unitNumber
              }}{{ searchForm.unitNumber ? "单元" : "" }}-{{ searchForm.floorId
              }}{{ searchForm.floorId ? "楼" : "" }}房屋人员信息：
        </h4>
        <!-- <hr> -->
        <el-row :gutter="10">
          <el-col :span="10">
            <!-- {{ houseList.length }} -->
            <div v-if="!isHaveHouse"
                 class="noHouse">
              <img src="@/assets/img/loading.gif"
                   alt="loading"
                   srcset="" />
              <p>Loading...</p>
            </div>
            <div v-else-if="houseList.length <= 0"
                 class="noList">
              暂无数据
            </div>
            <div v-else
                 class="house">
              <div class="houseItem"
                   @click="getPeople(item.houseNumber)"
                   v-for="item in houseList"
                   :class="item.houseNumber == searchForm.houseNumber ? 'active' : ''"
                   :key="item">
                <img src="@/assets/img/house.png"
                     alt="" />
                <p>{{ item.houseNumber }}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="14"
                  class="borderRight">
            <div v-if="!isHavePeople"
                 class="noPeople">
              <img src="@/assets/img/loading.gif"
                   alt="loading"
                   srcset="" />
              <p>Loading...</p>
            </div>
            <div v-else-if="peopleList.length <= 0"
                 class="noList">
              暂无数据
            </div>
            <div v-else
                 class="people house">
              <div class="peopleItem"
                   v-for="item in peopleList"
                   @click="handleOpenDetail(item)"
                   :key="item">
                <img :src="
                        item?.certificates?.length
                          ? `${imgUrl}${item.certificates.split(',')[0]}`
                          : ''
                      "
                     alt="" />
                <p>
                  <span>姓名：</span> <span>{{ item.name }}</span>
                </p>
                <p>
                  <span>户籍：</span> <span>{{ item.domicile }}</span>
                </p>
                <p>
                  <span>户主关系：</span>
                  <!-- <span>{{
                        relationshipOptions.filter(
                          (v) => v.value == item.relationship
                        )[0]?.label
                      }}</span> -->
                </p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <!-- 骨架屏 -->
  <div v-else-if="!isShow" style="min-height:450px">
    <el-skeleton :throttle="500" animated >
    <template #template>
      <el-row :gutter="10">
        <el-col :span="5" class="buildInfoBox">
          <h4>楼栋信息：</h4>
          <hr />
          <el-skeleton-item variant="p"/>
          <el-skeleton-item variant="p"/>
          <el-skeleton-item variant="p"/>
          <el-skeleton-item variant="p"/>
        </el-col>
        <el-col :span="19" class="buildListBox">
          <h4>楼栋单元：</h4>
          <hr/>
          <div class="buildListItemBox">
            <div class="buildListItem"
                v-for="item in 10"
                :key="item">
                <el-skeleton-item variant="img" style="width:40px;height:65px" />
                <el-skeleton-item></el-skeleton-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5" class="buildFloor">
          <h4>楼层信息：</h4>
          <hr/>
          <div>
            <el-skeleton-item class="skeletonFloor" v-for="item in 5" :key="item"/>
          </div>
        </el-col>
        <el-col :span="19" class="houseBox">
          <h4>房屋人员信息：</h4>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="house">
                <div class="houseItem" v-for="item in 4" :key="item">
                  <el-skeleton-item variant="img" style="width: 30px;height:60px"/>
                  <el-skeleton-item variant="p"/>
                </div>
              </div>
            </el-col>
            <el-col :span="14" class="borderRight">
              <div class="people house">
                <div class="peopleItem" v-for="item in 4" :key="item">
                  <el-skeleton-item variant="img" style="width: 100%;height: 100px;"/>
                  <el-skeleton-item variant="p"/>
                  <el-skeleton-item variant="p"/>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
  </div>
  </el-dialog>
  <!--  -->
  <el-drawer
    v-model="drawer"
    title="人员详细信息"
    :direction="direction"
    :before-close="handleClose"
  >
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="peopleDetail">
          <div class="imgBox">
            <img class="peopleImg" :src="imgUrl+peopleDeatil.certificates" alt="">
          </div>
          <p>姓名：<span>{{ peopleDeatil.name }}</span></p>
          <p>性别：<span>{{ peopleDeatil.gender == 0 ? '男' : '女' }}</span></p>
          <p>户籍：<span>{{ peopleDeatil.domicile }}</span></p>
          <p>住址：<span> {{ peopleDeatil.countyName }}{{ peopleDeatil.streetName }}{{ peopleDeatil.communityName }}{{ peopleDeatil.gridName }}</span></p>
          <p>楼栋：<span>{{ peopleDeatil.villageName }}{{ peopleDeatil.buildingNumber }}{{ peopleDeatil.unitNumber }}{{ peopleDeatil.unitNumber?'单元':'' }} {{ peopleDeatil.houseNumber }}</span></p>
          <p>疫苗接种情况：<span>{{ peopleDeatil.flagYmXg == 1 ? '已接种' : '未接种' }}</span></p>
        </div>
      </el-col>
    </el-row>
  </el-drawer>
</template>
<script>
import { getPeopleList, getGISPeople } from "@/api/ActualInfo/people";
import { ref } from '@vue/reactivity';
import { searchDict } from "@/api/sys/dict";
import { resetFormat as resetFormatStatus,isNull } from "@/utils/util";
import { defineComponent, getCurrentInstance, onBeforeMount, onMounted } from '@vue/runtime-core';
import { getUnitByBuild } from "@/api/ActualInfo/build.js";
export default defineComponent({
  props: {
    gisid: {
      type: String,
      default: () => ''
    },
    houseDialogVisible: {
      type: Boolean,
      default: () => false
    }
  },
  emits:['update:houseDialogVisible'],
  setup (props,{emit}) {
    const gisid = ref(props.gisid)
    const { proxy:{$message} } = getCurrentInstance()
    const houseDialogVisible = ref(props.houseDialogVisible)
    // 楼栋
    const imgUrl = ref(import.meta.env.VITE_IMG_BASE_API);
    const buildForm = ref({}); // 楼栋表单
    const unitList = ref([]); // 楼栋弹窗单元列表
    const houseList = ref([]);
    const peopleList = ref([]);
    const isHaveHouse = ref(true);
    const isHavePeople = ref(true);
    // 小区名字  楼号  单元号   房屋号
    const searchForm = ref({
      buildingId: '',
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
    const isShow = ref(false)
    // 获取楼栋信息
    const getBuild = (gisid) => {
      getUnitByBuild({ gisid }).then(async (res) => {
        if (res.resCode == "000000") {
          if(res.data.unit.length == 0 && isNull(res.data.build)){
            setTimeout(() => {
              emit('update:houseDialogVisible',false)
            }, 100);
            $message.warning({message:'暂无该楼栋信息',customClass:'messageIndex'})
          }else{
            unitList.value = res.data.unit;
            buildForm.value = res.data.build;
            searchForm.value.buildingId = res.data.build.id
            searchForm.value.villageName = res.data.build.villageName;
            searchForm.value.buildingNumber = res.data.build.buildingNumber;
            houseList.value = await getHouseApi()
            isHaveHouse.value = true
            peopleList.value = await getPeopleApi()
            isHavePeople.value = true
            emit('update:houseDialogVisible',true)
            isShow.value = true

          }
        } else {
          emit('update:houseDialogVisible',false)
          $message.error({message:res.message,customClass:'messageIndex'})
        }
      });
    };

    const getHouseByUnit = (unitNumber) => {
      searchForm.value.unitNumber = unitNumber;
      searchForm.value.houseNumber = "";
      isHaveHouse.value = false;
      isHavePeople.value = false
      peopleList.value = []
      getHouseApi().then(res => {
        isHaveHouse.value = true
        houseList.value = res
      });
      getPeopleApi().then(res => {
        isHavePeople.value = true
        peopleList.value = res
      });
    };
    const getHouseByFloor = (floorNumber) => {
      searchForm.value.floorId = floorNumber;
      searchForm.value.houseNumber = "";
      isHaveHouse.value = false;
      isHavePeople.value = false
      peopleList.value = []
      getHouseApi().then(res => {
        isHaveHouse.value = true
        houseList.value = res
      });
      getPeopleApi().then(res => {
        isHavePeople.value = true
        peopleList.value = res
      });
    };
    const getPeople = (houseNumber) => {
      searchForm.value.houseNumber = houseNumber;
      isHavePeople.value = false;
      getPeopleApi().then(res => {
        peopleList.value = res
        isHavePeople.value = true
      });
    };
    const getHouseApi = async () => {
      return new Promise((resolve, reject) => {
        getGISPeople(searchForm.value).then((res) => {
          if (res.resCode == "000000") {
            resolve(res.data.list)
          }
        });
      })
    };
    const getPeopleApi = async () => {
      return new Promise((resolve, reject) => {
        getPeopleList(searchForm.value).then((res) => {
          if (res.resCode == "000000") {
            resolve(res.data.list);
          }
        });
      })
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
    // 打开
    const drawer = ref(false)
    const peopleDeatil = ref({})
    const handleOpenDetail = (data) => {
      // console.log('打开人员详细信息')
      // console.log(data)
      peopleDeatil.value = data
      drawer.value = true
    }
    const handleClose = () => {
      peopleDeatil.value = {}
      drawer.value = false
    }
    const relationshipOptions = ref([]);
    const unitNumberOptions = ref([]);
    getOptionsByCode(1052, unitNumberOptions);
    getOptionsByCode(1014, relationshipOptions);
    onMounted(() => {
      getBuild(gisid.value)
    })
    return {
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
      unitNumberOptions,
      getBuild,
      // 
      isShow,
      // 
      handleOpenDetail,
      peopleDeatil,
      drawer,
      handleClose,
      houseDialogVisible,
    }
  },
})
</script>
<style>
.messageIndex{
  z-index: 9999 !important;
}
</style>
<style scoped>
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
.skeletonFloor{
  width: 60%;
  margin-left: 20%;
  height: 40px;
  border-radius: 5px;
  transform: rotateX(45deg);
  transform: rotate(10deg);
  transform: skewX(160deg);
  transform: translateY(-100);
  cursor: pointer;
  line-height: 40px;
  text-align: center;
}
.active {
  transform: scale(1.1);
  background: #242f42 !important;
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
.peopleDetail{
  padding: 30px;
  font-size: 14px;
}
.peopleDetail > p{
  margin: 10px 0;
  font-weight: 700;
}
.imgBox{
  width: 100%;
  /* height: 150px; */
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.peopleImg{
  width: 200px;
  border-radius: 20px;
}
</style>