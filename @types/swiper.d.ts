// 配置全局类型声明文件, 用来约束请求返回的轮播图数据
declare namespace SwiperTypeNS {
  interface ISwiperType {
    img: string
    link: string,
    alt: string,
    flag: boolean,
    bannerid: string
  }
}