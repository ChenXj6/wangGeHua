<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item?.children?.length">
                    <el-submenu :index="item.url" :key="item.url">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.children">                          
                            <el-submenu v-if="subItem?.children?.length" :index="subItem.url" :key="subItem.url">
                                <i :class="subItem.icon"></i>
                                <template #title>{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.url">
                                    {{ threeItem.name }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.url" :key="subItem.url"><i :class="subItem.icon"></i><span class="menuItem" :title="subItem.name">{{ subItem.name }}</span></el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.name }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, getCurrentInstance, onBeforeMount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getMenuTreeByUser } from '@/api/sys/menu.js'
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                url: "/dashboard",
                name: "系统首页",
            },
            {
                icon: "el-icon-lx-cascades",
                url: "4",
                name: "社区网格",
                children: [
                    {
                        icon: "el-icon-lx-sort",
                        url: "/info",
                        name: "基本信息",
                    },
                    {
                        icon: "el-icon-lx-tagfill",
                        url: "/borderInfo",
                        name: "边界信息",
                    },
                    {
                        icon: "el-icon-lx-friend",
                        url: "/staffInfo",
                        name: "人员力量信息",
                    },
                ],
            },
            {
                icon: "el-icon-lx-sort",
                url: "3",
                name: "实有信息",
                children: [
                    {
                        icon: "el-icon-lx-group",
                        url: "/actualbuild",
                        name: "实有楼栋",
                    },
                    {
                        icon: "el-icon-lx-friend",
                        url: "/actualhouse",
                        name: "实有房屋",
                    },
                    {
                        icon: "el-icon-lx-profile",
                        url: "/actualpeople",
                        name: "实有人口",
                    },
                ],
            },
            // {
            //     icon: "el-icon-lx-cascades",
            //     url: "/icon",
            //     name: "图标",
            // },
            {
                icon: "el-icon-lx-rank",
                url: "9",
                name: "统计分析",
                children: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        url: "/gridPeopleType",
                        name: "网格人员类型统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/eventHadle",
                        name: "事件类型处置统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/eventHadleRate",
                        name: "事件类型处置率排名",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/eventHadleOver",
                        name: "事件类型处置完成率排名",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/daysEvent",
                        name: "事件日处理统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/dataPool",
                        name: "数据汇总",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/satisfiedRate",
                        name: "满意率统计",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/12345Handle",
                        name: "12345热线办理比例分析图",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/12345Weekly",
                        name: "12345市民服务热线工单受理周报表",
                    },
                ],
            },
            {
                icon: "el-icon-lx-calendar",
                url: "1",
                name: "事件处置",
                children: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        url: "/residentsreport",
                        name: "事件信息采集",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/eventhandle",
                        name: "事件信息处置",
                    },
                ],
            },
            {
                icon: "el-icon-lx-mail",
                url: "/notice",
                name: "通知公告",
            },
             {
                icon: "el-icon-lx-qrcode",
                url: "11",
                name: "社会治理",
                children: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        url: "/hotlineManage",
                        name: "12345热线管理",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        url: "/Management",
                        name: "12345处置",
                    },
                ],
            },
            {
                icon: "el-icon-lx-like",
                url: "13",
                name: "民生保障",
                children: [
                    {
                        icon: "el-icon-lx-homefill",
                        url: "/provide",
                        name: "养老机构列表",
                    },
                ],
            },
            {
                icon: "el-icon-lx-filter",
                url: "14",
                name: "应急指挥",
                children: [
                    {
                        icon: "el-icon-lx-group",
                        url: "/urgentNeedTeams",
                        name: "应急队伍列表",
                    },
                    {
                        icon: "el-icon-lx-goods",
                        url: "/urgentNeedSupplies",
                        name: "应急物资列表",
                    },
                    {
                        icon: "el-icon-lx-wifi",
                        url: "/smokeDevide",
                        name: "烟感设备列表",
                    },
                    {
                        icon: "el-icon-lx-info",
                        url: "/hiddenDanger",
                        name: "隐患排查",
                    },
                    {
                        icon: "el-icon-lx-time",
                        url: "/hiddenDangerTask",
                        name: "隐患排查定时任务",
                    },
                    {
                        icon: "el-icon-lx-warn",
                        url: "/hiddenDangerContent",
                        name: "隐患排查内容",
                    },
                ],
            },
            {
                icon: "el-icon-lx-addressbook",
                url: "12",
                name: "党建引领",
                children: [
                    {
                        icon: "el-icon-lx-share",
                        url: "/partyInfo",
                        name: "党组织信息",
                    },
                    {
                        icon: "el-icon-lx-profile",
                        url: "/partyPeople",
                        name: "党员信息",
                    },
                    {
                        icon: "el-icon-lx-forward",
                        index: "/GridHotlineWorkOrder",
                        title: "12345热线工单类别",
                    },
                ],
            },
            {
                icon: "el-icon-lx-service",
                url: "6",
                name: "重点服务人员",
                children: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        url: "/servicepersonnel",
                        name: "重点服务人员",
                    },
                ],
            },
            {
                icon: "el-icon-lx-weibo",
                url: "7",
                name: "重点管理人员",
                children: [
                    {
                        icon: "el-icon-lx-attentionfill",
                        url: "/drugper",
                        name: "戒毒人员",
                    },
                    {
                        icon: "el-icon-lx-rank",
                        url: "/ReleasePer",
                        name: "刑满释放人员",
                    },
                    {
                        icon: "el-icon-lx-warn",
                        url: "/RrectifyStaff",
                        name: "社会矫正人员",
                    },
                    {
                        icon: "el-icon-lx-crown",
                        url: "/MentaldisordersPer",
                        name: "精神障碍人员",
                    },
                    {
                        icon: "el-icon-lx-goods",
                        url: "/PetitionStaff",
                        name: "上访人员",
                    },
                ],
            },
            {
                icon: "el-icon-lx-hot",
                url: "8",
                name: "宣传管理",
                children: [
                    {
                        icon: "el-icon-lx-calendar",
                        url: "/draft",
                        name: "文稿列表",
                    },
                    {
                        icon: "el-icon-lx-read",
                        url: "/draftReview",
                        name: "文稿审核",
                    },
                    {
                        icon: "el-icon-lx-record",
                        url: "/media",
                        name: "多媒体列表",
                    },
                ],
            },
            {
                icon: "el-icon-lx-emoji",
                url: "5",
                name: "智慧物业",
                children: [
                  {
                        icon: "el-icon-lx-shopfill",
                        url: "/pubilcfacilities",
                        name: "公共设施",
                    },
                    {
                        icon: "el-icon-lx-deletefill",
                        url: "/rubbishclass",
                        name: "垃圾分类",
                    },
                    {
                        icon: "el-icon-lx-unlock",
                        url: "/carpacrk",
                        name: "停车场",
                    },
                    {
                        icon: "el-icon-lx-edit",
                        url: "/vehiclelist",
                        name: "车辆列表",
                    },
                    {
                        icon: "el-icon-lx-calendar",
                        url: "/ParkLot",
                        name: "车位信息",
                    },
                    {
                        icon: "el-icon-lx-rechargefill",
                        url: "/charge",
                        name: "收费列表",
                    },
                    {
                        icon: "el-icon-lx-recharge",
                        url: "/manage",
                        name: "物业公司",
                    },
                ],
            },
            {
                icon: "el-icon-lx-redpacket",
                url: "10",
                name: "经济运行",
                children: [
                    {
                        icon: "el-icon-lx-calendar",
                        url: "/taxList",
                        name: "财政税收列表",
                    },
                    {
                        icon: "el-icon-lx-read",
                        url: "/itemList",
                        name: "项目列表",
                    },
                    {
                        icon: "el-icon-lx-record",
                        url: "/buildingList",
                        name: "企业楼宇列表",
                    },
                    {
                        icon: "el-icon-lx-read",
                        url: "/industry",
                        name: "产业信息采集",
                    },
                ],
            },
            {
                icon: "el-icon-lx-settings",
                url: "2",
                name: "系统管理",
                children: [
                  {
                        icon: "el-icon-lx-people",
                        url: "/user",
                        name: "用户管理",
                    },
                    {
                        icon: "el-icon-lx-attention",
                        url: "/role",
                        name: "角色管理",
                    },
                    {
                        icon: "el-icon-lx-cascades",
                        url: "/menu",
                        name: "菜单管理",
                    },
                    {
                        icon: "el-icon-lx-settings",
                        url: "/organ",
                        name: "机构管理",
                    },
                    {
                        icon: "el-icon-lx-read",
                        url: "/dict",
                        name: "字典管理",
                    },
                ],
            },
            
        ];
        // const items = computed(() => store.state.menuList)
        const route = useRoute();
        const store = useStore();
        const router = useRouter()
        const { proxy } = getCurrentInstance()
        const collapse = computed(() => store.state.collapse);

        const onRoutes = computed(() => {
            return route.path;
        });
        if(!sessionStorage.getItem('user')){
          proxy.$message.error('请登录之后重试！')
          router.push('/login')
        }
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
