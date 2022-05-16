import moment from 'moment'
import qs from 'qs'
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router';



const showMessage = Symbol('showMessage') // 为了实现Class的私有属性
/**
 * 通用方法集合
 */

// 把一个对象里面的变量赋值给有相同变量的对象
 export const listAssign = (objA, objB) => Object.keys(objA).forEach((key) => { objA[key] = objB[key] || objA[key]})
// 把一个对象回复成为没有值的初始状态
export const defaultObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    let type =  Object.prototype.toString.call(obj[key])
    switch(type){
      case type = "[object String]":
        obj[key] = ''
      break;
      case type = "[object Number]":
        obj[key] = 0
      break;
      case type = "[object Array]":
        obj[key] = []
      break;
      case type = "[object Object]":
        obj[key] = {}
      break;
      case type = "[object Boolean]":
        obj[key] = true
      break;
      default:
        obj[key] = ''
      break;
    }
  })
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timer
  return function() {
    const context = this
    const args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply
      }, wait)
    }
  }
}

/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
export function deepClone(parent) {
  // 维护两个储存循环引用的数组
  const parents = []
  const children = []

  const _clone = parent => {
    if (parent === null) return null
    if (typeof parent !== 'object') return parent

    let child, proto

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = []
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent))
      if (parent.lastIndex) child.lastIndex = parent.lastIndex
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime())
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent)
      // 利用Object.create切断原型链
      child = Object.create(proto)
    }

    // 处理循环引用
    const index = parents.indexOf(parent)

    if (index !== -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index]
    }
    parents.push(parent)
    children.push(child)

    for (const i in parent) {
      // 递归
      child[i] = _clone(parent[i])
    }

    return child
  }
  return _clone(parent)
}

const isType = (obj, type) => {
  if (typeof obj !== 'object') return false
  // 判断数据类型的经典方法：
  const typeString = Object.prototype.toString.call(obj)
  let flag
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]'
      break
    case 'Date':
      flag = typeString === '[object Date]'
      break
    case 'RegExp':
      flag = typeString === '[object RegExp]'
      break
    default:
      flag = false
  }
  return flag
}

const jsUrls = [
  '/stimulsoft/stimulsoft.reports.js',
  '/stimulsoft/stimulsoft.viewer.js',
  '/stimulsoft/stimulsoft.designer.js'
]

export async function loadStimulsoftScript() {
  for (const url of jsUrls) {
    await loadScript(url)
  }
}

// 加载js
export function loadScript(url) {
  return new Promise((re, rj) => {
    if (document.getElementById(url)) return re()
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = 'async'
    script.src = url
    script.id = url
    document.body.appendChild(script)
    if (script.readyState) {
      // IE
      script.onreadystatechange = function() {
        if (script.readyState === 'complete' || script.readyState === 'loaded') {
          script.onreadystatechange = null
          re()
        } else {
          rj()
        }
      }
    } else {
      // 非IE
      script.onload = function() {
        re()
      }
      script.onerror = function() {
        rj()
      }
    }
  })
}

export function formatterDate(date, rule) {
  if (date) {
    return moment(date).format(rule || 'YYYY-MM-DD HH:mm:ss')
  }
  return ''
}

/**
 * 按照优先级合并对象
 * @param {object} Object - 对象按照优先级大小升序排列
 */
export const mergeObjectsByPriority = (...args) => {
  const baseObj = [args[0]]
  const objList = args.reverse().map(item => item || {})
  const allKeysObj = baseObj.reduce((acc, cur) => ({ ...acc, ...cur }), {})
  return Object.keys(allKeysObj).reduce((acc, cur) => {
    acc[cur] = (objList.find(el => el[cur] !== undefined) || {})[cur]
    return acc
  }, {})
}

// 根据对象是否存在合并对象
export const mergeObjectsByExist = (...args) => {
  const baseObj = [args[0]]
  const objList = args.reverse().map(item => item || {})
  const allKeysObj = baseObj.reduce((acc, cur) => ({ ...acc, ...cur }), {})
  return Object.keys(allKeysObj).reduce((acc, cur) => {
    const existObj = objList.find(el => !!el[cur])
    acc[cur] = existObj ? existObj[cur] : baseObj[0][cur]
    return acc
  }, {})
}

