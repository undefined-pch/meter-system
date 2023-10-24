<template>
  <div>
    <div>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input
            style="margin-left: 4px"
            v-model="searchNumber"
            type="search"
            @input="search()"
            clearable
            placeholder="请输入价格编号"
          />
          <vxe-button icon="vxe-icon-square-plus" @click="addBuild()"
            >新增</vxe-button
          >
        </template>
        <template #tools>
          <el-button type="danger" @click="addBuild" style="margin-right: 10px"
            >批量删除</el-button
          >
        </template>
      </vxe-toolbar>
      <vxe-table
        border
        show-header-overflow
        ref="xTable"
        height="560"
        show-overflow
        :row-config="{ useKey: true, isHover: true }"
        :column-config="{ useKey: true, resizable: true }"
        :data="priceData"
      >
        <vxe-column type="seq" title="序号" width="60" />
        <vxe-column field="number" title="价格编号" width="100" />
        <vxe-column field="type" title="价格类型" width="100" />
        <vxe-column
          type="html"
          field="stepnumber"
          title="阶梯价格编号"
          width="100"
          :formatter="formatRole"
        />
        <vxe-column field="name" title="价格名称" width="100" />
        <vxe-column field="waterUnitprice" title="水费单价" width="90" />
        <vxe-column
          field="waterUnitpricePer"
          title="水费标准单价百分比"
          width="90"
        />
        <vxe-column field="pollutioUnitprice" title="排污费单价" width="90" />
        <vxe-column
          field="pollutioUnitpricePer"
          title="排污费单价百分比"
          width="90"
        />
        <vxe-column
          field="pressureUnitprice"
          title="二次加压费用单价"
          width="90"
        />
        <vxe-column
          field="pressureUnitpricePre"
          title="二次加压费用百分比"
          width="90"
        />
        <vxe-column field="otherExpensesName" title="其他费用名称" width="90" />
        <vxe-column field="otherExpenses" title="其他费用" width="90" />
        <vxe-column
          field="otherExpensesPre"
          title="其他费用百分比"
          width="90"
        />
        <vxe-column field="founder" title="创建人" width="100" />
        <vxe-column field="creationtime" title="创建时间" width="100" />
        <vxe-column field="updater" title="更新人" width="100" />
        <vxe-column field="updatedtime" title="更新时间" width="100" />
        <vxe-column field="describeinformation" title="描述信息" width="100" />
        <vxe-column title="操作" width="100" fixed="right" show-overflow>
          <template #header> 操作 </template>
          <template #default="{ row }">
            <vxe-button
              type="text"
              icon="vxe-icon-edit"
              @click="editEvent(row)"
            />
            <vxe-button
              type="text"
              icon="vxe-icon-delete"
              @click="removeEvent(row)"
            />
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-modal
        v-model="showEdit"
        :title="selectRow ? '编辑&保存' : '新增&保存'"
        width="800"
        height="450px"
        min-width="600"
        min-height="300"
        :loading="submitLoading"
        resize
        destroy-on-close
      >
        <template #default>
          <vxe-form
            :data="formData"
            :rules="formData.type == '使用单一价格' ? formRules2 : formRules"
            title-align="right"
            title-width="100"
            ref="formRef"
            @submit="submitEvent"
          >
            <vxe-form-item
              field="number"
              title="价格编号"
              title-width="110"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.number" placeholder="请输入价格编号" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="type"
              title="价格类型"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <vxe-input v-model="data.type" placeholder="请输入价格类型" /> -->
                <vxe-select v-model="data.type" placeholder="默认尺寸">
                  <vxe-option
                    v-for="item in pricetypes"
                    :key="item.id"
                    :value="item.name"
                    :label="item.name"
                  />
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="name"
              title="价格名称"
              title-width="110"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.name" placeholder="请输入价格名称" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="stepnumber"
              title="阶梯价格编号"
              :span="8"
              :item-render="{}"
              title-width="110"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.stepnumber"
                  placeholder="请输入阶梯价格编号"
                  :disabled="isshowstepnumber"
                >
                  <template #suffix v-if="isShowa">
                    <i
                      class="vxe-icon-num-list"
                      style="color: var(--el-color-primary)"
                      @click="openjtList()"
                    /> </template
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="waterUnitprice"
              title="标准单价"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.waterUnitprice"
                  placeholder="请输入标准单价"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="waterUnitpricePer"
              title="单价占比"
              title-width="110"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.waterUnitpricePer"
                  placeholder="请输入单价占比"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="pressureUnitprice"
              title="加压单价"
              title-width="110"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.pressureUnitprice"
                  placeholder="请输入加压单价"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="pressureUnitpricePre"
              title="加压价占比"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.pressureUnitpricePre"
                  placeholder="请输入加压价占比"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="pollutioUnitprice"
              title="排污单价"
              title-width="110"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.pollutioUnitprice"
                  placeholder="请输入排污单价"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="pollutioUnitpricePer"
              title="排污价占比"
              title-width="110"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.pollutioUnitpricePer"
                  placeholder="请输入排污价占比"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="otherExpenses"
              title="其他费用"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.otherExpenses"
                  placeholder="请输入其他费用"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="otherExpensesPre"
              title="其他费用占比"
              title-width="110"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.otherExpensesPre"
                  placeholder="请输入其他费用占比"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="otherExpensesPre"
              title="其他费用名称"
              title-width="110"
              :span="16"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.otherExpensesName"
                  placeholder="请输入其他费用名称"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="describeinformation"
              title="描述信息"
              title-width="110"
              :span="24"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-textarea
                  v-model="data.describeinformation"
                  type="textarea"
                  placeholder="请输入描述信息"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" title-align="left" :span="24">
              <template #default>
                <vxe-button type="submit">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>
      <!-- 选择阶梯表格  -->
      <vxe-modal v-model="val1" width="800" show-footer @confirm="setladder()">
        <template #title>
          <span>选择阶梯价格编号</span>
        </template>
        <template #corner>
          <!-- <vxe-icon name="bell-fill" /> -->
          <vxe-icon name="minus" />
        </template>
        <template #default>
          <vxe-table
            show-overflow
            height="400"
            :sync-resize="val1"
            :data="jtList"
            :radio-config="{ highlight: true }"
            :row-config="{ useKey: true, isHover: true }"
            :column-config="{ useKey: true, resizable: true }"
            @radio-change="radioChangeEvent"
          >
            <vxe-column type="radio" fixed="left" width="60" />
            <vxe-column
              field="priceNumber"
              title="阶梯价格编号"
              fixed="left"
              width="120"
            />
            <vxe-column
              field="priceType"
              title="阶梯类型"
              fixed="left"
              width="120"
            />
            <vxe-column field="priceName" title="阶梯名称" width="120" />
            <vxe-column field="firststart" title="阶梯1开始" width="120" />
            <vxe-column field="firstend" title="阶梯1结束" width="120" />
            <vxe-column field="firstprice" title="阶梯1价格" width="120" />
            <vxe-column field="secondstart" title="阶梯2开始" width="120" />
            <vxe-column field="secondend" title="阶梯2结束" width="120" />
            <vxe-column field="secondprice" title="阶梯2价格" width="120" />
            <vxe-column field="thirdstart" title="阶梯3开始" width="120" />
            <vxe-column field="thirdend" title="阶梯3结束" width="120" />
            <vxe-column field="thirdprice" title="阶梯3价格" width="120" />
            <vxe-column
              field="describeinformation"
              title="描述信息"
              width="120"
            />
          </vxe-table>
        </template>
      </vxe-modal>
    </div>
    <div>
      <vxe-pager
        v-model:current-page="pageVO2.currentPage"
        :total="pageVO2.total"
        :page-size="10"
        @page-change="geteffortlist"
        :layouts="[
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'FullJump',
          'Total'
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  VXETable,
  VxeTableInstance,
  VxeFormPropTypes,
  VxeFormInstance,
  VxeTableEvents,
  VxeColumnPropTypes
} from "vxe-table";
import { useDebounceFn } from "@vueuse/core";
import {
  pricesetadd,
  getpriceset,
  ladderset,
  pricesetfix,
  pricesetdelete
} from "@/api/price";

