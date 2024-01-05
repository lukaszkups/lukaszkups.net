const menu = [
  { id: 0, name: 'Home', url: '/' }, 
  { id: 1, name: 'About', url: '/about' }, 
  { id: 2, name: 'Writing', url: '/notes' }, 
  { id: 3, name: 'Projects', url: '/projects' }, 
  { id: 4, name: 'CV', url: '/experience' }
];

const renderMenu = (meta) => {
  return menu.map(((item) => `
    <li class="${item.id === meta.active ? 'active' : ''}">
      <a href="${item.url}" data-hover="${item.name}">${item.name}</a>
    </li>
  `));
}

const render = (meta, content) => {
  return `
    <header>
      <div class="main-container nav-container>
        <div id="logo" class="logo-wrapper">
          <div class="logo"></div>
        </div>
        <nav>
          <ul>
            ${renderMenu(meta)}
          </ul>
        </nav>
      </div>
    </header>
  `;
}

export default render;
