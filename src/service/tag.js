module.exports = class extends think.Service {

  /**
   * add tags
   * @param {object} tags 
   */
  async addTag(data) {
    const access_token = think.config('accessToken');
    const url = think.config('api.create_tag');
    const ret = await think.request({
      method: 'POST',
      url: `${url}?access_token=${access_token}`,
      data
    });
    return ret;
  }

  /**
   * edit tags
   * @param {object} tags 
   */
  async editTag(data) {
    const access_token = think.config('accessToken');
    const url = think.config('api.edit_tag');
    const ret = await think.request({
      method: 'POST',
      url: `${url}?access_token=${access_token}`,
      data
    });
    return ret;
  }

  /**
   * get tags
   * @returns 
   */
  async getTag() {
    const access_token = think.config('accessToken');
    const url = think.config('api.get_tags');
    const ret = await think.request({
      url,
      data: { access_token }
    });
    return ret;
  }


  /**
   * delete tags
   * @returns 
   */
  async deleteTag(data) {
    const access_token = think.config('accessToken');
    const url = think.config('api.delete_tag');
    const ret = await think.request({
      method: 'POST',
      url: `${url}?access_token=${access_token}`,
      data
    });
    return ret;
  }

  /**
   * get tags
   * @returns 
   */
  async getUser(data) {
    const access_token = think.config('accessToken');
    const url = think.config('api.get_tag_user');
    const ret = await think.request({
      method: 'POST',
      url: `${url}?access_token=${access_token}`,
      data
    });
    return ret;
  }

}