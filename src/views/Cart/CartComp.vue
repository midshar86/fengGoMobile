<template>
  <HeaderComp title="购物车" class="app-header" fixed></HeaderComp>
  <div class="out-container">
    <!-- 如果用户未进行登录, 提示用户登录 -->
    <div class="not-login" v-if="!isLogin">
      <van-empty description="您尚未登录!无法查看购物车信息!😅">
        <router-link :to="{ name: 'login' }" custom v-slot="{ navigate }">
          <van-button round type="primary" class="bottom-button" @click="navigate"
            >去登录</van-button
          >
        </router-link>
      </van-empty>
    </div>
    <!-- 用户已登录, 显示购物车信息 -->
    <!-- 购物车商品卡片 -->
    <template v-else>
      <!-- 购物车为空 -->
      <!-- 手动更改购物车状态 -->
      <van-empty v-if="getCartData.length" description="购物车空空如也, 快去装满吧😄..." />
      <!-- 购车不为空 -->
      <template v-else>
        <!-- 如果能获取购物车信息, 此处应当遍历响应的数据并用来渲染 -->
        <div class="cartbox">
          <!-- 为购物车卡片添加左滑显示删除按钮 -->
          <van-swipe-cell v-for="item in staticCartListData" :key="item.proid" class="cart-item">
            <!-- 点击选中框时切换选中状态 -->
            <van-checkbox
              :modelValue="item.flag"
              @update:modelValue="toggleCheckState(item, !item.flag)"
              class="check-box"
            ></van-checkbox>
            <van-card
              :num="item.num"
              :price="`${item.price}.00`"
              :title="item.title"
              :thumb="item.img"
            >
              <template #tags>
                <van-tag plain type="primary">折扣</van-tag>
                <van-tag plain type="primary">热卖</van-tag>
              </template>
              <template #footer>
                <van-button
                  size="mini"
                  type="primary"
                  :disabled="item.num === 1"
                  class="btn"
                  @click="item.num--"
                  >-</van-button
                >
                <van-button size="mini" type="primary" class="btn" @click="item.num++"
                  >+</van-button
                >
              </template>
            </van-card>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="delCart(item.proid)"
              />
            </template>
          </van-swipe-cell>
        </div>
        <!-- 提交订单栏 -->
        <van-submit-bar
          :price="totalprice * 100"
          button-text="提交订单"
          @submit="onSubmit"
          class="submit-footer"
        >
          <van-checkbox :modelValue="checkAll" @update:modelValue="selectAll">全选</van-checkbox>
        </van-submit-bar>
      </template>
    </template>
  </div>
  <!-- 使用弹出框组件 -->
  <van-dialog
    v-model:show="show"
    :title="dialogTitle"
    show-cancel-button
    message-align="center"
    :message="msg"
    @confirm="useConfirmFun(paramFun)"
  >
  </van-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useUserinfoStore from '@/stores/userInfo'
import { showSuccessToast } from 'vant'

const userinfoStore = useUserinfoStore()
const { isLogin, userinfo_store } = storeToRefs(userinfoStore)
import { getCartList } from '@/api/getCartList'
const getCartData = ref([])
// 定义变量记录删除的购物车信息
const delCartId = ref<string>('')
// 定义变量记录弹出框标题
const dialogTitle = ref<string>('')
// 定义变量记录弹出框提示消息
const msg = ref<string>('')

let paramFun = () => {}
// 定义一个静态的购物车数据
const staticCartListData = ref([
  {
    proid: '001',
    num: 2,
    price: 2500,
    title: 'iPhone13',
    flag: true,
    img: 'https://gw.alicdn.com/imgextra/i1/734417772/O1CN01rQvq1m27Hd9LHqOpG_!!734417772.jpg_Q75.jpg_.webp'
  },
  {
    proid: '002',
    num: 5,
    price: 500,
    title: '椅子',
    flag: true,
    img: 'https://gw.alicdn.com/imgextra/i3/2038542850/O1CN01RqzNWk1WvLjpwul3t_!!2038542850.png_.webp'
  },
  {
    proid: '003',
    num: 1,
    price: 666,
    title: '饮水机',
    flag: true,
    img: 'https://gw.alicdn.com/imgextra/i1/2616970884/O1CN0132W5Eq1IOv5Vr0JEK_!!0-item_pic.jpg_Q75.jpg_.webp'
  }
])
const show = ref<boolean>(false)
// 提交订单函数
const onSubmit = () => {
  paramFun = confirmSendCart
  msg.value = '确定提交订单吗?'
  dialogTitle.value = '提交订单'
  show.value = true
}
// 定义一个全选状态的计算属性
const checkAll = computed(() => {
  return staticCartListData.value.every((item) => item.flag)
})

// 当页面首次渲染完毕后且用户在已登录的情况下获取一次购物车列表信息
onMounted(() => {
  if (isLogin.value) {
    // 调用获取购物车列表函数
    getUserCartList(userinfo_store.value.userid)
  }
})
// 定义一个获取用户购物车的函数
const getUserCartList = async (userid: string) => {
  try {
    const res = await getCartList(userid)
    if (res.message === '购物车数据为空') {
      getCartData.value = []
    }
    // 因接口问题, 购物车列表始终是0
  } catch (error) {
    console.log(error)
  }
}

// 添加删除购物车事件
const delCart = (id: string) => {
  paramFun = confirmDelCart
  delCartId.value = id
  dialogTitle.value = '删除'
  msg.value = '确定删除当前购物车信息吗?'
  show.value = true
}

// 当点击提示框的确认按钮时, 执行对应方法
const useConfirmFun = (fun: Function) => {
  fun()
  // 确认后将一个空函数赋值作为初始值
  paramFun = () => {}
}

// 确定删除购物车
const confirmDelCart = () => {
  staticCartListData.value = staticCartListData.value.filter(
    (item) => item.proid !== delCartId.value
  )
  showSuccessToast('购物车删除成功!')
  delCartId.value = ''
  // 删除之后重新获取当前购物车列表信息
}

// 确认提交订单
const confirmSendCart = () => {
  showSuccessToast('订单已提交!')
}

// 约束购物车信息
interface ICartItemInfo {
  proid: string
  num: number
  price: number
  title: string
  flag: boolean
  img: string
}
// 切换单个购物车选中状态
const toggleCheckState = (item: ICartItemInfo, flag: boolean) => {
  item.flag = flag
  console.log(item.title + '=>' + item.flag)
}

// 切换全选状态
const selectAll = () => {
  staticCartListData.value = staticCartListData.value.map((item) => {
    return { ...item, flag: !checkAll.value }
  })
}

// 实现计算选中购物车的总价计算
const totalprice = computed(() => {
  return staticCartListData.value.reduce((prev, item) => {
    // 只计算添加进购物车的商品价格
    return item.flag ? prev + item.price * item.num : prev
  }, 0)
})
</script>

<style lang="scss" scoped>
.out-container {
  margin-top: 45px;
  padding-bottom: 100px;
  .cartbox {
    .btn {
      width: 20px;
    }
    .cart-item {
      position: relative;
      .check-box {
        position: absolute;
        left: 2vw;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;
      }
      .van-card {
        padding-left: 10vw;
      }
    }
  }
  .submit-footer {
    margin-bottom: 50px;
  }
  .bottom-button {
    width: 160px;
    height: 40px;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
