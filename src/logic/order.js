module.exports = class extends think.Logic {
  payAction(){
    this.allowMethods = 'post';
    let rules = {
      device_info:{
        default:'WEB'
      },
      body:{
        required:true        
      },
      out_trade_no:{
        required:true
      },
      total_fee:{
        required:true        
      },
      spbill_create_ip:{
        required:true
      },
      notify_url:{
        required:true
      },
      trade_type:{
        default:'JSAPI'
      },
      openid:{
        required:true
      }
    };
    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
};