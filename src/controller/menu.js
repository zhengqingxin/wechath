const Base = require('./base.js');

module.exports = class extends Base {
  constructor(...arg) {
    super(...arg);
    this.wx = new wxService();
  }

  __before(){
    if(!this.isCli){
      return this.fail();
    }
  }

  async getAction(){
    let access_token = await this.mongo('access_token').getToken();
    let ret = await this.wx.getMenu(access_token);
    return this.success(ret);
  }

  async deleteAction(){
    let access_token = await this.mongo('access_token').getToken();
    let ret = await this.wx.deleteMenu(access_token);
    return this.success(ret);
  }

  async addAction(){
    await this.deleteAction();
    let access_token = await this.mongo('access_token').getToken();
    let {self, special} = menus;
    await this.wx.createSelfMenu(access_token, self);
    for (let i = 0; i < special.length; i++) {
      let r = await this.wx.createMenu(access_token, special[i]);
    }
    let ret = await this.wx.getMenu(access_token);
    return this.success(ret);
  }
};