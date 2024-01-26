<template>
  <div class="user_management">
    <div class="user_management_table">
      <el-card class="box-card">
        <vxe-toolbar ref="toolbarRef" export print custom>
          <template #buttons>
            <el-button @click="addTopLevel()" type="primary" plain
              >新增顶级</el-button
            >
            <el-button @click="insertEvent" type="primary" plain
              >批量子级</el-button
            >
            <el-button type="danger" plain>批量删除</el-button>
          </template>
        </vxe-toolbar>
        <div style="height: calc(100vh - 210px)">
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
            <vxe-column
              field="username"
              title="账号"
              width="110"
              fixed="left"
            />
            <vxe-column
              field="password"
              title="账号"
              width="110"
              fixed="left"
            />
            <vxe-column
              field="recentLogin"
              title="最近登陆时间"
              width="140"
              sortable
            />
          </vxe-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.user_management {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .user_management_table {
    width: 98%;
    margin-top: 16px;
  }
}
</style>
