<template>
  <div class="meterArchives">
    <Transition>
      <el-alert
        v-if="isShowBatchresult"
        :title="BatchresultTitle"
        :type="BatchresultType"
        :description="BatchresultInfo"
        show-icon
        style="
          position: fixed;
          top: 5%;
          z-index: 999;
          width: 50%;
          margin-left: -100px;
        "
      />
    </Transition>
    <div class="open_tip">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="打开区域信息"
        placement="left"
      >
        <img
          src="@/assets/tipopen.png"
          style="height: 74px"
          @click="changeRegionList('open')"
          v-if="isShowTop"
        />
      </el-tooltip>
    </div>
    <div class="meterArchives_table">
      <div class="menu">
        <div class="content">
          <el-row :gutter="12">
            <el-col :span="leftItemWidth">
              <el-card class="box-card">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  style="height: 40px; border-radius: 5px"
                >
                  <el-menu-item index="1" id="info-btn1">采集器</el-menu-item>
                  <el-menu-item index="2" id="info-btn3">水表</el-menu-item>
                  <el-menu-item index="3">热表</el-menu-item>
                  <el-menu-item index="4" id="info-btn2">房间信息</el-menu-item>
                  <!-- <el-menu-item index="5">业主信息</el-menu-item> -->
                </el-menu>
                <div class="collector_content" v-if="showCollector">
                  <vxe-toolbar ref="toolbarRef" export print custom>
                    <template #buttons>
                      <el-button @click="addPrice" type="primary" plain
                        >添加</el-button
                      >
                      <el-button @click="batchCollector" type="primary" plain
                        >批量导入</el-button
                      >
                      <el-button type="danger" plain>批量删除</el-button>
                    </template>
                  </vxe-toolbar>
                  <div style="height: calc(100vh - 290px)">
                    <vxe-table
                      class="mytable-scrollbar"
                      show-header-overflow
                      show-overflow
                      :row-config="{ isHover: true }"
                      :data="tableData"
                      :column-config="{ resizable: true }"
                      size="small"
                      height="auto"
                    >
                      <vxe-column type="checkbox" width="60" fixed="left" />
                      <vxe-column
                        field="collectroId"
                        title="采集器编号"
                        width="110"
                        fixed="left"
                        sortable
                      />
                      <vxe-column
                        field="fullRegion"
                        title="所属区域"
                        width="140"
                      />
                      <vxe-column
                        field="workMode"
                        title="工作模式"
                        width="90"
                      />
                      <vxe-column
                        field="addressType"
                        title="地址类型"
                        width="90"
                      />
                      <vxe-column
                        field="mainConnect"
                        title="总表连接方式"
                        width="110"
                      />
                      <vxe-column
                        field="collectorCycle"
                        title="采集周期（小时）"
                        width="100"
                        sortable
                      />
                      <vxe-column
                        field="serverAddress"
                        title="服务器地址"
                        width="110"
                      />
                      <vxe-column
                        field="serverPort"
                        title="服务器端口"
                        width="110"
                      />
                      <vxe-column
                        field="middlewareAddress"
                        title="中间件地址"
                        width="110"
                      />
                      <vxe-column
                        field="middlewarePort"
                        title="中间件端口"
                        width="110"
                      />
                      <vxe-column
                        field="dateOfManufacture"
                        title="出厂日期"
                        width="110"
                      />
                      <vxe-column
                        field="installationDate"
                        title="安装日期"
                        width="110"
                      />
                      <vxe-column
                        field="activationDate"
                        title="启用日期"
                        width="110"
                      />
                      <vxe-column field="SIMcard" title="SIM卡" width="110" />
                      <vxe-column
                        field="startTime"
                        title="开始日期"
                        width="110"
                      />
                      <vxe-column
                        field="endTime"
                        title="结束日期"
                        width="110"
                      />
                      <vxe-column field="founder" title="创建人" width="110" />
                      <vxe-column field="date" title="创建时间" width="110" />
                      <vxe-column field="notes" title="备注" width="130" />
                      <vxe-column
                        title="操作"
                        width="110"
                        fixed="right"
                        align="center"
                      >
                        <template #default>
                          <vxe-button type="text" status="primary"
                            >修改</vxe-button
                          >
                          <vxe-button type="text" status="danger"
                            >删除</vxe-button
                          >
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
                </div>
                <div
                  class="water_content"
                  v-if="showWaterContent"
                  style="width: 100%"
                >
                  <meterInfo />
                </div>
                <div class="fire_content" v-if="showFireContent">热表信息</div>
                <div class="fire_content" v-if="showHouse">
                  <roomInfo
                    :selectedRegionId="selectedRegionId"
                    ref="roomInfoComponent"
                  />
                </div>
                <div class="fire_content" v-if="showOwner">
                  <owner />
                </div>
              </el-card>
            </el-col>
            <el-col :span="regionWidth">
              <el-card class="region_list">
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
    </div>
    <!-- 新增采集器弹框 -->
    <el-dialog
      v-model="addCollectorVisible"
      title="新增采集器"
      width="44%"
      top="1%"
    >
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="所属区域"
              :label-width="formLabelWidth"
              prop="region"
            >
              <el-tree-select
                v-model="form.region"
                :props="props"
                :data="batchSameList"
                :load="loadFireNode"
                lazy
                node-key="id"
                check-strictly
                :render-after-expand="false"
                placeholder="请选择所属区域"
                class="region_select" /></el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="采集器编号"
              :label-width="formLabelWidth"
              prop="collectroId"
            >
              <el-input
                v-model="form.collectroId"
                autocomplete="off"
                placeholder="请输入9位采集器编号"
                ><template #suffix>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="采集器编号为9位数字"
                    placement="top"
                    ><img
                      src="@/assets/feescheme/tip.png"
                      alt=""
                      style="width: 18px"
                  /></el-tooltip> </template
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="工作模式"
              :label-width="formLabelWidth"
              prop="workMode"
            >
              <!-- <el-input v-model="form.workMode" autocomplete="off" /> -->
              <el-select v-model="form.workMode" placeholder="请选择工作模式">
                <el-option
                  v-for="item in workModeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="地址类型"
              :label-width="formLabelWidth"
              prop="addressType"
            >
              <!-- <el-input v-model="form.addressType" autocomplete="off" /> -->
              <el-select
                v-model="form.addressType"
                placeholder="请选择地址类型"
              >
                <el-option
                  v-for="item in addressTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="总表连接方式"
              :label-width="formLabelWidth"
              prop="mainConnect"
            >
              <!-- <el-input v-model="form.mainConnect" autocomplete="off" />
               -->
              <el-select
                v-model="form.mainConnect"
                placeholder="请选择总表连接方式"
              >
                <el-option
                  v-for="item in mainConnectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="采集器周期（小时）"
              :label-width="formLabelWidth"
              prop="collectorCycle"
            >
              <!-- <el-input v-model="form.collectorCycle" autocomplete="off" /> -->
              <el-select
                v-model="form.collectorCycle"
                placeholder="采集器周期（小时）"
              >
                <el-option
                  v-for="item in collectorCycleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="服务器地址"
              :label-width="formLabelWidth"
              prop="serverAddress"
            >
              <el-input
                v-model="form.serverAddress"
                autocomplete="off"
                placeholder="请输入服务器地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="服务器端口"
              :label-width="formLabelWidth"
              prop="serverPort"
            >
              <el-input
                v-model="form.serverPort"
                autocomplete="off"
                placeholder="请输入服务器端口"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="中间件地址"
              :label-width="formLabelWidth"
              prop="middlewareAddress"
            >
              <el-input
                v-model="form.middlewareAddress"
                autocomplete="off"
                placeholder="请输入中间件地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="中间件端口"
              :label-width="formLabelWidth"
              prop="middlewarePort"
            >
              <el-input
                v-model="form.middlewarePort"
                autocomplete="off"
                placeholder="请输入中间件端口"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="出厂日期"
              :label-width="formLabelWidth"
              prop="dateOfManufacture"
            >
              <!-- <el-input v-model="form.dateOfManufacture" autocomplete="off" /> -->
              <el-date-picker
                v-model="form.dateOfManufacture"
                placeholder="请选择出厂日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="安装日期"
              :label-width="formLabelWidth"
              prop="installationDate"
            >
              <!-- <el-input v-model="form.installationDate" autocomplete="off" /> -->
              <el-date-picker
                v-model="form.installationDate"
                placeholder="请选择安装日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="启用日期"
              :label-width="formLabelWidth"
              prop="activationDate"
            >
              <!-- <el-input v-model="form.activationDate" autocomplete="off" /> -->
              <el-date-picker
                v-model="form.activationDate"
                placeholder="请选择启用日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="SIM卡号"
              :label-width="formLabelWidth"
              prop="SIMcard"
            >
              <el-input
                v-model="form.SIMcard"
                autocomplete="off"
                placeholder="请输入SIM卡号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="开始日期"
              :label-width="formLabelWidth"
              prop="startTime"
            >
              <!-- <el-input v-model="form.startTime" autocomplete="off" /> -->
              <el-date-picker
                v-model="form.startTime"
                placeholder="请选择开始日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="结束日期"
              :label-width="formLabelWidth"
              prop="endTime"
            >
              <!-- <el-input v-model="form.endTime" autocomplete="off" /> -->
              <el-date-picker
                v-model="form.endTime"
                placeholder="请选择结束日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="安装位置"
              :label-width="formLabelWidth"
              prop="installPosition"
            >
              <el-input
                v-model="form.installPosition"
                autocomplete="off"
                placeholder="请输入安装位置"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="备注"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input
                v-model="form.notes"
                type="textarea"
                autocomplete="off"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCollectorVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 批量导入采集器 -->
    <el-dialog
      v-model="batchCollectorVisible"
      title="批量导入采集器"
      width="25%"
    >
      <el-form :model="batchForm" ref="batchFormRef">
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板文件" :label-width="80">
              <el-button type="primary">下载模板</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属区域" :label-width="80">
              <el-tree-select
                v-model="batchForm.region"
                :props="props"
                :data="batchSameList"
                :load="loadFireNode"
                lazy
                node-key="id"
                check-strictly
                :render-after-expand="false"
                class="region_select"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-form-item label="选择文件" :label-width="80">
            <el-upload
              ref="upload"
              class="upload-demo"
              action=""
              :limit="1"
              :on-exceed="handleExceed"
              :auto-upload="false"
              :on-change="onUploadChange"
            >
              <template #trigger>
                <el-button type="primary" :disabled="showUpload"
                  >选取文件</el-button
                >
              </template>
              <el-button
                class="ml-3"
                type="success"
                :disabled="showUpload"
                @click="submitUpload"
              >
                上传
              </el-button>
              <template #tip>
                <div class="el-upload__tip text-red">
                  <p>选择区域后选取文件</p>
                  只允许上传1个xlsx文件
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchCollectorVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <Tour
      :steps="steps"
      mask
      arrow
      v-model:show="show"
      v-model:current="current"
      :padding="{ x: 10, y: 6 }"
      :global-theme-overrides="{
        common: {
          primaryColor: '#e6a23c'
        }
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, Ref } from "vue";
import { ElMessage, genFileId, ElLoading } from "element-plus";
import { allregion } from "@/api/allregion.js";
import {
  getcollector,
  collectoradd,
  batchCollectorExcel
} from "@/api/collector.js";
import meterInfo from "./meterInfo.vue";
import roomInfo from "./roomInfo.vue";
import owner from "./owner.vue";
import { Tour, TourStep } from "vue3-quick-tour";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const showCollector = ref(true); // 展示采集器内容
const showWaterContent = ref(false); // 展示水表内容
const showFireContent = ref(false); // 展示热表内容
const showHouse = ref(false); // 展示房间信息
const showOwner = ref(false); // 展示采集器内容
// 菜单选择
const activeIndex = ref("1");
const handleSelect = key => {
  // console.log(key, keyPath);
  switch (key) {
    case "1":
      showCollector.value = true;
      showWaterContent.value = false;
      showFireContent.value = false;
      showHouse.value = false;
      showOwner.value = false;
      if (selectedRegionId.value.length > 0) {
        getcollectorList(selectedRegionId.value);
      } else {
        getcollectorList();
      }
      break;
    case "2":
      showCollector.value = false;
      showWaterContent.value = true;
      showFireContent.value = false;
      showHouse.value = false;
      showOwner.value = false;
      break;
    case "3":
      showCollector.value = false;
      showWaterContent.value = false;
      showFireContent.value = true;
      showHouse.value = false;
      showOwner.value = false;
      break;
    case "4":
      showCollector.value = false;
      showWaterContent.value = false;
      showFireContent.value = false;
      showHouse.value = true;
      showOwner.value = false;
      break;
    case "5":
      showCollector.value = false;
      showWaterContent.value = false;
      showFireContent.value = false;
      showHouse.value = false;
      showOwner.value = true;
      break;
    default:
      break;
  }
};

