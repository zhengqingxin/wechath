module.exports = class extends think.Service {

  /**
   * get js ticket
   * @returns 
   */
  async getJsTicket() {
    let access_token = think.config('accessToken');
    if(!access_token){
      access_token = await this.getAccessToken();
    }
    const url = think.config('api.get_js_api_ticket');    
    const ret = await think.request({
      method: 'GET',
      url,
      data: {
        access_token,
        type: 'jsapi'
      }
    });
    if(!think.isEmpty(ret.ticket)){
      think.config('jsTicket',ret.ticket);      
    }
    think.logger.info('get js api ticket');
    think.logger.info(ret);
    return ret;
  }

  /**
   * get access token 
   * @returns 
   */
  async getAccessToken() {
    const wechat = think.config('wechat');
    if(think.isEmpty(wechat)){
      return;
    }
    const url = think.config('api.get_access_token');
    let ret = await think.request({
      method: 'GET',
      url,
      data: {
        grant_type: 'client_credential',
        appid: wechat.appId,
        secret: wechat.appSecret,
      }
    });
    if(!think.isEmpty(ret.access_token)){
      think.config('accessToken',ret.access_token);      
    }
    think.logger.info(ret);
    return ret;
  }

  /**
   * init
   */
  async init(){
    const accessToken = await this.getAccessToken();
    const ticket = await this.getJsTicket();
    return {accessToken,ticket}
  }

}