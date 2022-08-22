<template>
  {{ city }}
  {{ temp }}{{ temp ? '°C' : '' }}
  <i :class="`qi-${icon}`" style="color:#fff"></i>
  {{ text }}
</template>
<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref, toRefs } from '@vue/runtime-core'
import { weatherApi } from '@/api/weather'
export default {
  setup() {
    const city = ref()
    const lat = ref('')
    const lon = ref('')
    const weather = reactive({
      icon:'',
      temp:'',
      text:'',
      windDir:'',
    })
    const { proxy } = getCurrentInstance()
    const BMapGL = window.BMap
    
    const getLocation = async  () => {
      // navigator.geolocation.getCurrentPosition(async (a)=>{
      //   console.log(a,'....')
      // },(b)=>{
      //   console.log(b,'11111')
      // },{
      //   enableHighAccuracy: false, //布尔值，表示系统是否使用最高精度来表示结果，注意，这会导致较慢的响应时间或者增加电量消耗（比如对于支持gps的移动设备来说）。如果值为false ，设备会通过更快响应以及/或者使用更少的电量等方法来尽可能的节约资源。默认值fasle
      //   timeout: 30000, //它表明的是设备必须在多长时间（单位毫秒）内返回一个位置。默认直到获取到位置才会返回值。
      //   maximumAge: 50000 , //表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。默认0
      // })
      // return
      // const geoLocation = new BMapGL.Geolocation()
      // geoLocation.getCurrentPosition( async (position) => {
      //   console.log(position,'....')
      //   city.value = position.address?.city || '北京'
      //   lat.value = position.point.lat.toFixed(2)
      //   lon.value = position.point.lng.toFixed(2)
      //   let weatherData = await getWeather(lon.value,lat.value)
      // // console.log(weather)
      //   const { icon,temp,text,windDir } = weatherData
      //   weather.icon = icon 
      //   weather.temp = temp 
      //   weather.text = text 
      //   weather.windDir = windDir 
      // })
      city.value = '济南市'
      lat.value = '36.65' 
      lon.value = '117.12'
      let weatherData = await getWeather(lon.value,lat.value)
      // console.log(weather)
      const { icon,temp,text,windDir } = weatherData
      weather.icon = icon 
      weather.temp = temp 
      weather.text = text 
      weather.windDir = windDir 
      
    }
    const getWeather = (lng,lat) => {
      return new Promise((resolve,reject)=>{
        weatherApi({lng,lat}).then(res=>{
          if(res.code == 200){
            resolve(res.now)
          }else{
            reject('请求天气错误')
          }
        })
      })
    }
    onMounted(()=>{
      
    })
    onBeforeMount(()=>{
      getLocation()
    })
    return{
      city,
      ...toRefs(weather)
    }
  },
}
</script>
<style scoped>

</style>