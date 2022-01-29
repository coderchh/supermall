<template>
  <div id="app">
    <!-- include是需要缓存的组件，exclude是除了某些组件都缓存 -->
    <!-- :include="['a', 'b']"缓存多个组件 -->
    <keep-alive :include="['Home', 'Category']">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
/*css 引入方式*/
@import url("assets/css/base.css");
</style>
