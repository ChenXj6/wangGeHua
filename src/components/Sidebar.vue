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
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index"><i :class="subItem.icon"></i><span class="menuItem" :title="subItem.title">{{ subItem.title }}</span></el-menu-item>
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
                index: "9",
                title: "统计分析",
                subs: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        index: "/gridPeopleType",
                        title: "网格人员类型统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/eventHadle",
                        title: "事件类型处置统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/eventHadleRate",
                        title: "事件类型处置率排名",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/eventHadleOver",
                        title: "事件类型处置完成率排名",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/daysEvent",
                        title: "事件日处理统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/dataPool",
                        title: "数据汇总",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/satisfiedRate",
                        title: "满意率统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/12345Handle",
                        title: "12345热线办理比例分析图",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/12345Weekly",
                        title: "12345市民服务热线工单受理周报表",
                    },
                ],
            },
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
                icon: "el-icon-lx-calendar",
                index: "11",
                title: "社会治理",
                subs: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        index: "/hotlineManage",
                        title: "12345热线管理",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/Management",
                        title: "12345处置",
                    },
                ],
            },
            {
                icon: "el-icon-lx-service",
                index: "6",
                title: "重点服务人员",
                subs: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        index: "/servicepersonnel",
                        title: "重点服务人员",
                    },
                ],
            },
            {
                icon: "el-icon-lx-weibo",
                index: "7",
                title: "重点管理人员",
                subs: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        index: "/drugper",
                        title: "戒毒人员",
                    },
                    {
                        icon: "el-icon-lx-rank",
                        index: "/ReleasePer",
                        title: "刑满释放人员",
                    },
                    {
                        icon: "el-icon-lx-warn",
                        index: "/RrectifyStaff",
                        title: "社会矫正人员",
                    },
                    {
                        icon: "el-icon-lx-crown",
                        index: "/MentaldisordersPer",
                        title: "精神障碍人员",
                    },
                    {
                        icon: "el-icon-lx-goods",
                        index: "/PetitionStaff",
                        title: "上访人员",
                    },
                ],
            },
            {
                icon: "el-icon-lx-hot",
                index: "8",
                title: "宣传管理",
                subs: [
                    {
                        icon: "el-icon-lx-calendar",
                        index: "/draft",
                        title: "文稿列表",
                    },
                    {
                        icon: "el-icon-lx-read",
                        index: "/draftReview",
                        title: "文稿审核",
                    },
                    {
                        icon: "el-icon-lx-record",
                        index: "/media",
                        title: "多媒体列表",
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
                    {
                        icon: "el-icon-lx-edit",
                        index: "/vehiclelist",
                        title: "车辆列表",
                    },
                    {
                        icon: "el-icon-lx-calendar",
                        index: "/ParkLot",
                        title: "车位信息",
                    },
                    {
                        icon: "el-icon-lx-rechargefill",
                        index: "/charge",
                        title: "收费列表",
                    },
                    {
                        icon: "el-icon-lx-recharge",
                        index: "/manage",
                        title: "物业公司",
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
    width: 230px;
}
.sidebar > ul {
    height: 100%;
}
.menuItem{
  display: inline-block;
  width: 120px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