// 表格信息
const tableData = ref([]);

// 表单重置
const clear = info => {
  const keys = Object.keys(info);
  const obj = {};
  keys.forEach(item => {
    obj[item] = "";
  });
  Object.assign(info, obj);
};

const addCollectorVisible = ref(false); //新增采集器弹框展示
// 新增采集器
const addPrice = () => {
  clear(form);
  addCollectorVisible.value = true;
};

const ruleFormRef = ref(); // 表单dom
const formLabelWidth = "150px"; // 表单文字宽度
// 新增表单
const form = reactive({
  region: "", // 所属区域
  collectroId: "", // 采集器编号
  workMode: "水表法", // 工作模式
  addressType: "ip地址", // 地址类型
  mainConnect: "独立", // 总表连接方式
  collectorCycle: "1", // 采集器周期
  serverAddress: "", // 服务器地址
  serverPort: "", // 服务器端口
  middlewareAddress: "", // 中间件地址
  middlewarePort: "", // 中间件端口
  dateOfManufacture: "", // 出厂日期
  installationDate: "", // 安装日期
  activationDate: "", // 启用日期
  SIMcard: "", // SIM卡号
  startTime: "", // 开始日期
  endTime: "", // 结束日期
  installPosition: "", // 采集周期
  notes: "",
  fullRegion: ""
});
// 同级表单规则
const rules = reactive<any>({
  region: [
    {
      required: true,
      message: "请选择区域",
      trigger: "blur"
    }
  ],
  collectroId: [
    {
      required: true,
      message: "请输入9位采集器编号",
      trigger: "blur",
      pattern: /^[0]?\d{9}$/
    },
    { min: 9, max: 9, message: "请输入9位数字", trigger: "blur" }
  ],
  workMode: [
    {
      required: true,
      message: "请输入工作模式",
      trigger: "blur"
    }
  ],
  addressType: [
    {
      required: true,
      message: "请输入地址类型",
      trigger: "blur"
    }
  ],
  mainConnect: [
    {
      required: true,
      message: "请选择总表连接方式",
      trigger: "blur"
    }
  ],
  collectorCycle: [
    {
      required: true,
      message: "请选择采集器周期（小时）",
      trigger: "blur"
    }
  ],
  serverAddress: [
    {
      required: true,
      message: "请输入服务器地址",
      trigger: "blur"
    }
  ],
  serverPort: [
    {
      required: true,
      message: "请输入服务器端口",
      trigger: "blur"
    }
  ],
  dateOfManufacture: [
    {
      required: true,
      message: "请输入出厂日期",
      trigger: "blur"
    }
  ],
  installationDate: [
    {
      required: true,
      message: "请输入安装日期",
      trigger: "blur"
    }
  ],
  activationDate: [
    {
      required: true,
      message: "请输入启用日期",
      trigger: "blur"
    }
  ],
  SIMcard: [
    {
      required: true,
      message: "请输入SIM卡号",
      trigger: "blur"
    }
  ],
  startTime: [
    {
      required: true,
      message: "请输入开始时间",
      trigger: "blur"
    }
  ],
  endTime: [
    {
      required: true,
      message: "请输入结束时间",
      trigger: "blur"
    }
  ],
  installPosition: [
    {
      required: true,
      message: "请输入安装位置",
      trigger: "blur"
    }
  ]
});
// 判断采集器id输入的是否为字符
// const fnShareCapacityInput = () => {
//   console.log(event.target.value, "event");
// };

