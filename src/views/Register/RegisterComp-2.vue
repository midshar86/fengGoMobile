<template>
  <HeaderComp class="app-header" :back="true" title="注册：第二步"></HeaderComp>
  <!-- 输入验证码 -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '验证码不能为空!' }]"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendVerifyCode" :disabled="!!cutdown"
            >发送验证码{{ cutdown === 0 ? '' : `${cutdown}s` }}</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 下一步 </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const sms = ref<string>('')
// 接收定时器变量
let timer: number | undefined
// 设置一个倒计时
const cutdown = ref<number>(0)

// 当页面首次加载成功时, 执行发送验证码操作
onMounted(() => {
  sendVerifyCode()
})

// 点击发送验证码按钮执行函数
const sendVerifyCode = () => {
  cutdown.value = 10
  timer = setInterval(() => {
    cutdown.value--
    // 倒计时归零时, 清除定时器
    if (!cutdown.value) {
      clearInterval(timer)
    }
  }, 1000)
}

// 如果中途退出当前页面, 在退出页面之前清除已经开启的定时器
onUnmounted(() => {
  clearInterval(timer)
})

const onSubmit = () => {
  router.push({ name: 'register3', query: { tel: route.query.tel } })
}
</script>

<style lang="scss" scoped></style>
