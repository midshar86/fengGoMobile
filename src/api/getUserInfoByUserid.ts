import my_req from "./req";
import { urlPaths } from "./base";
import type { IResUserinfo } from "@/stores/userInfo";


// 获取用户信息
export const getUserinfo = (userid: string) => {
  // 返回数据是一个数组, 约束成为数组的类型
  return my_req.get<any, IResUserinfo[]>(urlPaths.userinfo, { params: { userid } })
}