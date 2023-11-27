<template>
  <div class="content">
    <vxe-toolbar custom ref="toolbarRef">
      <template #buttons>
        <div style="margin-left: 6px">
          {{ t("company") }}:
          <el-select-v2
            v-model="companyKey"
            style="width: 140px"
            :multiple="false"
            filterable
            remote
            :remote-method="remoteMethod"
            @change="setCompanyKey"
            @focus="getallCompany"
            @clear="clearall"
            clearable
            :options="searchCompanysList"
            :loading="loading"
            placeholder="请输入水司"
          />
        </div>
        <div style="margin-left: 6px">
          {{ t("areaname") }}:
          <el-select-v2
            v-model="regionKey"
            style="width: 140px"
            multiple
            filterable
            remote
            :remote-method="remoteRegionMethod"
            clearable
            :options="searchRegionsList"
            :loading="searchRegionloading"
            :disabled="isshowSearchRegion"
            placeholder="请输入区域"
          />
        </div>
        <vxe-button
          icon="vxe-icon-square-plus"
          style="margin-left: 10px"
          @click="insertEvent()"
          >{{ t("add") }}</vxe-button
        >
      </template>
      <template #tools>
        <vxe-button
          icon="vxe-icon-download"
          style="margin-right: 10px"
          @click="downloadExcel"
          >{{ t("download") }}</vxe-button
        >
        <el-upload
          class="upload-demo"
          style="overflow: hidden"
          :show-file-list="false"
          :limit="1"
          action="http://localhost:8000/api/up"
          :on-exceed="handleExceed"
          :on-success="successupload"
          :auto-upload="true"
          ref="uploadRef"
        >
          <vxe-button status="primary" style="margin-right: 10px">{{
            t("batchimport")
          }}</vxe-button>
        </el-upload>
        <vxe-button
          status="danger"
          style="margin-right: 10px"
          @click="removeSelectRowEvent"
          >{{ t("batchDelete") }}</vxe-button
        >
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="500"
      auto-resize
      id="toolbar_demo3"
      :custom-config="{ storage: true }"
      :column-config="{ resizable: true }"
      :row-config="{ isCurrent: true, keyField: 'id', height: 34 }"
      :checkbox-config="{ checkRowKeys: selectRowsId, reserve: true }"
      :data="tableData"
    >
      <vxe-column type="checkbox" width="50" fixed="left" />
      <vxe-column type="seq" title="序号" width="50" fixed="left" />
      <vxe-column
        field="company"
        width="100"
        show-header-overflow
        title="所属水司"
        fixed="left"
        sortable
      >
        <template #header>
          {{ t("company") }}
        </template>
      </vxe-column>
      <vxe-column
        field="region"
        width="100"
        show-header-overflow
        title="区域名称"
        fixed="left"
        sortable
      >
        <template #header>
          {{ t("areaname") }}
        </template>
      </vxe-column>
      <vxe-column
        field="village"
        width="100"
        show-header-overflow
        sortable
        title="小区名称"
        fixed="left"
      >
        <template #header>
          {{ t("communityname") }}
        </template>
      </vxe-column>
      <vxe-column
        field="address"
        width="100"
        show-header-overflow
        sortable
        title="地址"
      >
        <template #header>
          {{ t("address") }}
        </template>
      </vxe-column>
      <vxe-column
        field="zipcode"
        width="100"
        show-header-overflow
        sortable
        title="邮编"
        show-overflow
      >
        <template #header>
          {{ t("postcode") }}
        </template>
      </vxe-column>
      <vxe-column
        field="area"
        width="100"
        show-header-overflow
        sortable
        title="小区面积"
      >
        <template #header>
          {{ t("communityarea") }}
        </template>
      </vxe-column>
      <vxe-column
        field="build"
        width="100"
        show-header-overflow
        sortable
        title="楼栋数"
      >
        <template #header>
          {{ t("buildings") }}
        </template>
      </vxe-column>
      <vxe-column
        field="households"
        width="100"
        show-header-overflow
        sortable
        min="0"
        title="小区户数"
      >
        <template #header>
          {{ t("households") }}
        </template>
      </vxe-column>
      <vxe-column field="attr3" title="icon" width="60" tree-node>
        <template #default>
          <img src="@/assets/iconfont/mapicon.png" height="40" width="40" />
        </template>
      </vxe-column>
      <vxe-column
        field="founder"
        width="100"
        show-header-overflow
        sortable
        title="创建人"
      >
        <template #header>
          {{ t("founder") }}
        </template>
      </vxe-column>
      <vxe-column
        field="creationtime"
        width="100"
        show-header-overflow
        sortable
        title="创建时间"
      >
        <template #header>
          {{ t("creationtime") }}
        </template>
      </vxe-column>
      <vxe-column
        field="updater"
        width="100"
        show-header-overflow
        sortable
        title="最近更新人"
      >
        <template #header>
          {{ t("lastupdater") }}
        </template>
      </vxe-column>
      <vxe-column
        field="updatetime"
        show-header-overflow
        sortable
        width="100"
        title="最近更新时间"
      >
        <template #header>
          {{ t("lastupdated") }}
        </template>
      </vxe-column>
      <vxe-column title="操作" width="100" fixed="right" show-overflow>
        <template #header>
          {{ t("operate") }}
        </template>
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
    <!-- 分页 -->
    <div>
      <vxe-pager
        v-model:current-page="pageVO2.currentPage"
        :total="pageVO2.total"
        v-model:page-size="pageVO2.pageSize"
        @page-change="geteffortlist"
        :layouts="[
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'Sizes',
          'FullJump',
          'Total'
        ]"
      />
    </div>
    <!-- 新增/修改表单 -->
    <vxe-modal
      v-model="showEdit"
      width="800"
      height="90%"
      min-width="600"
      min-height="300"
      :loading="submitLoading"
      @close="closeForm"
      resize
      destroy-on-close
    >
      <template #title>
        <span v-if="selectRow">{{ t("editsave") }}</span>
        <span v-else>{{ t("addsave") }}</span>
      </template>
      <template #default>
        <vxe-form
          :data="formData"
          :rules="formRules"
          title-align="right"
          title-width="100"
          ref="formRef"
          @submit="submitEvent"
        >
          <vxe-form-item field="company" :span="12" :item-render="{}">
            <template #title>
              {{ t("heatingcompany") }}
            </template>
            <template #default="{ data }">
              <el-select-v2
                v-model="data.company"
                style="width: 140px"
                :multiple="false"
                filterable
                remote
                :remote-method="remoteMethod"
                @change="setCompanyKey"
                @focus="getallCompany"
                @clear="clearall"
                clearable
                :options="searchCompanysList"
                :loading="loading"
                placeholder="请输入水司"
              />
              <el-button
                type="primary"
                style="margin-bottom: 2px; margin-left: 10px"
                @click="$emit('openright', 'company')"
                >新增</el-button
              >
            </template>
          </vxe-form-item>
          <vxe-form-item field="region" :span="12" :item-render="{}">
            <template #title>
              {{ t("areaname") }}
            </template>
            <template #default="{ data }">
              <el-select-v2
                v-model="data.region"
                style="width: 140px"
                :multiple="false"
                filterable
                remote
                @focus="getallRegion('form')"
                :remote-method="remoteRegionMethod"
                clearable
                :options="searchRegionsList"
                :loading="searchRegionloading"
                placeholder="请输入区域"
              />
              <el-button
                type="primary"
                style="margin-bottom: 2px; margin-left: 10px"
                @click="$emit('openright', 'region')"
                >新增</el-button
              >
            </template>
          </vxe-form-item>
          <vxe-form-item field="village" :span="12" :item-render="{}">
            <template #title>
              {{ t("communityname") }}
            </template>
            <template #default="{ data }">
              <vxe-input v-model="data.village" placeholder="请输入小区名称">
                <template #suffix>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="点击在地图上搜索该小区名"
                    placement="top"
                  >
                    <i class="vxe-icon-location" @click="lookupvillage()" />
                  </el-tooltip>
                </template>
              </vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="build" :span="12" :item-render="{}">
            <template #title>
              {{ t("buildings") }}
            </template>
            <template #default="{ data }">
              <vxe-input
                v-model="data.build"
                type="integer"
                min="0"
                placeholder="请输入楼栋数"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="households" :span="12" :item-render="{}">
            <template #title>
              {{ t("households") }}
            </template>
            <template #default="{ data }">
              <vxe-input
                v-model="data.households"
                type="integer"
                placeholder="请输入小区户数"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="area" :span="12" :item-render="{}">
            <template #title>
              {{ t("communityarea") }}
            </template>
            <template #default="{ data }">
              <vxe-input v-model="data.area" placeholder="请输入小区面积">
                <template #suffix>
                  <span>m2</span>
                </template>
              </vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="zipcode" :span="12" :item-render="{}">
            <template #title>
              {{ t("postcode") }}
            </template>
            <template #default="{ data }">
              <vxe-input
                v-model="data.zipcode"
                type="integer"
                placeholder="请输入邮政编码"
              />
            </template>
          </vxe-form-item>
          <!-- <vxe-form-item field="property" :span="12" :item-render="{}">
                <template #title>
                  {{ t("Ownedproperty") }}
                </template>
                <template #default="{ data }">
                  <vxe-input
                    v-model="data.property"
                    placeholder="请输入所属物业"
                  />
                </template>
              </vxe-form-item> -->
          <vxe-form-item field="address" :span="24" :item-render="{}">
            <template #title>
              {{ t("address") }}
            </template>
            <template #default="{ data }">
              <vxe-textarea
                v-model="data.address"
                placeholder="请填写小区地址"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="jd" :span="12" :item-render="{}">
            <template #title>
              {{ t("jd") }}
            </template>
            <template #default="{ data }">
              <vxe-input v-model="data.jd" placeholder="请输入经度" />
            </template>
          </vxe-form-item>
          <vxe-form-item field="wd" :span="12" :item-render="{}">
            <template #title>
              {{ t("wd") }}
            </template>
            <template #default="{ data }">
              <vxe-input v-model="data.wd" placeholder="请输入纬度" transfer />
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="pitture"
            title="小区图片"
            :span="24"
            :item-render="{}"
          >
            <template #title>
              {{ t("pitture") }}
            </template>
            <el-radio-group v-model="radio1" class="ml-4">
              <el-radio label="1" size="large">默认icon</el-radio>
              <el-radio label="2" size="large" disabled>自定义icon</el-radio>
            </el-radio-group>
            <!-- <el-upload
              class="upload-demo"
              v-model:file-list="fileList"
              :show-file-list="true"
              :on-change="fileChange"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :http-request:void="uploadIon"
              :on-remove="removefile"
              ref="uploadRef"
              v-if="Number(radio1) == 2"
            >
              <el-button type="primary">{{ t("pitture") }}</el-button>
              <template #tip>
                <div class="el-upload__tip">{{ t("tips") }}</div>
              </template>
            </el-upload> -->
          </vxe-form-item>
          <vxe-form-item :span="24">
            <div class="map">
              <baidu-map
                class="baidu-map"
                :center="center"
                :zoom="zoom"
                @click="getpoint"
                :scroll-wheel-zoom="true"
              >
                <bm-local-search
                  :keyword="villagekeyword"
                  :auto-viewport="true"
                />
                <bm-marker
                  :position="points"
                  :dragging="true"
                  @dragend="dragend"
                />
              </baidu-map>
            </div>
          </vxe-form-item>
          <vxe-form-item align="center" :span="24">
            <template #default>
              <vxe-button type="submit">{{ t("sumit") }}</vxe-button>
              <vxe-button type="reset">{{ t("reset") }}</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, nextTick } from "vue";
