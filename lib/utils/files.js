
const { statSync } = require('fs');
const { basename } = require('path');

module.exports = {
  getCurrentDirectoryBase() {
    return basename(process.cwd());
  },

  directoryExists(filePath) {
    try {
      return statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};
