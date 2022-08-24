/**
 * @desc 基于ElementUI Form rules 进行使用, 参考官方文档: http://element-cn.eleme.io/#/zh-CN/component/form
 */
 export default {
  /**
   * 校验 包括中文字、英文字母、数字和下划线
   * 登录账号校验
   */
  validateAccount(rule, value, callback) {
    const acount = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    if (value && !acount.test(value)) {
      callback(new Error('账号不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * IP地址校验
   */
  ipAddress(rule, value, callback) {
    if (value && value === '...') {
      callback(new Error('请输入IP地址'))
    }
    if (
      value &&
      !/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(value)
    ) {
      callback(new Error('IP地址不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 手机号码校验
   */
  phoneNumber(rule, value, callback) {
    if (
      value &&
      (!/^[1][34578]\d{9}$/.test(value) ||
        !/^[1-9]\d*$/.test(value) ||
        value.length !== 11)
    ) {
      callback(new Error('手机号码不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 电话号码校验
   */
  telephoneNumber(rule, value, callback) {
    if (value && !/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)) {
      callback(new Error('电话号码不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 邮箱校验
   */
  emailValue(rule, value, callback) {
    const temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
    const tempOne = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
    if (value && !temp.test(value)) {
      callback(new Error('邮箱格式不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 身份证号码校验
   */
  idCard(rule, value, callback) {
    if (
      value &&
      (!/\d{17}[\d|x]|\d{15}/.test(value) ||
        (value.length !== 15 && value.length !== 18))
    ) {
      callback(new Error('身份证号码不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 车牌号校验
   */
   isLicenseNo(rule, value, callback) {
    if (
      value &&
      (!/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(value))
    ) {
      callback(new Error('请输入正确格式的车牌号'))
    } else {
      callback()
    }
    return ;
  },


  /**
   * 正整数校验
   */
  integerP(rule, value, callback) {
    if (value && !/^[0-9]\d*$/.test(value)) {
      callback(new Error('只能填写正整数'))
    } else {
      callback()
    }
  },

  /**
   * 负整数校验
   */
  integerN(rule, value, callback) {
    if (value && !/^-[1-9]\d*$/.test(value)) {
      callback(new Error('只能填写负整数'))
    } else {
      callback()
    }
  },

  /**
   * 英文字符校验
   */
  enText(rule, value, callback) {
    // let a = '',
    //   arr = value.split(" ")
    // for (let i = 0; i < arr.length; i++) { //删除行内空格
    //   a += arr[i];
    // }
    if (value && !/^[A-Za-z]+$/.test(value)) {
      callback(new Error('只能填写英文字符'))
    } else {
      callback()
    }
  },
  /**
   * 中文字符英文字符校验
   */
  ChEnText(rule, value, callback) {
    if (value && !/^[A-Za-z0-9]+$/.test(value)) {
      callback(new Error('只能填写数字和英文字符'))
    } else {
      callback()
    }
  },
  /**
   * 中文字符校验
   */
  cnText(rule, value, callback) {
    // let a = '',
    //   arr = value.split(" ")
    // for (let i = 0; i < arr.length; i++) { //删除行内空格
    //   a += arr[i];
    // }
    if (value && /[^\u4e00-\u9fa5]/.test(value)) {
      callback(new Error('只能填写中文字符'))
    } else {
      callback()
    }
  },
  /**
   * 只能输入英文或者数字
   */
  enOrnunText(rule, value, callback) {
    if (!/^[0-9A-Za-z*_]+$/.test(value)) {
      callback(new Error('最多输入32位数字、字母、*与_'))
    } else {
      callback()
    }
  },
  // 只能输入数字
  onlyNumber(rule, value, callback) {
    if (!value) return callback()
    if (!/^\d{1,}$/.test(value)) {
      callback(new Error('只能填写数字'))
    } else {
      callback()
    }
  },
  /**
   * 只能在输入英文字符和数字，包括空格
   */
  enTextAll(rule, value, callback) {
    if (value && !/^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|\s]+$/.test(value)) {
      callback(new Error('只能输入英文字符和数字,空格'))
    } else {
      callback()
    }
  },
  /**
   * 20位数字国标编码校验，且为正整数
   */
  validateDeviceNo(rule, value, callback) {
    if (value && !/^[1-9]\d*$/.test(value)) {
      callback(new Error('只能填写正整数'))
    } else {
      if (!/^[0-9]{20}$/.test(value)) {
        callback(new Error('请输入20位数字的编码！'))
      } else {
        callback()
      }
    }
  },
  /**
   *校验电脑Mac地址
   *以xx-xx-xx-xx-xx-xx的形式输入（xx为16进制数字）
   */
  validateMac(rule, value, callback) {
    const temp = /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/
    if (!temp.test(value)) {
      callback(new Error('请输入xx-xx-xx-xx-xx-xx形式的MAC地址！'))
    } else {
      callback()
    }
  },
  /**
   * 校验地址代码或者分组代码
   */
  validateCode(rule, value, callback) {
    const num = /^[1-9]\d*$/
    if (value && !num.test(value)) {
      callback(new Error('只能填写正整数'))
    } else {
      const codeLen = value.toString().length
      console.log(codeLen)
      if (codeLen > 0 && codeLen % 3 !== 0) {
        callback(new Error('输入的长度必须是3的倍数'))
      } else if (codeLen > 18) {
        callback(new Error('输入的长度不能超过18位,请重新输入'))
      } else {
        callback()
      }
    }
  },

  /**
   * 校验字符长度
   */
  validateLength(rule, value, callback) {
    const codeLen = value.toString().length
    if (codeLen > 18) {
      callback(new Error('输入的长度不能超过20位,请重新输入'))
    }
  },

  /**
   * 数字 ,两位
   */
  validateTwoNum(rule, value, callback) {
    const temp = /^[1-9]{2}$/
    if (!temp.test(value)) {
      callback(new Error('请输入两位正整数！'))
    } else {
      callback()
    }
  },

  /**
   * 校验经度是否符合规范
   *
   */
  checkLongitude(rule, value, callback) {
    const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
    if (!longrg.test(value)) {
      callback(new Error('经度整数部分为0-180,小数部分为0到6位!'))
    } else {
      callback()
    }
  },

  /**
   * 校验纬度是否符合规范
   *
   */
  checkLatitude(rule, value, callback) {
    var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
    if (!latreg.test(value)) {
      callback(new Error('纬度整数部分为0-90,小数部分为0到6位!'))
    } else {
      callback()
    }
  },

  /**
   * 至多两位小数校验
   */
  checkTwoPoint(rule, value, callback) {
    const reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
    if (!reg.test(value)) {
      callback(new Error('最多只能有两位小数'))
    } else {
      callback()
    }
  },

  /**
   * 0-100数字校验
   */
  checkZeroToHundred(rule, value, callback) {
    const reg = /^(?:0|[1-9][0-9]?|100)$/
    if (!reg.test(value)) {
      callback(new Error('请输入正整数，范围值为【0,100】'))
    } else {
      callback()
    }
  },

  /**
   * -1000000 - 1000000数字校验
   */
  checkZeroToHundredThousand(rule, value, callback) {
    if (value < -1000000 || value > 1000000) {
      callback(new Error('请输入-1000000-1000000的数'))
    }
    callback()
  },

  /**
   * 验证4位数字
   */
  checkFourNumber(rule, value, callback) {
    const reg = /^([0-9]{4})$/
    if (!reg.test(value)) {
      callback(new Error('请输入4位数值'))
    } else {
      callback()
    }
  },

  /**
   * 13位校验
   */
  checkThirteen(rule, value, callback) {
    if (value && value.length !== 13) {
      callback(new Error('只能输入13位'))
    }
    callback()
  },

  /**
   * 13位校验
   */
  checkEighteen(rule, value, callback) {
    if (value && value.length !== 18) {
      callback(new Error('只能输入18位'))
    }
    callback()
  },
  /**
   * 费用名称
   */
  costName(rule, value, callback) {
    const acount = /^[\u4e00-\u9fa5]+$/
    if (value && !acount.test(value)) {
      callback(new Error('费用名称不符合规范'))
    } else {
      callback()
    }
  },
  /**
   * 费用助记码
   */
  costMnemonic(rule, value, callback) {
    const mnemonic = /^[A-Za-z0-9]+$/
    if (value && !mnemonic.test(value)) {
      callback(new Error('费用助记码不符合规范'))
    } else {
      callback()
    }
  },
  /**
   * 费用代码
   */
  costCode(rule, value, callback) {
    const code = /^[A-Za-z0-9]+$/
    if (value && !code.test(value)) {
      callback(new Error('费用代码不符合规范'))
    } else {
      callback()
    }
  }
}

/**
 * 100以内的数字
 *
 */
// 验证是否0-100之间
export function isZeroToHandred(rule, value, callback) {
  // if (!value) {
  // return callback(new Error('输入不可以为空'));
  // }
  if (value) {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /^(?:0|[1-9][0-9]?|100)$/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入正整数，值为【0,100】'))
      } else {
        callback()
      }
    }
  }
  callback()
}

/* 是否手机号码或者固话*/
export function validatePhone(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
      callback()
    }
  }
  callback()
}

/* 是否邮箱*/
export function validateEMail(rule, value, callback) {
  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  }
  callback()
}

// 验证是否整数,非必填
export function isIntegerNotMust(rule, value, callback) {
  if (!value) {
    callback()
  }
  if (!Number(value)) {
    callback(new Error('请输入正整数'))
  } else {
    const re = /^[0-9]*[1-9][0-9]*$/
    const rsCheck = re.test(value)
    if (!rsCheck) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
  callback()
}

// 仅支持0-100的正数，最多支持两位小数 一般适用百分比
export function isPercentage(rule, value, callback) {
  if (!value) {
    callback()
  }
  const reg = /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/
  if (!reg.test(value)) {
    callback(new Error('仅支持0-100的正数，最多支持两位小数'))
  } else {
    callback()
  }
}