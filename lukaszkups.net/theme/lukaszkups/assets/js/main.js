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
        } else {
          event.currentTarget.classList.add('point--active')
          domPoints.forEach(_point => {
            if (_point.title !== event.currentTarget.title) {
              _point.classList.add('point--hidden')
            }
          })
        }
      })
    })
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
    // bind bottom menu map points filtering
    const filterButtons = document.querySelectorAll('#experience-filter li span')
    filterButtons.forEach(filterButton => {
      filterButton.addEventListener('click', function (event) {
        event.preventDefault()
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
})();
