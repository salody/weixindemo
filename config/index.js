/**
 * 功能描述: 配置文件
 * @author: liuguanbang
 * 2017/10/1
 */

const util = require('../lib/util');
const path = require('path');

// 测试账号
const AppID = 'wx25e4f4c31b62e880';
const AppSecret =  '96809b01cb28516555ac150585f53c34';

// 正式账号  切换账号时要清除config下的wechat.txt
// const AppID = 'wxbb3a41e497d23f1c';
// const AppSecret = 'fd93141eaef1260831058e848815fb1b';

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
    accessToken,
    temporary: {
      upload: 'https://api.weixin.qq.com/cgi-bin/media/upload?',
      fetch: 'https://api.weixin.qq.com/cgi-bin/media/get?'
    },
    permanent: {
      upload: 'https://api.weixin.qq.com/cgi-bin/material/add_material?',
      uploadNews: 'https://api.weixin.qq.com/cgi-bin/material/add_news?',
      uploadNewsPic: 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?',
      fetch: 'https://api.weixin.qq.com/cgi-bin/material/get_material?'
    }
  },
  getAccessToken() {
    return util.readeFileAsync(wechat_file);
  },
  saveAccessToken(data) {
    return util.writeFileAsync(wechat_file, data);
  }

};

module.exports = config;