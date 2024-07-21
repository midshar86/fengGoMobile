import my_req from "./req";
import { urlPaths } from "./base";

// 获取当前登录账号的购物车信息
export const getCartList = (userid: string) => {
  return my_req.post<any, { code: string, message: string }>(urlPaths.cartlist, {
    params: {
      userid
    }
  })
}