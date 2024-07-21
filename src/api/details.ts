import my_req from "./req";
import { urlPaths } from "./base";

// 定义函数获取商品详情信息
// 接收一个参数, 商品的唯一标识 id
export const getGoodsDetails = (proid: string) => {
  return my_req.get<any, GoodsListNS.IGoodsListItem>(`${urlPaths.detail}/${proid}`)
}