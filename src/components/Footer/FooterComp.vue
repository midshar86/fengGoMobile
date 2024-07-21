<template>
  <!-- 根据路由元信息判断是否需要隐藏页脚导航区域 -->
  <van-tabbar route v-if="!route.meta.hidden">
    <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" to="/mine">用户中心</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped></style>
