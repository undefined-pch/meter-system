<template>
  <SeamlessScroll class="es-center-bottom">
    <div v-for="(item, index) in actions" :key="index" class="es-bottom-item">
      <ElIcon size="32" :color="item.color">
        <component :is="iconObj[item.icon]" />
      </ElIcon>
      <span :style="{ color: item.color }" class="es-item-title">{{
        t(item.id)
      }}</span>
      <Vue3Odometer
        :style="{ color: item.color }"
        class="es-item-text"
        :value="item.value"
      />
    </div>
  </SeamlessScroll>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElIcon } from "element-plus";
import Vue3Odometer from "vue3-odometer";
import "odometer/themes/odometer-theme-default.css";
import {
  Dessert,
  GobletFull,
  House,
  Odometer,
  OfficeBuilding,
  SetUp,
  User,
  Place,
  CircleCheck,
  UploadFilled
} from "@element-plus/icons-vue";
import SeamlessScroll from "@/components/SeamlessScroll.vue";
const iconObj = {
  Dessert,
  GobletFull,
  House,
  Odometer,
  OfficeBuilding,
  SetUp,
  User,
  Place,
  CircleCheck,
  UploadFilled
};
import { useI18n } from "vue-i18n"; // 翻译
// 翻译词典
const { t } = useI18n({
  locale: "en",
  messages: {
    en: {
      glxq: "Manage number",
      build: "Manage buildings",
      largemeter: "Install a large number of meter",
      valves: "Number of valves installed",
      households: "Manage the number of households",
      collectors: "The number of collectors installed",
      rate: "Meter reading success rate",
      collectoronline: "Collector online status"
    },
    zh: {
      glxq: "管理小区数量",
      build: "管理楼栋数量",
      largemeter: "安装大表数量",
      valves: "安装表阀数量",
      households: "管理住户数量",
      collectors: "安装采集器数量",
      rate: "抄表成功率",
      collectoronline: "采集器在线情况"
    }
  }
});
const actions = ref([
  {
    color: "rgb(24, 144, 255)",
    id: "glxq",
    icon: "House",
    value: "4"
  },
  {
    color: "rgb(255, 192, 105)",
    id: "build",
    icon: "OfficeBuilding",
    value: 4
  },
  {
    color: "rgb(92, 219, 211)",
    id: "largemeter",
    icon: "Odometer",
    value: 4
  },
  {
    color: "rgb(179, 127, 235)",
    id: "valves",
    icon: "SetUp",
    value: "16"
  },
  {
    color: "rgb(255, 133, 192)",
    id: "households",
    icon: "User",
    value: "50"
  },
  {
    color: "rgb(255, 214, 102)",
    id: "collectors",
    icon: "Place",
    value: "50"
  },
  {
    color: "rgb(24, 144, 255)",
    icon: "CircleCheck",
    id: "rate",
    value: "99%"
  },
  {
    color: "rgb(255, 192, 105)",
    // id: "采集器在线情况",
    id: "collectoronline",
    icon: "UploadFilled",
    value: "99%"
  }
  // { color: "rgb(92, 219, 211)", icon: "Coffee", value: 0 },
  // { color: "rgb(179, 127, 235)", icon: "IceCream", value: 0 },
  // { color: "rgb(255, 133, 192)", icon: "Dessert", value: 0 }
]);

onMounted(() => {
  // actions.value.forEach(item => {
  //   item.value = Math.floor(Math.random() * 999) + 1;
  // });
});
</script>

<style lang="scss" scoped>
.es-center-bottom {
  position: relative;
  width: 97%;
  height: 100px;
  margin: auto;
  overflow: hidden;

  .es-bottom-item {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 100px;
    font-weight: 600;
    background-color: var(--es-block-bg);

    .es-item-title {
      margin-top: 4px;
      font-size: 13px;
      white-space: nowrap;
    }

    .es-item-text {
      margin-top: 4px;
      font-size: 22px;
    }
  }
}
</style>