// 清空data数据；
export const clearData = (...args) => {
  const list = args.slice()
  if (list.length) {
    list.forEach(item => {
      if (
        Object.prototype.toString.call(item) === '[object String]' ||
        Object.prototype.toString.call(item) === '[object Number]'
      ) {
        item = ''
      }
      if (Object.prototype.toString.call(item) === '[object Array]') {
        item.splice(0)
      }
      if (Object.prototype.toString.call(item) === '[object Boolean]') {
        item = false
      }
      if (Object.prototype.toString.call(item) === '[object Null]') {
        item = null
      }
      if (Object.prototype.toString.call(item) === '[object Object]') {
        if (Object.keys(item).length) {
          for (const i in item) {
            if (
              Object.prototype.toString.call(item[i]) === '[object String]' ||
              Object.prototype.toString.call(item[i]) === '[object Number]'
            ) {
              item[i] = ''
            }
            if (Object.prototype.toString.call(item[i]) === '[object Array]') {
              item[i].splice(0)
            }
            if (Object.prototype.toString.call(item) === '[object Boolean]') {
              item[i] = false
            }
            if (Object.prototype.toString.call(item) === '[object Null]') {
              item[i] = null
            }
            if (Object.prototype.toString.call(item) === '[object Object]') {
              clearData(item[i])
            }
          }
        } else {
          item = {}
        }
      }
    })
  }
}

// 根据重量单位 返回基数
export const getWeightUnit = unit => {
  let value = 0
  switch (unit) {
    case '035':
      value = 1
      break
    case '070':
      value = 1000
      break
    case '075':
      value = 0.5
      break
    case '076':
      value = 1
      break
    case '0.4536':
      value = 1
      break
    case '080':
      value = 0.05
      break
    case '083':
      value = 0.0283495
      break
    // case '080':
    //   value = 0.0002
    //   break
    default:
      value = 0
  }
  return value
}

/**
 * @param { number } arg1
 * @param { number } arg2
 */
export function add(arg1, arg2) {
  let r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

const swapItem = function(arr, fromIndex, toIndex) {
  arr[toIndex] = arr.splice(fromIndex, 1, arr[toIndex])[0]
  return arr
}

// 上移
// index: 当前元素索引
export const moveUpItem = function(arr, index) {
  if (index === 0) {
    return
  }
  swapItem(arr, index, index - 1)
}

// 下移
export var moveDownItem = function(arr, index) {
  if (index === arr.length - 1) {
    return
  }
  swapItem(arr, index, index + 1)
}

// 汉字及汉字符号占两位字符
export function fucCheckLength(strTemp) {
  if (!strTemp) return 0
  let i, sum
  sum = 0
  for (i = 0; i < strTemp.length; i++) {
    if (strTemp.charCodeAt(i) >= 0 && strTemp.charCodeAt(i) <= 255) {
      sum = sum + 1
    } else {
      sum = sum + 2
    }
  }
  return sum
}

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {object} config - 当前请求信息
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
export const stopRepeatRequest = function(reqList, config, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  let { data, url } = { ...config }
  data = qs.stringify(data)
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i].url === url && data === reqList[i].data) {
      // 请求地址是否相同,请求数据是否相同
      // console.log(url);
      cancel(errorMsg)
      return
    }
  }
  reqList.push({
    data: data,
    url: url
  })
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {object} config 请求信息
 */
export const allowRequest = function(reqList, config) {
  let { data, url, headers } = { ...config }
  if (
    headers['Content-Type'] &&
    (headers['Content-Type'] === 'application/json' || headers['Content-Type'] === 'application/json;chartset=uft-8') &&
    data
  ) {
    data = JSON.parse(data)
  }
  data = qs.stringify(data)
  for (let i = 0; i < reqList.length; i++) {
    if (url.includes(reqList[i].url) && data === reqList[i].data) {
      // 请求地址是否相同,请求数据是否相同
      reqList.splice(i, 1)
      break
    }
  }
}

export function downLoadFile(res, fileName, type) {
  const blob = new Blob([res], { type: type })
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = window.URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    window.URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

export function downloadUrlFile(downloadUrl, fileName, type) {
  const url = downloadUrl.replace(/\\/g, '/')
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 获取文件blob数据并保存
      console.log(xhr)
      downLoadFile(xhr.response, fileName, xhr.response.data.type)
    }
  }
  xhr.send()
}

// 获取当前时间，此处按yyyyMMddhhmmss + 6位随机数 的格式进行格式化
export const fileNameFormat = time => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  // 随机6位数
  const Atanisi = Math.floor(Math.random() * 999999)
  // 拼接
  return `${year}${month}${day}${hours}${minutes}${seconds}${Atanisi}`
}

// 获取当前时间，此处按yyyyMMddhhmmss + 6位随机数 的格式进行格式化
export const getNowDateFormat = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  // 拼接
  return `${year}-${month}-${day} ${hours}: ${minutes}: ${seconds}`
}

