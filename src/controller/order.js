const Base = require('./base.js');

module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
  }

  /**
   * pay 
   * @returns 
   */
  async payAction() {
    const param = this.post();
    const uniOrder = await think.service('order').unifiedOrder(param);
    if (!uniOrder.prepay_id) {
      return this.fail(uniOrder);
    }
    const data = {
      appId: think.config('wechat').appId,
      timeStamp: Number.parseInt(Date.now() / 1000).toString(),
      nonceStr: Math.random().toString(36).substring(2),  //10位
      package: 'prepay_id=' + uniOrder.prepay_id,
      signType: 'MD5'
    };
    data.paySign = global.generateSign(data);
    return this.success(data);
  }
  
  /**
   * get pay sign
   * @returns 
   */
  getPaySignAction(){
    const data = this.post();
    delete data.sign;
    const sign = global.generateSign(param);
    return this.success(sign);
  }
};
