<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn"
         @click="collapseChage">
      <i v-if="!collapse && !pageStatus"
         class="el-icon-s-fold"></i>
      <i v-else-if="!pageStatus"
         class="el-icon-s-unfold"></i>
      <i v-else
         class="el-icon-data-line"></i>
    </div>
    <div class="logo"
         @click="router.push('/map')">社会治理网格化智能工作平台</div>
    <div v-if="pageStatus"
         class="header-content">
      <header-sidebar />
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="dateWeather">
          <div>
            {{ nowTime }}
          </div>
          <div>
            <!-- <div id="he-plugin-simple"></div> -->
            <Weather/>
          </div>
        </div>
        <div class="go-back"
             @click="pageChange()">
          <i class="change-state el-icon-sort"></i>
          <span>{{ status }}</span>
        </div>
        <div class="full-screen"
             @click="handleFullScreen()">
          <i class="full-screen el-icon-full-screen"></i>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark"
                      :content="message ? `有${message}条未读消息` : `消息中心`"
                      placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge"
                v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/img/img.jpg"
               alt="author" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name"
                     trigger="click"
                     @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- {{ username }} -->
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided
                                command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import HeaderSidebar from "./Header-sidebar.vue";
import Weather from "./Weather.vue";
export default {
  components: {
    HeaderSidebar,
    Weather,
  },
  setup () {
    const router = useRouter();
    const { fullPath } = useRoute();
    const status = ref("后台");
    const fullscreen = ref(false);
    const username = ''
    const message = 2;
    const store = useStore();
    const collapse = computed(() => store.state.collapse);
    const nowTime = ref('')
    let timer = ref(null)
    // 侧边栏折叠
    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
    };
    const handleFullScreen = () => {
      const element = document.documentElement;
      if (fullscreen.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      fullscreen.value = !fullscreen.value
    };
    // 当前是地图显示页还是后台页面
    const pageStatus = computed(() => {
      if (fullPath && (fullPath === "/main" || fullPath === '/map')) {
        // 前台地图页
        return true;
      } else {
        return false;
      }
    });
    const pageChange = () => {
      router.push(`/${pageStatus.value ? "dashboard" : ""}`);
    };
    onMounted(() => {
      if (pageStatus.value) {
        status.value = "后台";
      } else {
        status.value = "驾驶舱";
      }
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
    });
    // 用户名下拉菜单选择事件
    const handleCommand = (command) => {
      if (command == "loginout") {
        store.dispatch('delHealthDegree')
        store.dispatch('closeSocket')
        store.state.eventList = []
        sessionStorage.removeItem('eventName')
        store.dispatch('clearMenu')
        router.push("/login");
      } else if (command == "user") {
        router.push("/user");
      }
    };

    // 动态显示时间
    const timeFormate = (timeStamp) => {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = "星期" + weeks[week];
      nowTime.value = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm + ':' + ss + ' ' + getWeek;
    }
    const nowTimes = () => {
      timeFormate(new Date())
      clearInterval(timer.value)
      timer.value = setInterval(nowTimes, 1000)
    }
    onMounted(() => {
      nowTimes()      
    })
    onBeforeUnmount(() => {
      clearInterval(timer.value)
    })
    return {
      router,
      status,
      username,
      message,
      collapse,
      pageStatus,
      collapseChage,
      handleCommand,
      pageChange,
      handleFullScreen,
      nowTime,
    };
  },
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 20px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 10px 0 25px;
  cursor: pointer;
  line-height: 60px;
}
.header .logo {
  float: left;
  min-width: 250px;
  line-height: 60px;
  cursor: pointer;
}
.header-content {
  float: left;
  padding-left: 20px;
  height: 60px;
  line-height: 60px;
}
.header-right {
  float: right;
  padding-right: 25px;
}
.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}
.full-screen {
  display: flex;
  justify-content: center;
  height: 60px;
  width: 30px;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;
}
.go-back {
  display: flex;
  justify-content: space-evenly;
  height: 60px;
  width: 60px;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}
.go-back > .change-state {
  font-size: 14px;
}
.btn-bell {
  position: relative;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.dateWeather {
  font-size: 12px;
  width: 185px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  margin-right: 10px;
  z-index: 999;
  user-select: none;
  font-style: italic;
}
</style>
