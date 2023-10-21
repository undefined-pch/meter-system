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

//删除住户
export const householddelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/householddelete/" + id
  );
};

// 修改住户信息
export const householdfix = id => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/householddelete/" + id
  );
};

// 修改住户状态
export const householdFixStatus = id => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/householdFixStatus/" + id
  );
};

export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
