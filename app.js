/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/1
 */

const config = require('./config');
const wechat = require('./middlewares/wechat');
const koa = require('koa');
const app = new koa();
const count = require('./middlewares/count');

/*app.use(function *(next) {
  //this.query

 let countNum = yield count();
 yield next;
 //this.body = this.query.echo + '已访问次数: ' + countNum;
});*/
app.use(count());

app.use(wechat(config));


app.listen(config.port);