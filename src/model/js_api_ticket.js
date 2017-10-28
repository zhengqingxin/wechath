module.exports = class extends think.Mongo {

  constructor(...args){
    super(...args);
    this.data = '';
  }

  async getAccessToken(){
    let data = await this.select();
    return data
  }

  async addTicket(data){
    let values = {
      time:Date.now(),
      ...data
    };
    let ret = await this.add(values);
    return ret;
  }

  async getTicket(){
    // 找最近一条
    let ret = await this.order('time desc').limit(1).find();
    return ret.ticket;
  }
};
