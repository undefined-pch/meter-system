<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-input
          v-model="val2"
          placeholder="请输入阶梯价格编号"
          type="search"
          @change="getList"
          clearable
        />
        <vxe-button icon="vxe-icon-square-plus" @click="insertEvent()"
          >新增</vxe-button
        >
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="560"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true }"
      :data="tableData"
    >
      <vxe-column type="seq" width="60" />
      <vxe-column type="expand" width="80">
        <template #content="{ row }">
          <div class="first-level">
            <div>阶梯1</div>
            <div>{{ row.firststart }}</div>
            <div>{{ row.firstend }}</div>
            <div>{{ row.firstprice }}</div>
          </div>
          <div class="first-level">
            <div>阶梯2</div>
            <div>{{ row.secondstart }}</div>
            <div>{{ row.secondend }}</div>
            <div>{{ row.secondprice }}</div>
          </div>
          <div class="first-level">
            <div>阶梯3</div>
            <div>{{ row.thirdstart }}</div>
            <div>{{ row.thirdend }}</div>
            <div>{{ row.thirdprice }}</div>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="priceNumber" title="阶梯价格编号" />
      <vxe-column field="priceType" title="阶梯类型" />
      <vxe-column field="priceName" title="阶梯名称" />
      <vxe-column field="founder" title="创建人" />
      <vxe-column field="creationtime" title="创建时间" />
      <vxe-column field="updater" title="更新人" />
      <vxe-column field="updatetime" title="更新时间" />
      <vxe-column field="describe" title="描述信息" />
      <vxe-column title="操作" width="100" show-overflow>
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
      min-width="600"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <template #default>
        <vxe-form
          :data="formData"
          :rules="formRules"
          title-align="right"
          title-width="110"
          @submit="submitEvent"
        >
          <vxe-form-item
            field="priceNumber"
            title="阶梯价格编号"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.priceNumber"
                placeholder="请输入阶梯价格编号"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="priceType"
            title="阶梯类型"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <!-- <vxe-input
                v-model="data.priceType"
                placeholder="请输入阶梯类型"
              /> -->
              <vxe-select v-model="data.priceType" placeholder="请输入阶梯类型">
                <vxe-option
                  v-for="(item, index) in pricetypeList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                />
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="priceName"
            title="阶梯名称"
            :span="12"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.priceName"
                placeholder="请输入阶梯名称"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="firststart"
            title="阶梯1开始"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.firststart"
                placeholder="请输入阶梯1开始"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="firstend"
            title="阶梯1结束"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.firstend"
                placeholder="请输入阶梯1结束"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="firstprice"
            title="阶梯1单价"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.firstprice"
                placeholder="请输入阶梯1单价"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="secondstart"
            title="阶梯2开始"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.secondstart"
                placeholder="请输入阶梯2开始"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="secondend"
            title="阶梯2结束"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.secondend"
                placeholder="请输入阶梯2结束"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="secondprice"
            title="阶梯2单价"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.secondprice"
                placeholder="请输入阶梯2单价"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="thirdstart"
            title="阶梯3开始"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.thirdstart"
                placeholder="请输入阶梯3开始"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="thirdend"
            title="阶梯3结束"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.thirdend"
                placeholder="请输入阶梯3结束"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="thirdprice"
            title="阶梯3单价"
            :span="8"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.thirdprice"
                placeholder="请输入阶梯3单价"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="describe"
            title="描述信息"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-textarea
                v-model="data.describe"
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

    <div>
      <vxe-pager
        v-model:current-page="pageVO1.currentPage"
        :total="pageVO1.total"
        @page-change="getList"
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
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { VXETable, VxeTableInstance, VxeFormPropTypes } from "vxe-table";
import {
  laddersetadd,
  ladderset,
  laddersetfix,
  laddersetdelete
} from "@/api/price";

interface RowVO {
  _id: number;
  priceNumber: string;
  priceType: string;
  priceName: string;
  founder: string;
  creationtime: string;
  updater?: string;
  updatetime?: string;
  describe: string;
  firstname?: string;
  firststart?: number;
  firstend?: number;
  firstprice?: string;
  secondname?: string;
  secondstart?: number;
  secondend?: number;
  secondprice?: string;
  thirdname?: string;
  thirdstart?: number;
  thirdend?: number;
  thirdprice?: string;
}

