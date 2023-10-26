<template>
  <div class="table-main">
    <div class="table-main">
      <vxe-toolbar custom ref="toolbarRef">
        <template #buttons>
          <div style="margin-left: 6px">
            水司：
            <vxe-select
              v-model="companyKey"
              placeholder="请输入要查找的水司"
              :options="companyKeyList"
              clearable
              filterable
              @focus="searchCompanyList"
              @change="getcollectorList()"
              @clear="clearCompanyKey()"
            />
          </div>
          <div style="margin-left: 6px">
            区域名称：
            <vxe-select
              v-model="regionKey"
              placeholder="请输入要查找的区域"
              :options="regionKeyList"
              clearable
              filterable
              @focus="searchRegionList(true)"
              @change="getcollectorList()"
              @clear="clearRegionKey()"
            />
          </div>
          <div style="margin-left: 6px">
            小区名称
            <vxe-select
              v-model="CommunityKey"
              placeholder="请输入要查找的小区"
              :options="communityKeyList"
              clearable
              filterable
              @focus="searchCommunityList(true)"
              @change="getcollectorList()"
              @clear="clearCommunityKey()"
            />
          </div>
          <div style="margin-left: 6px">
            楼栋号：
            <vxe-select
              v-model="buildKey"
              placeholder="请输入要查找的楼栋号"
              :options="buildKeyList"
              clearable
              filterable
              @focus="searchBuildList(true)"
              @change="getcollectorList()"
              @clear="clearBuildKey()"
            />
          </div>
        </template>
        <template #tools>
          <el-button type="primary" @click="addBuild" style="margin-left: 10px"
            >新增</el-button
          >
          <el-button type="primary" @click="addBuild" style="margin-left: 10px"
            >批量导入</el-button
          >
          <el-button type="danger" @click="addBuild" style="margin-left: 10px"
            >批量删除</el-button
          >
        </template>
      </vxe-toolbar>
      <vxe-table
        border
        show-overflow
        ref="xTable"
        height="550"
        :column-config="{ resizable: true, useKey: true }"
        :row-config="{ isHover: true, useKey: true }"
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent"
      >
        <vxe-column type="checkbox" width="50" fixed="left" />
        <vxe-column type="seq" width="50" title="序号" fixed="left" />
        <vxe-column
          field="company"
          width="100"
          title="水司名称"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="region"
          width="100"
          title="区域名称"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="village"
          width="100"
          title="小区名称"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="buildingnumber"
          width="100"
          title="楼栋编号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="collectroId"
          width="100"
          title="采集器编号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="workMode"
          width="100"
          title="工作模式"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="serverAddress"
          width="100"
          title="服务器地址"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="serverPort"
          width="100"
          title="服务器端口"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="middlewareAddress"
          width="100"
          title="中间件地址"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="middlewarePort"
          width="100"
          title="中间件端口"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="specification"
          width="100"
          title="规格型号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="dateOfManufacture"
          width="100"
          title="出厂日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="installationDate"
          width="100"
          title="安装日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="activationDate"
          width="100"
          title="启用日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="SIMcard"
          width="100"
          title="SIM卡"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="startTime"
          width="100"
          title="开始日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="endTime"
          width="100"
          title="结束日期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="collectionCycle"
          width="100"
          title="采集周期"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="founder"
          width="100"
          title="创建人"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="creationtime"
          width="100"
          title="创建时间"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="updater"
          width="100"
          title="最近更新人"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="updatedtime"
          width="100"
          title="最近更新时间"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="location"
          width="100"
          title="安装位置"
          sortable
          show-header-overflow
        />
        <vxe-column field="describe" width="160" title="描述信息" />
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
      <vxe-modal
        v-model="showEdit"
        :title="selectRow ? '编辑&保存' : '新增&保存'"
        width="800"
        height="546px"
        min-width="600"
        min-height="300"
        :loading="submitLoading"
        resize
        destroy-on-close
      >
        <template #default>
          <vxe-form
            :data="householdData"
            :rules="formRules"
            title-align="right"
            title-width="100"
            @submit="submitEvent"
          >
            <vxe-form-item
              field="company"
              title="水司名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-select
                  v-model="data.company"
                  placeholder="请输入要查找的水司"
                  :options="companyKeyList"
                  clearable
                  filterable
                  @focus="searchCompanyList"
                  @change="getcollectorList()"
                  @clear="clearCompanyKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="region"
              title="区域名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
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
                </el-select> -->
                <vxe-select
                  v-model="data.region"
                  placeholder="请输入要查找的区域"
                  :options="regionKeyList"
                  clearable
                  filterable
                  @focus="searchRegionList(false)"
                  @change="getcollectorList()"
                  @clear="clearRegionKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="village"
              title="小区名称"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.village"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入要查找的小区名称"
                  :remote-method="query => remoteVillage(query, 'false')"
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
                </el-select> -->
                <vxe-select
                  v-model="data.village"
                  placeholder="请输入要查找的小区"
                  :options="communityKeyList"
                  clearable
                  filterable
                  @focus="searchCommunityList(false)"
                  @change="getcollectorList()"
                  @clear="clearCommunityKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="buildingnumber"
              title="楼栋编号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.buildingnumber"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入要查找的楼栋名称"
                  :remote-method="query => remoteBuild(query, 'false')"
                  :loading="searchBuildloading"
                  style="width: 100%"
                  @change="searchBuildLists"
                >
                  <el-option
                    v-for="item in searchBuildoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select> -->
                <vxe-select
                  v-model="data.buildingnumber"
                  placeholder="请输入要查找的楼栋号"
                  :options="buildKeyList"
                  clearable
                  filterable
                  @focus="searchBuildList(false)"
                  @change="getcollectorList()"
                  @clear="clearBuildKey()"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="collectroId"
              title="采集器编号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.collectroId"
                  placeholder="请输入采集器编号"
                  style="width: 100%"
                  maxlength="9"
                >
                  <template #suffix>
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="采集器编号由9位数字组成"
                      placement="top"
                    >
                      <i
                        class="vxe-icon-warning-triangle-fill"
                        style="color: #eebe77"
                      />
                    </el-tooltip> </template
                ></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="workMode"
              title="工作模式"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.workMode"
                  class="m-3"
                  placeholder="请选择工作模式"
                >
                  <el-option
                    v-for="item in workModeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select> -->
                <vxe-select
                  v-model="data.workMode"
                  placeholder="请选择工作模式"
                  :options="workModeList"
                  clearable
                  filterable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="addressType"
              title="地址类型"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.addressType"
                  class="m-3"
                  placeholder="请选择地址类型"
                >
                  <el-option
                    v-for="item in addressTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select> -->
                <vxe-select
                  v-model="data.addressType"
                  placeholder="请选择地址类型"
                  :options="addressTypeList"
                  clearable
                  filterable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="contentType"
              title="总表连接方式"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.contentType"
                  class="m-3"
                  placeholder="请选择总表连接方式"
                >
                  <el-option
                    v-for="item in contentTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select> -->
                <vxe-select
                  v-model="data.contentType"
                  placeholder="请选择总表连接方式"
                  :options="contentTypeList"
                  clearable
                  filterable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="collectionCycle"
              title="采集周期"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.collectionCycle"
                  class="m-3"
                  placeholder="请输入采集周期"
                >
                  <el-option
                    v-for="item in residentstatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select> -->
                <vxe-select
                  v-model="data.collectionCycle"
                  placeholder="请输入采集周期"
                  :options="collectionCycleList"
                  clearable
                  filterable
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="serverAddress"
              title="服务器地址"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.serverAddress"
                  placeholder="请输入服务器地址"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="serverPort"
              title="服务器端口"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.serverPort"
                  placeholder="请输入服务器端口"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="middlewareAddress"
              title="中间件地址"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.middlewareAddress"
                  placeholder="请输入中间件地址"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="middlewarePort"
              title="中间件端口"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.middlewarePort"
                  placeholder="请输入中间件端口"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="specification"
              title="规格型号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.specification"
                  placeholder="请输入规格型号"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="dateOfManufacture"
              title="出厂日期"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.dateOfManufacture"
                  placeholder="请输入出厂日期"
                  type="date"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="installationDate"
              title="安装日期"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.installationDate"
                  placeholder="请输入安装日期"
                  type="date"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="activationDate"
              title="启用日期"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.activationDate"
                  placeholder="请输入启用日期"
                  type="date"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="SIMcard"
              title="SIM卡号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.SIMcard" placeholder="请输入SIM卡号" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="startTime"
              title="开始时间"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.startTime"
                  placeholder="请输入开始日期"
                  type="date"
                  label-format="MM-dd"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="endTime"
              title="结束时间"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.endTime"
                  placeholder="请输入结束日期"
                  type="date"
                  label-format="MM-dd"
                  :transfer="true"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="location"
              title="安装位置"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.location"
                  placeholder="请输入安装位置"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="describe"
              title="描述信息"
              :span="24"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-textarea
                  v-model="data.describe"
                  placeholder="请输入描述信息"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" title-align="left" :span="24">
              <template #default>
                <vxe-button type="button">配置下发</vxe-button>
                <vxe-button type="submit">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>
      <vxe-modal
        v-model="showPrice"
        title="价格选择"
        width="860"
        height="460px"
        min-width="600"
        min-height="300"
        resize
        destroy-on-close
      >
        <template #default>
          <vxe-table
            border
            ref="pTable"
            height="300"
            :data="priceData"
            :radio-config="{ highlight: true, useKey: true }"
            :column-config="{ resizable: true, useKey: true }"
            :row-config="{ isHover: true, useKey: true }"
            @cell-click="priceCellClick"
            @radio-change="priceradioChange"
          >
            <vxe-column type="radio" width="60">
              <template #header>
                <vxe-button
                  type="text"
                  @click="clearRadioRowEevnt"
                  :disabled="!selectRow"
                  >取消</vxe-button
                >
              </template>
            </vxe-column>
            <vxe-column
              field="number"
              title="价格编号"
              width="100"
              show-overflow
            />
            <vxe-column
              field="type"
              title="价格类型"
              width="100"
              show-overflow
            />
            <vxe-column
              type="html"
              field="stepnumber"
              title="阶梯价格编号"
              width="110"
            />
            <vxe-column
              field="name"
              title="价格名称"
              width="100"
              show-overflow
            />
            <vxe-column field="waterUnitprice" title="水费单价" width="90" />
            <vxe-column
              field="waterUnitpricePer"
              title="水费标准单价百分比"
              width="150"
            />
            <vxe-column
              field="pollutioUnitprice"
              title="排污费单价"
              width="90"
            />
            <vxe-column
              field="pollutioUnitpricePer"
              title="排污费单价百分比"
              width="140"
            />
            <vxe-column
              field="pressureUnitprice"
              title="二次加压费用单价"
              width="140"
            />
            <vxe-column
              field="pressureUnitpricePre"
              title="二次加压费用百分比"
              width="150"
            />
            <vxe-column
              field="otherExpensesName"
              title="其他费用名称"
              width="110"
            />
            <vxe-column field="otherExpenses" title="其他费用" width="90" />
            <vxe-column
              field="otherExpensesPre"
              title="其他费用百分比"
              width="120"
            />
            <vxe-column field="founder" title="创建人" width="100" />
            <vxe-column
              field="creationtime"
              title="创建时间"
              width="125"
              show-overflow
            />
            <vxe-column field="updater" title="更新人" width="100" />
            <vxe-column field="updatedtime" title="更新时间" width="100" />
            <vxe-column
              field="describeinformation"
              title="描述信息"
              width="100"
            />
          </vxe-table>
          <div style="margin-top: 10px">
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
          <div
            style="
              display: flex;
              align-items: center; /* 垂直交叉轴居中 */
              justify-content: center; /* 水平主轴居中 */
            "
          >
            <vxe-button @click="selectPrice()">确认</vxe-button>
            <vxe-button @click="showPrice = false">取消</vxe-button>
          </div>
        </template>
        <!-- <template #footer> 1 </template> -->
      </vxe-modal>
    </div>
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
    <rightlist />
  </div>
