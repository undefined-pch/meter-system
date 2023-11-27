import { httplocal } from "@/utils/httplocal";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = params => {
  return httplocal.request<Result>("get", "/getAsyncRoutes/" + params);
};
