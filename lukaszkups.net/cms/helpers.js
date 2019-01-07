const fs = require('fs')
const path = require('path')
const http = require('http-server')
const sass = require('node-sass')
const UglifyJS = require('uglify-es')
const CONFIG = require('./../config')

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
  },
  compileSass: (_source, _target) => {
    return new Promise((resolve, reject) => {
      sass.render({
        file: _source,
        outputStyle: 'compressed',
        indentedSyntax: CONFIG.indentedSass || false
      }, (err, result) => {
        if (err) {
          reject(err)
        } else {
          fs.writeFile(_target, result && result.css ? result.css : '', (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        }
      })
    })
  },
  uglifyJs: (_source, _target) => {
    return new Promise((resolve, reject) => {
      fs.readFile(_source, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const uglified = UglifyJS.minify(data, {
            ie8: CONFIG.ie8support || false
          })
          if (uglified && uglified.error) {
            reject(uglified.error)
          } else if (uglified && uglified.code) {
            fs.writeFile(_target, uglified.code, (error) => {
              if (error) {
                reject(error)
              } else {
                resolve()
              }
            })
          }
        }
      })
    })
  },
  copyFolderContents: (_sourcePath, _targetPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(_sourcePath, (err, files) => {
        if (!err) {
          let promises = []
          files.forEach(file => {
            promises.push(new Promise((resolve, reject) => {
              const sourceFile = `${_sourcePath}${file}`
              const targetFile = `${_targetPath}${file}`
              fs.writeFile(targetFile, fs.readFileSync(sourceFile), (err) => {
                if (err) {
                  reject(err)
                } else {
                  resolve()
                }
              })
            }))
          })
          Promise.all(promises).then(() => {
            resolve()
          })
        } else {
          reject(err)
        }
      })
    })
  },
  startServer: () => {
    const server = http.createServer({root: './output/'})
    server.listen(3002)
    console.log('Output folder is now served under http://localhost:3000')
  }
}
