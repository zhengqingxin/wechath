const lodash = require('lodash');
const axios = require('axios');
const qs = require('qs');

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options;
  const cloneData = lodash.cloneDeep(data) || {};
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options)
  }
};

const request = (options)=>{
  return fetch(options).then((response) => {
    return response.data
  }).catch((error) => {
    console.error(error);
    return null;
  })
}

module.exports = {
  think:{request}
}