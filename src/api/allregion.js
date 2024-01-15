import { httplocal } from "@/utils/httplocal";
// 增加区域信息
export const allregionadd = data => {
  return httplocal.request("post", "/api/allRegionAdd", {
    data
  });
};

// 查询区域信息
export const allregion = data => {
  return httplocal.request("post", "/api/allRegion", {
    data
  });
};

// 修改区域信息
export const allregionfix = (id, data) => {
  return httplocal.request("patch", "/api/allRegionFix/" + id, {
    data
  });
};
