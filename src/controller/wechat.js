const Base = require('./base.js');
const DEFAULT_AUTO_REPLY = '默认提示。';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    // 验证开发者服务器
    // 这里只是演示，所以没做签名校验，实际上应该要根据微信要求进行签名校验
    const echostr = this.get('echostr');
    return this.json(echostr);
  }

  async textAction(){
    return this.success('欢迎关注!');
  }

  __call(){
    this.success(DEFAULT_AUTO_REPLY);
  }
}