</template>
<script setup lang="ts">
// import { useRouter, useRoute } from "vue-router"; // 导入路由模块
import { ref, reactive, onMounted, nextTick } from "vue";
import {
  VXETable,
  VxeFormPropTypes,
  VxeTableInstance,
  VxeToolbarInstance
} from "vxe-table";
import { ElMessage } from "element-plus";
// import fdData from "@/assets/data/fd.json"; // 导入福鼎家园楼栋数据
import { getcompany, getregion, getlist } from "@/api/effort";
import { getbuild } from "@/api/build";
// import { gethousehold, householdadd } from "@/api/household";
import {
  getcollector,
  collectorfix,
  collectordelete,
  collectoradd
} from "@/api/collector";
import rightlist from "@/components/rightlist/rightlist.vue";

// const regioned = ref("");
// const area = ref("");
// 住户状态
// const residentstatusList = [
//   {
//     id: 1,
//     name: "1"
//   },
//   {
//     id: 2,
//     name: "2"
//   },
//   {
//     id: 3,
//     name: "3"
//   },
//   {
//     id: 4,
//     name: "4"
//   },
//   {
//     id: 5,
//     name: "6"
//   },
//   {
//     id: 6,
//     name: "8"
//   },
//   {
//     id: 7,
//     name: "12"
//   },
//   {
//     id: 8,
//     name: "24"
//   }
// ];

