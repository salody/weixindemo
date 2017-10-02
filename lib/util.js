/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

const fs = require('fs');

const readeFileAsync = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  })
};

const writeFileAsync = function (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (err) => {
      if (err) reject(err);
      resolve();
    })
  })
};

module.exports = {
  readeFileAsync,
  writeFileAsync
};