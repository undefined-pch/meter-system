<template>
  <div class="table-main">
    <div class="table-main">
      <vxe-toolbar custom ref="toolbarRef">
        <template #buttons>
          <div style="margin-left: 6px">
            水司：
            <vxe-select
              v-model="companyKey"
              placeholder="请输入要查找的水司"
              :options="companyKeyList"
              clearable
              filterable
              @focus="searchCompanyList"
              @change="getlargemeterList()"
              @clear="clearCompanyKey()"
            />
          </div>
          <div style="margin-left: 6px">
            区域名称：
            <vxe-select
              v-model="regionKey"
              placeholder="请输入要查找的区域"
              :options="regionKeyList"
              clearable
              filterable
              @focus="searchRegionList(true)"
              @change="getlargemeterList()"
              @clear="clearRegionKey()"
            />
          </div>
          <div style="margin-left: 6px">
            小区名称：
            <vxe-select
              v-model="CommunityKey"
              placeholder="请输入要查找的小区"
              :options="communityKeyList"
              clearable
              filterable
              @focus="searchCommunityList(true)"
              @change="getlargemeterList()"
              @clear="clearCommunityKey()"
            />
          </div>
          <div style="margin-left: 6px">
            楼栋号：
            <vxe-select
              v-model="buildKey"
              placeholder="请输入要查找的楼栋号"
              :options="buildKeyList"
              clearable
              filterable
              @focus="searchBuildList(true)"
              @change="getlargemeterList()"
              @clear="clearBuildKey()"
            />
          </div>
          <div style="margin-left: 6px">
            采集器:
            <vxe-select
              v-model="collectorKey"
              placeholder="请输入要查找的采集器"
              :options="collectorKeyList"
              clearable
              filterable
              @focus="searchCollectorList(true)"
              @change="getlargemeterList()"
              @clear="clearBuildKey()"
            />
          </div>
        </template>
        <template #tools>
          <el-button type="primary" @click="addBuild" style="margin-left: 10px"
            >新增</el-button
          >
          <el-button type="primary" @click="addBuild" style="margin-left: 10px"
            >批量导入</el-button
          >
          <el-button type="danger" @click="addBuild" style="margin-left: 10px"
            >批量删除</el-button
          >
        </template>
      </vxe-toolbar>
      <vxe-table
        border
        show-overflow
        ref="xTable"
        height="550"
        :column-config="{ resizable: true, useKey: true }"
        :row-config="{ isHover: true, useKey: true }"
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent"
      >
        <vxe-column type="checkbox" width="50" fixed="left" />
        <vxe-column type="seq" width="50" title="序号" fixed="left" />
        <vxe-column
          field="company"
          width="100"
          title="水司名称"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="region"
          width="100"
          title="区域名称"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="village"
          width="100"
          title="小区名称"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="buildingnumber"
          width="100"
          title="楼栋编号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="parentMeter"
          width="100"
          title="父表编号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="largeMeterId"
          width="100"
          title="大表编号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="largeMeterAddress"
          width="100"
          title="大表地址"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="faulttype"
          width="100"
          title="故障类型号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="bandrate"
          width="100"
          title="波特率"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="databit"
          width="100"
          title="数据位"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="checkbit"
          width="100"
          title="检验位"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="stopbit"
          width="100"
          title="停止位"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="manufacturer"
          width="100"
          title="生产厂家"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="specification"
          width="100"
          title="规格型号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="dateOfManufacture"
          width="100"
          title="出厂日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="installationDate"
          width="100"
          title="安装日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="activationDate"
          width="100"
          title="启用日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="founder"
          width="100"
          title="创建人"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="creationtime"
          width="100"
          title="创建时间"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="updater"
          width="100"
          title="最近更新人"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="updatedtime"
          width="100"
          title="最近更新时间"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="location"
          width="100"
          title="安装位置"
          sortable
          show-header-overflow
        />
        <vxe-column field="describe" width="160" title="描述信息" />
        <vxe-column title="操作" width="100" fixed="right" show-overflow>
          <template #default="{ row }">
            <vxe-button
              type="text"
              icon="vxe-icon-edit"
              style="color: #409eff"
              @click="editEvent(row)"
            />
            <vxe-button
              type="text"
              icon="vxe-icon-delete"
              style="color: #f23c3c"
              @click="removeEvent(row)"
            />
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-modal
        v-model="showEdit"
        :title="selectRow ? '编辑&保存' : '新增&保存'"
        width="800"
        height="546px"
        min-width="600"
        min-height="300"
        :loading="submitLoading"
        resize
        destroy-on-close
      >
        <template #default>
          <vxe-form
            :data="householdData"
            :rules="formRules"
            title-align="right"
            title-width="100"
            @submit="submitEvent"
          >
            <vxe-form-item
              field="company"
              title="水司名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-select
                  v-model="data.company"
                  placeholder="请输入要查找的水司"
                  :options="companyKeyList"
                  clearable
                  filterable
                  @focus="searchCompanyList"
                  @change="getlargemeterList()"
                  @clear="clearCompanyKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="region"
              title="区域名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-select
                  v-model="data.region"
                  placeholder="请输入要查找的区域"
                  :options="regionKeyList"
                  clearable
                  filterable
                  @focus="searchRegionList(false)"
                  @change="getlargemeterList()"
                  @clear="clearRegionKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="village"
              title="小区名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-select
                  v-model="data.village"
                  placeholder="请输入要查找的小区"
                  :options="communityKeyList"
                  clearable
                  filterable
                  @focus="searchCommunityList(false)"
                  @change="getlargemeterList()"
                  @clear="clearCommunityKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="buildingnumber"
              title="楼栋编号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-select
                  v-model="data.buildingnumber"
                  placeholder="请输入要查找的楼栋号"
                  :options="buildKeyList"
                  clearable
                  filterable
                  @focus="searchBuildList(false)"
                  @change="getlargemeterList()"
                  @clear="clearBuildKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="collectorBelong"
              title="所属采集器"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-select
                  v-model="data.collectorBelong"
                  placeholder="请输入要查找的采集器"
                  :options="collectorKeyList"
                  clearable
                  filterable
                  @focus="searchCollectorList(false)"
                  @change="getlargemeterList()"
                  @clear="clearBuildKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="parentMeter"
              title="父级总表"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.parentMeter"
                  placeholder="请输入父级总表"
                  style="width: 100%"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="largeMeterId"
              title="大表编号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.largeMeterId"
                  placeholder="请输入大表编号"
                  style="width: 100%"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="summaryMeterAdress"
              title="总表地址"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.summaryMeterAdress"
                  placeholder="请输入总表地址"
                  style="width: 100%"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="manufacturer"
              title="生产厂家"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <div style="display: flex">
                  <div style="flex: 1">
                    <vxe-select
                      v-model="data.manufacturer"
                      placeholder="请选择生产厂家"
                      :options="manufacturerList"
                      clearable
                      filterable
                      @focus="searchManufactureList"
                      style="padding-right: 10px"
                    />
                  </div>
                  <vxe-button
                    status="primary"
                    content="新增"
                    @click="openright()"
                  />
                </div>
                <!-- <el-select
                  v-model="data.manufacturer"
                  class="m-3"
                  placeholder="请输入生产厂家"
                >
                  <el-option
                    v-for="item in manufacturerList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select> -->
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="bandrate"
              title="波特率"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.bandrate" placeholder="请输入波特率" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="databit"
              title="数据位"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.databit" placeholder="请输入数据位" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="checkbit"
              title="校验位"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.checkbit" placeholder="请输入校验位" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="stopbit"
              title="停止位"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.stopbit" placeholder="请输入停止位" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="dateOfManufacture"
              title="出厂日期"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.dateOfManufacture"
                  placeholder="请输入出厂日期"
                  type="date"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="installationDate"
              title="安装日期"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.installationDate"
                  placeholder="请输入安装日期"
                  type="date"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="activationDate"
              title="启用日期"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.activationDate"
                  placeholder="请输入启用日期"
                  type="date"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="specification"
              title="规格型号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.specification"
                  placeholder="请输入SIM卡号"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="faulttype"
              title="故障类型号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.faulttype"
                  placeholder="请输入故障类型号"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="location"
              title="安装位置"
              :span="24"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.location"
                  placeholder="请输入安装位置"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="describe"
              title="备注"
              :span="24"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-textarea
                  v-model="data.describe"
                  placeholder="请输入备注"
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
      <el-drawer
        v-model="table"
        @close="closeRightList"
        title="全部协议信息"
        direction="rtl"
        size="40%"
        :z-index="1100"
      >
        <div style="height: 100%">
          <vxe-toolbar>
            <template #tools>
              <vxe-button status="primary" @click="insertAgreement()"
                >新增</vxe-button
              >
              <el-popconfirm
                title="该操作会删除该区域下所有小区、楼栋、住户,您确定要删除吗？"
                width="220"
              >
                <template #reference>
                  <vxe-button status="danger">删除选中</vxe-button>
                </template>
              </el-popconfirm>
              <vxe-button status="success" @click="saveEvent()"
                >保存</vxe-button
              >
            </template>
          </vxe-toolbar>
          <vxe-table
            border
            show-overflow
            keep-source
            ref="cTable"
            max-height="620"
            style="margin-top: 4px"
            :data="agreementData"
            :edit-config="{
              trigger: 'click',
              mode: 'cell',
              showStatus: true
            }"
          >
            <vxe-column type="checkbox" width="45" />
            <vxe-column type="seq" width="40" />
            <vxe-column
              field="manufacturerName"
              title="厂家名称"
              width="160"
              :edit-render="{}"
              sortable
            >
              <template #edit="{ row }">
                <vxe-input v-model="row.manufacturerName" type="text" />
              </template>
            </vxe-column>
            <vxe-column
              field="encode"
              title="协议编码"
              width="130"
              :edit-render="{}"
              sortable
            >
              <template #edit="{ row }">
                <vxe-input v-model="row.encode" type="text" />
              </template>
            </vxe-column>
            <vxe-column field="type" title="类型" :edit-render="{}" sortable>
              <template #edit="{ row }">
                <vxe-input v-model="row.type" type="text" />
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </el-drawer>
    </div>
    <div>
      <vxe-pager
        v-model:current-page="pageVO2.currentPage"
        :total="pageVO2.total"
        :page-size="10"
        @page-change="getlargemeterList"
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
    <rightlist />
  </div>
