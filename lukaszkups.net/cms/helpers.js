const fs = require('fs')
const path = require('path')
const sass = require('node-sass')

module.exports = {
  // method below source: https://stackoverflow.com/a/40686853/1004946
  mkDirByPathSync: (targetDir, { isRelativeToScript = false } = {}) => {
    const sep = path.sep
    const initDir = path.isAbsolute(targetDir) ? sep : ''
    const baseDir = isRelativeToScript ? __dirname : '.'
    return targetDir.split(sep).reduce((parentDir, childDir) => {
      const curDir = path.resolve(baseDir, parentDir, childDir)
      try {
        fs.mkdirSync(curDir)
      } catch (err) {
        if (err.code === 'EEXIST') { // curDir already exists!
          return curDir
        }
        // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
        if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
          throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`)
        }
        const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1
        if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
          throw err // Throw if it's just the last created dir.
        }
      }
      return curDir
    }, initDir)
  },
  slugify: (string) => {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple — with single -
      .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
  },
  // method below source: https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
  deleteFolderRecursive: (path) => {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file,index) => {
        var curPath = path + "/" + file
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          module.exports.deleteFolderRecursive(curPath)
        } else { // delete file
          fs.unlinkSync(curPath)
        }
      });
      fs.rmdirSync(path)
    }
  }
}
