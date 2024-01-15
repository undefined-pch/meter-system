<template>
  <div class="owner">
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
        <el-button @click="addOwner" type="primary" plain>添加</el-button>
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
        <vxe-column field="name" title="业主姓名" width="110" fixed="left" />
        <vxe-column field="sex" title="性别" width="110" />
        <vxe-column field="account" title="手机号" width="110" />
        <vxe-column field="roomsNumber" title="关联房间数" width="110" />
        <vxe-column field="roomName" title="关联房间" width="110" />
        <vxe-column field="waterMeter" title="关联水表" width="220">
          <template #default="{ row }">
            <template v-if="row.waterMeter[0].length !== 0">
              <template v-for="(item, index) in row.waterMeter[0]" :key="index">
                <el-tag type="success">{{ item }}</el-tag>
                <span v-if="index !== row.waterMeter[0].length - 1">、</span>
              </template>
            </template>
            <el-tag v-else type="info">未关联</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="hotMeter" title="关联热表" width="110" />
        <vxe-column field="date" title="添加时间" width="110" />
        <vxe-column field="date" title="启禁状态" width="110" />
        <vxe-column field="founder" title="创建人" width="110" />
        <vxe-column field="notes" title="备注" width="180" />
        <vxe-column title="操作" width="110" fixed="right" align="center">
          <template #default>
            <vxe-button type="text" status="primary">修改</vxe-button>
            <vxe-button type="text" status="danger">删除</vxe-button>
            <vxe-button type="text" status="primary">重置密码</vxe-button>
            <vxe-button type="text" status="warning">禁用</vxe-button>
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
    <!-- 新增业主信息弹框 -->
    <el-dialog v-model="addOwnerVisible" title="新增业主信息" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-row>
          <el-col span="24">
            <el-form-item
              label="业主姓名"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                placeholder="请输入业主姓名"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item
              label="登录账号"
              :label-width="formLabelWidth"
              prop="account"
            >
              <el-input
                v-model="form.account"
                autocomplete="off"
                placeholder="请输入手机或者登录账号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-radio-group
                v-model="form.sex"
                class="ml-4"
                style="margin-top: -4px"
              >
                <el-radio label="男" size="large">男</el-radio>
                <el-radio label="女" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <el-form-item
              label="绑定房间"
              :label-width="formLabelWidth"
              prop="roomId"
            >
              <el-tree-select
                v-model="form.roomId"
                :props="props"
                :data="batchSameList"
                :load="loadFireNode"
                show-checkbox
                multiple
                lazy
                node-key="id"
                :render-after-expand="false"
                @change="changeRegion"
                class="region_select1"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col span="24">
            <el-form-item
              label="绑定房间"
              :label-width="formLabelWidth"
              prop="roomId"
            >
              <el-select
                v-model="form.roomId"
                multiple
                @change="changeMeterId"
                placeholder="请选择房间号"
                style="width: 100%"
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
        </el-row> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addOwnerVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { allregion } from "@/api/allregion.js";
import { getroom } from "@/api/room.js";
import { ElMessage } from "element-plus";
import { ownerAdd, getOwner } from "@/api/owner.js";

const addOwnerVisible = ref(false);

const formLabelWidth = "110px"; // 表单文字宽度

// 表单form
const form = reactive({
  name: "", // 业主名称
  // region: "", // 区域名称
  account: "", // 账号
  sex: "男", // 性别
  roomId: [], // 关联房间id
  roomName: [], // 关联房间名称
  notes: "" // 备注
});

// 表单规则
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入业主姓名",
      trigger: "blur"
    }
  ],
  // region: [
  //   {
  //     required: true,
  //     message: "请选择区域",
  //     trigger: "blur"
  //   }
  // ],
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur"
    }
  ],
  roomId: [
    {
      required: true,
      message: "请输入绑定房间信息",
      trigger: "blur"
    }
  ]
});

// 新增按钮
const addOwner = () => {
  addOwnerVisible.value = true;
};

const batchSameList = ref([]); // 所属区域树形
// 数形格式
const props = {
  label: node => {
    return `${node.name}  -  ${node.type}`;
  },
  children: "child",
  isLeaf: data => {
    if (data.hasChild === true) {
      return false;
    } else {
      return true;
    }
  },
  disabled: data => {
    if (data.roomBelong) {
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
          type: item.type,
          roomBelong: item.roomBelong
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
            type: item.type,
            roomBelong: item.roomBelong
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
            type: item.type,
            roomBelong: item.roomBelong
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
            type: item.type,
            roomBelong: item.roomBelong
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
            type: item.type,
            roomBelong: item.roomBelong
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
            type: item.type,
            roomBelong: item.roomBelong
          });
        });
        return resolve(newvillageArr);
      }
    });
  }
};

const roomsList = ref([]); // 房间列表
const ruleFormRef = ref(); // 表单dom

const changeRegion = val => {
  console.log(val, "选中区域的值");
  // 调用查找房间信息的接口
  const data = {
    page: 1,
    pageSize: 1000,
    regionId: val,
    unBoundRoom: "unBoundRoom"
  };
  getroom(data).then(res => {
    if (res.retcode == 200) {
      roomsList.value = res.data.data;
    }
  });
};

// 新增业主信息
const submitForm = async formEl => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // console.log("新增成功");
      // active.value++;
      ownerAdd(form).then(res => {
        if (res.retcode == 200) {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success"
          });
          addOwnerVisible.value = false;
          getOwnerList();
          // console.log(demo3.tableData, "tableData");
        }
      });
    } else {
      ElMessage({
        showClose: true,
        message: "请将房间信息填写完整！",
        type: "error"
      });
    }
  });
};

const tableData = ref([]);
const getOwnerList = () => {
  const data = {
    page: 1,
    pageSize: 1000
  };
  getOwner(data).then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
    }
  });
};

onMounted(() => {
  getOwnerList();
});
</script>

<style lang="scss" scoped>
.demo-pagination-block {
  margin-top: 10px;
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