const xTable = ref<VxeTableInstance<RowVO>>();

const val2 = ref(""); // 搜索关键字

const formData = reactive({
  priceNumber: "",
  priceType: "",
  priceName: "",
  firststart: ""
});

const submitLoading = ref(false);
const showEdit = ref(false);
const selectRow = ref<RowVO | null>();
const tableData = ref<RowVO[]>([]);

const formRules = reactive<VxeFormPropTypes.Rules>({
  priceNumber: [{ required: true, message: "请输入阶梯价格编号" }],
  priceType: [{ required: true, message: "请输入阶梯类型" }],
  priceName: [{ required: true, message: "请输入阶梯名称" }],
  firststart: [{ required: true, message: "请输入阶梯1开始" }],
  firstend: [{ required: true, message: "请输入阶梯1结束" }],
  firstprice: [{ required: true, message: "请输入阶梯1单价" }],
  secondstart: [{ required: true, message: "请输入阶梯2开始" }],
  secondend: [{ required: true, message: "请输入阶梯2结束" }],
  secondprice: [{ required: true, message: "请输入阶梯2单价" }],
  thirdstart: [{ required: true, message: "请输入阶梯3开始" }],
  thirdend: [{ required: true, message: "请输入阶梯3结束" }],
  thirdprice: [{ required: true, message: "请输入阶梯3单价" }],
  describe: [{ required: true, message: "请输入描述信息" }]
});

const insertEvent = () => {
  Object.assign(formData, {
    priceNumber: "",
    priceType: "",
    priceName: "",
    firststart: "",
    firstend: "",
    firstprice: "",
    secondstart: "",
    secondend: "",
    secondprice: "",
    thirdstart: "",
    thirdend: "",
    thirdprice: "",
    describe: ""
  });
  selectRow.value = null;
  showEdit.value = true;
};

const editEvent = (row: RowVO) => {
  console.log(row, "row");
  Object.assign(formData, row);
  selectRow.value = row;
  showEdit.value = true;
};

const removeEvent = async (row: RowVO) => {
  const type = await VXETable.modal.confirm("您确定要删除该数据?");
  if (type === "confirm") {
    const $table = xTable.value;
    laddersetdelete(row._id as any).then(res => {
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

const submitEvent = () => {
  submitLoading.value = true;
  setTimeout(() => {
    const $table = xTable.value;
    if ($table) {
      submitLoading.value = false;
      showEdit.value = false;
      if (selectRow.value) {
        console.log($table, "表格信息");
        console.log(formData, "修改的表单数据");
        // const data = {};
        laddersetfix((selectRow.value as any)._id, formData).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({
              content: `${res.message}`,
              status: "success"
            });
          }
        });
        // VXETable.modal.message({ content: "保存成功", status: "success" });
        Object.assign(selectRow.value, formData);
        getList();
      } else {
        console.log(formData, "formData新增");
        laddersetadd(formData).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "新增成功", status: "success" });
            $table.insert({ ...formData });
            getList();
          }
        });
      }
    }
  }, 500);
};

// 分页
const pageVO1 = reactive({
  currentPage: 1,
  pageSize: 30,
  total: 8
});

// 阶梯类型
const pricetypeList = ref([
  { id: 1, name: "月阶梯" },
  { id: 2, name: "年阶梯" }
]);

// 跳转获取name参数
const router = useRouter();

onMounted(() => {
  // debugger;
  if (router.currentRoute.value.query.name) {
    val2.value = router.currentRoute.value.query.name as string;
    getList();
  } else {
    getList();
  }
});
const getList = async () => {
  const datas = {
    page: pageVO1.currentPage,
    pageSize: 10,
    keyword: val2.value
  };
  const { retcode, data } = await ladderset(datas);
  if (retcode == 200) {
    tableData.value = data.data;
  }
};
</script>

<style lang="scss" scoped>
.first-level {
  display: flex;

  div {
    flex: 1;
  }
}
</style>
