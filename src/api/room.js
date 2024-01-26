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

// 批量增加房间
export const batchRooms = data => {
  return httplocal.request(
    "post",
    "/api/batchRooms",
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
