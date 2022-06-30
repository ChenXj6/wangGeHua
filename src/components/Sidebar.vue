<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                          
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <i :class="subItem.icon"></i>
                                <template #title>{{ subItem.title }}111</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index"><i :class="subItem.icon"></i>{{ subItem.title }}
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
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "el-icon-lx-calendar",
                index: "4",
                title: "社区网格",
                subs: [
                    {
                        icon: "el-icon-lx-sort",
                        index: "/info",
                        title: "基本信息",
                    },
                    {
                        icon: "el-icon-lx-tagfill",
                        index: "/borderInfo",
                        title: "边界信息",
                    },
                    {
                        icon: "el-icon-lx-friend",
                        index: "/staffInfo",
                        title: "人员力量信息",
                    },
                ],
            },
            {
                icon: "el-icon-lx-sort",
                index: "3",
                title: "实有信息",
                subs: [
                    {
                        icon: "el-icon-lx-group",
                        index: "/actualbuild",
                        title: "实有楼栋",
                    },
                    {
                        icon: "el-icon-lx-friend",
                        index: "/actualhouse",
                        title: "实有房屋",
                    },
                    {
                        icon: "el-icon-lx-profile",
                        index: "/actualpeople",
                        title: "实有人口",
                    },
                ],
            },
            // {
            //     icon: "el-icon-lx-cascades",
            //     index: "/icon",
            //     title: "图标",
            // },
            {
                icon: "el-icon-lx-calendar",
                index: "1",
                title: "事件处置",
                subs: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        index: "/residentsreport",
                        title: "事件信息采集",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/eventhandle",
                        title: "事件信息处置",
                    },
                ],
            },
            {
                icon: "el-icon-lx-homefill",
                index: "5",
                title: "智慧物业",
                subs: [
                  {
                        icon: "el-icon-lx-shopfill",
                        index: "/pubilcfacilities",
                        title: "公共设施",
                    },
                    {
                        icon: "el-icon-lx-deletefill",
                        index: "/rubbishclass",
                        title: "垃圾分类",
                    },
                    {
                        icon: "el-icon-lx-unlock",
                        index: "/carpacrk",
                        title: "停车场",
                    },
                ],
            },
            {
                icon: "el-icon-lx-settings",
                index: "2",
                title: "系统管理",
                subs: [
                  {
                        icon: "el-icon-lx-people",
                        index: "/user",
                        title: "用户管理",
                    },
                    {
                        icon: "el-icon-lx-attention",
                        index: "/role",
                        title: "角色管理",
                    },
                    {
                        icon: "el-icon-lx-cascades",
                        index: "/menu",
                        title: "菜单管理",
                    },
                    {
                        icon: "el-icon-lx-settings",
                        index: "/organ",
                        title: "机构管理",
                    },
                    {
                        icon: "el-icon-lx-read",
                        index: "/dict",
                        title: "字典管理",
                    },
                ],
            },
            
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>
