<template>
  <!-- 配置全局样式变量 -->
  <van-config-provider :theme-vars="themeVars">
    <!-- 一级路由出口 -->
    <RouterView></RouterView>
  </van-config-provider>
</template>

<script setup>
import themeVars from './config/theme'
</script>

<style lang="scss" scoped></style>
