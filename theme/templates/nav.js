const getActiveClass = (navIndex, activeIndex) => {
  return navIndex === activeIndex ? 'nav-active' : '';
}

const render = (contentData) => {
  // must be added like that to avoid whitespace problems in final template
  let navItems = '';
  navItems += `<li class="${getActiveClass(0, contentData.navIndex)}"><a href="/">HOME</a></li>`;
  navItems += `<li class="${getActiveClass(1, contentData.navIndex)}"><a href="/about/">ABOUT</a></li>`;
  navItems += `<li class="${getActiveClass(2, contentData.navIndex)}"><a href="/notes/">NOTES</a></li>`;
  navItems += `<li class="${getActiveClass(3, contentData.navIndex)}"><a href="/projects/">PROJECTS</a></li>`;
  navItems += `<li class="${getActiveClass(4, contentData.navIndex)}"><a href="/experience/">Experience</a></li>`;

  return `
    <nav>
      <div class="main-container main-container--nav">
        <div class="logo-wrapper"><div class="logo"></div></div>
        <label for="main-menu-clickable" class="main-menu-clickable"></label>
        <input type="checkbox" id="main-menu-clickable">
        <ul class="main-menu bebas">
          ${navItems}
        </ul>
      </div>
    </nav>
  `.replaceAll("\t", "").replaceAll("  ", " ").trim();
}

export default render;
