const js2xmlparser = require("js2xmlparser");

module.exports = class extends think.Service {
  /**
   * unified order
   * @param {object} param 
   * @returns 
   */
  async unifiedOrder(param) {
    const wechat = think.config('wechat');
    const params = {
      ...param,
      appid: wechat.appId,
      mch_id: wechat.mchId,
      nonce_str: Math.random().toString(36).substring(2),  //10位
    };
    params.sign = global.generateSign(params);
    const data = js2xmlparser.parse('xml', params);
    const url = think.config('api.unified_order');
    const ret = await think.request({
      method: 'POST',
      url,
      data,
    });
    return global.parseWxXml(ret);
  }
}