const showdown = require('showdown')
const fs = require('fs')
const pug = require('pug')
const CONFIG = require('./../config')
const _helpers = require('./helpers')

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
            promises.push(module.exports.getMdFileContents(`${_path}${obj}`, index, `./output/${listObj.slug}/`, listObj))
          })
          Promise.all(promises).then(arr => {
            resolve(arr.reverse())
          })
        } else {
          reject(err)
        }
      })
    })
  },
  getMdFileContents: (_path, _index, _parentOutputPath, parentObj) => {
    return new Promise((resolve, reject) => {
      fs.readFile(_path, 'utf8', (err, data) => {
        if (!err) {
          const mdObj = _mdConverter.makeHtml(data)
          const meta = _mdConverter.getMetadata()
          let obj = {
            id: _index + 1,
            meta: meta,
            slug: meta && meta.slug ? meta.slug : _helpers.slugify(meta.title || Date.now()),
            content: mdObj
          }
          obj.output = _parentOutputPath ? `${_parentOutputPath}${obj.slug}/index.html` :`./output/${obj.slug}/index.html`
          if (parentObj && parentObj.slug) {
            obj.url = `/${parentObj.slug}/${obj.slug}/`
          }
          if (parentObj && parentObj.entryTemplate) {
            obj.template = parentObj.entryTemplate
          }
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
  createOutputFolders: (_store) => {
    let promises = []
    _store.pages.map(page => {
      promises.push(new Promise((resolve, reject) => {
        try {
          _helpers.mkDirByPathSync(page.output.slice(0, -10))
          resolve()
        } catch (err) {
          reject(err)
        }
      }))
    })
    _store.lists.map(list => {
      promises.push(new Promise((resolve, reject) => {
        try {
          _helpers.mkDirByPathSync(list.output.slice(0, -10))
          resolve()
        } catch (err) {
          reject(err)
        }
      }))
    })
    _store.lists.map(list => list.entries.map(entry => {
      promises.push(new Promise((resolve, reject) => {
        try {
          _helpers.mkDirByPathSync(entry.output.slice(0, -10))
          resolve()
        } catch (error) {
          reject(error)
        }
      }))
    }))
    return Promise.all(promises).then(() => {
      return Promise.resolve(_store)
    })
  },
  createOutputPageFiles: (_store, contentTemplateOptions = {}) => {
    let promises = []
    _store.pages.map(page => {
      promises.push(new Promise((resolve, reject) => {
        const contentTemplate = pug.compileFile(page.template)
        const parsedContentTemplate = contentTemplate({
          title: page.meta && page.meta.title ? page.meta.title : '',
          date: page.meta && page.meta.date ? page.meta.date : '',
          tags: page.meta && page.meta.tags ? page.meta.tags : '',
          description: page.meta && page.meta.description ? page.meta.description : '',
          content: page.content,
          meta: page.meta || {},
          ...contentTemplateOptions
        })
        fs.writeFile(page.output, parsedContentTemplate, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }))
    })
    return Promise.all(promises).then(() => {
      return Promise.resolve(_store)
    })
  },
  createOutputListIndexFiles: (_store, contentTemplateOptions = {}) => {
    let promises = []
    _store.lists.map(list => {
      promises.push(new Promise((resolve, reject) => {
        const contentTemplate = pug.compileFile(list.template)
        const parsedContentTemplate = contentTemplate({
          title: list.meta && list.meta.title ? list.meta.title : '',
          date: list.meta && list.meta.date ? list.meta.date : '',
          tags: list.meta && list.meta.tags ? list.meta.tags : '',
          description: list.meta && list.meta.description ? list.meta.description : '',
          list: list.entries || [],
          content: list.content,
          meta: list.meta || {},
          ...contentTemplateOptions
        })
        fs.writeFile(list.output, parsedContentTemplate, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }))
    })
    return Promise.all(promises).then(() => {
      return Promise.resolve(_store)
    })
  },
  createOutputListEntryFiles: (_store, contentTemplateOptions = {}) => {
    let promises = []
    _store.lists.map(list => {
      list.entries.map(entry => {
        promises.push(new Promise((resolve, reject) => {
          const contentTemplate = pug.compileFile(entry.template)
          const parsedContentTemplate = contentTemplate({
            title: entry.meta && entry.meta.title ? entry.meta.title : '',
            date: entry.meta && entry.meta.date ? entry.meta.date : '',
            tags: entry.meta && entry.meta.tags ? entry.meta.tags : '',
            description: entry.meta && entry.meta.description ? entry.meta.description : '',
            content: entry.content,
            meta: entry.meta || {},
            ...contentTemplateOptions
          })
          fs.writeFile(entry.output, parsedContentTemplate, (err) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        }))
      })
    })
    return Promise.all(promises).then(() => {
      return Promise.resolve(_store)
    })
  },
  createOutputFiles: (_store) => {
    return module.exports.createOutputPageFiles(_store).then(() => {
      return module.exports.createOutputListIndexFiles(_store).then(() => {
        return module.exports.createOutputListEntryFiles(_store).then(() => {
          return module.exports.prepareAssets().then(() => {
            return Promise.resolve(_store)
          })
        })
      })
    })
  },
  prepareAssets: () => {
    _helpers.mkDirByPathSync('./output/assets/css')
    _helpers.mkDirByPathSync('./output/assets/js')
    _helpers.mkDirByPathSync('./output/assets/img')
    _helpers.mkDirByPathSync('./output/static/')
    _helpers.mkDirByPathSync('./output/vendor/')
    let promises = []
    // copy image assets
    promises.push(_helpers.copyFolderContents(`./theme/${CONFIG.theme}/assets/img/`, './output/assets/img/'))
    // copy content images/static files
    promises.push(_helpers.copyFolderContents('./contents/static/', './output/static/'))
    // copy vendor files
    promises.push(_helpers.copyFolderContents(CONFIG.vendorsPath || `./theme/${CONFIG.theme}/vendor/`, './output/vendor/'))
    // compile sass
    promises.push(_helpers.compileSass(`./theme/${CONFIG.theme}/assets/css/main.sass`, './output/assets/css/main.css'))
    // compile js
    promises.push(_helpers.uglifyJs(`./theme/${CONFIG.theme}/assets/js/main.js`, './output/assets/js/main.js'))
    return Promise.all(promises).then(() => {
      return Promise.resolve()
    })
  },
  moveRootFolder: () => {
    return new Promise((resolve, reject) => {
      if (CONFIG.rootFolder) {
        _helpers.copyFolderContents(`./output/${CONFIG.rootFolder}/`, `./output/`).then(() => {
          resolve()
        })
      } else {
        console.log('No root page folder has been defined in CONFIG file.')
        resolve()
      }
    })
  },
  init: (_store) => {
    _helpers.deleteFolderRecursive('./output/') // empty output folder for new content
    module.exports.getAllContent(_store).then(store => {
      module.exports.createOutputFolders(_store).then(() => {
        module.exports.createOutputFiles(_store).then(() => {
          module.exports.moveRootFolder().then(() => {
            console.log('Content compiled.')
            if (CONFIG.recompile === true) {
              setInterval(() => {
                module.exports.createOutputFolders(_store).then(() => {
                  module.exports.createOutputFiles(_store).then(() => {
                    module.exports.moveRootFolder().then(() => {
                      console.log('Content recompiled.', Date.now())
                    })
                  })
                })
              }, CONFIG.recompileInterval || 60000)
            }
            console.log(_store)
            _helpers.startServer()
          })
        })
      })
    })
  }
}
