const Base = require('./base.js');

module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
  }

  /**
   * pay 
   * @returns 
   */
  async payAction(){
    const param = this.post();
    const uniOrder = await think.service('order').unifiedOrder(param);
    if (!uniOrder.prepay_id) {
      return this.fail();
    }
    const data = {
      appId: think.config('appId'),
      timeStamp: Number.parseInt(Date.now() / 1000).toString(),
      nonceStr: Math.random().toString(36).substring(2),  //10位
      package: 'prepay_id=' + uniOrder.prepay_id,
      signType: 'MD5'
    };
    data.paySign = global.generateSign(data);
    return this.success(data);    
  }

  async payResultAction(){
    const data = this.post();
    console.log('post data')
    console.log(data)
  }
};
