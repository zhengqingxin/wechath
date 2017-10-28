const Base = require('./base.js');

module.exports = class extends Base {
  constructor(...arg) {
    super(...arg);
    this.service = think.service('menu');
  }

  // __before(){
  //   if(!this.isCli){
  //     return this.fail();
  //   }
  // }

  async getAction(){
    const ret = await this.service.getMenu();
    return this.success(ret);
  }

  async deleteAction(){
    const ret = await this.service.deleteMenu();
    return this.success(ret);
  }

  async addDefaultAction(){
    const menus = this.post();
    console.log(menus);
    const ret = await this.service.addDefaultMenu(menus);
    return this.success(ret);    
  }

  async addConditionalAction(){
    const access_token = think.config('accessToken');
    const menus = require('../config/menus');
    let {special} = menus;
    for (let i = 0; i < special.length; i++) {
      let r = await this.service.createMenu(access_token, special[i]);
    }
    let ret = await this.service.getMenu(access_token);
    return this.success(ret);
  }
};