</template>
<script setup lang="ts">
// import { useRouter, useRoute } from "vue-router"; // 导入路由模块
import { ref, reactive, onMounted, nextTick } from "vue";
import {
  VXETable,
  VxeFormPropTypes,
  VxeTableInstance,
  VxeToolbarInstance
} from "vxe-table";
import rightlist from "@/components/rightlist/rightlist.vue";
// import { useDebounceFn } from "@vueuse/core";
// import { ElMessageBox, ElMessage } from "element-plus";
// import fdData from "@/assets/data/fd.json"; // 导入福鼎家园楼栋数据
import { getcompany, getregion, getlist } from "@/api/effort";
// import { getbuild } from "@/api/build";
import {
  getlargemeter,
  largemeteradd,
  largemeterfix,
  largemeterdelete
} from "@/api/largemeter";
// import { getcollector } from "@/api/collector";
import { getbuild } from "@/api/build";
import { getcollector } from "@/api/collector";
import {
  getagreement,
  agreementadd,
  agreementfix,
  agreementdelete
} from "@/api/agreement";
import { ElMessage } from "element-plus";
// 生产厂家
const manufacturerList = ref([]);

onMounted(() => {
  // isformArea();
  // getregion();
  // getallCompany();
  // getcompanyed();
  getlargemeterList(); // 获取全部大表信息
});

