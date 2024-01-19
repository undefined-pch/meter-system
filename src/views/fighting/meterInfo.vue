<template>
  <div class="meter_info">
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
        <el-button @click="addsMeter" type="primary" plain>添加</el-button>
        <el-button @click="batchWaterMeter" type="primary" plain
          >批量导入</el-button
        >
        <el-button type="danger" plain>批量删除</el-button>
      </template>
    </vxe-toolbar>
    <div style="height: calc(100vh - 280px); width: 100%">
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
        <vxe-column field="meterId" title="表号" width="110" fixed="left" />
        <vxe-column field="meterType" title="表类型" width="90" />
        <vxe-column field="meterAddress" title="表地址" width="120" />
        <vxe-column field="belongRoom" title="所属房间" width="160" />
        <vxe-column field="specification" title="规格型号" width="110" />
        <vxe-column field="feeScheme" title="收费方案" width="110" />
        <vxe-column field="hasValve" title="有无阀门" width="110" />
        <vxe-column field="manufacturer" title="生产厂家" width="110" />
        <vxe-column field="dateOfManufacture" title="出厂日期" width="110" />
        <vxe-column field="installationDate" title="安装日期" width="110" />
        <vxe-column field="activationDate" title="启用日期" width="110" />
        <vxe-column field="bandrate" title="波特率" width="100" />
        <vxe-column field="databit" title="数据位" width="110" />
        <vxe-column field="checkbit" title="校验位" width="110" />
        <vxe-column field="stopbit" title="停止位" width="110" />
        <vxe-column field="initialFlowrate" title="初始流量" width="110" />
        <vxe-column field="correctionFactor" title="修正系数" width="110" />
        <vxe-column field="correctedMassflow" title="修正流量" width="110" />
        <vxe-column field="faulttype" title="故障类型号" width="110" />
        <vxe-column field="notes" title="备注" width="130" />
        <vxe-column field="founder" title="创建人" width="110" />
        <vxe-column field="date" title="创建时间" width="110" />
        <vxe-column title="操作" width="110" fixed="right" align="center">
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
    <!-- 新增水表弹框 -->
    <el-dialog v-model="addMeterVisible" title="新增水表" width="44%" top="1%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="有无采集器"
              :label-width="formLabelWidth"
              prop="hasCollector"
            >
              <el-switch
                v-model="form.hasCollector"
                inline-prompt
                active-text="有"
                inactive-text="无"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="有无阀门"
              :label-width="formLabelWidth"
              prop="hasValve"
            >
              <el-switch
                v-model="form.hasValve"
                inline-prompt
                active-text="有"
                inactive-text="无"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
                class="region_select1"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="所属采集器"
              :label-width="formLabelWidth"
              prop="collector"
              v-if="form.hasCollector"
            >
              <el-select
                v-model="form.collector"
                class="region_select1"
                @focus="searchCollector"
              >
                <el-option
                  v-for="item in collectorList"
                  :key="item._id"
                  :label="item.collectroId"
                  :value="item.collectroId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="所属房间号"
              :label-width="formLabelWidth"
              prop="belongRoom"
            >
              <el-select
                v-model="form.belongRoom"
                class="region_select1"
                @focus="searchRooms"
              >
                <el-option
                  v-for="item in roomsList"
                  :key="item._id"
                  :label="item.roomName"
                  :value="item._id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="表号"
              :label-width="formLabelWidth"
              prop="meterId"
            >
              <el-input
                v-model="form.meterId"
                autocomplete="off"
                placeholder="请输入表号"
                ><template #suffix>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="表号为10位数字"
                    placement="top"
                    ><img
                      src="@/assets/feescheme/tip.png"
                      alt=""
                      style="width: 18px"
                  /></el-tooltip>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="表类型"
              :label-width="formLabelWidth"
              prop="meterType"
            >
              <el-select v-model="form.meterType" placeholder="请选择表类型">
                <el-option
                  v-for="item in collectorCycleList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="表地址"
              :label-width="formLabelWidth"
              prop="meterAddress"
            >
              <el-input
                v-model="form.meterAddress"
                autocomplete="off"
                placeholder="请输入表地址"
              >
                <template #suffix>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="表地址为14位数字（包含16进制）"
                    placement="top"
                    ><img
                      src="@/assets/feescheme/tip.png"
                      alt=""
                      style="width: 18px"
                  /></el-tooltip>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="收费方案"
              :label-width="formLabelWidth"
              prop="feeScheme"
            >
              <el-select
                v-model="form.feeScheme"
                placeholder="请选择收费方案"
                style="width: 100%"
              >
                <el-option
                  v-for="item in feeSchemeList"
                  :key="item._id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="规格型号"
              :label-width="formLabelWidth"
              prop="specification"
            >
              <el-input
                v-model="form.specification"
                autocomplete="off"
                placeholder="请输入规格型号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="生产厂家"
              :label-width="formLabelWidth"
              prop="manufacturer"
            >
              <el-input
                v-model="form.manufacturer"
                autocomplete="off"
                placeholder="请输入生产厂家"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="故障类型号"
              :label-width="formLabelWidth"
              prop="faulttype"
            >
              <el-input
                v-model="form.faulttype"
                autocomplete="off"
                placeholder="请输入故障类型号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="安装日期"
              :label-width="formLabelWidth"
              prop="installationDate"
            >
              <el-date-picker
                v-model="form.installationDate"
                placeholder="请选择安装日期"
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
              label="启用日期"
              :label-width="formLabelWidth"
              prop="activationDate"
            >
              <el-date-picker
                v-model="form.activationDate"
                placeholder="请选择启用日期"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="出厂日期"
              :label-width="formLabelWidth"
              prop="dateOfManufacture"
            >
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
              label="波特率"
              :label-width="formLabelWidth"
              prop="bandrate"
            >
              <el-input
                v-model="form.bandrate"
                autocomplete="off"
                placeholder="请输入波特率"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="数据位"
              :label-width="formLabelWidth"
              prop="databit"
            >
              <el-input
                v-model="form.databit"
                autocomplete="off"
                placeholder="请输入数据位"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="校验位"
              :label-width="formLabelWidth"
              prop="checkbit"
            >
              <el-input
                v-model="form.checkbit"
                autocomplete="off"
                placeholder="请输入校验位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="停止位"
              :label-width="formLabelWidth"
              prop="stopbit"
            >
              <el-input
                v-model="form.stopbit"
                autocomplete="off"
                placeholder="请输入停止位"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="初始流量"
              :label-width="formLabelWidth"
              prop="initialFlowrate"
            >
              <el-input
                v-model="form.initialFlowrate"
                autocomplete="off"
                placeholder="初始流量"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="修正系数"
              :label-width="formLabelWidth"
              prop="correctionFactor"
            >
              <el-input
                v-model="form.correctionFactor"
                autocomplete="off"
                placeholder="请输入修正系数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="修正流量"
              :label-width="formLabelWidth"
              prop="correctedMassflow"
            >
              <el-input
                v-model="form.correctedMassflow"
                autocomplete="off"
                placeholder="请输入修正流量"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="备注"
              :label-width="formLabelWidth"
              prop="notes"
            >
              <el-input
                v-model="form.notes"
                autocomplete="off"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addMeterVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="batchWaterMeterVisible"
      title="批量导入水表（户表）信息"
      width="25%"
    >
      <el-form :model="batchForm" :rules="batchRules" ref="batchFormRef">
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板文件" :label-width="90">
              <el-button type="primary">下载模板</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属区域" :label-width="90" prop="region">
              <el-tree-select
                v-model="batchForm.region"
                :props="treeProps"
                :data="batchSameList"
                :load="loadFireNode"
                lazy
                node-key="id"
                check-strictly
                :render-after-expand="false"
                class="region_select1"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="有无采集器"
              :label-width="90"
              prop="hasCollector"
            >
              <el-switch
                v-model="batchForm.hasCollector"
                @change="changeBatchCollector"
                inline-prompt
                active-text="有"
                inactive-text="无"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属采集器" :label-width="90" prop="region">
              <el-select
                v-model="batchForm.collector"
                class="region_select1"
                :disabled="!batchForm.hasCollector"
                @focus="searchCollector(true)"
              >
                <el-option
                  v-for="item in collectorList"
                  :key="item._id"
                  :label="item.collectroId"
                  :value="item.collectroId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-form-item label="选择文件" :label-width="90" prop="region">
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
                  <p>选择区域、采集器信息后选取文件</p>
                  只允许上传1个xlsx文件
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchWaterMeterVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { allregion } from "@/api/allregion.js";
import { getcollector } from "@/api/collector.js";
import { getGaugeValve, gaugeValveadd } from "@/api/gaugeValve.js";
import { waterPrice } from "@/api/price.js";
import { getroom } from "@/api/room.js";

