import { httplocal } from "@/utils/httplocal";
// import { baseUrlApi } from "./utils";

// 获取列表数据
export const getcollector = data => {
  return httplocal.request("post", "/api/collector", {
    data
  });
};

// 新增采集器
export const collectoradd = data => {
  return httplocal.request("post", "/api/collectoradd", {
    data
  });
};

// 修改采集器
export const collectorfix = (id, data) => {
  return httplocal.request("patch", "/api/collectorfix/" + id, {
    data
  });
};

// 删除采集器
export const collectordelete = id => {
  return httplocal.request("delete", "/api/collectordelete/" + id);
};

// 批量导入采集器信息
export const batchCollectorExcel = data => {
  return httplocal.request(
    "post",
    "/api/batchCollector",
    {
      data
    },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
