import { $t } from "@/plugins/i18n";
export default {
  path: "/price",
  meta: {
    icon: "tagPriceLinear",
    title: $t("menus.Pricesetting"),
    rank: 4
  },
  children: [
    {
      path: "/price/priceset",
      name: "priceset",
      component: () => import("@/views/price/priceset.vue"),
      meta: {
        title: $t("menus.Pricesetting")
      }
    },
    {
      path: "/price/ladderset",
      name: "ladderset",
      component: () => import("@/views/price/ladderset.vue"),
      meta: {
        title: $t("menus.Laddersettings")
      }
    }
  ]
};
