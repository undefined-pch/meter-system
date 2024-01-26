<template>
  <div class="region">
    <div class="region_table">
      <el-card class="box-card">
        <!-- <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            style="height: 40px"
          >
            <el-menu-item index="1">水表</el-menu-item>
            <el-menu-item index="2">热表</el-menu-item>
          </el-menu>
        </div> -->
        <vxe-toolbar ref="toolbarRef" export print custom>
          <template #buttons>
            <el-button @click="addTopLevel()" type="primary" plain
              >新增顶级</el-button
            >
            <!-- <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button> -->
            <el-button @click="insertEvent" type="primary" plain
              >批量子级</el-button
            >
            <!-- <el-button @click="batchChildEvent" type="primary" plain
              >批量子级</el-button
            > -->
            <el-button type="danger" plain>批量删除</el-button>
          </template>
        </vxe-toolbar>
        <div style="height: calc(100vh - 210px)">
          <vxe-table
            show-overflow
            keep-source
            ref="tableRef"
            :row-config="{ keyField: '_id' }"
            :column-config="{ resizable: true }"
            :print-config="{}"
            :export-config="{}"
            :loading="loading"
            :data="tableData"
            :tree-config="treeConfig"
            size="small"
            height="auto"
          >
            <vxe-column type="checkbox" width="60" />
            <vxe-column
              field="name"
              title="区域"
              tree-node
              :edit-render="{}"
              width="250"
            />
            <vxe-column field="type" title="类型" width="100">
              <template #default="{ row }">
                <el-tag v-if="row.type">{{ row.type }}</el-tag>
                <span v-else>{{ row.type }}</span>
              </template>
            </vxe-column>
            <vxe-column
              field="date"
              title="创建时间"
              :edit-render="{}"
              width="160"
            />
            <vxe-column
              field="founder"
              title="创建人"
              width="100"
              :edit-render="{}"
            />
            <vxe-column field="notes" title="备注" :edit-render="{}">
              <template #edit="{ row }">
                <vxe-input v-model="row.size" type="text" />
              </template>
            </vxe-column>
            <vxe-column title="操作" width="280" align="center">
              <template #default="{ row }">
                <div v-if="row.type !== '房间'">
                  <vxe-button
                    type="text"
                    status="primary"
                    @click="addSameLevel(row)"
                    >新增同级</vxe-button
                  >
                  <!-- <vxe-button
                type="text"
                status="primary"
                @click="insertNextRow(row, 'current')"
                >下一行位置插入新节点</vxe-button
              > -->
                  <vxe-button
                    type="text"
                    status="primary"
                    @click="addChildLevel(row)"
                    :disabled="row.type == '楼栋'"
                    >新增子级</vxe-button
                  >
                  <vxe-button type="text" status="primary" @click="fixRow(row)"
                    >修改</vxe-button
                  >
                  <vxe-button
                    type="text"
                    status="danger"
                    @click="removeRow(row)"
                    >删除节点</vxe-button
                  >
                </div>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </el-card>
    </div>
    <!-- 新增同级弹框 -->
    <el-dialog v-model="dialogFormVisible" title="新增同级" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item
          label="区域名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in sameLeveloptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="notes">
          <el-input v-model="form.notes" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef, 'samelevel')"
          >
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增子级弹框 -->
    <el-dialog v-model="childFormVisible" title="新增子级" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item
          label="所属父级"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.parentName" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item
          label="区域名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型" class="qz">
            <el-option
              v-for="item in childLeveloptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="notes">
          <el-input v-model="form.notes" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="childFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef, 'childlevel')"
          >
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增顶级区域 -->
    <el-dialog v-model="topFormVisible" title="新增顶级" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item
          label="区域名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in topLeveloptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="notes">
          <el-input v-model="form.notes" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="topFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef, 'toplevel')"
          >
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 批量同级 -->
    <el-dialog v-model="batchSameLevel" title="批量子级" width="30%" top="4%">
      <el-form :model="batchForm" :rules="batchRules" ref="batchFormRef">
        <el-form-item
          label="所属区域"
          :label-width="formLabelWidth"
          prop="region"
        >
          <el-row>
            <el-col :span="24">
              <el-tree-select
                v-model="batchForm.region"
                :props="props"
                :data="batchSameList"
                :load="loadFireNode"
                @node-click="regionSelect"
                lazy
                node-key="id"
                check-strictly
                :render-after-expand="false"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-row>
            <el-col :span="24">
              <el-select v-model="batchForm.type" placeholder="请选择类型">
                <el-option
                  v-for="item in batchoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="区间前缀" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="24">
              <el-input
                v-model="batchForm.fullName"
                autocomplete="off"
                style="width: 216px"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-space fill>
          <el-alert type="info" show-icon :closable="false">
            <p>例如：A-C区，单位是区，就添加A区、B区、C区（支持字母和数字）</p>
            <p>
              （可选）例如：花果园A-花果园C区，区间前缀是花果园，单位是区，就添加花果园A区、花果园B区、花果园C区
            </p>
          </el-alert>
          <el-form-item
            label="区间"
            :label-width="formLabelWidth"
            prop="interval"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item prop="min">
                  <el-input v-model="batchForm.min" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="4" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="max">
                  <el-input v-model="batchForm.max" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-space>
        <el-form-item label="单位" :label-width="formLabelWidth" prop="unit">
          <el-col :span="10">
            <el-input v-model="batchForm.unit" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="notes">
          <el-input
            v-model="batchForm.notes"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchSameLevel = false">取消</el-button>
          <el-button type="primary" @click="submitBatch(batchFormRef)">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 批量子级 -->
    <el-dialog v-model="batchChildLevel" title="批量子级" width="30%" top="4%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item
          label="所属区域"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-row>
            <el-col :span="24">
              <el-tree-select
                v-model="form.parentName"
                :props="props"
                :data="batchSameList"
                :load="loadFireNode"
                lazy
                node-key="id"
                check-strictly
                :render-after-expand="false"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-space fill>
          <el-alert type="info" show-icon :closable="false">
            <p>例如：11-13栋，单位是栋，就添加11栋、12栋、13栋</p>
          </el-alert>
          <el-form-item label="区间" :label-width="formLabelWidth">
            <el-row>
              <el-col :span="10">
                <el-input v-model="form.startNumber" autocomplete="off" />
              </el-col>
              <el-col :span="4" class="text-center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="10">
                <el-input v-model="form.endNumber" autocomplete="off" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-space>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-input v-model="form.unit" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in childLeveloptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="notes">
          <el-input v-model="form.notes" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchSameLevel = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef, 'toplevel')"
          >
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog v-model="fixFormVisible" title="修改" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item
          label="区域名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="notes">
          <el-input v-model="form.notes" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="fixForm(ruleFormRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from "vue";
