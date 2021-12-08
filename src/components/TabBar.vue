<template>
  <nut-tabbar @tab-switch="tabSwitch" class="tabBar">
    <nut-tabbar-item tab-title="首页" icon="home"></nut-tabbar-item>
    <nut-tabbar-item tab-title="卡片浏览器" icon="search2"></nut-tabbar-item>
    <nut-tabbar-item tab-title="统计" icon="order"></nut-tabbar-item>
  </nut-tabbar>
</template>

<script setup>
function tabSwitch(item, index) {
  console.log(item, index);
}

</script>

<style>
.tabBar {
  position: absolute;
  bottom: 0;
}
</style>
