<template>
  <!-- 顶部导航 -->
  <HeaderComp class="app-header" fixed>
    <!-- 使用左侧插槽 -->
    <template #left>
      <van-icon name="apps-o" size="22" color="white" />
    </template>
    <!-- 使用中间插槽 -->
    <template #title>
      <van-search
        shape="round"
        background="#cd0a0a"
        placeholder="请输入搜索关键词..."
        class="icon-search"
      >
        <template #left-icon>
          <van-icon name="search" color="#aaa" />
        </template>
      </van-search>
    </template>
    <!-- 使用右侧插槽 -->
    <template #right>
      <span v-if="userinfoStore.isLogin">{{ userinfoStore.userinfo_store.username }}</span>
      <span v-else @click="turnToLogin">登 录</span>
    </template>
  </HeaderComp>
  <!-- 轮播图 -->
  <SwiperComp></SwiperComp>
  <!-- 十宫格区域 -->
  <GridComp></GridComp>
  <!-- 列表显示区域 -->
  <GoodslistComp :type="1" :action="getGoodsList"></GoodslistComp>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getGoodsList } from '@/api/goods'
import useUserinfoStore from '@/stores/userInfo'
const userinfoStore = useUserinfoStore()
const router = useRouter()
const turnToLogin = () => {
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped></style>