// 工作模式列表
const workModeList = ref([{ id: 1, value: "水表法", label: "水表法" }]);
// 地址类型列表
const addressTypeList = ref([
  { id: 1, value: "ip地址", label: "ip地址" },
  { id: 2, value: "域名", label: "域名" }
]);
// 总表连接方式
const mainConnectList = ref([
  { id: 1, value: "独立", label: "独立" },
  { id: 2, value: "串联", label: "串联" },
  { id: 3, value: "并联", label: "并联" }
]);
// 采集周期
const collectorCycleList = ref([
  { id: 1, value: "1", label: "1" },
  { id: 2, value: "2", label: "2" },
  { id: 3, value: "3", label: "3" },
  { id: 4, value: "4", label: "4" },
  { id: 5, value: "6", label: "7" },
  { id: 6, value: "8", label: "8" },
  { id: 7, value: "12", label: "12" },
  { id: 8, value: "24", label: "24" }
]);

// const nowSelectRegion = ref(""); //当前选中的区域信息

// 当前所选择的区域
const selectedRegion = ref("");
const batchSameList = ref([]); // 所属区域树形
// 楼栋级树形选择
const props = {
  label: node => {
    return `${node.name}  -  ${node.type}`;
  },
  children: "child",
  // isLeaf: true
  isLeaf: data => {
    if (data.hasChild === false || data.type == "楼栋") {
      return true;
    } else {
      return false;
    }
  }
};
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
      if (res.retcode == 200) {
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

// 新增采集器
const submitForm = async formEl => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // console.log("新增成功");
      collectoradd(form).then(res => {
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          addCollectorVisible.value = false;
          getcollectorList();
          // console.log(demo3.tableData, "tableData");
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

const batchCollectorVisible = ref(false);
// 批量导入采集器
const batchCollector = () => {
  clear(batchForm);
  batchCollectorVisible.value = true;
};

// 获取采集器信息
const getcollectorList = (regionId?: String) => {
  if (regionId) {
    const data = {
      page: 1,
      pageSize: 100,
      vagueName: regionId
    };
    getcollector(data).then(res => {
      if (res.retcode == 200) {
        tableData.value = res.data.data;
      }
    });
  } else {
    const data = {
      page: 1,
      pageSize: 100
    };
    getcollector(data).then(res => {
      if (res.retcode == 200) {
        tableData.value = res.data.data;
      }
    });
  }
};

const leftItemWidth = ref(20); // 内容显示区
const regionWidth = ref(4); // 区域信息列表宽度
const isShowTop = ref(false);
// 展示隐藏区域信息列表
const changeRegionList = type => {
  isShowTop.value = !isShowTop.value;
  if (type == "close") {
    leftItemWidth.value = 24;
    regionWidth.value = 0;
  } else if (type == "open") {
    leftItemWidth.value = 20;
    regionWidth.value = 4;
  }
};

const treeNode = ref();
// const handleNodeClick = node => {
//   nowSelectRegion.value += "-" + node.name;
//   form.fullRegion = nowSelectRegion.value;
//   // console.log(form.region, "form.region");
// };

// 批量导入
const upload = ref<UploadInstance>(); // 上传框dom
const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const isShowBatchresult = ref(false);
const BatchresultType: Ref<any> = ref("");
const BatchresultTitle = ref("");
const BatchresultInfo = ref("");
// 上传文件
const submitUpload = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "批量导入中，请稍后......",
    background: "rgba(0, 0, 0, 0.7)"
  });
  // upload.value!.submit();
  batchCollectorExcel(formData).then(res => {
    if (res.retcode == 201) {
      // ElMessage({
      //   showClose: true,
      //   message: res.message,
      //   type: "success"
      // });
      BatchresultTitle.value = "部分上传成功";
      BatchresultType.value = "warning";
      BatchresultInfo.value = res.message;
      isShowBatchresult.value = true;
      batchCollectorVisible.value = false;
      loading.close();
      getcollectorList();
    } else if (res.retcode == 200) {
      BatchresultTitle.value = "上传成功";
      BatchresultType.value = "success";
      BatchresultInfo.value = res.message;
      isShowBatchresult.value = true;
      batchCollectorVisible.value = false;
      loading.close();
      getcollectorList();
    } else {
      ElMessage({
        showClose: true,
        message: res.message,
        type: "error"
      });
      batchCollectorVisible.value = false;
      loading.close();
      getcollectorList();
    }
  });
};

