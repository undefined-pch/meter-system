<template>
  <div class="es-center">
    <div class="es-center-top" v-show="isShowcenter">
      <!-- <Map /> -->
      <el-input
        class="keyword"
        v-model="lookupwait"
        @change="search"
        clearable
        placeholder="请输入区域"
        v-if="props.isshowbottom"
      />
      <div
        style="
          position: fixed;
          z-index: 99999;
          width: 15px;
          height: 15px;
          margin-left: 180px;
          color: black;
        "
      >
        <svg
          t="1689411675945"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2265"
          width="24"
          height="24"
          v-show="isshowBack"
          @click="backmain"
        >
          <path
            d="M918.8 411.9c-61.6-45.5-146.1-69.6-244.5-69.6H53.4L311.9 130c9.5-7.8 10.9-21.8 3.1-31.3-7.8-9.5-21.8-10.9-31.3-3.1L24 308.8l-1.6 1.5C8 324.7 0 344 0 364.6s8 39.9 22.4 54.3l0.8 0.8 260.4 213.9c4.1 3.4 9.1 5.1 14.1 5.1 6.4 0 12.8-2.8 17.2-8.1 7.8-9.5 6.4-23.5-3.1-31.3L53.4 386.9h620.9c147.5 0 305.2 63.9 305.2 243.3 0 178.7-153.3 258.8-305.2 258.8H328.8c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h345.5c95.7 0 182.8-27.7 245.2-77.9 68.4-55 104.5-132.9 104.5-225.4 0-92-36.4-167.5-105.2-218.4z"
            fill="#ffffff"
            p-id="2266"
          />
        </svg>
      </div>
      <baidu-map
        class="map"
        :style="props.isshowbottom === true ? 'height:540px' : 'height:118%'"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :scroll-wheel-zoom="isTelescoping"
        :mapStyle="mapStyle"
        @init="addPoints('first', '')"
        @click="getpoint"
        @zoomstart="gd"
      >
        <bm-local-search :keyword="lookup" :auto-viewport="true" />
        <bm-point-collection
          :points="points"
          shape="BMAP_POINT_SHAPE_WATERDROP"
          color="red"
          size="BMAP_POINT_SIZE_BIGGER"
          @click="clickHandler"
          @mouseover="mousein"
          @mouseout="mouseout"
        />
      </baidu-map>
    </div>
    <div class="es-center-top" v-show="!isShowcenter">
      <div style="position: fixed; width: 15px; height: 15px">
        <svg
          t="1689669883357"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2282"
          width="24"
          height="24"
          @click="backbuild()"
        >
          <path
            d="M834.77 351.69c-58.72-58.72-136.84-91.07-219.86-91.07H262.82l52.66-45.16c18.61-15.94 20.7-43.93 4.76-62.5-15.94-18.61-43.93-20.74-62.47-4.8L114.15 271.3c-0.53 0.46-1.01 0.96-1.52 1.44-0.41 0.39-0.83 0.76-1.22 1.16-0.64 0.65-1.23 1.33-1.83 2.01-0.37 0.42-0.74 0.84-1.09 1.28-0.55 0.68-1.06 1.39-1.57 2.1-0.35 0.49-0.7 0.99-1.03 1.5-0.45 0.69-0.87 1.39-1.28 2.1-0.34 0.58-0.66 1.17-0.97 1.77-0.35 0.68-0.68 1.37-1 2.08-0.3 0.66-0.57 1.32-0.84 1.99-0.28 0.7-0.54 1.41-0.78 2.12-0.22 0.67-0.43 1.35-0.62 2.04-0.22 0.78-0.42 1.55-0.6 2.34-0.13 0.6-0.25 1.21-0.36 1.83-0.17 0.93-0.32 1.86-0.43 2.8-0.05 0.45-0.09 0.9-0.13 1.36-0.06 0.68-0.16 1.35-0.19 2.04-0.12 3.49 0.18 6.94 0.85 10.31 0.04 0.19 0.07 0.38 0.11 0.57 0.25 1.17 0.55 2.33 0.89 3.48 0.1 0.32 0.19 0.64 0.3 0.96 0.34 1.04 0.71 2.06 1.12 3.07a41.462 41.462 0 0 0 1.83 3.95c0.18 0.35 0.37 0.69 0.57 1.03 0.53 0.94 1.08 1.86 1.67 2.76 0.19 0.29 0.39 0.57 0.59 0.86 0.64 0.92 1.3 1.82 2.01 2.69 0.18 0.22 0.37 0.43 0.55 0.64 0.69 0.82 1.42 1.62 2.17 2.39 0.15 0.15 0.29 0.31 0.44 0.46l143.48 143.44c8.66 8.66 19.98 12.98 31.31 12.98 11.33 0 22.72-4.33 31.38-12.98 17.24-17.31 17.24-45.37-0.07-62.68L250 349.28h364.86c59.37 0 115.2 23.12 157.18 65.1 42.05 42.02 65.21 97.85 65.21 157.25 0 122.63-99.83 222.42-222.46 222.46H266.07c-24.45 0-44.29 19.84-44.29 44.33s19.84 44.33 44.29 44.33h348.84c171.46-0.04 310.97-139.61 310.97-311.11 0-83.08-32.32-161.2-91.11-219.95z"
            fill="#2c2c2c"
            p-id="2283"
          />
        </svg>
      </div>
      <img
        src="~@/assets/buildhu.jpg"
        alt=""
        style="width: 100%; height: 96%; margin-top: 12px"
      />
    </div>
    <Bottom v-if="props.isshowbottom" />
    <!-- <AMap /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Bottom from "./Bottom.vue";
