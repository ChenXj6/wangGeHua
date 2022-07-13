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
        // const items = [
        //     {
        //         icon: "el-icon-lx-home",
        //         url: "1",
        //         name: "短信管理",
        //         children:[
        //           {
        //             icon: "el-icon-lx-home",
        //             url: "/SMSList",
        //             name: "短信发送日志",
        //           },
        //           {
        //             icon: "el-icon-lx-home",
        //             url: "/SMSTemplate",
        //             name: "短信模板",
        //           },
        //         ]
        //     },
            
        // ];
        const items = computed(() => store.state.menuList)
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
    top: 60px;
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
