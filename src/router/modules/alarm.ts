import { $t } from "@/plugins/i18n";
export default {
  path: "/alarm",
  meta: {
    icon: "alarmIcon",
    title: $t("menus.alarminformation"),
    rank: 3
  },
  children: [
    {
      path: "/alarm/readinglargemeters",
      name: "Largemeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.largemeter")
      }
    },
    {
      path: "/alarm/readinglargemeters",
      name: "Largemeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.usersmeter")
      }
    },
    {
      path: "/alarm/readinglargemeters",
      name: "Largemeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.controlcollector")
      }
    },
    {
      path: "/alarm/readinglargemeters",
      name: "Largemeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.controlvalve")
      }
    },
    {
      path: "/alarm/readinglargemeters",
      name: "Largemeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.collectorstatus")
      }
    },
    {
      path: "/alarm/readinglargemeters",
      name: "Largemeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.faultalarm")
      }
    }
  ]
};
