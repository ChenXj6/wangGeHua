<template>
  <div class="menu-box">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      mode="horizontal"
      background-color="#242f42"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "header-sidebar",
  setup() {
    const items = [
      {
        icon: "el-icon-lx-home",
        index: "/dashboard",
        title: "系统首页",
      },
      {
        icon: "el-icon-lx-cascades",
        index: "/table",
        title: "基础表格",
      },
      {
        icon: "el-icon-lx-copy",
        index: "/tabs",
        title: "tab选项卡",
      },
      {
        icon: "el-icon-lx-calendar",
        index: "3",
        title: "表单相关",
        subs: [
          {
            index: "/form",
            title: "基本表单",
          },
          {
            index: "/upload",
            title: "文件上传",
          },
          {
            index: "4",
            title: "三级菜单",
            subs: [
              {
                index: "/editor",
                title: "富文本编辑器",
              },
            ],
          },
        ],
      },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });
    return {
      items,
      onRoutes,
    };
  },
};
</script>
<style scoped>
.menu-box{
    height: 70px;
    display: flex;
    align-items: center;
}
.el-menu.el-menu--horizontal {
    border-bottom: none;
}
</style>