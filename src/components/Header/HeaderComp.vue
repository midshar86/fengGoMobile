<template>
  <van-nav-bar :title="title" :left-arrow="back" @click-left="goBack">
    <!-- 设置插槽, 实现定制化功能 -->

    <!-- 导航左侧插槽 -->
    <!-- 判断是否传入参数 back, 如果传递有值, 不显示该插槽 -->
    <template v-if="!back" #left>
      <slot name="left"></slot>
    </template>

    <!-- 导航中部插槽 -->
    <!-- 判断是否传入参数 title, 如果传递有值, 不显示该插槽 -->
    <template v-if="!title" #title>
      <slot name="title"></slot>
    </template>

    <!-- 导航右部插槽 -->
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// 定义接口
interface IHeaderProps {
  title?: string
  back?: boolean
}
// 使用 withDefaults 语法为插槽设置默认值
const { title, back } = withDefaults(defineProps<IHeaderProps>(), {
  title: '',
  back: false
})
// 设置返回按钮函数
const goBack = () => {
  // 如果在使用子组件时传递了返回按钮, 点击后才执行返回操作
  if (back) {
    router.go(-1)
  }
}
</script>

<style lang="scss" scoped></style>
