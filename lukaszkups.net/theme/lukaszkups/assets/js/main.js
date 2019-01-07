(() => {
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
  var myAnimation = new DrawFillSVG({
    elementId: "svg"
  });
})();
