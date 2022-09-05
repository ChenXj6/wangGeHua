<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">先进党员人数</span>
      </template>
      <div class="itemBox">
        <div class="item_top">
          <span class="fontWeight">40</span>&nbsp;人
        </div>
        <div class="item_bottom">
          <div class="item_bottom_left ">
            <el-icon style="font-size: 35px;"><UserFilled color="#79bbff"/></el-icon>
            <div class="flexItem">
              <span>60%</span>
              <span>男性党员</span>
            </div>
          </div>
          <div class="item_bottom_right ">
            <el-icon style="font-size: 35px;"><Avatar color="#f89898"/></el-icon>
            <div class="flexItem">
              <span>40%</span>
              <span>女性党员</span>
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
  align-content: center;
}
</style>
