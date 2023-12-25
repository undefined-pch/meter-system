<template>
  <div class="welcome">
    <div class="costs_quickAccess">
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="15">
            <el-card shadow="always" style="height: 270px">
              <p style="font-size: 15px">
                <el-divider direction="vertical" />近30天费用占比
              </p>
              <div class="chart_content">
                <div class="driveCostChart" id="driveCostChart" />
                <div class="driveIncomeCategory" id="driveIncomeCategory" />
              </div>
            </el-card>
          </el-col>
          <el-col :span="9"
            ><el-card shadow="always" style="height: 100%">
              <p style="font-size: 15px">
                <el-divider direction="vertical" />日历
              </p>
              <div class="calendar"><calendar /></div> </el-card
          ></el-col>
        </el-row>
      </div>
    </div>
    <div class="top">
      <div class="content">
        <el-card shadow="always" style="height: 100%; white-space: nowrap">
          <el-scrollbar>
            <template v-for="item in modules" :key="item.name">
              <div class="content_box" :style="item.backStyle">
                <img class="icon" :src="item.icon" alt="" />
                <span class="title">{{ item.name }}</span>
                <div class="count">
                  <div class="count_item">
                    <span class="label">总数：</span>
                    <span class="input_total">{{ item.total }}</span>
                  </div>
                  <div class="count_item" v-if="item.showItem == 4">
                    <span class="label">在线数：</span>
                    <span class="input_online">{{ item.online }}</span>
                  </div>
                  <div class="count_item" v-if="item.showItem == 4">
                    <span class="label">掉电数：</span>
                    <span class="input_powerDown">{{ item.powerDown }}</span>
                  </div>
                  <div class="count_item" v-if="item.showItem == 4">
                    <span class="label">离线数：</span>
                    <span class="input_outline">{{ item.outline }}</span>
                  </div>
                  <div class="count_item" v-if="item.showItem == 3">
                    <span class="label">热表：</span>
                    <span class="household_hotMeter">{{ item.outline }}</span>
                  </div>
                  <div class="count_item" v-if="item.showItem == 3">
                    <span class="label">水表：</span>
                    <span class="household_WaterMeter">{{ item.outline }}</span>
                  </div>
                  <div class="count_item" v-if="item.showItem == 2" />
                  <div class="count_item" v-if="item.showItem == 2">
                    <span class="label">关阀数：</span>
                    <span class="input_outline">{{ item.outline }}</span>
                  </div>
                </div>
              </div>
            </template>
          </el-scrollbar>
        </el-card>
      </div>
    </div>

    <div class="payment_testing">
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="15">
            <el-card shadow="always" style="height: 270px">
              <p style="font-size: 15px">
                <el-divider direction="vertical" />近30天预警信息
              </p>
              <div class="alarm_table">
                <el-scrollbar height="200px">
                  <el-table
                    :data="tableData"
                    height="200"
                    stripe
                    style="width: 100%"
                  >
                    <el-table-column prop="date" label="日期" width="100" />
                    <el-table-column prop="meterId" label="表号" width="150" />
                    <el-table-column
                      prop="message"
                      label="告警信息"
                      width="160"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="alarmLevel"
                      label="告警等级"
                      width="100"
                    >
                      <template #default="{ row }">
                        <el-tag type="danger" v-if="row.alarmLevel == 1"
                          >高</el-tag
                        >
                        <el-tag type="warning" v-else-if="row.alarmLevel == 2"
                          >中</el-tag
                        >
                        <el-tag type="info" v-else-if="row.alarmLevel == 3"
                          >底</el-tag
                        >
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="地址 " />
                  </el-table>
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
          <el-col :span="9">
            <el-card shadow="always" style="height: 100%">
              <p style="font-size: 15px">
                <el-divider direction="vertical" />快捷入口
              </p>
              <div class="content_box">
                <el-scrollbar>
                  <template v-for="item in quickEntrance" :key="item.id">
                    <div class="content_item">
                      <div class="backColor">
                        <img class="icon" :src="item.icon" alt="" />
                      </div>
                      <p class="title">{{ item.name }}</p>
                    </div>
                  </template>
                </el-scrollbar>
              </div>
            </el-card></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import * as echarts from "echarts";
