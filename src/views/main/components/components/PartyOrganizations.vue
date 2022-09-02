<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">党组织数量</span>
      </template>
      <div class="itemBox">
        <div class="item_top">
          <span class="fontWeight">100</span>&nbsp;个
        </div>
        <div class="item_bottom">
          <el-table :data="tableData" size="mini" disabled border max-height="48" style="width: 100%">
            <el-table-column prop="date" label="党工委" align="center"/>
            <el-table-column prop="name" label="直属党组织" width="100" align="center"/>
            <el-table-column prop="address" label="党支部" width="70" align="center"/>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "@vue/runtime-core";

const tableData = ref([
  {date:'1',name:'2',address:'3'}
])
</script>
<style scoped>
.partymembersBox{
  /* width: 100px; */
  /* height: 200px; */
  height: 120px;
  margin-bottom: 10px;
  font-size: 14px;
}
.box-card{
  height: 100%;
}
:deep().el-card .el-card__header,:deep().el-card .el-card__body {
  padding: 5px 10px !important;
}
:deep().el-card .el-card__body{
  height: 80px;
}
:deep().el-table .el-table__cell{
  padding: 0 !important;
}
:deep().el-table__empty-block{
  max-height: 30px;
}
.fontWeight{
  font-weight: 700;
  font-size: 28px;
}
.fontTitle{
  font-weight: 700;
  color:#73767a ;
}
.itemBox{
  height: 110%;
  display: flex;
  flex-direction: column;
}
.item_top{
  height: 35%;
  font-size: 18px;
  color: #529b2e;
  text-align: center;
}
.item_bottom{
  height: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  pointer-events: none;
}
</style>
