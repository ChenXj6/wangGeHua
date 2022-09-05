<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">今年税收总额</span>
      </template>
      <div class="itemBox">
        <div class="item_top">
          <span class="fontWeight">100</span>&nbsp;万元
        </div>
        <div class="item_bottom">
          <div class="item_bottom_left fontItemColor">
            <!-- <el-icon style="font-size: 35px;"><UserFilled color="#79bbff"/></el-icon> -->
            <div class="flexItem">
              <span>任务数</span>
              <span>10000</span>
            </div>
          </div>
          <span style="width:2px;height:50%;background:#529b2e"></span>
          <div class="item_bottom_right fontItemColor">
            <!-- <el-icon style="font-size: 35px;"><Avatar color="#f89898"/></el-icon> -->
            <div class="flexItem">
              <span>任务完成率</span>
              <span>90%</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>

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
.fontWeight{
  font-weight: 700;
  font-size: 28px;
}
.fontTitle{
  font-weight: 700;
  color:#73767a ;
}
.itemBox{
  height: 100%;
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
}
.item_bottom_right,.item_bottom_left{
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
}
.flexItem{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.fontItemColor{
  color:#E6A23C ;
}
</style>
