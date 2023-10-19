<template>
  <div class="table-main">
    <div class="table-main">
      <vxe-toolbar custom ref="toolbarRef">
        <template #buttons>
          水司：
          <!-- <el-select
            v-model="companyed"
            class="m-2"
            @change="changeCompany"
            @clear="clearCompany"
            placeholder="请选择水司"
            clearable
          >
            <el-option
              v-for="item in selectCompany"
              :key="item._id"
              :label="item.name"
              :value="item.name"
            />
          </el-select> -->
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
            style="width: 150px; margin-right: 10px"
          >
            <el-option
              v-for="item in searchCompanyoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          区域名称：
          <el-select
            v-model="RegionKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的区域名称"
            :remote-method="query => remoteRegion(query, 'false')"
            :loading="searchRegionloading"
            style="width: 150px; margin-right: 10px"
            @change="searchRegionLists"
          >
            <el-option
              v-for="item in searchRegionoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          小区名称：
          <el-select
            v-model="VillageKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的小区名称"
            :remote-method="query => remoteVillage(query, 'false')"
            :loading="searchVillageloading"
            style="width: 150px; margin-right: 10px"
            @change="searchVillageLists"
          >
            <el-option
              v-for="item in searchVillageoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          楼栋号：
          <!-- <el-select v-model="builded" class="m-2" placeholder="请选择楼栋号">
            <el-option
              v-for="item in selectBuild"
              :key="item._id"
              :label="item.buildnumber"
              :value="item.buildnumber"
            />
          </el-select> -->
          <el-select
            v-model="BuildKeyword"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入要查找的楼栋名称"
            :remote-method="query => remoteBuild(query, 'false')"
            :loading="searchBuildloading"
            style="width: 150px; margin-right: 10px"
            @change="searchBuildLists"
          >
            <el-option
              v-for="item in searchBuildoptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </template>
        <template #tools>
          <el-button type="primary" @click="addBuild" style="margin-left: 10px"
            >新增</el-button
          >
          <el-button type="danger" @click="addBuild" style="margin-left: 10px"
            >批量删除</el-button
          >
          <el-button type="success" @click="addBuild" style="margin-left: 10px"
            >开户</el-button
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
          field="unit"
          width="100"
          title="单元号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="housenumber"
          width="100"
          title="门牌号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="executionprice"
          width="100"
          title="价格编号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="userID"
          width="100"
          title="用户编号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="userStatus"
          width="100"
          title="住户状态"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="floor"
          width="100"
          title="楼层号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="members"
          width="100"
          title="成员个数"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="area"
          width="100"
          title="住户面积"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="pipelineLocation"
          width="100"
          title="管道位置"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="residentLocation"
          width="100"
          title="住户方位"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="roomcard"
          width="100"
          title="房间卡号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="changemeter"
          width="100"
          title="是否换过表"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="residentName"
          width="100"
          title="住户姓名"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="fixedtelephone"
          width="100"
          title="固定电话"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="mobilephone"
          width="100"
          title="移动电话"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="ID"
          width="100"
          title="身份证号"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="e-mailaddress"
          width="100"
          title="邮箱地址"
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
          field="updated"
          width="100"
          title="最近更新人"
          sortable
          show-header-overflow
        />
        <vxe-column
          field="updatedtime"
          width="100"
          title="最近时间"
          sortable
          show-header-overflow
        />
        <vxe-column field="notes" width="100" title="备注" />
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
        height="560px"
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
                <!-- <el-select
                  v-model="data.company"
                  @change="changeCompany()"
                  @clear="clearAddFrom()"
                  class="m-3"
                  clearable
                  placeholder="请选择水司名称"
                >
                  <el-option
                    v-for="item in selectCompany"
                    :key="item._id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select> -->
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
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.region"
                  @change="changeRegion"
                  class="m-3"
                  clearable
                  placeholder="请先选择水司名称"
                >
                  <el-option
                    v-for="item in selectRegion"
                    :key="item._id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select> -->
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
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <!-- <el-select
                  v-model="data.village"
                  @change="changeVillage"
                  class="m-3"
                  clearable
                  placeholder="请先选择区域名称"
                >
                  <el-option
                    v-for="item in selectVillage"
                    :key="item._id"
                    :label="item.village"
                    :value="item.village"
                  />
                </el-select> -->
                <el-select
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
                </el-select>
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
                  class="m-3"
                  clearable
                  placeholder="请选择楼栋号"
                >
                  <el-option
                    v-for="item in selectBuild"
                    :key="item._id"
                    :label="item.buildnumber"
                    :value="item.buildnumber"
                  />
                </el-select> -->
                <el-select
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
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="userid"
              title="用户编号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.userid"
                  placeholder="请输入用户编号"
                  style="width: 100%"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="unit"
              title="单元号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.unit" placeholder="请输入单元号" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="housenumber"
              title="门牌号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.housenumber"
                  placeholder="请输入门牌号"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="floor"
              title="楼层号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.floor" placeholder="请输入楼层号" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="householdperson"
              title="住户人数"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.householdperson"
                  placeholder="请输入住户人数"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="householdsize"
              title="住户面积"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.householdsize"
                  placeholder="请输入住户面积"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="pipelocation"
              title="管道位置"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.pipelocation"
                  placeholder="请输入管道位置"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="location"
              title="住方位"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.location" placeholder="请输入住方位" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="roomcard"
              title="房间卡号"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.roomcard"
                  placeholder="请输入房间卡号"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="changemeter"
              title="是否换表"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.changemeter"
                  class="m-3"
                  placeholder="请选择是否换表"
                >
                  <el-option
                    v-for="item in ismeterchange"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="fixedtelephone"
              title="固定电话"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.fixedtelephone"
                  placeholder="请输入固定电话"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="mobilephone"
              title="移动电话"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.mobilephone"
                  placeholder="请输入移动电话"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="householdname"
              title="住户姓名"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.householdname"
                  placeholder="请输入住户姓名"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="residentstatus"
              title="住户状态"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <el-select
                  v-model="data.residentstatus"
                  class="m-3"
                  placeholder="请选择住户状态"
                >
                  <el-option
                    v-for="item in residentstatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="email"
              title="邮箱地址"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.email" placeholder="请输入邮箱地址" />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="householdtype"
              title="住户类型"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.householdtype"
                  placeholder="请输入住户类型"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="IDcard"
              title="身份证"
              :span="8"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input v-model="data.IDcard" placeholder="请输入身份证" />
              </template>
            </vxe-form-item>
            <!-- 执行价格就是价格编号 -->
            <vxe-form-item
              field="executionprice"
              title="执行价格"
              :span="16"
              :item-render="{}"
              style="position: relative"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.executionprice"
                  placeholder="请输入执行价格"
                  style="width: 140px"
                />
                <a title="查询执行价格">
                  <svg
                    t="1693447489138"
                    class="icon-price"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4078"
                    width="30"
                    height="30"
                    style="position: absolute; top: 0; right: 210px"
                    @click="lookupPrice()"
                  >
                    <path
                      d="M849.2 498.2c0-193.8-157.1-351-351-351s-351 157.1-351 351 157.1 351 351 351 351-157.1 351-351z m-361 0.8H362.4c-9.4 0-17.1-7.7-17.1-17.1 0-9.4 7.7-17.1 17.1-17.1h97.4c-0.6-0.5-1.2-1-1.8-1.6L381.8 387c-6.7-6.7-6.7-17.5 0-24.2 6.7-6.7 17.5-6.7 24.2 0l76.2 76.2c6.7 6.7 6.7 17.5 0 24.2-0.6 0.6-1.2 1.1-1.8 1.6h40.8c-0.6-0.5-1.2-1-1.8-1.6-6.7-6.7-6.7-17.5 0-24.2l76.2-76.2c6.7-6.7 17.5-6.7 24.2 0 6.7 6.7 6.7 17.5 0 24.2l-76.2 76.2c-0.6 0.6-1.2 1.1-1.8 1.6h100.1c9.4 0 17.1 7.7 17.1 17.1 0 9.4-7.7 17.1-17.1 17.1H522.4v69h119.5c9.4 0 17.1 7.7 17.1 17.1 0 9.4-7.7 17.1-17.1 17.1H522.4v81.6c0 9.4-7.7 17.1-17.1 17.1-9.4 0-17.1-7.7-17.1-17.1v-81.6H362.4c-9.4 0-17.1-7.7-17.1-17.1 0-9.4 7.7-17.1 17.1-17.1h125.8v-69z m312 265l120.3 120.3c10 10 10 26.2 0 36.2-10 10-26.2 10-36.2 0L764 800.2c-70.9 62.4-163.9 100.3-265.7 100.3C276.1 900.5 96 720.4 96 498.2S276.1 96 498.2 96s402.2 180.1 402.2 402.2c0.1 101.9-37.8 194.9-100.2 265.8z"
                      p-id="4079"
                    />
                  </svg>
                </a>

                <el-checkbox
                  label="批量修改"
                  style="position: absolute; top: 0; right: 120px"
                />
              </template>
            </vxe-form-item>
            <vxe-form-item
              field="remark"
              title="备注"
              :span="24"
              :item-render="{}"
            >
              <template #default="{ data }">
                <vxe-input
                  v-model="data.remark"
                  type="text"
                  placeholder="请输入备注"
                />
              </template>
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
    <!-- <div>
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
    </div> -->
    <rightlist />
  </div>