// 获取当前时间数组，用于日期控件默认日期
export function getNowPickDate(d = 1) {
  const nowTime = new Date()
  const time = new Date().getTime() - d * 24 * 60 * 60 * 1000
  const tragetTime = new Date(time)
  const startDate = [nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate()].concat(['23', '59', '59'])
  const endDate = [tragetTime.getFullYear(), tragetTime.getMonth(), tragetTime.getDate()].concat(['00', '00', '00'])
  return {
    startDate,
    endDate
  }
}

// 时间格式化函数，此处仅针对yyyy-MM-dd 的格式进行格式化
export const dateFormatYMD = time => {
  var date = new Date(time)
  var year = date.getFullYear()
  /* 在日期格式中，月份是从0开始的，因此要加1
   * 使用三元表达式在小于10的前面加0，以达到格式统一
   * */
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  // 拼接
  return year + '-' + month + '-' + day
}

const setArr = list => `/${list.join('/')}`
const Array2Obj = arr => {
  const obj = {}
  arr.forEach(route => {
    if (typeof route !== 'string') {
      return
    }
    const pages = route.substr(1).split('/')
    const father = pages.splice(0, 1)

    if (pages.length) {
      if (obj[father]) {
        obj[father].push(setArr(pages))
      } else {
        obj[father] = [setArr(pages)]
      }
    } else {
      if (obj[father]) {
        obj[father].push('')
      } else {
        obj[father] = []
      }
    }
  })
  Object.keys(obj).forEach(key => {
    obj[key] = Array2Obj(obj[key])
  })
  return obj
}

export const getPaths = (arr, baseUrl) => {
  const arrs = []
  function operation(arr, baseUrl) {
    if (!baseUrl) baseUrl = ''
    arr.forEach(item => {
      baseUrl += item.path
      if (item.children) {
        operation(item.children, baseUrl)
      } else {
        arrs.push(baseUrl)
        baseUrl = ''
      }
    })
  }
  operation(arr, baseUrl)
  return arrs
}
/**
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
export class DonMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }
  [showMessage](type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        ElMessage[type](options)
      }
    } else {
      ElMessage[type](options) // 可以无限弹窗
    }
  }
}

// 节流
export const debounceSecond = function(fn, delay) {
  let timer
  return function() {
    const context = this
    const args = arguments // 存一下传入的参数
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

export const deepCompare = function(x, y) {
  var i, l, leftChain, rightChain

  function compare2Objects(x, y) {
    var p

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString()
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false
    }

    if (x.constructor !== y.constructor) {
      return false
    }

    if (x.prototype !== y.prototype) {
      return false
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false
      } else if (typeof y[p] !== typeof x[p]) {
        return false
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false
      } else if (typeof y[p] !== typeof x[p]) {
        return false
      }

      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x)
          rightChain.push(y)

          if (!compare2Objects(x[p], y[p])) {
            return false
          }

          leftChain.pop()
          rightChain.pop()
          break

        default:
          if (x[p] !== y[p]) {
            return false
          }
          break
      }
    }

    return true
  }

  if (arguments.length < 1) {
    return true // Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = [] // Todo: this can be cached
    rightChain = []

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false
    }
  }

  return true
}

// 不强制保留五位小数
export const keepFlexFiveDecimals = num => {
  if (num == null || num == undefined) return ''
  return Number(String(num).replace(/^(.*\..{5}).*$/, '$1'))
}

// 解决两数相加精度丢失
export const addTwoNum = (arg1, arg2) => {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

// 处理粘贴板数据
export const formatterClipboardData = data => {
  if (!data) return ''
  const rowArr =
    data.indexOf(String.fromCharCode(10)) > -1
      ? data.split(String.fromCharCode(10))
      : data.split(String.fromCharCode(13))
  // 根据\t解析单元格s
  const cellArr = rowArr
    .filter(function(item) {
      // 兼容Excel行末\n，防止粘贴出多余空行
      return item !== ''
    })
    .map(function(item) {
      return item
        .split(String.fromCharCode(9))
        .map(i => i.replace(String.fromCharCode(44), '').replace(String.fromCharCode(13), ''))
    })
  return cellArr
}
// 处理 http https 协议
export const formatterUrl = url => {
  const arr = url.split('://')
  if (arr.length == 1) return url
  arr[0] = location.protocol
  return arr.join('//')
}

// 根据对象是否存在合并对象
export const mergeObjectsByDefault = (baseObj, mergeObj) => {
  const obj = deepClone(baseObj)
  Object.keys(mergeObj).forEach(cur => {
    if (!obj[cur]) {
      obj[cur] = mergeObj[cur]
    }
  })
  return obj
}
