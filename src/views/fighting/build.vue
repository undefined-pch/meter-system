<template>
  <div class="table-main">
    <vxe-toolbar custom ref="toolbarRef">
      <template #buttons>
        <div style="margin-left: 6px">
          {{ t("company") }}:
          <vxe-select
            v-model="companyKey"
            placeholder="请输入要查找的水司"
            :options="companyKeyList"
            clearable
            filterable
            @focus="searchCompanyList"
            @change="geteffortlist()"
            @clear="clearCompanyKey()"
          />
        </div>
        <div style="margin-left: 10px">
          {{ t("areaname") }}:
          <vxe-select
            v-model="regionKey"
            placeholder="请输入要查找的区域"
            :options="regionKeyList"
            clearable
            filterable
            @focus="searchRegionList(true)"
            @change="geteffortlist()"
            @clear="clearRegionKey()"
          />
        </div>
        <div style="margin-left: 10px">
          {{ t("communityname") }}:
          <vxe-select
            v-model="CommunityKey"
            placeholder="请输入要查找的小区"
            :options="communityKeyList"
            clearable
            filterable
            @focus="searchCommunityList(true)"
            @change="geteffortlist()"
            @clear="clearCommunityKey()"
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
      height="564"
      id="toolbar_demo3"
      :custom-config="{ storage: true }"
      :column-config="{ resizable: true }"
      :row-config="{ isCurrent: true, keyField: 'id' }"
      :checkbox-config="{ checkRowKeys: selectRowsId, reserve: true }"
      :data="tableData"
      @cell-dblclick="cellDBLClickEvent"
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
        field="buildnumber"
        width="100"
        show-header-overflow
        sortable
        title="楼栋编号"
      >
        <template #header>
          {{ t("buildnumber") }}
        </template>
      </vxe-column>
      <vxe-column
        field="level"
        width="100"
        show-header-overflow
        sortable
        title="楼层数"
        show-overflow
      >
        <template #header>
          {{ t("level") }}
        </template>
      </vxe-column>
      <vxe-column
        field="households"
        width="100"
        show-header-overflow
        sortable
        title="户数"
      >
        <template #header>
          {{ t("households") }}
        </template>
      </vxe-column>
      <vxe-column
        field="types"
        width="100"
        show-header-overflow
        sortable
        title="楼栋类型"
      >
        <template #header>
          {{ t("types") }}
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
        width="100"
        show-header-overflow
        sortable
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
        :page-size="10"
        @page-change="geteffortlist"
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
              {{ t("company") }}
            </template>
            <template #default="{ data }">
              <vxe-select
                v-model="data.company"
                placeholder="请选择水司"
                :options="companyKeyList"
                clearable
                filterable
                @focus="searchCompanyList"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="region" :span="12" :item-render="{}">
            <template #title>
              {{ t("areaname") }}
            </template>
            <template #default="{ data }">
              <vxe-select
                v-model="data.region"
                placeholder="请选择区域"
                :options="regionKeyList"
                clearable
                filterable
                @focus="searchRegionList(false)"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="village" :span="12" :item-render="{}">
            <template #title>
              {{ t("communityname") }}
            </template>
            <template #default="{ data }">
              <vxe-select
                v-model="data.village"
                placeholder="请选择小区"
                :options="communityKeyList"
                clearable
                filterable
                @focus="searchCommunityList"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="buildnumber" :span="12" :item-render="{}">
            <template #title>
              {{ t("buildnumber") }}
            </template>
            <template #default="{ data }">
              <vxe-input
                v-model="data.buildnumber"
                placeholder="请输入楼栋编号"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="level" :span="12" :item-render="{}">
            <template #title>
              {{ t("level") }}
            </template>
            <template #default="{ data }">
              <vxe-input
                v-model="data.level"
                type="integer"
                min="0"
                placeholder="请输入楼层数"
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
                min="0"
                placeholder="请输入楼栋户数"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="types" :span="12" :item-render="{}">
            <template #title>
              {{ t("types") }}
            </template>
            <template #default="{ data }">
              <vxe-input
                v-model="data.zipcode"
                type="text"
                placeholder="请输入楼栋类型"
              />
            </template>
          </vxe-form-item>
          <vxe-form-item field="notes" :span="24" :item-render="{}">
            <template #title>
              {{ t("notes") }}
            </template>
            <template #default="{ data }">
              <vxe-textarea v-model="data.address" placeholder="请填写备注" />
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
              :on-remove="removefile"
              ref="uploadRef"
              v-if="Number(radio1) == 2"
            >
              <el-button type="primary">{{ t("pitture") }}</el-button>
              <template #tip>
                <div class="el-upload__tip">{{ t("tips") }}</div>
              </template>
            </el-upload>
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
    <!-- 右侧水司信息 -->
    <rightlist />
    <!-- 右侧区域信息 -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick, computed } from "vue";
