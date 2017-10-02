/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

const fs = require('fs');
const path = require('path');

const readeFileAsync = function () {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/accessToken.txt', 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
};

const writeFileAsync = function (data) {
  return fs.writeFile(__dirname + '/accessToken.txt', data, 'utf8')
};

module.exports = {
  readeFileAsync,
  writeFileAsync
};