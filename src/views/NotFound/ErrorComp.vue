<template>
  <!-- 配置全局样式 -->
  <HeaderComp title="NotFound" :back="true" class="app-header"></HeaderComp>
  <van-empty description="一不小心走丢了...">
    <van-button round type="primary" class="bottom-button" @click="turnToHome">返回首页</van-button>
  </van-empty>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// 返回首页
const turnToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
