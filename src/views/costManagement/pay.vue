<template>
  <div class="pay">
    <div class="pay_table">
      <el-row :gutter="12">
        <el-col :span="leftItemWidth">
          <el-card class="box-card_top">
            <div class="top_info">
              <el-row :gutter="20">
                <el-col :span="1">
                  <img
                    src="~@/assets/pay/icon_位置.png"
                    width="20"
                    style="display: inline-block"
                  />
                </el-col>
                <el-col
                  :span="7"
                  style="
                    width: 30px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                >
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="roomInfo.fullRegion"
                    placement="top"
                    ><span>{{ roomInfo.fullRegion }}</span></el-tooltip
                  ></el-col
                >
                <el-col :span="1">
                  <img
                    src="~@/assets/pay/icon_用户.png"
                    width="20"
                    style="display: inline-block"
                  />
                </el-col>
                <el-col :span="4">{{ roomInfo.householder }}</el-col>
                <el-col :span="1">
                  <img
                    src="~@/assets/pay/icon_电话.png"
                    width="20"
                    style="display: inline-block"
                  />
                </el-col>
                <el-col :span="4">{{ roomInfo.phone }}</el-col>
                <el-col :span="1">
                  <img
                    src="~@/assets/pay/icon_表号.png"
                    width="20"
                    style="display: inline-block"
                  />
                </el-col>
                <el-col :span="4">{{ roomInfo.meterId }}</el-col>
              </el-row>
            </div>
          </el-card>
          <div class="content">
            <el-row :gutter="14">
              <el-col :span="15">
                <el-card>
                  <el-divider direction="vertical" style="margin-left: 0px" />
                  <span>水费账单</span>
                  <div class="water_table" v-if="isShowMoney">
                    <vxe-table
                      class="mytable-scrollbar"
                      resizable
                      show-header-overflow
                      show-overflow
                      :row-config="{ isHover: true }"
                      :data="tableData"
                      :column-config="{ resizable: true }"
                      size="small"
                      height="auto"
                    >
                      <vxe-column
                        field="collectroId"
                        title="表号"
                        width="110"
                        fixed="left"
                        sortable
                      />
                      <vxe-column
                        field="name"
                        title="本月用量"
                        width="100"
                        sortable
                      />
                      <vxe-column
                        field="name"
                        title="上月用量"
                        width="100"
                        sortable
                      />
                      <vxe-column
                        field="name"
                        title="倍率"
                        width="100"
                        sortable
                      />
                      <vxe-column
                        field="name"
                        title="本月金额"
                        width="100"
                        sortable
                      />
                      <vxe-column
                        field="name"
                        title="通讯状态"
                        width="100"
                        sortable
                      />
                      <vxe-column
                        field="name"
                        title="最后通讯时间"
                        width="100"
                        sortable
                      />
                    </vxe-table>
                  </div>
                  <div class="water_table" v-else>
                    <el-empty description="该房间未关联表号" />
                  </div>
                </el-card>
              </el-col>
              <el-col :span="9">
                <el-card>
                  <el-divider direction="vertical" />
                  <span>充值缴费</span>
                  <div class="recharge" v-if="isShowMoney">
                    <el-form
                      :label-position="labelPosition"
                      label-width="130px"
                      :model="formLabelAlign"
                      :rules="rules"
                      ref="ruleFormRef"
                      style="max-width: 460px"
                    >
                      <el-form-item label="账户余额：">
                        <!-- <el-input v-model="formLabelAlign.name" /> -->
                        <h3 style="font-size: 18px; color: #1f87ff">
                          {{ count }}
                        </h3>
                        &nbsp;<span style="font-size: 14px">元</span>
                      </el-form-item>
                      <el-form-item
                        label="请输入金额："
                        prop="money"
                        class="custom-label"
                      >
                        <el-input
                          v-model="formLabelAlign.money"
                          @input="changeMoney"
                        />
                      </el-form-item>
                      <el-form-item label="大写：" class="custom-label">
                        <el-input
                          style="font-size: 14px"
                          v-model="formLabelAlign.rmb"
                          readonly
                          disabled
                        />
                      </el-form-item>
                      <el-form-item label="缴费类型：" class="custom-label">
                        <el-radio-group v-model="formLabelAlign.type">
                          <el-radio :label="1">预存</el-radio>
                          <el-radio :label="2">退费</el-radio>
                          <!-- <el-radio :label="9">补助</el-radio> -->
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="备注：" class="custom-label">
                        <el-input
                          v-model="formLabelAlign.notes"
                          :rows="2"
                          type="textarea"
                        />
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit(ruleFormRef)"
                          >确认</el-button
                        >
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="recharge" style="margin-bottom: 24px" v-else>
                    <el-empty description="该房间未关联表号" />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <!-- 充值提示框 -->
          <el-dialog
            v-model="dialogVisible"
            title="缴费确认"
            width="400"
            :before-close="handleClose"
          >
            <!-- <template> -->
            <el-descriptions :column="1" border>
              <el-descriptions-item label="表号" width="40">{{
                roomInfo.meterId
              }}</el-descriptions-item>
              <el-descriptions-item label="户主">{{
                roomInfo.householder
              }}</el-descriptions-item>
              <el-descriptions-item label="金额（元）">{{
                formLabelAlign.money
              }}</el-descriptions-item>
              <el-descriptions-item label="金额大写">{{
                formLabelAlign.rmb
              }}</el-descriptions-item>
              <el-descriptions-item label="缴费类型">{{
                formLabelAlign.type
              }}</el-descriptions-item>
              <el-descriptions-item label="缴费方式">现金</el-descriptions-item>
              <el-descriptions-item label="备注">{{
                formLabelAlign.notes
              }}</el-descriptions-item>
            </el-descriptions>
            <!-- </template> -->
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="cashRecharge">
                  确认
                </el-button>
              </div>
            </template>
          </el-dialog>
          <div class="bottom">
            <el-card>
              <el-divider direction="vertical" />
              <span>缴费记录</span>
              <div class="pay_table" v-if="isShowMoney">
                <vxe-table
                  class="mytable-scrollbar"
                  show-header-overflow
                  show-overflow
                  :row-config="{ isHover: true }"
                  :data="rechargeTableData"
                  :column-config="{ resizable: true }"
                  size="small"
                  height="auto"
                >
                  <vxe-column field="id" title="序号" width="90" sortable />
                  <vxe-column
                    field="payTime"
                    title="缴费时间"
                    width="140"
                    sortable
                  />
                  <vxe-column
                    field="paymentType"
                    title="缴费类型"
                    width="100"
                  />
                  <vxe-column field="paytype" title="缴费来源" width="140" />
                  <vxe-column
                    field="money"
                    title="缴费金额（元）"
                    width="140"
                    sortable
                  />
                  <!-- <vxe-column
                    field="collectroId"
                    title="余额（元）"
                    width="140"
                    sortable
                  /> -->
                  <vxe-column field="user" title="操作人" width="140" />
                  <vxe-column field="state" title="是否成功" width="140" />
                  <vxe-column
                    title="操作"
                    width="110"
                    fixed="right"
                    align="center"
                  >
                    <template #default>
                      <vxe-button type="text" status="primary"
                        >票据打印</vxe-button
                      >
                    </template>
                  </vxe-column>
                </vxe-table>
              </div>
              <div class="pay_table" v-else>
                <el-empty description="该房间未关联表号" />
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="regionWidth">
          <!-- 右侧区域信息 -->
          <el-card class="box-card">
            <div class="title">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="收起"
                placement="top"
              >
                <img
                  class="title_icon"
                  src="@/assets/region_select.png"
                  style="width: 26px; display: inline-block"
                  @click="changeRegionList('close')"
                  v-if="!isShowTop"
                />
              </el-tooltip>
              <span class="main_title">区域信息</span>
            </div>
            <el-divider />
            <div class="tree_content">
              <el-scrollbar>
                <div class="tree">
                  <el-tree
                    v-model="selectedRegion"
                    :props="regionProps"
                    :data="addCollectorList"
                    :load="loadFireNode"
                    lazy
                    node-key="id"
                    highlight-current
                    :render-after-expand="false"
                    @node-click="handleCheckChange"
                    ref="treeNode"
                  />
                </div>
              </el-scrollbar>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { allregion } from "@/api/allregion.js";