// 价格设置
interface RowVO {
  _id: number;
  number: "";
  type: "";
  stepnumber: "";
  name: "";
  waterUnitprice: "";
  waterUnitpricePer: "";
  pollutioUnitprice: "";
  pollutioUnitpricePer: "";
  pressureUnitprice: "";
  pressureUnitpricePre: "";
  otherExpenses: "";
  otherExpensesName: "";
  otherExpensesPre: "";
  founder: "";
  creationtime: "";
  updater: "";
  updatedtime: "";
  describeinformation: "";
}

interface RowV1 {
  priceNumber: "";
  priceType: "";
  priceName: "";
  firststart: "";
  firstend: "";
  firstprice: "";
  secondstart: "";
  secondend: "";
  secondprice: "";
  thirdstart: "";
  thirdend: "";
  thirdprice: "";
  describe: "";
}

interface FormDataVO {
  number: string;
  type: string;
  stepnumber: string;
  name: string;
  waterUnitprice: string;
  waterUnitpricePer: string;
  pollutioUnitprice: string;
  pollutioUnitpricePer: string;
  pressureUnitprice: string;
  pressureUnitpricePre: string;
  otherExpenses: string;
  otherExpensesName: string;
  otherExpensesPre: string;
  founder: string;
  creationtime: string;
  updater: string;
  updatedtime: string;
  describeinformation: string;
}

