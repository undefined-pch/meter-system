import { httplocal } from "@/utils/httplocal";

// 增加房间
export const roomAdd = data => {
  return httplocal.request("post", "/api/roomAdd", {
    data
  });
};

// 查询房间
export const getroom = data => {
  return httplocal.request("post", "/api/room", {
    data
  });
};
