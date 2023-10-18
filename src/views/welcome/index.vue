<template>
  <div class="es-screen-container">
    <div ref="screenRef" style="width: 100%">
      <Header />
      <div class="es-screen-main">
        <div class="es-screen-left">
          <Left />
        </div>
        <div class="es-screen-center">
          <Center :isshowbottom="isshowbottom" />
        </div>
        <div class="es-screen-right">
          <Right />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useResize } from "@/utils/map/useResize";
const { screenRef } = useResize();
// 导入头部组件
import Header from "./components/Header.vue";
import Left from "./components/left/index.vue";
import Center from "./components/center/index.vue";
import Right from "./components/right/index.vue";

const isshowbottom = ref(true);
// import { shallowRef } from "vue";
// import { useSortable } from "@/utils/map/useSortable";
// 可以将组件进行拖拽
// import Right1 from './Right1.vue'
// import Right2 from './Right2.vue'
// import Right3 from './Right3.vue'
// const components = shallowRef([
// 	{ name: 'right1', component: Right1 },
// 	{ name: 'right2', component: Right2 },
// 	{ name: 'right3', component: Right3 }
// ])
// const { containerRef } = useSortable(components)
// echarts组件
// const chartRef = ref(null);
// const option = ref({
//   xAxis: {
//     type: "category",
//     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
//   },
//   yAxis: {
//     type: "value"
//   },
//   series: [
//     {
//       data: [120, 200, 150, 80, 70, 110, 130],
//       type: "bar",
//       showBackground: true,
//       backgroundStyle: {
//         color: "rgba(180, 180, 180, 0.2)"
//       }
//     }
//   ]
// });
</script>
<style lang="scss" scoped>
.es-screen-container {
  --es-screen-width: 1920px;
  --es-screen-height: 1080px;
  --es-header-height: 72px;
  --es-block-bg: #222733;
  --es-screen-bg: rgb(22 21 34);
  --es-screen-text-color: #fff;

  position: relative;
  top: -40px;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  color: var(--es-screen-text-color);
  background: var(--es-screen-bg);
  background-size: 100% 100%;
}

.es-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--es-screen-width);
  height: var(--es-screen-height);
  padding: 0 20px;
  margin-top: calc(var(--es-screen-height) * 0.5 - var(--es-screen-height));
  margin-left: calc(var(--es-screen-width) * 0.5 - var(--es-screen-width));
  user-select: none;
  background-size: 100% 100%;

  &-main {
    position: relative;
    display: flex;
    height: calc(100% - var(--es-header-height));
  }

  &-center {
    flex: 1;
    width: calc(var(--es-screen-width) - 1300px);
    min-width: 250px;
  }

  &-left,
  &-right {
    width: 250px;
  }
}
</style>