import { useI18n } from "vue-i18n"; // 表头翻译
import { ElMessage, UploadUserFile } from "element-plus";
import {
  VXETable,
  VxeTableInstance,
  VxeFormPropTypes,
  VxeFormInstance,
  VxeToolbarInstance
} from "vxe-table";
import {
  getlist,
  addlist,
  fixlist,
  deletelist,
  getregion,
  getcompany
} from "@/api/effort";
import type { UploadProps } from "element-plus";
// import { t } from "@/utils/effortlanguage/effortlanguage.js"; // 翻译词典

interface ListItem {
  value: string;
  label: string;
}
const companyKey = ref(""); // 水司关键词
const searchCompanysList = ref<ListItem[]>([]);
const loading = ref(false);
const remoteMethod = (query: string) => {
  if (query !== "") {
    loading.value = true;
    // 模糊查询
    const data = {
      company: query
    };
    getcompany(data).then(res => {
      if (res.retcode == 200) {
        const companys = res.data.data;
        searchCompanysList.value = companys.map(item => {
          return { value: item.name, label: item.name };
        });
        loading.value = false;
      }
    });
  } else {
    searchCompanysList.value = [];
  }
};

// 选取供热公司
const setCompanyKey = val => {
  if (showEdit.value == false) {
    companyKey.value = val;
    isshowSearchRegion.value = false;
  }
  formData.value.region = "";
  const data = {
    company: val,
    region: ""
  };
  getregion(data).then(res => {
    if (res.retcode == 200) {
      const regions = res.data.data;
      searchRegionsList.value = regions.map(item => {
        return { value: item.name, label: item.name };
      });
    }
  });
};

