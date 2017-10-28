const xml2js = require('xml2js');
const js2xmlparser = require("js2xmlparser");
const helper = require('think-helper');
const Base = require('./base');
const {api, APP_ID, APP_SECRET, MCH_ID} = require('../config/config');

module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
    this.wechat = think.config('wechat');
  }

  // 通过code获取用户信息(access_token,openid 等)
  async getWebAccess(code) {
    let ret = await this.request({
      method: 'GET',
      url: api.auth2_access_token,
      data: {
        appid: this.wechat.appId,
        secret: this.wechat.appSecret,
        code,
        grant_type: 'authorization_code'
      }
    });
    think.logger.info(ret);
    return ret;
  }

  // 统一下单接口
  async unifiedOrder(openid, body, out_trade_no, total_fee, spbill_create_ip, notify_url) {
    let params = {
      appid: this.wechat.appId,
      mch_id: this.wechat.mchId,
      nonce_str: Math.random().toString(36).substring(2),  //10位
      body,        // 商品简单描述
      // todo:订单编号规则
      out_trade_no,       // 商户系统内部订单号
      total_fee: total_fee,            // 金额,单位:分
      spbill_create_ip,       //用户端ip
      notify_url,  //回调地址
      trade_type: 'JSAPI',     //交易类型
      openid
    };
    params.sign = global.generateSign(params);
    const data = js2xmlparser.parse('xml', params);
    const ret = await this.request({
      method: 'POST',
      url: api.unified_order,
      data,
    });
    return global.parseWxXml(ret);
  }

  async getAccessToken() {
    let ret = await this.request({
      method: 'GET',
      url: api.get_access_token,
      data: {
        grant_type: 'client_credential',
        appid: this.wechat.appId,
        secret: this.wechat.appSecret,
      }
    });
    think.logger.info(ret);
    return ret;
  }

  async getJsTicket(access_token) {
    let ret = await this.request({
      method: 'GET',
      url: api.get_js_api_ticket,
      data: {
        access_token,
        type: 'jsapi'
      }
    });
    think.logger.info('get js api ticket');
    think.logger.info(ret);
    return ret;
  }

  // 创建自定义菜单
  async createMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      method: 'POST',
      url: `${api.create_menus}?access_token=${access_token}`,
      data: menus
    });
    think.logger.info(ret);
    return ret;
  }

  // 创建默认菜单
  async createSelfMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      method: 'POST',
      url: `${api.create_self_menu}?access_token=${access_token}`,
      data: menus
    });
    think.logger.info(ret);
    return ret;
  }

  // 获取菜单
  async getMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      url: `${api.get_menus}?access_token=${access_token}`,
    });
    think.logger.info(ret);
    return ret;
  }

  // 删除菜单
  async deleteMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      url: `${api.delete_menus}?access_token=${access_token}`,
    });
    think.logger.info(ret);
    return ret;
  }

  // 打标签
  async tagUser(openid_list, tagid, access_token) {
    if (!openid_list || !tagid) {
      return
    }
    if (helper.isString(openid_list)) {
      openid_list = [openid_list]
    }
    let data = {
      openid_list,
      tagid,
    };
    const ret = await this.request({
      method: 'POST',
      url: `${api.tag_user}?access_token=${access_token}`,
      data,
    });
    think.logger.info(ret);

    await this.getUserInfo(openid_list[0], access_token)

    return ret;
  }

  // 取消标签
  async unTagUser(openid_list, tagid, access_token) {
    if (!openid_list || !tagid) {
      return
    }
    if (helper.isString(openid_list)) {
      openid_list = [openid_list]
    }
    let data = {
      openid_list,
      tagid,
    };
    const ret = await this.request({
      method: 'POST',
      url: `${api.untag_user}?access_token=${access_token}`,
      data,
    });
    think.logger.info(ret);

    await this.getUserInfo(openid_list[0], access_token)

    return ret;
  }

  async getTags(access_token) {
    const ret = await this.request({
      url: `${api.get_tags}?access_token=${access_token}`,
    });
    think.logger.info(ret);
    return ret;
  }

  async getUserInfo(openid, access_token) {
    const ret = await this.request({
      url: `${api.get_user_info}?access_token=${access_token}`,
      data: {
        openid: openid,
        lang: 'zh_CN'
      }
    });
    think.logger.info(ret);
    return ret;
  }

};