import calendar from "@/components/calendar/calendar.vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange"; // 切换主题颜色
// 模拟基本信息
const modules = ref([
  {
    name: "采集器(个)",
    total: 12,
    online: 0,
    powerDown: 0,
    outline: 12,
    icon: `/src/assets/welcome/collector_white.png`,
    showItem: 4,
    backStyle:
      "background-image: linear-gradient(to right bottom,  #6f86d6,#48c6ef);"
  },
  {
    name: "4G模块(个)",
    total: 0,
    online: 0,
    powerDown: 0,
    outline: 0,
    icon: `/src/assets/welcome/4G_white.png`,
    showItem: 4,
    backStyle:
      "background-image: linear-gradient(to right bottom,  #ef9ea9,  #fedee2 );"
  },
  {
    name: "NB热表(个)",
    total: 2,
    online: 0,
    powerDown: 0,
    outline: 2,
    icon: `/src/assets/welcome/hotmeter_white.png`,
    showItem: 4,
    backStyle:
      "background-image: linear-gradient(to right bottom, #7690c1 ,   #c2daee );"
  },
  {
    name: "NB水表(个)",
    total: 2,
    online: 0,
    powerDown: 0,
    outline: 2,
    icon: `/src/assets/welcome/watermeter_white.png`,
    showItem: 4,
    backStyle:
      "background-image: linear-gradient(to right bottom,   #b3afaa,#f3f0e9);"
  },
  {
    name: "管理住户数量",
    total: 2,
    online: 0,
    powerDown: 0,
    outline: 2,
    icon: `/src/assets/welcome/household_white.png`,
    showItem: 3,
    backStyle:
      "background-image: linear-gradient(to right bottom,  #c1dfc4,  #deecdd );"
  },
  {
    name: "管理楼栋数量",
    total: 2,
    online: 0,
    powerDown: 0,
    outline: 2,
    icon: `/src/assets/welcome/build_white.png`,
    showItem: 3,
    backStyle:
      "background-image: linear-gradient(to right bottom,   #a18cd1, #fbc2eb );"
  },
  {
    name: "管理小区数量",
    total: 2,
    online: 0,
    powerDown: 0,
    outline: 2,
    icon: `/src/assets/welcome/village_white.png`,
    showItem: 3,
    backStyle:
      "background-image: linear-gradient(to right bottom,  #6f86d6,#48c6ef);"
  },
  {
    name: "热表关阀",
    total: 2,
    online: 0,
    powerDown: 0,
    outline: 2,
    icon: `/src/assets/welcome/faclose.png`,
    showItem: 2,
    backStyle:
      "background-image: linear-gradient(to right bottom,  #ef9ea9,  #fedee2 );"
  },
  {
    name: "水表关阀",
    total: 2,
    online: 0,
    powerDown: 0,
    outline: 2,
    icon: `/src/assets/welcome/faclose.png`,
    showItem: 2,
    backStyle:
      "background-image: linear-gradient(to right bottom, #7690c1 ,   #c2daee );"
  }
]);

// 快捷入口信息
const quickEntrance = ref([
  {
    id: 1,
    name: "缴费管理",
    icon: `/src/assets/welcome/jiaofei.png`
  },
  {
    id: 2,
    name: "采集器管理",
    icon: `/src/assets/welcome/collector_white.png`
  },
  {
    id: 3,
    name: "表阀信息",
    icon: `/src/assets/welcome/valve.png`
  },
  {
    id: 4,
    name: "抄读阀控",
    icon: `/src/assets/welcome/fa_ctrl.png`
  },
  {
    id: 5,
    name: "报表管理",
    icon: `/src/assets/welcome/reportForms.png`
  },
  {
    id: 5,
    name: "抄表管理",
    icon: `/src/assets/welcome/meterReading.png`
  },
  {
    id: 6,
    name: "区域管理",
    icon: `/src/assets/welcome/region.png`
  },
  {
    id: 7,
    name: "收费方案",
    icon: `/src/assets/welcome/charge.png`
  },
  {
    id: 8,
    name: "个人中心",
    icon: `/src/assets/welcome/person.png`
  }
]);