</template>
<script setup lang="ts">
// import { useRouter, useRoute } from "vue-router"; // 导入路由模块
import { ref, reactive, onActivated, onMounted, nextTick } from "vue";
import {
  VXETable,
  VxeFormPropTypes,
  VxeTableInstance,
  VxeToolbarInstance
} from "vxe-table";
// import { ElMessageBox, ElMessage } from "element-plus";
import { useStore } from "@/store/modules/build"; // 从pinia中导入到村的地理位置信息
// import fdData from "@/assets/data/fd.json"; // 导入福鼎家园楼栋数据
import { getcompany, getregion, getlist } from "@/api/effort";
import { getbuild } from "@/api/build";
import { gethousehold, householdadd } from "@/api/household";
import { getpriceset } from "@/api/price";
import rightlist from "@/components/rightlist/rightlist.vue";
import { useDebounceFn } from "@vueuse/core";
const store = useStore();
const { change } = store;

// const regioned = ref("");
// const area = ref("");
// 是否换过表
const ismeterchange = [
  {
    value: "是",
    label: "是"
  },
  {
    value: "否",
    label: "否"
  }
];
// 住户状态
const residentstatusList = [
  {
    id: 1,
    name: "未开户"
  },
  {
    id: 2,
    name: "开户"
  },
  {
    id: 3,
    name: "拆表"
  },
  {
    id: 4,
    name: "停表"
  },
  {
    id: 5,
    name: "销户"
  }
];
onMounted(() => {
  // isformArea();
  // getregion();
  getallCompany();
  // getcompanyed();
  gethouseholdList(); // 获取住户信息
});

