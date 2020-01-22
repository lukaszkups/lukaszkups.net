(() => {
  // footer
  const year = document.getElementById('year')
  if (year) {
    year.innerText = new Date().getFullYear()
  }

  //  blog / notes
  const filterNotesByCategory = (category, list) => {
    const notesWrapper = document.querySelector('#notes-list ul.notes')
    notesWrapper.innerHTML = `${list.filter(entry => entry.category.includes(category)).map(entry => `
      <li><a href='${entry.url}'><div class='txt'><span>${entry.date}</span> - ${entry.title}</div><div class='bg'></div></a></li>
    `).join('')}`
  }

  const filterNotesByTag = (tag, list) => {
    const notesWrapper = document.querySelector('#notes-list ul.notes')
    notesWrapper.innerHTML = `${list.filter(entry => entry.tags.includes(tag)).map(entry => `
      <li><a href='${entry.url}'><div class='txt'><span>${entry.date}</span> - ${entry.title}</div><div class='bg'></div></a></li>
    `).join('')}`
  }

  // notes filtering
  if (location.pathname === '/notes/') {
    const params = new URLSearchParams(location.search)
    const category = params.get('category')
    const tag = params.get('tag')
    // get full entry list if needed
    if ((category !== null && category.length) || (tag !== null && tag.length)) {
      fetch('/notes/list.json').then(resp => resp.json()).then(data => {
        const entryList = data && data.list && data.list.length ? data.list : []
        // remove current notes entry, calendars and hide pagination
        const notesWrapper = document.querySelector('#notes-list ul.notes')
        if (notesWrapper) {
          notesWrapper.innerHTML = ''
        }
        document.getElementById('pagination').style.display = 'none'
        // handle filtering
        if (category !== null && category.length) {
          filterNotesByCategory(category.toLowerCase(), entryList)
        } else if (tag !== null && tag.length) {
          filterNotesByTag(tag.toLowerCase(), entryList)
        }
      }).catch(err => {
        throw new Error(err)
      })
    }
  }
  // toggle color mode
  // document.getElementById('logo').addEventListener('click', (e) => {
  //   e.preventDefault()
  //   let mode = localStorage.getItem('dark-mode')
  //   if (mode === 'true') {
  //     localStorage.removeItem('dark-mode')
  //     document.body.classList.remove('dark')
  //   } else {
  //     localStorage.setItem('dark-mode', 'true')
  //     document.body.classList.add('dark')
  //   }
  // })
  // // get color mode
  // if (localStorage && localStorage.getItem('dark-mode')) {
  //   document.body.classList.add('dark')
  // } else {
  //   document.body.classList.remove('dark')
  // }
})();