const pricetypes = ref([
  { id: 1, name: "使用单一价格" },
  { id: 2, name: "执行阶梯价格" }
]);

const val1 = ref(false);
// const tableData = ref([]);
const jtList = ref([]);

const isshowstepnumber = ref(true);
const formData = reactive<FormDataVO>({
  number: "",
  type: "",
  stepnumber: "",
  name: "",
  waterUnitprice: "",
  waterUnitpricePer: "",
  pollutioUnitprice: "",
  pollutioUnitpricePer: "",
  pressureUnitprice: "",
  pressureUnitpricePre: "",
  otherExpenses: "",
  otherExpensesName: "",
  otherExpensesPre: "",
  founder: "",
  creationtime: "",
  updater: "",
  updatedtime: "",
  describeinformation: ""
});

// 跳转获取name参数
const router = useRouter();

onMounted(() => {
  if (router.currentRoute.value.query.name) {
    searchNumber.value = router.currentRoute.value.query.name as string;
    getprice();
  } else {
    getprice();
  }
});
const isShowa = ref(false);
watch(
  () => formData.type,
  newval => {
    if (newval == "使用单一价格") {
      isshowstepnumber.value = true;
      isShowa.value = false;
    } else {
      isshowstepnumber.value = false;
      isShowa.value = true;
    }
  }
);

const priceData = ref<RowVO[]>([]);
const formRef = ref<VxeFormInstance>(); // from表单校验
const formRules = reactive<VxeFormPropTypes.Rules>({
  number: [{ required: true, message: "请输入价格编号" }],
  type: [{ required: true, message: "请输入价格类型" }],
  stepnumber: [{ required: true, message: "请输入价格类型" }],
  name: [{ required: true, message: "请输入价格名称" }],
  waterUnitprice: [{ required: true, message: "请输入水费单价" }],
  waterUnitpricePer: [{ required: true, message: "请输入水费标准单价百分比" }],
  pollutioUnitprice: [{ required: true, message: "请输入排污费单价" }],
  pollutioUnitpricePer: [{ required: true, message: "请输入排污费单价百分比" }],
  pressureUnitprice: [{ required: true, message: "请输入二次加压费用单价" }],
  pressureUnitpricePre: [
    { required: true, message: "请输入二次加压费用百分比" }
  ],
  otherExpensesName: [{ required: true, message: "请输入其他费用名称" }],
  otherExpenses: [{ required: true, message: "请输入其他费用" }],
  otherExpensesPre: [{ required: true, message: "请输入其他费用占比" }],
  describeinformation: [{ required: true, message: "请输入描述信息" }]
});
const formRules2 = reactive<VxeFormPropTypes.Rules>({
  number: [{ required: true, message: "请输入价格编号" }],
  type: [{ required: true, message: "请输入价格类型" }],
  name: [{ required: true, message: "请输入价格名称" }],
  waterUnitprice: [{ required: true, message: "请输入水费单价" }],
  waterUnitpricePer: [{ required: true, message: "请输入水费标准单价百分比" }],
  pollutioUnitprice: [{ required: true, message: "请输入排污费单价" }],
  pollutioUnitpricePer: [{ required: true, message: "请输入排污费单价百分比" }],
  pressureUnitprice: [{ required: true, message: "请输入二次加压费用单价" }],
  pressureUnitpricePre: [
    { required: true, message: "请输入二次加压费用百分比" }
  ],
  otherExpensesName: [{ required: true, message: "请输入其他费用名称" }],
  otherExpenses: [{ required: true, message: "请输入其他费用" }],
  otherExpensesPre: [{ required: true, message: "请输入其他费用占比" }],
  describeinformation: [{ required: true, message: "请输入描述信息" }]
});