// const serchcompany = ref("");
const gethouseholdList = () => {
  const data = {
    page: 1,
    pageSize: 10,
    company: rgcompany.value,
    region: rgregion.value,
    village: rgvillage.value,
    buildingnumber: rgbuild.value
  };
  gethousehold(data).then(res => {
    if (res.retcode == 200) {
      tableData.value = res.data.data;
      pageVO2.total = res.data.total;
    }
  });
};

onActivated(() => {
  selectXq.value = JSON.parse(route.query.data);
});

// 新增小区楼栋
const addBuild = () => {
  // console.log("新增楼栋表单");
  Object.assign(householdData, {
    company: "",
    region: "",
    village: "",
    buildingnumber: "",
    userid: "",
    housenumber: "",
    floor: "", // 楼层号
    executionprice: "", // 执行价格
    householdperson: "", // 住户人数
    householdsize: "", // 住户面积
    pipelocation: "", // 管道位置
    location: "", // 住方位
    roomcard: "", // 房间卡号
    changemeter: "", // 是否换表
    fixedtelephone: "", // 固定电话
    mobilephone: "", // 移动电话
    householdname: "", // 住户姓名
    residentstatus: "", // 住户状态
    email: "", // 邮箱
    householdtype: "", // 住户类型
    IDcard: "", // 身份证
    remark: "" // 备注
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
  userid: string;
  households: number;
  types: string;
  founder: number;
  foundertime: number;
  updated: string;
  updatedtime: string;
  notes: string;
  jd: string;
  wd: string;
}
const householdData = reactive({
  company: "",
  region: "",
  village: "",
  buildingnumber: "",
  userid: "",
  unit: "", // 单元号
  housenumber: "", // 门牌号
  floor: "", // 楼层号
  executionprice: "", // 执行价格
  householdperson: "", // 住户人数
  householdsize: "", // 住户面积
  pipelocation: "", // 管道位置
  location: "", // 住方位
  roomcard: "", // 房间卡号
  changemeter: "", // 是否换表
  fixedtelephone: "", // 固定电话
  mobilephone: "", // 移动电话
  householdname: "", // 住户姓名
  residentstatus: "", // 住户状态
  email: "", // 邮箱
  householdtype: "", // 住户类型
  IDcard: "", // 身份证
  remark: "" // 备注
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
  const type = await VXETable.modal.confirm("您确定要删除该数据?");
  if (type === "confirm") {
    const $table = xTable.value;
    if ($table) {
      $table.remove(row);
    }
  }
};

// 表单规则
const formRules = reactive<VxeFormPropTypes.Rules>({
  company: [{ required: true, message: "请输入水司名称" }],
  region: [{ required: true, message: "请输入区域名称" }],
  village: [{ required: true, message: "请输入小区名称" }],
  buildingnumber: [{ required: true, message: "请输入楼栋编号" }],
  userid: [{ required: true, message: "请输入用户编号" }],
  unit: [{ required: true, message: "请输入单元号" }],
  housenumber: [{ required: true, message: "请输入门牌号" }],
  floor: [{ required: true, message: "请输入楼层号" }],
  executionprice: [{ required: true, message: "请选择执行价格" }],
  roomcard: [{ required: true, message: "请输入房间卡号" }],
  changemeter: [{ required: true, message: "请选择是否换表" }]
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
        console.log(householdData, "编辑表单数据");
        VXETable.modal.message({ content: "保存成功", status: "success" });
        Object.assign(selectRow.value, householdData);
      } else {
        // console.log(householdData, "新增表单数据");
        householdadd(householdData).then(res => {
          console.log(res.data, "新增接口");
        });
        VXETable.modal.message({ content: "新增成功", status: "success" });
        $table.insert({ ...householdData });
        // 将楼栋信息保存到pinia
        change(householdData);
        // 将表单信息保存
        // saveBuild(householdData);
        // 加载完成后要立即刷新地图组件
        // 根据高度展示不同广告牌
        // homePage.value.interbuild();
        // homePage.value.addregion("setbuild");
      }
    }
  }, 500);
};
const xTable = ref<VxeTableInstance<RowVO>>();

