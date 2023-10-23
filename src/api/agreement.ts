import { httplocal } from "@/utils/httplocal";
// import { baseUrlApi } from "./utils";

// 获取协议数据
export const getagreement = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/agreement", {
    data
  });
};

// 增加协议
export const agreementadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/agreementadd", {
    data
  });
};

// 修改楼栋信息
export const agreementfix = data => {
  return httplocal.request<RefreshTokenResult>("patch", "/api/agreementfix", {
    data
  });
};

// 删除楼栋信息
export const agreementdelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/agreementdelete/" + id
  );
};

// 根据小区去查找小区坐标信息
// export const lookupregion = data => {
//   return httplocal.request<RefreshTokenResult>("post", "/api/lookupregion", {
//     data
//   });
// };

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
