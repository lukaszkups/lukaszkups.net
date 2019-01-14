(() => {
  // home page
  const homeTitleAnimation = (domElement, titles) => {
    let currentTitle = ''
    const animateTitle = (titleIndex) => {
      let promises = []
      const title = titles[titleIndex]
      let globalTime = 0
      if (currentTitle.length > 0) {
        for (let i = 0; i < currentTitle.length; i++) {
          const time = Math.floor((Math.random() * 100) + 10)
          globalTime += time
          promises.push(Promise.resolve(setTimeout(() => {
            currentTitle = currentTitle.slice(0, -1)
            domElement.innerText = currentTitle
          }, globalTime)))
        }
      }
      setTimeout(() => {
        for (let letter in title) {
          const time = title[letter] !== ' ' ? Math.floor((Math.random() * 200) + 1) : 50
          globalTime += time
          promises.push(Promise.resolve(setTimeout(() => {
            currentTitle += title[letter]
            domElement.innerText = currentTitle
          }, globalTime)))
        }
        if (titleIndex < titles.length - 1) {
          Promise.all(promises).then(() => {
            setTimeout(() => {
              animateTitle(titleIndex + 1)
            }, globalTime + 1000)
          })
        }
      }, globalTime - 1000)
    }
    animateTitle(0)
  }
  const titles = ['just another front-end developer.', 'AFOL.', 'a tech writer.', 'husband & father.', 'g33k_', 'a web crafter.', 'anyone I want to be.']
  const domElement = document.getElementById('home-title')
  if (domElement) {
    homeTitleAnimation(domElement, titles)
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
    // bind bottom menu map points filtering
    const filterButtons = document.querySelectorAll('#experience-filter li span')
    filterButtons.forEach(filterButton => {
      filterButton.addEventListener('click', function (event) {
        event.preventDefault()
        // remove point details if needed
        hidePointInfo()
        // remove all existing filters from map points (method triggered without params un-filter everything)
        filterMapPoints()
        const wasActive = filterButton.parentNode.classList.contains('active-filter')
        // remove active class from filter buttons
        filterButtons.forEach(btn => {
          btn.parentNode.classList.remove('active-filter')
        })
        if (!wasActive) {
          filterButton.parentNode.classList.add('active-filter')
          filterMapPoints(filterButton.parentNode.getAttribute('data-filter'))
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
    stringBuffer.push(`<table><thead><tr><th colspan='7'>${monthNames[month - 1]}</th></tr></thead><tbody>`)
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
  const printCalendarForYear = (year) => {
    let yearArr = []
    let now = new Date()
    for (let month = 1; month <= 12; month++) {
      if (now.getFullYear() === year && now.getMonth() + 1 >= month) {
        yearArr.push(printMonth(month, year))
      } else if (now.getFullYear() !== year){
        yearArr.push(printMonth(month, year))
      }
    }
    return `<h2 class='year-title'>${year}</h2>${yearArr.reverse().join('')}`
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
  const years = [2019, 2018]
  const notesDomElement = document.getElementById('notes-list')
  if (notesDomElement) {
    let calArr = []
    years.map(year => {
      calArr.push(printCalendarForYear(year))
    })
    document.getElementById('calendar-wrapper').innerHTML = calArr.join('')
    bindCalendarFiltering()
  }
})();
