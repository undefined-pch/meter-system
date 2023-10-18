import { httplocal } from "@/utils/httplocal";

// 获取大表数据
export const getlargemeter = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/largemeter", {
    data
  });
};

// 增加大表数据
export const largemeteradd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/largemeteradd", {
    data
  });
};

// 修改大表数据
export const largemeterfix = (id, data) => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/largemeterfix/" + id,
    {
      data
    }
  );
};

// 删除大表数据
export const largemeterdelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/largemeterfix" + id
  );
};

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