// 改变小区
// const changeArea = val => {
//   console.log(val, "选中的小区");
//   if (val == "福鼎家园") {
//     // (tableData as any).value = fdData;
//   } else {
//     // (tableData as any).value = [];
//   }
// };

// 获取区域信息
// const selectRegion = ref([]);
// const getregion = () => {
//   const data = {
//     page: 1,
//     pageSize: 1000
//   };
//   getlist(data).then(res => {
//     console.log(res.data, "区域数据");
//     if (res.retcode == 200) {
//       selectRegion.value = res.data.data;
//     }
//   });
// };

// 获取全部水司信息
// const companyed = ref("");
// const selectCompany = ref([]);
// const getcompanyed = () => {
//   getcompany().then(res => {
//     if (res.retcode == 200) {
//       // console.log(res.data, "res.data");
//       selectCompany.value = res.data;
//     }
//   });
// };

// 修改水司查询区域信息
// const selectRegion = ref([]);
// const changeCompany = () => {
//   let params = "";
//   showEdit.value == true
//     ? (params = householdData.company)
//     : (params = companyed.value);
//   getregion(params).then(res => {
//     if (res.retcode == 200) {
//       selectRegion.value = res.data;
//       if (showEdit.value == false) {
//         gethouseholdList();
//       }
//     }
//   });
// };
// 筛选表格清除
// const clearCompany = () => {
//   console.log("清空表单");
//   regioned.value = "";
//   area.value = "";
//   selectVillage.value = [];
//   builded.value = "";
//   selectBuild.value = [];
// };
// 筛选表单清除
// const clearAddFrom = () => {
//   householdData.company = "";
//   householdData.region = "";
//   householdData.village = "";
//   householdData.buildingnumber = "";
//   selectRegion.value = [];
//   selectVillage.value = [];
//   selectBuild.value = [];
// };

// 修改区域信息查询小区信息
// const selectVillage = ref([]);
// const changeRegion = () => {
//   const data = { region: "" };
//   showEdit.value == true
//     ? (data.region = householdData.region)
//     : (data.region = regioned.value);
//   // const data = {
//   //   village: regioned.value
//   // };
//   getvillage(data).then(res => {
//     selectVillage.value = res.data;
//     // console.log(selectVillage.value, "小区下拉菜单");
//   });
// };

// 修改小区查询楼栋信息
// const selectBuild = ref([]);
// const changeVillage = () => {
//   const data = {
//     page: 1,
//     pageSize: 1000,
//     keyword: ""
//   };
//   showEdit.value == true
//     ? (data.keyword = householdData.village)
//     : (data.keyword = area.value);

