<template>
  <HeaderComp class="app-header" :back="true" title="注册：第三步"></HeaderComp>
  <!-- 设置密码区域 -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="password"
        name="psw"
        :type="isClose1 ? 'password' : 'text'"
        label="输入密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '密码不能为空!' }]"
        :right-icon="isClose1 ? 'closed-eye' : 'eye-o'"
        @click-right-icon="showOrHiddePsw1"
      />
      <van-field
        v-model="rePassword"
        :type="isClose2 ? 'password' : 'text'"
        name="rpsw"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请再次输入密码', validator: checkPassword }]"
        :right-icon="isClose2 ? 'closed-eye' : 'eye-o'"
        @click-right-icon="showOrHiddePsw2"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 点击注册 </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { goToRegister } from '@/api/userRegister'
// 引入注册成功提示组件
import { showNotify } from 'vant'
const route = useRoute()
const router = useRouter()
const password = ref<string>('')
const rePassword = ref<string>('')
const isClose1 = ref<boolean>(true)
const isClose2 = ref<boolean>(true)

// 校验两次密码输入是否一致
const checkPassword = () => {
  if (!rePassword.value) {
    return '确认密码不能为空!'
  }
  if (rePassword.value !== password.value) {
    return '两次密码输入不一致!'
  }
  return true
}
// 点击切换是否显示密码
const showOrHiddePsw1 = () => {
  isClose1.value = !isClose1.value
}
const showOrHiddePsw2 = () => {
  isClose2.value = !isClose2.value
}

const onSubmit = async () => {
  // 介于接口原因, 只能够将密码写作111111
  const res = await goToRegister({ tel: route.query.tel as string, password: password.value })
  console.log(res)
  if (res.message === '注册成功') {
    showNotify({
      type: 'success',
      message: '注册成功！2s后跳转至登录页面...',
      duration: 2000,
      onClose: turnToLogin
    })
  }
}

const turnToLogin = () => {
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped></style>
