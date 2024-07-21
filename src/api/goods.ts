import my_req from "./req";
import { urlPaths } from "./base";

// 定义传递的参数类型
export interface IGoodsParams {
  count: number // 页码
  limitNum?: number // 每一页请求的数据个数， 默认10
}

// 定义请求获取商品列表
export const getGoodsList = (params: IGoodsParams) => {
  return my_req.get<any, GoodsListNS.IGoodsListItem[]>(urlPaths.goods, { params })
}