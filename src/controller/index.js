const Base = require('./base.js');
const generateString = require('crypto-random-string');

module.exports = class extends think.Controller{
  async __before(){
    const conf = await this.mongo('wechat_info').select();
    const token = this.cookie('TOKEN');
    // 初始项目没有配置，跳过校验
    if(token !== conf.sysToken && conf.length !== 0 && this.ctx.path !== '/index/login'){
      return this.redirect('/index/login');
    }
  }

  indexAction() {
    return this.display();
  }

  async loginAction() {
    const token = this.post('token');
    const info = await this.mongo('wechat_info').getInfo();
    if(info && info.sysToken === token){
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
    const data = this.post();
    let info = await this.mongo('wechat_info').getInfo();
    let ret = {};
    const randomStr = generateString(32);     
    data.sysToken = randomStr;
    ret.token = randomStr;
    this.cookie('TOKEN',randomStr);
    if(!think.isEmpty(info)){
      await model.where(info).update(data);
    }else{
      await model.add(data);
    }
    return this.success(ret);
  }

  async testAction(){
    const data = this.post();
    console.log(data);
    return this.success(data);
  }
}