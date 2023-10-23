<template>
  <div class="right-content">
    <div class="main" v-if="isshow">
      <el-card class="box-card">
        <div v-show="istree">
          <el-input
            v-model="filterText"
            style="margin-top: 4px"
            placeholder="请输入关键词"
          />
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            ref="treeRef"
            @check="select"
            check-strictly
            :filter-node-method="filterNode"
          />
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
import { getlist, getcompany, getregion } from "@/api/effort";
import { getbuild } from "@/api/build";
// import { gethousehold } from "@/api/household";
import type Node from "element-plus/es/components/tree/src/model/node";
import { getcollector } from "@/api/collector";
import { getlargemeter } from "@/api/largemeter";
import { getGaugeValve } from "@/api/gaugeValve";
// pinia获取右侧栏展开状态
import { useStore } from "@/store/rightlist/state";
import { storeToRefs } from "pinia";
// 创建实例
const Text = useStore();
const { isshow } = storeToRefs(Text); //解构出来的值变为ref对象
console.log(isshow.value, "进入页面右侧栏展开状态");

interface Tree {
  name: string;
  leaf?: boolean;
}

const props = {
  label: "name",
  children: "zones",
  isLeaf: "leaf"
};

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
          pageSize: 10,
          company: node.parent.parent.parent.label,
          region: node.parent.parent.label,
          village: node.parent.label,
          buildingnumber: node.label,
          collector: ""
        };
        getlargemeter(data2).then(res => {
          if (res.retcode == 200) {
            res.data.data.forEach(item => {
              newhouseholdArr.push({
                name: item.largeMeterId + `-大表`,
                leaf: true
              });
            });
            const data3 = {
              company: node.parent.parent.parent.label,
              region: node.parent.parent.label,
              village: node.parent.label,
              buildingnumber: node.label
            };
            getGaugeValve(data3).then(res => {
              if (res.retcode == 200) {
                res.data.data.forEach(item => {
                  newhouseholdArr.push({
                    name:
                      item.unit +
                      "-" +
                      item.houseNumber +
                      "[" +
                      item.generalMeter +
                      "]",
                    leaf: true
                  });
                });
              }
              return resolve(newhouseholdArr);
            });
          }
        });
        // return resolve(newhouseholdArr);
      }
    });
  }
};

//作为组件不展示下侧bottom
const isshowbottom = ref(false);

// 展示右侧地址栏
// const isopentip = ref(false);

// 动态宽度
const tipright = ref("240px");
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
    tipright.value = "240px";
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
const newArr = ref([]);
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
      // isopentip.value = true;
      // isshow.value = true;
    }
  });
};

// const treeRef = ref(null);
const emit = defineEmits(["villageTree"]);
const select = village => {
  console.log(village.name, "点击复选框选择小区");
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
    width: 240px;
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
    z-index: 9999999999;
    width: 12px;
    height: 44px;
  }
}

.es-center {
  padding: 0 !important;
}

::v-deep(.el-card__body) {
  padding: 0 !important;
}
</style>
