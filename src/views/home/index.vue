<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box"
         :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }" :key="$route.fullPath">
          <transition name="move"
                      mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <div class="logo">
          <span>版权所有©中软国际科技服务有限公司(前端v4.5120220820，后端v4.5320220406)</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import vHeader from "../../components/Header.vue";
import vSidebar from "../../components/Sidebar.vue";
import vTags from "../../components/Tags.vue";
export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup () {
    const store = useStore();
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.state.collapse);
    return {
      tagsList,
      collapse,
    };
  },
};
</script>
<style scoped>
.logo{
  position: absolute;
  bottom: 0;
  left: 0;
  /* width: 50%; */
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 20px;
  color: #999;
  margin: 10px 10px 0;
}
</style>
