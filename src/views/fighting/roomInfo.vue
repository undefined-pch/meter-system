<template>
  <div class="room_info">
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
        <el-button @click="addsRoom" type="primary" plain>添加</el-button>
        <el-button @click="batchRoom" type="primary" plain>批量导入</el-button>
        <el-button @click="batchRoom" type="primary" plain>批量开户</el-button>
        <el-button type="danger" plain>批量删除</el-button>
      </template>
    </vxe-toolbar>
    <div style="height: calc(100vh - 290px); width: 100%">
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
        <vxe-column field="roomName" title="房间号" width="60" fixed="left" />
        <vxe-column field="fullRegion" title="所属区域" width="140" />
        <vxe-column
          field="householder"
          title="业主姓名"
          width="90"
          :filters="ageOptions"
          :filter-method="filterAgeMethod"
          :filter-recover-method="filterAgeRecoverMethod"
        >
          <template #filter="{ $panel, column }">
            <input
              class="my-input"
              type="type"
              v-for="(option, index) in column.filters"
              :key="index"
              v-model="option.data"
              @input="$panel.changeOption($event, !!option.data, option)"
              @keyup.enter="$panel.confirmFilter()"
              placeholder="按回车确认筛选"
            />
          </template>
        </vxe-column>
        <vxe-column field="phone" title="联络方式" width="110" />
        <vxe-column field="unit" title="单元号" width="70" />
        <vxe-column field="level" title="楼层" width="70" />
        <vxe-column field="date" title="添加时间" width="110" />
        <vxe-column field="founder" title="创建人" width="110" />
        <vxe-column field="notes" title="备注" width="180" />
        <vxe-column field="status" title="开户状态" width="80" fixed="right">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.status">已开户</el-tag>
            <el-tag type="danger" v-else>未开户</el-tag>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="240" fixed="right" align="center">
          <template #default="{ row }">
            <vxe-button type="text" status="primary" v-if="row.status"
              >关户</vxe-button
            >
            <vxe-button type="text" status="primary" v-else>开户</vxe-button>
            <vxe-button type="text" status="primary" @click="lookHousehold(row)"
              >查看户主信息</vxe-button
            >
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
    <!-- 新增房间 -->
    <el-dialog
      v-model="addRoomVisible"
      title="新增房间信息"
      width="40%"
      top="3%"
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
                :props="treeProps"
                :data="batchSameList"
                :load="loadFireNode"
                lazy
                node-key="id"
                check-strictly
                :render-after-expand="false"
                @change="handleChange"
                class="region_select"
                placeholder="请选择所属区域"
                ref="region_select"
            /></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="房间号"
              :label-width="formLabelWidth"
              prop="roomName"
            >
              <el-input
                v-model="form.roomName"
                autocomplete="off"
                placeholder="请输入房间号"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="面积(m³)"
              :label-width="formLabelWidth"
              prop="area"
            >
              <el-input
                v-model="form.area"
                autocomplete="off"
                placeholder="请输入面积"
            /></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="房间人数"
              :label-width="formLabelWidth"
              prop="people"
            >
              <el-input
                v-model="form.people"
                autocomplete="off"
                placeholder="请输入房间人数"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="单元号"
              :label-width="formLabelWidth"
              prop="unit"
            >
              <el-input
                v-model="form.unit"
                autocomplete="off"
                placeholder="请输入单元号"
            /></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="楼层"
              :label-width="formLabelWidth"
              prop="level"
            >
              <el-input
                v-model="form.level"
                autocomplete="off"
                placeholder="请输入楼层"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="户主姓名"
              :label-width="formLabelWidth"
              prop="householder"
            >
              <el-input
                v-model="form.householder"
                autocomplete="off"
                placeholder="请输入户主姓名"
            /></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="联络方式"
              :label-width="formLabelWidth"
              prop="phone"
            >
              <el-input
                v-model="form.phone"
                autocomplete="off"
                placeholder="请输入联络方式"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="户主性别"
              :label-width="formLabelWidth"
              prop="sex"
            >
              <el-radio-group v-model="form.sex" class="ml-4">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="身份证号"
              :label-width="formLabelWidth"
              prop="identificationCard"
            >
              <el-input
                v-model="form.identificationCard"
                autocomplete="off"
                placeholder="请输入身份证号"
            /></el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item
              label="移动端账号"
              :label-width="formLabelWidth"
              prop="username"
            >
              <el-input
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入移动端"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="移动端密码"
              :label-width="formLabelWidth"
              prop="password"
            >
              <el-input v-model="form.password" autocomplete="off"
            /></el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="备注"
              :label-width="formLabelWidth"
              prop="notes"
            >
              <el-input v-model="form.notes" autocomplete="off" type="textarea"
            /></el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left" style="margin-bottom: 20px"
          >合并缴费方案</el-divider
        >
        <p>开发中......</p>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addRoomVisible = false" v-if="active == 0"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 批量新增房间 -->
    <el-dialog v-model="batchRoomVisible" title="批量导入房间信息" width="25%">
      <el-form :model="batchForm" :rules="batchRules" ref="batchFormRef">
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板文件" :label-width="80">
              <el-button type="primary">下载模板</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属区域" :label-width="80" prop="region">
              <el-tree-select
                v-model="batchForm.region"
                :props="treeProps"
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
          <el-form-item label="选择文件" :label-width="80" prop="region">
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
                  <p>只允许上传1个xlsx文件</p>
                  <p>批量导入的手机号将自动开户</p>
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchRoomVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 户主信息 -->
    <el-dialog
      v-model="householderVisible"
      label-class-name="my-label"
      class-name="my-content"
      title="户主信息"
      width="40%"
    >
      <el-row type="flex" justify="center">
        <el-avatar
          size="large"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </el-row>
      <el-descriptions :title="householdInfo.householder" :column="2" border>
        <el-descriptions-item
          label="账号"
          label-align="left"
          width="150px"
          align="center"
          >{{ householdInfo.username }}</el-descriptions-item
        >
        <el-descriptions-item
          label="密码"
          label-align="left"
          width="150px"
          align="center"
          >{{ householdInfo.password }}</el-descriptions-item
        >
        <el-descriptions-item
          label="关联房间数"
          label-align="left"
          align="center"
          width="150px"
          span="1"
          >{{ householdInfo.roomsTotal }}</el-descriptions-item
        >
        <el-descriptions-item
          label="开户房间数"
          label-align="left"
          align="center"
          width="150px"
          span="1"
          >{{ householdInfo.roomsOpenTotal }}</el-descriptions-item
        >
        <el-descriptions-item label="关联房间号" span="2">
          <template
            v-for="(item, index) in householdInfo.roomInfo"
            :key="index"
          >
            {{ item }}
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="关联表号" span="2">
          <template
            v-for="(item, index) in householdInfo.waterMeterId"
            :key="index"
          >
            {{ item }}
          </template>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="householderVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import { allregion } from "@/api/allregion.js";
