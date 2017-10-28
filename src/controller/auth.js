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
    if(think.isEmpty(wechat)){
      return this.fail('wechat config is empty , please check your configuration');
    }
    return this.redirect(`${url}?appId=${wechat.appId}&timestamp=${timestamp}&nonceStr=${noncestr}&signature=${signature}`);
  }

  testAction(){
    const config = think.config();
    this.success(config);
  }

}