// 获取全部水司信息，在不做任何输入时显示
const getallCompany = () => {
  const data = {
    company: ""
  };
  getcompany(data).then(res => {
    if (res.retcode == 200) {
      const companys = res.data.data;
      searchCompanysList.value = companys.map(item => {
        return { key: item._id, value: item.name, label: item.name };
      });
    }
  });
};

// 清空所有搜索信息
const clearall = () => {
  isshowSearchRegion.value = true;
  regionKey.value = [];
};

const regionKey = ref([]); // 区域关键词
const searchRegionsList = ref<ListItem[]>([]); // 区域列表
const searchRegionloading = ref(false);
const isshowSearchRegion = ref(true); // 搜索栏查询水司是否可编辑
// 需要将模糊搜索进行判断
const remoteRegionMethod = (query: string) => {
  if (query !== "") {
    searchRegionloading.value = true;
    const data = {
      company:
        showEdit.value == true ? formData.value.company : companyKey.value,
      region: query
    };
    getregion(data).then(res => {
      if (res.retcode == 200) {
        const regions = res.data.data;
        searchRegionsList.value = regions.map(item => {
          return { value: item.name, label: item.name };
        });
        searchRegionloading.value = false;
      }
    });
  } else {
    searchRegionsList.value = [];
  }
};

