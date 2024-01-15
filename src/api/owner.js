import { httplocal } from "@/utils/httplocal";

// 增加业主
export const ownerAdd = data => {
  return httplocal.request("post", "/api/ownerAdd", {
    data
  });
};

// 查询业主
export const getOwner = data => {
  return httplocal.request("post", "/api/owner", {
    data
  });
};