// import type { Ref } from "vue";
// import { storeToRefs } from "pinia";
import {
  VXETable,
  VxeTableInstance,
  VxeFormPropTypes,
  VxeFormInstance,
  VxeToolbarInstance
} from "vxe-table";
import { ElMessage, ElMessageBox, UploadUserFile } from "element-plus";
import type { UploadProps } from "element-plus";
import { useI18n } from "vue-i18n"; // 表头翻译
// import { usePosition } from "@/store/modules/position"; // 从pinia中导入到村的地理位置信息
import { useRouter } from "vue-router"; // 导入路由模块
import { useArea } from "@/store/modules/build"; // 从pinia中导入到村的地理位置信息
import {
  getlist,
  addlist,
  fixlist,
  deletelist,
  getregion,
  getcompany
} from "@/api/effort";
import { getbuild } from "@/api/build";
import rightlist from "@/components/rightlist/rightlist.vue";

const area = useArea();
const { savearea } = area;
// 使用路由
const router = useRouter();

const companyKey = ref(""); // 所属水司搜索词
const companyKeyList = ref([]); // 所属水司搜索列表
// 查询水司列表信息
const searchCompanyList = () => {
  const data = {
    company: ""
  };
  getcompany(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      companyKeyList.value = res.data.data.map(item => {
        return { value: item.name, label: item.name };
      });
    }
  });
};
// 清除查询水司关键词
const clearCompanyKey = () => {
  companyKey.value = "";
  regionKey.value = "";
  CommunityKey.value = "";
  geteffortlist();
};

const regionKey = ref(""); // 区域搜索词
const regionKeyList = ref([]); // 区域搜索列表
// 查询区域列表信息
const searchRegionList = type => {
  // true为表格筛选，false为表单筛选
  console.log(formData.value, "表单选择的水司");
  const data = {
    company: type === true ? companyKey.value : formData.value.company,
    region: ""
  };
  getregion(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      regionKeyList.value = res.data.data.map(item => {
        return { value: item.name, label: item.name };
      });
    }
  });
};
// 清除区域关键词
const clearRegionKey = () => {
  regionKey.value = "";
  CommunityKey.value = "";
  geteffortlist();
};

const CommunityKey = ref(""); // 小区搜索词
const communityKeyList = ref([]); // 小区搜索列表
// 查询小区列表信息
const searchCommunityList = type => {
  // true为表格筛选，false为表单筛选
  console.log(formData.value, "表单选择的小区");
  const data = {
    company: type === true ? companyKey.value : formData.value.company,
    region: type === true ? regionKey.value : formData.value.region,
    village: ""
  };
  getlist(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      communityKeyList.value = res.data.data.map(item => {
        return { value: item.village, label: item.village };
      });
    }
  });
};
// 清除小区关键词
const clearCommunityKey = () => {
  CommunityKey.value = "";
  geteffortlist();
};

