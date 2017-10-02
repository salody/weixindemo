/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/1
 */

const config = require('./config');
const wechat = require('./middlewares/index');
const koa = require('koa');
const app = new koa();


app.use(wechat(config));

app.listen(config.port);