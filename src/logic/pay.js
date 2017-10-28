module.exports = class extends think.Logic {
  indexAction() {
    this.allowMethods = 'get';
    let rules = {
      openid: {
        required: true,
        trim: true
      },
      productName: {
        required: true,
        trim: true,
      },
      tradeNo:{
        required:true,
        trim:true
      },
      totalFee:{
        required:true,
        // int:true
      },
      userIp:{
        required:true,
        ip:true
      },
      notify_url:{
        required:true,
      }
    };
    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
};