// 费用数据
const costData = ref([
  { value: 1048, name: "微信" },
  { value: 580, name: "现金" },
  { value: 484, name: "银联" },
  { value: 735, name: "支付宝" }
]);
// 总费用
const allCost = computed(() => {
  return (
    costData.value[0].value +
    costData.value[1].value +
    costData.value[2].value +
    costData.value[3].value
  );
});

// 表格信息
const tableData = [
  {
    date: "2023-12-22",
    meterId: "12345678900(水表)",
    message: "流量传感器故障或空管",
    alarmLevel: 1,
    address: "万利大厦-2单元-201"
  },
  {
    date: "2023-12-22",
    meterId: "12345678901(热表)",
    message: "温度传感器故障",
    alarmLevel: 2,
    address: "万利大厦-2单元-301"
  },
  {
    date: "2023-12-21",
    meterId: "12345678903(水表)",
    message: "水管泄露故障",
    alarmLevel: 1,
    address: "万利大厦-2单元-401"
  },
  {
    date: "2023-12-20",
    meterId: "12345678904(水表)",
    message: "水管爆裂故障",
    alarmLevel: 3,
    address: "万利大厦-2单元-501"
  },
  {
    date: "2023-12-20",
    meterId: "12345678905(水表)",
    message: "阀门异常",
    alarmLevel: 1,
    address: "万利大厦-2单元-601"
  }
];
// 绘制近30天费用占比
const driveCostChart = () => {
  const myChart = echarts.init(document.getElementById("driveCostChart"));
  const option = {
    title: {
      // 设置饼图标题，位置设为顶部居中
      text: `总金额   |   ￥${allCost.value}`,
      orient: "vertical",
      top: "10px",
      left: "0px"
    },
    tooltip: {
      trigger: "item",
      valueFormatter: function (value) {
        return "￥" + value;
      }
    },
    legend: {
      orient: "vertical",
      top: "42px",
      left: "0px",
      formatter: name => {
        //该函数用于设置图例显示后的百分比
        let total = 0;
        let value;
        // debugger;
        costData.value.forEach(item => {
          total += Number(item.value);
          if (item.name == name) {
            value = item.value;
          }
        });
        const p = Math.round((value / total) * 100); //求出百分比
        if (name.length == 2) {
          return `${name}     |      ${p}%`; //返回出图例所显示的内容是名称+百分比
        } else if (name.length == 3) {
          return `${name}  |      ${p}%`; //返回出图例所显示的内容是名称+百分比
        }
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      top: "2%",
      containLabel: false
    },
    series: [
      {
        name: "费用占比",
        type: "pie",
        radius: ["65%", "95%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        left: 150,
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: costData.value
      }
    ]
  };
  option && myChart.setOption(option);
};

// 费用数据
const incomeData = ref([
  { value: 1628, name: "水表" },
  { value: 1219, name: "热表" }
]);
// 绘制近30天收费类别占比
const driveIncomeCategory = () => {
  const myChart = echarts.init(document.getElementById("driveIncomeCategory"));
  const option = {
    title: {
      // 设置饼图标题，位置设为顶部居中
      text: `总金额   |   ￥${allCost.value}`,
      orient: "vertical",
      top: "10px",
      left: "0px"
    },
    tooltip: {
      trigger: "item",
      valueFormatter: function (value) {
        return "￥" + value;
      }
    },
    legend: {
      orient: "vertical",
      top: "42px",
      left: "0px",
      formatter: name => {
        //该函数用于设置图例显示后的百分比
        let total = 0;
        let value;
        // debugger;
        incomeData.value.forEach(item => {
          total += Number(item.value);
          if (item.name == name) {
            value = item.value;
          }
        });
        const p = Math.round((value / total) * 100); //求出百分比
        if (name.length == 2) {
          return `${name}     |      ${p}%`; //返回出图例所显示的内容是名称+百分比
        } else if (name.length == 3) {
          return `${name}  |      ${p}%`; //返回出图例所显示的内容是名称+百分比
        }
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      top: "2%",
      containLabel: false
    },
    series: [
      {
        name: "费用占比",
        type: "pie",
        radius: ["65%", "95%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        left: 150,
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: incomeData.value
      }
    ]
  };
  option && myChart.setOption(option);
};

const { setLayoutThemeColor } = useDataThemeChange();
onMounted(() => {
  setLayoutThemeColor("light");
  driveCostChart();
  driveIncomeCategory();
});
</script>

<style lang="scss" scoped>
.welcome {
  .top {
    width: 100%;
    height: 190px;
    position: relative;

    .content {
      height: 140px;
      width: 97%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -49%;
      margin-top: -80px;

      .content_box {
        position: relative;
        width: 220px;
        height: 100px;
        display: inline-block;
        border-radius: 5px;
        // border-right: 1px solid #dcdfe6;
        // background-image: linear-gradient(to right bottom, #48c6ef, #6f86d6);
        margin-right: 14px;

        .icon {
          position: absolute;
          top: 8px;
          left: 6px;
          width: 20px;
          height: 20px;
        }

        .title {
          font-size: 14px;
          position: absolute;
          top: 8px;
          left: 36px;
          width: 20px;
          height: 20px;
          color: rgba(255, 255, 255, 1);
        }

        .count {
          width: 90%;
          height: 70px;
          position: absolute;
          top: 30px;
          // background-color: pink;
          padding: 6px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          grid-gap: 10px;

          .count_item {
            .label {
              font-size: 12px;
              color: rgba(255, 255, 255, 1);
            }

            .input_total {
              font-size: 16px;
              color: rgba(255, 255, 255, 1);
            }

            .input_online {
              font-size: 16px;
              color: #95d475;
            }

            .input_powerDown {
              font-size: 16px;
              color: #eebe77;
            }

            .input_outline {
              font-size: 16px;
              color: #f56c6c;
            }

            .household_hotMeter {
              font-size: 16px;
              color: rgba(255, 255, 255, 1);
            }

            .household_WaterMeter {
              font-size: 16px;
              color: rgba(255, 255, 255, 1);
            }
          }
        }

        .line {
          position: absolute;
          height: 94px;
          top: 0px;
          right: 0px;
        }
      }
      .content_box:hover {
        // transform: scale(1.1);
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      }

      // .content_box1 {
      //   background-image: linear-gradient(to right bottom, #48c6ef, #6f86d6);
      // }
    }
  }

  .costs_quickAccess {
    width: 100%;
    height: 290px;
    position: relative;

    .content {
      width: 97%;
      height: 270px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -49%;
      margin-top: -130px;
      .chart_content {
        width: 100%;
        height: 100%;
        display: flex;
        .driveCostChart {
          display: inline-block;
          height: 200px;
          flex: 1;
        }
        .driveIncomeCategory {
          display: inline-block;
          flex: 1;
          height: 200px;
          // background-color: pink;
        }
      }
      .calendar {
        width: 100%;
        height: 200px;
      }
    }
  }

  .payment_testing {
    width: 100%;
    height: 280px;
    position: relative;

    .content {
      width: 97%;
      height: 160px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -49%;
      margin-top: -150px;
      // background-color: #fff;
      .content_box {
        width: 100%;
        height: 200px;
        // background-color: pink;
        .content_item {
          width: 130px;
          height: 100px;
          position: relative;
          display: inline-block;
          .backColor {
            width: 44px;
            height: 44px;
            position: absolute;
            top: 20px;
            left: 42px;
            border-radius: 10px;
            background: #48c6ef;
            background: -moz-linear-gradient(to left, #48c6ef 0%, #6f86d6 100%);
            background: -webkit-linear-gradient(
              to left,
              #48c6ef 0%,
              #6f86d6 100%
            );
            background: linear-gradient(to left, #48c6ef 0%, #6f86d6 100%);
          }
          .backColor:hover {
            // transform: scale(1.1);
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
          }
          .icon {
            position: absolute;
            top: 7px;
            left: 7px;
            width: 30px;
            height: 30px;
          }
          .title {
            text-align: center;
            margin-top: 70px;
            font-size: 13px;
          }
        }
      }
      .alarm_table {
        width: 100%;
        height: 200px;
        // background-color: pink;
      }
    }
  }
}

.el-row {
  margin-bottom: 0px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
</style>
