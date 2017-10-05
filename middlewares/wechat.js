/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

const sha1 = require('sha1');
const getRawBody = require('raw-body');
const WeChat = require('../wechat/wechat');
const util = require('../lib/util');
const reply = require('./reply');

module.exports = function (opts) {
  const weChat = new WeChat(opts);
  //weChat.getAccessToken();

  return function* connect(next) {
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
    if (this.method === 'GET') {
      if (shaStr === signature) {
        this.body = echostr + '';
      } else {
        this.body = '这里只接受微信后台的访问哦';
      }
    } else if (this.method === 'POST') {
      if (shaStr !== signature) {
        this.body = 'wrong';
        return false;
      } else {
        let data = yield getRawBody(this.req, {
          length: this.req.headers['content-length'],
          limit: '1mb',
          encoding: this.charset
        });
        // xml转化为json
        let content = yield util.parseXMLAsync(data);
        // 转化后的数据格式化
        let message = util.formatMessage(content.xml);
        let info = yield reply(message);
        weChat.reply.call(this, info, message);
      }
    }
  }
};