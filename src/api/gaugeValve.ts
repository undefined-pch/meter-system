import { httplocal } from "@/utils/httplocal";
// 获取列表数据
export const getGaugeValve = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/gaugeValve", {
    data
  });
};

// 新增列表数据
export const gaugeValveadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/gaugeValve", {
    data
  });
};

// 修改列表数据
export const gaugeValvefix = (id, data) => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/gaugeValve/" + id,
    {
      data
    }
  );
};

// 删除、批量删除列表数据
export const gaugeValvedelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/gaugeValve/" + id
  );
};

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
