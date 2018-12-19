const pages = require('./cms/pages')
const store = require('./cms/store')

pages.getPages(store).then(resp => {
  store.lists.map(list => {
    pages.getListEntries(list.entriesPath)
  })
})