// import { useDebounceFn } from "@vueuse/core";
import { emitter } from "@/utils/mitt";
import { getlist } from "@/api/effort";
import { getbuild } from "@/api/build";
const props = defineProps<{
  isshowbottom: boolean;
}>();

const isShowcenter = ref(true);

// 对定位搜索进行防抖
// const debouncedFn = useDebounceFn(item => {
//   // do something
//   lookup.value = item;
// }, 500);
const search = item => {
  console.log(item, "item");
  lookup.value = item;
  // return debouncedFn(item);
};

// 返回到小区页面
const backbuild = () => {
  isShowcenter.value = true;
};

// window.addEventListener("resize", debouncedFn);
const center = ref({ lng: 0, lat: 0 });
const zoom = ref(10);
const isshowBack = ref(false);

const handler = ({ BMap, map }) => {
  console.log(BMap, map);
  center.value.lng = 116.40352205431907;
  center.value.lat = 39.92415993397732;
  zoom.value = 6;
};

const backmain = () => {
  addPoints("first", "");
  isTelescoping.value = true; // 进入小区后禁止用户滚轮缩放
  zoom.value = 6;
  // lng: 116.40352205431907, lat: 39.92415993397732
  center.value.lng = 116.40352205431907;
  center.value.lat = 39.92415993397732;
  isshowBack.value = false;
  // echarts数据回退
  level.value = 1;
  emitter.emit("level", level.value);
};

// 搜索定位的关键词
const lookupwait = ref("杭州");
const lookup = ref("杭州");
const backpointlng = ref(0);
const backpointlat = ref(0);

// 是否可以让地图伸缩
const isTelescoping = ref(true);
// const isfirst = ref(true); // 根据展示不同的聚合点
// 地图中定位的点
const clickHandler = e => {
  // 如果地图可以伸缩那就是第一级，不能伸缩是第二级
  if (isTelescoping.value == true) {
    center.value.lng = e.point.lng;
    center.value.lat = e.point.lat;
    backpointlng.value = e.point.lng;
    backpointlat.value = e.point.lat;
    zoom.value = 18;
    addPoints("second", e);
    isTelescoping.value = false; // 进入小区后禁止用户滚轮缩放
  } else if (isTelescoping.value == false) {
    console.log("进入楼栋页面");
    isShowcenter.value = false;
    // 改变组件数据
    changeLevel("third");
  }

  // 测试{lng: 120.03543411254563, lat: 30.292463656254085}
};
const points = ref([]); // 小区定位
// 加载小区图标
const addPoints = (item, e) => {
  // 小区/楼栋定位点
  let pointAll: any = [];
  if (item == "first") {
    pointAll = [];
    const data = {
      page: 1,
      pageSize: 1000,
      company: "",
      region: "",
      village: ""
    };
    getlist(data).then(res => {
      if (res.retcode == 200) {
        const newArr = [];
        // const tableData = res.data.data;
        res.data.data.forEach(item => {
          newArr.push({ lng: item.jd, lat: item.wd, village: item.village });
        });
        points.value = newArr;
      }
    });
  } else if (item == "second") {
    points.value = [];
    const data = {
      page: 1,
      pageSize: 1000,
      // keyword: e.point.village
      company: "",
      region: "",
      village: e.point.village,
      buildnumber: ""
    };
    getbuild(data).then(res => {
      if (res.retcode == 200) {
        console.log(res.data);
        const newArr = [];
        res.data.data.forEach(item => {
          newArr.push({
            lng: item.jd,
            lat: item.wd,
            build: item.buildnumber
          });
        });
        points.value = newArr;
      }
    });

    // pointAll.push(fdbuild1, fdbuild2);
    // 展示返回按钮
    isshowBack.value = true;
    points.value = pointAll;
    // 兄弟组件改变层级
    changeLevel("second");
  }
};

