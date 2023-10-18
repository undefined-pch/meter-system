import { httplocal } from "@/utils/httplocal";
// import { baseUrlApi } from "./utils";

// 单价接口!!!
// 新增单价
export const pricesetadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/pricesetadd", {
    data
  });
};

// 查询单价
export const getpriceset = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/priceset", {
    data
  });
};

// 修改单价
export const pricesetfix = (id, data) => {
  return httplocal.request<any>("patch", "/api/pricesetfix/" + id, {
    data
  });
};

// 删除单价
export const pricesetdelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/pricesetdelete/" + id
  );
};

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};

// 以下为阶梯价接口！！！
// 新增阶梯价
export const laddersetadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/laddersetadd", {
    data
  });
};

// 查询阶梯价
export const ladderset = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/ladderset", {
    data
  });
};

// 修改阶梯价
export const laddersetfix = (id, data) => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/laddersetfix/" + id,
    {
      data
    }
  );
};

// 删除阶梯价
export const laddersetdelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/laddersetdelete/" + id
  );
};
