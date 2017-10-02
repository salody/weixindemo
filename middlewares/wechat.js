/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

const sha1 = require('sha1');
const fetch = require('node-fetch');

class WeChat {
  constructor(opts) {
    this.opts = opts;
    this.AppID = opts.wechat.AppID;
    this.AppSecret = opts.wechat.AppSecret;
  }

  getAccessToken() {
    this.opts.getAccessToken()
      .then((data) => {
        try {
          data = JSON.parse(data);
        } catch (e) {
          return this.updateAccessToken()
        }
        if (this.isValidAccessToken(data)) {
          return data;
        } else {
          return this.updateAccessToken(data)
        }
      })
      .then((data) => {
        this.accessToken = data.access_token;
        this.expires_in = data.expires_in;
        this.opts.saveAccessToken(data);
      })
  }

  updateAccessToken() {
    let url = this.opts.api.accessToken;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.expires_in) {
          let now = new Date().getTime();
          data.expires_in = now + (data.expires_in - 20) * 1000;
        }
        data = JSON.stringify(data);
        this.opts.saveAccessToken(data);
      })
  }

   isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false;
    }

    let expires_in = data.expires_in;
    let now = new Date().getTime();

    return now < expires_in;
  }
}

module.exports = function (opts) {
  const weChat = new WeChat(opts);
  weChat.getAccessToken();
  return function *connect() {
    let token = opts.wechat.token;
    let signature = this.query.signature;
    let timestamp = this.query.timestamp;
    let nonce = this.query.nonce;
    let echostr = this.query.echostr;

    // 加密/校验流程如下：
    // 1.将token、timestamp、nonce三个参数进行字典序排序
    let str = [token, timestamp, nonce].sort().join('');
    // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
    let shaStr = sha1(str);
    // 3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (shaStr === signature) {
      this.body = echostr + '';
    } else {
      this.body = '这里只接受微信后台的访问哦';
    }
  }
};