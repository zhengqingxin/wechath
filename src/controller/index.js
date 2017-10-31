const Base = require('./base.js');
const generateString = require('crypto-random-string');

module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
  }

  async __before(){
    const conf = await this.mongo('wechat_info').select();
    const token = this.cookie('TOKEN');
    // 初始项目没有配置，跳过校验
    if(!token && conf.length !== 0 && this.ctx.path !== '/index/login'){
      return this.redirect('/index/login');
    }
  }

  indexAction() {
    return this.display();
  }

  async loginAction() {
    const token = this.post('token');
    const info = await this.mongo('wechat_info').getInfo();
    if(info && info.wellToken === token){
      this.cookie('TOKEN',token);
      return this.redirect('/index/index');
    }
    return this.display();
  }

  /**
   * add/update wechat configuration 
   * @returns 
   */
  async configAction() {
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
    if(!think.isEmpty(info)){
      await model.where(info).update(data);
    }else{
      const randomStr = generateString(32); 
      data.wellToken = randomStr;
      ret.token = randomStr;
      this.cookie('TOKEN',randomStr);
      await model.add(data);
    }
    return this.success(ret);
  }

}