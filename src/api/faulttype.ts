import { httplocal } from "@/utils/httplocal";
// import { baseUrlApi } from "./utils";

// 获取故障类型号数据
export const getfaulttype = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/faulttype", {
    data
  });
};

// 增加故障类型号
export const faulttypeadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/faulttypeadd", {
    data
  });
};

// 修改故障类型号
export const faulttypefix = data => {
  return httplocal.request<RefreshTokenResult>("patch", "/api/faulttypefix", {
    data
  });
};

// 删除故障类型号
export const faulttypedelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/faulttypedelete/" + id
  );
};

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