// const serchcompany = ref("");
const getlargemeterList = () => {
  const data = {
    page: 1,
    pageSize: 10,
    company: companyKey.value,
    region: regionKey.value,
    village: CommunityKey.value,
    buildingnumber: buildKey.value,
    collectorBelong: buildKey.value
  };
  getlargemeter(data).then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
      pageVO2.total = res.data.total;
    }
  });
};

// onActivated(() => {
//   selectXq.value = JSON.parse(route.query.data);
// });

// 新增小区楼栋
const addBuild = () => {
  // console.log("新增楼栋表单");
  Object.assign(householdData, {
    company: "",
    region: "",
    village: "",
    buildingnumber: "",
    collectorBelong: "", // 所属采集器
    parentMeter: "", // 父级总表
    largeMeterId: "", // 大表编号
    summaryMeterAdress: "", // 总表地址
    manufacturer: "", // 生产厂家
    bandrate: "", // 波特率
    databit: "", // 数据位
    checkbit: "", // 校验位
    stopbit: "", // 停止位
    dateOfManufacture: "", // 出厂日期
    installationDate: "", // 安装日期
    activationDate: "", // 启用日期
    specification: "", // 规格型号
    faulttype: "", // 故障类型号
    startTime: "", // 开始时间
    endTime: "", // 结束时间
    founder: "", // 创建人
    creationtime: "", // 创建时间
    updater: "", // 更新人
    updatedtime: "", // 更新时间
    location: "", // 安装位置
    describe: "" // 备注
  });
  selectRow.value = null;
  // 如果在表格筛选选择了水司/区域/小区/楼栋等，那就传递给表单组件
  // if (companyed.value.length > 0) {
  //   householdData.company = companyed.value;
  // }
  showEdit.value = true;
};

