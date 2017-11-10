// invoked in worker
// require('./common');
const md5 = require('md5');
const xml2js = require('xml2js');
const helper = require('think-helper');
const parser = new xml2js.Parser();
const fn = helper.promisify(parser.parseString, parser);
const sha1 = require('sha1');

global.parseWxXml = async(xml)=> {
  const json = await fn(xml);
  xml = json.xml;
  let data = {};
  for (let key in xml) {
    data[key] = xml[key][0]
  }
  return data;
};

// 生成sign
global.generateSign = (params = {})=> {
  const payKey = think.config('wechat').payKey;
  if(!payKey){
    return;
  }
  // 1.根据请求参数的 key 按照 ASCII 排序拼成 URL 字符串
  let paramStr = '';
  let keys = Object.keys(params).sort();
  keys.forEach(k=> {
    paramStr += `${k}=${params[k]}&`
  });
  // 2.后面加上 key 参数,key值为微信支付商户平台申请的 API 密钥
  paramStr += `key=${payKey}`;
  // 3.md5加密后转成大写
  return md5(paramStr).toUpperCase();
};
// 生成signature
global.generateSignature = (params = {})=> {
  // 1.根据请求参数的 key 按照 ASCII 排序拼成 URL 字符串
  let paramStr = '';
  let keys = Object.keys(params).sort();
  keys.forEach(k=> {
    paramStr += `${k}=${params[k]}&`
  });
  paramStr = paramStr.substring(0,paramStr.length-1);
  // 3.md5加密后转成大写
  return sha1(paramStr);
};

think.beforeStartServer(async ()=>{
  const wechat = await think.mongo('wechat_info').getInfo();
  think.config('wechat',wechat);
})