import { ElMessage } from "element-plus";
import {
  getpayInfo,
  getTotalRecharge,
  getBill,
  warehousing,
  cashNumber
} from "@/api/pay.js";
const leftItemWidth = ref(20); // 内容显示区
const regionWidth = ref(4); // 区域信息列表宽度

const tableData = ref([{ collectroId: "" }]);

const rechargeTableData = ref([]); // 缴费记录表格信息

const labelPosition = ref("right");
const formLabelAlign = reactive({
  money: "",
  region: "",
  type: 1, // 1:预存；2：退费
  rmb: "",
  notes: ""
});
const rules = reactive({
  money: [
    {
      required: true,
      message: "请输入金额",
      trigger: "change"
    }
  ]
});

// const radio = ref(3);

// 当前所选择的区域
const selectedRegion = ref("");
// 房间级树形选择
const regionProps = {
  label: node => {
    return `${node.name}  -  ${node.type}`;
  },
  children: "child",
  // isLeaf: true
  isLeaf: data => {
    if (data.hasChild) {
      return false;
    } else {
      return true;
    }
  }
};
const addCollectorList = ref([]); // 树数据
// 树结构加载
const loadFireNode = (node, resolve) => {
  if (node.level === 0) {
    // 展示一级供热公司
    const data = {
      parentId: ""
    };
    allregion(data).then(res => {
      const newcompanyArr = [];
      // if (res.retcode == 200) {
      //   batchSameList.value = res.data.data;
      // }
      res.data.data.forEach(item => {
        newcompanyArr.push({
          name: item.name,
          id: item._id,
          hasChild: item.hasChild,
          type: item.type
        });
      });
      // nextTick(() => {
      //   treeNode.value.setCurrentKey(newcompanyArr[0].id);
      // });
      return resolve(newcompanyArr);
    });
  }
  if (node.level === 1) {
    // console.log(node, "node信息");
    // nowSelectRegion.value = node.data.name;
    // 展示二级区域名称
    const data = {
      parentId: node.data.id
    };
    allregion(data).then(res => {
      if (res.retcode == 200) {
        const newvillageArr = [];
        res.data.data.forEach(item => {
          newvillageArr.push({
            name: item.name,
            id: item._id,
            hasChild: item.hasChild,
            type: item.type
          });
        });
        return resolve(newvillageArr);
      }
    });
  }
  if (node.level === 2) {
    const data = {
      parentId: node.data.id
    };
    allregion(data).then(res => {
      if (res.retcode == 200) {
        const b = [];
        res.data.data.forEach(item => {
          b.push({
            name: item.name,
            id: item._id,
            hasChild: item.hasChild,
            type: item.type
          });
        });
        return resolve(b);
      }
    });
  }
  if (node.level === 3) {
    console.log(node, "node信息");
    console.log("点击第三级");
    // nowSelectRegion.value += "-" + node.data.name;
    // console.log(nowSelectRegion.value);
    // 展示二级区域名称
    const data = {
      parentId: node.data.id
    };
    allregion(data).then(res => {
      if (res.retcode == 200 && node.data.type == "楼栋") {
        const c = [];
        res.data.data.forEach(item => {
          c.push({
            name: item.unit + "单元" + item.name,
            id: item._id,
            hasChild: item.hasChild,
            type: item.type
          });
        });
        return resolve(c);
      } else {
        const c = [];
        res.data.data.forEach(item => {
          c.push({
            name: item.name,
            id: item._id,
            hasChild: item.hasChild,
            type: item.type
          });
        });
        return resolve(c);
      }
    });
  }
  if (node.level === 4) {
    // console.log(node, "node信息");
    // nowSelectRegion.value += "-" + node.data.name;
    // console.log(nowSelectRegion.value);
    // 展示二级区域名称
    const data = {
      parentId: node.data.id
    };
    allregion(data).then(res => {
      if (res.retcode == 200) {
        const newvillageArr = [];
        res.data.data.forEach(item => {
          newvillageArr.push({
            name: item.name,
            id: item._id,
            hasChild: item.hasChild,
            type: item.type
          });
        });
        return resolve(newvillageArr);
      }
    });
  }
};

