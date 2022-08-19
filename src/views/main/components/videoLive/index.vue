<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <div class="listBox">
        <div class="item" v-for="(item) in videoList" :title="item.deviceName" :class="findElem(checkMultipleSelection, 'id', item.id) > -1? 'active' : ''" :key="item.id" @click="handleCheck(item)">
          <div>
            <img src="@/assets/img/videolive.png" alt="">
          </div>
          <p>{{ item.deviceName }}</p>
        </div>
        <div class="item" v-for="(item) in videoList" :title="item.deviceName" :class="findElem(checkMultipleSelection, 'id', item.id) > -1? 'active' : ''" :key="item.id" @click="handleCheck(item)">
          <div>
            <img src="@/assets/img/videolive.png" alt="">
          </div>
          <p>{{ item.deviceName }}</p>
        </div>
      </div>
      <div class="btnBox">
        <span >已选中:{{ checkMultipleSelection.length }}个</span>
        <el-button type="primary" size="small" @click="handleShow">播 放</el-button>
      </div>
    </el-col>
    <el-col :span="18" >
      <template v-if="multipleSelection.length == 1">
        <div class="videoBox">
          <p>{{ multipleSelection[0].deviceName }}</p>
          <video id="video0" class="player" controls muted autoplay loop >
              浏览器不支持 video 标签。
          </video>
        </div>
      </template>
      <template v-if="multipleSelection.length == 2">
        <el-row :gutter="10">
          <el-col :span="12" v-for="(item,i) in multipleSelection" :key="item.id">
            <div class="videoBox">
              <p>{{ item.deviceName }}</p>
              <video :id="`video${i}`" class="player" controls  muted autoplay loop >
                  浏览器不支持 video 标签。
              </video>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-if="multipleSelection.length == 3">
        <el-row :gutter="10">
          <el-col :span="8" v-for="(item,i) in multipleSelection" :key="item.id">
            <div class="videoBox">
              <p>{{ item.deviceName }}</p>
              <video :id="`video${i}`" class="player" controls muted autoplay loop >
                  浏览器不支持 video 标签。
              </video>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-if="multipleSelection.length == 4">
          <div class="video4Box">
            <div class="video4Item" v-for="(item,i) in multipleSelection" :key="item.id">
              <p>{{ item.deviceName }}</p>
              <video :id="`video${i}`" class="player" controls muted autoplay loop >
                  浏览器不支持 video 标签。
              </video>
            </div>
          </div>
      </template>
      <template v-if="multipleSelection.length > 4">
          <div class="video_more_Box">
            <div class="video_more_Item" v-for="(item,i) in multipleSelection" :key="item.id">
              <p>{{ item.deviceName }}</p>
              <video :id="`video${i}`" class="player" controls muted autoplay loop >
                  浏览器不支持 video 标签。
              </video>
            </div>
          </div>
      </template>
    </el-col>
  </el-row>
</template>
<script setup>
// import '@/assets/hls.min.js'
import { getPubilcList } from '@/api/SmartProperty/pubilc'

import { ref } from "@vue/reactivity"
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted } from "@vue/runtime-core"

const { proxy } = getCurrentInstance()
const videoList = ref([])
const checkMultipleSelection = ref([])
const multipleSelection = ref([])
const getVideoList = () => {
  getPubilcList({pageNum:1,pageSize:9999,deviceType:2}).then(res=>{
    if(res.resCode == '000000'){
      if(res.data.list.length > 0){
        videoList.value = res.data.list
      }else{
        proxy.$message.warning('暂无数据！')
      }
    }else{
      proxy.$message.error('摄像头数据请求失败，请稍后重试!')
    }
  })
}
const isActive = computed(()=>{
  checkMultipleSelection.value
})
function findElem(arrayToSearch, attr, val) {
   for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            return i;
        }
    }
    return -1;
}
const handleCheck = (data) => {
  if(checkMultipleSelection.value.length > 9){
    proxy.$message.warning('最多同时选择查看6个监控！')
    return
  }else {
    if(checkMultipleSelection.value.length == 0){
      checkMultipleSelection.value.push(data)
    }else{
      let result = findElem(checkMultipleSelection.value, 'id', data.id)
      if(result > -1){
        checkMultipleSelection.value.splice(result,1)
      }else{
        checkMultipleSelection.value.push(data)
      }
    }
  }
}
const handleShow = () => {
  multipleSelection.value = checkMultipleSelection.value
  // console.log(multipleSelection.value,'.....')
  multipleSelection.value.forEach((v,i)=>{
    nextTick(()=>{
      play('http\:\/\/36.152.250.158:83/EUrl/hZr1fXO/live.m3u8',`video${i}`)
    })
  })
  // console.log(multipleSelection.value.length,'multipleSelection.value.length')
}
const play = (url,id) => {
  if (Hls.isSupported()) {
    
		let hls = new Hls();
		let video = document.getElementById(id);
    // console.log(video,';;;')
		hls.loadSource(url);
		hls.attachMedia(video);
    
		hls.on(Hls.Events.MANIFEST_PARSED, function () {
			video.play();
		})
    
		hls.on(Hls.Events.ERROR, function () {
		})
	}
}

onBeforeMount(()=>{
  getVideoList()
})
</script>
<style scoped>
.video_more_Box{
  width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: scroll;
}
.video_more_Item{
  width: 33%;
  padding: 10px;
  box-sizing: border-box;
}
.video4Box{
  width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.video4Item{
  width: 50%;
  height: 50%;
  padding: 10px;
  box-sizing: border-box;
}
.video4Item > p{
  margin: 5px 0;
}
.videoBox{
  /* width: 100%; */
  height: 500px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px dashed #f5f5f5;
}
.videoBox > p{
  margin: 5px 0;
}
.player{
  width: 100%;
  height: 90%;
}
.listBox{
  width: 100%;
  height: 450px;
  display: flex;
  flex-wrap: wrap;
  /* align-items: flex-start; */
  justify-content: flex-start;
  position: relative;
  overflow: scroll;
}
.item{
  width: 30%;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #f5f5f5;
  color: #333;
  text-align: center;
  margin: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.item > p{
  width: 100%;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  overflow: hidden;
}
.item > div{
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item > div >img{
  height: 70px;
}

.btnBox{
  position: absolute;
  bottom: 0;
  width: 24%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  /* background: #f5f5f5; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.active::after{
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  clear: both;
  content:'✓';
  display: block;
  background: #999;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  line-height: 20px;
}
</style>