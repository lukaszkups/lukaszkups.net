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
          files.forEach((obj, index) => {
            promises.push(module.exports.getListEntryContents(`${_path}${obj}`, index))
          })
          Promise.all(promises).then(arr => {
            resolve(arr)
          })
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
          const mdObj = _mdConverter.makeHtml(data)
          const obj = {
            id: _index,
            meta: _mdConverter.getMetadata(),
            contents: mdObj
          }
          resolve(obj)
        } else {
          reject(err)
        }
      })
    })
  },
  getAllContent: (_store) => {
    return module.exports.getPages(_store).then(resp => {
      let promises = []
      _store.lists.map(list => {
        promises.push(module.exports.getListEntries(list.entriesPath).then((arr) => {
          list.entries = arr
          return Promise.resolve()
        }))
      })
      return Promise.all(promises).then(() => {
        return Promise.resolve(_store)
      })
    })
  }
}
