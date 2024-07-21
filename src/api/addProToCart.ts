import my_req from "./req";
import { urlPaths } from "./base";

// 约束传入请求的参数
interface IAddToCart {
  userid: string
  proid: string
  num: string
}

// 添加商品至购物车
export const addToCart = (params: IAddToCart) => {
  return my_req.post<any, any>(urlPaths.cartadd, params)
}