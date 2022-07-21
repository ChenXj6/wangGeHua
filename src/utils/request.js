import axios from 'axios';
import qs from 'qs'
import { stopRepeatRequest, allowRequest } from './util'

// 正在进行中的请求列表
const reqList = []
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';

const service = axios.create({
  baseURL: '',
  timeout:'',
});

service.interceptors.request.use(
  config => {
    if (import.meta.env.MODE === 'development') {
      config.baseURL = ''// process.env.VUE_APP_BASE_API
    } else {
      config.baseURL = ''
    }
    config.withCredentials = true
    // config.headers.post['Content-Type'] =
    //   'application/x-www-form-urlencoded; charset=UTF-8'
    // if (config.headers['Content-Type'] !== 'application/json;chartset=uft-8') {
    //   config.data = qs.stringify(config.data)
    // }
    
    if (sessionStorage.getItem("user")) {
      let userToken = JSON.parse(sessionStorage.getItem("user")).token;
      config.headers = {
        'Authorization': userToken,
        // 'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTkwMDAwMDEyNiIsImV4cCI6MTY1Nzg4MTc3MywidXNlciI6InVzZXIiLCJpYXQiOjE2NTc4NjczNzMsImp0aSI6Il5bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMC05YS1mXXs0fS1bMC05YS1mXXs0fS1bMC05YS1mXXsxMn0kIn0.RjZpgRnLz-q1STjUhtoa_1Lo5ldZxC4ACSqR0Mr0uYw',
        'Content-Type': 'application/json',
        'withCredentials': true,
        'changeOrigin': true,
        'operatorId':sessionStorage.getItem("operatorId"),
        'responseType': 'json'
      };
      config.timeout = 1000 * 60 * 10;
    }
    // 阻止重复请求。当上个请求未完成时，相同的请求不会进行（需要在请求中配置参数开启，默认不开启;isDebounce:true,开启）
    if (config.isDebounce) {
      stopRepeatRequest(reqList, config, cancel, `数据请求中，请勿重复操作！`)
    }
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    // 重复请求关闭后重复正常
    if (res.config.isDebounce) {
      setTimeout(() => {
        allowRequest(reqList, res.config)
      }, 500)
    }

    // 有些接口直接返回数组
    if (Array.isArray(res.data)) return res.data

    // 有些接口没有返回code
    if (Array.isArray(res.data.data)) return res.data
    // res.data = null
    // 请求成功，但是操作不成功时显示后端返回的错误信息
    if(res.data.code == '401'){
      ElMessage({
        message: res.data.message || res.data.mag,
        type: 'error'
      })
      sessionStorage.removeItem("user");
      sessionStorage.removeItem('operatorId')
      sessionStorage.removeItem('eventName')
      sessionStorage.removeItem('eventName')
      sessionStorage.removeItem('menulist')
      return
    }
    if (
      res.data.resCode &&
      res.data.resCode !== '000000' &&
      res.data.message !== '成功'
    ) {
      if ( res.data.code !== 1 ) {
        const msg =
          res.data.message || res.data.ElMessage || '获取数据失败，请稍后重试'
        ElMessage({
          message: msg,
          type: 'error'
        })
      }
    }
    return res.data
  },
  err => {
    if (err && err.response) {
      // console.log(err.response,';;;;')
      // 重复请求关闭后重复正常
      
      if (!!err.response.config.isDebounce) {
        setTimeout(() => {
          allowRequest(reqList, err.response.config)
        }, 500)
      }
      if (err.code === 'ECONNABORTED' || err.message ===   "Network Error" ||  err.message.includes("timeout")) {
        // 判断请求异常信息中是否含有超时timeout字符串
        err.Message = '网络超时!'
        return Promise.reject(err)
      }
      switch (err.response.status) {
        case 400:
          err.Message = '请求错误(400)'
          break
        case 401:
          err.Message = '未授权，请重新登录(401)'
          break
        case 403:
          err.Message = '拒绝访问(403)'
          break
        case 404:
          err.Message = '请求出错(404)'
          break
        case 408:
          err.Message = '请求超时(408)'
          break
        case 500:
          err.Message = '服务器错误(500)'
          break
        case 501:
          err.Message = '服务未实现(501)'
          break
        case 502:
          err.Message = '网络错误(502)'
          break
        case 503:
          err.Message = '服务不可用(503)'
          break
        case 504:
          err.Message = '网络超时(504)'
          break
        case 505:
          err.Message = 'HTTP版本不受支持(505)'
          break
        default:
          err.Message = `连接出错(${err.response.status})!`
      }
      // console.log(err.Message,'LLLL')
      ElMessage({
        message: err.Message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(err)
    } else if (axios.isCancel(err)) {
      ElMessage.closeAll()
      ElMessage({
        message: err.Message,
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(err)
    } else {
      err.Message = '连接服务器失败!'
      ElMessage({
        message: err.Message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(err)
    }    
  }
);

export default service;
