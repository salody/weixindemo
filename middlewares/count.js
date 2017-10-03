/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/3
 */
const fs = require('fs');

const count = function () {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('./count.txt')) {
      fs.writeFileSync('./count.txt','')
    }
    fs.readFile('./count.txt', 'utf8', (err, data) => {
      if (err) reject(err);
      let count = 1;
      if (data) {
        count = parseInt(data) + 1;
      }
      resolve(count);
      fs.writeFile('./count.txt', count, (err) => {
        if (err) reject(err);
      });
    });
  })
};

module.exports = count;