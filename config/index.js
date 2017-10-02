/**
 * 功能描述: 配置文件
 * @author: liuguanbang
 * 2017/10/1
 */

const util = require('../lib/util');
const path = require('path');

const AppID = 'wxbb3a41e497d23f1c';
const AppSecret =  '01034d28e71aca3d05957b9abe13f016';
const token = 'whosyourdaddy';
const accessToken = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${AppID}&secret=${AppSecret}`;
const wechat_file = path.join(__dirname + '/wechat.txt');

const config = {
  port: 3000,
  wechat: {
    AppID,
    AppSecret,
    token
  },
  api: {
    accessToken
  },
  getAccessToken() {
    return util.readeFileAsync(wechat_file);
  },
  saveAccessToken(data) {
    return util.writeFileAsync(wechat_file, data);
  }

};

module.exports = config;