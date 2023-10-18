<template>
  <div class="es-block">
    <Title style="white-space: nowrap" v-show="level == 1">{{
      t("left1")
    }}</Title>
    <Title style="white-space: nowrap" v-show="level == 2">{{
      t("left2")
    }}</Title>
    <Title style="white-space: nowrap" v-show="level == 3">{{
      t("left3")
    }}</Title>
    <div style="width: 100%; height: 90%">
      <Chart :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Title from "../Title.vue";
import Chart from "@/components/chart/Chart.vue";
import allData from "@/assets/data/trend.json";
import left1build from "@/assets/data/left1build.json";
import build1in from "@/assets/data/build1in.json"; // 进入楼栋内的数据
import * as echarts from "echarts";
import { emitter } from "@/utils/mitt";
import { useI18n } from "vue-i18n"; // 翻译
const choiceType = "map";
const option = ref({
  grid: {
    left: "3%",
    top: "30%",
    right: "4%",
    bottom: "1%",
    containLabel: true
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    left: 20,
    top: "2%",
    icon: "circle",
    data: allData[choiceType].data,
    textStyle: {
      color: "#aaa"
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: allData.common.month
  },
  yAxis: {
    type: "value"
  },
  series: getSeries(allData)
});

function getSeries(adata) {
  // 半透明的颜色值
  const colorArr1 = [
    "rgba(11, 168, 44, 0.5)",
    "rgba(44, 110, 255, 0.5)",
    "rgba(22, 242, 217, 0.5)",
    "rgba(254, 33, 30, 0.5)",
    "rgba(250, 105, 0, 0.5)"
  ];
  // 全透明的颜色值
  const colorArr2 = [
    "rgba(11, 168, 44, 0)",
    "rgba(44, 110, 255, 0)",
    "rgba(22, 242, 217, 0)",
    "rgba(254, 33, 30, 0)",
    "rgba(250, 105, 0, 0)"
  ];
  // y轴的数据 series下的数据
  const valueArr = adata[choiceType].data;
  const seriesArr = valueArr.map((item, index) => {
    return {
      name: item.name,
      type: "line",
      data: item.data,
      stack: choiceType,
      itemStyle: {
        borderWidth: 3
      },
      lineStyle: {
        width: 1
      },
      symbolSize: 0,
      symbol: "circle",
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr1[index]
          }, // %0的颜色值
          {
            offset: 1,
            color: colorArr2[index]
          } // 100%的颜色值
        ])
      }
    };
  });

  return seriesArr;
}

const level = ref(1);
onMounted(() => {
  emitter.on("level", info => {
    if (info == 2) {
      level.value = 2;
      option.value = {
        grid: {
          left: "3%",
          top: "30%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: 20,
          top: "2%",
          icon: "circle",
          data: left1build[choiceType].data as any,
          textStyle: {
            color: "#aaa"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: left1build.common.month
        },
        yAxis: {
          type: "value"
        },
        series: getSeries(left1build)
      };
    } else if (info == 1) {
      level.value = 1;
      option.value = {
        grid: {
          left: "3%",
          top: "30%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: 20,
          top: "2%",
          icon: "circle",
          data: allData[choiceType].data,
          textStyle: {
            color: "#aaa"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: allData.common.month
        },
        yAxis: {
          type: "value"
        },
        series: getSeries(allData)
      };
    } else if (info == 3) {
      level.value = 3;
      option.value = {
        grid: {
          left: "3%",
          top: "30%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: 20,
          top: "2%",
          icon: "circle",
          data: build1in[choiceType].data as any,
          textStyle: {
            color: "#aaa"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: build1in.common.month
        },
        yAxis: {
          type: "value"
        },
        series: getSeries(build1in)
      };
    }
  });
});

// 翻译词典
const { t } = useI18n({
  locale: "en",
  messages: {
    en: {
      left1: "Trend of monthly water",
      left2: "Building monthly water consumption trend",
      left3: "Household Water Consumption Trends"
    },
    zh: {
      left1: "小区月用水量趋势",
      left2: "楼栋月用水量趋势",
      left3: "户表用水量趋势"
    }
  }
});
</script>

<style lang="scss" scoped>
.es-block {
  width: 100%;
  height: 100%;
}
</style>
