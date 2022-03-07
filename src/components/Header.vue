<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse && !pageStatus" class="el-icon-s-fold"></i>
      <i v-else-if="!pageStatus" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-data-line"></i>
    </div>
    <div class="logo">南村街道社会治理网格化智能工作平台</div>
    <div v-if="pageStatus" class="header-context">
      <header-sidebar />
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="go-back" @click="pageChange()">
          <i class="change-state el-icon-sort"></i>
          <span>{{ status }}</span>
        </div>
        <div class="full-screen" @click="handleFullScreen()">
          <i class="full-screen el-icon-full-screen"></i>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import HeaderSidebar from "./Header-sidebar.vue";
export default {
  components: {
    HeaderSidebar,
  },
  setup() {
    const router = useRouter();
    const { fullPath } = useRoute();
    const status = ref("进入后台");
    const fullscreen = ref(false);
    const username = localStorage.getItem("ms_username");
    const message = 2;
    const store = useStore();
    const collapse = computed(() => store.state.collapse);
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
      if (fullPath && fullPath === "/main") {
        // 前台地图页
        return true;
      } else {
        return false;
      }
    });
    const pageChange = () => {
      router.push(`/${pageStatus.value ? "dashboard" : "main"}`);
    };
    onMounted(() => {
      if (pageStatus.value) {
        status.value = "进入后台";
      } else {
        status.value = "返回前台";
      }
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
    });
    // 用户名下拉菜单选择事件
    const handleCommand = (command) => {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        router.push("/login");
      } else if (command == "user") {
        router.push("/user");
      }
    };

    return {
      status,
      username,
      message,
      collapse,
      pageStatus,
      collapseChage,
      handleCommand,
      pageChange,
      handleFullScreen,
    };
  },
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 375px;
  line-height: 70px;
}
.header-context {
  float: left;
  padding-left: 20px;
  height: 70px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.full-screen {
  display: flex;
  justify-content: center;
  height: 70px;
  width: 30px;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  margin: 0 5px;
}
.go-back {
  display: flex;
  justify-content: space-evenly;
  height: 70px;
  width: 90px;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}
.go-back > .change-state {
  font-size: 16px;
}
.btn-bell{
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
</style>
