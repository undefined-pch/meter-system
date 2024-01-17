<template>
  <div class="feescheme">
    <div class="feeschme_table">
      <el-card class="box-card">
        <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            style="height: 40px"
          >
            <el-menu-item index="1">水价</el-menu-item>
            <el-menu-item index="2">热价</el-menu-item>
          </el-menu>
        </div>
        <vxe-toolbar
          ref="toolbarRef"
          :refresh="{ queryMethod: searchMethod }"
          export
          print
          custom
        >
          <template #buttons>
            <!-- <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button> -->
            <el-button @click="addPrice" type="primary" plain>添加</el-button>
            <el-button type="danger" plain>批量删除</el-button>
          </template>
        </vxe-toolbar>
        <div style="height: calc(100vh - 290px)">
          <vxe-table
            :expand-config="demo3.expandConfig"
            :data="demo3.tableData"
            size="small"
            height="auto"
          >
            <vxe-column type="checkbox" width="60" />
            <vxe-column
              type="expand"
              title="水价名称"
              width="180"
              show-overflow
            >
              <template #default="{ row }">
                <span>{{ row.name }}</span>
              </template>
              <template #content="{ row }">
                <div v-if="Number(row.steps) > 0" class="expand-wrapper">
                  <!-- <vxe-table :data="demo3.tableData">
                  <vxe-column field="firstStep" title="阶梯1" />
                  <vxe-column field="secondStep" title="阶梯2" />
                  <vxe-column field="thirdStep" title="阶梯3" />
                  <vxe-column field="fourthStep" title="阶梯4" />
                  <vxe-column field="fifthStep" title="阶梯5" />
                </vxe-table> -->
                  <el-descriptions
                    title="阶梯详情"
                    :column="row.steps"
                    border
                    size="small"
                  >
                    <el-descriptions-item
                      label="阶梯一水量(m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 1"
                      >{{ row.firstStepStart }}-{{
                        row.firstStepEnd
                      }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯二水量(m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 2"
                      >{{ row.firstStepEnd }}-{{
                        row.secondStepEnd
                      }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯三水量(m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 3"
                      >{{ row.secondStepEnd }}-{{
                        row.thirdStepEnd
                      }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯四水量(m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 4"
                    >
                      {{ row.thirdStepEnd }}-{{ row.fourthStepEnd }}
                    </el-descriptions-item>
                    <el-descriptions-item
                      label="阶梯五水量(m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 5"
                      >{{ row.fourthStepEnd }}-{{
                        row.fifthStepEnd
                      }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯一单价(元/m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 1"
                      >{{ row.firstStepPrice }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯二单价(元/m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 2"
                      >{{ row.secondStepPrice }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯三单价(元/m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 3"
                      >{{ row.thirdStepPrice }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯四单价(元/m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 4"
                      >{{ row.fourthStepPrice }}</el-descriptions-item
                    >
                    <el-descriptions-item
                      label="阶梯五单价(元/m³)"
                      label-align="right"
                      align="center"
                      width="100px"
                      v-if="row.steps >= 5"
                      >{{ row.fifthStepPrice }}</el-descriptions-item
                    >
                  </el-descriptions>
                </div>
                <!-- <div v-else class="expand-wrapper">
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </div> -->
              </template>
            </vxe-column>
            <vxe-column
              field="isSteps"
              title="是否为阶梯水价"
              width="140"
              align="center"
              :filters="isSepOptions"
              :filter-multiple="false"
            >
              <template #default="{ row }">
                <el-tag v-if="row.isSteps" type="success">是</el-tag>
                <el-tag v-else type="info">否</el-tag>
              </template>
            </vxe-column>
            <vxe-column
              field="steps"
              title="阶梯数"
              width="80"
              align="center"
              sortable
            >
              <template #default="{ row }">
                <span v-if="row.isSteps"> {{ row.steps }}</span>
                <span v-else>- </span>
              </template>
            </vxe-column>
            <vxe-column
              field="unitPrice"
              title="单价(元/m³)"
              width="100"
              align="center"
            >
              <template #default="{ row }">
                <span v-if="row.unitPrice">{{ row.unitPrice }}</span>
                <span v-else>-</span>
              </template>
            </vxe-column>
            <vxe-column field="date" title="创建时间" width="180" />
            <vxe-column field="founder" title="创建人" width="100" />
            <vxe-column field="notes" title="备注" />
            <vxe-column title="操作" width="110" align="center">
              <template #default>
                <vxe-button type="text" status="primary">修改</vxe-button>
                <vxe-button type="text" status="danger">删除</vxe-button>
              </template>
            </vxe-column>
          </vxe-table>
        </div>

        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="->,total, sizes, prev, pager, next, jumper"
            :total="400"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
    <!-- 新增价格方案弹框 -->
    <el-dialog v-model="addFormVisible" title="新增水价" width="50%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item
          label="水价名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否为阶梯价" :label-width="formLabelWidth">
          <el-radio-group v-model="form.isSteps">
            <el-radio
              v-for="item in isStepsList"
              :key="item.id"
              :label="item.value"
              >{{ item.text }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="单价"
          :label-width="formLabelWidth"
          prop="unitPrice"
          v-if="!form.isSteps"
        >
          <el-input
            v-model="form.unitPrice"
            autocomplete="off"
            style="width: 194px"
            ><template #append>(元/m³)</template></el-input
          >
        </el-form-item>
        <el-form-item
          label="阶梯数"
          :label-width="formLabelWidth"
          prop="steps"
          v-else
        >
          <el-input
            class="steps_input"
            v-model="form.steps"
            autocomplete="off"
            style="width: 130px"
            ><template #suffix>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="请输入2-5之间的数字"
                placement="top"
                ><img
                  src="@/assets/feescheme/tip.png"
                  alt=""
                  style="width: 18px; margin-right: 4px"
              /></el-tooltip> </template></el-input
          ><el-button style="margin-left: 4px" @click="confirmSteps"
            >确认</el-button
          >
        </el-form-item>
        <el-row v-if="isShowFirstStep">
          <el-col :span="10">
            <el-form-item
              label="阶梯一"
              :label-width="formLabelWidth"
              prop="firstStepStart"
            >
              <el-input
                v-model="form.firstStepStart"
                autocomplete="off"
                disabled
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="1" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="6">
            <el-form-item :label-width="0" prop="firstStepEnd">
              <el-input v-model="form.firstStepEnd" autocomplete="off"
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="单价" :label-width="50" prop="firstStepPrice">
              <el-input v-model="form.firstStepPrice" autocomplete="off"
                ><template #append>(元/m³)</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isShowSecondStep">
          <el-col :span="10">
            <el-form-item
              label="阶梯二"
              :label-width="formLabelWidth"
              prop="secondStepStart"
            >
              <el-input v-model="form.firstStepEnd" autocomplete="off" disabled
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="1" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="6">
            <el-form-item :label-width="0" prop="secondStepEnd">
              <el-input
                v-model="form.secondStepEnd"
                autocomplete="off"
                :disabled="isTwoStep"
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="单价" :label-width="50" prop="secondStepPrice">
              <el-input v-model="form.secondStepPrice" autocomplete="off"
                ><template #append>(元/m³)</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isShowThirdStep">
          <el-col :span="10">
            <el-form-item
              label="阶梯三"
              :label-width="formLabelWidth"
              prop="thirdStepStart"
            >
              <el-input v-model="form.secondStepEnd" autocomplete="off" disabled
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="1" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="6">
            <el-form-item :label-width="0" prop="thirdStepEnd">
              <el-input
                v-model="form.thirdStepEnd"
                autocomplete="off"
                :disabled="isThreeStep"
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="单价" :label-width="50" prop="thirdStep">
              <el-input v-model="form.thirdStepPrice" autocomplete="off"
                ><template #append>(元/m³)</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isShowFourthStep">
          <el-col :span="10">
            <el-form-item
              label="阶梯四"
              :label-width="formLabelWidth"
              prop="fourthStepStart"
            >
              <el-input v-model="form.thirdStepEnd" autocomplete="off" disabled
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="1" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="6">
            <el-form-item :label-width="0" prop="fourthStepEnd">
              <el-input
                v-model="form.fourthStepEnd"
                autocomplete="off"
                :disabled="isFourStep"
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="单价" :label-width="50" prop="fourthStep">
              <el-input v-model="form.fourthStepPrice" autocomplete="off"
                ><template #append>(元/m³)</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isShowFifthStep">
          <el-col :span="10">
            <el-form-item
              label="阶梯五"
              :label-width="formLabelWidth"
              prop="fifthStepStart"
            >
              <el-input v-model="form.fourthStepEnd" autocomplete="off" disabled
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="1" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="6">
            <el-form-item :label-width="0" prop="thirdStepEnd">
              <el-input
                v-model="form.fifthStepEnd"
                autocomplete="off"
                :disabled="isFiveStep"
                ><template #append>m³</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item
              label="单价"
              :label-width="50"
              prop="fifthStep"
              v-if="isShowFifthStep"
            >
              <el-input v-model="form.fifthStepPrice" autocomplete="off"
                ><template #append>(元/m³)</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注" :label-width="formLabelWidth" prop="notes">
          <el-input v-model="form.notes" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { reactive } from "vue";
import { waterPrice, waterPriceAdd } from "@/api/price.js";
import { ElMessage } from "element-plus";
// import { VxeTablePropTypes } from 'vxe-table'
// 菜单选择
const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

const demo3 = reactive({
  expandConfig: {
    visibleMethod({ row }) {
      if (row.isSteps === false) {
        return false;
      }
      return true;
    }
  },
  tableData: []
});

const formLabelWidth = "110px"; // 表单文字宽度
// 新增表单
const form = reactive({
  name: "", // 水表名称
  isSteps: false, // 是否为阶梯水价
  steps: 0, // 阶梯数
  firstStepStart: "0", // 一级水量开始
  firstStepEnd: "", // 一级水量结束
  firstStepPrice: "", // 一级单价
  secondStepEnd: "", // 二级水量结束
  secondStepPrice: "", // 二级单价
  thirdStepEnd: "", // 三级水量结束
  thirdStepPrice: "", // 三级单价
  fourthStepEnd: "", // 四级水量结束
  fourthStepPrice: "", // 四级单价
  fifthStepEnd: "", // 五级水量结束
  fifthStepPrice: "", // 五级单价
  unitPrice: "", // 单一水价单价
  notes: "" // 备注
});
// 是否为阶梯水价
const isStepsList = ref([
  { id: 1, value: false, text: "否" },
  { id: 2, value: true, text: "是" }
]);
// 同级表单规则
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入水价名称",
      trigger: "blur"
    }
  ],
  unitPrice: [
    {
      required: true,
      message: "请输入单价",
      trigger: "blur"
    }
  ]
});
const addFormVisible = ref(false); // 显示新增弹框
const addPrice = () => {
  console.log("新增，显示增加表单");
  addFormVisible.value = true;
};

// 获取方案信息
const getFeeScheme = () => {
  waterPrice().then(res => {
    if (res.retcode == "200") {
      demo3.tableData = res.data.data;
    }
  });
};

const isShowFirstStep = ref(false); // 展示阶梯一
const isShowSecondStep = ref(false); // 展示阶梯二
const isShowThirdStep = ref(false); // 展示阶梯三
const isShowFourthStep = ref(false); // 展示阶梯四
const isShowFifthStep = ref(false); // 展示阶梯五
const isTwoStep = ref(false); // 阶梯二时展示正无穷
const isThreeStep = ref(false); // 阶梯三时展示正无穷
const isFourStep = ref(false); // 阶梯四时展示正无穷
const isFiveStep = ref(false); // 阶梯四时展示正无穷
// 确认水价阶梯数
const confirmSteps = () => {
  console.log(form.steps, "阶梯数");
  // debuggers;
  switch (Number(form.steps)) {
    case 2:
      isShowFirstStep.value = true;
      isShowSecondStep.value = true;
      isShowThirdStep.value = false;
      isShowFourthStep.value = false;
      isShowFifthStep.value = false;
      isTwoStep.value = true;
      form.secondStepEnd = "+∞";
      break;
    case 3:
      isShowFirstStep.value = true;
      isShowSecondStep.value = true;
      isShowThirdStep.value = true;
      isShowFourthStep.value = false;
      isShowFifthStep.value = false;
      isTwoStep.value = false;
      isThreeStep.value = true;
      form.secondStepEnd = "";
      form.thirdStepEnd = "+∞";
      break;
    case 4:
      isShowFirstStep.value = true;
      isShowSecondStep.value = true;
      isShowThirdStep.value = true;
      isShowFourthStep.value = true;
      isShowFifthStep.value = false;
      isTwoStep.value = false;
      isThreeStep.value = false;
      isFourStep.value = true;
      form.secondStepEnd = "";
      form.thirdStepEnd = "";
      form.fourthStepEnd = "+∞";
      break;
    case 5:
      isShowFirstStep.value = true;
      isShowSecondStep.value = true;
      isShowThirdStep.value = true;
      isShowFourthStep.value = true;
      isShowFifthStep.value = true;
      isTwoStep.value = false;
      isThreeStep.value = false;
      isFourStep.value = false;
      isFiveStep.value = true;
      form.secondStepEnd = "";
      form.thirdStepEnd = "";
      form.fourthStepEnd = "";
      form.fifthStepEnd = "+∞";
      break;
    default:
      ElMessage.error("请输入合法的字符！");
      break;
  }
};

const ruleFormRef = ref(); // 表单ref
// 新增水价
const submitForm = async formEl => {
  // console.log("新增水价");
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      waterPriceAdd(form).then(res => {
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          addFormVisible.value = false;
          getFeeScheme();
          console.log(demo3.tableData, "tableData");
        }
      });
    } else {
      ElMessage({
        showClose: true,
        message: "新增失败！",
        type: "error"
      });
    }
  });
};

// 分页
const currentPage4 = ref(4);
const pageSize4 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleCurrentChange = val => {
  console.log(`current page: ${val}`);
};

// 筛选是否为阶梯水价
const isSepOptions = ref([
  { label: "是", value: true },
  {
    label: "否",
    value: false
  }
]);

// 切换是否为阶梯价
watch(
  () => form.isSteps,
  newVal => {
    // console.log(newVal, oldVal);
    if (newVal == true) {
      form.steps = "2";
      form.unitPrice = "";
      form.notes = "";
    } else {
      form.steps = "";
      form.firstStep = "";
      form.firstStepPrice = "";
      form.secondStep = "";
      form.secondStepPrice = "";
      form.thirdStep = "";
      form.thirdStepPrice = "";
      form.fourthStep = "";
      form.fourthStepPrice = "";
      form.fifthStep = "";
      form.fifthStepPrice = "";
      form.notes = "";
      // 表单重置
      isShowFirstStep.value = false;
      isShowSecondStep.value = false;
      isShowThirdStep.value = false;
      isShowFourthStep.value = false;
      isShowFifthStep.value = false;
    }
  }
);

onMounted(() => {
  getFeeScheme();
});
</script>

<style lang="scss" scoped>
.feescheme {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .feeschme_table {
    width: 98%;
    margin-top: 16px;
    .box-card {
      height: 100%;
    }
  }
}

.expand-wrapper {
  // padding: 20px;
}

.steps_input {
  ::v-deep .el-input__wrapper {
    padding: 1px 1px 0px 11px !important;
  }
}

::v-deep .el-descriptions__header {
  margin-bottom: 6px;
  margin-top: 6px;
  margin-left: 6px;
}

.demo-pagination-block {
  margin-top: 10px;
}
</style>
