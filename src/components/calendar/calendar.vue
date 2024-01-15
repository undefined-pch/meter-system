<template>
  <div class="calendar">
    <el-calendar v-model="value">
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''" style="z-index: 999">
          {{ data.day.split("-").slice(2).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
        <div v-for="item in calendar" :key="item.id">
          <!--遍历calendar数组-->
          <!--el-tooltip文字提示，item.title 获取标题-->
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="item.title"
            placement="top-start"
          >
            <!--format时间格式化工具类，具体代码看文章末尾-->
            <div class="all">
              <!-- <span
                class="alarm"
                v-if="item.endTime === data.day && item.type == 'tip'"
                @click="openPayList(data.day)"
                >🔵</span
              > -->
              <!--获取事件开始的时间-->
              <span
                class="alarm"
                v-if="item.endTime === data.day && item.type == 'warning'"
                @click="openAlarmList(data.day)"
                >🔴</span
              >
            </div>

            <!--获取时间结束的时间-->
          </el-tooltip>
        </div>
      </template>
    </el-calendar>
    <el-dialog v-model="alarmListTableVisible" :title="alarmListDate">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="margin-top: -30px; height: 40px"
      >
        <el-menu-item index="1">欠费告警</el-menu-item>
        <el-menu-item index="2">其他告警</el-menu-item>
      </el-menu>
      <template v-if="showAlarm">
        <el-button type="primary" style="margin-top: 10px; float: right"
          >批量催缴</el-button
        >
        <el-table :data="gridData">
          <el-table-column type="selection" width="55" />
          <el-table-column property="meterId" label="表号" width="160" />
          <el-table-column
            property="message"
            label="告警信息"
            show-overflow-tooltip
            width="170"
          />
          <el-table-column property="ChargingType" label="扣费类型" width="80">
            <template #default="{ row }">
              <el-tag>{{ row.ChargingType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            property="address"
            label="地址"
            show-overflow-tooltip
          />
          <el-table-column label="操作" width="80">
            <template #default="{ row }">
              <el-button
                v-if="row.message == '达到欠费预警金额'"
                link
                type="primary"
                size="small"
                @click="paySuccess()"
              >
                催缴
              </el-button>
              <span v-else />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table :data="otherGridData">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column property="meterId" label="表号" width="160" />
          <el-table-column
            property="message"
            label="告警信息"
            show-overflow-tooltip
            width="170"
          />
          <el-table-column property="alarmLevel" label="告警等级" width="80">
            <template #default="{ row }">
              <el-tag type="danger" v-if="row.alarmLevel == 1">高</el-tag>
              <el-tag type="warning" v-else-if="row.alarmLevel == 2">中</el-tag>
              <el-tag type="info" v-else-if="row.alarmLevel == 3">底</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            property="address"
            label="地址"
            show-overflow-tooltip
          />
        </el-table>
      </template>
    </el-dialog>
    <!-- <el-dialog v-model="payListTableVisible" :title="alarmListDate" width="66%">
      <el-button type="primary" style="margin-top: -30px; float: right"
        >批量提前通知</el-button
      >
      <el-table :data="payListData">
        <el-table-column type="selection" width="55" />
        <el-table-column property="meterId" label="表号" width="150" />
        <el-table-column property="householder" label="户主" width="100" />
        <el-table-column property="phone" label="联系方式" width="130" />
        <el-table-column property="executeCycle" label="执行周期" width="100" />
        <el-table-column
          property="executeMoney"
          label="执行金额"
          :formatter="Formatter"
          width="100"
        />
        <el-table-column
          property="address"
          label="地址"
          show-overflow-tooltip
        />
        <el-table-column property="retention" label="备注" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.waterRetention == true">保水</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default>
            <el-button link type="primary" size="small" @click="payNotice()">
              提前通知
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
// import { format } from "@/utils/formatDate"; /*引入的自定义时间格式化工具类*/
const value = ref(new Date());
const calendar = ref([
  {
    id: 1,
    endTime: "2024-01-01",
    title: "告警数:5",
    type: "warning"
  },
  {
    id: 2,
    endTime: "2024-01-22",
    title: "待缴费水费用户:13",
    type: "tip"
  }
]);

const alarmListDate = ref(""); // 警告标题
// 打开具体日期警告列表
const openAlarmList = day => {
  // console.log("时间", day);
  alarmListDate.value = day + "告警列表";
  alarmListTableVisible.value = true;
};

// 展示具体日期告警列表
const alarmListTableVisible = ref(false);
const otherGridData = ref([
  {
    meterId: "12345678922(水表)",
    message: "流量传感器故障或空管",
    alarmLevel: 1,
    address: "万利大厦-2单元-201"
  },
  {
    meterId: "12345678921(水表)",
    message: "达到欠费预警金额",
    alarmLevel: 1,
    address: "万利大厦-2单元-201"
  },
  {
    meterId: "12345678922(水表)",
    message: "抄表失败",
    alarmLevel: 2,
    address: "万利大厦-2单元-301"
  },
  {
    meterId: "12345678923(水表)",
    message: "强制关阀",
    alarmLevel: 2,
    address: "万利大厦-2单元-401"
  },
  {
    meterId: "12345678924(热表)",
    message: "电源欠压",
    alarmLevel: 3,
    address: "万利大厦-2单元-501"
  }
]);

// 欠费告警列表
const gridData = ref([
  {
    meterId: "12345678900(水表)",
    message: "达到欠费预警金额",
    // alarmLevel: 1,
    ChargingType: "预付费",
    address: "万利大厦-2单元-201"
  },
  {
    meterId: "12345678901(水表)",
    message: "达到欠费预警金额",
    // alarmLevel: 1,
    ChargingType: "预付费",
    address: "万利大厦-2单元-202"
  },
  {
    meterId: "12345678902(水表)",
    message: "达到欠费预警金额",
    // alarmLevel: 1,
    ChargingType: "后付费",
    address: "万利大厦-2单元-203"
  },
  {
    meterId: "12345678903(水表)",
    message: "达到欠费预警金额",
    // alarmLevel: 1,
    ChargingType: "后付费",
    address: "万利大厦-2单元-204"
  }
]);

// 打开催缴列表,(设置低于多少进行展示)
// const openPayList = day => {
//   alarmListDate.value = day + "定时缴费列表";
//   payListTableVisible.value = true;
// };
// const payListData = ref([
//   {
//     meterId: "12345678911(水表)",
//     householder: "张三",
//     phone: "13999999999",
//     executeCycle: "一次",
//     executeMoney: 100,
//     address: "西溪北苑-10号楼-1-101",
//     waterRetention: false
//   },
//   {
//     meterId: "12345678912(水表)",
//     householder: "李四",
//     phone: "13888888888",
//     executeCycle: "一个月",
//     executeMoney: 200,
//     address: "西溪北苑-2号楼-1-101",
//     waterRetention: true
//   },
//   {
//     meterId: "12345678912(水表)",
//     householder: "王五",
//     phone: "13777777777",
//     executeCycle: "一次",
//     executeMoney: 300,
//     address: "西溪北苑-2号楼-1-101",
//     waterRetention: false
//   }
// ]);

// const payListTableVisible = ref(false);
// 催缴
const paySuccess = () => {
  ElMessage({
    message: "催缴成功",
    type: "success"
  });
};
// 提前通知
// const payNotice = () => {
//   ElMessage({
//     message: "通知成功",
//     type: "success"
//   });
// };

// 格式化金额
// function Formatter(row) {
//   // console.log(row, column, "11");
//   return "￥" + row.executeMoney;
// }
// 禁用复选框
// function selectable(row) {
//   // row是遍历的每一条数据，index是下标
//   // 设置第一个为不可选中
//   if (row.message == "达到欠费预警金额") {
//     return true;
//   } else {
//     return false;
//   }
// }

const activeIndex = ref("1"); // 告警信息分类
const showAlarm = ref(true); // 展示告警类别
const handleSelect = key => {
  // console.log(key, keyPath);
  // console.log(activeIndex.value, "activeIndex");
  if (key == 1) {
    showAlarm.value = true;
  } else {
    showAlarm.value = false;
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-table .el-calendar-day {
  width: 60px;
  height: 40px;
}

::v-deep .el-calendar__title {
  font-size: 15px;
}

::v-deep .el-calendar-table {
  font-size: 14px;
}

::v-deep .el-calendar__body {
  padding: 0px 0px 0px;
}

::v-deep .el-calendar__header {
  padding: 2px 8px 4px 18px;
}

::v-deep .el-calendar-table thead th {
  padding: 4px 0;
  font-weight: 300;
  font-size: 12px;
}

::v-deep .el-calendar-table .el-calendar-day {
  height: 24px;
}

::v-deep .el-calendar-table .el-calendar-day {
  padding: 4px;
  font-size: 12px;
  width: 100%;
}

::v-deep .el-calendar-day {
  position: relative;
}

.all {
  width: 16px;
  position: absolute;
  top: 8px;
  left: 30px;
}

.alarm {
  position: absolute;
  top: -4px;
  left: 4px;
}
</style>
