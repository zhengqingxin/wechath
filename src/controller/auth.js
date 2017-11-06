const Base = require('./base.js');

module.exports = class extends Base {

  constructor(...arg) {
    super(...arg);
  }

  /**
   * init operation (get access_token/js_api_ticket)
   * allow crontab task
   * @returns 
   */
  async initAction() {
    if (!this.isCli) {
      return;
    }
    const ret = await think.service('auth').init();
    return this.success(ret);
  }

  /**
   * get jsApi then redirect to specific url
   * @returns 
   */
  async getJsApiAction() {
    let url = this.get('url');
    let jsapi_ticket = think.config('jsTicket');
    let noncestr = Math.random().toString(36).substring(2);//10位
    let timestamp = Number.parseInt(Date.now() / 1000).toString();
    let data = {
      jsapi_ticket,
      noncestr,
      timestamp,
      url
    };
    const signature = global.generateSignature(data);
    const wechat = think.config('wechat');
    return this.redirect(`${url}?appId=${wechat.appId}&timestamp=${timestamp}&nonceStr=${noncestr}&signature=${signature}`);
  }

  /**
   * 网页授权-只获取获取openId
   * @param {string} state 回调地址
   * @returns 
   */
  async getUserIdAction() {
    const { code } = this.get();
    const ret = await think.service('auth').getUserInfo(code);
    const wechat = think.config('wechat');
    if(wechat.oauth2Callback){
      await think.request({
        method:'POST',
        url:wechat.oauth2Callback,
        data:ret
      });
    }
    return this.redirect(wechat.auth2Url);
  }

  /**
   * 网页授权-获取用户信息
   * @returns 
   */
  async getUserInfoAction() {
    const { state, code } = this.get();
    const ret = await think.service('auth').getUserInfo(code, true);
    const wechat = think.config('wechat');
    console.log(wechat.auth2Url);
    if(wechat.oauth2Callback){
      await think.request({
        method:'POST',
        url:wechat.oauth2Callback,
        data:ret
      });
    }
    return this.redirect(wechat.auth2Url);
  }

  // testAction(){
  //   const config = think.config();
  //   this.success(config);
  // }

}