<template>
  <div class="about">
    <v-header />
    <div class="main-content-box">
      <router-view />
    </div>
  </div>
</template>
<script>
import vHeader from "../../components/Header.vue";
import { onMounted } from "@vue/runtime-core";
import { useStore } from 'vuex';
import { computed } from 'vue'
export default {
  components: {
    vHeader,
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
</style>
