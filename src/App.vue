<template>
  <div id="app">
      <router-view/>
      <main-tab-bar/>
  </div>
</template>

<script>
import './components/content/MainTabBar/MainTabBar'
import MainTabBar from './components/content/MainTabBar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style>
@import 'assets/css/base.css'
</style>
