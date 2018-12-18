const CONFIG = require('./../config')
const BUILD_FILE = require('./../build.json')
const fs = require('fs')

module.exports = {
  getPages: () => {
    return fs.readdirSync('./contents/', (err, files) => {
      if (!err) {
        let pagesArr = []
        let listsArr = []
        files.forEach(obj => {
          console.log(obj)
          if (obj.includes('--page')) {
            pagesArr.push({
              file: `./contents/${obj}/index.md`,
              template: `./theme/${CONFIG.theme}/${obj}.pug`
            })
          } else if (obj.includes('--list')) {
            const entries = module.exports.getListEntries(`./contents/${obj}/list/`)
            console.log(entries)
            listsArr.push({
              listFile: `./contents/${obj}/index.md`,
              listEntries: `./contents/${obj}/list/`,
              listTemplate: `./theme/${CONFIG.theme}/${obj}.pug`,
              listEntryTemplate: `./theme/${CONFIG.theme}/${obj}--entry.pug`,
              entries: entries
            })
          }
        })
        let buildJson = BUILD_FILE
        buildJson.pages = pagesArr
        buildJson.lists = listsArr
        return fs.writeFileSync('./build.json', JSON.stringify(buildJson), err => {
          if (err) {
            throw new Error(err)
          }
        })
      } else {
        throw new Error(err)
      }
    })
  },
  getListEntries: (path) => {
    return fs.readdirSync(path, (err, files) => {
      if (!err) {
        let contents = []
        console.log(123, files)
        files.forEach(obj => {
          console.log(obj)
          fs.readFileSync(`${path}${obj}`,  (err, data) => {
            if (!err) {
              contents.push({
                name: obj,
                path: path,
                contents: data
              })
            } else {
              throw new Error(err)
            }
          })
        })
        console.log(contents)
        return contents.sort((a, b) => a.name.localeCompare(b.name))
      } else {
        throw new Error(err)
      }
    })
  }
}