import { getGaugeValve } from "@/api/gaugeValve.js";
import { roomAdd, getroom, batchRooms } from "@/api/room.js";

const addRoomVisible = ref(false); // 新增弹框显示
const batchRoomVisible = ref(false); // 批量弹框展示
const householderVisible = ref(false); // 查看户主信息弹框
const formLabelWidth = "100px"; // 表单文字宽度

// const nowSelectRegion = ref(""); //当前选中的区域信息
const props = defineProps(["selectedRegionId"]);
// console.log(props.selectedRegionId, "区域点击的值");

const batchSameList = ref([]); // 所属区域树形
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

// 添加房间按钮
const addsRoom = () => {
  console.log("新增房间信息");
  clear(form);
  addRoomVisible.value = true;
};

// 新增房间表单
const form = reactive({
  fullRegion: "", // 区域全称
  region: "", // 所属区域
  roomName: "", // 房间号
  area: "", // 面积
  people: 1, // 房间人数
  unit: 1, // 单元号
  level: 1, // 楼层数
  householder: "",
  phone: "",
  status: false, // 默认不开户
  identificationCard: "", // 身份证号
  // username: "", // 小程序登陆账号
  // password: "", // 小程序登陆密码
  sex: "男",
  notes: "" // 备注
});

// 表单规则
const rules = reactive({
  region: [
    {
      required: true,
      message: "请输入所属区域",
      trigger: "blur"
    }
  ],
  roomName: [
    {
      required: true,
      message: "请输入房间号",
      trigger: "blur"
    }
  ],
  area: [
    {
      required: true,
      message: "请输入面积",
      trigger: "blur"
    }
  ],
  people: [
    {
      required: true,
      message: "请输入房间人数",
      trigger: "blur"
    }
  ],
  unit: [
    {
      required: true,
      message: "请输入单元号",
      trigger: "blur"
    }
  ],
  level: [
    {
      required: true,
      message: "请输入楼层",
      trigger: "blur"
    }
  ],
  householder: [
    {
      required: true,
      message: "请输入户主姓名",
      trigger: "blur"
    }
  ],
  phone: [
    {
      required: true,
      message: "请输入联络方式",
      trigger: "blur"
    }
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "blur"
    }
  ],
  identificationCard: [
    {
      required: true,
      message: "请输入身份证号",
      trigger: "blur"
    }
  ]
  // username: [
  //   {
  //     required: true,
  //     message: "请输入登陆小程序的账号",
  //     trigger: "blur"
  //   }
  // ],
  // password: [
  //   {
  //     required: true,
  //     message: "请输入登陆小程序的密码",
  //     trigger: "blur"
  //   }
  // ]
});

const active = ref(0); // 当前步骤
const ruleFormRef = ref(); // 表单dom
// const addRoomStep = () => {
//   // 判断是否填写表单
//   // active.value++;
//   submitForm(ruleFormRef);
// };

// 新增房间信息
const submitForm = async formEl => {
  // if (active.value == 0) {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // console.log("新增成功");
      roomAdd(form).then(res => {
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          finishStep();
        } else {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      });
      // active.value++;
    }
  });
  // } else if (active.value == 1) {
  // const waterMeterName = [];
  // selectWaterMeterList.value.forEach(item => {
  //   waterMeterName.push(item.meterId);
  // });
  // form.waterMeterName = waterMeterName;
  // 提交表单接口
  // }
};

