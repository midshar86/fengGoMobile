export const urlPaths = {
  baseURL: "http://121.89.205.189:3000/api", // 基准请求路径
  swiper: "/banner/list", // 请求轮播图
  goods: "/pro/list", // 请求商品列表
  detail: "/pro/detail", // 请求商品详情
  userlogin: "/user/login", // 用户登录接口
  userinfo: "/user/info", // 获取用户登录信息
  userRegister: "/user/dofinishregister", // 新用户注册
  // 有关购物车的接口尚不能使用, 在项目中使用静态数据代替
  cartlist: "/cart/list", // 获取购物车列表 userid
  cartadd: "/cart/add", // 将商品加入购物车 userid proid num
  updatenum: "/cart/updatenum", // 更新购物车商品数量 cartid num
  delcart: "/cart/remove", // 删除选中的购物车 cartid
  chooseCartOne: "/cart/selectone", // 标记选中的购物车信息 cartid flag
  chooseCartAll: "/cart/selectall" // 全选中或者全不选中 userid type:boolean
}