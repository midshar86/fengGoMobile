import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { goToLogin } from "@/api/userlogin"
import type { ILoginInfo } from "@/views/Login/LoginComp.vue"
// 定义接口约束请求返回信息
export interface IResUserinfo {
  userid: string
  username: string
  nickname?: string
  avatar?: string
  sex?: number
}
// 定义仓库
const useUserinfoStore = defineStore("userinfo", () => {
  // 存储token信息
  const token = ref("")
  // 存储请求返回的用户信息
  const userinfo_store = ref<IResUserinfo>({
    userid: "",
    username: ""
  })
  // 根据仓库中是否存储有token信息判断用户是否登录
  const isLogin = computed(() => !!token.value)
  // 登录操作
  const userLogin = async (userinfo: ILoginInfo) => {
    try {
      const res = await goToLogin(userinfo)

      if (!res) {
        console.log("用户信息错误!");
        return
      }
      // 将请求返回的信息存入仓库
      token.value = res.token
      userinfo_store.value.userid = res.userid
      return res
    } catch (error) {
      console.log(error);
    }
  }
  // 退出登录操作
  const userLoginout = () => {
    token.value = ""
    userinfo_store.value = {
      userid: "",
      username: ""
    }
  }
  return { token, userinfo_store, isLogin, userLogin, userLoginout }
},
  // 对pinia状态进行持久化
  {
    persist: true
  })

export default useUserinfoStore