// 批量删除选中区域
const removeSelectRowEvent = async () => {
  const type = await VXETable.modal.confirm(
    "该操作会删除该小区下所有楼栋、住户,您确定要批量删除吗？"
  );
  // VXETable.modal.message({ content: `点击了 ${type}` });
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
        deletelist(ids).then(res => {
          if (res.retcode == 200) {
            ElMessage({
              message: `${res.message}`,
              type: "success"
            });
            geteffortlist();
          }
        });
      });
    }
  } else {
    return;
  }
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

// 新增按钮
const insertEvent = () => {
  Object.assign(formData, {
    region: "",
    village: "",
    build: "",
    households: "",
    area: "",
    zipcode: "",
    // property: "", // 物业
    company: "", // 公司
    address: "",
    jd: "",
    wd: "",
    pitture: ""
  });
  formData.value = {
    company: "",
    region: "",
    village: "",
    build: "1",
    households: 1,
    area: "",
    zipcode: "",
    // property: "", // 物业
    address: "",
    jd: 0,
    wd: 0
  };
  // 设置默认地址
  center.value.lng = 116.404;
  center.value.lat = 39.915;
  zoom.value = 8;
  selectRow.value = null;
  showEdit.value = true;
  villagekeyword.value = "";
  // getallCompany(); // 点击水司获取所有水司信息
  // getallRegion(); //  点击水司获取所有区域信息
};

// 上传文件
// const fileList = ref<UploadUserFile[]>([]);
const handleExceed: UploadProps["onExceed"] = files => {
  ElMessage.warning(`限制文件为1个, 这次你选择了${files.length}个文件`);
  // 限制为1，您这次选择了个文件。长度文件，加起来为个文件。上传长度文件。总共长度
};

const successupload = () => {
  ElMessage({
    message: `批量导入成功！`,
    type: "success"
  });
  geteffortlist();
};

// 表单
const showEdit = ref(false); // 表单显示、隐藏
const submitLoading = ref(false); // 表单加载
const selectRow = ref<RowVO | null>(); // 表单类型
const xTable = ref<VxeTableInstance<RowVO>>();
interface FormDataVO {
  company: string;
  region: string;
  village: string;
  build: string;
  households: number;
  area: string;
  zipcode: string;
  // property: string; // 物业
  address: string;
  jd: number;
  wd: number;
}
const formData = ref<FormDataVO>({
  company: "",
  region: "",
  village: "",
  build: "1",
  households: 1,
  area: "",
  zipcode: "",
  // property: "", // 物业
  address: "",
  jd: 0,
  wd: 0
});

const selectList = ref([]);
const selectRowsId = computed(() => {
  return selectList.value.map(item => item.id);
});

// 地图定位小区信息
const villagekeyword = ref("");
const lookupvillage = () => {
  villagekeyword.value = formData.value.village;
};

// 地图相关配置
const center = ref({ lng: 0, lat: 0 });
const zoom = ref(3);
const points = ref({ lng: 0, lat: 0 }); // 小区定位点icon

