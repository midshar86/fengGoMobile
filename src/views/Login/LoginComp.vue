<template>
  <HeaderComp :back="true" class="app-header" title="登 录">
    <template #right>
      <span @click="turnToRegister">注册</span>
    </template>
  </HeaderComp>
  <div class="login-form">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 用户名 -->
        <van-field
          v-model="loginInfo.loginname"
          type="tel"
          name="手机号"
          label="手机号"
          placeholder="请输入合法的手机号"
          :rules="[{ validator: checkThePhoneNumber, message: '手机号不合法!' }]"
        />
        <!-- 用户密码 -->
        <van-field
          v-model="loginInfo.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登 录 </van-button>
      </div>
    </van-form>
    <!-- 设置提示组件 -->
    <van-notify v-model:show="isShow" type="success" teleport=".app-header">
      <van-icon style="position: fixed; top: 0; width: 100vw; z-index: 9999" />
      <span>登录成功!将跳转至首页！</span>
    </van-notify>
    <van-notify v-model:show="isShowError" type="danger" teleport=".app-header">
      <van-icon style="position: fixed; top: 0; width: 100vw; z-index: 9999" />
      <span>用户名或密码错误!</span>
    </van-notify>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// 引入正则判断
import { phoneNumberReg } from '@/utils/phoneNumber_reg'
// 引入登录状态管理仓库
import useUserinfoStore from '@/stores/userInfo'
// 引入获取用户信息请求方法
import { getUserinfo } from '@/api/getUserInfoByUserid'
// 定义双向绑定数据
export interface ILoginInfo {
  loginname: string
  password: string
}
const loginInfo = ref<ILoginInfo>({
  loginname: '',
  password: ''
})

// 定义验证手机号的规则
const checkThePhoneNumber = () => {
  // 手机号验证失败
  if (!phoneNumberReg.test(loginInfo.value.loginname)) {
    return false
  } else {
    return true
  }
}

const userinfoStore = useUserinfoStore()
const router = useRouter()
// 定义登录函数
// 介于接口原因, 新注册账号只能使用密码111111登录
// 调用仓库中的登录方法
const onSubmit = async () => {
  try {
    const resu = await userinfoStore.userLogin(loginInfo.value)

    // 错误处理
    if (!resu?.userid) {
      isShowError.value = true
      setTimeout(() => {
        isShowError.value = false
      }, 2000)
    } else {
      try {
        // 登录成功后, 利用返回的userid获取用户信息
        const res = await getUserinfo(userinfoStore.userinfo_store.userid)
        isShow.value = true
        // 获取用户信息后存入仓库
        userinfoStore.userinfo_store.username = res[0].nickname as string
        setTimeout(() => {
          isShow.value = false
          // 跳转至首页
          router.push('/')
        }, 2000)
      } catch (error) {
        console.log(error)
      }
    }
  } catch (err) {
    console.log(err)
  }
}
// 跳转注册页面
const turnToRegister = () => {
  router.push({ name: 'register1' })
}
const isShow = ref(false)
const isShowError = ref(false)
</script>

<style lang="scss" scoped></style>
