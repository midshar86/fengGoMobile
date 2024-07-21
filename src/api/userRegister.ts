import { urlPaths } from "./base";
import my_req from "./req";

interface Iuserinfo {
  tel: string
  password: string
}
export const goToRegister = (userinfo: Iuserinfo) => {
  return my_req.post<any, { code: string, message: string }>(urlPaths.userRegister, userinfo)
}