// 右侧地图显示与隐藏
// const showmap = ref(true);

// 表格字段
interface RowVO {
  id: number;
  company: string;
  region: string;
  village: string;
  buildingnumber: string;
  collectorBelong: string; // 所属采集器
  parentMeter: string; // 父级总表
  largeMeterId: string; // 大表编号
  summaryMeterAdress: string; // 总表地址
  manufacturer: string; // 生产厂家
  bandrate: string; // 波特率
  databit: string; // 数据位
  checkbit: string; // 校验位
  stopbit: string; // 停止位
  dateOfManufacture: string; // 出厂日期
  installationDate: string; // 安装日期
  activationDate: string; // 启用日期
  specification: string; // 规格型号
  faulttype: string; // 故障类型号
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  founder: string; // 创建人
  creationtime: string; // 创建时间
  updater: string; // 更新人
  updatedtime: string; // 更新时间
  location: string; // 安装位置
  describe: string; // 备注
}
const householdData = reactive({
  company: "",
  region: "",
  village: "",
  buildingnumber: "",
  collectorBelong: "", // 所属采集器
  parentMeter: "", // 父级总表
  largeMeterId: "", // 大表编号
  summaryMeterAdress: "", // 总表地址
  manufacturer: "", // 生产厂家
  bandrate: "", // 波特率
  databit: "", // 数据位
  checkbit: "", // 校验位
  stopbit: "", // 停止位
  dateOfManufacture: "", // 出厂日期
  installationDate: "", // 安装日期
  activationDate: "", // 启用日期
  specification: "", // 规格型号
  faulttype: "", // 故障类型号
  startTime: "", // 开始时间
  endTime: "", // 结束时间
  founder: "", // 创建人
  creationtime: "", // 创建时间
  updater: "", // 更新人
  updatedtime: "", // 更新时间
  location: "", // 安装位置
  describe: "" // 备注
});
const tableData = ref<RowVO[]>([]);
const showEdit = ref(false); // 展示编辑框
const selectRow = ref<RowVO | null>();
const submitLoading = ref(false);
// 点击行回调
const cellDBLClickEvent = (row: any) => {
  // 前往户表信息
  console.log(row.data, "row");
  // router.push({ path: "/basicInformation/build" });
};

// 编辑事件
const editEvent = (row: RowVO) => {
  Object.assign(householdData, row);
  selectRow.value = row;
  showEdit.value = true;
};

// 删除事件
const removeEvent = async (row: RowVO) => {
  const params = (row as any)._id;
  const type = await VXETable.modal.confirm("您确定要删除该数据?");
  if (type === "confirm") {
    const $table = xTable.value;
    if ($table) {
      // $table.remove(row);
      // 删除接口
      largemeterdelete(params).then(res => {
        // console.log(res.data);
        if (res.retcode == 200) {
          VXETable.modal.message({
            content: `${res.message}`,
            status: "success"
          });
          getlargemeterList();
        }
      });
    }
  }
};