const addMeterVisible = ref(false); //新增采集器弹框展示
const addsMeter = () => {
  addMeterVisible.value = true;
  // 获取收费方案列表
  const data = {
    page: 1,
    pageSize: 1000
  };
  waterPrice(data).then(res => {
    if (res.retcode == 200) {
      feeSchemeList.value = res.data.data;
    }
  });
};
const feeSchemeList = ref([]); // 收费方案表单

const formLabelWidth = "110px"; // 表单文字宽度

// 新增表单
const form = reactive({
  region: "", // 所属区域
  meterId: "", // 表号
  meterType: "普通水表", // 表类型
  meterAddress: "", // 表地址
  belongRoom: "", // 所属房间
  hasCollector: true,
  collector: "", // 所属采集器
  feeScheme: "", // 收费方案
  specification: "", // 规格型号
  hasValve: true, // 有无阀门
  manufacturer: "", // 生产厂家
  dateOfManufacture: "", // 出厂日期
  installationDate: "", // 安装日期
  activationDate: "", // 启用日期
  bandrate: "2400", // 波特率
  databit: "8", // 数据位
  checkbit: "2", // 校验位
  stopbit: "2", // 停止位
  initialFlowrate: "0", // 初始流量
  correctionFactor: "1", // 修正系数
  correctedMassflow: "0", // 修正流量
  faulttype: "0", // 故障类型号
  notes: "" // 备注
});

