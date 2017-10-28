module.exports = class extends think.Service {
  // 创建自定义菜单
  async createMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const url = think.config('api.create_menus');
    
    const ret = await think.request({
      method: 'POST',
      url: `${url}?access_token=${access_token}`,
      data: menus
    });
    think.logger.info(ret);
    return ret;
  }

  
  /**
   * create default menu
   * @returns 
   */
  async addDefaultMenu(menus) {
    const access_token = think.config('accessToken');
    const url = think.config('api.create_default_menu');
    const ret = await think.request({
      method: 'POST',
      url: `${url}?access_token=${access_token}`,
      data: menus
    });
    return ret;
  }

  /**
   * get menu
   * @returns 
   */
  async getMenu() {
    const access_token = think.config('accessToken');
    const url = think.config('api.get_menus');
    const ret = await think.request({
      url,
      data:{access_token}
    });
    return ret;
  }

  
  /**
   * delete menu
   * @returns 
   */
  async deleteMenu() {
    const access_token = think.config('accessToken');
    const url = think.config('api.delete_menus');
    const ret = await think.request({
      url,
      data:{access_token}
    });
    return ret;
  }
}