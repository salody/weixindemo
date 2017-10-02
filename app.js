/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/1
 */

const config = require('./config');
const wechat = require('./middlewares/wechat');
const koa = require('koa');
const app = new koa();

app.use(wechat(config.wechat));

app.listen(config.port);