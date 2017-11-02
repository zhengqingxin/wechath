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
    const ret = await think.service('common').get('get_tag');
    return this.success(ret);
  }

  /**
   * delete
   * @returns 
   */
  async deleteAction() {
    const data = this.post();    
    const ret = await think.service('common').post('delete_tag',data);    
    return this.success(ret);
  }

  /**
   * add tag
   * @returns 
   */
  async postAction() {
    const data = this.post();
    const ret = await think.service('common').post('create_tag',data);        
    return this.success(ret);
  }

  /**
   * edit tag
   * @returns 
   */
  async editAction() {
    const data = this.post();
    const ret = await think.service('common').post('edit_tag',data);            
    return this.success(ret);
  }

  /**
   * 获取标签下粉丝列表
   * @returns
   */
  async getUserAction(){
    const data = this.post();
    const ret = await think.service('common').post('get_tag_user',data);            
    return this.success(ret);
  }

  /**
   * 批量为用户打标签
   * @returns 
   */
  async batchTagAction(){
    const data = this.post();
    const ret = await think.service('common').post('batch_tag_user',data);            
    return this.success(ret);
  }

   /**
   * 批量为用户取消标签
   * @returns 
   */
  async batchUnTagAction(){
    const data = this.post();
    const ret = await think.service('common').post('batch_untag_user',data);            
    return this.success(ret);
  }

};