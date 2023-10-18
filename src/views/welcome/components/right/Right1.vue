<template>
  <div class="es-block">
    <Title style="white-space: nowrap">{{ t("right1") }}</Title>
    <div style="width: 100%; height: 90%">
      <Chart :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Title from "../Title.vue";
import Chart from "@/components/chart/Chart.vue";
import allData from "@/assets/data/alarm.json";
import buildData from "@/assets/data/alarmbuild.json";
import { emitter } from "@/utils/mitt";
import { useI18n } from "vue-i18n"; // 翻译

const currentIndex = ref(0);
const option = ref({
  grid: {
    containLabel: false
  },
  legend: {
    // top: "6%",
    bottom: "0%",
    icon: "circle",
    data: allData[currentIndex.value].children.map(item => {
      return item.name;
    }),
    textStyle: {
      color: "#aaa"
    }
  },
  tooltip: {
    show: true,
    formatter: arg => {
      // console.log(arg)
      const thirdCategory = arg.data.children;
      // 计算出所有三级分类的数值总和
      let total = 0; // eslint-disable-line no-unused-vars
      thirdCategory.forEach(item => {
        total += item.value;
      });
      let retStr = "";
      thirdCategory.forEach(item => {
        retStr += `
				${item.name}:${item.value + "条"}
				<br/>
				`;
      });
      return retStr;
    }
  },
  series: [
    {
      type: "pie",
      center: ["50%", "40%"],
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        },
        labelLine: {
          show: false
        }
      },
      data: allData[currentIndex.value].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children // 新增加children的原因是为了在tooltip中的formatter的回调函数中,来拿到这个二级分类下的三级分类数据
        };
      })
    }
  ]
});
onMounted(() => {
  emitter.on("level", info => {
    if (info == 2) {
      option.value = {
        grid: {
          containLabel: false
        },
        legend: {
          // top: "6%",
          bottom: "0%",
          icon: "circle",
          data: buildData[currentIndex.value].children.map(item => {
            return item.name;
          }),
          textStyle: {
            color: "#aaa"
          }
        },
        tooltip: {
          show: true,
          formatter: arg => {
            // console.log(arg)
            const thirdCategory = arg.data.children;
            // 计算出所有三级分类的数值总和
            let total = 0; // eslint-disable-line no-unused-vars
            thirdCategory.forEach(item => {
              total += item.value;
            });
            let retStr = "";
            thirdCategory.forEach(item => {
              retStr += `
				${item.name}:${item.value + "条"}
				<br/>
				`;
            });
            return retStr;
          }
        },
        series: [
          {
            type: "pie",
            center: ["50%", "40%"],
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            },
            data: buildData[currentIndex.value].children.map(item => {
              return {
                name: item.name,
                value: item.value,
                children: item.children // 新增加children的原因是为了在tooltip中的formatter的回调函数中,来拿到这个二级分类下的三级分类数据
              };
            })
          }
        ]
      };
    } else if (info == 1) {
      option.value = {
        grid: {
          containLabel: false
        },
        legend: {
          // top: "6%",
          bottom: "0%",
          icon: "circle",
          data: allData[currentIndex.value].children.map(item => {
            return item.name;
          }),
          textStyle: {
            color: "#aaa"
          }
        },
        tooltip: {
          show: true,
          formatter: arg => {
            // console.log(arg)
            const thirdCategory = arg.data.children;
            // 计算出所有三级分类的数值总和
            let total = 0; // eslint-disable-line no-unused-vars
            thirdCategory.forEach(item => {
              total += item.value;
            });
            let retStr = "";
            thirdCategory.forEach(item => {
              retStr += `
				${item.name}:${item.value + "条"}
				<br/>
				`;
            });
            return retStr;
          }
        },
        series: [
          {
            type: "pie",
            center: ["50%", "40%"],
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            },
            data: allData[currentIndex.value].children.map(item => {
              return {
                name: item.name,
                value: item.value,
                children: item.children // 新增加children的原因是为了在tooltip中的formatter的回调函数中,来拿到这个二级分类下的三级分类数据
              };
            })
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
      right1: "Proportion of alarms"
    },
    zh: {
      right1: "小区报警占比"
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
