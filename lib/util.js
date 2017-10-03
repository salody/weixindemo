/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/2
 */

const fs = require('fs');
const parseString = require('xml2js').parseString;

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

const parseXMLAsync = function (data) {
  return new Promise((resolve, reject) => {
    parseString(data, function (err, result) {
      if (err) reject(err);
      resolve(result)
    });
  })
};

const formatMessage = function (content) {
  // todo 对于xml转为json的多层嵌套进行转换。
  for (let prop in content) {
    if (content.hasOwnProperty(prop)) {
      if (Array.isArray(content[prop])) {
        content[prop] = content[prop][0];
      }
    }
  }

  return content;
};

module.exports = {
  readeFileAsync,
  writeFileAsync,
  parseXMLAsync,
  formatMessage
};