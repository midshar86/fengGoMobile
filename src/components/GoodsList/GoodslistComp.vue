<template>
  <div class="root">
    <van-list
      :immediate-check="false"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="one-column-list" :class="{ 'two-column-list': type === 2 }">
        <!-- 列表展示 -->
        <div class="goods-contanier">
          <div
            v-for="item in goodsList"
            :key="item.proid"
            class="goods-item"
            @click="turnToDetails(item.proid)"
          >
            <img :src="item.img2" :alt="item.proname" />
            <div class="details">
              <p>{{ item.proname }}</p>
              <div class="price">
                <span>￥ {{ Math.round((item.originprice * item.discount) / 10) }}</span
                ><span>{{ item.originprice }}</span> |
                <van-tag plain type="primary" class="tag" color="orangered"
                  >{{ item.discount }} 折</van-tag
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { type IGoodsParams } from '@/api/goods'
interface IList {
  type: number
  action: Function
}
// 获取父组件传递的参数
const { type, action } = withDefaults(defineProps<IList>(), {
  type: 1
})
// 存储请求返回的商品列表
const goodsList = ref<GoodsListNS.IGoodsListItem[]>([])
// 控制是否继续加载数据
const loading = ref<boolean>(false)
// 控制是否加载完所有数据
const finished = ref<boolean>(false)
// 定义发送网络请求传递的参数
const params: IGoodsParams = reactive({
  count: 1,
  limitNum: 10
})
// 当组件成功加载后, 调用一次请求列表函数
onMounted(() => {
  onLoad()
})
// 发送网络请求获取商品列表数据
const onLoad = async () => {
  // 发送网络请求
  try {
    // 请求成功后做些什么
    const res = await action(params)
    // 如果获取的数据数组长度为0, 表示数据已经全部请求完成
    if (!res.length) {
      finished.value = true
    }
    // 更新数组的数据为获取的所有商品信息
    goodsList.value = goodsList.value.concat(res)
    // 加载状态结束
    loading.value = false
    // 请求的页码+1
    params.count++
  } catch (error) {
    console.log(error)
  }
}

// 控制商品列表跳转
const router = useRouter()
// 定义跳转函数
const turnToDetails = (id: string) => {
  router.push({ name: 'details', params: { proid: id } })
}
</script>

<style scoped lang="scss">
@import '../../assets/css/var.scss';

.root {
  margin-top: 45px;
  padding-bottom: 50px;
  .one-column-list {
    overflow-x: hidden;
    .goods-contanier {
      .goods-item {
        display: flex;
        margin: 1.333vw 0;
        img {
          display: block;
          width: 30vw;
          height: 30vw;
          margin: 0 1.333vw;
        }
        .details {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            font-size: 16px;
            width: fit-content;
            margin-right: 2vw;
            margin-top: 2vw;
            display: -webkit-box;
            white-space: wrap;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
          }
          .price {
            margin-bottom: 2vw;
            span {
              &:first-child {
                font-weight: bold;
                color: $topic-color;
                font-size: 18px;
                margin-right: 2vw;
              }
              &:nth-child(2) {
                color: #aaa;
              }
            }
          }
        }
      }
    }
  }
  .two-column-list .goods-contanier {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 2vw;
    .goods-item {
      width: 48vw;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      img {
        width: 40vw;
        height: 40vw;
      }
      .details {
        p {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
