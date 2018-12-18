const CONFIG = require('./../config')
const BUILD_FILE = require('./../build.json')
const fs = require('fs')

module.exports = {
  getPages: () => {
    return fs.readdir('./contents/', (err, files) => {
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
            listsArr.push({
              listFile: `./contents/${obj}/index.md`,
              listEntries: `./contents/${obj}/list/`,
              listTemplate: `./theme/${CONFIG.theme}/${obj}.pug`,
              listEntryTemplate: `./theme/${CONFIG.theme}/${obj}--entry.pug`
            })
          }
        })
        let buildJson = BUILD_FILE
        buildJson.pages = pagesArr
        buildJson.lists = listsArr
        return fs.writeFile('./build.json', JSON.stringify(buildJson), err => {
          if (err) {
            throw new Error(err)
          }
        })
      } else {
        throw new Error(err)
      }
    })
  }
}
