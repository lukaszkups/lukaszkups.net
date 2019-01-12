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
      domPoint.style.top = `${(topModifier * point.top)}px`
      domPoint.style.left = `${leftModifier * point.left}px`
      domPoint.title = point.country
      domElement.appendChild(domPoint)
    })
    window.addEventListener('resize', function (event) {
      const domPoints = document.querySelectorAll('#experience-map .point')
      const mapWidth = domElement.offsetWidth
      const leftModifier = mapWidth / 1400
      const topModifier = (mapWidth / 2) / 700
      domElement.style.height = `${(mapWidth / 2)}px`
      domPoints.forEach((point, index) => {
        point.style.top = `${(pointsList[index].top * topModifier)}px`
        point.style.left = `${(pointsList[index].left * leftModifier)}px`
      })
    })
  }
  const points = [
    {top: 150, left: 630, country: 'Poland'},
    {top: 155, left: 572, country: 'UK'},
    {top: 200, left: 290, country: 'New York'},
    {top: 160, left: 585, country: 'Rotterdam'},
    {top: 172, left: 578, country: 'Paris'},
    {top: 300, left: 220, country: 'Cayman Islands'},
    {top: 150, left: 615, country: 'Berlin'},
    {top: 165, left: 622, country: 'Prague'}
  ]
  const mapDomElement = document.getElementById('experience-map')
  if (mapDomElement) {
    drawMapPoints(mapDomElement, points)
  }
})();
