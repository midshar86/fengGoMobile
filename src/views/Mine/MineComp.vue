<template>
  <HeaderComp title="用户中心" class="app-header"></HeaderComp>
  <div class="userinfo">
    <!-- 用户未登录 -->
    <div class="not-login" v-if="!isLogin">
      <router-link :to="{ name: 'login' }" custom v-slot="{ navigate }">
        <van-empty description="尚未登录！">
          <van-button round type="primary" class="bottom-button" @click="navigate"
            >去登录</van-button
          >
        </van-empty>
      </router-link>
    </div>
    <!-- 用户已登录 -->
    <div class="aready-login" v-else>
      <!-- 用户头像 -->
      <van-image
        round
        fit="cover"
        width="2rem"
        height="2rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <!-- 用户信息 -->
      <h3>{{ userinfo_store.nickname || userinfo_store.username }}</h3>
      <!-- 退出登录 -->
      <van-button type="primary" round class="bottom-button" @click="loginOut">退出登录</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserinfoStore from '@/stores/userInfo'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const userinfoStore = useUserinfoStore()
const { isLogin, userinfo_store } = storeToRefs(userinfoStore)

const router = useRouter()
// 退出登录函数
const loginOut = () => {
  // 调用仓库的action函数
  userinfoStore.userLoginout()
  // 退出登录后, 跳转至首页
  router.push('/')
}
</script>

<style lang="scss" scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
.aready-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin: 1.5em 0;
  }
}
</style>
