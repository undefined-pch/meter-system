<template>
  <div class="table-main">
    <div class="table-main">
      <vxe-toolbar custom ref="toolbarRef">
        <template #buttons>
          <div style="line-height: 50px">
            水司名称:
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
              style=" width: 150px;margin-left: 10px"
            >
              <el-option
                v-for="item in searchCompanyoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
            区域名称:
            <el-select
              v-model="RegionKeyword"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入要查找的区域名称"
              :remote-method="query => remoteRegion(query, 'false')"
              :loading="searchRegionloading"
              style=" width: 150px;margin-left: 10px"
              @change="searchRegionLists"
            >
              <el-option
                v-for="item in searchRegionoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
            小区名称:
            <el-select
              v-model="VillageKeyword"
              filterable
              clearable
              remote
              reserve-keyword
              placeholder="请输入要查找的小区名称"
              :remote-method="query => remoteVillage(query, 'false')"
              :loading="searchVillageloading"
              style=" width: 150px;margin-left: 10px"
              @change="searchVillageLists"
            >
              <el-option
                v-for="item in searchVillageoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
            <vxe-button
              type="primary"
              icon="vxe-icon-square-plus"
              @click="addBuild"
              style="margin-left: 10px"
              >新增</vxe-button
            >
          </div>
        </template>
        <template #tools>
          <vxe-button
            icon="vxe-icon-download"
            style="margin-right: 10px"
            @click="downloadExcel"
            >下载模板</vxe-button
          >
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            style="overflow: hidden"
            :show-file-list="false"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            ref="uploadRef"
          >
            <vxe-button status="primary" style="margin-right: 10px"
              >批量导入</vxe-button
            >
          </el-upload>
          <vxe-button
            status="danger"
            style="margin-right: 10px"
            @click="removeSelectRowEvent"
            >批量删除</vxe-button
          >
        </template>
      </vxe-toolbar>
      <vxe-table
        border
        show-overflow
        ref="xTable"
        height="564"
        :column-config="{ resizable: true }"
        :row-config="{ isHover: true }"
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent"
      >
        <vxe-column type="checkbox" width="50" fixed="left" />
        <vxe-column type="seq" title="序号" width="60" fixed="left" />
        <vxe-column field="company" sortable title="所属水司" width="100" />
        <vxe-column field="region" sortable title="区域" width="80" />
        <vxe-column field="village" sortable title="小区名称" width="100" />
        <vxe-column field="buildnumber" sortable title="楼栋编号" width="100" />
        <vxe-column field="level" sortable title="楼层数" width="100" />
        <vxe-column
          field="households"
          sortable
          title="户数"
          width="80"
          show-overflow
        />
        <vxe-column
          field="types"
          sortable
          title="楼栋类型"
          width="100"
          show-header-overflow
        />
        <vxe-column
          field="founder"
          sortable
          title="创建人"
          width="100"
          show-header-overflow
        />
        <vxe-column
          field="creationtime"
          sortable
          title="创建时间"
          width="100"
          show-header-overflow
        />
        <vxe-column
          field="updated"
          sortable
          title="最近更新人"
          width="100"
          show-header-overflow
        />
        <vxe-column
          field="updatedtime"
          sortable
          title="最近时间"
          width="100"
          show-header-overflow
        />
        <vxe-column field="notes" title="备注" width="100" />
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
      <div>
        <vxe-pager
          v-model:current-page="pageVO2.currentPage"
          :total="pageVO2.total"
          :page-size="10"
          @page-change="getallbuild"
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
      <vxe-modal
        v-model="showEdit"
        :title="selectRow ? '编辑&保存' : '新增&保存'"
        width="800"
        height="88%"
        min-width="600"
        min-height="300"
        :loading="submitLoading"
        resize
        destroy-on-close
      >
        <template #default>
          <vxe-form
            :data="formData"
            :rules="formRules"
            title-align="right"
            title-width="100"
            @submit="submitEvent"
          >
            <vxe-form-item
              field="company"
              title="所属水司"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.company"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入要查找的水司名称"
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
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.region"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入要查找的区域名称"
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
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <vxe-input
                  v-model="data.village"
                  placeholder="请输入小区名称"
                /> -->
                <el-select
                  v-model="data.village"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入要查找的小区名称"
                  :remote-method="query => remoteVillage(query, 'true')"
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
              field="buildnumber"
              title="楼栋编号"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.buildnumber"
                  placeholder="请输入楼栋编号"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="level"
              title="楼层数"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.level"
                  type="integer"
                  placeholder="请输入楼层数"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="households"
              title="户数"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.households"
                  type="integer"
                  placeholder="请输入户数"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="types"
              title="楼栋类型"
              :span="12"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <vxe-input v-model="data.types" placeholder="请输入楼栋类型" /> -->
                <el-radio-group v-model="data.types" class="ml-4">
                  <el-radio label="居民" size="large">居民</el-radio>
                  <el-radio label="非居民" size="large">非居民</el-radio>
                </el-radio-group>
              </template>
            </vxe-form-item>
            <vxe-form-item field="jd" title="经度" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.jd" placeholder="请输入经度" />
              </template>
            </vxe-form-item>
            <vxe-form-item field="wd" title="纬度" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input
                  v-model="data.wd"
                  placeholder="请输入纬度"
                  transfer
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="pitture"
              title="小区图片"
              :span="24"
              :item-render="{}"
            >
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio label="1" size="large">默认icon</el-radio>
                <el-radio label="2" size="large">自定义icon</el-radio>
              </el-radio-group>
              <el-upload
                class="upload-demo"
                v-model:file-list="fileList"
                :show-file-list="true"
                :on-change="fileChange"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :http-request:void="uploadIon"
                ref="formRef"
                v-if="Number(radio1) == 2"
              >
                <el-button type="primary">小区图片</el-button>
                <template #tip>
                  <div class="el-upload__tip">jpg/png文件,大小小于500KB</div>
                </template>
              </el-upload>
            </vxe-form-item>
            <vxe-form-item :span="24">
              <div class="map">
                <!-- <div class="city">请输入城市</div> -->
                <!-- <el-input class="city" v-model="city" placeholder="请输入城市"></el-input> -->
                <!-- <el-input class="keyword" v-model="keyword" clearable placeholder="请输入关键字"></el-input> -->
                <baidu-map
                  class="baidu-map"
                  :center="center"
                  :zoom="zoom"
                  @ready="handler"
                  @click="getpoint"
                  :scroll-wheel-zoom="true"
                >
                  <bm-local-search :auto-viewport="true" />
                  <bm-marker
                    :position="points"
                    :dragging="true"
                    @dragend="dragend"
                    :icon="{
                      url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
                      size: { width: 300, height: 157 }
                    }"
                  />
                </baidu-map>
              </div>
            </vxe-form-item>
            <vxe-form-item align="center" title-align="left" :span="24">
              <template #default>
                <vxe-button type="submit">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>
    </div>
    <!-- <rightlist @villageTree="getVillage" /> -->
    <rightlist />
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"; // 导入路由模块
import { ref, reactive, onActivated, onMounted, nextTick } from "vue";
import {
  VXETable,
  VxeFormPropTypes,
  VxeTableInstance,
  VxeToolbarInstance
} from "vxe-table";
import type { UploadProps } from "element-plus";
import { ElMessageBox, ElMessage } from "element-plus";
import { useDebounceFn } from "@vueuse/core";
import rightlist from "@/components/rightlist/rightlist.vue";
// import { getvillage } from "@/api/build"; // 获取所有小区信息
// import { getlist } from "@/api/effort";
import {
  buildadd,
  getbuild,
  buildfix,
  builddelete,
  lookupregion
} from "@/api/build";
import { getregion, getcompany, getlist } from "@/api/effort";
// 使用路由
const route: any = useRoute();
const router = useRouter();
// 下拉框当前小区楼栋数据
// const lddata = ref([]);
const value1 = ref("222"); // 选中的下拉框选项
// const value2 = ref(""); // 楼栋下拉框
// 选择是否自定义上传icon
const radio1 = ref("1");
const formRef = ref(null); // 表单ref
// 对上传的文件进行校验
const fileChange = file => {
  // debugger;
  console.log(file.name, "文件名");
  // 校验文件格式
  const fileType = file.name.split(".");
  const fileSize = file.size;
  if (
    fileType[fileType.length - 1] &&
    fileType[fileType.length - 1] !== "png"
  ) {
    // this.$message.warning("文件格式错误，仅支持.png!");
    ElMessage({
      message: "文件格式错误，仅支持.png!",
      type: "warning"
    });
    return false;
  } else if (fileSize > 1024 * 1024) {
    // this.$message.warning("上传文件大小不超过500k");
    ElMessage({
      message: "上传文件大小不超过500k!",
      type: "warning"
    });
    return false;
  } else {
    formRef.value.clearValidate(); // 清除验证
    // formRules.pitture[0].required = false;
    return true;
  }
};
// 上传图片
const formdd = ref(null);
const uploadIon = data => {
  formdd.value = new FormData();
  formdd.value.append("file", data.file);
  // 调用保存接口 将form的值全都传过去
};
// 判断是否来自区域页面
const selectXq: any = ref("");
const isformArea = () => {
  if (route.query.data !== undefined) {
    // 如果是从区域跳转
    selectXq.value = JSON.parse(route.query.data);
    console.log(selectXq.value, "selectXq.value");
    isadd.value = false;
    // village
    // if (selectXq.value.village == "福鼎家园") {
    //   console.log("请求福鼎家园的楼栋数据");
    // }
    // changeArea(selectXq.value.village);
    value1.value = selectXq.value.village;
  } else {
    // 如果单独点击小区楼栋菜单
    value1.value = "";
    // area.value = options.value[0].value; // 默认选中第一个小区
    console.log("请求第一个小区的数据");
  }
};
const options = ref([]);
onMounted(() => {
  getallCompany();
  getallbuild();
  getallvillage();
});
// 搜索关键词
// const searchName = ref("");
// 分页
const pageVO2 = reactive({
  currentPage: 1,
  total: 0
});
const getallbuild = () => {
  const data = {
    page: pageVO2.currentPage,
    pageSize: 10,
    company: rgcompany.value,
    region: rgregion.value,
    village: rgvillage.value
  };
  getbuild(data).then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
      pageVO2.total = res.data.total;
    }
  });
};
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
      const newArr = [];
      // const tableData = res.data.data;
      res.data.data.forEach(item => {
        newArr.push({ value: item.village, label: item.village });
      });
      options.value = newArr;
      console.log(options.value, "options.value ");
      isformArea();
    }
  });
};