// 表单规则
const formRules = reactive<VxeFormPropTypes.Rules>({
  company: [{ required: true, message: "请输入水司名称" }],
  region: [{ required: true, message: "请输入区域名称" }],
  village: [{ required: true, message: "请输入小区名称" }],
  buildingnumber: [{ required: true, message: "请输入楼栋编号" }],
  collectorBelong: [{ required: true, message: "请输入所属采集器" }],
  parentMeter: [{ required: true, message: "请输入父级总表" }],
  largeMeterId: [{ required: true, message: "请输入大表编号" }],
  summaryMeterAdress: [{ required: true, message: "请输入总表地址" }],
  manufacturer: [{ required: true, message: "请输入生产厂家" }],
  bandrate: [{ required: true, message: "请输入波特率" }],
  databit: [{ required: true, message: "请输入数据位" }],
  checkbit: [{ required: true, message: "请输入检验位" }],
  stopbit: [{ required: true, message: "请输入停止位" }],
  dateOfManufacture: [{ required: true, message: "请输入出厂日期" }],
  installationDate: [{ required: true, message: "请输入安装日期" }],
  activationDate: [{ required: true, message: "请输入启用日期" }],
  specification: [{ required: true, message: "请输入规格型号" }],
  faulttype: [{ required: true, message: "请输入故障类型号" }],
  startTime: [{ required: true, message: "请输入开始时间" }],
  endTime: [{ required: true, message: "请输入结束时间" }],
  location: [{ required: true, message: "请输入安装位置" }]
});

// 提交楼栋信息
const submitEvent = () => {
  submitLoading.value = true;
  // showbaidumap.value = false
  setTimeout(() => {
    const $table = xTable.value;
    if ($table) {
      submitLoading.value = false;
      showEdit.value = false;
      if (selectRow.value) {
        // console.log(householdData, "编辑表单数据");
        largemeterfix((selectRow.value as any)._id, householdData).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "保存成功", status: "success" });
            // Object.assign(selectRow.value, householdData);
            getlargemeterList();
          }
        });
      } else {
        // collectoradd(householdData).then(res => {
        //   if (res.retcode == 200) {
        //     VXETable.modal.message({ content: "新增成功", status: "success" });
        //     // getcollectorList();
        //   }
        // });
        // $table.insert({ ...householdData });
        largemeteradd(householdData).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "新增成功", status: "success" });
          }
        });
        $table.insert({ ...householdData });
      }
    }
  }, 500);
};
const xTable = ref<VxeTableInstance<RowVO>>();

// 改变小区
// const changeArea = val => {
//   console.log(val, "选中的小区");
//   if (val == "福鼎家园") {
//     // (tableData as any).value = fdData;
//   } else {
//     // (tableData as any).value = [];
//   }
// };

// 获取区域信息
// const selectRegion = ref([]);
// const getregion = () => {
//   const data = {
//     page: 1,
//     pageSize: 1000
//   };
//   getlist(data).then(res => {
//     console.log(res.data, "区域数据");
//     if (res.retcode == 200) {
//       selectRegion.value = res.data.data;
//     }
//   });
// };

// 获取全部水司信息
// const companyed = ref("");
// const selectCompany = ref([]);
// const getcompanyed = () => {
//   getcompany().then(res => {
//     if (res.retcode == 200) {
//       // console.log(res.data, "res.data");
//       selectCompany.value = res.data;
//     }
//   });
// };

// 修改水司查询区域信息
// const selectRegion = ref([]);
// const changeCompany = () => {
//   let params = "";
//   showEdit.value == true
//     ? (params = householdData.company)
//     : (params = companyed.value);
//   getregion(params).then(res => {
//     if (res.retcode == 200) {
//       selectRegion.value = res.data;
//       if (showEdit.value == false) {
//         gethouseholdList();
//       }
//     }
//   });
// };
// 筛选表格清除
// const clearCompany = () => {
//   console.log("清空表单");
//   regioned.value = "";
//   area.value = "";
//   selectVillage.value = [];
//   builded.value = "";
//   selectBuild.value = [];
// };
// 筛选表单清除
// const clearAddFrom = () => {
//   householdData.company = "";
//   householdData.region = "";
//   householdData.village = "";
//   householdData.buildingnumber = "";
//   selectRegion.value = [];
//   selectVillage.value = [];
//   selectBuild.value = [];
// };

// 修改区域信息查询小区信息
// const selectVillage = ref([]);
// const changeRegion = () => {
//   const data = { region: "" };
//   showEdit.value == true
//     ? (data.region = householdData.region)
//     : (data.region = regioned.value);
//   // const data = {
//   //   village: regioned.value
//   // };
//   getvillage(data).then(res => {
//     selectVillage.value = res.data;
//     // console.log(selectVillage.value, "小区下拉菜单");
//   });
// };

// 修改小区查询楼栋信息
// const selectBuild = ref([]);
// const changeVillage = () => {
//   const data = {
//     page: 1,
//     pageSize: 1000,
//     keyword: ""
//   };
//   showEdit.value == true
//     ? (data.keyword = householdData.village)
//     : (data.keyword = area.value);

