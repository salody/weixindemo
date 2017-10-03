/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

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
        if (WeChat.isValidAccessToken(data)) {
          return data;
        } else {
          return this.updateAccessToken()
        }
      })
      .then((data) => {
        data = JSON.stringify(data);
        this.opts.saveAccessToken(data);
      })
  }

  updateAccessToken() {
    let url = this.opts.api.accessToken;
    return(
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.expires_in) {
            let now = new Date().getTime();
            data.expires_in = now + (data.expires_in - 20) * 1000;
          }
          return data;
        })
    );
  }

  static isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false;
    }

    let expires_in = data.expires_in;
    let now = new Date().getTime();

    return now < expires_in;
  }
}

module.exports = WeChat;