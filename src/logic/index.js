module.exports = class extends think.Logic {
  configAction() {
    this.allowMethods = 'post';
    this.rules = {
      appId: {
        required: true,
        trim: true
      },
      appSecret: {
        required: true,
        trim: true
      },
      encodingAESKey:{
        required: true,
        trim: true
      },
      token: {
        required: true,
        trim: true
      },
      payKey:{
        trim: true        
      },
      mchId:{
        trim: true        
      },
      deviceInfo:{
        trim: true        
      }
    };
  }
};