//   getbuild(data).then(res => {
//     selectBuild.value = res.data.data;
//   });
// };

// 楼栋信息
// const builded = ref("");

// 分页
const pageVO2 = reactive({
  currentPage: 1,
  total: 0
});

const toolbarRef = ref<VxeToolbarInstance>();
nextTick(() => {
  setTimeout(() => {
    // 将表格和工具栏进行关联
    const $table = xTable.value;
    const $toolbar = toolbarRef.value;
    if ($table && $toolbar) {
      $table.connect($toolbar);
    }
  }, 1000);
});

// const CompanyKeyword = ref(""); // 搜索水司关键词
// const RegionKeyword = ref(""); // 搜索区域关键词
// const VillageKeyword = ref(""); // 搜索小区关键词
// const BuildKeyword = ref(""); // 搜索楼栋关键词
// const collectorKeyword = ref(""); // 搜索采集器关键词

// 获取全部水司信息
// const companys = ref([]);
// interface ListItem {
//   value: string;
//   label: string;
// }
// const searchCompanysList = ref<ListItem[]>([]);
// const loading = ref(false); // 搜索加载状态
// const searchCompanyoptions = ref<ListItem[]>([]); // 列表数据

// // 获取全部水司信息，在不做任何输入时显示
// const getallCompany = () => {
//   const data = {
//     company: "",
//     region: ""
//   };
//   getcompany(data).then(res => {
//     if (res.retcode == 200) {
//       companys.value = res.data.data;
//       searchCompanysList.value = companys.value.map(item => {
//         return { value: item._id, label: item.name };
//       });
//     }
//   });
// };

// 输入水司方法
// const remoteCompany = useDebounceFn((query: string) => {
//   if (query) {
//     loading.value = true;
//     console.log(query, "搜索水司名称入参");
//     // 调用查询接口
//     const data = {
//       company: query
//     };
//     getcompany(data).then(res => {
//       if (res.retcode == 200) {
//         loading.value = false;
//         searchCompanyoptions.value = res.data.data.map(item => {
//           return { value: item._id, label: item.name };
//         });
//       }
//     });
//   } else {
//     searchCompanyoptions.value = searchCompanysList.value;
//   }
// }, 500);

// 获取全部区域信息
// const regions = ref([]);
// const searchRegionList = ref<ListItem[]>([]);
// const searchRegionloading = ref(false); // 搜索加载状态
// const searchRegionoptions = ref<ListItem[]>([]); // 列表数据

// 输入区域方法
// const remoteRegion = useDebounceFn((query: string, isform) => {
//   if (query) {
//     searchRegionloading.value = true;
//     const data = {
//       company: isform == "true" ? householdData.company : CompanyKeyword.value,
//       region: query
//     };
//     getregion(data).then(res => {
//       if (res.retcode == 200) {
//         searchRegionloading.value = false;
//         searchRegionoptions.value = res.data.data.map(item => {
//           return { value: item._id, label: item.name };
//         });
//       } else {
//         searchRegionoptions.value = searchRegionList.value;
//       }
//     });
//   }
// }, 500);

// 获取全部小区信息
// const village = ref([]);
// const searchVillageList = ref<ListItem[]>([]);
// const searchVillageloading = ref(false); // 搜索加载状态
// const searchVillageoptions = ref<ListItem[]>([]); // 列表数据

// 输入小区方法
// const remoteVillage = useDebounceFn((query: string, isform) => {
//   if (query) {
//     searchVillageloading.value = true;
//     const data = {
//       page: 1,
//       pageSize: 1000,
//       company: isform == "true" ? householdData.company : CompanyKeyword.value,
//       region: isform == "true" ? householdData.region : RegionKeyword.value,
//       village: query
//     };
//     getlist(data).then(res => {
//       if (res.retcode == 200) {
//         searchVillageloading.value = false;
//         searchVillageoptions.value = res.data.data.map(item => {
//           return { value: item._id, label: item.village };
//         });
//       } else {
//         searchVillageoptions.value = searchVillageList.value;
//       }
//     });
//   }
// }, 500);

