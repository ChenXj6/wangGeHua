<template>
  <div style="position: relative">
    <div
      class="vMap"
      :style="{ height: !fullHeight ? '100vh' : fullHeight + 'px' }"
      id="dituContent"
    ></div>
    <div class="sidebar">
      <div class="sidebar-item">
        <el-dropdown placement="left-start" trigger="click">
          <el-button type="goon" size="mini" round style="width: 88px">
            党组织
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleClick">党工委</el-dropdown-item>
              <el-dropdown-item>直属党组织</el-dropdown-item>
              <el-dropdown-item>党支部</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="sidebar-item">
        <el-dropdown placement="left-start" trigger="click">
          <el-button type="goon" size="mini" style="width: 88px" round>
            食物<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>sssssssssss黄金糕</el-dropdown-item>
              <el-dropdown-item>ssssssssss狮子头</el-dropdown-item>
              <el-dropdown-item>sssssssss螺蛳粉</el-dropdown-item>
              <el-dropdown-item>aaaaaaaaaaaaa双皮奶</el-dropdown-item>
              <el-dropdown-item>ccccccccccccc蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="sidebar-item">
        <el-dropdown placement="left-start" trigger="click">
          <el-button type="goon" size="mini" style="width: 88px" round>
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>111111111</el-dropdown-item>
              <el-dropdown-item>22222222222</el-dropdown-item>
              <el-dropdown-item>32312312323</el-dropdown-item>
              <el-dropdown-item>111</el-dropdown-item>
              <el-dropdown-item @click="showMyMapMark"
                >显示标签</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- store.state.mapDialog.visible -->
    <div v-if="dialogVisible" class="headerDialogBox">
      <div class="headerDialog">
        <div v-for="(item) in mapDialogData.children" :key="item.id">
          <img :src="item.img" alt="" />
          <span>{{ item.title }}</span>
        </div>
      </div>
      <i
        class="el-icon-lx-roundclose headerDialogIcon"
        style="color: #fff; font-size: 30px"
        @click="handleCloseDialog"
      ></i>
    </div>
    <!-- 楼栋弹窗 -->
    <el-dialog
      :title="buildForm.villageName + buildForm.buildingNumber"
      v-model="houseDialogVisible"
      width="60%"
      draggable
      style="z-index: 9999"
      :before-close="dialogBeforeClose"
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
                :class="item.unitNumber == searchForm.unitNumber ? 'active' : ''"
                @click="getHouseByUnit(item.unitNumber)"
              >
                <img src="@/assets/img/build.webp" alt="" srcset="" />
                <span>{{unitNumberOptions.filter(v=>v.value == item.unitNumber)[0]?.label}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5" class="buildFloor">
            <h4>楼层信息：</h4>
            <hr />
            <div>
              <div class="floor" v-for="item in floorArr(buildForm.floorNumber)" :class="(item.floorId + 1) == searchForm.floorId ? 'active' : ''" :key="item" @click="getHouseByFloor(item.floorId+1)">{{ item.floorId + 1 }}F</div>
            </div>
          </el-col>
          <el-col :span="19" class="houseBox">
            <h4>{{ buildForm.buildingNumber }}-{{ searchForm.unitNumber }}{{ searchForm.unitNumber ? '单元' : '' }}-{{ searchForm.floorId }}{{ searchForm.floorId ? '楼' : '' }}房屋人员信息：</h4>
            <!-- <hr> -->
            <el-row :gutter="10">
              <el-col :span="10">
                <div v-if="isHaveHouse" class="noHouse">
                  <img src="@/assets/img/loading.gif" alt="loading" srcset="" />
                  <p>Loading...</p>
                </div>
                <div v-else-if="houseList.length <= 0" class="noList">
                  暂无数据
                </div>
                <div v-else class="house">
                  <div class="houseItem" @click="getPeople(item.houseNumber)" v-for="(item) in houseList" :key="item">
                    <img src="@/assets/img/loading.gif" alt="" />
                    <p>{{ item.houseNumber }}</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" class="borderRight">
                <div v-if="isHavePeople" class="noPeople">
                  <img src="@/assets/img/loading.gif" alt="loading" srcset="" />
                  <p>Loading...</p>
                </div>
                <div v-else-if="houseList.length <= 0" class="noList">
                  暂无数据
                </div>
                <div v-else class="people house">
                  <div class="peopleItem" v-for="item in peopleList" :key="item.id">
                    <img
                      :src="item.certificates.length ? `${imgUrl}${item.certificates.split(',')[0]}` : ''"
                      alt=""
                    />
                    <p><span>姓名：</span> <span>{{ item.name }}</span></p>
                    <!-- <p><span>年龄：</span> <span>{{ item.age }}</span></p> -->
                    <p><span>户籍：</span> <span>{{ item.domicile }}</span></p>
                    <p><span>户主关系：</span> <span>{{relationshipOptions.filter(v=>v.value == item.relationship)[0]?.label}}</span></p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 事件处置弹窗 -->
    <el-dialog
      title=""
      v-model="eventHandleVisible"
      width="width">
      <div>
        <el-form ref="recordFormRef" :model="dataForm" :rules="rules" label-width="150px">
        <el-form-item label="处置方式" prop="dealStatus">
          <el-select v-model="dataForm.dealStatus" size="mini" placeholder="请选择处置方式">
            <el-option
              v-for="item in dataSourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流转人" v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3" prop="launchBy">
          <el-input v-model="dataForm.launchRemark" size="mini" placeholder="" @click="handleChangeLaunch"></el-input>
        </el-form-item>
        <el-form-item label="处理时限" v-if="dataForm.dealStatus == 2 || dataForm.dealStatus == 3">
          <el-date-picker
            v-model="dataForm.updateDate"
            type="datetime"
            size="mini"
            placeholder="请选择时间"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item label="处理意见" prop="dealRemark">
          <el-input v-model="dataForm.dealRemark" type="textarea" size="mini" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="eventHandleVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleRecord(recordFormRef)">确 定</el-button>
      </template>
    </el-dialog>
        <!-- 流转人弹窗 -->
    <el-dialog
      title="选择流转人"
      v-model="userDialogVisible"
      width="40%">
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <el-table
              :data="launchList"
              @selection-change="(val)=>(multipleSelection = val)"
              style="width: 100%">
              <el-table-column type="selection" width="55" />
              <el-table-column
                prop="id"
                label="ID"
                width="100">
              </el-table-column>
              <el-table-column
                prop="operatorId"
                label="账号"
                width="140">
              </el-table-column>
              <el-table-column
                prop="operatorName"
                label="姓名"
                width="width">
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6" style="border:1px solid #ddd">
            <div>当前已选择{{ multipleSelection.length }}项：</div>
            <div class="checkSpan" v-for="(item) in multipleSelection" :key="item.id">{{ item.operatorName }}</div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button size="mini" type="primary" @click="handleSubmitUser">确定</el-button>
        <el-button size="mini" type="primary" @click="userDialogVisible = false">返回</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, watch } from '@vue/runtime-core'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getUnitByBuild } from '@/api/ActualInfo/build.js'
