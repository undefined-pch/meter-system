import { httplocal } from "@/utils/httplocal";
// 获取水表
export const getGaugeValve = data => {
  return httplocal.request("post", "/api/gaugeValve", {
    data
  });
};

// 新增水表数据
export const gaugeValveadd = data => {
  return httplocal.request("post", "/api/gaugeValveadd", {
    data
  });
};

// 修改水表数据
export const gaugeValvefix = (id, data) => {
  return httplocal.request("patch", "/api/gaugeValvefix/" + id, {
    data
  });
};

// 删除、批量删除水表数据
export const gaugeValvedelete = id => {
  return httplocal.request("delete", "/api/gaugeValvedelete/" + id);
};

// 设置出参类型
// export type RefreshTokenResult = {
//   retcode: number;
//   data: any;
//   message: string;
// };
