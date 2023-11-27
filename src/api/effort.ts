import { httplocal } from "@/utils/httplocal";
import { baseUrlApi } from "./utils";

// 获取水表列表数据
export const getlist = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/effort", { data });
};

// 新增列表数据
export const addlist = data => {
  // return httplocal.request<RefreshTokenResult>("post", "/effortadd", { data });
  return httplocal.request<any>("post", "/api/effortadd", { data });
};

// 删除单行/批量表格数据
export const deletelist = params => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/effortdelete/" + params
  );
};

// 修改表单数据
export const fixlist = (id, data) => {
  return httplocal.request<RefreshTokenResult>(
    "patch",
    "/api/effortfix/" + id,
    {
      data
    }
  );
};

// 批量导入小区
export const batchimport = data => {
  return httplocal.request<any>(
    "post",
    baseUrlApi("api/add"),
    { data },
    // 自定义的axios配置在下面对象填写即可
    {
      headers: {
        "Content-Type": "application/form-data"
      }
    }
  );
};

// 查询所有水司
export const getcompany = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/company", {
    data
  });
};

// 修改水司信息
export const companyfix = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/companyfix", {
    data
  });
};

// 根据区域查询水表小区信息
export const getvillage = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/lookupVillage", {
    data
  });
};

// 新增水司
export const companyadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/companyadd", {
    data
  });
};

// 删除水司
export const companydelete = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/companydelete", {
    data
  });
};

// 查询所有区域
export const getregion = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/region", {
    data
  });
};

// 新增区域
export const regionadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/regionadd", {
    data
  });
};

// 修改区域
export const regionfix = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/regionfix", {
    data
  });
};

// 删除区域
export const regiondelete = id => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/regiondelete/" + id
  );
};

// 新增供热公司数据
export const firecompanyadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/firecompanyadd", {
    data
  });
};

// 查询供热公司数据
export const firecompany = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/firecompany", {
    data
  });
};

// 修改供热公司数据
export const firecompanyfix = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/firecompanyfix", {
    data
  });
};

// 删除供热公司数据
export const firecompanydelete = data => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/firecompanydelete",
    {
      data
    }
  );
};

// 新增区域（热）
export const fireregionadd = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/fireregionadd", {
    data
  });
};

// 修改区域（热）
export const fireregionfix = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/fireregionfix", {
    data
  });
};

// 查询区域（热）
export const fireregion = data => {
  return httplocal.request<RefreshTokenResult>("post", "/api/fireregion", {
    data
  });
};

// 删除区域（热）
export const fireregiondelete = data => {
  return httplocal.request<RefreshTokenResult>(
    "delete",
    "/api/fireregiondelete",
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
