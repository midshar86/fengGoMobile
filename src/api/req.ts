import axios from "axios"
import { urlPaths } from "./base";
// 引入仓库, 获取token信息
import useUserinfoStore from "@/stores/userInfo"

const my_req = axios.create({
  baseURL: urlPaths.baseURL,
  timeout: 5000
})

// 设置请求拦截
my_req.interceptors.request.use(config => {
  // 在请求之前做些什么

  // 在组件外使用仓库时现用现取
  const userinfoStore = useUserinfoStore()
  config.headers.token = userinfoStore.token
  // console.log(config);
  return config
}, err => {
  // 在请求失败后做些什么
  return Promise.reject(err)
})

// 配置响应拦截
my_req.interceptors.response.use(res => {
  const { code } = res.data
  // 获取响应之后做什么
  // 错误处理
  if (code === "10011" || code === "10019" || code === "10020") {
    return res.data
  }
  // 判断响应请求是否正常
  if (code === "200") {
    if (res.data.message === "注册成功") {
      return res.data
    }
    return res.data.data
  }
}, err => {
  // 响应失败之后做什么
  return Promise.reject(err)
})

export default my_req