const search = useDebounceFn(() => {
  // 模糊搜索
  getprice();
}, 1000);
// 分页
const pageVO2 = reactive({
  currentPage: 1,
  total: 0
});
const geteffortlist = () => {
  // 点击分页请求数据
};

const showEdit = ref(false); // 展示编辑框
const selectRow = ref<RowVO | null>();
// 打开新增表单
const addBuild = () => {
  Object.assign(formData, {
    number: "",
    type: "使用单一价格",
    stepnumber: "",
    name: "",
    waterUnitprice: "",
    waterUnitpricePer: "",
    pollutioUnitprice: "",
    pollutioUnitpricePer: "",
    pressureUnitprice: "",
    pressureUnitpricePre: "",
    otherExpenses: "",
    otherExpensesName: "",
    otherExpensesPre: "",
    founder: "",
    creationtime: "",
    updater: "",
    updatedtime: "",
    describeinformation: ""
  });
  selectRow.value = null;
  showEdit.value = true;
};

// 编辑事件
const editEvent = (row: RowVO) => {
  Object.assign(formData, row);
  selectRow.value = row;
  showEdit.value = true;
};

// 删除事件
const removeEvent = async (row: RowVO) => {
  const type = await VXETable.modal.confirm("您确定要删除该数据?");
  if (type === "confirm") {
    const $table = xTable.value;
    pricesetdelete(row._id as any).then(res => {
      if (res.retcode == 200) {
        VXETable.modal.message({
          content: `${res.message}`,
          status: "success"
        });
      }
    });
    if ($table) {
      $table.remove(row);
    }
  }
};

const submitLoading = ref(false);
const xTable = ref<VxeTableInstance<RowVO>>();
// 提交表单
const submitEvent = () => {
  submitLoading.value = true;
  setTimeout(() => {
    const $table = xTable.value;
    if ($table) {
      submitLoading.value = false;
      showEdit.value = false;
      if (selectRow.value) {
        // 修改接口
        // fixlist((selectRow.value as any)._id, formData.value).then(res => {
        //   if (res.retcode == 200) {
        //     VXETable.modal.message({ content: "保存成功", status: "success" });
        //     geteffortlist();
        //   }
        // });
        // Object.assign(selectRow.value, formData);
        pricesetfix((selectRow.value as any)._id, formData).then(res => {
          console.log(res.data);
          if (res.retcode == 200) {
            VXETable.modal.message({
              content: `${res.message}`,
              status: "success"
            });
            getprice();
          }
        });
      } else {
        // 新增
        pricesetadd(formData).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "新增成功", status: "success" });
            getprice();
          }
        });
      }
    }
  }, 500);
};

// 查询表格信息
const searchNumber = ref("");
const getprice = () => {
  const data = {
    page: pageVO2.currentPage,
    pageSize: 10,
    number: searchNumber.value
  };
  getpriceset(data).then(res => {
    if (res.retcode == 200) {
      priceData.value = res.data.data;
      pageVO2.total = res.data.total;
    }
  });
};

// 打开阶梯表格
const openjtList = () => {
  val1.value = true;
  const data = {
    page: 1,
    pageSize: 1000,
    keyword: ""
  };
  ladderset(data).then(res => {
    if (res.retcode == 200) {
      jtList.value = res.data.data;
    }
  });
};

const selectedSetLadder = ref("");
const radioChangeEvent: VxeTableEvents.RadioChange<RowV1> = ({ row }) => {
  // selectRow.value = row;
  // console.log("单选事件", row.priceNumber);
  selectedSetLadder.value = row.priceNumber;
};

// 选择阶梯价格编号
const setladder = () => {
  // console.log("点击了确认");
  formData.stepnumber = selectedSetLadder.value;
};

// 使用阶梯价用链接表示
const formatRole: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
  return `<a href="#/price/ladderset?name=${cellValue}" class="link" style="color: red;text-decoration: underline;">${cellValue}</a>`;
};
</script>

<style lang="scss" scoped></style>
