<template>
<div style="position: relative;">
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
            <el-dropdown-item @click="showMyMapMark">显示标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- store.state.mapDialog.visible -->
  <div v-if="dialogVisible" class="headerDialogBox">
    <div class="headerDialog">
      <div v-for="(item,ind) in mapDialogData.children" :key="item.id">
        <img :src="item.img" alt="">
        <span>{{ item.title }}</span>
      </div>
    </div>
    <i class="el-icon-lx-roundclose headerDialogIcon" style="color:#fff;font-size:30px" @click="handleCloseDialog"></i>
  </div>
  <!-- 楼栋弹窗 -->
  <!-- :title="buildList[0].streetName + buildList[0]." -->
  <el-dialog    
    title="楼栋信息"
    v-model="houseDialogVisible"
    width="60%"
    draggable
    style="z-index:9999"
    :before-close="dialogBeforeClose">
    <div>
      <el-row :gutter="10">
        <el-col :span="5" class="buildInfoBox">
          <h4>楼栋信息：</h4>
          <hr>
          <p><span>楼长：</span> 张志远</p>
          <p><span>联系电话：</span> 18759873462</p>
          <p><span>楼层数：</span> 15</p>
          <p><span>人口：</span> 200</p>
        </el-col>
        <el-col :span="19" class="buildListBox">
          <h4>楼栋单元：</h4>
          <hr>
          <div class="buildListItemBox">
            <div class="buildListItem" v-for="item in buildList" :key="item.id" @click="getHouse(item.id)">
              <img src="@/assets/img/build.webp" alt="" srcset="">
              <span>{{item.unitNumber}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5" class="buildFloor">
          <h4>楼层信息：</h4>
          <hr>
          <div>
            <div class="floor">1</div>
            <div class="floor">2</div>
            <div class="floor">3</div>
            <div class="floor">4</div>
            <div class="floor">1</div>
            <div class="floor">2</div>
            <div class="floor">3</div>
            <div class="floor">4</div>
            <div class="floor">1</div>
            <div class="floor">2</div>
            <div class="floor">3</div>
            <div class="floor">4</div>
          </div>
        </el-col>
        <el-col :span="19" class="houseBox">
          
        </el-col>
      </el-row>
    </div>
  </el-dialog>
  <!-- 事件弹窗 -->
  <!-- <div class="eventBox"></div> -->
</div>


</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
} from '@vue/runtime-core'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getHouseList,getPeopleByHouseList } from '@/api/ActualInfo/build.js'
export default {
  setup() {
    let vMap = ref(null)
    let fullHeight = ref('')
    let timer = null
    const store = useStore()
    const route = useRoute()
    const dialogVisible = ref(false)
    const mapDialogData = ref(null)
    const {
      proxy: { $speak },
    } = getCurrentInstance()

    const houseDialogVisible = ref(false)  //楼栋弹窗
    const buildList = ref([]) // 楼栋弹窗列表
    const houseList = ref([])
    // 事件弹窗
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
      config.setPopUrl('');
      //加载地图
      vMap.loadMap(config)
    }
    watch(fullHeight, () => {
      reLoadMap()
      VMapRender()
    })
    // 点击导航栏 弹窗
    watch(()=>store.state.mapDialog, () => {
      dialogVisible.value = store.state.mapDialog.visabled
      mapDialogData.value = store.state.mapDialog.data
    },
    {deep:true}
    )
    const handleCloseDialog = () => [
      store.dispatch('closeDialog')
    ]
    const randomAddress = () => {
      let sum = Math.round(Math.random()*3)
      let arr = [
        {lng:'18624',lat:'8178'},
        {lng:'14440',lat:'5260'},
        {lng:'21352',lat:'5074'},
        {lng:'16570',lat:'5160'},
      ]
      return arr[sum]
    }
    randomAddress()
    // 获取楼栋信息
    const getBuild = (id) => {
      getHouseList({id}).then(res=>{
        if(res.resCode == '000000'){
          buildList.value =  res.data.reverse()
        }
      })
    }
    const getHouse = (buildingId) => {
      getPeopleByHouseList({buildingId}).then(res=>{
        if(res.resCode == '000000'){
          houseList.value = res.data
        }
      })
    }
    const eventDialogStyle = () => {
      setTimeout(()=>{
          let arr = JSON.parse(sessionStorage.getItem('eventName'))
          let {lng,lat} = randomAddress()
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
        },1000)
    }
    onMounted(() => {
      setTimeout(()=>{
          let arr = JSON.parse(sessionStorage.getItem('eventName'))
          let obj = arr[0]
          speak(obj)
          vMap.showMapPopWin(
            21352,
            5074,
            `${obj.eventName}`,
            '/src/assets/index.html',
            400,
            300
          )
        },1000)

      // 是否有紧急事件通知 具体数值
      if(!!route.params.isClick){
        eventDialogStyle()       
      }
      window.onresize = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fullHeight.value = document.documentElement.clientHeight
        }, 1000)
      }
      VMapRender()
      vMap.onMapClick((x0, y0, id, title, identitycode) => {
        houseDialogVisible.value = true
        getBuild(10)
      })
    })
    watch(()=>store.state.eventList,(newValue)=>{
        eventDialogStyle()
      },
      {deep:true}
    )
    const speak = (obj) => {
      $speak(`事件名称：${obj?.eventName},发生地点:${obj?.cityName}${obj?.communityName}${obj?.gridName}${obj.eventPlace ?? ''}`)
    }
    
    window.handleManageBtn = () => {
      console.log('aaaa')
    }
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
    return {
      fullHeight,
      mapDialogData,
      dialogVisible,
      handleCloseDialog,
      houseDialogVisible,
      buildList,
      houseList,
      getHouse,
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
.headerDialogBox{
  position: absolute;
  width: 700px;
  min-height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-60%);
  background:rgba(36, 47, 66,0.7);
  z-index: 9999;
  padding: 50px;
  border-radius: 10px;
}
.headerDialogIcon{
  position: absolute;
  top: 10px;
  right: 10px;
}
.headerDialog{
  width: 100%;
  height: 100%;
  min-height: 300px;
  border: 1px solid #bad23C;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.headerDialog>div{
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
.headerDialog>div:hover{
  opacity: .8;
  border: 1px dashed #fff;
  /* background: block; */
}
.headerDialog>div>img{
  width: 80%;
  height: 60%;
}
h4{
  height: 20px;
}
.buildInfoBox{
  height: 122px;
  color: #333;
}
.buildInfoBox>p>span{
  display: inline-block;
  width: 70px;
  color: #999;
}
.buildListBox{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.buildListBox>h4{
  width: 100%;
  height: 20px;
}
.buildListItemBox{
  display: flex;
  justify-content: start;
  overflow: scroll;

}
.buildListItem{
  height:100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 10px;
}
.buildListItem>img{
  width: 50px;
  /* height: 200px; */
}
.buildFloor{
  min-height: 300px;
}
.buildFloor>div{
  margin: 0 auto;
  width: 100%;
  overflow-y: scroll;
  max-height: 300px;
}
.floor{
  width: 60%;
  margin-left: 20%;
  height: 40px;
  background: #bad23C;
  border-radius: 5px;
  transform: rotateX(45deg);
  transform: rotate(10deg);
  transform: skewX(160deg);
  transform: translateY(-100);
}
.floor:hover{
  transform: scale(1.1);
  background: darkgoldenrod;
}
::-webkit-scrollbar {
	/*隐藏滚轮*/
	display: none;
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
</style>