const level = ref(2);
const changeLevel = item => {
  if (item == "second") {
    level.value = 2;
    emitter.emit("level", level.value);
  } else if (item == "third") {
    level.value = 3;
    emitter.emit("level", level.value);
  }
};

// 点击地图中的点获取坐标
const getpoint = ({ type, target, point }: any) => {
  console.log(type, target, point);
};

// 地图鼠标滚轮监听
const gd = () => {
  console.log("滚轮事件");
};

// 鼠标移动到坐标点时触发的事件，解决点击和划过事件冲突问题
const mousein = item => {
  // console.log(currentTarget, point, returnValue, target, type);
  console.log(item.point.id);
};
// 鼠标移出事件
const mouseout = item => {
  console.log(item.point.id, "移出事件");
};

// 地图样式
const mapStyle = ref({
  styleJson: [
    {
      featureType: "land",
      elementType: "geometry",
      stylers: {
        color: "#242f3eff"
      }
    },
    {
      featureType: "manmade",
      elementType: "geometry",
      stylers: {
        color: "#242f3eff"
      }
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: {
        color: "#17263cff"
      }
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: {
        color: "#9e7d60ff"
      }
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: {
        color: "#554631ff"
      }
    },
    {
      featureType: "districtlabel",
      elementType: "labels.text.fill",
      stylers: {
        color: "#d69563ff"
      }
    },
    {
      featureType: "districtlabel",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#17263cff",
        weight: "3"
      }
    },
    {
      featureType: "poilabel",
      elementType: "labels.text.fill",
      stylers: {
        color: "#d69563ff"
      }
    },
    {
      featureType: "poilabel",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#17263cff",
        weight: "3"
      }
    },
    {
      featureType: "subway",
      elementType: "geometry",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "railway",
      elementType: "geometry",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "poilabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "subwaylabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "subwaylabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "tertiarywaysign",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "tertiarywaysign",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "provincialwaysign",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "provincialwaysign",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "nationalwaysign",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "nationalwaysign",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "highwaysign",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "highwaysign",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "green",
      elementType: "geometry",
      stylers: {
        color: "#263b3eff"
      }
    },
    {
      featureType: "nationalwaysign",
      elementType: "labels.text.fill",
      stylers: {
        color: "#d0021bff"
      }
    },
    {
      featureType: "nationalwaysign",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#ffffffff"
      }
    },
    {
      featureType: "city",
      elementType: "labels",
      stylers: {
        visibility: "on"
      }
    },
    {
      featureType: "city",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "city",
      elementType: "labels.text.fill",
      stylers: {
        color: "#d69563ff"
      }
    },
    {
      featureType: "city",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#17263cff"
      }
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: {
        color: "#d69563ff"
      }
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#242f3eff"
      }
    },
    {
      featureType: "local",
      elementType: "geometry.fill",
      stylers: {
        color: "#38414eff"
      }
    },
    {
      featureType: "local",
      elementType: "geometry.stroke",
      stylers: {
        color: "#ffffff00"
      }
    },
    {
      featureType: "fourlevelway",
      elementType: "geometry.fill",
      stylers: {
        color: "#38414eff"
      }
    },
    {
      featureType: "fourlevelway",
      elementType: "geometry.stroke",
      stylers: {
        color: "#ffffff00"
      }
    },
    {
      featureType: "tertiaryway",
      elementType: "geometry.fill",
      stylers: {
        color: "#38414eff"
      }
    },
    {
      featureType: "tertiaryway",
      elementType: "geometry.stroke",
      stylers: {
        color: "#ffffff00"
      }
    },
    {
      featureType: "tertiaryway",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "fourlevelway",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "highway",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry.fill",
      stylers: {
        color: "#9e7d60ff"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry.stroke",
      stylers: {
        color: "#554631ff"
      }
    },
    {
      featureType: "provincialway",
      elementType: "geometry.fill",
      stylers: {
        color: "#9e7d60ff"
      }
    },
    {
      featureType: "provincialway",
      elementType: "geometry.stroke",
      stylers: {
        color: "#554631ff"
      }
    },
    {
      featureType: "tertiaryway",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "fourlevelway",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "highway",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "nationalway",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "nationalway",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "nationalway",
      elementType: "geometry.fill",
      stylers: {
        color: "#9e7d60ff"
      }
    },
    {
      featureType: "nationalway",
      elementType: "geometry.stroke",
      stylers: {
        color: "#554631ff"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "geometry.fill",
      stylers: {
        color: "#9e7d60ff"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "geometry.stroke",
      stylers: {
        color: "#554631ff"
      }
    },
    {
      featureType: "arterial",
      elementType: "geometry.fill",
      stylers: {
        color: "#9e7d60ff"
      }
    },
    {
      featureType: "arterial",
      elementType: "geometry.stroke",
      stylers: {
        color: "#554631fa"
      }
    },
    {
      featureType: "medicallabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "medicallabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "entertainmentlabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "entertainmentlabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "estatelabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "estatelabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "businesstowerlabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "businesstowerlabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "companylabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "companylabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "governmentlabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "governmentlabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "restaurantlabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "restaurantlabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "hotellabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "hotellabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "shoppinglabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "shoppinglabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "lifeservicelabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "lifeservicelabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "carservicelabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "carservicelabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "financelabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "financelabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "otherlabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "otherlabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "airportlabel",
      elementType: "labels",
      stylers: {
        visibility: "on"
      }
    },
    {
      featureType: "airportlabel",
      elementType: "labels.text.fill",
      stylers: {
        color: "#d69563ff"
      }
    },
    {
      featureType: "airportlabel",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#17263cff"
      }
    },
    {
      featureType: "airportlabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "highway",
      stylers: {
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      stylers: {
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      stylers: {
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      stylers: {
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      stylers: {
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      stylers: {
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      stylers: {
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      stylers: {
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      stylers: {
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      stylers: {
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "nationalway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "highway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "provincialway",
      stylers: {
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "8-9"
      }
    },
    {
      featureType: "provincialway",
      stylers: {
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "8-9"
      }
    },
    {
      featureType: "provincialway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "8-9"
      }
    },
    {
      featureType: "provincialway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "8-9"
      }
    },
    {
      featureType: "provincialway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "8-9"
      }
    },
    {
      featureType: "provincialway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "8-9"
      }
    },
    {
      featureType: "cityhighway",
      stylers: {
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      stylers: {
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      stylers: {
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      stylers: {
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      stylers: {
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "6",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "7",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "8",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "6-10"
      }
    },
    {
      featureType: "arterial",
      stylers: {
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "9-10"
      }
    },
    {
      featureType: "arterial",
      stylers: {
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "9-10"
      }
    },
    {
      featureType: "arterial",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "9-10"
      }
    },
    {
      featureType: "arterial",
      elementType: "geometry",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "9-10"
      }
    },
    {
      featureType: "arterial",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "9",
        curZoomRegionId: "0",
        curZoomRegion: "9-10"
      }
    },
    {
      featureType: "arterial",
      elementType: "labels",
      stylers: {
        visibility: "off",
        level: "10",
        curZoomRegionId: "0",
        curZoomRegion: "9-10"
      }
    },
    {
      featureType: "building",
      elementType: "geometry.topfill",
      stylers: {
        color: "#2a3341ff"
      }
    },
    {
      featureType: "building",
      elementType: "geometry.sidefill",
      stylers: {
        color: "#313b4cff"
      }
    },
    {
      featureType: "building",
      elementType: "geometry.stroke",
      stylers: {
        color: "#1a212eff"
      }
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "provincialway",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "arterial",
      elementType: "labels.text.fill",
      stylers: {
        color: "#759879ff"
      }
    },
    {
      featureType: "provincialway",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "cityhighway",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "arterial",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#1a2e1cff"
      }
    },
    {
      featureType: "local",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "manmade",
      elementType: "labels.text.fill",
      stylers: {
        color: "#d69563ff"
      }
    },
    {
      featureType: "manmade",
      elementType: "labels.text.stroke",
      stylers: {
        color: "#17263cff"
      }
    },
    {
      featureType: "subwaystation",
      elementType: "geometry",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "transportationlabel",
      elementType: "labels.icon",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "transportationlabel",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "estate",
      elementType: "geometry",
      stylers: {
        color: "#2a3341ff"
      }
    }
  ]
});
</script>

<style lang="scss" scoped>
.es-center {
  position: relative;
  width: 100%;
  height: 700px;
  padding: 0 16px;
  animation: slideAndFade 1.5s;

  .es-center-top {
    height: calc(100% - 150px);
  }
}

@keyframes slideAndFade {
  0% {
    opacity: 0;
    transform: translateY(218px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.keyword {
  position: fixed;
  z-index: 99;
  width: 160px;
  margin-left: 10px;
}

.map {
  // width: 100%;
  // height: 540px;
  margin: 10px;
  overflow: hidden;
}
</style>
