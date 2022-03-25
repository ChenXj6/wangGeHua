<template>
    <router-view />
</template>


<script>
import { useStore } from 'vuex'
export default {
  setup(){
    const store = useStore()
    store.dispatch('socketInit')
  }
};

</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
