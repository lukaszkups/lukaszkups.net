const content = require('./cms/content')
const _store = require('./cms/store')

content.getAllContent(_store).then(store => {
  // console.log(store)
  // console.log('-------')
  // console.log(store.lists[0])
  content.createOutputFolders(_store).then(() => {
    content.createOutputFiles(_store).then(() => {
      console.log('done.')
    })
  })
})
