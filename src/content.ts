import * as fs from 'fs';
import showdown from 'showdown';
import pug from 'pug';
import CONFIG from './../config.json' assert { type: "json" };
import path from 'path';
import watch from 'node-watch';
import _helpers from './helpers.ts';

const _mdConverter = new showdown.Converter({metadata: true})
_mdConverter.setFlavor('github')

export const getPages = (_store: any) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.normalize('./contents/'), (err: any, files: any[]) => {
      if (!err) {
        let pagesArr: any[] = []
        let listsArr: any[] = []
        files.forEach(obj => {
          if (obj.includes('--page')) {
            pagesArr.push({
              id: listsArr.length + 1,
              path: path.normalize(`./contents/${obj}/index.md`),
              template: path.normalize(`./theme/${CONFIG.theme}/${obj}.pug`),
              meta: {},
              contents: ''
            })
          } else if (obj.includes('--list')) {
            listsArr.push({
              id: listsArr.length + 1,
              path: path.normalize(`./contents/${obj}/index.md`),
              entriesPath: path.normalize(`./contents/${obj}/list/`),
              template: path.normalize(`./theme/${CONFIG.theme}/${obj}.pug`),
              entryTemplate: path.normalize(`./theme/${CONFIG.theme}/${obj}--entry.pug`),
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
}

export const getListEntries = (_path: string, listObj: any) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.normalize(_path), (err: any, files: any) => {
      if (!err) {
        let promises: any[] = []
        files.forEach((obj: any, index: number) => {
          // @ts-ignore
          promises.push(getMdFileContents(`${_path}${obj}`, index, path.normalize(`./output/${listObj.slug}/`), listObj))
        })
        Promise.all(promises).then(arr => {
          if (CONFIG.excludeDrafts === true) {
            arr = arr.filter(obj => !obj.meta.draft)
          }
          resolve(arr.reverse())
        })
      } else {
        reject(err)
      }
    })
  })
}

export const getMdFileContents = (_path: string, _index: number, _parentOutputPath: string, parentObj: any) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.normalize(_path), 'utf8', (err: any, data: any) => {
      if (!err) {
        const mdObj = _mdConverter.makeHtml(data)
        const meta = _mdConverter.getMetadata() as any
        let obj = {
          id: _index + 1,
          meta: meta,
          slug: meta && meta.slug ? meta.slug : _helpers.slugify(meta.title || Date.now()),
          content: mdObj,
          output: '',
          url: '',
          template: ''
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
}
  
export const getAllContent = (_store: any) => {
  // @ts-ignore
  return getPages(_store).then(() => {
    let promises: any[] = []
    // get all lists file contents
    _store.lists.map((list: any, index: number) => {
      // @ts-ignore
      promises.push(getMdFileContents(list.path, index).then((obj: any)=> {
        _store.lists[index] = {..._store.lists[index], ...obj}
      }))
      // @ts-ignore
      promises.push(getListEntries(list.entriesPath, list).then((arr: any[]) => {
        _store.lists[index].entries = arr
        return Promise.resolve()
      }))
    })
    // get all pages file contents
    _store.pages.map((page: any, index: number) => {
      // @ts-ignore
      promises.push(getMdFileContents(page.path, index).then((obj: any) => {
        _store.pages[index] = {...page, ...obj}
      }))
    })
    // resolve all files, generate slugs/meta etc.
    return Promise.all(promises).then(() => {
      const listPromises: any[] = []
      // get all list entries contents
      _store.lists.map((list: any, index: number) => {
        // @ts-ignore
        listPromises.push(getListEntries(list.entriesPath, list).then((arr: any[]) => {
          _store.lists[index].entries = arr
          return Promise.resolve()
        }))
      })
      return Promise.all(listPromises).then(() => {
        return Promise.resolve(_store)
      })
    })
  })
}
  
export const compilePage = (pageObj: any) => {
  const compiled = pug.compileFile(pageObj.template)
  return compiled
}
  
export const createOutputFolders = (_store: any): Promise<void> => {
  let promises: any[] = []
  // create output folders for pages
  _store.pages.map((page: any) => {
    promises.push(new Promise((resolve: (value: void) => void, reject) => {
      try {
        _helpers.mkDirByPathSync(page.output.slice(0, -10))
        resolve();
      } catch (err) {
        reject(err)
      }
    }))
  })
  // create output folders list index
  _store.lists.map((list: any) => {
    promises.push(new Promise((resolve: (value: void) => void, reject) => {
      try {
        _helpers.mkDirByPathSync(list.output.slice(0, -10))
        resolve()
      } catch (err) {
        reject(err)
      }
    }))
  })
  // create output folders for list entries / pagination
  _store.lists.map((list: any) => {
    // if list has pagination
    // @ts-ignore
    if (CONFIG && CONFIG.pagination && CONFIG.pagination[list.slug]) {
      // @ts-ignore
      const perPage = CONFIG.pagination[list.slug]
      let pages = Math.ceil(list.entries.length / perPage)
      list.paginationLinks = []
      for (let i = 0; i < pages; i++) {
        // let first page doesn't have to contain page number
        list.paginationLinks.push(i === 0 ? list.output : `${list.output.slice(0, -11)}/${CONFIG.paginationSlug}${i + 1}/index.html`)
        // item[i + 1] = i === 0 ? list.output : `${list.output.slice(0, -11)}/${CONFIG.paginationSlug}${i + 1}/index.html`
        // list.paginationLinks.push(item)
        promises.push(new Promise((resolve: (value: void) => void, reject) => {
          try {
            _helpers.mkDirByPathSync(path.normalize(list.paginationLinks[i].slice(0, -10)))
            resolve()
          } catch (error) {
            reject(error)
          }
        }))
      }
    }
    // prepare folders for list entries
    list.entries.map((entry: any) => {
      promises.push(new Promise((resolve: (value: void) => void, reject) => {
        try {
          _helpers.mkDirByPathSync(path.normalize(entry.output.slice(0, -10)))
          resolve()
        } catch (error) {
          reject(error)
        }
      }))
    })
  })
  return Promise.all(promises).then(() => {
    return Promise.resolve(_store)
  })
}

export const  createOutputPageFiles = (_store: any, contentTemplateOptions = {}) => {
  let promises: Promise<void>[] = []
  _store.pages.map((page: any) => {
    promises.push(new Promise((resolve: (value: void) => void, reject) => {
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
      fs.writeFile(path.normalize(page.output), parsedContentTemplate, (err: any) => {
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
}
  
export const createListJsonFiles = (_store: any) => {
  let promises: Promise<void>[] = []
  _store.lists.map((list: any) => {
    promises.push(new Promise((resolve: (value: void) => void, reject) => {
      let url = list.output.split('/')
      url[url.length - 1] = 'list.json'
      url = `./${url.join('/')}`
      let entries = [...list.entries]
      let parsedList: any[] = []
      entries.map(entry => {
        parsedList.push({
          id: entry.id,
          title: entry.meta.title,
          date: entry.meta.date,
          category: entry.meta.category,
          tags: entry.meta.tags,
          url: entry.output.slice(6, -10)
        })
      })
      fs.writeFile(path.normalize(url), JSON.stringify({list: parsedList}), (err: any) => {
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
}
  
export const createOutputListIndexFiles = (_store: any, contentTemplateOptions = {}) => {
  let promises: Promise<void>[] = []
  _store.lists.map((list: any) => {
    // list template
    const contentTemplate = pug.compileFile(list.template)
    // list object
    let listObject = {
      title: list.meta && list.meta.title ? list.meta.title : '',
      date: list.meta && list.meta.date ? list.meta.date : '',
      tags: list.meta && list.meta.tags ? list.meta.tags : '',
      description: list.meta && list.meta.description ? list.meta.description : '',
      list: list.entries || [],
      content: list.content,
      meta: list.meta || {},
      ...contentTemplateOptions,
    }
    // add pagination helper property if list has configured pagination feature
    if (list.paginationLinks && list.paginationLinks.length > 1) {
      // @ts-ignore
      listObject.paginationLinks = []
      list.paginationLinks.map((link: string) => {
        // @ts-ignore
        listObject.paginationLinks.push(`${link.slice(8, -10)}`)
      })
    }
    // page size variable
    // @ts-ignore
    const pageSize = CONFIG.pagination[list.slug]
    // if list has pagination
    if (list.paginationLinks && list.paginationLinks.length > 1) {
      list.paginationLinks.map((page: any, index: number) => {
        const paginatedListOfEntries = list && list.entries ? list.entries.slice(index * pageSize, (index + 1) * pageSize) : []
        listObject.list = paginatedListOfEntries || []
        // add also active page helper property
        // @ts-ignore
        listObject.currentPage = index + 1
        promises.push(new Promise((resolve, reject) => {
          const parsedContentTemplate = contentTemplate(listObject)
          fs.writeFile(path.normalize(page), parsedContentTemplate, (err: any) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        }))
      })
    } else {
      // if list doesn't have pagination
      promises.push(new Promise((resolve: (value: void) => void, reject) => {
        const parsedContentTemplate = contentTemplate(listObject)
        fs.writeFile(path.normalize(list.output), parsedContentTemplate, (err: any) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }))
    }
  })
  return Promise.all(promises).then(() => {
    return Promise.resolve(_store)
  })
}

export const createOutputListEntryFiles = (_store: any, contentTemplateOptions = {}) => {
  let promises: Promise<void>[] = []
  _store.lists.map((list: any) => {
    list.entries.map((entry: any) => {
      promises.push(new Promise((resolve: (value: void) => void, reject) => {
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
        fs.writeFile(path.normalize(entry.output), parsedContentTemplate, (err: any) => {
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
}

export const createOutputFiles = (_store: any) => {
  // @ts-ignore
  return createOutputPageFiles(_store).then(() => {
    // @ts-ignore
    return createOutputListIndexFiles(_store).then(() => {
      // @ts-ignore
      return createOutputListEntryFiles(_store).then(() => {
        // @ts-ignore
        return prepareAssets().then(() => {
          return Promise.resolve(_store)
        })
      })
    })
  })
}
  
export const prepareAssets = () => {
  _helpers.mkDirByPathSync('./output/assets/css')
  _helpers.mkDirByPathSync('./output/assets/js')
  _helpers.mkDirByPathSync('./output/assets/img')
  _helpers.mkDirByPathSync('./output/assets/fonts')
  _helpers.mkDirByPathSync('./output/static/')
  _helpers.mkDirByPathSync('./output/vendor/')
  let promises = []
  // copy image assets
  promises.push(_helpers.copyFolderContents(`./theme/${CONFIG.theme}/assets/img/`, './output/assets/img/'))
  // copy fonts assets
  promises.push(_helpers.copyFolderContents(`./theme/${CONFIG.theme}/assets/fonts/`, './output/assets/fonts/'))
  // copy content images/static files
  promises.push(_helpers.copyFolderContents('./contents/static/', './output/static/'))
  // copy vendor files
  promises.push(_helpers.copyFolderRecursively(CONFIG.vendorsPath || `./theme/${CONFIG.theme}/vendor/`, './output/vendor/'))
  // compile sass
  promises.push(_helpers.compileSass(`./theme/${CONFIG.theme}/assets/css/main.sass`, './output/assets/css/main.css'))
  // compile js
  promises.push(_helpers.uglifyJs(`./theme/${CONFIG.theme}/assets/js/main.js`, './output/assets/js/main.js'))
  return Promise.all(promises).then(() => {
    return Promise.resolve()
  })
}

export const moveRootFolder = () => {
  return new Promise((resolve: (value: void) => void) => {
    if (CONFIG.rootFolder) {
      _helpers.copyFolderContents(`./output/${CONFIG.rootFolder}/`, `./output/`).then(() => {
        resolve()
      })
    } else {
      console.log('No root page folder has been defined in CONFIG file.')
      resolve()
    }
  })
}

export const compile = (_store: any) => {
  // @ts-ignore
  return getAllContent(_store).then(() => {
    // @ts-ignore
    return createOutputFolders(_store).then(() => {
      // @ts-ignore
      return createOutputFiles(_store).then(() => {
        // @ts-ignore
        return createListJsonFiles(_store).then(() => {
          // @ts-ignore
          return moveRootFolder()
        })
      })
    })
  })
}

export const compileOnce = (_store: any) => {
  // _helpers.deleteFolderRecursive('./output/') // empty output folder for new content
  // @ts-ignore
  return compile(_store)
}

export const watchForChanges = (_store: any) => {
  _helpers.startServer()
  // @ts-ignore
  compileOnce(_store).then(() => {
    console.log('Initial compile completed.')
    // @ts-ignore
    watch([path.normalize('./contents/'), path.normalize(`./theme/${CONFIG.theme}/`)], {recursive: true}, (evt: any, name: string) => {
      const urlArr = name.split(path.sep)
      console.log(name)
      // recompile pages only
      if (name.includes('contents')) {
        if (name.includes('--page')) {
          // @ts-ignore
          getAllContent(_store).then((_store: any) => {
            // @ts-ignore
            createOutputFolders(_store).then(() => {
              // @ts-ignore
              createOutputPageFiles(_store).then(() => {
                // @ts-ignore
                moveRootFolder().then(() => {
                  console.log('Pages recompiled.')
                })
              })
            })
          })
        // recompile list entries & list index files
        } else if (urlArr.includes('list')) {
          // @ts-ignore
          getAllContent(_store).then((_store: any) => {
            // @ts-ignore
            createOutputFolders(_store).then(() => {
              // @ts-ignore
              createOutputListIndexFiles(_store).then(() => {
                // @ts-ignore
                createOutputListEntryFiles(_store).then(() => {
                  // @ts-ignore
                  createListJsonFiles(_store).then(() => {
                    // @ts-ignore
                    moveRootFolder().then(() => {
                      console.log('List entries recompiled.')
                    })
                  })
                })
              })
            })
          })
        // recompile list index files
        } else if (name.includes('--list')) {
          // @ts-ignore
          getAllContent(_store).then(() => {
            // @ts-ignore
            createOutputFolders(_store).then(() => {
              // @ts-ignore
              createOutputListIndexFiles(_store).then(() => {
                // @ts-ignore
                moveRootFolder().then(() => {
                  console.log('List indexes recompiled.')
                })
              })
            })
          })
        }
      // recompile assets
      } else if (urlArr.includes('assets')){
        // @ts-ignore
        prepareAssets().then(() => {
          console.log('Static assets recompiled.')
        })
      } else {
        // @ts-ignore
        compile(_store)
        console.log('Templates recompiled.')
      }
    })
  })
}

// export const init = (_store: any) => {
//   // @ts-ignore 
//   server(_store)
// }
