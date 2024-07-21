<template>
  <HeaderComp :back="true" class="app-header">
    <!-- 再导航中显示商品名称 -->
    <template #title>
      <span>{{ goodsDetails?.proname }}</span>
    </template>
    <!-- 右侧快捷访问购物车 -->
    <template #right>
      <router-link :to="{ name: 'cart' }" custom v-slot="{ navigate }">
        <van-icon name="shopping-cart-o" size="20" @click="navigate"></van-icon>
      </router-link>
    </template>
  </HeaderComp>
  <div class="out-container">
    <!-- 如果获取的有数据再进行渲染 -->
    <template v-if="goodsDetails?.banners">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in goodsDetails.banners" :key="item">
          <img :src="item" alt="poster" />
        </van-swipe-item>
      </van-swipe>
    </template>
    <!-- 商品介绍 -->
    <div class="desc">
      <h3>{{ goodsDetails?.proname }}</h3>
      <p>{{ goodsDetails?.desc }}</p>
    </div>
    <!-- 下方按钮 -->
    <!-- 使用routerlink进行跳转, 添加custom属性表示不将其视作a链接, 通过下方的标签控制跳转 -->
    <van-submit-bar
      :price="goodsPrice * 100"
      :button-text="userinfoStore.isLogin ? '加入购物车' : '去登录'"
      @submit="handlerSubmit"
      label="价格"
    />
    <!-- 提示信息 -->
    <div class="dialog">
      <van-toast
        v-model:show="show"
        style="padding: 0"
        type="success"
        class="toast"
        :style="{ padding: '15px', width: 'fit-content' }"
        :duration="2000"
      >
        <template #message>
          <span>{{ dialogInfo }}</span>
        </template>
      </van-toast>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGoodsDetails } from '@/api/details'
import useUserinfoStore from '@/stores/userInfo'
import { addToCart } from '@/api/addProToCart'
const route = useRoute()
const router = useRouter()
const userinfoStore = useUserinfoStore()
const show = ref<boolean>(false)
const dialogInfo = ref<string>('')
// 定义变量接收响应数据
let goodsDetails = ref<GoodsListNS.IGoodsListItem>()
// 计算商品当前金额
const goodsPrice = computed(() => {
  return Math.round(
    ((goodsDetails.value?.originprice as number) * (goodsDetails.value?.discount as number)) / 10
  )
})
// 当页面的dom挂载完成后, 发送网络请求获取数据
onMounted(() => {
  getGoodsDetailsInfo()
})
// 定义获取数据函数
const getGoodsDetailsInfo = async () => {
  try {
    const res = await getGoodsDetails(route.params.proid as string)
    goodsDetails.value = res
  } catch (err) {
    console.log(err)
  }
}
// 点击按钮执行事件
const handlerSubmit = async () => {
  if (userinfoStore.isLogin) {
    // 加入购物车
    const res = await addToCart({
      userid: userinfoStore.userinfo_store.userid,
      proid: route.params.proid as string,
      num: '1'
    })
    if (res) {
      // 加入购物车成功
      dialogInfo.value = '加入购物车成功！'
    } else {
      // 加入购物车失败
      dialogInfo.value = '加入购物车失败！'
    }
    show.value = true
    console.log(res)
  } else {
    // 跳转登录
    router.push({ name: 'login' })
  }
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  height: 250px;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
.desc {
  padding: 0 2vw;
  h3 {
    margin: 1.333vw 0;
  }
  p {
    padding-top: 2vw;
  }
}
.dialog {
  .toast {
    padding: 15px;
  }
}
</style>
