import { BigNumber, ethers } from 'ethers';

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(timespan) {
  var mistiming = Math.round((Date.now() - timespan) / 1000)
  var arrr = [this.$t('common.years'), this.$t('common.mons'), this.$t('common.weeks'), this.$t('common.days'), this.$t('common.hrs'), this.$t('common.mins'), this.$t('common.secs')];
  var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
  for (var i = 0; i < arrn.length; i++) {
    var inm = Math.floor(mistiming / arrn[i]);
    if (inm !== 0) {
      return inm + arrr[i] + this.$t('common.ago');
    }
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 两个数相成 精确计算
 *
 * @param {any} f1
 * @param {any} f2
 * @returns
 */
export function fxf(f1, f2) {
  f1 += '';
  f2 += '';
  const f1Len = f1.split('.')[1] ? f1.split('.')[1].length : 0;
  const f2Len = f2.split('.')[1] ? f2.split('.')[1].length : 0;
  if (f1Len) {
    f1 = f1.replace('.', '');
  }
  if (f2Len) {
    f2 = f2.replace('.', '');
  }
  return getFullNum((f1 * f2) / (10 ** (f1Len + f2Len)));

  // return f1 * f2 / Math.pow(10, f1Len + f2Len);
}

/**
 * 两个数相除 精确计算
 *
 * @param {any} arg1
 * @param {any} arg2
 //  * @returnss
 */
export function accDiv(arg1, arg2) {
  let t1 = 0;
  let t2 = 0;
  try { t1 = arg1.toString().split('.')[1].length } catch (e) { }
  try { t2 = arg2.toString().split('.')[1].length } catch (e) { }
  const r1 = Number(arg1.toString().replace('.', ''));
  const r2 = Number(arg2.toString().replace('.', ''));
  const data = (r1 / r2) * Math.pow(10, t2 - t1)
  return getFullNum(data);
}

export function getFullNum(val) {
  const e = String(val)
  const rex = /^([0-9])\.?([0-9]*)e-([0-9])/
  if (!rex.test(e)) return val
  const numArr = e.match(rex)
  const n = Number('' + numArr[1] + (numArr[2] || ''))
  const num = '0.' + String(Math.pow(10, Number(numArr[3]) - 1)).substr(1) + n
  return num.replace(/0*$/, '') // 防止可能出现0.0001540000000的情况
}
/**
 * 保留小数位（非负）
 * @param {number} num 待处理数据
 * @param {number} decimal 位数
 */
export function formatDecimal(num, decimal) {
  num = num.toString()
  const index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return getFullNum(Number(parseFloat(num).toFixed(decimal)))
}

export function bigNumberTransform(num) {
  if (num >= 1000000) {
    return intlFormat(num / 1000000) + 'M';
  }
  if (num >= 1000) {
    return intlFormat(num / 1000) + 'k';
  }
  return intlFormat(num);
}
function intlFormat(num) { return new Intl.NumberFormat().format(Math.round(num * 10) / 10) }


/**
 * 秒数格式化
 * @param {Number} seconds 秒数
 */
 export const secondFormat = (seconds) => {
  let day = Math.floor(seconds / 86400)
  let hours = day ? Math.floor(Math.floor(seconds / 86400) / 3600) : Math.floor(seconds / 3600)
  let minute = Math.floor(Math.floor(seconds % 3600) / 60)
  let second = seconds % 60
  if (hours.toString().length === 1) hours = `0${hours}`
  if (minute.toString().length === 1) minute = `0${minute}`
  if (second.toString().length === 1) second = `0${second}`
  return `${day ? day + '天  ' : ''}${hours} : ${minute} : ${second}`
}

export function toPrecision(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  if (num.length <= 10) {
    return num
  }
  return parseFloat(num).toFixed(decimal)
}

export function toolNumber(num_str) {
  num_str = num_str.toString();
  if (num_str.indexOf("+") != -1) {
    num_str = num_str.replace("+", "");
  }
  if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
    var resValue = "",
      power = "",
      result = null,
      dotIndex = 0,
      resArr = [],
      sym = "";
    var numStr = num_str.toString();
    if (numStr[0] == "-") {
      // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
      numStr = numStr.substr(1);
      sym = "-";
    }
    if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
      var regExp = new RegExp(
        "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
        "ig"
      );
      result = regExp.exec(numStr);
      if (result != null) {
        resValue = result[2];
        power = result[5];
        result = null;
      }
      if (!resValue && !power) {
        return false;
      }
      dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
      resValue = resValue.replace(".", "");
      resArr = resValue.split("");
      if (Number(power) >= 0) {
        var subres = resValue.substr(dotIndex);
        power = Number(power);
        //幂数大于小数点后面的数字位数时，后面加0
        for (var i = 0; i <= power - subres.length; i++) {
          resArr.push("0");
        }
        if (power - subres.length < 0) {
          resArr.splice(dotIndex + power, 0, ".");
        }
      } else {
        power = power.replace("-", "");
        power = Number(power);
        //幂数大于等于 小数点的index位置, 前面加0
        for (var i = 0; i < power - dotIndex; i++) {
          resArr.unshift("0");
        }
        var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
        resArr.splice(n, 0, ".");
      }
    }
    resValue = resArr.join("");

    return sym + resValue;
  } else {
    return num_str;
  }
}

export function IsPC() {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

export const getUserBalance = (publicAddress) => {
  // return web3Instance.eth.getBalance(publicAddress)
  // const rpcUrl =  'https://http-mainnet-node.defibox.com'//'https://http-mainnet.hecochain.com'
  // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const provider = new ethers.providers.Web3Provider(window.ethereum, 572845)
  return provider.getBalance(publicAddress)
}