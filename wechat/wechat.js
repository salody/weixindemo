/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

const fetch = require('node-fetch');
const tpl = require('./tpl');
const fs = require('fs');
const request = require('request');

class WeChat {
  constructor(opts) {
    this.opts = opts;
    this.AppID = opts.wechat.AppID;
    this.AppSecret = opts.wechat.AppSecret;
  }

  // todo: 这里的getAccessToken和update逻辑有些问题。在更换AppId以后会出现混乱。需要做调整。
  // todo: 暂行办法是删除config文件夹中存储的token。重新获取一次accessToken
  getAccessToken() {
    return this.opts.getAccessToken()
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
      return JSON.parse(data);
    })
  }

  updateAccessToken() {
    let url = this.opts.api.accessToken;
    return (
      fetch(url)
        .then(res => {
          console.log(res);
          return res.json()
        })
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

  // info 是要发送的。 message是进来的
  // info的对象键值严格对应微信响应消息的键值
  reply(info, message) {
    let type = 'text';
    let FromUserName = message.FromUserName;
    let ToUserName = message.ToUserName;

    info.MsgType = info.type || type;
    info.ToUserName = FromUserName;
    info.FromUserName = ToUserName;

    // 注意this绑定问题。调用reply时加上call
    // 使得koa直接进行回复
    this.status = 200;
    this.type = 'application/xml';
    this.body = tpl(info);

  }

  uploadTemporaryMaterial(type, filepath) {
     const form = {
       media: fs.createReadStream(filepath)
     };
    return (
      this.getAccessToken()
        .then(data => {
          const url = this.opts.api.temporary + 'access_token=' + data.access_token + '&type=' + type;
          return url;
        })
        .then((url) => {
          return new Promise((resolve, reject) => {
            request.post({url: url, formData: form}, (err, httpResponse, body) => {
              if (err) reject(err);
              body = JSON.parse(body);
              if (body.errcode) {
                //throw new Error(body.errmsg);
                reject(body.errcode + ': ' + body.errmsg);
              }
              resolve(body);
            })
          })
        })
    );
  }

  uploadPermanentMaterial(type, filepath) {
    // todo: 新增图文素材
    const form = {
      media: fs.createReadStream(filepath)
    };
    return (
      this.getAccessToken()
        .then(data => {
          const url = this.opts.api.permanent + 'add_material?' +'access_token=' + data.access_token + '&type=' + type;
          return url;
        })
        .then((url) => {
          return new Promise((resolve, reject) => {
            request.post({url: url, formData: form}, (err, httpResponse, body) => {
              if (err) reject(err);
              body = JSON.parse(body);
              if (body.errcode) {
                //throw new Error(body.errmsg);
                reject(body.errcode + ': ' + body.errmsg);
              }
              console.log(body);
              resolve(body);
            })
          })
        })
    );
  }
}

module.exports = WeChat;