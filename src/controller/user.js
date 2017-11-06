const Base = require('./base.js');
const wxService = require('../service/wx.js');
const constant = require('../config/constant');

module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
    this.wx = new wxService();
  }

  __before() {
    // if (this.ctx.ip !== '::ffff:127.0.0.1') {
    //   think.logger.error(`${this.ctx.ip} 尝试请求user`);
    //   return this.fail('unknown host address')
    // }
  }

  








  // #region TODO:
  //给用户打标签
  async tagUserAction() {
    const openid = this.get('openid');
    const type = this.get('type');
    think.logger.info(`tag user:${openid},type:${type}`);
    let access_token = await this.mongo('access_token').getToken();
    let ret = await this.wx.tagUser(openid, constant.userTags[type], access_token);
    if (ret.errcode === 0) {
      return this.success(ret)
    }
    return this.fail(ret.errmsg);
  }

  //取消用户标签
  async unTagUserAction() {
    const openid = this.get('openid');
    const type = this.get('type');
    think.logger.info(`tag user:${openid},type:${type}`);
    let access_token = await this.mongo('access_token').getToken();
    let ret = await this.wx.unTagUser(openid, constant.userTags[type], access_token);
    if (ret.errcode === 0) {
      return this.success(ret)
    }
    return this.fail(ret.errmsg);
  }

  // 获取用户基本信息
  async getUserInfoAction() {
    const openid = this.cookie('uid') || this.get('uid');
    if (!openid) {
      return this.fail('uid cannot be empty');
    }
    let access_token = await this.mongo('access_token').getToken();
    let ret = await this.wx.getUserInfo(openid, access_token);
    if (!ret.errcode) {
      return this.success(ret)
    }
    return this.fail('invalid openid');
  }

  //获取openid
  async getWebUserInfoAction() {
    const code = this.get('code');
    let userInfo = await this.wx.getWebAccess(code);
    think.logger.info('get openid: code = ' + code);
    if (userInfo.openid) {
      think.logger.info('get openid success: openid = ' + userInfo.openid);
      // this.cookie('uid', userInfo.openid);
      return this.success(userInfo.openid);
    } else {
      return this.fail('invalid code')
    }
  }
  // #endregion TODO:
};