import { searchDict } from '@/api/sys/dict'
import { getUserList } from '@/api/sys/user'
import { eventProcessing } from '@/api/ResidentsReport/index'
import { resetFormat as resetFormatStatus } from '@/utils/util'
import { getHouseList } from '@/api/ActualInfo/house'
import { getPeopleList } from '@/api/ActualInfo/people'
export default {
  setup() {
    let vMap = ref(null)
    let fullHeight = ref('')
    let timer = null
    const store = useStore()
    const route = useRoute()
    const dialogVisible = ref(false)
    const mapDialogData = ref(null)
    const { proxy } = getCurrentInstance()
    // 楼栋
    const imgUrl = ref(import.meta.env.VITE_IMG_BASE_API)
    const houseDialogVisible = ref(false) //楼栋弹窗
    const buildForm = ref({}) // 楼栋表单
    const unitList = ref([]) // 楼栋弹窗单元列表
    const houseList = ref([])
    const peopleList = ref([])
    const isHaveHouse = ref(false)
    const isHavePeople = ref(false)
    // 小区名字  楼号  单元号   房屋号
    const searchForm = ref({
      villageName:'',
      buildingNumber:'',
      unitNumber:'1',
      floorId:1,
      houseNumber:'',
      pageNum:'1',
      pageSize:'9999',
    })
    const floorArr = (floorNumber) => {
      let arr = []
      for(let i = floorNumber ; i > 0;i--){
        let obj = {}
        obj.floorId = i - 1
        arr.push(obj)
      }
      return arr
    }
    // 事件处置弹窗
    const recordFormRef = ref(null)
    const eventHandleVisible = ref(false)
    const userDialogVisible = ref(false)
    const dataForm = ref({})
    const formData = ref(null)
    const dataSourceOptions = ref([])
    const launchList  = ref([])
    const multipleSelection = ref([])
    const rules = reactive({
      dealStatus:[
        {required: true, message:'请选择处置方式', trigger: 'blur'}
      ],
      launchBy:[
        {required: true, message:'请选择流转人', trigger: ['change','blur']}
      ],
      dealRemark:[
        {required: true, message:'请输入处理意见', trigger: 'blur'}
      ],
    })
    const getOptionsByCode = (basictype,data) => {
      searchDict({basictype}).then(res=>{
        if(res.resCode == '000000' && res.data){
          data.value = resetFormatStatus(res.data)
        }else{
          data.value = []
        }
      })
    }
    // liuzhuan
    const handleChangeLaunch = () => {
      userDialogVisible.value = true
      multipleSelection.value = []
      dataForm.value.launchRemark = ''
      handleQueryUserTable()
    }
    const handleQueryUserTable = () => {
      getUserList({pageNum: 1,pageSize: 50}).then(res=>{
        if(res.code == '200'){
          launchList.value = res.data.list
        }
      })
    }
    const handleSubmitUser = () => {
      if(multipleSelection.value.length <= 0){
        proxy.$message.warning({message:'请至少选择一位流转人',customClass:'messageIndex'})
        return
      }
      userDialogVisible.value = false
      let str = ''
      let idStr = ''
      multipleSelection.value.forEach(v=>{
        str = str + v.operatorName + ','
        idStr = idStr + v.operatorId + ','
      })
      dataForm.value.launchRemark = str.substr(0,str.length-1)
      dataForm.value.launchBy = idStr.substr(0,idStr.length-1)
    }
    const handleRecord = async (formRef) => {
      dataForm.value.id = formData.value.id
      dataForm.value.eventId = formData.value.id
      dataForm.value.createBy = JSON.parse(sessionStorage.getItem('user')).operatorId,
      await formRef.validate((vaild) => {
        if(vaild){
          eventProcessing(dataForm.value).then(res=>{
            if(res.resCode == '000000'){
              eventHandleVisible.value = false
              proxy.$message.success('处置成功')
              store.dispatch('delEvent',dataForm.value)
            }
          })
        }else{
          return
        }
      })
    }
    window.handleManageBtn = (obj) => {
      formData.value = obj
      eventHandleVisible.value = true
    }
    // 初始化GIS地图
    const VMapRender = function () {
      vMap = new VMap()
      vMap.createMap('dituContent')
      //设置中心点，目前是像素坐标
      var point = new Point(18000, 8194)
      //创建地图配置文件
      var config = new Config()
      //设置中心点和缩放层级
      config.centerAndZoom(point, 4)
      //设置加载地图类型
      //1：三维地图
      //2：平面地图
      config.setMapType(1)
      //设置鹰眼是否显示(默认不显示)
      config.setEyeMap(false)
      //设置标签是否显示(默认不显示)
      config.setLabel(true)
      //设置全景是否显示(默认不显示)
      config.setPano(false)
      //设置停车场是否显示(默认不显示)
      config.setStop(false)
      //设置路名是否显示(默认不显示)
      config.setRoad(false)
      config.setPopUrl('')
      //加载地图
      vMap.loadMap(config)
    }
    watch(fullHeight, () => {
      reLoadMap()
      VMapRender()
    })
    // 点击导航栏 弹窗
    watch(
      () => store.state.mapDialog,
      () => {
        dialogVisible.value = store.state.mapDialog.visabled
        mapDialogData.value = store.state.mapDialog.data
      },
      { deep: true }
    )
    const handleCloseDialog = () => [store.dispatch('closeDialog')]
    const randomAddress = () => {
      let sum = Math.round(Math.random() * 3)
      let arr = [
        { lng: '18624', lat: '8178' },
        { lng: '14440', lat: '5260' },
        { lng: '21352', lat: '5074' },
        { lng: '16570', lat: '5160' },
      ]
      return arr[sum]
    }
    randomAddress()
    // 获取楼栋信息
    const getBuild = (buildingId) => {
      getUnitByBuild({ buildingId }).then((res) => {
        if (res.resCode == '000000') {          
          unitList.value = res.data.unit
          buildForm.value = res.data.build
          searchForm.value.villageName = res.data.build.villageName
          searchForm.value.buildingNumber = res.data.build.buildingNumber
          houseDialogVisible.value = true
          getHouseApi()
          getPeopleApi()
        }
      })
    }
    const getHouseByUnit = (unitNumber) => {
      searchForm.value.unitNumber = unitNumber
      searchForm.value.houseNumber = ''
      isHaveHouse.value = true
      getHouseApi()
    }
    const getHouseByFloor = (floorNumber) => {
      searchForm.value.floorId = floorNumber
      searchForm.value.houseNumber = ''
      isHaveHouse.value = true
      getHouseApi()
    }
    const getPeople = (houseNumber) => {
      searchForm.value.houseNumber = houseNumber
      isHavePeople.value = true
      getPeopleApi()
    }
    const getHouseApi = () => {
      getPeopleList(searchForm.value).then(res=>{
        if(res.resCode == '000000'){
          isHaveHouse.value = false
          houseList.value = res.data.list
          peopleList.value = []
        }
        // console.log(res,'getHouseApi')
      })
    }
    const getPeopleApi = () => {
      getPeopleList(searchForm.value).then(res=>{
        // console.log(res,'getPeopleApi')
        if(res.resCode == '000000'){
          isHavePeople.value = false
          peopleList.value = res.data.list
        }
      })
    }
    const eventDialogStyle = () => {
      setTimeout(() => {
        let arr = JSON.parse(sessionStorage.getItem('eventName'))
        let { lng, lat } = randomAddress()
        let obj = arr[0]
        speak(obj)
        vMap.showMapPopWin(
          lng,
          lat,
          `${obj.eventName}`,
          '/src/assets/index.html',
          400,
          300
        )
      }, 1000)
    }
    onMounted(() => {
      // 是否有紧急事件通知 具体数值
      if (!!route.params.isClick) {
        store.state.isAddEventList && eventDialogStyle()
        store.state.isAddEventList = false
      }
      window.onresize = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fullHeight.value = document.documentElement.clientHeight
        }, 1000)
      }
      VMapRender()
      vMap.onMapClick( (x0, y0, id, title, identitycode) => {
        
        getBuild(19)
      })
    })
    watch(() => store.state.eventList,() => {
        store.state.isAddEventList && eventDialogStyle()
        store.state.isAddEventList = false
      },
      { deep: true }
    )
    // 事件播报事件
    const speak = (obj) => {
      proxy.$speak(
        `事件名称：${obj?.eventName},发生地点:${obj?.cityName}${
          obj?.communityName
        }${obj?.gridName}${obj.eventPlace ?? ''}`
      )
    }

    onBeforeMount(()=>{
      getOptionsByCode(1026,dataSourceOptions);
    })
    // 恢复地图未加载默认状态
    const reLoadMap = () => {
      if (typeof jv != 'undefined') {
        jv = false
      }
      if (typeof fz != 'undefined') {
        fz = false
      }
    }
    onBeforeRouteLeave(() => {
      reLoadMap()
    })
        // 
    const unitNumberOptions = ref([])
    const relationshipOptions = ref([])
    getOptionsByCode(1052,unitNumberOptions)
    getOptionsByCode(1014,relationshipOptions)
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
      handleChangeLaunch,
      userDialogVisible,
      handleRecord,
      launchList,
      handleSubmitUser,
      multipleSelection,
      rules,
      recordFormRef,
      unitNumberOptions,
    }
  },
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
  color: #fff;
  background-color: #242f42;
  border-color: #242f42;
}
.headerDialogBox {
  position: absolute;
  width: 700px;
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
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.headerDialog > div {
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
  /* background: block; */
}
.headerDialog > div > img {
  width: 80%;
  height: 60%;
}
h4 {
  height: 20px;
}
.buildInfoBox {
  height: 122px;
  color: #333;
}
.buildInfoBox > p > span {
  display: inline-block;
  width: 70px;
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
.active{
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
.noList{
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
  width: 60px;
  height: 60px;
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

.checkSpan{
  display: inline-block;
  padding: 2px 5px 3px;
  background: #e3edf5;
  color: #4190bd;
  border: 1px solid #acc2cf;
  border-radius: 2px;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
