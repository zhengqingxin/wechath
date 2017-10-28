const Base = require('./base.js');
const helper = require('think-helper');
module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
  }

  indexAction() {
    return this.display();
  }

  /**
   * add/update wechat configuration 
   * @returns 
   */
  async postAction() {
    const model = this.mongo('wechat_info');
    const appId = this.post('appId');
    const appSecret = this.post('appSecret');
    const payKey = this.post('payKey');
    const mchId = this.post('mchId');
    const deviceInfo = this.post('deviceInfo');
    const token = this.post('token');
    const encodingAESKey = this.post('encodingAESKey');
    const data = { appId,appSecret,payKey,mchId,deviceInfo,token,encodingAESKey};
    let info = await this.mongo('wechat_info').getInfo();
    let ret = {};
    if(!helper.isEmpty(info)){
      ret = await model.where(info).update(data);
    }else{
      ret = await model.add(data);
    }
    if(ret){
      return this.success(ret);      
    }
    return this.fail();
  }

}