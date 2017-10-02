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

module.exports = {
  readeFileAsync,
  writeFileAsync,
  parseXMLAsync
};