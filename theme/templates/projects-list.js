import renderLayout from "./layout.js";

const renderDescription = (description) => {
  return description.replace(/\\n/g, '<br />');
}

const renderProjectLinks = (projectMeta) => {
  let htmlString = '';
  if (projectMeta.link) {
    htmlString += `<a href="${projectMeta.link}" target="_blank"><div>« Link</div><span></span></a>`
  }
  if (projectMeta.changelog) {
    htmlString += `<a href="${projectMeta.changelog}" target="_blank"><div>« Changelog</div><span></span></a>`
  }
  if (projectMeta.repo) {
    htmlString += `<a href="${projectMeta.repo}" target="_blank"><div>« Repository</div><span></span></a>`
  }
  if (projectMeta.npm) {
    htmlString += `<a href="${projectMeta.npm}" target="_blank"><div>« npm</div><span></span></a>`
  }
  return htmlString;
}

const renderProjectListItems = (projectItems) => {
  // contentData.items.map((item) => '<li><a href="' + item.url + '">' + item.meta.title + '</a></li>')
  let htmlString = '';
  projectItems.forEach((item) => {
    htmlString += `
      <div class="project-item">
        <h2 class="bebas">${item?.meta?.title}</h2>
        <div class="description">${renderDescription(item?.meta?.description || '')}</div>
        <div class="project-links">${renderProjectLinks(item?.meta)}</div>
      </div>
    `;
  });
  return htmlString;
}

const renderProjectsList = (contentData) => {
  return `
    <div class="projects-wrapper">
      <div class="main-container main-container--projects">
        <div class="stack-container stack-container--projects">
          <div class="stack" style="--stacks: 3;">
            <span style="--index: 0;">PROJECTS</span>
            <span style="--index: 1;">PROJECTS</span>
            <span style="--index: 2;">PROJECTS</span>
          </div>
        </div>
      </div>
      <div class="main-container project-list-items">
        ${renderProjectListItems(contentData?.items || [])}
      </div>
      <div id="particles-js"></div>
    </div>
  `;
}

const render = (contentData) => {
  contentData.navIndex = 3;
  return renderLayout(contentData, renderProjectsList);
}
export default render;
