<template>
  <div class="right-content">
    <div class="main" v-if="isshow" style="height: 100%">
      <el-card class="box-card">
        <div v-show="istree" style="height: 100vh">
          <el-input
            v-model="filterText"
            style="margin-top: 4px"
            placeholder="请输入关键词"
          />
          <el-scrollbar style="height: 100%">
            <el-tree
              v-if="showwater"
              :props="props"
              :load="loadNode"
              lazy
              show-checkbox
              ref="treeRef"
              @check="select"
              check-strictly
              :filter-node-method="filterNode"
            />
            <el-tree
              v-else
              :props="props"
              :load="loadFireNode"
              lazy
              show-checkbox
              ref="treeRef"
              @check="select"
              check-strictly
              :filter-node-method="filterNode"
            />
            <!-- <span v-else>热表小区</span> -->
          </el-scrollbar>
          <div class="shift-map" @click="openmap('map')" />
        </div>
        <div v-show="!istree">
          <div class="map">
            <Map :isshowbottom="isshowbottom" />
          </div>
          <div class="shift-tree" @click="openmap('tree')" />
        </div>
      </el-card>
    </div>
    <div class="tip" :style="{ right: tipright }">
      <img
        src="~@/assets/tipclose.png"
        alt=""
        style="width: 100%; height: 100%"
        @click="changewidth('close')"
        v-if="isshow"
      />
      <img
        src="~@/assets/tipopen.png"
        alt=""
        style="width: 100%; height: 100%"
        @click="changewidth('open')"
        v-else
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { ElTree } from "element-plus";
import Map from "../../views/welcome/components/center/index.vue";
import {
  getlist,
  getcompany,
  getregion,
  firecompany,
  fireregion,
  firevillage
} from "@/api/effort";
import { getbuild } from "@/api/build";
// import { gethousehold } from "@/api/household";
import type Node from "element-plus/es/components/tree/src/model/node";
import { getcollector } from "@/api/collector";
// import { getlargemeter } from "@/api/largemeter";
import { getGaugeValve } from "@/api/gaugeValve";
// pinia获取右侧栏展开状态
import { useState } from "@/store/rightlist/state";
import { useIconState } from "@/store/logo/state";
import { storeToRefs } from "pinia";
// 创建实例
const Text = useState();
const { isshow } = storeToRefs(Text); //解构出来的值变为ref对象
// console.log(isshow.value, "进入页面右侧栏展开状态");

interface Tree {
  name: string;
  leaf?: boolean;
}

const props = {
  label: "name",
  children: "zones",
  isLeaf: "leaf"
};

// pinia保存当前状态值
const name = useIconState();
// const { showname } = storeToRefs(name); //解构出来的值变为ref对象
// console.log(showname, "rightlist中获取到的tab值");
const showwater = ref(true);
watch(
  () => name.showname,
  newVal => {
    // console.log(newVal, oldVal);
    if (newVal == "water") {
      console.log("现在在水表");
      showwater.value = true;
    } else if (newVal == "fire") {
      console.log("现在在热表");
      showwater.value = false;
    }
  }
);

// 加载水表子节点
const loadNode = (node: Node, resolve) => {
  // console.log(node.label);
  if (node.level === 0) {
    // 展示一级水司名称
    const data = {
      company: ""
    };
    getcompany(data).then(res => {
      if (res.retcode == 200) {
        const newcompanyArr = [];
        res.data.data.forEach(item => {
          newcompanyArr.push({ name: item.name });
        });
        return resolve(newcompanyArr);
      }
    });
    // return resolve([{ name: "XX水司" }]);
  }
  if (node.level === 1) {
    // 展示二级区域名称
    const data = {
      company: node.label,
      region: ""
    };
    getregion(data).then(res => {
      if (res.retcode == 200) {
        const newvillageArr = [];
        res.data.data.forEach(item => {
          newvillageArr.push({ name: item.name });
        });
        return resolve(newvillageArr);
      }
    });
  }
  if (node.level === 2) {
    // 展示三级小区名称
    const data = {
      page: 1,
      pageSize: 1000,
      company: node.parent.label,
      region: node.label,
      village: ""
    };
    getlist(data).then(res => {
      if (res.retcode == 200) {
        const newvillageArr = [];
        res.data.data.forEach(item => {
          newvillageArr.push({ name: item.village });
        });
        return resolve(newvillageArr);
      }
    });
  }
  if (node.level === 3) {
    // 展示四级楼栋名称
    const data = {
      page: 1,
      pageSize: 10,
      company: node.parent.parent.label,
      region: node.parent.label,
      village: node.label,
      build: ""
    };
    getbuild(data).then(res => {
      if (res.retcode == 200) {
        const newbuildArr = [];
        res.data.data.forEach(item => {
          newbuildArr.push({ name: item.buildnumber });
        });
        return resolve(newbuildArr);
      }
    });
  }
  if (node.level === 4) {
    // 展示采集器，大表，表阀(户表)
    const newhouseholdArr = [];
    const data1 = {
      page: 1,
      pageSize: 10,
      company: node.parent.parent.parent.label,
      region: node.parent.parent.label,
      village: node.parent.label,
      build: node.label
    };
    getcollector(data1).then(res => {
      // console.log(res.data);
      if (res.retcode == 200) {
        res.data.data.forEach(item => {
          newhouseholdArr.push({
            name: item.collectroId + `-采集器`,
            leaf: true
          });
        });
        const data2 = {
          page: 1,
          pageSize: 1000,
          company: node.parent.parent.parent.label,
          region: node.parent.parent.label,
          village: node.parent.label,
          buildingnumber: node.label
        };
        getGaugeValve(data2).then(res => {
          if (res.retcode == 200) {
            res.data.data.forEach(item => {
              // 有采集器并且是大表
              if (item.hasCollector && item.isLargemeter) {
                newhouseholdArr.push({
                  name: item.meterId + `-大表`,
                  leaf: true
                });
              } else if (item.hasCollector && !item.isLargemeter) {
                newhouseholdArr.push({
                  name: item.meterId + `-小表`,
                  leaf: true
                });
              } else if (!item.hasCollector) {
                newhouseholdArr.push({
                  name: item.meterId + `-小表(无采集器)`,
                  leaf: true
                });
              }
            });
          }
          return resolve(newhouseholdArr);
        });
        // getlargemeter(data2).then(res => {
        //   if (res.retcode == 200) {
        //     res.data.data.forEach(item => {
        //       newhouseholdArr.push({
        //         name: item.largeMeterId + `-大表`,
        //         leaf: true
        //       });
        //     });
        //     const data3 = {
        //       company: node.parent.parent.parent.label,
        //       region: node.parent.parent.label,
        //       village: node.parent.label,
        //       buildingnumber: node.label
        //     };
        //     getGaugeValve(data3).then(res => {
        //       if (res.retcode == 200) {
        //         res.data.data.forEach(item => {
        //           newhouseholdArr.push({
        //             name:
        //               item.unit +
        //               "-" +
        //               item.houseNumber +
        //               "[" +
        //               item.householdId +
        //               "]",
        //             leaf: true
        //           });
        //         });
        //       }
        //       return resolve(newhouseholdArr);
        //     });
        //   }
        // });
        // return resolve(newhouseholdArr);
      }
    });
  }
};

