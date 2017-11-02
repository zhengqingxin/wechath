module.exports = class extends think.Service {
  
  async fetch(url, method, data) {
    const access_token = think.config('accessToken');
    const path = think.config(`api.${url}`);
    const ret = await think.request({
      method,
      url: `${path}?access_token=${access_token}`,
      data
    });
    return ret;
  }

  async get(url, data) {
    return await this.fetch(url, 'GET', data);
  }

  async post(url, data) {
    return await this.fetch(url, 'POST', data);
  }
}