import { httplocal } from "@/utils/httplocal";

// 查询缴费页面信息
export const getpayInfo = data => {
  return httplocal.request("post", "/api/getRoomsInfo", {
    data
  });
};

// 查询总充值金额
export const getTotalRecharge = data => {
  return httplocal.request("post", "/api/getTotalRecharge", {
    data
  });
};

// 查询充值记录
export const getBill = data => {
  return httplocal.request("post", "/api/getBill", {
    data
  });
};

// 现金充值订单入库
export const warehousing = data => {
  return httplocal.request("post", "/api/warehousing", {
    data
  });
};

// 获取订单号
export const cashNumber = data => {
  return httplocal.request("post", "/api/order/cash/pay", {
    data
  });
};
