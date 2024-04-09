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
export const allregionfix = data => {
  return httplocal.request("post", "/api/allRegionFix", {
    data
  });
};

// 删除区域信息
export const allregionDelete = id => {
  return httplocal.request("delete", "/api/allRegionDelete/" + id);
};

// 批量子级
export const batchRegion = data => {
  return httplocal.request("post", "/api/batchRegion", {
    data
  });
};