// import { VXETable } from "vxe-table";
import { ElMessage, ElInput } from "element-plus";
import {
  allregion,
  allregionadd,
  allregionfix,
  batchRegion
} from "@/api/allregion.js";
// 菜单选择
// const activeIndex = ref("1");
// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath);
// };
// 表格
const loading = ref(false);
const tableData = ref([]);
const tableRef = ref();
const toolbarRef = ref();

// 表格配置
const treeConfig = reactive({
  transform: true,
  rowField: "_id",
  parentField: "parentId",
  hasChild: "hasChild",
  expandAll: true
});

// 新增top级下拉框
const topLeveloptions = ref([
  { id: 1, label: "区域", value: "区域" },
  { id: 2, label: "小区", value: "小区" },
  { id: 3, label: "楼栋", value: "楼栋" }
]);
// 新增同级下拉框
const sameLeveloptions = ref([
  { id: 1, label: "区域", value: "区域" },
  { id: 2, label: "小区", value: "小区" },
  { id: 3, label: "楼栋", value: "楼栋" }
]);
// 新增子级下拉框
const childLeveloptions = ref([
  { id: 1, label: "区域", value: "区域" },
  { id: 2, label: "小区", value: "小区" },
  { id: 3, label: "楼栋", value: "楼栋" }
]);
const findList = () => {
  loading.value = true;
  allregion().then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
      loading.value = false;
    }
  });
};
// const searchMethod = () => {
//   const $table = tableRef.value;
//   if ($table) {
//     // 清除所有状态
//     $table.clearAll();
//     return findList();
//   }
//   return Promise.resolve();
// };
const removeRow = async row => {
  const $table = tableRef.value;
  if ($table) {
    await $table.remove(row);
  }
};