//   getbuild(data).then(res => {
//     selectBuild.value = res.data.data;
//   });
// };

// 楼栋信息
// const builded = ref("");

// 分页
const pageVO2 = reactive({
  currentPage: 1,
  total: 0
});

const toolbarRef = ref<VxeToolbarInstance>();
nextTick(() => {
  // 将表格和工具栏进行关联
  const $table = xTable.value;
  const $toolbar = toolbarRef.value;
  if ($table && $toolbar) {
    $table.connect($toolbar);
  }
});

const showPrice = ref(false); // 展示价格弹框
// 查询执行价格
const lookupPrice = () => {
  // console.log("点击了查询价格");
  showPrice.value = true;
  getprice();
};

const CompanyKeyword = ref(""); // 搜索水司关键词
const RegionKeyword = ref(""); // 搜索区域关键词
const VillageKeyword = ref(""); // 搜索小区关键词
const BuildKeyword = ref(""); // 搜索楼栋关键词

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

// 获取全部区域信息
// const regions = ref([]);
const searchRegionList = ref<ListItem[]>([]);
const searchRegionloading = ref(false); // 搜索加载状态
const searchRegionoptions = ref<ListItem[]>([]); // 列表数据

// 输入区域方法
const remoteRegion = useDebounceFn((query: string, isform) => {
  console.log(query, "参数");
  if (query) {
    searchRegionloading.value = true;
    const data = {
      company: isform == "true" ? householdData.company : CompanyKeyword.value,
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
      company: isform == "true" ? householdData.company : CompanyKeyword.value,
      region: isform == "true" ? householdData.region : RegionKeyword.value,
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

// 获取全部楼栋信息
const searchBuildList = ref<ListItem[]>([]);
const searchBuildloading = ref(false); // 搜索加载状态
const searchBuildoptions = ref<ListItem[]>([]); // 列表数据
// 输入楼栋方法
const remoteBuild = useDebounceFn((query: string, isform) => {
  if (query) {
    searchBuildloading.value = true;
    const data = {
      page: 1,
      pageSize: 1000,
      company: isform == "true" ? householdData.company : CompanyKeyword.value,
      region: isform == "true" ? householdData.region : RegionKeyword.value,
      village: isform == "true" ? householdData.village : VillageKeyword.value,
      buildnumber: query
    };
    getbuild(data).then(res => {
      if (res.retcode == 200) {
        searchBuildloading.value = false;
        searchBuildoptions.value = res.data.data.map(item => {
          return { value: item._id, label: item.buildnumber };
        });
      } else {
        searchBuildoptions.value = searchBuildList.value;
      }
    });
  }
}, 500);

const rgcompany = ref(""); // 查询楼栋入参水司
const rgregion = ref(""); // 查询楼栋入参区域
const rgvillage = ref(""); // 查询楼栋入参小区
const rgbuild = ref(""); // 查询楼栋入参小区
// 根据水司查询小区信息
const searchEffortList = val => {
  // console.log(val, "水司关键词");
  // 入参水司，请求楼栋数据
  rgcompany.value = val;
  gethouseholdList();
};

// 根据水司-区域查询小区信息
const searchRegionLists = val => {
  rgregion.value = val;
  gethouseholdList();
};

// 根据水司-区域-小区模糊搜索查询小区信息
const searchVillageLists = val => {
  rgvillage.value = val;
  gethouseholdList();
};

// 根据水司-区域-小区-楼栋号模糊搜索查询小区信息
const searchBuildLists = val => {
  rgbuild.value = val;
  gethouseholdList();
};

const priceData = ref([]); // 获取价格设置信息
const pricepage = reactive({
  currentPage: 1,
  total: 0
}); // 价格选择弹框分页
const getprice = () => {
  const data = {
    page: pricepage.currentPage,
    pageSize: 10,
    number: ""
  };
  getpriceset(data).then(res => {
    // console.log(res.data);
    if (res.retcode == 200) {
      priceData.value = res.data.data;
    }
  });
};

// 选中执行价格回调
const selectedPrice = ref("");
const priceradioChange = ({ row }) => {
  console.log(row.number, "选中的价格编号");
  selectedPrice.value = row.number;
};

// 确认选中价格
const selectPrice = () => {
  householdData.executionprice = selectedPrice.value;
  showPrice.value = false;
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
</style>
