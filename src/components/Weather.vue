<template>
  {{ city }}
  {{ temp }}{{ temp ? '°C' : '' }}
  <i :class="`qi-${icon}`" style="color:#fff"></i>
  {{ text }}
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from '@vue/runtime-core'
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
    const getLocation = () => {
      const geoLocation = new BMapGL.Geolocation()
      geoLocation.getCurrentPosition( async (position) => {
        // console.log(position,'....')
        city.value = position.address?.city || '北京'
        lat.value = position.point.lat.toFixed(2)
        lon.value = position.point.lng.toFixed(2)
        let weatherData = await getWeather(lon.value,lat.value)
        // console.log(weather)
        const { icon,temp,text,windDir } = weatherData
        weather.icon = icon 
        weather.temp = temp 
        weather.text = text 
        weather.windDir = windDir 
      })
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