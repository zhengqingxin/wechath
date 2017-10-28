module.exports = class extends think.Logic {
  getJsApiAction() {
    this.allowMethods = 'get';
    this.rules = {
      url: {
        required: true,
        trim: true
      },
    };
  }
};
