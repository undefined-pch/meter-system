<template>
  <div class="table-main">
    <div class="table-main">
      <vxe-toolbar custom ref="toolbarRef">
        <template #buttons>
          水司：
          <el-select
            v-model="CompanyKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的水司名称"
            :remote-method="remoteCompany"
            :loading="loading"
            @change="searchEffortList"
            style="width: 120px; margin-right: 10px"
          >
            <el-option
              v-for="item in searchCompanyoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          区域名称：
          <el-select
            v-model="RegionKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的区域名称"
            :remote-method="query => remoteRegion(query, 'false')"
            :loading="searchRegionloading"
            style="width: 120px; margin-right: 10px"
            @change="searchRegionLists"
          >
            <el-option
              v-for="item in searchRegionoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          小区名称：
          <el-select
            v-model="VillageKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的小区名称"
            :remote-method="query => remoteVillage(query, 'false')"
            :loading="searchVillageloading"
            style="width: 120px; margin-right: 10px"
            @change="searchVillageLists"
          >
            <el-option
              v-for="item in searchVillageoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          楼栋号：
          <el-select
            v-model="BuildKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的楼栋名称"
            style="width: 120px; margin-right: 10px"
            @change="searchBuildLists"
          >
            <el-option
              v-for="item in searchBuildoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          采集器:&nbsp;&nbsp;
          <el-select
            v-model="collectorKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的楼栋名称"
            style="width: 120px; margin-right: 10px"
            @change="searchBuildLists"
          >
            <el-option
              v-for="item in searchCollectorOptions"
              :key="item._id"
              :label="item.collectroId"
              :value="item.collectroId"
            />
          </el-select>
        </template>
        <template #tools>
          <el-button type="primary" @click="addBuild" style="margin-left: 10px"
            >新增</el-button
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
                <el-select
                  v-model="data.company"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入水司名称"
                  :remote-method="remoteCompany"
                  :loading="loading"
                  @change="searchEffortList"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in searchCompanyoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="region"
              title="区域名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.region"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入区域名称"
                  :remote-method="query => remoteRegion(query, 'true')"
                  :loading="searchRegionloading"
                  style="width: 100%"
                  @change="searchRegionLists"
                >
                  <el-option
                    v-for="item in searchRegionoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="village"
              title="小区名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.village"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入小区名称"
                  :remote-method="query => remoteVillage(query, 'false')"
                  :loading="searchVillageloading"
                  style="width: 100%"
                  @change="searchVillageLists"
                >
                  <el-option
                    v-for="item in searchVillageoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="buildingnumber"
              title="楼栋编号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.buildingnumber"
                  clearable
                  placeholder="请选择楼栋编号"
                  style="width: 100%"
                  @change="searchBuildLists"
                >
                  <el-option
                    v-for="item in searchBuildoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="collectorBelong"
              title="所属采集器"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.collectorBelong"
                  class="m-3"
                  placeholder="请输入所属采集器"
                >
                  <el-option
                    v-for="item in searchCollectorOptions"
                    :key="item._id"
                    :label="item.collectroId"
                    :value="item.collectroId"
                  />
                </el-select>
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
                <el-select
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
                </el-select>
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
                <vxe-button type="button">配置下发</vxe-button>
                <vxe-button type="submit">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>
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
import { useDebounceFn } from "@vueuse/core";
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
import { getcollector } from "@/api/collector";

// 生产厂家
const manufacturerList = ref([
  { id: 1, name: "水表" },
  { id: 2, name: "NB水表" },
  { id: 3, name: "NB水表804" },
  { id: 4, name: "NB水表803" },
  { id: 5, name: "yy" },
  { id: 6, name: "NB水表805" },
  { id: 7, name: "600" },
  { id: 8, name: "100" },
  { id: 9, name: "808" },
  { id: 10, name: "806" },
  { id: 11, name: "798" },
  { id: 12, name: "797" }
]);

onMounted(() => {
  // isformArea();
  // getregion();
  getallCompany();
  // getcompanyed();
  getlargemeterList(); // 获取全部大表信息
});

// const serchcompany = ref("");
const getlargemeterList = () => {
  const data = {
    page: 1,
    pageSize: 10,
    company: rgcompany.value,
    region: rgregion.value,
    village: rgvillage.value,
    buildingnumber: rgbuild.value,
    collectorBelong: rgcollector.value
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
  // 将表格和工具栏进行关联
  const $table = xTable.value;
  const $toolbar = toolbarRef.value;
  if ($table && $toolbar) {
    $table.connect($toolbar);
  }
});

const CompanyKeyword = ref(""); // 搜索水司关键词
const RegionKeyword = ref(""); // 搜索区域关键词
const VillageKeyword = ref(""); // 搜索小区关键词
const BuildKeyword = ref(""); // 搜索楼栋关键词
const collectorKeyword = ref(""); // 搜索采集器关键词

