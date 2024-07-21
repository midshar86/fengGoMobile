import my_req from "./req"
import { urlPaths } from "./base"
// 获取轮播图数据
export const getSwiperList = () => {
  return my_req.get<any, SwiperTypeNS.ISwiperType[]>(urlPaths.swiper)
}