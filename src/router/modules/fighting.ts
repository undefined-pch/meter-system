import { $t } from "@/plugins/i18n";
export default {
  path: "/fighting",
  meta: {
    icon: "homeFilled",
    title: $t("menus.basemessage"),
    // roles: ["测试1"]
    rank: 2
  },
  children: [
    // {
    //   path: "/fighting/base",
    //   name: "Base",
    //   component: () => import("@/views/fighting/index.vue"),
    //   meta: {
    //     title: $t("menus.basicmessage")
    //   }
    // },
    {
      path: "/fighting/region",
      name: "Region",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.areainformation")
      }
    },
    {
      path: "/fighting/build",
      name: "Build",
      component: () => import("@/views/fighting/build.vue"),
      meta: {
        title: $t("menus.build")
      }
    },
    //住户信息
    {
      path: "/fighting/household",
      name: "household",
      component: () => import("@/views/fighting/household.vue"),
      meta: {
        title: $t("menus.household")
      }
    },
    //采集器信息
    {
      path: "/fighting/collector",
      name: "collector",
      component: () => import("@/views/fighting/collector.vue"),
      meta: {
        title: $t("menus.collector")
      }
    },
    // {
    //   path: "/fighting/largemeter",
    //   name: "Largemeter",
    //   component: () => import("@/views/fighting/largemeter.vue"),
    //   meta: {
    //     title: $t("menus.bigmeter")
    //   }
    // },
    {
      path: "/fighting/metervalve",
      name: "Metervalve",
      component: () => import("@/views/fighting/metervalve.vue"),
      meta: {
        title: $t("menus.meterValve")
      }
    }
    // {
    //   path: "/fighting/protocol",
    //   name: "Protocol",
    //   component: () => import("@/views/fighting/protocol.vue"),
    //   meta: {
    //     title: $t("menus.protocol")
    //   }
    // }
  ]
};