// 获取全部楼栋信息
// const searchBuildList = ref<ListItem[]>([]);
// const searchBuildloading = ref(false); // 搜索加载状态
// const searchBuildoptions = ref<ListItem[]>([]); // 列表数据
// 输入楼栋方法
// const remoteBuild = useDebounceFn((query: string, isform) => {
//   if (query) {
//     searchBuildloading.value = true;
//     const data = {
//       page: 1,
//       pageSize: 1000,
//       company: isform == "true" ? householdData.company : CompanyKeyword.value,
//       region: isform == "true" ? householdData.region : RegionKeyword.value,
//       village: isform == "true" ? householdData.village : VillageKeyword.value,
//       buildnumber: query
//     };
//     getbuild(data).then(res => {
//       if (res.retcode == 200) {
//         searchBuildloading.value = false;
//         searchBuildoptions.value = res.data.data.map(item => {
//           return { value: item._id, label: item.buildnumber };
//         });
//       } else {
//         searchBuildoptions.value = searchBuildList.value;
//       }
//     });
//   }
// }, 500);

// 获取所属采集器信息
// const searchCollectorOptions = ref([]);

// 搜索水司关键词
const companyKey = ref(""); // 所属水司搜索词
const companyKeyList = ref([]); // 所属水司搜索列表
// 查询水司列表信息
const searchCompanyList = () => {
  const data = {
    company: ""
  };
  getcompany(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      companyKeyList.value = res.data.data.map(item => {
        return { value: item.name, label: item.name };
      });
    }
  });
};
// 清除查询水司关键词
const clearCompanyKey = () => {
  companyKey.value = "";
  regionKey.value = "";
  CommunityKey.value = "";
  buildKey.value = "";
  getlargemeterList();
};

const regionKey = ref(""); // 区域搜索词
const regionKeyList = ref([]); // 区域搜索列表
// 查询区域列表信息
const searchRegionList = type => {
  // true为表格筛选，false为表单筛选
  // console.log(householdData.value, "表单选择的水司");
  const data = {
    company: type === true ? companyKey.value : householdData.company,
    region: ""
  };
  getregion(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      regionKeyList.value = res.data.data.map(item => {
        return { value: item.name, label: item.name };
      });
    }
  });
};
// 清除区域关键词
const clearRegionKey = () => {
  regionKey.value = "";
  CommunityKey.value = "";
  buildKey.value = "";
  getlargemeterList();
};

const CommunityKey = ref(""); // 小区搜索词
const communityKeyList = ref([]); // 小区搜索列表
// 查询小区列表信息
const searchCommunityList = type => {
  // true为表格筛选，false为表单筛选
  console.log(householdData, "表单选择的小区");
  const data = {
    company: type === true ? companyKey.value : householdData.company,
    region: type === true ? regionKey.value : householdData.region,
    village: ""
  };
  getlist(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      communityKeyList.value = res.data.data.map(item => {
        return { value: item.village, label: item.village };
      });
    }
  });
};
// 清除小区关键词
const clearCommunityKey = () => {
  CommunityKey.value = "";
  buildKey.value = "";
  getlargemeterList();
};

const buildKey = ref(""); // 楼栋搜索词
const buildKeyList = ref([]); // 楼栋搜索列表
// 查询楼栋列表信息
const searchBuildList = type => {
  // true为表格筛选，false为表单筛选
  console.log(householdData, "表单选择的小区");
  const data = {
    company: type === true ? companyKey.value : householdData.company,
    region: type === true ? regionKey.value : householdData.region,
    village: type === true ? CommunityKey.value : householdData.village,
    buildnumber: type === true ? buildKey.value : householdData.buildingnumber
  };
  getbuild(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      buildKeyList.value = res.data.data.map(item => {
        return { value: item.buildnumber, label: item.buildnumber };
      });
    }
  });
};
// 清除楼栋关键词
const clearBuildKey = () => {
  buildKey.value = "";
  getlargemeterList();
};

const collectorKey = ref(""); // 采集器搜索关键词
const collectorKeyList = ref([]); // 采集器搜索列表
// 查询采集器列表信息
const searchCollectorList = type => {
  const data = {
    company: type === true ? companyKey.value : householdData.company,
    region: type === true ? regionKey.value : householdData.region,
    village: type === true ? CommunityKey.value : householdData.village,
    buildnumber: type === true ? buildKey.value : householdData.buildingnumber,
    collectorBelong:
      type === true ? collectorKey.value : householdData.collectorBelong
  };
  getcollector(data).then(res => {
    // console.log(res.data);
    if (res.retcode == 200) {
      collectorKeyList.value = res.data.data.map(item => {
        return { value: item.collectroId, label: item.collectroId };
      });
    }
  });
};
// 清除采集器关键词

