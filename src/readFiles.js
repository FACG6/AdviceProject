const fs = require('fs');

const readFiles = (pathFile, cb) => {
  fs.readFile(pathFile, (error, file) => {
    if (error) {
      cb(new TypeError(error));
    } else {
      cb(null, file);
    }
  });
};
module.exports = readFiles;
