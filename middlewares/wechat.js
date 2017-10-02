/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

const sha1 = require('sha1');

module.exports = function (opts) {
  return function *connect(next) {
    let token = opts.token;
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