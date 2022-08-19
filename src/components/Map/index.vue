<template>
<el-autocomplete
  style="100%;width:100%;margin-bottom:10px"
  popper-class="autoAddressClass"
  v-model="form.address"
  :fetch-suggestions="querySearchAsync"
  :trigger-on-focus="false"
  placeholder="请输入搜索地址"
  @select="handleSelect"
  size="small"
  clearable>
  <template #default="{ item }">
    <i class="el-icon-search fl mgr10"></i>
    <span style="overflow:hidden;">
      <span class="title">{{ item.title }}</span>&nbsp;
      <span class="address ellipsis">{{ item.address }}</span>
    </span>
  </template>
</el-autocomplete>
<div id="container" style="width:100%;height:300px"></div>
</template>

<script>
import { defineComponent, ref,onMounted } from 'vue'

export default defineComponent({
  emits: ['getLatAndLng'],
  props:{
    lng:{
      type:String,
      default:() => ''
    },
    lat:{
      type:String,
      default:() => ''
    }
  },
  setup (props, { emit }) {
    const BMapGL = window.BMap
    var _map = ref(null)
    const form = ref({
      address:''
    })
    const lng = props.lng
    const lat = props.lat
    onMounted(() => {
      const map = new BMapGL.Map("container", { enableMapClick: false,minZoom:'8' });          // 创建地图实例 
      _map.value = map
      const point = new BMapGL.Point(lng ||117.11, lat ||36.653);  // 创建点坐标
      map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true)
      map.addEventListener('click', (e) => {
        emit('getLatAndLng',e.point)
      })
      if(!!lng && !!lat && !!_map.value){
        getLocation(lng,lat)
      }
    })
    const querySearchAsync = (str,cb) => {
      var local = new BMap.LocalSearch(_map.value,{
        onSearchComplete:function(res){
          var s = [];
          if (local.getStatus() == BMAP_STATUS_SUCCESS){
            for (var i = 0; i < res.getCurrentNumPois(); i ++){
              s.push(res.getPoi(i));
            }
            cb(s) //获取到数据时，通过回调函数cb返回到<el-autocomplete>组件中进行显示
          } else{
            cb(s)
          }
        }
      });
	    local.search(str);
    }
    const handleSelect = (item) => {
      form.value.address = item.address + item.title; //记录详细地址，含建筑物名
      _map.value.centerAndZoom(item.point,18) // 重新设置中心点
      _map.value.addOverlay(new BMapGL.Marker(item.point)) // 设置点
    }
    const getLocation = (lng,lat) => {
      // console.log(lng,lat)
      var marker = new BMapGL.Marker(new BMapGL.Point(lng, lat))
      _map.value.addOverlay(marker)
      const geoc = new BMapGL.Geocoder()
      geoc.getLocation({lng,lat},function(res){
        var addComp = res?.addressComponents;
        addComp && (form.value.address = `${addComp?.province}${addComp?.city}${addComp?.district}${addComp?.street}${addComp?.streetNumber}`)
      })
    }
    return {
      querySearchAsync,
      form,
      handleSelect,
    }
  }
})
</script>
<style scoped lang="scss">
.autoAddressClass{
  li {
    i.el-icon-search {margin-top:11px;}
    .mgr10 {margin-right: 10px;}
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .address {
      line-height: 1;
      font-size: 12px;
      color: #b4b4b4;
      margin-bottom: 5px;
    }
  }
}
</style>