// 工作模式
const workModeList = [{ value: 1, label: "水表法" }];

// 地址类型
const addressTypeList = [
  { value: 1, label: "ip地址" },
  { value: 2, label: "域名" }
];

// 总表连接方式
const contentTypeList = [
  { value: 1, label: "独立" },
  { value: 2, label: "并联" },
  { value: 3, label: "串联" }
];

// 采集周期
const collectionCycleList = [
  { value: 1, label: "1h" },
  { value: 2, label: "2h" },
  { value: 3, label: "3h" },
  { value: 4, label: "4h" },
  { value: 5, label: "6h" },
  { value: 6, label: "8h" },
  { value: 7, label: "12h" },
  { value: 8, label: "24h" }
];

onMounted(() => {
  // isformArea();
  // getregion();
  // getallCompany();
  // getcompanyed();
  getcollectorList(); // 获取全部采集器信息
});

// const serchcompany = ref("");
const getcollectorList = () => {
  const data = {
    page: 1,
    pageSize: 10,
    company: companyKey.value,
    region: regionKey.value,
    village: CommunityKey.value,
    buildingnumber: buildKey.value
  };
  getcollector(data).then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
      pageVO2.total = res.data.total;
    }
  });
};

// onActivated(() => {
//   selectXq.value = JSON.parse(route.query.data);
// });

