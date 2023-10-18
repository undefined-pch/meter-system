import { httplocal } from "@/utils/httplocal";
// import { baseUrlApi } from "./utils";

// 获取住户数据
export const gethousehold = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/household", {
    data
  });
};

//新增住户
export const householdadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/householdadd", {
    data
  });
};

export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
