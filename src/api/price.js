import { httplocal } from "@/utils/httplocal";

// 增加水费收费方案信息
export const waterPriceAdd = data => {
  return httplocal.request("post", "/api/waterPriceAdd", {
    data
  });
};

// 查询水费收费方案
export const waterPrice = data => {
  return httplocal.request("post", "/api/waterPrice", {
    data
  });
};
