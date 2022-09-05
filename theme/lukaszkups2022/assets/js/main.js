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

  // something special ;)

  const cvButton = document.querySelector('.download-cv-button');
  if (cvButton) {
    cvButton.addEventListener('click', (e) => {
      if (window.navigator.vibrate) {
        e.preventDefault();
        console.log('Kudos to https://github.com/hjdesigner/vibration-api/ :)');
        window.navigator.vibrate([
          87, 89, 104, 176,
          96, 176, 88, 88,
          79, 241, 176, 377,
          191]);
        window.open(e.target.href, '_blank').focus()
      } else {
        console.log('Try to download my CV on Chrome using Android device ;)');
      }
    })
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
        const pagination = document.getElementById('pagination')
        if (pagination) {
          pagination.style.display = 'none'
        }
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

  const years = document.querySelectorAll('.year')
  if (years && years.length) {
    years.forEach((year) => {
      year.innerText = new Date().getFullYear() - parseInt(year.getAttribute("data-year"));
    })
  }
})();