// 获取全部水司信息
const companys = ref([]);
interface ListItem {
  value: string;
  label: string;
}
const searchCompanysList = ref<ListItem[]>([]);
const loading = ref(false); // 搜索加载状态
const searchCompanyoptions = ref<ListItem[]>([]); // 列表数据

// 获取全部水司信息，在不做任何输入时显示
const getallCompany = () => {
  const data = {
    company: "",
    region: ""
  };
  getcompany(data).then(res => {
    if (res.retcode == 200) {
      companys.value = res.data.data;
      searchCompanysList.value = companys.value.map(item => {
        return { value: item._id, label: item.name };
      });
    }
  });
};

// 输入水司方法
const remoteCompany = useDebounceFn((query: string) => {
  if (query) {
    loading.value = true;
    console.log(query, "搜索水司名称入参");
    // 调用查询接口
    const data = {
      company: query
    };
    getcompany(data).then(res => {
      if (res.retcode == 200) {
        loading.value = false;
        searchCompanyoptions.value = res.data.data.map(item => {
          return { value: item._id, label: item.name };
        });
      }
    });
  } else {
    searchCompanyoptions.value = searchCompanysList.value;
  }
}, 500);

// 获取全部区域信息
// const regions = ref([]);
const searchRegionList = ref<ListItem[]>([]);
const searchRegionloading = ref(false); // 搜索加载状态
const searchRegionoptions = ref<ListItem[]>([]); // 列表数据

// 输入区域方法
const remoteRegion = useDebounceFn((query: string, isform) => {
  if (query) {
    searchRegionloading.value = true;
    const data = {
      company: isform == "true" ? householdData.company : CompanyKeyword.value,
      region: query
    };
    getregion(data).then(res => {
      if (res.retcode == 200) {
        searchRegionloading.value = false;
        searchRegionoptions.value = res.data.data.map(item => {
          return { value: item._id, label: item.name };
        });
      } else {
        searchRegionoptions.value = searchRegionList.value;
      }
    });
  }
}, 500);

// 获取全部小区信息
// const village = ref([]);
const searchVillageList = ref<ListItem[]>([]);
const searchVillageloading = ref(false); // 搜索加载状态
const searchVillageoptions = ref<ListItem[]>([]); // 列表数据

// 输入小区方法
const remoteVillage = useDebounceFn((query: string, isform) => {
  if (query) {
    searchVillageloading.value = true;
    const data = {
      page: 1,
      pageSize: 1000,
      company: isform == "true" ? householdData.company : CompanyKeyword.value,
      region: isform == "true" ? householdData.region : RegionKeyword.value,
      village: query
    };
    getlist(data).then(res => {
      if (res.retcode == 200) {
        searchVillageloading.value = false;
        searchVillageoptions.value = res.data.data.map(item => {
          return { value: item._id, label: item.village };
        });
      } else {
        searchVillageoptions.value = searchVillageList.value;
      }
    });
  }
}, 500);

// 获取全部楼栋信息
// const searchBuildList = ref<ListItem[]>([]);
// const searchBuildloading = ref(false); // 搜索加载状态
const searchBuildoptions = ref<ListItem[]>([]); // 列表数据
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

const rgcompany = ref(""); // 入参水司
const rgregion = ref(""); // 入参区域
const rgvillage = ref(""); // 入参小区
const rgbuild = ref(""); // 查询大表入参楼栋
const rgcollector = ref(""); // 查询大表入参采集器
// 根据水司查询小区信息
const searchEffortList = val => {
  // console.log(val, "水司关键词");
  // 入参水司，请求楼栋数据
  rgcompany.value = val;
  getlargemeterList();
};

// 根据水司-区域查询小区信息
const searchRegionLists = val => {
  rgregion.value = val;
  getlargemeterList();
};

// 根据水司-区域-小区模糊搜索查询小区信息
const searchVillageLists = val => {
  rgvillage.value = val;
  console.log("获取楼栋信息", val);
  getlargemeterList();
};

// 根据水司-区域-小区-楼栋号模糊搜索查询小区信息
const searchBuildLists = val => {
  rgbuild.value = val;
  getlargemeterList();
  // 获取该楼栋下的采集器信息
  const data = {
    page: 1,
    pageSize: 1000,
    company: rgcompany.value,
    region: rgregion.value,
    village: rgvillage.value,
    buildingnumber: rgbuild.value,
    collector: ""
  };
  getcollector(data).then(res => {
    // console.log(res.data, "获取的采集器信息");
    searchCollectorOptions.value = res.data.data;
  });
};

// 获取所属采集器信息
const searchCollectorOptions = ref([]);
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
</style>
