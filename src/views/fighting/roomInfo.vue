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
        <el-button @click="addsMeter" type="primary" plain>批量导入</el-button>
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
        <vxe-column field="roomName" title="房间号" width="110" fixed="left" />
        <vxe-column field="fullRegion" title="所属区域" width="110" />
        <vxe-column field="householder" title="业主姓名" width="110" />
        <vxe-column field="phone" title="联络方式" width="110" />
        <vxe-column field="unit" title="单元号" width="110" />
        <vxe-column field="level" title="楼层" width="110" />
        <!-- <vxe-column field="hotMeter" title="关联热表" width="110">
          <template #default="{ row }">
            <el-tag v-if="row.hotMeter.length !== 0" type="success">{{
              row.hotMeter
            }}</el-tag>
            <el-tag v-else type="info">未关联</el-tag>
          </template>
        </vxe-column> -->
        <!-- <vxe-column field="waterMeter" title="关联水表" width="220">
          <template #default="{ row }">
            <template v-if="row.waterMeter.length !== 0">
              <template
                v-for="(item, index) in row.waterMeterName"
                :key="index"
              >
                <el-tag type="success">{{ item }}</el-tag>
                <span v-if="index !== row.waterMeterName.length - 1">、</span>
              </template>
            </template>
            <el-tag v-else type="info">未关联</el-tag>
          </template>
        </vxe-column> -->
        <vxe-column field="date" title="添加时间" width="110" />
        <vxe-column field="founder" title="创建人" width="110" />
        <vxe-column field="notes" title="备注" width="180" />
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
    <el-dialog v-model="addRoomVisible" title="新增房间信息" width="40%">
      <!-- <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写房间信息" />
        <el-step title="绑定表计" />
        <el-step title="完成" />
      </el-steps> -->
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <!-- <div v-show="active == 0"> -->
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
                @change="handleChange"
                class="region_select"
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
              <el-input v-model="form.roomName" autocomplete="off"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="面积"
              :label-width="formLabelWidth"
              prop="area"
            >
              <el-input v-model="form.area" autocomplete="off"
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
              <el-input v-model="form.people" autocomplete="off"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="单元号"
              :label-width="formLabelWidth"
              prop="unit"
            >
              <el-input v-model="form.unit" autocomplete="off"
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
              <el-input v-model="form.level" autocomplete="off"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="户主姓名"
              :label-width="formLabelWidth"
              prop="householder"
            >
              <el-input v-model="form.householder" autocomplete="off"
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
              <el-input v-model="form.phone" autocomplete="off"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="户主性别"
              :label-width="formLabelWidth"
              prop="phone"
            >
              <!-- <el-input v-model="form.sex" autocomplete="off"
            /> -->
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
        <!-- <div v-show="active == 1" class="binding_page">
          <el-row>
            <el-col :span="24">
              <el-alert
                title="水表热表一旦保存，将不允许修改，如需修改请先销表！"
                type="info"
                style="margin-bottom: 10px"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="添加水表" :label-width="formLabelWidth">
                <el-select
                  v-model="form.waterMeter"
                  multiple
                  @change="changeMeterId"
                  placeholder="请选择水表表号"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in waterMeterList"
                    :key="item._id"
                    :label="item.meterId"
                    :value="item._id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <p v-if="form.waterMeter.length == 0">暂无水表信息</p>
          <div v-else class="meter_info">
            <el-table :data="selectWaterMeterList" style="width: 100%">
              <el-table-column prop="meterId" label="表号" width="180" />
              <el-table-column prop="meterType" label="表类型" width="180" />
              <el-table-column prop="feeScheme" label="收费方案" />
            </el-table>
          </div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="添加热表" :label-width="formLabelWidth">
                <el-select
                  v-model="form.hotMeter"
                  multiple
                  placeholder="请选择热表表号"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in hotMeterList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /> </el-select
              ></el-form-item>
            </el-col>
          </el-row>
          <p>暂无热表信息</p>
        </div> -->
        <!-- <div v-show="active == 2" class="binding_page">
          <img
            src="@/assets/submitsuccess.png"
            alt=""
            style="margin: auto; margin-top: 40px"
          />
          <p
            style="
              text-align: center;
              line-height: 40px;
              font-size: 17px;
              color: #53a7ff;
            "
          >
            新增房间信息完成
          </p>
        </div> -->
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
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { allregion } from "@/api/allregion.js";
import { getGaugeValve } from "@/api/gaugeValve.js";
import { roomAdd, getroom } from "@/api/room.js";

const addRoomVisible = ref(false);
const formLabelWidth = "100px"; // 表单文字宽度

// const nowSelectRegion = ref(""); //当前选中的区域信息

const batchSameList = ref([]); // 所属区域树形
const props = {
  label: node => {
    return `${node.name}  -  ${node.type}`;
  },
  children: "child",
  isLeaf: data => {
    if (data.type == "楼栋") {
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
  sex: "男",
  // waterMeter: [], // 绑定的水表
  // hotMeter: [], // 绑定的热表
  notes: "" // 备注
  // waterMeterName: [] // 选中水表信息
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
  ]
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

const region_select = ref();

const tableData = ref([]);
const getroomInfo = () => {
  const data = {
    page: 1,
    pageSize: 1000
  };
  getroom(data).then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
    }
  });
};

onMounted(() => {
  getroomInfo();
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
::v-deep .el-dialog__body {
  padding: 4px 20px;
}
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
</style>
