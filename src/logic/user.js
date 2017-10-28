module.exports = class extends think.Logic {
  tagUserAction() {
    this.allowMethods = 'get';
    let rules = {
      openid: {
        required: true,
        trim: true
      },
      type: {
        required: true,
        trim: true,
        regexp: /shop|agent/
      },
    }
    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }

  getWebUserInfoAction() {
    this.allowMethods = 'get';
    let rules = {
      code: {
        required: true,
        trim: true
      }
    }
    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
};
