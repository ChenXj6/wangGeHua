<template>
  <div class="coclpit-content">
    <el-row :gutter="10"
            class="itemBox1">
      <el-col :span="3"
              v-for="item in billboardList"
              :key="item.id">
        <div class="item">
          <p class="itemTitle">{{ item.title }}</p>
          <p class="itemNum">{{ item.num }}<span class="itemUnit">{{ item.unit }}</span></p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10"
            class="itemBox2">
      <el-col :span="3"
              v-for="item in personnelDetails"
              :key="item.id">
        <div class="item">
          <p class="itemNum">{{ item.num }}<span class="itemUnit">{{ item.unit }}</span></p>
          <p class="itemTitle">{{ item.title }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main1"
               ref="main1"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main2"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main3"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main4"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main5"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main6"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main7"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="main8"
               style="width: 100%;height:200px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    // 驾驶舱看板
    const billboardList = ref([
      { id: 1, title: '街道', num: 2, unit: '个' },
      { id: 2, title: '基础网格', num: 80, unit: '个' },
      { id: 3, title: '专属网格', num: 16, unit: '个' },
      { id: 4, title: '常住户', num: 28802, unit: '户' },
      { id: 5, title: '社区', num: 11, unit: '个' },
      { id: 6, title: '单位', num: 695, unit: '个' },
      { id: 7, title: '楼栋', num: 658, unit: '个' },
      { id: 8, title: '重点服务人员', num: 3871, unit: '个' },
    ])
    const personnelDetails = ref([
      { id: 1, title: '网格书记', num: 49, unit: '名' },
      { id: 2, title: '网格长', num: 29, unit: '名' },
      { id: 3, title: '网格员', num: 114, unit: '名' },
      { id: 4, title: '帮包服务队', num: 70, unit: '个' },
      { id: 5, title: '事件处置', num: 4488, unit: '件' },
      { id: 6, title: '12345工单', num: 6091, unit: '件' },
      { id: 7, title: '雪亮工程监控', num: 594, unit: '路' },
      { id: 8, title: '重点监控管理人员', num: 162, unit: '人' },
    ])
    const myChart1 = ref(null)
    const myChart2 = ref(null)
    const myChart3 = ref(null)
    const myChart4 = ref(null)
    const myChart5 = ref(null)
    const myChart6 = ref(null)
    const myChart7 = ref(null)
    const myChart8 = ref(null)
    const drawEcharts = () => {
      myChart1.value = proxy.$echart.init(document.getElementById('main1'))
      myChart2.value = proxy.$echart.init(document.getElementById('main2'))
      myChart3.value = proxy.$echart.init(document.getElementById('main3'))
      myChart4.value = proxy.$echart.init(document.getElementById('main4'))
      myChart5.value = proxy.$echart.init(document.getElementById('main5'))
      myChart6.value = proxy.$echart.init(document.getElementById('main6'))
      myChart7.value = proxy.$echart.init(document.getElementById('main7'))
      myChart8.value = proxy.$echart.init(document.getElementById('main8'))
      // 绘制图表
      myChart1.value.setOption({
        title: {
          text: '网格人员力量类型统计'
        },
        tooltip: {},
        xAxis: {
          data: ['网格书记', '网格长', '网格员', '帮包服务队']
        },
        yAxis: {},
        series: [
          {
            name: '人数以及人员类型',
            type: 'bar',
            data: [49, 26, 114, 70]
          }
        ]
      });
      // 饼图
      myChart2.value.setOption({
        title: {
          text: '网格人员类型占比统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'bottom'
        },
        series: [
          {
            name: '人员占比',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 49, name: '网格书记' },
              { value: 26, name: '网格长' },
              { value: 114, name: '网格员' },
              { value: 70, name: '帮包服务队' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      // 绘制图表
      myChart3.value.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        calculable: true,
        legend: {
          data: ['总数量', '已完成'],
          itemGap: 5
        },
        grid: {
          top: '12%',
          left: '1%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['网格书记', '网格长', '网格员', '帮包服务队']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
            axisLabel: {
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? proxy.$echart.format.addCommas(+a / 1000) : '';
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 94,
            end: 100
          },
          {
            type: 'inside',
            start: 94,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: [
          {
            name: 'Budget 2011',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          },
          {
            name: 'Budget 2012',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          }
        ]
      });
      // 绘制图表
      myChart4.value.setOption({
        // title: {
        //   text: '事项处置效率排名',
        //   subtext:'完成数/总数',
        // },
        tooltip: {},
        xAxis: {
          data: ['东区社区', '西区社区', '南区社区', '北区社区', '泉星社区', '绿地社区']
        },
        legend: [
          {
            name: '总数量',
          },
          {
            name: '效率',
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
          },
          {
            type: 'value',
            name: '处理效率',
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [49, 26, 114, 70, 20, 30]
          },
          {
            name: '效率',
            type: 'line',
            data: [10, 20, 40, 65, 50, 86]
          }
        ]
      });
      // 饼图
      myChart5.value.setOption({
        title: {
          text: '事项处置完成率统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'bottom'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 835, name: '西区社区' },
              { value: 794, name: '南区社区' },
              { value: 781, name: '北区社区' },
              { value: 764, name: '绿地社区' },
              { value: 710, name: '东区社区' },
              { value: 619, name: '泉星社区' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      // 绘制图表
      myChart6.value.setOption({
        // title: {
        //   text: '事项处置效率排名',
        //   subtext:'完成数/总数',
        // },
        tooltip: {},
        xAxis: {
          data: ['东区社区', '西区社区', '南区社区', '北区社区', '泉星社区', '绿地社区'],
          min: 0,
        },
        legend: [
          {
            name: '总数量',
          },
          {
            name: '已完成',
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [2, 18, 8, 3, 0, 0]
          },
          {
            name: '已完成',
            type: 'bar',
            data: [0, 18, 5, 0, 0, 0]
          }
        ]
      });
      // 绘制图表
      myChart7.value.setOption({
        title: {
          text: '事项处置效率排名',
          // subtext:'完成数/总数',
        },
        tooltip: {},
        xAxis: {
          data: ['工人南村街道'],
          min: 0,
        },
        // legend: [
        //   {
        //     name:'总数量',
        //   },
        //   {
        //     name:'已完成',
        //   },
        // ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
          },
          {
            type: 'value',
            name: '处置效率',
            min: 0,
            max: 100,
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [2, 18, 8, 3, 0, 0]
          },
          {
            name: '已完成',
            type: 'bar',
            data: [0, 18, 5, 0, 0, 0]
          },
          {
            name: '处理效率',
            type: 'line',
            data: [0, 18, 5, 0, 0, 0]
          }
        ]
      });
      // 饼图
      myChart8.value.setOption({
        title: {
          text: '南村街道12345热线办理比例分析图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            label: {
              normal: {
                show: true,
                formatter: '{b}: {c}件({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
              }
            },
            data: [
              { value: 2138, name: '城乡建设' },
              { value: 420, name: '社会事业' },
              { value: 2812, name: '城市综合' },
              { value: 39, name: '三农问题' },
              { value: 179, name: '人力资源保障' },
              { value: 139, name: '经济综合' },
              { value: 32, name: '其他' },
              { value: 501, name: '疫情防控' },
              { value: 0, name: '城市更新' },
              { value: 13, name: '自然资源' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
    onMounted(() => {
      drawEcharts()
    })
    return {
      billboardList, personnelDetails,
    }
  },
}
</script>
<style scoped>
.coclpit {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: absolute;
  bottom: 60px;
  left: 0;
  /* transform: translate(-50%, -50%); */
  background: rgba(36, 47, 66, 0.7);
  z-index: 9999;
  padding: 60px 50px 50px;
  border-radius: 10px;
}
.item {
  width: 100%;
  padding: 5px 10px 10px;
  box-sizing: border-box;
  /* height: 60px; */
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 14px;
}
.item > p,
.item > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.itemNum {
  font-size: 36px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.itemUnit {
  margin-top: 10px;
  font-size: 14px;
  float: right;
}
.itemBox1,
.itemBox2 {
  height: 80px !important;
}
.itemBox2 {
  text-align: center;
}
.coclpit-content {
  overflow: scroll;
  /* min-height: 500px; */
  /* max-height: 700px; */
}
.coclpit-content > div {
  margin: 10px 0;
}
</style>