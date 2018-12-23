const showdown = require('showdown')
const fs = require('fs')
const pug = require('pug')
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
                meta: {},
                contents: ''
              })
            } else if (obj.includes('--list')) {
              listsArr.push({
                id: listsArr.length + 1,
                path: `./contents/${obj}/index.md`,
                entriesPath: `./contents/${obj}/list/`,
                template: `./theme/${CONFIG.theme}/${obj}.pug`,
                entryTemplate: `./theme/${CONFIG.theme}/${obj}--entry.pug`,
                meta: {},
                contents: '',
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
  getListEntries: (_path, listObj) => {
    return new Promise((resolve, reject) => {
      fs.readdir(_path, (err, files) => {
        if (!err) {
          let contents = []
          let promises = []
          files.forEach((obj, index) => {
            promises.push(module.exports.getMdFileContents(`${_path}${obj}`, index, `./cms/output/${listObj.slug}/`))
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
  getMdFileContents: (_path, _index, _parentOutputPath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(_path, 'utf8', (err, data) => {
        if (!err) {
          const mdObj = _mdConverter.makeHtml(data)
          const meta = _mdConverter.getMetadata()
          let obj = {
            id: _index + 1,
            meta: meta,
            slug: meta && meta.slug ? meta.slug : module.exports.slugify(meta.title || Date.now()),
            content: mdObj
          }
          obj.output = _parentOutputPath ? `${_parentOutputPath}${obj.slug}/index.html` :`./cms/output/${obj.slug}/index.html`
          resolve(obj)
        } else {
          reject(err)
        }
      })
    })
  },
  getAllContent: (_store) => {
    return module.exports.getPages(_store).then(() => {
      let promises = []
      // get all lists file contents
      _store.lists.map((list, index) => {
        promises.push(module.exports.getMdFileContents(list.path, index).then(obj => {
          _store.lists[index] = {..._store.lists[index], ...obj}
        }))
        promises.push(module.exports.getListEntries(list.entriesPath, list).then(arr => {
          _store.lists[index].entries = arr
          return Promise.resolve()
        }))
      })
      // get all pages file contents
      _store.pages.map((page, index) => {
        promises.push(module.exports.getMdFileContents(page.path, index).then(obj => {
          _store.pages[index] = {...page, ...obj}
        }))
      })
      // resolve all files, generate slugs/meta etc.
      return Promise.all(promises).then(() => {
        const listPromises = []
        // get all list entries contents
        _store.lists.map((list, index) => {
          listPromises.push(module.exports.getListEntries(list.entriesPath, list).then(arr => {
            _store.lists[index].entries = arr
            return Promise.resolve()
          }))
        })
        return Promise.all(listPromises).then(() => {
          return Promise.resolve(_store)
        })
      })
    })
  },
  compilePage: (pageObj) => {
    const compiled = pug.compileFile(pageObj.template)
    return compiled
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
  }
}
