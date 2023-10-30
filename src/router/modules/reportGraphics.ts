// import { $t } from "@/plugins/i18n";

export default {
  path: "/reportGraphics",
  meta: {
    icon: "homeFilled",
    title: "报表图形",
    rank: 3
  },
  children: [
    {
      path: "/reportGraphics/largemeterdata",
      name: "largemeterdata",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: "大表数据报表"
      }
    },
    {
      path: "/reportGraphics/largemeterused",
      name: "largemeterused",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: "大表使用量报表"
      }
    },
    {
      path: "/reportGraphics/usermeterdata",
      name: "largemeterdata",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: "户表数据报表"
      }
    },
    {
      path: "/reportGraphics/usermeterused",
      name: "usermeterused",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: "户表使用量报表"
      }
    },
    {
      path: "/reportGraphics/usercost",
      name: "usercost",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: "住户费用报表"
      }
    },
    {
      path: "/reportGraphics/ladderfees",
      name: "largemeterdata",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: "阶梯费用报表"
      }
    }
  ]
};