// 批量导入表单
const batchForm = reactive({
  region: "",
  hasCollector: true,
  collector: ""
});
const treeProps = {
  label: node => {
    return `${node.name}  -  ${node.type}`;
  },
  children: "child",
  isLeaf: data => {
    if (data.hasChild === false || data.type == "楼栋") {
      return true;
    } else {
      return false;
    }
  }
};

// 批量导入改变有无采集器状态
const changeBatchCollector = type => {
  console.log(type, "转态");
  if (type == true) {
    return;
  } else {
    batchForm.collector = "";
  }
};

// const nowSelectRegion = ref(""); //当前选中的区域信息
// 请选择表类型
const collectorCycleList = ref([
  {
    id: 1,
    label: "远传水表"
  },
  {
    id: 2,
    label: "普通水表"
  },
  {
    id: 3,
    label: "预付费水表"
  }
]);

const batchSameList = ref([]); // 所属区域树形
// 树形格式
const props = {
  label: node => {
    return `${node.name}  -  ${node.type}`;
  },
  children: "child",
  isLeaf: data => {
    if (data.hasChild === false || data.type == "楼栋") {
      return true;
    } else {
      return false;
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
    // console.log(node, "node信息");
    // 展示二级区域名称
    // nowSelectRegion.value += "-" + node.data.name;
    // console.log(nowSelectRegion.value);
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
  if (node.level === 3) {
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
  if (node.level === 5) {
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

// 所属采集器列表
const collectorList = ref([]);
const searchCollector = batch => {
  // console.log("点击了采集器");
  const data = {
    page: 1,
    pageSize: 100,
    region: batch ? batchForm.region : form.region // regionId
  };
  getcollector(data).then(res => {
    if (res.retcode == 200) {
      collectorList.value = res.data.data;
    }
  });
};

// 所属房间号
const roomsList = ref([]); // 该区域下得所有未归属房间号
// 搜索房间号
const searchRooms = () => {
  const data = {
    page: 1,
    pageSize: 1000,
    regionId: form.region
  };
  getroom(data).then(res => {
    roomsList.value = res.data.data;
  });
};

// 新增水表表单校验
const rules = reactive({
  region: [
    {
      required: true,
      message: "请输入所属区域",
      trigger: "blur"
    }
  ],
  collector: [
    {
      required: true,
      message: "请输入所属采集器",
      trigger: "blur"
    }
  ],
  belongRoom: [
    {
      required: true,
      message: "请选择所属房间",
      trigger: "blur"
    }
  ],
  meterId: [
    {
      required: true,
      message: "请输入10位表号",
      trigger: "blur",
      pattern: /^[0]?\d{9}$/
    },
    { min: 10, max: 10, message: "请输入10位数字", trigger: "blur" }
  ],
  meterAddress: [
    {
      required: true,
      message: "请输入14位采集器编号",
      trigger: "blur",
      pattern: /^[0-9a-fA-F]+$/
    },
    { min: 14, max: 14, message: "请输入14位数字（含16进制）", trigger: "blur" }
  ],
  feeScheme: [
    {
      required: true,
      message: "请选择收费方案",
      trigger: "blur"
    }
  ],
  bandrate: [
    {
      required: true,
      message: "请输入波特率",
      trigger: "blur"
    }
  ],
  manufacturer: [
    {
      required: true,
      message: "请输入生产厂家",
      trigger: "blur"
    }
  ],
  activationDate: [
    {
      required: true,
      message: "请选择启用日期",
      trigger: "blur"
    }
  ]
});

const ruleFormRef = ref(); // 表单dom
// 新增水表
const submitForm = async formEl => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // console.log("新增成功");
      gaugeValveadd(form).then(res => {
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          addMeterVisible.value = false;
          getmeterInfo();
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

const tableData = ref([]);
// 获取表格数据
const getmeterInfo = () => {
  const data = {
    page: 1,
    pageSize: 100
  };
  getGaugeValve(data).then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
    }
  });
};

const batchWaterMeterVisible = ref(false); // 水表批量框的展示、隐藏
// 点击批量导入水表
const batchWaterMeter = () => {
  batchWaterMeterVisible.value = true;
};

// 上传批量水表
const formData = ref();
const onUploadChange = item => {
  console.log(item, "上传文件信息");
  if (batchForm.region == "") {
    return ElMessage({
      showClose: true,
      message: "请先选择区域后导入文件！",
      type: "error"
    });
  }
  formData.value = new FormData();
  formData.value.append("file", item.raw);
  formData.value.append("region", batchForm.region);
};

// 上传文件
const submitUpload = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
  batchCollectorExcel(formData.value).then(res => {
    if (res.retcode == 200) {
      ElMessage({
        showClose: true,
        message: res.message,
        type: "success"
      });
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

onMounted(() => {
  getmeterInfo();
});
</script>

<style lang="scss" scoped>
.meter_info {
  width: 100%;
  height: calc(100vh - 196px);
  .table {
    width: 100%;
    height: 100%;
  }
}

.demo-pagination-block {
  margin-top: 10px;
}
.region_select1 {
  width: 100%;
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
</style>
