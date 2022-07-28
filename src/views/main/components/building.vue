<template>
  <div v-show="isShow">
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
  <div v-if="!isShow" style="">

  </div>
</template>
<script>
import { getPeopleList, getGISPeople } from "@/api/ActualInfo/people";
import { ref } from '@vue/reactivity';
import { searchDict } from "@/api/sys/dict";
import { resetFormat as resetFormatStatus } from "@/utils/util";
import { defineComponent, onBeforeMount } from '@vue/runtime-core';
import { getUnitByBuild } from "@/api/ActualInfo/build.js";
export default defineComponent({
  props: {
    buildingId: {
      type: String,
      default: () => ''
    },
  },
  emits: ['update:buildingVisible'],
  setup (props) {
    const buildId = ref(props.buildingId)
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
    const getBuild = (buildingId) => {
      getUnitByBuild({ buildingId }).then(async (res) => {
        if (res.resCode == "000000") {
          unitList.value = res.data.unit;
          buildForm.value = res.data.build;
          searchForm.value.buildingId = buildingId
          searchForm.value.villageName = res.data.build.villageName;
          searchForm.value.buildingNumber = res.data.build.buildingNumber;
          houseList.value = await getHouseApi()
          isHaveHouse.value = true
          peopleList.value = await getPeopleApi()
          isHavePeople.value = true
          isShow.value = true
        } else {

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
    const relationshipOptions = ref([]);
    const unitNumberOptions = ref([]);
    getOptionsByCode(1052, unitNumberOptions);
    getOptionsByCode(1014, relationshipOptions);
    onBeforeMount(() => {
      getBuild(buildId.value)
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

    }
  },
})
</script>
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
</style>