const table = ref(false); // 控制右侧协议列表隐藏展示
const agreementData = ref([]); // 协议信息列表
// 打开右侧协议信息
const openright = () => {
  table.value = true;
  // 打开协议信息
  const data = {
    page: 1,
    pageSize: 1000,
    manufacturerName: ""
  };
  getagreement(data).then(res => {
    if (res.retcode == 200) {
      agreementData.value = res.data.data;
    }
  });
};

// 搜索生产厂家列表
const searchManufactureList = () => {
  const data = {
    page: 1,
    pageSize: 1000,
    manufacturerName: ""
  };
  getagreement(data).then(res => {
    if (res.retcode == 200) {
      manufacturerList.value = res.data.data.map(item => {
        return { value: item.encode, label: item.encode };
      });
    }
  });
};

interface RowCompany {
  id: number;
  manufacturerName: string;
  encode: number;
  type: string;
}
const cTable = ref<VxeTableInstance<RowCompany>>();
// 增加协议信息
const insertAgreement = async (row?: RowCompany | number) => {
  const $table = cTable.value;
  if ($table) {
    const record = {
      manufacturerName: "默认厂家名称",
      encode: "默认协议编码",
      type: "默认类型"
    };
    const { row: newRow } = await $table.insertAt(record, row);
    await $table.setEditCell(newRow, "name");
  }
};

// 保存协议表格
const saveEvent = () => {
  const $table = cTable.value;
  if ($table) {
    const { insertRecords, removeRecords, updateRecords } =
      $table.getRecordset();
    // 增加的信息，移除的信息，更新的信息
    console.log(insertRecords, "insertRecordstype");
    const insert = JSON.parse(JSON.stringify(insertRecords));
    const remove = JSON.parse(JSON.stringify(removeRecords));
    const update = JSON.parse(JSON.stringify(updateRecords));
    let count = 0;
    if (insert.length > 0) {
      insert.forEach(item => {
        count++;
        if (item.manufacturerName == "默认厂家名称") {
          return ElMessage.error("请修改默认厂家名称!");
        } else if (item.manufacturerName.length == 0) {
          return ElMessage.error("默认厂家名称不能为空!");
        } else if (count === insert.length) {
          // console.log(insert, "insert"); // 数组
          agreementadd(insert).then(res => {
            if (res.retcode == 200) {
              ElMessage.success(`${res.message}`);
              const data = {
                page: 1,
                pageSize: 1000,
                manufacturerName: ""
              };
              getagreement(data).then(res => {
                if (res.retcode == 200) {
                  agreementData.value = res.data.data;
                } else {
                  ElMessage.error("新增失败，请确认水司名称是否重复！");
                }
              });
            }
          });
        }
      });
    }
    if (remove.length > 0) {
      const deleteDatas = [];
      remove.forEach(item => {
        deleteDatas.push(item._id);
      });
      const ids = deleteDatas.toString();
      agreementdelete(ids).then(res => {
        if (res.retcode == 200) {
          ElMessage.success(`${res.message}`);
          const data = {
            page: 1,
            pageSize: 1000,
            manufacturerName: ""
          };
          getagreement(data).then(res => {
            if (res.retcode == 200) {
              agreementData.value = res.data.data;
            }
          });
        }
      });
    }
    if (update.length > 0) {
      const data = {
        name: update
      };
      agreementfix(data).then(res => {
        if (res.retcode == 200) {
          ElMessage.success(`${res.message}`);
          const data = {
            page: 1,
            pageSize: 1000,
            manufacturerName: ""
          };
          getagreement(data).then(res => {
            if (res.retcode == 200) {
              agreementData.value = res.data.data;
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-main {
  height: 100%;
}

.baidu-map {
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.m-2 {
  width: 140px;
}

.m-3 {
  width: 140px;
  margin: 0 !important;
}

.icon-price:hover {
  fill: #53a7ff;
}
// ::v-deep(.timetip) {
//   z-index: 9999999999999;
// }
::v-deep .vxe-select {
  width: 110px;
}
</style>
