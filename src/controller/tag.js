const Base = require('./base.js');

module.exports = class extends Base {
  constructor(...arg) {
    super(...arg);
    this.service = think.service('tag');
  }

  /**
   * get tags
   * 
   * @returns 
   */
  async getAction() {
    const ret = await this.service.getTag();
    return this.success(ret);
  }

  /**
   * delete
   * @returns 
   */
  async deleteAction() {
    const data = this.post();
    const ret = await this.service.deleteTag(data);
    return this.success(ret);
  }

  /**
   * add tag
   * @returns 
   */
  async postAction() {
    const data = this.post();
    const ret = await this.service.addTag(data);
    return this.success(ret);
  }

  /**
   * edit tag
   * @returns 
   */
  async editAction() {
    const data = this.post();
    const ret = await this.service.editTag(data);
    return this.success(ret);
  }
};