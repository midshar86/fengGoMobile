import { createRouter, createWebHashHistory } from 'vue-router'

// 引入路由组件
import MainComp from '@/views/Main/MainComp.vue'
import HomeComp from '@/views/Home/HomeComp.vue'
import CartComp from '@/views/Cart/CartComp.vue'
import MineComp from '@/views/Mine/MineComp.vue'
import ListComp from '@/views/List/ListComp.vue'
import LoginComp from '@/views/Login/LoginComp.vue'
import DetailsComp from '@/views/Details/DetailsComp.vue'
import RegisterComp1 from '@/views/Register/RegisterComp-1.vue'
import RegisterComp2 from '@/views/Register/RegisterComp-2.vue'
import RegisterComp3 from '@/views/Register/RegisterComp-3.vue'
import ErrorComp from '@/views/NotFound/ErrorComp.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: MainComp,
      children: [
        {
          path: "home",
          name: "home",
          component: HomeComp
        },
        {
          path: "cart",
          name: "cart",
          component: CartComp
        },
        {
          path: "mine",
          name: "mine",
          component: MineComp
        },
        {
          path: "list",
          name: "list",
          component: ListComp,
          meta: {
            hidden: true
          }
        },
        {
          // 动态路由
          path: "details/:proid",
          name: "details",
          component: DetailsComp,
          meta: {
            hidden: true
          }
        },
        {
          path: "login",
          name: "login",
          component: LoginComp,
          meta: {
            hidden: true
          }
        },
        {
          path: "register-1",
          name: "register1",
          component: RegisterComp1,
          meta: {
            hidden: true
          }
        },
        {
          path: "register-2",
          name: "register2",
          component: RegisterComp2,
          meta: {
            hidden: true
          }
        },
        {
          path: "register-3",
          name: "register3",
          component: RegisterComp3,
          meta: {
            hidden: true
          }
        }
      ]
    },
    {
      // 匹配错误页面
      path: "/:otherPages(.*)*",
      name: "error",
      component: ErrorComp
    }
  ]
})

export default router