// 新增小区楼栋
const addBuild = () => {
  // console.log("新增楼栋表单");
  Object.assign(householdData, {
    company: "",
    region: "",
    village: "",
    buildingnumber: "",
    collectroId: "", // 采集器编号
    workMode: "", // 工作模式
    serverAddress: "", // 服务器地址
    serverPort: "", // 服务器端口
    middlewareAddress: "", // 中间件地址
    middlewarePort: "", // 中间件端口
    specification: "", // 规格型号
    dateOfManufacture: "", // 出厂日期
    installationDate: "", // 安装日期
    activationDate: "", // 启用日期
    SIMcard: "", // SIM卡号
    startTime: "", // 开始时间
    endTime: "", // 结束时间
    collectionCycle: "", // 采集周期
    founder: "", // 创建人
    creationtime: "", // 创建时间
    updater: "", // 更新人
    updatedtime: "", // 更新时间
    location: "", // 安装位置
    describe: "" // 描述信息
  });
  selectRow.value = null;
  // 如果在表格筛选选择了水司/区域/小区/楼栋等，那就传递给表单组件
  // if (companyed.value.length > 0) {
  //   householdData.company = companyed.value;
  // }
  showEdit.value = true;
};

// 右侧地图显示与隐藏
// const showmap = ref(true);

