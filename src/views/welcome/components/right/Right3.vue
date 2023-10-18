<template>
  <div class="es-block">
    <Title style="white-space: nowrap">{{ t("right3") }}</Title>
    <div style="width: 100%; height: 90%">
      <Chart :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Title from "../Title.vue";
import Chart from "@/components/chart/Chart.vue";
import allData from "@/assets/data/rank.json";
import buildData from "@/assets/data/rankbuild.json";
import * as echarts from "echarts";
import { emitter } from "@/utils/mitt";
import { useI18n } from "vue-i18n"; // 翻译
const colorArr = [
  ["#0BA82C", "#4FF778"],
  ["#2E72BF", "#23E5E5"],
  ["#5052EE", "#AB6EE5"]
];
const startValue = ref(0);
const endValue = ref(9);
const barWidth = 10;
const option = ref({
  grid: {
    top: "10%",
    left: "5%",
    right: "5%",
    bottom: "5%",
    containLabel: true
  },
  tooltip: {
    show: true
  },
  xAxis: {
    type: "category",
    // axisLabel: { interval: 0 }
    axisTick: { show: true },
    data: allData.map(item => item.name)
  },
  yAxis: {
    type: "value",
    splitLine: { show: false },
    axisLine: { show: true },
    data: allData.map(item => item.name)
  },
  dataZoom: {
    show: false,
    startValue: startValue.value,
    endValue: endValue.value
  },
  series: [
    {
      type: "bar",
      data: allData.map(item => item.value),
      barWidth: barWidth,
      itemStyle: {
        borderRadius: [barWidth / 2, barWidth / 2, 0, 0],
        color: arg => {
          let targetColorArr: string[] | null = null;
          if (arg.value > 300) {
            targetColorArr = colorArr[0];
          } else if (arg.value > 200) {
            targetColorArr = colorArr[1];
          } else {
            targetColorArr = colorArr[2];
          }
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: targetColorArr[0]
            },
            {
              offset: 1,
              color: targetColorArr[1]
            }
          ]);
        }
      }
    }
  ]
});
onMounted(() => {
  emitter.on("level", info => {
    if (info == 2) {
      option.value = {
        grid: {
          top: "10%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          show: true
        },
        xAxis: {
          type: "category",
          // axisLabel: { interval: 0 }
          axisTick: { show: true },
          data: buildData.map(item => item.name)
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: { show: true },
          data: buildData.map(item => item.name)
        },
        dataZoom: {
          show: false,
          startValue: startValue.value,
          endValue: endValue.value
        },
        series: [
          {
            type: "bar",
            data: buildData.map(item => item.value),
            barWidth: barWidth,
            itemStyle: {
              borderRadius: [barWidth / 2, barWidth / 2, 0, 0],
              color: arg => {
                let targetColorArr: string[] | null = null;
                if (arg.value > 300) {
                  targetColorArr = colorArr[0];
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1];
                } else {
                  targetColorArr = colorArr[2];
                }
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ]);
              }
            }
          }
        ]
      };
    } else if (info == 1) {
      option.value = {
        grid: {
          top: "10%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: {
          show: true
        },
        xAxis: {
          type: "category",
          // axisLabel: { interval: 0 }
          axisTick: { show: true },
          data: allData.map(item => item.name)
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: { show: true },
          data: allData.map(item => item.name)
        },
        dataZoom: {
          show: false,
          startValue: startValue.value,
          endValue: endValue.value
        },
        series: [
          {
            type: "bar",
            data: allData.map(item => item.value),
            barWidth: barWidth,
            itemStyle: {
              borderRadius: [barWidth / 2, barWidth / 2, 0, 0],
              color: arg => {
                let targetColorArr: string[] | null = null;
                if (arg.value > 300) {
                  targetColorArr = colorArr[0];
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1];
                } else {
                  targetColorArr = colorArr[2];
                }
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ]);
              }
            }
          }
        ]
      };
    }
  });
});
// 翻译词典
const { t } = useI18n({
  locale: "en",
  messages: {
    en: {
      right3: "water consumption ranking last month"
    },
    zh: {
      right3: "小区上月用水量排行"
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
