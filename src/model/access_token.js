module.exports = class extends think.Mongo {

  constructor(...args){
    super(...args);
    this.data = '';
  }

  async getAccessToken(){
    let data = await this.select();
    return data
  }

  async addToken(data){
    let values = {
      time:Date.now(),
      ...data
    };
    let ret = await this.add(values);
    return ret;
  }

  async getToken(){
    // 找最近一条
    if(think.config('accessToken')){
      return think.config('accessToken');
    }
    let ret = await this.order('time desc').limit(1).find();
    return ret.access_token;
  }
};
