<template>
  <div class="list-header">
    <HeaderComp :back="true" class="app-header" fixed>
      <template #title>
        <van-search
          shape="round"
          background="#cd0a0a"
          placeholder="请输入搜索关键词..."
          v-model="keyword"
        >
          <template #left-icon>
            <van-icon name="search" color="#aaa" />
          </template>
        </van-search>
      </template>
    </HeaderComp>
  </div>
  <GoodslistComp :type="2" :action="getGoodsList"></GoodslistComp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getGoodsList } from '@/api/goods'
const route = useRoute()
// 使用 as 语法进行类型断言
const keyword = ref<string>((route.query.search as string) || '')
</script>

<style scoped lang="scss"></style>
