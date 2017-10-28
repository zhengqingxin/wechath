const path = require('path');
const wechat = require('think-wechat');
const isDev = think.env === 'development';
module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: wechat,
    match: '/wechat',
    options: async ()=>{
      const wechatInfo = await think.mongo('wechat_info').getInfo();      
      return{
        token: wechatInfo.token,
        appid: wechatInfo.appId,
        encodingAESKey: wechatInfo.encodingAESKey,
        checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
      }
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
