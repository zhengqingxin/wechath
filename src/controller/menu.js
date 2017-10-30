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

  async getAction() {
    const ret = await this.service.getMenu();
    return this.success(ret);
  }

  async deleteAction() {
    const ret = await this.service.deleteMenu();
    return this.success(ret);
  }

  async addDefaultAction() {
    const menus = this.post();
    const ret = await this.service.addDefaultMenu(menus);
    return this.success(ret);
  }

  async addConditionalAction() {
    const access_token = think.config('accessToken');
    // const menus = require('../config/menus');
    // let {special} = menus;
    const menus = this.ctx.post();
    let ret = {};
    if (Array.isArray(menus)) {
      for (let i = 0; i < menus.length; i++) {
        ret = await this.service.createMenu(access_token, menus[i]);
      }
    } else {
      ret = await this.service.createMenu(access_token, menus);
    }
    return this.success(ret);
  }
};