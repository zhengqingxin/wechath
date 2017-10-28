module.exports = class extends think.Service {
  // 创建自定义菜单
  async createMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      method: 'POST',
      url: `${api.create_menus}?access_token=${access_token}`,
      data: menus
    });
    think.logger.info(ret);
    return ret;
  }

  // 创建默认菜单
  async createSelfMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      method: 'POST',
      url: `${api.create_self_menu}?access_token=${access_token}`,
      data: menus
    });
    think.logger.info(ret);
    return ret;
  }

  // 获取菜单
  async getMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      url: `${api.get_menus}?access_token=${access_token}`,
    });
    think.logger.info(ret);
    return ret;
  }

  // 删除菜单
  async deleteMenu(access_token, menus) {
    think.logger.info(`create menu with access_token: ${access_token} `);
    think.logger.info(menus);
    const ret = await this.request({
      url: `${api.delete_menus}?access_token=${access_token}`,
    });
    think.logger.info(ret);
    return ret;
  }
}