// 批量上传表单
// 新增表单
const batchForm = reactive({
  region: ""
});

const formData = new FormData();
const onUploadChange = item => {
  console.log(item, "上传文件信息");
  if (batchForm.region == "") {
    return ElMessage({
      showClose: true,
      message: "请先选择区域后导入文件！",
      type: "error"
    });
  }
  formData.delete("file");
  formData.delete("region");
  formData.append("file", item.raw);
  formData.append("region", batchForm.region);
};

// 分页相关
const currentPage4 = ref(4);
const pageSize4 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

const addCollectorList = ref([]);

// 漫游引导配置
const show = ref(false);
const current = ref(0);
// 漫游引导
const steps: TourStep[] = [
  {
    el: () => document.getElementById("info-btn1") as HTMLElement,
    title: "第一步：录入采集器信息",
    message: "将采集器信息关联到楼栋下",
    mask: {
      color: "rgba(0, 0, 0, .5)"
    },
    placement: "top"
  },
  {
    el: () => document.getElementById("info-btn2") as HTMLElement,
    title: "第二步：录入房间信息",
    message: "在楼栋下关联房间信息和住户信息",
    mask: {
      color: "rgba(0, 0, 0, .5)"
    },
    placement: "top"
  },
  {
    el: () => document.getElementById("info-btn3") as HTMLElement,
    title: "第三步：录入表阀信息",
    message: "关联采集器和房间等信息",
    mask: {
      color: "rgba(0, 0, 0, .5)"
    },
    placement: "top"
  }
];

