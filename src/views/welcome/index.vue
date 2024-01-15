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
              <div class="content_box" :style="[item.backStyle, item.width]">
                <img class="icon" :src="item.icon" alt="" />
                <span class="title">{{ item.name }}</span>
                <div v-if="item.showItem == 4" class="count">
                  <el-row>
                    <el-col :span="12"
                      ><p>
                        <span class="label">总数量：</span
                        ><span class="input_total">{{ item.total }}</span>
                      </p></el-col
                    >
                    <el-col :span="12"
                      ><p>
                        <span class="label">故障数：</span
                        ><span class="input_fault">{{ item.fault }}</span>
                      </p></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="12"
                      ><p>
                        <span class="label">抄读成功：</span>
                        <span class="input_success">{{
                          item.readoutSuccess
                        }}</span>
                      </p></el-col
                    >
                    <el-col :span="12"
                      ><p>
                        <span class="label">抄读失败：</span
                        ><span class="input_error">{{ item.readoutFail }}</span>
                      </p></el-col
                    >
                  </el-row>
                </div>
                <div v-else class="count">
                  <div v-if="item.type == 'meter'">
                    <el-row>
                      <el-col :span="8"
                        ><p>
                          <span class="label">总数量：</span
                          ><span class="input_total">12</span>
                        </p></el-col
                      >
                      <el-col :span="8"
                        ><p>
                          <span class="label">故障数：</span
                          ><span class="input_fault">12</span>
                        </p></el-col
                      >
                      <el-col :span="8"
                        ><p>
                          <span class="label">抄读成功：</span
                          ><span class="input_success">12</span>
                        </p></el-col
                      >
                    </el-row>
                    <el-row>
                      <el-col :span="8"
                        ><p>
                          <span class="label">关阀数：</span
                          ><span class="input_total">12</span>
                        </p></el-col
                      >
                      <el-col :span="8"
                        ><p>
                          <span class="label">抄读失败：</span
                          ><span class="input_error">12</span>
                        </p></el-col
                      >
                    </el-row>
                  </div>
                  <div v-else>
                    <el-row>
                      <el-col :span="8"
                        ><p>
                          <span class="label">总数量：</span
                          ><span class="input_total">12</span>
                        </p></el-col
                      >
                      <el-col :span="8"
                        ><p>
                          <span class="label">水表：</span
                          ><span class="input_fault">12</span>
                        </p></el-col
                      >
                      <el-col :span="8"
                        ><p>
                          <span class="label">热表：</span
                          ><span class="input_success">12</span>
                        </p></el-col
                      >
                    </el-row>
                    <el-row>
                      <el-col :span="8"
                        ><p>
                          <span class="label">燃气表：</span
                          ><span class="input_total">12</span>
                        </p></el-col
                      >
                      <el-col :span="8"
                        ><p>
                          <span class="label">电表：</span
                          ><span class="input_error">12</span>
                        </p></el-col
                      >
                    </el-row>
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
                <el-divider direction="vertical" />及时缴费监测
              </p>
              <div class="alarm_table">
                <el-scrollbar height="200px">
                  <el-table
                    :data="tableData"
                    height="200"
                    stripe
                    style="width: 100%"
                    :row-style="{ height: '0' }"
                    :cell-style="{ padding: '4px' }"
                  >
                    <el-table-column
                      prop="roomName"
                      label="房间号"
                      width="100"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="meterType"
                      label="表类型"
                      width="100"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="meterId"
                      label="表号"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="chargingMode"
                      label="扣费模式"
                      width="100"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="warning"
                      label="预警余额值"
                      width="100"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="isPay"
                      label="是否缴费"
                      width="100"
                      show-overflow-tooltip
                    >
                      <template #default="scope">
                        <el-tag v-if="scope.row.isPay" type="success">
                          是</el-tag
                        >
                        <el-tag v-else type="danger"> 否</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="date"
                      label="预警时间"
                      width="100"
                      show-overflow-tooltip
                    />
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
    fault: 0, // 故障数
    readoutSuccess: 4, // 抄读成功
    readoutFail: 12, // 抄读失败
    icon: `/src/assets/welcome/collector_white.png`,
    showItem: 4,
    type: "meter",
    width: "width:230px;",
    backStyle:
      "background-image: linear-gradient(to right bottom,  #6f86d6,#48c6ef);"
  },
  {
    name: "4G模块(个)",
    total: 0,
    fault: 0,
    readoutSuccess: 0,
    readoutFail: 0,
    icon: `/src/assets/welcome/4G_white.png`,
    showItem: 4,
    width: "width:230px;",
    type: "meter",
    backStyle:
      "background-image: linear-gradient(to right bottom,  #ef9ea9,  #fedee2 );"
  },
  {
    name: "NB热表(个)",
    total: 2,
    fault: 0, // 抄表成功
    readoutSuccess: 0, // 故障数
    readoutFail: 2, // 抄表失败
    icon: `/src/assets/welcome/hotmeter_white.png`,
    showItem: 5,
    type: "meter",
    width: "width:322px;",
    backStyle:
      "background-image: linear-gradient(to right bottom, #7690c1 ,   #c2daee );"
  },
  {
    name: "NB水表(个)",
    total: 2,
    fault: 0,
    readoutSuccess: 0,
    readoutFail: 2,
    icon: `/src/assets/welcome/watermeter_white.png`,
    showItem: 5,
    type: "meter",
    width: "width:322px;",
    backStyle:
      "background-image: linear-gradient(to right bottom,   #b3afaa,#f3f0e9);"
  },
  {
    name: "普通热表(个)",
    total: 2,
    fault: 0,
    readoutSuccess: 0,
    readoutFail: 2,
    icon: `/src/assets/welcome/hotmeter_white.png`,
    showItem: 5,
    type: "meter",
    width: "width:322px;",
    backStyle:
      "background-image: linear-gradient(to right bottom,  #6f86d6,#48c6ef);"
  },
  {
    name: "普通水表(个)",
    total: 2,
    fault: 0,
    readoutSuccess: 0,
    readoutFail: 2,
    icon: `/src/assets/welcome/watermeter_white.png`,
    showItem: 5,
    type: "meter",
    width: "width:322px;",
    backStyle:
      "background-image: linear-gradient(to right bottom,  #ef9ea9,  #fedee2 );"
  },
  {
    name: "管理住户数量",
    total: 2,
    waterMeter: 18, // 水表
    hotMeter: 0, // 热表
    icon: `/src/assets/welcome/household_white.png`,
    showItem: 5,
    type: "region",
    width: "width:322px;",
    backStyle:
      "background-image: linear-gradient(to right bottom,  #c1dfc4,  #deecdd );"
  },
  {
    name: "管理楼栋数量",
    total: 2,
    waterMeter: 18, // 水表
    hotMeter: 0, // 热表
    icon: `/src/assets/welcome/build_white.png`,
    showItem: 5,
    type: "region",
    width: "width:322px;",
    backStyle:
      "background-image: linear-gradient(to right bottom,   #a18cd1, #fbc2eb );"
  },
  {
    name: "管理小区数量",
    total: 2,
    fault: 0,
    readoutSuccess: 0,
    readoutFail: 2,
    icon: `/src/assets/welcome/village_white.png`,
    showItem: 5,
    type: "region",
    width: "width:322px;",
    backStyle:
      "background-image: linear-gradient(to right bottom,  #6f86d6,#48c6ef);"
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
    roomName: "测试区域->测试小区->测试楼栋->101",
    meterType: "预付费水表",
    meterId: "12345678900(水表)",
    chargingMode: "预付费",
    warning: "0",
    isPay: true,
    date: "2023-12-22"
  },
  {
    roomName: "测试区域->测试小区->测试楼栋->201",
    meterType: "普通水表",
    meterId: "12345678901(水表)",
    chargingMode: "后付费",
    warning: "-100",
    isPay: false,
    date: "2023-12-22"
  },
  {
    roomName: "测试区域->测试小区->测试楼栋->301",
    meterType: "预付费水表",
    meterId: "12345678902(水表)",
    chargingMode: "预付费",
    warning: "0",
    isPay: true,
    date: "2023-12-22"
  },
  {
    roomName: "测试区域->测试小区->测试楼栋->401",
    meterType: "远传水表",
    meterId: "12345678903(水表)",
    chargingMode: "后付费",
    warning: "-100",
    isPay: false,
    date: "2023-12-22"
  },
  {
    roomName: "测试区域->测试小区->测试楼栋->501",
    meterType: "预付费水表",
    meterId: "12345678904(水表)",
    chargingMode: "预付费",
    warning: "0",
    isPay: true,
    date: "2023-12-22"
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
// const incomeData = ref([
//   { value: 1628, name: "水表" },
//   { value: 1219, name: "热表" }
// ]);
const data = [
  {
    name: "水表",
    value: 40,
    children: [
      {
        name: "退费",
        value: 10
      },
      {
        name: "预存",
        value: 30
      }
    ]
  },
  {
    name: "热表",
    value: 50,
    children: [
      {
        name: "退费",
        value: 10
      },
      {
        name: "预存",
        value: 40
      }
    ]
  }
];
// 绘制近30天收费类别占比
const driveIncomeCategory = () => {
  const myChart = echarts.init(document.getElementById("driveIncomeCategory"));
  const option = {
    title: {
      // 设置饼图标题，位置设为顶部居中
      text: `缴费类型`,
      orient: "vertical",
      top: "10px",
      left: "10px"
    },
    tooltip: {
      trigger: "item",
      valueFormatter: function (value) {
        return "￥" + value;
      }
    },
    grid: {
      left: "10%",
      right: "4%",
      top: "2%",
      containLabel: false
    },
    series: {
      type: "sunburst",
      data: data,
      radius: [40, "90%"],
      center: ["60%", "50%"],
      itemStyle: {
        borderRadius: 7,
        borderWidth: 1
      },
      label: {
        show: true,
        rotate: "radial"
      }
    }
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
        // width: 277px;
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
          width: 95%;
          height: 70px;
          position: absolute;
          top: 30px;
          // background-color: pink;
          padding: 6px;
          p {
            line-height: 30px;
            .label {
              font-size: 12px;
              color: rgba(255, 255, 255, 1);
            }
            .input_total {
              font-size: 16px;
              color: rgba(255, 255, 255, 1);
            }
            .input_fault {
              font-size: 16px;
              color: #eebe77;
            }
            .input_success {
              font-size: 16px;
              color: #95d475;
            }
            .input_error {
              font-size: 16px;
              color: #f56c6c;
            }
          }

          //   .count_item {
          //     .label {
          //       font-size: 12px;
          //       color: rgba(255, 255, 255, 1);
          //     }

          //     .input_total {
          //       font-size: 16px;
          //       color: rgba(255, 255, 255, 1);
          //     }

          //     .input_ fault {
          //       font-size: 16px;
          //       color: #95d475;
          //     }

          //     .input_readoutSuccess {
          //       font-size: 16px;
          //       color: #eebe77;
          //     }

          //     .input_readoutFail {
          //       font-size: 16px;
          //       color: #f56c6c;
          //     }

          //     .household_hotMeter {
          //       font-size: 16px;
          //       color: rgba(255, 255, 255, 1);
          //     }

          //     .household_WaterMeter {
          //       font-size: 16px;
          //       color: rgba(255, 255, 255, 1);
          //     }
          //   }
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
