import { httplocal } from "@/utils/httplocal";
// import { baseUrlApi } from "./utils";

// 获取列表数据
export const getcollector = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/collector", {
    data
  });
};

// 新增采集器
export const collectoradd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/collectoradd", {
    data
  });
};

// 修改采集器
export const collectorfix = (id, data) => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/collectorfix/" + id,
    {
      data
    }
  );
};

// 删除采集器
export const collectordelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/collectordelete/" + id
  );
};

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
