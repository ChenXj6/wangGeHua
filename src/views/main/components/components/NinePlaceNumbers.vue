<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">九小场所数量</span>
      </template>
      <div class="itemBox">
        <div class="item_left">
          <el-icon style="font-size: 50px;"><OfficeBuilding color="#67C23A"/></el-icon>
        </div>
        <div class="item_right">
          <span class="fontWeight">100</span>&nbsp;个
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
  justify-content: flex-start;
  align-items: center;
}
.item_left{
  margin-left: 10px;
}
.item_right{
  margin-left: 20px;
  color: #909399;
}
</style>
