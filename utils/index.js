/**
 * 拼接对象为请求字符串
 * 对于需要编码的文本（比如说中文）我们要进行编码
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 **/
export function formatGetUri(obj) {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value !== 'undefined' || value !== null) {
      params.push([key, encodeURIComponent(value)].join('='))
    }
  })
  return '?' + params.join('&')
}


export function formatGetParmas(url) {
  let theRequest = new Object();
  if (url.indexOf("?") !== -1) {
    var str = url.substr(1);
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


/***
* 
* 根据时间判断星期几
* @param {*} timedate 
* 格式 'YYYY-MM-DD'
* 或   'YYYY.MM.DD' 
* 或   'YYYY/MM/DD'
* 
* 
*/
export function getWeek(timedate) {
  let week;
  if (new Date(timedate).getDay() === 0) week = "周日";
  if (new Date(timedate).getDay() === 1) week = "周一";
  if (new Date(timedate).getDay() === 2) week = "周二";
  if (new Date(timedate).getDay() === 3) week = "周三";
  if (new Date(timedate).getDay() === 4) week = "周四";
  if (new Date(timedate).getDay() === 5) week = "周五";
  if (new Date(timedate).getDay() === 6) week = "周六";
  return week;
}


export function ThousandPercent(str) {
  const data = str.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
    return s + ','
  })
}