const selectList = ref([]);
const selectRowsId = computed(() => {
  return selectList.value.map(item => item.id);
});
// 上传文件
// const fileList = ref<UploadUserFile[]>([]);
const handleExceed: UploadProps["onExceed"] = files => {
  ElMessage.warning(`限制文件为1个, 这次你选择了${files.length}个文件`);
  // 限制为1，您这次选择了个文件。长度文件，加起来为个文件。上传长度文件。总共长度
};

const beforeRemove: UploadProps["beforeRemove"] = uploadFile => {
  return ElMessageBox.confirm(`是否删除${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};

const center = ref({ lng: 0, lat: 0 });
const zoom = ref(3);

// const handler = ({ BMap, map }: any) => {
//   console.log(BMap, map, "bmmap");
//   center.value.lng = 116.404;
//   center.value.lat = 39.915;
//   zoom.value = 17;
// };
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
interface RowVO {
  id: number;
  company: string;
  region: string;
  village: string;
  buildnumber: string;
  level: string;
  households: string;
  types: string;
  jd: string;
  wd: string;
}

const xTable = ref<VxeTableInstance<RowVO>>();
interface FormDataVO {
  company: string;
  region: string;
  village: string;
  buildnumber: string;
  level: number;
  households: number;
  types: string;
  jd: number;
  wd: number;
}
const formData = ref<FormDataVO>({
  company: "",
  region: "",
  village: "",
  buildnumber: "",
  level: 1,
  households: 1,
  types: "",
  jd: 0,
  wd: 0
});

const submitLoading = ref(false);
const showEdit = ref(false);
const selectRow = ref<RowVO | null>();
const tableData = ref([]);
const formRef = ref<VxeFormInstance>(); // from表单校验
const formRules = reactive<VxeFormPropTypes.Rules>({
  region: [{ required: true, message: "请输入区域名称" }],
  village: [{ required: true, message: "请输入小区名称" }],
  build: [{ required: true, message: "请输入楼栋数" }],
  households: [{ required: true, message: "请输入户数" }],
  area: [{ required: true, message: "请输入小区面积" }],
  zipcode: [{ required: true, message: "请输入邮编" }],
  property: [{ required: true, message: "请输入所属物业" }],
  company: [{ required: true, message: "请输入所属自来水公司" }],
  address: [{ required: true, message: "请输入地址" }],
  jd: [{ required: true, message: "点击坐标输入经度" }],
  wd: [{ required: true, message: "点击坐标输入纬度" }]
});

const insertEvent = () => {
  Object.assign(formData, {
    company: "",
    region: "",
    village: "",
    buildnumber: "",
    level: 1,
    households: 1,
    types: ""
  });
  formData.value = {
    company: "",
    region: "",
    village: "",
    buildnumber: "",
    level: 1,
    households: 1,
    types: "",
    jd: 0,
    wd: 0
  };
  // 设置默认地址
  center.value.lng = 116.404;
  center.value.lat = 39.915;
  zoom.value = 8;
  selectRow.value = null;
  showEdit.value = true;
  getallCompany(); // 点击水司获取所有水司信息
  getallRegion(); //  点击水司获取所有区域信息
};

const fixedid = ref("");
const points = ref({ lng: 0, lat: 0 }); // 小区定位点icon
// 未修改之前的对象
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

const cellDBLClickEvent = ({ row, rowIndex }) => {
  // editEvent(row)
  console.log(row, rowIndex, "row");
  // let rows = row.toString()
  router.push({
    path: "/fighting/build",
    query: { data: JSON.stringify(row) }
  });
  // 将点击的小区行数据暂存
  savearea(JSON.stringify(row));
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
// 上传图片列表
const fileList = ref<UploadUserFile[]>([]);
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
// 移除文件
const removefile = () => {
  // formRules.pitture[0].required = true;
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
        if (radio1.value == "1") {
          formdd.value = new FormData();
        }
        Object.entries(formData.value).forEach(([key, value]) => {
          // console.log(`Key: ${key}, Value: ${value}`);
          formdd.value.append(`${key}`, `${value}`);
        });
        addlist(formdd.value).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "新增成功", status: "success" });
            geteffortlist();
          }
        });
      }
    }
  }, 500);
};

// 选择框
const radio1 = ref("1");
onMounted(() => {
  geteffortlist();
});

const geteffortlist = () => {
  const data = {
    page: pageVO2.currentPage,
    pageSize: 10,
    company: companyKey.value,
    region: regionKey.value,
    village: CommunityKey.value,
    buildnumber: ""
  };
  getbuild(data).then(res => {
    if (res.retcode == 200) {
      (tableData.value as any) = res.data.data;
      pageVO2.total = res.data.total;
    }
  });
};

// 分页
const pageVO2 = reactive({
  currentPage: 1,
  total: 0
});

// 获取全部水司信息
const companys = ref([]);
interface ListItem {
  value: string;
  label: string;
}
const searchCompanysList = ref<ListItem[]>([]);
// 获取全部水司信息，在不做任何输入时显示
const getallCompany = () => {
  // debugger;
  console.log("点击下拉框就展示所有水司数据");
  // remoteCompany("");
  const data = {
    company: "",
    region: ""
  };
  getcompany(data).then(res => {
    if (res.retcode == 200) {
      // debugger;
      // loading.value = true;
      companys.value = res.data.data;
      searchCompanysList.value = companys.value.map(item => {
        return { value: item._id, label: item.name };
      });
      // loading.value = false;
    }
  });
};

// 打开右侧抽屉，请求全部水司数据
// const openright = menu => {
//   if (menu == "village") {
//     table.value = true;
//     const data = {
//       company: ""
//     };
//     getcompany(data).then(res => {
//       if (res.retcode == 200) {
//         companyData.value = res.data.data;
//       }
//     });
//   } else if (menu == "region") {
//     const data = {
//       company: "",
//       region: ""
//     };
//     getregion(data).then(res => {
//       if (res.retcode == 200) {
//         regionData.value = res.data.data;
//       }
//     });
//     regiontable.value = true;
//   }
// };

const getallRegion = () => {
  console.log("获取所有区域信息");
};

// 地图定位小区信息
// const villagekeyword = ref("");
// const lookupvillage = () => {
//   villagekeyword.value = formData.value.village;
//   console.log(villagekeyword.value, "小区名称");
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

// 翻译词典
const { t } = useI18n({
  locale: "en",
  messages: {
    en: {
      company: "company",
      areaname: "areaname",
      communityname: "community",
      buildnumber: "buildnumber",
      level: "level",
      households: "households",
      types: "type",
      notes: "notes",
      address: "adress",
      postcode: "postcode",
      communityarea: "communityarea",
      buildings: "buildings",
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
      company: "所属水司",
      areaname: "区域名称",
      communityname: "小区名称",
      buildnumber: "楼栋编号",
      level: "楼层数",
      households: "户数",
      types: "楼栋类型",
      notes: "备注",
      address: "地址",
      postcode: "邮编",
      communityarea: "小区面积",
      buildings: "楼栋数",
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
.table-main {
  width: 100%;
  // margin: auto;
  // margin-left: 50px;
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

.bm-view {
  width: 100%;
  height: 200px;
}

// 提示框
.vxe-modal--wrapper {
  z-index: 9999 !important;
}

// 隐藏上传列表
.file-list {
  display: none;
}

// 表格图片边框
::v-deep .vxe-table--render-default .vxe-tree-cell {
  padding-left: 0 !important;
}

::v-deep .el-drawer__header {
  margin-bottom: 0;
}

// :deep .vxe-select--panel {
//   position: fixed !important;
//   right: 10%;
//   left: 75%;
// }

::v-deep .vxe-toolbar .vxe-custom--wrapper {
  margin-right: 10px !important;
  margin-left: 0 !important;
}

::v-deep .vxe-form--item-content {
  display: flex;
}
::v-deep .vxe-form--item-valid {
  margin-top: 34px;
}

::v-deep .vxe-form .vxe-form--item-inner > .align--center {
  justify-content: center;
}
</style>
