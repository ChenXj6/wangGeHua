<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">本年项目统计</span>
      </template>
      <div class="itemBox">
        <div class="item_bottom">
          <div class="item_bottom_left fontItemColor">
            <div class="flexItem">
              <span class="titleColor">数量</span>
              <span>8570个</span>
            </div>
          </div>
          <span style="width:2px;height:50%;background:#529b2e"></span>
          <div class="item_bottom_right fontItemColor">
            <div class="flexItem">
              <span class="titleColor">金额</span>
              <span>122.4万元</span>
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
.item_bottom{
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item_bottom_right,.item_bottom_left{
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
}
.flexItem{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.fontItemColor{
  color:#E6A23C ;
}
.titleColor{
  color: #79bbff;
  font-weight: 700;
}
</style>