// 表格字段
interface RowVO {
  id: number;
  company: string;
  region: string;
  village: string;
  buildingnumber: string;
  collectroId: string; // 采集器编号
  workMode: string; // 工作模式
  serverAddress: string; // 服务器地址
  serverPort: string; // 服务器端口
  middlewareAddress: string; // 中间件地址
  middlewarePort: string; // 中间件端口
  specification: string; // 规格型号
  dateOfManufacture: string; // 出厂日期
  installationDate: string; // 安装日期
  activationDate: string; // 启用日期
  SIMcard: string; // SIM卡号
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  collectionCycle: string; // 采集周期
  founder: string; // 创建人
  creationtime: string; // 创建时间
  updater: string; // 更新人
  updatedtime: string; // 更新时间
  location: string; // 安装位置
  describe: string; // 描述信息
}
const householdData = reactive({
  company: "",
  region: "",
  village: "",
  buildingnumber: "",
  collectroId: "", // 采集器编号
  workMode: "", // 工作模式
  serverAddress: "", // 服务器地址
  serverPort: "", // 服务器端口
  middlewareAddress: "", // 中间件地址
  middlewarePort: "", // 中间件端口
  specification: "", // 规格型号
  dateOfManufacture: "", // 出厂日期
  installationDate: "", // 安装日期
  activationDate: "", // 启用日期
  SIMcard: "", // SIM卡号
  startTime: "", // 开始时间
  endTime: "", // 结束时间
  collectionCycle: "", // 采集周期
  founder: "", // 创建人
  creationtime: "", // 创建时间
  updater: "", // 更新人
  updatedtime: "", // 更新时间
  location: "", // 安装位置
  describe: "" // 描述信息
});
const tableData = ref<RowVO[]>([]);
const showEdit = ref(false); // 展示编辑框
const selectRow = ref<RowVO | null>();
const submitLoading = ref(false);
// 点击行回调
const cellDBLClickEvent = (row: any) => {
  // 前往户表信息
  console.log(row.data, "row");
  router.push({ path: "/basicInformation/build" });
};

// 编辑事件
const editEvent = (row: RowVO) => {
  Object.assign(householdData, row);
  selectRow.value = row;
  showEdit.value = true;
};

// 删除事件
const removeEvent = async (row: RowVO) => {
  const params = (row as any)._id;
  const type = await VXETable.modal.confirm("您确定要删除该数据?");
  if (type === "confirm") {
    const $table = xTable.value;
    if ($table) {
      // $table.remove(row);
      // 删除接口
      collectordelete(params).then(res => {
        // console.log(res.data);
        if (res.retcode == 200) {
          VXETable.modal.message({
            content: `${res.message}`,
            status: "success"
          });
          getcollectorList();
        }
      });
    }
  }
};

// 表单规则
const formRules = reactive<VxeFormPropTypes.Rules>({
  company: [{ required: true, message: "请输入水司名称" }],
  region: [{ required: true, message: "请输入区域名称" }],
  village: [{ required: true, message: "请输入小区名称" }],
  buildingnumber: [{ required: true, message: "请输入楼栋编号" }],
  collectroId: [
    { required: true, type: "number", message: "请输入采集器编号(9位数字)" }
  ],
  workMode: [{ required: true, message: "请输入工作模式" }],
  serverAddress: [{ required: true, message: "请输入服务器地址" }],
  serverPort: [{ required: true, message: "请输入服务器端口" }],
  middlewareAddress: [{ required: true, message: "请输入中间件地址" }],
  middlewarePort: [{ required: true, message: "请输入中间件端口" }],
  // specification: [{ required: true, message: "请输入规格型号" }],
  dateOfManufacture: [{ required: true, message: "请选择出厂日期" }],
  installationDate: [{ required: true, message: "请选择安装日期" }],
  activationDate: [{ required: true, message: "请选择启用日期" }],
  SIMcard: [{ required: true, message: "请输入SIM卡号" }],
  startTime: [{ required: true, message: "请输入开始日期" }],
  endTime: [{ required: true, message: "请输入结束日期" }],
  collectionCycle: [{ required: true, message: "请输入采集周期" }]
  // location: [{ required: true, message: "请输入安装位置" }],
  // describe: [{ required: true, message: "请输入描述信息" }]
});

