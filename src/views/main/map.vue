<template>
  <div
    class="vMap"
    :style="{ height: !fullHeight ? '100vh' : fullHeight + 'px' }"
    id="dituContent"
  ></div>
  <div class="sidebar">
    <div class="sidebar-item">
      <el-dropdown placement="left-start" trigger="click">
        <el-button type="goon" size="mini" round style="width: 88px">
          党组织<i class="el-icon-arrow-down el-icon--right"></i>
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
            <el-dropdown-item>第三方水电费水电费水电费</el-dropdown-item>
            <el-dropdown-item @click="showMyMapMark">显示标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-dialog
    title="提示"
    :visible="true"
    width="30%"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
  </el-dialog>
</template>
<script>
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from '@vue/runtime-core'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    let vMap = ref(null)
    let fullHeight = ref('')
    let timer = null
    const store = useStore()
    const route = useRoute()
    const {
      proxy: { $speak },
    } = getCurrentInstance()
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
      config.setPopUrl('http://domain/test.html')
      //加载地图
      vMap.loadMap(config)
    }
    watch(fullHeight, () => {
      reLoadMap()
      VMapRender()
    })
    //显示自定义地图标签
    function showMyMapMark() {
      var html =
        '<div style="display:inline;height:18px; line-height:18px;border:#FFFFFF solid 1px;padding:1px 2px 0px 2px;color:#FFFFFF;text-align:center; background-color:#ff9000"><nobr>标签内容</nobr></div><div style="height:9px;text-align:center;margin:-3px 0px 0px 0px"><img src="http://ustc.you800.com/images/textdiv_arrow.gif"></div>'
      //vMap.showMapMark(18821,10596,html);
      vMap.showMapMark(18624, 8178, html)
    }
    onMounted(() => {
      // 是否有紧急事件通知 具体数值
      if (route.params.isHaveEmergency) {
        setTimeout(() => {
          vMap.showMapPopWin(
            21352,
            5074,
            '紧急事件',
            '/src/assets/index.html',
            500,
            350
          )
        }, 5000)
      }

      window.onresize = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fullHeight.value = document.documentElement.clientHeight
        }, 1000)
      }
      VMapRender()
      vMap.onMapClick((x0, y0, id, title, identitycode) => {
        console.log(x0, y0, identitycode)
        vMap.showMapPopWin(x0, y0, title, 'https://www.baidu.com', 500, 370)
      })
    })
    const speak = (a) => {
      $speak('我收到消息了')
    }
    window.a123 = speak
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
      showMyMapMark,
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
</style>
