import * as fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import http from 'http-server';
import sass from 'node-sass';
import UglifyJS from 'uglify-es';
import CONFIG from './../config.json' assert { type: "json" };

export interface KeyableInterface {
  [key: string]: any;
}

export default {
  // method below source: https://stackoverflow.com/a/40686853/1004946
  mkDirByPathSync: (targetDir: string, { isRelativeToScript = false } = {}) => {
    const sep = path.sep
    const initDir = path.isAbsolute(targetDir) ? sep : ''
    const baseDir = isRelativeToScript ? __dirname : '.'
    return targetDir.split(sep).reduce((parentDir, childDir) => {
      const curDir = path.resolve(baseDir, parentDir, childDir)
      try {
        fs.mkdirSync(curDir)
      } catch (err: any) {
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
  slugify: (txt: string) => {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return txt.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple — with single -
      .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
  },
  // method below source: https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
  deleteFolderRecursive: (url: string) => {
    if (fs.existsSync(url)) {
      fs.readdirSync(url).forEach((file) => {
        var curPath = url + "/" + file
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          module.exports.deleteFolderRecursive(path.normalize(curPath))
        } else { // delete file
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(url)
    }
  },
  compileSass: (_source: any, _target: any) => {
    return new Promise((resolve, reject) => {
      sass.render({
        file: _source,
        outputStyle: 'compressed',
        indentedSyntax: CONFIG.indentedSass || false
      }, (err: any, result: any) => {
        if (err) {
          reject(err)
        } else {
          fs.writeFile(path.normalize(_target), result && result.css ? result.css : '', (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          });
        }
      })
    })
  },
  uglifyJs: (_source: any, _target: any) => {
    return new Promise((resolve: (value: void) => void, reject) => {
      fs.readFile(path.normalize(_source), 'utf8', (err, data) => {
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
  copyFolderContents: (_sourcePath: string, _targetPath: string) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path.normalize(_sourcePath), (err, files) => {
        if (!err) {
          let promises: Promise<void>[] = []
          files.forEach(file => {
            promises.push(new Promise((resolve: (value: void) => void, reject) => {
              const sourceFile = `${_sourcePath}${file}`
              const targetFile = `${_targetPath}${file}`
              fs.writeFile(path.normalize(targetFile), fs.readFileSync(path.normalize(sourceFile))  , (err) => {
                if (err) {
                  reject(err)
                } else {
                  resolve()
                }
              })
            }))
          })
          Promise.all(promises).then(() => {
            // @ts-ignore
            resolve()
          })
        } else {
          reject(err)
        }
      })
    })
  },
  copyFolderRecursively: (_sourcePath: string, _targetPath: string) => {
    return new Promise((resolve: (value: void) => void, reject) => {
      fse.copy(path.normalize(_sourcePath), path.normalize(_targetPath)).then(() => {
        resolve()
      }).catch((err: any) => {
        reject(err)
      })
    })
  },
  startServer: () => {
    const server = http.createServer({root: './output/'})
    // @ts-ignore
    server.listen(CONFIG.port || 3000)
    // @ts-ignore
    console.log(`Output folder is now served under http://localhost:${CONFIG.port || 3000}`)
  },
}
