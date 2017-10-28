module.exports = class extends think.Mongo {
  
    constructor(...args){
      super(...args);
    }
  
    async addInfo(data){
      let values = {
        time:Date.now(),
        ...data
      };
      let ret = await this.add(values);
      return ret;
    }

    async getInfo(){
      // 找最近一条
      let ret = await this.limit(1).find();
      return ret;
    }
  };
  