// 绘制点
const getpoint = ({ point }: any) => {
  const jd = point.lng;
  const wd = point.lat;
  points.value.lng = point.lng;
  points.value.lat = point.lat;
  formData.value.jd = jd;
  formData.value.wd = wd;
};
// 拖拽结束将坐标更新
const dragend = ({ point }) => {
  const jd = point.lng;
  const wd = point.lat;
  points.value.lng = point.lng;
  points.value.lat = point.lat;
  formData.value.jd = jd;
  formData.value.wd = wd;
};

// 选择框
const radio1 = ref("1");

// const tableRef = ref<VxeTableInstance<RowVO>>();
const toolbarRef = ref<VxeToolbarInstance>();
nextTick(() => {
  setTimeout(() => {
    // 将表格和工具栏进行关联
    const $table = xTable.value;
    const $toolbar = toolbarRef.value;
    if ($table && $toolbar) {
      $table.connect($toolbar);
    }
  }, 1000);
});

// 表单校验
const formRules = reactive<VxeFormPropTypes.Rules>({
  region: [{ required: true, message: "请输入区域名称" }],
  village: [{ required: true, message: "请输入小区名称" }],
  build: [{ required: true, message: "请输入楼栋数" }],
  households: [{ required: true, message: "请输入户数" }],
  area: [{ required: true, message: "请输入小区面积" }],
  zipcode: [{ required: true, message: "请输入邮编" }],
  // property: [{ required: true, message: "请输入所属物业" }],
  company: [{ required: true, message: "请输入所属供热公司" }],
  address: [{ required: true, message: "请输入地址" }],
  jd: [{ required: true, message: "点击坐标输入经度" }],
  wd: [{ required: true, message: "点击坐标输入纬度" }]
});

// 表格
const tableData = ref([]);
const formRef = ref<VxeFormInstance>(); // from表单校验

// 表格编辑事件
interface RowVO {
  id: number;
  region: string;
  village: string;
  build: string;
  households: number;
  area: string;
  zipcode: string;
  // property: string;
  company: string;
  address: string;
  jd: string;
  wd: string;
  founder: string;
  creationtime: string;
}

const fixedid = ref("");
const editEvent = (row: RowVO) => {
  center.value.lng = Number(row.jd);
  center.value.lat = Number(row.wd);
  zoom.value = 16;
  // 上面为在编辑界面展示已保存的坐标点
  points.value.lng = Number(row.jd);
  points.value.lat = Number(row.wd);
  // 弹框关闭时把points清空，然后在下一次点击编辑弹框时再push
  const a = Object.assign({}, row);
  (formData.value as any) = a;
  selectRow.value = row;
  showEdit.value = true;
  (fixedid.value as any) = row.id;
};
//表单取消事件
const closeForm = () => {
  console.log("关闭事件");
  (points.value as any) = {};
};

const removeEvent = async (row: RowVO) => {
  // console.log(row.id, "行信息");
  const params = (row as any)._id;
  const type = await VXETable.modal.confirm(
    "该操作会删除该小区下所有楼栋、住户,您确定要删除该数据?"
  );
  if (type === "confirm") {
    const $table = xTable.value;
    if ($table) {
      // $table.remove(row);
      deletelist(params).then(res => {
        if (res.retcode == 200) {
          VXETable.modal.message({
            content: `${res.message}`,
            status: "success"
          });
        }
        geteffortlist();
      });
    }
  }
};

const uploadRef = ref(null); //上传icon的ref
const fileList = ref<UploadUserFile[]>([]);
// 上传图片
const formdd = ref(null);
// 提交表单事件
const submitEvent = () => {
  // debugger;
  submitLoading.value = true;
  setTimeout(() => {
    const $table = xTable.value;
    console.log(fileList.value.length);
    if ($table) {
      submitLoading.value = false;
      showEdit.value = false;
      if (selectRow.value) {
        fixlist((selectRow.value as any)._id, formData.value).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "保存成功", status: "success" });
            geteffortlist();
          }
        });
        // Object.assign(selectRow.value, formData);
      } else {
        // console.log(111);
        // const form = uploadIon();
        if (radio1.value == "1") {
          formdd.value = new FormData();
        }
        Object.entries(formData.value).forEach(([key, value]) => {
          // console.log(`Key: ${key}, Value: ${value}`);
          formdd.value.append(`${key}`, `${value}`);
        });
        addlist(formdd.value)
          .then(res => {
            if (res.retcode == 200) {
              VXETable.modal.message({
                content: "新增成功",
                status: "success"
              });
              geteffortlist();
            }
          })
          .catch(error => {
            console.log(error.response);
            if (error.response.status == 400) {
              ElMessage.error(`${error.response.data.message}`);
            }
          });
      }
    }
  }, 500);
};