const isShowMoney = ref(false);
const roomInfo = reactive({
  fullRegion: "",
  householder: "",
  phone: "",
  meterId: ""
});

const count = ref("0.00");
const roomId = ref("");
// 点击右侧房间号
const handleCheckChange = async node => {
  // console.log(node, "node");
  if (node.type == "房间") {
    // console.log("左侧信息更新");
    roomId.value = node.id;
    const data = {
      id: node.id
    };
    // 获取房间信息
    const res = await getpayInfo(data);
    if (res.retcode == 200) {
      roomInfo.fullRegion = res.data.fullRegion;
      roomInfo.householder = res.data.householder;
      roomInfo.phone = res.data.phone;
      // console.log(roomInfo.value, "roomInfo.value ");
    }
    // 获取充值金额
    const totalRecharge = await getTotalRecharge(data);
    if (totalRecharge.retcode == 200) {
      isShowMoney.value = true;
      roomInfo.meterId = totalRecharge.data.meterId;
      tableData.value[0].collectroId = totalRecharge.data.meterId;
      if (totalRecharge.data.CNYtotal) {
        count.value = totalRecharge.data.CNYtotal.toString();
      } else {
        count.value = 0;
      }
    } else {
      isShowMoney.value = false;
      roomInfo.meterId = "未关联";
      // 没有关联表号，置灰
    }
    // 获取充值记录,入参为表号
    const data2 = {
      meterId: totalRecharge.data.meterId
    };
    const resRecharge = await getBill(data2);
    if (resRecharge.retcode == 200) {
      rechargeTableData.value = resRecharge.data;
    }
  } else {
    // console.log("无法获取信息");
    ElMessage.error("请选择房间号！");
  }
};

