import { httplocal } from "@/utils/httplocal";
// 获取表阀
export const getGaugeValve = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/gaugeValve", {
    data
  });
};

// 新增表阀数据
export const gaugeValveadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/gaugeValveadd", {
    data
  });
};

// 修改表阀数据
export const gaugeValvefix = (id, data) => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/gaugeValvefix/" + id,
    {
      data
    }
  );
};

// 删除、批量删除表阀数据
export const gaugeValvedelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/gaugeValvedelete/" + id
  );
};

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
