<template>
  <HeaderComp class="app-header" :back="true" title="注册：第一步"></HeaderComp>
  <!-- 输入用户电话 -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="userTel"
        name="手机号"
        label="手机号"
        placeholder="请输入合法的手机号"
        :rules="[{ required: true, validator: checkPhoneNum, message: '手机号不能为空!' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit" :disabled="!userTel">
        下一步
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { phoneNumberReg } from '@/utils/phoneNumber_reg'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// 存储用户输入手机号
const userTel = ref<string>('')
const router = useRouter()
// 验证手机号是否合法
const checkPhoneNum = () => {
  if (phoneNumberReg.test(userTel.value)) {
    return true
  } else {
    return '手机号不合法'
  }
}
const onSubmit = () => {
  // 跳转时携带用户输入的手机号
  router.push({ name: 'register2', query: { tel: userTel.value } })
}
</script>

<style lang="scss" scoped></style>
