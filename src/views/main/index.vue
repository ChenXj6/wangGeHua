<template>
  <div class="about">
    <v-header />
    <div class="main-content-box">
      <div style="height: 100%"
           id="dituContent"></div>
      <!-- <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div> -->
    </div>
  </div>
</template>
<script>
import vHeader from "../../components/Header.vue";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    vHeader,
  },
  setup () {
    const VMapRender = function () {
      var vMap = new VMap();
      vMap.createMap("dituContent");
      //设置中心点，目前是像素坐标
      var point = new Point(18000, 8194);
      //创建地图配置文件
      var config = new Config();
      //设置中心点和缩放层级
      config.centerAndZoom(point, 3);
      //设置加载地图类型
      //1：三维地图
      //2：平面地图
      config.setMapType(1);
      //设置鹰眼是否显示(默认不显示)
      config.setEyeMap(false);
      //设置标签是否显示(默认不显示)
      config.setLabel(true);
      //设置全景是否显示(默认不显示)
      config.setPano(false);
      //设置停车场是否显示(默认不显示)
      config.setStop(false);
      //设置路名是否显示(默认不显示)
      config.setRoad(false);
      //加载地图
      vMap.loadMap(config);
    }
    onMounted(() => {
      VMapRender()
    });
  },
};
</script>
<style scoped>
</style>
