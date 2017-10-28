const view = require('think-view');
const mongo = require('think-mongo');
const request = require('./request');

module.exports = [
  view, // make application support view
  mongo(think.app),
  request
];
