import my_req from "./req";
import { urlPaths } from "./base";
import type { ILoginInfo } from "@/views/Login/LoginComp.vue";
export interface IPostResponseInfo {
  token: string
  userid: string
}

export const goToLogin = (userinfo: ILoginInfo) => {
  return my_req.post<any, IPostResponseInfo>(urlPaths.userlogin, userinfo)
}