onActivated(() => {
  selectXq.value = JSON.parse(route.query.data);
});

const points = ref({ lng: 0, lat: 0 }); // 小区定位点icon
// 拖拽结束将坐标更新
const dragend = ({ point }) => {
  const jd = point.lng;
  const wd = point.lat;
  points.value.lng = point.lng;
  points.value.lat = point.lat;
  formData.jd = jd;
  formData.wd = wd;
};

const CompanyKeyword = ref(""); // 搜索水司关键词
const RegionKeyword = ref(""); // 搜索区域关键词
const VillageKeyword = ref(""); // 搜索小区关键词

// 获取全部区域信息
// const regions = ref([]);
const searchRegionList = ref<ListItem[]>([]);
const searchRegionloading = ref(false); // 搜索加载状态
const searchRegionoptions = ref<ListItem[]>([]); // 列表数据

// 输入区域方法
const remoteRegion = useDebounceFn((query: string, isform) => {
  // console.log(isform, "第2个参数");
  if (query) {
    searchRegionloading.value = true;
    const data = {
      company: isform == "true" ? formData.company : CompanyKeyword.value,
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
      company: isform == "true" ? formData.company : CompanyKeyword.value,
      region: isform == "true" ? formData.region : RegionKeyword.value,
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

const rgcompany = ref(""); // 查询楼栋入参水司
const rgregion = ref(""); // 查询楼栋入参区域
const rgvillage = ref(""); // 查询楼栋入参小区
// 根据水司查询小区信息
const searchEffortList = val => {
  // console.log(val, "水司关键词");
  // 入参水司，请求楼栋数据
  rgcompany.value = val;
  getallbuild();
};

// 根据水司-区域查询小区信息
const searchRegionLists = val => {
  rgregion.value = val;
  getallbuild();
};

// 根据水司-区域-小区模糊搜索查询小区信息
const searchVillageLists = val => {
  rgvillage.value = val;
  getallbuild();
};

// 新增小区楼栋
const addBuild = () => {
  // console.log("新增楼栋表单");
  Object.assign(formData, {
    company: "",
    region: "",
    village: "",
    buildnumber: "",
    level: "",
    households: "",
    types: "居民",
    jd: "",
    wd: ""
  });
  // 获取小区的经纬度
  points.value = { lng: 0, lat: 0 };
  formData.village = value1.value;
  const data = {
    village: value1.value
  };
  lookupregion(data).then(res => {
    if (res.retcode == 200) {
      center.value.lng = res.data[0].jd;
      center.value.lat = res.data[0].wd;
      zoom.value = 18;
      selectRow.value = null;
      showEdit.value = true;
    }
  });
};

// 下载模板文件
const downloadExcel = () => {
  const a = document.createElement("a");
  a.href = "../../../public/static/表格模板.xls";
  a.download = "文件模板.xlsx";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// 表格字段
interface RowVO {
  id: number;
  company: string;
  region: string;
  village: string;
  buildnumber: string;
  level: string;
  households: number;
  types: string;
  founder: number;
  foundertime: number;
  updated: string;
  updatedtime: string;
  notes: string;
  jd: number;
  wd: number;
}
const formData = reactive({
  company: "",
  region: "",
  village: "",
  buildnumber: "",
  level: "",
  households: "",
  types: 1,
  jd: 0,
  wd: 0
});

const tableData = ref<RowVO[]>([]);
const showEdit = ref(false); // 展示编辑框
const selectRow = ref<RowVO | null>();
const submitLoading = ref(false);
// 点击行回调
const cellDBLClickEvent = ({ row }) => {
  // 前往户表信息
  router.push({
    path: "/fighting/household",
    query: { data: JSON.stringify(row) }
  });
  // 将点击的楼栋行数据暂存
};

// 编辑事件
const editEvent = (row: RowVO) => {
  Object.assign(formData, row);
  center.value.lng = row.jd;
  center.value.lat = row.wd;
  zoom.value = 18;
  selectRow.value = row;
  showEdit.value = true;
  points.value.lng = row.jd;
  points.value.lat = row.wd;
};

// 删除事件
const removeEvent = async (row: RowVO) => {
  const params = (row as any)._id;
  const type = await VXETable.modal.confirm(
    "该操作会删除该楼栋下所有住户,您确定要删除该数据?"
  );
  if (type === "confirm") {
    const $table = xTable.value;
    if ($table) {
      // $table.remove(row);
      builddelete(params).then(res => {
        if (res.retcode == 200) {
          VXETable.modal.message({
            content: `${res.message}`,
            status: "success"
          });
        }
        getallbuild();
      });
    }
  }
};

// 批量删除选中楼栋
const removeSelectRowEvent = async () => {
  const type = await VXETable.modal.confirm(
    "该操作会删除该楼栋下所有住户,您确定要批量删除吗？"
  );
  if (type == "confirm") {
    const $table = xTable.value;
    if ($table) {
      $table.removeCheckboxRow().then(res => {
        // console.log(res.rows.length); // 将删除的数组保存给后端
        const data = JSON.parse(JSON.stringify(res.rows));
        const deleteDatas = [];
        data.forEach(item => {
          deleteDatas.push(item._id);
        });
        if (deleteDatas.length == 0) {
          return ElMessage.error("至少选中一项进行操作！");
        }
        const ids = deleteDatas.toString();
        builddelete(ids).then(res => {
          if (res.retcode == 200) {
            ElMessage({
              message: `${res.message}`,
              type: "success"
            });
            getallbuild();
          }
        });
      });
    }
  } else {
    return;
  }
};

// 表单规则
const formRules = reactive<VxeFormPropTypes.Rules>({
  company: [{ required: true, message: "请输入所属水司" }],
  region: [{ required: true, message: "请输入所属区域" }],
  village: [{ required: true, message: "请输入名称" }],
  buildnumber: [{ required: true, message: "请输入楼栋编号" }],
  level: [{ required: true, message: "请输入楼层数" }],
  households: [{ required: true, message: "请输入户数" }],
  types: [{ required: true, message: "请输入楼栋类型" }],
  jd: [{ required: true, message: "请输入经度" }],
  wd: [{ required: true, message: "请输入纬度" }]
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
        // 修改楼栋信息
        buildfix((selectRow.value as any)._id, formData).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "保存成功", status: "success" });
            getallbuild();
          }
        });
        // Object.assign(selectRow.value, formData);
      } else {
        // console.log(formData, "表单数据");
        const data = formData;
        buildadd(data).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({
              content: `${res.message}`,
              status: "success"
            });
          }
        });
        // 获取新的表格数据
        $table.insert({ ...formData });
      }
    }
  }, 500);
};
const xTable = ref<VxeTableInstance<RowVO>>();
// 上传文件相关钩子
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};
const handlePreview: UploadProps["onPreview"] = uploadFile => {
  console.log(uploadFile);
};
const beforeRemove: UploadProps["beforeRemove"] = uploadFile => {
  return ElMessageBox.confirm(`是否删除${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
const handleExceed: UploadProps["onExceed"] = files => {
  ElMessage.warning(`限制文件为1个, 这次你选择了${files.length}个文件`);
  // 限制为1，您这次选择了个文件。长度文件，加起来为个文件。上传长度文件。总共长度
};

const center = ref({ lng: 0, lat: 0 });
const zoom = ref(3);
// 设置百度地图坐标的前置钩子
const handler = ({ BMap, map }: any) => {
  console.log(BMap, map, "bmmap");
  center.value.lng = selectXq.value.jd;
  center.value.lat = selectXq.value.wd;
  zoom.value = 18;
};
// 新增地图上的点坐标
const getpoint = ({ point }: any) => {
  formData.jd = point.lng;
  formData.wd = point.lat;
  points.value.lng = point.lng;
  points.value.lat = point.lat;
};

// 改变小区
// const selectedArea = ref("");
// const changeArea = val => {
//   selectedArea.value = val;
//   const data = {
//     page: 1,
//     pageSize: 10,
//     keyword: val,
//     buildnumber: ""
//   };
//   getbuild(data).then(res => {
//     if (res.retcode == 200) {
//       tableData.value = res.data.data;
//       // lddata.value = res.data.data;
//       pageVO2.total = res.data.total;
//     }
//   });
//   getLdData(val);
// };

// 获取到tree组件的值
// const getVillage = value => {
//   value1.value = value.name;
//   changeArea(value.name);
// };

const toolbarRef = ref<VxeToolbarInstance>();
nextTick(() => {
  // 将表格和工具栏进行关联
  const $table = xTable.value;
  const $toolbar = toolbarRef.value;
  if ($table && $toolbar) {
    $table.connect($toolbar);
  }
});

// 上传列表
const fileList = ref([]);
</script>
<style lang="scss" scoped>
.baidu-map {
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.vxe-toolbar {
  padding: 0;
}

:deep .vxe-toolbar .vxe-custom--wrapper {
  margin-right: 10px !important;
  margin-left: 0 !important;
}
</style>
