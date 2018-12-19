const showdown = require('showdown')
const fs = require('fs')
const CONFIG = require('./../config')

const _mdConverter = new showdown.Converter({metadata: true})
_mdConverter.setFlavor('github')

module.exports = {
  getPages: (_store) => {
    return new Promise((resolve, reject) => {
      fs.readdir('./contents/', (err, files) => {
        if (!err) {
          let pagesArr = []
          let listsArr = []
          files.forEach(obj => {
            if (obj.includes('--page')) {
              pagesArr.push({
                id: listsArr.length + 1,
                path: `./contents/${obj}/index.md`,
                template: `./theme/${CONFIG.theme}/${obj}.pug`,
                contents: ''
              })
            } else if (obj.includes('--list')) {
              listsArr.push({
                id: listsArr.length + 1,
                path: `./contents/${obj}/index.md`,
                entriesPath: `./contents/${obj}/list/`,
                template: `./theme/${CONFIG.theme}/${obj}.pug`,
                entryTemplate: `./theme/${CONFIG.theme}/${obj}--entry.pug`,
                entries: []
              })
            }
          })
          _store.pages = pagesArr
          _store.lists = listsArr
          resolve(_store)
        } else {
          reject(err)
        }
      })
    })
  },
  getListEntries: (_path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(_path, (err, files) => {
        if (!err) {
          let contents = []
          let promises = []
          // console.log(3333, files)
          files.forEach((obj, index) => {
            promises.push(module.exports.getListEntryContents(`${_path}${obj}`, index))
            // console.log(4444, _path, obj)
            // fs.readFile(`${path}${obj}`, 'utf8', (err, data) => {
            //   if (!err) {
            //     console.log('data', data)
            //     contents.push({
            //       name: obj,
            //       path: path,
            //       contents: data
            //     })
            //   } else {
            //     throw new Error(err)
            //   }
            // })
          })
          Promise.all(promises).then(arr => {
            console.log(999, arr)
            resolve()
          })
          // console.log(contents)
          // return contents.sort((a, b) => a.name.localeCompare(b.name))
        } else {
          reject(err)
        }
      })
    })
  },
  getListEntryContents: (_path, _index) => {
    return new Promise((resolve, reject) => {
      fs.readFile(_path, 'utf8', (err, data) => {
        if (!err) {
          console.log('data', data)
          // contents.push({
          //   name: obj,
          //   path: path,
          //   contents: data
          // })
          const mdObj = _mdConverter.makeHtml(data)
          const obj = {
            id: _index,
            title: _mdConverter.getMetadata(),
            contents: mdObj
          }
          console.log(6666, obj)
          resolve(obj)
        } else {
          reject(err)
        }
      })
    })
  }
}
