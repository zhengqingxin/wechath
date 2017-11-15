const Base = require('./base.js');
const wxService = require('../service/wx.js');
const helper = require('think-helper');

module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
    this.wx = new wxService();
  }

  // 支付
  async indexAction() {
    const openid = this.get('openid');
    const product = this.get('productName');
    const tradeNo = this.get('tradeNo');
    const totalFee = this.get('totalFee');
    const userIp = this.get('userIp');
    const notify_url = this.get('notify_url');
    const wechat = await this.mongo('wechat_info').getInfo();
    // 1.通过统一下单接口获取prepay_id
    let uniOrder = await this.wx.unifiedOrder(openid, product, tradeNo, totalFee, userIp, notify_url);
    if (!uniOrder.prepay_id) {
      return this.fail(uniOrder.return_msg || 'get unified order failed');
    }
    // 2.拼参数
    let data = {
      appId: wechat.appId,
      timeStamp: Number.parseInt(Date.now() / 1000).toString(),
      nonceStr: Math.random().toString(36).substring(2),  //10位
      package: 'prepay_id=' + uniOrder.prepay_id,
      signType: 'MD5'
    };
    // 3.生成sign
    data.paySign = global.generateSign(data);
    think.logger.info('get pay info:' + JSON.stringify(data));
    return this.success(data);
  }
};
