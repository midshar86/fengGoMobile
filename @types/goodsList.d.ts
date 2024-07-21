// 配置全局类型声明文件, 用来约束请求获取的商品列表数据
declare namespace GoodsListNS {
  interface IGoodsListItem {
    banners: string[] // 商品轮播图
    proid: string // 商品id
    category: string // 商品分类
    brand: string // 商标
    proname: string // 商品名
    originprice: number // 原价
    desc: string // 商品详细描述
    issale: number // 商品是否促销
    discount: number // 商品折扣
    img2: string // 商品图片
  }
}