// 提交楼栋信息
const submitEvent = () => {
  submitLoading.value = true;
  // showbaidumap.value = false
  setTimeout(() => {
    const $table = xTable.value;
    if ($table) {
      submitLoading.value = false;
      if (selectRow.value) {
        console.log(householdData, "编辑表单数据");
        collectorfix((selectRow.value as any)._id, householdData).then(res => {
          if (res.retcode == 200) {
            VXETable.modal.message({ content: "保存成功", status: "success" });
            // Object.assign(selectRow.value, householdData);
            showEdit.value = false;
            getcollectorList();
          }
        });
      } else {
        // 采集器编号为9位
        if (householdData.collectroId.length !== 9) {
          showEdit.value = true;
          return ElMessage.error("请确认采集器编号是否为9位数字!");
        }
        collectoradd(householdData).then(res => {
          // console.log(res.data, "新增接口");
          if (res.retcode == 200) {
            showEdit.value = false;
            VXETable.modal.message({ content: "新增成功", status: "success" });
            // getcollectorList();
          }
        });
        $table.insert({ ...householdData });
      }
    }
  }, 500);
};
const xTable = ref<VxeTableInstance<RowVO>>();

// 分页
const pageVO2 = reactive({
  currentPage: 1,
  total: 0
});

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

const companyKey = ref(""); // 搜索水司关键词
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
  getcollectorList();
};

const regionKey = ref(""); // 区域搜索词
const regionKeyList = ref([]); // 区域搜索列表
// 查询区域列表信息
const searchRegionList = type => {
  // true为表格筛选，false为表单筛选
  console.log(householdData.company, "表单选择的水司");
  const data = {
    company: type === true ? companyKey.value : householdData.company,
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
  buildKey.value = "";
  getcollectorList();
};

const CommunityKey = ref(""); // 小区搜索词
const communityKeyList = ref([]); // 小区搜索列表
// 查询小区列表信息
const searchCommunityList = type => {
  // true为表格筛选，false为表单筛选
  console.log(householdData, "表单选择的小区");
  const data = {
    company: type === true ? companyKey.value : householdData.company,
    region: type === true ? regionKey.value : householdData.region,
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
  buildKey.value = "";
  getcollectorList();
};

const buildKey = ref(""); // 楼栋搜索词
const buildKeyList = ref([]); // 楼栋搜索列表
// 查询楼栋列表信息
const searchBuildList = type => {
  // true为表格筛选，false为表单筛选
  console.log(householdData, "表单选择的小区");
  const data = {
    company: type === true ? companyKey.value : householdData.company,
    region: type === true ? regionKey.value : householdData.region,
    village: type === true ? CommunityKey.value : householdData.village,
    buildnumber: type === true ? buildKey.value : householdData.buildingnumber
  };
  getbuild(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      buildKeyList.value = res.data.data.map(item => {
        return { value: item.buildnumber, label: item.buildnumber };
      });
    }
  });
};
// 清除小区关键词
const clearBuildKey = () => {
  buildKey.value = "";
  gethouseholdList();
};
</script>
<style lang="scss" scoped>
.table-main {
  height: 100%;
}

.baidu-map {
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.m-2 {
  width: 140px;
}

.m-3 {
  width: 140px;
  margin: 0 !important;
}

.icon-price:hover {
  fill: #53a7ff;
}
// ::v-deep(.timetip) {
//   z-index: 9999999999999;
// }
::v-deep .vxe-select {
  width: 160px;
}
</style>