// 将数字转换为大写
const changeMoney = value => {
  console.log(value, "value");
  formLabelAlign.rmb = numberToChineseWords(value);
  // console.log(a);
};

const numberToChineseWords = number => {
  const rmbUnits = ["", "拾", "佰", "仟", "万", "亿"];
  const rmbNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  let words = "";
  const numArray = number.toString().split("").map(Number);
  let unitIndex = numArray.length - 1;
  for (let i = 0; i < numArray.length; i++) {
    const num = numArray[i];
    if (num !== 0) {
      words += rmbNums[num] + rmbUnits[unitIndex];
    } else {
      if (unitIndex === 4 || unitIndex === 8) {
        words += rmbUnits[unitIndex];
      } else {
        if (words[words.length - 1] !== "零") {
          words += rmbNums[num];
        }
      }
    }
    unitIndex--;
  }
  words += "元整";
  return words;
};

const ruleFormRef = ref(); // 表单dom
const onSubmit = async formEl => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // console.log("submit!");
      console.log("打开充值提示框");
      dialogVisible.value = true;
    } else {
      // console.log("error submit!", fields);
      // const open4 = () => {
      ElMessage.error("请将表格填写完整！");
      // };
    }
  });
};

const dialogVisible = ref(false);
const handleClose = done => {
  done();
};

// 确认现金支付
const cashRecharge = async () => {
  const data = {
    meterId: roomInfo.meterId,
    money: formLabelAlign.money
  };
  const res = await cashNumber(data);
  if (res.retcode == 200) {
    const data2 = {
      orderNumber: res.orderNumber,
      paymentType: "水费",
      meterId: roomInfo.meterId,
      paytype: "现金支付",
      money: formLabelAlign.money
    };
    const res2 = await warehousing(data2);
    console.log(res2, "res2");
    if (res2.retcode == 200) {
      ElMessage({
        message: "缴费成功",
        type: "success"
      });
      dialogVisible.value = false;
      formLabelAlign.money = "";
      formLabelAlign.notes = "";
      getInfo();
    } else {
      ElMessage({
        message: "缴费失败",
        type: "error"
      });
      dialogVisible.value = false;
      getInfo();
    }
  }
};

const getInfo = async () => {
  const data = {
    id: roomId.value
  };
  const totalRecharge = await getTotalRecharge(data);
  if (totalRecharge.retcode == 200) {
    isShowMoney.value = true;
    roomInfo.meterId = totalRecharge.data.meterId;
    tableData.value[0].collectroId = totalRecharge.data.meterId;
    if (totalRecharge.data.CNYtotal) {
      count.value = totalRecharge.data.CNYtotal.toString();
    } else {
      count.value = 0;
    }
  } else {
    isShowMoney.value = false;
    roomInfo.meterId = "未关联";
    // 没有关联表号，置灰
  }
  // 获取充值记录,入参为表号
  const data2 = {
    meterId: totalRecharge.data.meterId
  };
  const resRecharge = await getBill(data2);
  if (resRecharge.retcode == 200) {
    rechargeTableData.value = resRecharge.data;
  }
};
</script>

<style lang="scss" scoped>
.pay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .pay_table {
    width: 98%;
    margin-top: 16px;
    .box-card_top {
      height: 54px;
      .top_info {
        width: 100%;
        height: 20px;
        font-size: 14px;
      }
    }
    .content {
      margin-top: 10px;
      width: 100%;
      .water_table {
        height: 320px;
        width: 100%;
        margin-top: 10px;
        // background-color: pink;
      }
      .recharge {
        margin-top: 10px;
        width: 86%;
      }
    }
    .bottom {
      margin-top: 10px;
      width: 100%;
      height: 300px;
      .pay_table {
        width: 100%;
        height: 200px;
      }
    }
  }
}

.el-divider--horizontal {
  margin: 12px 0;
}
.box-card_top {
  ::v-deep .el-card__body {
    padding: 16px !important;
  }
}

::v-deep .custom-label .el-form-item__label {
  font-weight: normal; /* 取消加粗样式 */
}

.box-card {
  height: 97.5%;
  .title {
    height: 24px;
    position: relative;

    .title_icon {
      position: absolute;
      left: 0px;
      top: 8px;
    }

    .main_title {
      position: absolute;
      left: 26px;
      top: 8px;
    }

    .box-item {
      position: absolute;
      top: 10px;
    }
  }
  .tree_content {
    width: calc(100% - 0px);
    height: calc(100vh - 200px);
    box-sizing: border-box;

    // overflow-x: scroll;
    .tree {
      width: 240px;
    }
  }
}
</style>
