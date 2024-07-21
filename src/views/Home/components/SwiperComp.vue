<template>
  <div class="container">
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiperListData" :key="item.bannerid">
          <img :src="item.img" :alt="item.alt" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSwiperList } from '@/api/swiper'
import { onMounted, reactive } from 'vue'

let swiperListData = reactive<SwiperTypeNS.ISwiperType[]>([])
// 当页面加载完成后调用一次接口请求函数
onMounted(() => {
  getSwiperListMethod()
})

// 定义函数调用接口请求函数
const getSwiperListMethod = async () => {
  try {
    const res = await getSwiperList()
    swiperListData.splice(0, 0, ...res)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/var.scss';
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.container {
  position: relative;
  overflow: hidden;
  padding-top: 45px;
  &::after {
    content: '';
    display: block;
    width: 200vw;
    height: 200vw;
    border-radius: 50%;
    background-color: $topic-color;
    position: absolute;
    top: -170vw;
    left: -50vw;
    z-index: -1;
  }
  .swiper {
    width: 90vw;
    height: 40vw;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 40vw;
    }
  }
}
</style>
