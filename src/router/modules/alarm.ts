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
      path: "/alarm/writeLargemeters",
      name: "writeLargemeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.largemeter")
      }
    },
    {
      path: "/alarm/writehouseholdmeters",
      name: "writehouseholdmeters",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.usersmeter")
      }
    },
    {
      path: "/alarm/controlCollector",
      name: "controlCollector",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.controlcollector")
      }
    },
    {
      path: "/alarm/controlValve",
      name: "controlValve",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.controlvalve")
      }
    },
    {
      path: "/alarm/collectorStatus",
      name: "collectorStatus",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.collectorstatus")
      }
    },
    {
      path: "/alarm/faultAlarm",
      name: "faultAlarm",
      component: () => import("@/views/fighting/effort.vue"),
      meta: {
        title: $t("menus.faultalarm")
      }
    }
  ]
};