// 分页
const pageVO2 = reactive({
  pageSize: 10,
  currentPage: 1,
  total: 0
});

// 获取小区数据
const geteffortlist = () => {
  const data = {
    page: pageVO2.currentPage,
    pageSize: pageVO2.pageSize,
    company: companyKey.value,
    region: regionKey.value,
    village: ""
  };
  getlist(data).then(res => {
    if (res.retcode == 200) {
      (tableData.value as any) = res.data.data;
      pageVO2.total = res.data.total;
    }
  });
};

// 根据水司获取区域数据
const getallRegion = (type?: string) => {
  const data = {
    company: type == "form" ? formData.value.company : companyKey.value,
    region: ""
  };
  getregion(data).then(res => {
    if (res.retcode == 200) {
      const regions = res.data.data;
      searchCompanysList.value = regions.map(item => {
        return { value: item.name, label: item.name };
      });
    }
  });
};

// 打开右侧抽屉，请求全部水司数据
// 通过调取父组件的方法打开抽屉
// const openright = menu => {
// if (menu == "village") {
//   table.value = true;
//   const data = {
//     company: ""
//   };
//   getcompany(data).then(res => {
//     if (res.retcode == 200) {
//       companyData.value = res.data.data;
//     }
//   });
// } else if (menu == "region") {
//   const data = {
//     company: "",
//     region: ""
//   };
//   getregion(data).then(res => {
//     if (res.retcode == 200) {
//       regionData.value = res.data.data;
//     }
//   });
//   regiontable.value = true;
// }
// };

onMounted(() => {
  geteffortlist();
});

const { t } = useI18n({
  locale: "en",
  messages: {
    en: {
      company: "company",
      firecompany: "company",
      areaname: "areaname",
      communityname: "community",
      address: "adress",
      postcode: "postcode",
      communityarea: "communityarea",
      buildings: "buildings",
      households: "households",
      // Ownedproperty: "Ownedproperty",
      heatingcompany: "heatingcompany",
      watercompany: "watercompany",
      founder: "founder",
      creationtime: "creationtime",
      lastupdater: "lastupdateer",
      lastupdated: "last updated by",
      operate: "operate",
      search: "search",
      add: "add",
      editsave: "edit&save",
      addsave: "add&save",
      jd: "longitude",
      wd: "latitude",
      pitture: "icon",
      tipbutton: "Upload icon",
      tips: "The size of the jpg/png file is less than 500KB.",
      submit: "submit",
      reset: "reset",
      batchimport: "batchimport",
      download: "Download",
      batchDelete: "BatchDelete"
    },
    zh: {
      company: "所属供热公司",
      areaname: "区域名称",
      communityname: "小区名称",
      address: "地址",
      postcode: "邮编",
      communityarea: "小区面积",
      buildings: "楼栋数",
      households: "户数",
      // Ownedproperty: "所属物业",
      heatingcompany: "供热公司",
      watercompany: "所属自来水公司",
      founder: "创建人",
      creationtime: "创建时间",
      lastupdater: "最近更新人",
      lastupdated: "最近更新时间",
      operate: "操作",
      search: "搜索",
      add: "新增",
      editsave: "编辑&保存",
      addsave: "新增&保存",
      jd: "经度",
      wd: "纬度",
      pitture: "小区图片",
      tipbutton: "上传小区图片",
      tips: "jpg/png文件,大小小于500KB",
      sumit: "提交",
      reset: "重置",
      batchimport: "批量导入",
      download: "下载模板",
      batchDelete: "批量删除"
    }
  }
});
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
}
.map {
  position: relative;
  width: 100%;
  height: 240px;

  // background-color: pink;
  .baidu-map {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }

  .keyword {
    position: absolute;
    top: 6px;
    left: 6px;
    z-index: 999;
    width: 200px;
    font-size: 14px;
    color: black;
  }

  .clear-line {
    position: absolute;
    top: 6px;
    left: 210px;
    z-index: 999;
    font-size: 14px;
    // width: 200px;
    color: black;
  }
}
</style>