const handleOpenTour = () => {
  current.value = 0;
  show.value = true;
};

const roomInfoComponent = ref(null); // 子组件dom
const selectedRegionId = ref(""); // 当前选中的区域id
// 选中区域信息的节点数据
const handleCheckChange = node => {
  console.log(node, "node");
  if (node.id) {
    selectedRegionId.value = node.id;
    if (showCollector.value == true) {
      const data = {
        page: 1,
        pageSize: 100,
        vagueName: node.id
      };
      getcollector(data).then(res => {
        if (res.retcode == 200) {
          tableData.value = res.data.data;
        }
      });
    } else if (showHouse.value == true) {
      // const data = {
      //   page: 1,
      //   pageSize: 100,
      //   vagueName: node.id
      // };
      // getroom(data).then(res => {
      //   if (res.retcode == 200) {
      //     roomsData.value = res.data.data;
      //   }
      // });
      roomInfoComponent.value.getroomInfo(node.id);
    }
  } else {
    return;
  }
};

onMounted(() => {
  getcollectorList();
  setTimeout(() => {
    const a: any = document.getElementsByClassName(
      "el-icon el-tree-node__expand-icon"
    );
    a[0].click();
    handleOpenTour();
  }, 1000);
});

const showUpload = ref(true);
watch(
  () => batchForm.region,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, "新旧值");
    if (newVal) {
      showUpload.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.meterArchives {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .open_tip {
    width: 14px;
    height: 20px;
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 1;
  }

  .meterArchives_table {
    width: 98%;
    margin-top: 16px;

    .content {
      height: 100%;

      .box-card {
        height: 100%;
      }
    }
  }
}

.region_list {
  height: calc(100vh - 114px);

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

/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}

/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}

/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}

.demo-pagination-block {
  margin-top: 10px;
}

::v-deep .el-divider--horizontal {
  margin: 14px 0;
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

.region_select {
  width: 100%;
}

::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #ebf5ff;
  border-radius: 6px;
  border: 1px solid #9fceff;
  color: #409eff;
}

::v-deep .el-form-item__label {
  font-weight: 400;
}

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
