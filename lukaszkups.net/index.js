const content = require('./cms/content')
const store = require('./cms/store')

content.getAllContent(store).then(r => {
  // console.log(r)
  // console.log('-------')
  console.log(store.lists[0])
})
