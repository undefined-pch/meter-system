import { httplocal } from "@/utils/httplocal";
// import { baseUrlApi } from "./utils";

// 获取列表数据
export const getbuild = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/build", {
    data
  });
};

// 增加楼栋
export const buildadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/buildadd", {
    data
  });
};

// 修改楼栋信息
export const buildfix = (id, data) => {
  return httplocal.request<RefreshTokenResult>("patch", "/api/buildfix/" + id, {
    data
  });
};

// 删除楼栋信息
export const builddelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/builddelete/" + id
  );
};

// 根据小区去查找小区坐标信息
export const lookupregion = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/lookupregion", {
    data
  });
};

// 获取热表楼栋
export const firebuild = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/firebuild", {
    data
  });
};

// 增加热表楼栋
export const firebuildadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/firebuildadd", {
    data
  });
};

// 修改热表信息
export const firebuildfix = (id, data) => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/firebuildadd/" + id,
    {
      data
    }
  );
};

// 删除热表信息
export const firebuilddelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/firebuilddelete/" + id
  );
};

// 根据小区名称去查询小区地理信息
export const lookupfireregion = data => {
  return httplocal.request<RefreshTokenResult>(
    "post",
    "/api/lookupfireregion",
    {
      data
    }
  );
};

// 设置出参类型
export type RefreshTokenResult = {
  retcode: number;
  data: any;
  message: string;
};