// 记载热表子节点
const loadFireNode = (node: Node, resolve) => {
  if (node.level === 0) {
    // 展示一级供热公司
    const data = {
      company: ""
    };
    firecompany(data).then(res => {
      if (res.retcode == 200) {
        const newcompanyArr = [];
        res.data.data.forEach(item => {
          newcompanyArr.push({ name: item.name });
        });
        return resolve(newcompanyArr);
      }
    });
  }
  if (node.level === 1) {
    // 展示二级区域名称
    const data = {
      company: node.label,
      region: ""
    };
    fireregion(data).then(res => {
      if (res.retcode == 200) {
        const newregionArr = [];
        res.data.data.forEach(item => {
          newregionArr.push({ name: item.name });
        });
        return resolve(newregionArr);
      }
    });
  }
  if (node.level === 2) {
    const data = {
      page: 1,
      pageSize: 1000,
      company: node.parent.label,
      region: node.label,
      village: ""
    };
    firevillage(data).then(res => {
      if (res.retcode == 200) {
        const newvillageArr = [];
        res.data.data.forEach(item => {
          newvillageArr.push({ name: item.village });
        });
        return resolve(newvillageArr);
      }
    });
  }
};

//作为组件不展示下侧bottom
const isshowbottom = ref(false);

// 展示右侧地址栏
// const isopentip = ref(false);

// 动态宽度
const tipright = ref("310px");
const changewidth = item => {
  if (item == "close") {
    // isopentip.value = false;
    isshow.value = false;
    console.log(isshow.value);
    tipright.value = "0px";
  } else {
    // isopentip.value = true;
    isshow.value = true;
    console.log(isshow.value);
    tipright.value = "310px";
  }
};

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

watch(filterText, val => {
  treeRef.value!.filter(val);
});
const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.name.includes(value);
};

// 左侧打开地图icon
const istree = ref(true);
const openmap = item => {
  if (item == "map") {
    istree.value = false;
  } else {
    istree.value = true;
  }
};

const newArr = ref([]); // 保存水司信息
// 获取水表tree信息
const getallvillage = () => {
  const data = {
    page: 1,
    pageSize: 1000,
    company: "",
    region: "",
    village: ""
  };
  getlist(data).then(res => {
    if (res.retcode == 200) {
      res.data.data.forEach(item => {
        newArr.value.push({ name: item.village });
      });
    }
  });
};

//

// const treeRef = ref(null);
const emit = defineEmits(["villageTree"]);
const select = village => {
  // console.log(village.name, "点击复选框选择小区");
  const res = treeRef.value.getCheckedNodes();
  console.log(res, "res");
  emit("villageTree", village);
};

// 设置右侧栏宽度
const setwidth = () => {
  if (isshow.value == true) {
    changewidth("open");
  } else {
    changewidth("close");
  }
};

onMounted(() => {
  getallvillage(); // 获取小区信息
  setwidth();
});
</script>
<style lang="scss" scoped>
.right-content {
  position: relative;

  .main {
    position: fixed;
    top: 84px;
    right: 0;
    z-index: 99;
    width: 310px;
    height: 100%;
    // background-color: pink;
    .box-card {
      width: 100%;
      height: 100%;

      .shift-map {
        position: absolute;
        bottom: 90px;
        left: 10px;
        width: 30px;
        height: 30px;
        background-image: url("../../assets/map.png");
        background-size: 100% 100%;
      }

      .shift-tree {
        position: absolute;
        bottom: 90px;
        left: 10px;
        width: 30px;
        height: 30px;
        background-image: url("../../assets/tree.png");
        background-size: 100% 100%;
      }

      .map {
        width: 100%;
        height: 100%;
      }
    }
  }

  .tip {
    position: fixed;
    top: 50%;
    z-index: 1300;
    width: 12px;
    height: 44px;
  }
}

.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.es-center {
  padding: 0 !important;
  height: 100vh;
}

::v-deep(.el-card__body) {
  padding: 0 !important;
}

::v-deep {
  .is-leaf::before {
    // 隐藏或加透明都可以
    // display: none;
    opacity: 0;
  }
}
</style>