// 表单完成
const finishStep = () => {
  addRoomVisible.value = false;
  getroomInfo();
  ruleFormRef.value.resetFields();
};

const waterMeterList = ref([]); // 未关联水表列表
// const hotMeterList = ref([]); // 未关联热表列表

// 监听当前step
watch(
  () => active.value,
  newVal => {
    console.log(newVal);
    if (newVal == "1") {
      console.log("查询未关联的表号");
      const data = {
        page: 1,
        pageSize: 1000,
        belongRoom: "无归属水表"
      };
      getGaugeValve(data).then(res => {
        if (res.retcode == 200) {
          waterMeterList.value = res.data.data;
        } else {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      });
    }
  }
);

// const selectWaterMeterList = ref([]);
// 改变多选表号
// const changeMeterId = lists => {
//   console.log(lists, "选中的值");
//   console.log(waterMeterList.value, "waterMeterList");
//   selectWaterMeterList.value = toRaw(waterMeterList.value).filter(item => {
//     return lists.includes(item._id);
//   });
// };

const batchRoom = () => {
  clear(batchForm);
  batchRoomVisible.value = true;
};
// 批量导入表单
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

const region_select = ref();

const tableData = ref([]);
const getroomInfo = regionid => {
  // debugger;
  if (regionid) {
    const data = {
      page: 1,
      pageSize: 1000,
      vagueName: regionid
    };
    getroom(data).then(res => {
      if (res.retcode == 200) {
        tableData.value = res.data.data;
      }
    });
  } else {
    const data = {
      page: 1,
      pageSize: 1000
    };
    getroom(data).then(res => {
      if (res.retcode == 200) {
        tableData.value = res.data.data;
      }
    });
  }
};

// 上传文件
const submitUpload = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "批量上传中，请稍后......",
    background: "rgba(0, 0, 0, 0.7)"
  });
  batchRooms(formData).then(res => {
    if (res.retcode == 200) {
      ElMessage({
        showClose: true,
        message: res.message,
        type: "success"
      });
      batchRoomVisible.value = false;
      loading.close();
      getroomInfo();
    } else {
      ElMessage({
        showClose: true,
        message: res.message,
        type: "error"
      });
      batchRoomVisible.value = false;
      loading.close();
      getroomInfo();
    }
  });
};

// 户主信息详情
const householdInfo = reactive({
  householder: "",
  username: "",
  password: "",
  roomsTotal: 0,
  roomsOpenTotal: 0,
  roomInfo: [],
  waterMeterId: "",
  IdentificationCard: ""
});

// 查看户主信息
// 查询水表里的表号
// 查找房间信息里同一身份证所关联的房间号
const lookHousehold = row => {
  clear(householdInfo);
  householdInfo.username = row.username;
  householdInfo.password = row.password;
  if (row.sex == "男") {
    householdInfo.householder = row.householder + "（先生）";
  } else {
    householdInfo.householder = row.householder + "（女士）";
  }
  householdInfo.roomsTotal = 1;
  householdInfo.roomsOpenTotal = 0;
  householdInfo.roomInfo = row.fullRegion;
  const data = {
    page: 1,
    pageSize: 100,
    belongRoom: row.fullRegion
  };
  getGaugeValve(data).then(res => {
    if (res.retcode == 200) {
      householdInfo.waterMeterId = res.data.data[0].meterId;
    }
  });
  householderVisible.value = true;
};

// 重置
const clear = info => {
  const keys = Object.keys(info);
  const obj = {};
  keys.forEach(item => {
    if (item == "sex") {
      obj[item] = "男";
    } else {
      obj[item] = "";
    }
  });
  Object.assign(info, obj);
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

// 筛选业主姓名
const ageOptions = ref([{ data: "" }]);
const filterAgeMethod = ({ option, row }) => {
  return row.householder === option.data;
};
const filterAgeRecoverMethod = ({ option }) => {
  // 如果是自定义筛选模板，当为点击确认时，该选项将被恢复为默认值
  option.data = "";
};

onMounted(() => {
  if (props.selectedRegionId) {
    getroomInfo(props.selectedRegionId);
  } else {
    getroomInfo();
  }
});

defineExpose({
  getroomInfo
});
</script>

<style lang="scss" scoped>
// .binding_page {
//   width: 100%;
//   height: 30px;
//   position: relative;
//   .tip_icon {
//     width: 20px;
//     position: absolute;
//     top: 0px;
//   }
//   .tip_title {
//     position: absolute;
//     top: 0px;
//     left: 24px;
//   }
// }
.meter_info {
  height: 100%;
  margin-bottom: 10px;
}
.demo-pagination-block {
  margin-top: 10px;
}
// ::v-deep .el-dialog__body {
//   padding: 4px 20px;
// }
::v-deep .el-step__title {
  font-size: 14px;
}

.region_select {
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

:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style>
