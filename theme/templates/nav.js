const getActiveClass = (navIndex, activeIndex) => {
  return navIndex === activeIndex ? 'nav-active' : '';
}

const render = (contentData) => {
  return `
    <nav>
      <div class="main-container">
        <div class="logo-wrapper"><div class="logo"></div></div>
        <ul class="main-menu">
          <li class="${getActiveClass(0, contentData.navIndex)}"><a href="/">HOME</a></li>
          <li class="${getActiveClass(1, contentData.navIndex)}"><a href="/about/">ABOUT</a></li>
          <li class="${getActiveClass(2, contentData.navIndex)}"><a href="/notes/">NOTES</a></li>
          <li class="${getActiveClass(3, contentData.navIndex)}"><a href="/projects/">PROJECTS</a></li>
          <li class="${getActiveClass(4, contentData.navIndex)}"><a href="/experience/">CV</a></li>
        </ul>
      </div>
    </nav>
  `;
}

export default render;