// 批量同级弹框
const batchSameLevel = ref(false);
const batchSameList = ref([]); // 所属区域树形
// 批量同级别
const insertEvent = () => {
  batchSameLevel.value = true;
  // 查询parentID为空的值
};

// 批量子级弹框
const batchChildLevel = ref(false);
// 批量子级
// const batchChildEvent = () => {
//   batchChildLevel.value = true;
// };

const props = {
  label: "name",
  children: "child",
  isLeaf: data => {
    if (data.hasChild === true) {
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
      return resolve(newcompanyArr);
    });
  }
  if (node.level === 1) {
    console.log(node, "node信息");
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
    console.log(node, "node信息");
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
  if (node.level === 3) {
    console.log(node, "node信息");
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

const formLabelWidth = "100px";
// 表单
const form = reactive({
  parentId: "",
  parentName: "",
  name: "",
  type: "",
  hasParent: false,
  notes: ""
});

// 批量表单
const batchForm = reactive({
  region: "",
  parentName: "",
  min: "",
  max: "",
  unit: "",
  type: "",
  notes: "",
  fullName: ""
});

// 同级表单规则
const rules = reactive({
  name: [
    {
      required: true,
      message: "请选择区域名称",
      trigger: "blur"
    }
  ]
});

// 批量同级表单规则
const batchRules = reactive({
  region: [
    {
      required: true,
      message: "请输入区域名称",
      trigger: "blur"
    }
  ],
  type: [
    {
      required: true,
      message: "请选择类型",
      trigger: "blur"
    }
  ],
  min: [
    {
      required: true,
      message: "请输入开始值",
      trigger: "blur"
    }
  ],
  max: [
    {
      required: true,
      message: "请输入结束值",
      trigger: "blur"
    }
  ],
  unit: [
    {
      required: true,
      message: "请输入单位",
      trigger: "blur"
    }
  ]
});
// const defaultExpandKeys = ref([659f52b9e89e97d863ad2691]); // 默认展开数的id

const ruleFormRef = ref();
// 展示显示同级弹框
const dialogFormVisible = ref(false);
// 展示显示子级弹框
const childFormVisible = ref(false);
// 展示顶级弹框
const topFormVisible = ref(false);
// 展示修改弹框
const fixFormVisible = ref(false);

// 新增top级按钮点击
const addTopLevel = () => {
  form.parentId = "";
  form.parentName = "";
  form.hasParent = false;
  form.name = "";
  form.type = "";
  form.notes = "";
  topFormVisible.value = true;
};

// 新增同级行按钮点击
const addSameLevel = row => {
  console.log(row, "row");
  if (row.type == "区域") {
    sameLeveloptions.value = [
      { id: 1, label: "区域", value: "区域" },
      { id: 2, label: "小区", value: "小区" },
      { id: 3, label: "楼栋", value: "楼栋" }
    ];
  } else if (row.type == "小区") {
    sameLeveloptions.value = [
      { id: 1, label: "小区", value: "小区" },
      { id: 2, label: "楼栋", value: "楼栋" }
    ];
  } else if (row.type == "楼栋") {
    sameLeveloptions.value = [{ id: 1, label: "楼栋", value: "楼栋" }];
  }
  form.name = "";
  form.type = "";
  form.notes = "";
  if (row.parentId.length == 0) {
    form.parentId = "";
    form.parentName = "";
    form.hasParent = false;
  } else {
    form.parentId = row.parentId;
    form.parentName = row.name;
    form.hasParent = true;
  }
  dialogFormVisible.value = true;
};

// 新增子级行按钮点击
const addChildLevel = row => {
  console.log(row, "row");
  if (row.type == "区域") {
    childLeveloptions.value = [
      { id: 1, label: "区域", value: "区域" },
      { id: 2, label: "小区", value: "小区" },
      { id: 3, label: "楼栋", value: "楼栋" }
    ];
  } else if (row.type == "小区") {
    childLeveloptions.value = [
      { id: 1, label: "小区", value: "小区" },
      { id: 2, label: "楼栋", value: "楼栋" }
    ];
  } else if (row.type == "楼栋") {
    childLeveloptions.value = [{ id: 1, label: "楼栋", value: "楼栋" }];
  }
  form.name = "";
  form.type = "";
  form.notes = "";
  form.parentId = row._id;
  form.parentName = row.name;
  form.hasParent = true;
  childFormVisible.value = true;
};

// 新增同级2
const submitForm = async (formEl, level) => {
  // debugger;
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // console.log("submit!");
      allregionadd(form).then(res => {
        // console.log(res);
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          if (level == "toplevel") {
            topFormVisible.value = false;
          } else if (level == "samelevel") {
            dialogFormVisible.value = false;
          } else if (level == "childlevel") {
            childFormVisible.value = false;
          }
          findList();
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

const batchFormRef = ref();
// 批量子级
const submitBatch = async formEl => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      console.log("新增");
      batchRegion(batchForm).then(res => {
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          batchSameLevel.value = false;
          batchFormRef.value.resetFields();
          findList();
        } else {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "error"
          });
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

// 批量子级区域限定
const batchoptions = ref([]);

// 修改区域数据
const fixRow = row => {
  console.log(row);
  form.id = row._id;
  form.name = row.name;
  form.type = row.type;
  form.notes = row.notes;
  form.parentId = row.parentId;
  form.parentName = row.parentName;
  fixFormVisible.value = true;
};
// 修改区域表单
const fixForm = async formEl => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // console.log("submit!");
      allregionfix(form.id, form).then(res => {
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          fixFormVisible.value = false;
          findList();
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

// 所在区域选择
// const selectRegion = () => {
//   console.log("惦记了");
// };

// 选择区域展示不同类型
const regionSelect = node => {
  // console.log(node, "批量子级信息");
  batchForm.parentName = node.name;
  if (node.type == "区域") {
    batchoptions.value = [
      { id: 1, label: "区域", value: "区域" },
      { id: 2, label: "小区", value: "小区" },
      { id: 3, label: "楼栋", value: "楼栋" }
    ];
  } else if (node.type == "小区") {
    batchoptions.value = [
      { id: 2, label: "小区", value: "小区" },
      { id: 3, label: "楼栋", value: "楼栋" }
    ];
  }
};

nextTick(() => {
  // 将表格和工具栏进行关联
  const $table = tableRef.value;
  const $toolbar = toolbarRef.value;
  if ($table && $toolbar) {
    $table.connect($toolbar);
  }
  findList();
});

// 默认展开第一行
// const expandEvent1 = () => {
//   debugger;
//   const $table = tableRef.value;
//   if ($table) {
//     $table.toggleTreeExpand(tableData.value[0]);
//   }
// };
onMounted(() => {
  findList();
  // setTimeout(() => {
  //   const a = document.getElementsByClassName("vxe-tree--btn-wrapper");
  //   a[0].click();
  // }, 1000);
});
</script>

<style lang="scss" scoped>
.region {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .region_table {
    width: 98%;
    margin-top: 16px;
  }
}
</style>
