(() => {
  // home page
  const homeTitleAnimation = (domElement) => {
    let text = domElement.innerText
    const len = text.length
    let pos = 0
    let cloneTxt = ''
    text.split('').map(char => {
      cloneTxt += `<span>${char}</span>`
    })
    domElement.innerHTML = cloneTxt
    const chars = Array.prototype.slice.call(domElement.querySelectorAll('span'))
    const animate = () => {
      chars.map(char => {
        const trueOrFalse = Math.random() >= 0.5
        if (trueOrFalse) {
          char.classList.add('white')
        } else {
          char.classList.remove('white')
        }
      })
    }
    setInterval(() => {
      animate()
    }, 1250)
  }
  const domElement = document.getElementById('home-tag')
  if (domElement) {
    homeTitleAnimation(domElement)
  }

  // experience page
  const drawMapPoints = (domElement, pointsList) => {
    // to make map points responsive, dimensions are calculated like for 1400px/700px map image
    const mapWidth = domElement.offsetWidth
    const leftModifier = mapWidth / 1400
    const topModifier = (mapWidth / 2) / 700
    domElement.style.height = `${(mapWidth / 2)}px`
    pointsList.map((point, index) => {
      let domPoint = document.createElement('div')
      domPoint.classList = ['point']
      domPoint.dataset.projects = point.projects
      domPoint.style.top = `${(topModifier * point.top)}px`
      domPoint.style.left = `${leftModifier * point.left}px`
      domPoint.title = point.country
      domElement.appendChild(domPoint)
    })
    // add resize event to recalculate map points
    window.addEventListener('resize', function () {
      const domPoints = domElement.querySelectorAll('.point')
      const mapWidth = domElement.offsetWidth
      const leftModifier = mapWidth / 1400
      const topModifier = (mapWidth / 2) / 700
      domElement.style.height = `${(mapWidth / 2)}px`
      domPoints.forEach((point, index) => {
        point.style.top = `${(pointsList[index].top * topModifier)}px`
        point.style.left = `${(pointsList[index].left * leftModifier)}px`
      })
    })
    // show info about point
    const showPointInfo = (info, name) => {
      const infoDom = document.getElementById('point-info')
      let text = `<p>${name}</p><ul>`
      info.split(',').map(obj => {
        text += `<li>${obj}</li>`
      })
      text += '</ul><div><small>*Due to some NDA related stuff I don\'t display exact project names here (if you want to learn more feel free to contact).</small></div>'
      infoDom.innerHTML = text
      infoDom.classList.add('point-info--active')
      infoDom.classList.add('point-info--visible')
    }
    // filter method triggered by bottom buttons
    const filterMapPoints = (filter) => {
      // remove any existing filters
      domPoints.forEach(_point => {
        _point.classList.remove('point--active')
        _point.classList.remove('point--hidden')
        if (filter && !_point.dataset.projects.toLowerCase().includes(filter)) {
          _point.classList.add('point--hidden')
        }
      })
    }
    // hide point info
    const hidePointInfo = () => {
      const infoDom = document.getElementById('point-info')
      infoDom.classList.remove('point-info--active')
      // add timeout to let it hide first
      setTimeout(() => {
        infoDom.innerHTML = ''
        infoDom.classList.remove('point-info--visible')
      }, 1000)
      // remove map points filtering
      filterMapPoints()
    }
    // bind events to hide point info
    document.getElementById('point-info').addEventListener('click', () => {
      hidePointInfo()
    })
    document.querySelector('#point-info + .shadow').addEventListener('click', () => {
      hidePointInfo()
    })
    // bind toggle points visibility
    const domPoints = domElement.querySelectorAll('.point')
    domPoints.forEach(point => {
      point.addEventListener('click', function (event) {
        event.preventDefault()
        const activeFilterButton = document.querySelector('#experience-filter li.active-filter')
        if (activeFilterButton) {
          activeFilterButton.classList.remove('active-filter')
        }
        if (event.currentTarget.classList.contains('point--active')) {
          event.currentTarget.classList.remove('point--active')
          domPoints.forEach(_point => {
            _point.classList.remove('point--hidden')
          })
          hidePointInfo()
        } else {
          event.currentTarget.classList.add('point--active')
          showPointInfo(event.currentTarget.dataset.projects, event.currentTarget.title)
          domPoints.forEach(_point => {
            if (_point.title !== event.currentTarget.title) {
              _point.classList.add('point--hidden')
            }
          })
        }
      })
    })
  }
  const points = [
    {top: 150, left: 630, country: 'Poland', projects: ['10+ websites', '2 mobile applications', '10+ design works']},
    {top: 155, left: 572, country: 'London', projects: ['2 websites']},
    {top: 200, left: 290, country: 'New York', projects: ['1 website']},
    {top: 160, left: 585, country: 'Rotterdam', projects: ['3 websites']},
    {top: 172, left: 578, country: 'Paris', projects: ['2 websites']},
    {top: 300, left: 220, country: 'Cayman Islands', projects: ['1 website']},
    {top: 150, left: 615, country: 'Berlin', projects: ['1 website', '1 design work']},
    {top: 165, left: 622, country: 'Prague', projects: ['1 website', '1 design work']}
  ]
  const mapDomElement = document.getElementById('experience-map')
  if (mapDomElement) {
    drawMapPoints(mapDomElement, points)
  }

  // notes list page
  const printMonth = (month, year) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let stringBuffer = []
    stringBuffer.push(`<table data-date='${year}-${month}'><thead><tr><th colspan='7'>${monthNames[month - 1]} ${year}</th></tr></thead><tbody>`)
    const daysInMonth = new Date(year, month, 0).getDate()
    const firstMonthDay = new Date(year, month - 1, 1).getDay()
    // append proper amount of blank cells (depends which week day starts the month)
    if (firstMonthDay === 0) {
      stringBuffer.push('<tr><td></td><td></td><td></td><td></td><td></td><td></td>')
    } else {
      let stringHelper = '<tr>'
      for (let i = 1; i < firstMonthDay; i++) {
        stringHelper += '<td></td>'
      }
      stringBuffer.push(stringHelper)
    }
    for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
      let currentMonthDay = new Date(year, month - 1, currentDay).getDay()
      if (currentMonthDay === 1 && currentDay !== 1) {
        stringBuffer.push('<tr>')
      }
      stringBuffer.push(`<td class='day--active' data-date='${year}-${month}-${currentDay}'>${currentDay}</td>`)
      if (currentMonthDay === 0) {
        stringBuffer.push('</tr>')
      }
    }
    stringBuffer.push('</tbody></table>')
    return stringBuffer.join('')
  }
  // mark days with notes in calendars
  const markDaysWithNotes = (calendars, notes) => {
    calendars.forEach(calendar => {
      const cellDate = calendar.dataset.date
      const dateHasNotes = [...notes].find(obj => obj.dataset.date === cellDate)
      if (dateHasNotes) {
        calendar.classList.add('day--has-notes')
      }
    })
  }
  // add interactivity to calendar and notes list
  const bindCalendarFiltering = () => {
    const calendars = document.querySelectorAll('#calendar-wrapper table tbody td')
    const notes = document.querySelectorAll('#notes-list ul li')
    markDaysWithNotes(calendars, notes)
    calendars.forEach(calendar => {
      calendar.addEventListener('click', function(event) {
        event.preventDefault()
        let cell = event.currentTarget
        if (cell.classList.contains('day--selected')) {
          // remove previous filter classes
          calendars.forEach(cell => {
            cell.classList.remove('day--selected')
          })
          document.getElementById('notes-list').classList.remove('notes-list--filtered')
          notes.forEach(entry => {
            entry.classList.remove('entry--filtered')
          })
        } else {
          // remove previous filter classes
          calendars.forEach(cell => {
            cell.classList.remove('day--selected')
          })
          document.getElementById('notes-list').classList.add('notes-list--filtered')
          notes.forEach(entry => {
            if (entry.dataset.date === cell.dataset.date) {
              entry.classList.add('entry--filtered')
            } else {
              entry.classList.remove('entry--filtered')
            }
          })
          cell.classList.add('day--selected')
        }
      })
    })
  }
  const drawCalendars = (notes) => {
    let renderedCalendars = []
    let calendar = []
    notes.map(note => {
      const noteDate = note.dataset.date.split('-')
      const noteDateString = `${noteDate[0]}-${noteDate[1]}`
      const noteYear = noteDate[0]
      const noteMonth = noteDate[1]
      if (!renderedCalendars.includes(noteDateString)) {
        renderedCalendars.push(noteDateString)
        calendar.push(printMonth(noteMonth, noteYear))
      }
    })
    return calendar
  }
  // const years = [2019, 2018]
  const notesDomElement = document.getElementById('notes-list')
  if (notesDomElement) {
    const notes = Array.prototype.slice.call(notesDomElement.querySelectorAll('li'))
    const calArr = drawCalendars(notes)
    document.getElementById('calendar-wrapper').innerHTML = calArr.join('')
    bindCalendarFiltering()
  }

  const filterNotes = (category) => {
    const entryNodes = document.querySelectorAll('#notes-list li')
    document.getElementById('notes-list').classList.add('notes-list--filtered')
    entryNodes.forEach(entry => {
      if (entry.dataset.category.includes(category)) {
        entry.classList.add('entry--filtered')
      } else {
        entry.classList.remove('entry--filtered')
      }
    })
  }

  // notes filtering
  if (location.pathname === '/notes/') {
    const params = new URLSearchParams(location.search)
    const category = params.get('category')
    if (category !== null && category.length) {
      filterNotes(category)
    }
  }
})();
